import pb from '@/lib/pocketbase/client'
import { LibraryDocument, LibraryDocumentType, LibraryCategory } from '@/types'

export interface LibraryFilterParams {
  type?: LibraryDocumentType | 'all'
  category?: LibraryCategory | 'all'
  search?: string
}

export const LIBRARY_CATEGORIES: { id: LibraryCategory; label: string; shortLabel: string }[] = [
  {
    id: 'reforma_tributaria',
    label: 'Reforma Tributária (IBS/CBS)',
    shortLabel: 'Reforma Tributária',
  },
  { id: 'valuation', label: 'Valuation & Avaliação', shortLabel: 'Valuation' },
  {
    id: 'gestao_financeira',
    label: 'Gestão Financeira & Solvência',
    shortLabel: 'Gestão Financeira',
  },
  { id: 'planejamento', label: 'Planejamento Estratégico & BSC', shortLabel: 'Planejamento' },
  { id: 'precificacao', label: 'Formação de Preço & Custos', shortLabel: 'Precificação' },
  { id: 'outros', label: 'Estudos Gerais & Outros', shortLabel: 'Outros' },
]

export function getCategoryLabel(category?: string | null): string {
  if (!category) return 'Geral'
  const found = LIBRARY_CATEGORIES.find((c) => c.id === category)
  return found ? found.shortLabel : category
}

export interface DocumentFormData {
  title: string
  description?: string
  type: LibraryDocumentType
  category?: LibraryCategory
  published: boolean
  published_at?: string
  content_text?: string
  file?: File | null
}

/**
 * Obter URL direta do arquivo PDF no PocketBase
 */
export function getDocumentFileUrl(document: LibraryDocument, download = false): string | null {
  if (!document.file) return null
  return pb.files.getURL(document, document.file, {
    download: download ? true : undefined,
  })
}

/**
 * Formatar tamanho de arquivo de bytes para KB ou MB amigável
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return 'PDF Digital'
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(1)} MB`
}

/**
 * Buscar lista pública de documentos publicados
 */
export async function getPublishedLibraryDocuments(
  params: LibraryFilterParams = {},
): Promise<LibraryDocument[]> {
  try {
    const filters: string[] = ['published = true']

    if (params.type && params.type !== 'all') {
      filters.push(`type = "${params.type}"`)
    }

    if (params.category && params.category !== 'all') {
      filters.push(`category = "${params.category}"`)
    }

    if (params.search && params.search.trim()) {
      const clean = params.search.trim().replace(/["\\]/g, '')
      filters.push(`(title ~ "${clean}" || description ~ "${clean}" || content_text ~ "${clean}")`)
    }

    const records = await pb.collection('library_documents').getFullList<LibraryDocument>({
      filter: filters.join(' && '),
      sort: '-published_at,-created',
      requestKey: null,
    })

    return records
  } catch (error) {
    console.error('Erro ao buscar documentos da biblioteca:', error)
    return []
  }
}

/**
 * Buscar todos os documentos (para área administrativa)
 */
export async function getAllLibraryDocumentsAdmin(): Promise<LibraryDocument[]> {
  try {
    const records = await pb.collection('library_documents').getFullList<LibraryDocument>({
      sort: '-created',
      requestKey: null,
    })
    return records
  } catch (error) {
    console.error('Erro ao buscar documentos admin:', error)
    throw error
  }
}

/**
 * Criar um novo documento com upload de PDF
 */
export async function createLibraryDocument(data: DocumentFormData): Promise<LibraryDocument> {
  const formData = new FormData()
  formData.append('title', data.title.trim())
  formData.append('description', data.description?.trim() || '')
  formData.append('type', data.type)
  if (data.category) {
    formData.append('category', data.category)
  }
  formData.append('published', String(data.published))
  formData.append('published_at', data.published_at || new Date().toISOString().split('T')[0])
  if (data.content_text) {
    formData.append('content_text', data.content_text.trim())
  }

  if (data.file) {
    formData.append('file', data.file)
    formData.append('file_size', String(data.file.size))
  }

  const created = await pb.collection('library_documents').create<LibraryDocument>(formData)
  return created
}

/**
 * Atualizar documento existente (título, descrição, tipo, publicação, substituição de arquivo)
 */
export async function updateLibraryDocument(
  id: string,
  data: Partial<DocumentFormData>,
): Promise<LibraryDocument> {
  const formData = new FormData()

  if (data.title !== undefined) formData.append('title', data.title.trim())
  if (data.description !== undefined) formData.append('description', data.description.trim())
  if (data.type !== undefined) formData.append('type', data.type)
  if (data.category !== undefined) formData.append('category', data.category)
  if (data.published !== undefined) formData.append('published', String(data.published))
  if (data.published_at !== undefined) formData.append('published_at', data.published_at)
  if (data.content_text !== undefined) formData.append('content_text', data.content_text.trim())

  if (data.file) {
    formData.append('file', data.file)
    formData.append('file_size', String(data.file.size))
  }

  const updated = await pb.collection('library_documents').update<LibraryDocument>(id, formData)
  return updated
}

/**
 * Alternar status de publicação
 */
export async function toggleDocumentPublished(
  id: string,
  currentStatus: boolean,
): Promise<LibraryDocument> {
  return await pb.collection('library_documents').update<LibraryDocument>(id, {
    published: !currentStatus,
  })
}

/**
 * Excluir documento
 */
export async function deleteLibraryDocument(id: string): Promise<boolean> {
  await pb.collection('library_documents').delete(id)
  return true
}

/**
 * Funções de Autenticação para o Admin do PocketBase
 */
export async function adminLogin(email: string, password: string) {
  const authData = await pb.collection('users').authWithPassword(email.trim(), password)
  return authData
}

export function adminLogout() {
  pb.authStore.clear()
}

export function isUserAuthenticated(): boolean {
  return pb.authStore.isValid
}

export function getCurrentUser() {
  return pb.authStore.record
}

/**
 * Alteração de senha do usuário logado no painel administrativo
 */
export async function changeAdminPassword(
  oldPassword: string,
  newPassword: string,
): Promise<boolean> {
  const current = pb.authStore.record
  if (!current?.id) {
    throw new Error('Usuário não está autenticado.')
  }

  // Validação básica de força de senha
  if (!newPassword || newPassword.length < 8) {
    throw new Error('A nova senha deve ter no mínimo 8 caracteres.')
  }

  // Atualizar registro do usuário autenticado no PocketBase
  await pb.collection('users').update(current.id, {
    oldPassword,
    password: newPassword,
    passwordConfirm: newPassword,
  })

  return true
}
