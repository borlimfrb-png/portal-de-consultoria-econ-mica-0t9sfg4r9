import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Lock,
  LogOut,
  Upload,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  BookOpen,
  Download,
  AlertCircle,
  Shield,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  FileCheck,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react'
import { LibraryDocument, LibraryDocumentType, LibraryCategory } from '@/types'
import {
  adminLogin,
  adminLogout,
  isUserAuthenticated,
  getCurrentUser,
  getAllLibraryDocumentsAdmin,
  createLibraryDocument,
  updateLibraryDocument,
  toggleDocumentPublished,
  deleteLibraryDocument,
  getDocumentFileUrl,
  formatFileSize,
  DocumentFormData,
  changeAdminPassword,
  LIBRARY_CATEGORIES,
  getCategoryLabel,
} from '@/services/library'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

export default function AdminBiblioteca() {
  const { toast } = useToast()

  // Estado de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isUserAuthenticated())
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser())

  // Formulário de Login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // Painel de Documentos
  const [documents, setDocuments] = useState<LibraryDocument[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')

  // Modal de Criação / Edição
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState<LibraryDocument | null>(null)
  const [savingDoc, setSavingDoc] = useState(false)

  // Campos do formulário de documento
  const [formData, setFormData] = useState<DocumentFormData>({
    title: '',
    description: '',
    type: 'livro',
    published: true,
    published_at: new Date().toISOString().split('T')[0],
    content_text: '',
    file: null,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Modal de Confirmação de Exclusão
  const [deleteConfirmDoc, setDeleteConfirmDoc] = useState<LibraryDocument | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Modal e Estado de Troca de Senha
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [currentPasswordInput, setCurrentPasswordInput] = useState('')
  const [newPasswordInput, setNewPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)

  const loadAdminDocs = async () => {
    if (!isAuthenticated) return
    setLoadingDocs(true)
    try {
      const data = await getAllLibraryDocumentsAdmin()
      setDocuments(data)
    } catch (err: any) {
      console.error('Erro ao carregar documentos admin:', err)
      if (err?.status === 401 || err?.status === 403) {
        handleLogout()
      } else {
        toast({
          title: 'Erro ao carregar acervo',
          description: 'Não foi possível listar os documentos.',
          variant: 'destructive',
        })
      }
    } finally {
      setLoadingDocs(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminDocs()
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError(null)

    try {
      const auth = await adminLogin(loginEmail, loginPassword)
      setIsAuthenticated(true)
      setCurrentUser(auth.record)
      toast({
        title: 'Login efetuado com sucesso',
        description: `Bem-vindo ao painel da Biblioteca, ${auth.record?.name || auth.record?.email}!`,
      })
    } catch (err: any) {
      console.error('Falha no login:', err)
      setLoginError('Credenciais inválidas. Verifique seu e-mail e senha de administrador.')
      toast({
        title: 'Falha no login',
        description: 'E-mail ou senha incorretos.',
        variant: 'destructive',
      })
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    adminLogout()
    setIsAuthenticated(false)
    setCurrentUser(null)
    setDocuments([])
    toast({
      title: 'Sessão encerrada',
      description: 'Você saiu da área administrativa.',
    })
  }

  const openCreateDialog = () => {
    setEditingDoc(null)
    setFormData({
      title: '',
      description: '',
      type: 'livro',
      category: 'reforma_tributaria',
      published: true,
      published_at: new Date().toISOString().split('T')[0],
      content_text: '',
      file: null,
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
    setDialogOpen(true)
  }

  const openEditDialog = (doc: LibraryDocument) => {
    setEditingDoc(doc)
    setFormData({
      title: doc.title || '',
      description: doc.description || '',
      type: doc.type || 'livro',
      category: (doc.category as LibraryCategory) || 'reforma_tributaria',
      published: Boolean(doc.published),
      published_at: doc.published_at || new Date().toISOString().split('T')[0],
      content_text: doc.content_text || '',
      file: null,
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
    setDialogOpen(true)
  }

  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({
        title: 'Título obrigatório',
        description: 'Por favor preencha o título do documento.',
        variant: 'destructive',
      })
      return
    }

    setSavingDoc(true)
    try {
      if (editingDoc) {
        await updateLibraryDocument(editingDoc.id, formData)
        toast({
          title: 'Documento atualizado',
          description: `"${formData.title}" foi salvo com sucesso.`,
        })
      } else {
        await createLibraryDocument(formData)
        toast({
          title: 'Documento criado',
          description: `"${formData.title}" foi adicionado à biblioteca.`,
        })
      }

      setDialogOpen(false)
      loadAdminDocs()
    } catch (err: any) {
      console.error('Erro ao salvar documento:', err)
      toast({
        title: 'Erro ao salvar',
        description: err?.message || 'Falha ao comunicar com o servidor.',
        variant: 'destructive',
      })
    } finally {
      setSavingDoc(false)
    }
  }

  const handleTogglePublish = async (doc: LibraryDocument) => {
    try {
      await toggleDocumentPublished(doc.id, doc.published)
      setDocuments((prev) =>
        prev.map((d) => (d.id === doc.id ? { ...d, published: !d.published } : d)),
      )
      toast({
        title: doc.published ? 'Documento despublicado' : 'Documento publicado',
        description: doc.published
          ? `"${doc.title}" agora está oculto na área pública.`
          : `"${doc.title}" agora está visível para os visitantes.`,
      })
    } catch (err) {
      toast({
        title: 'Erro ao alternar status',
        description: 'Não foi possível alterar a visibilidade do documento.',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmDoc) return
    setDeleting(true)

    try {
      await deleteLibraryDocument(deleteConfirmDoc.id)
      setDocuments((prev) => prev.filter((d) => d.id !== deleteConfirmDoc.id))
      toast({
        title: 'Documento excluído',
        description: `"${deleteConfirmDoc.title}" foi removido definitivamente.`,
      })
      setDeleteConfirmDoc(null)
    } catch (err) {
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível remover o documento.',
        variant: 'destructive',
      })
    } finally {
      setDeleting(false)
    }
  }

  // Manipulação de Troca de Senha
  const openPasswordDialog = () => {
    setCurrentPasswordInput('')
    setNewPasswordInput('')
    setConfirmPasswordInput('')
    setPasswordError(null)
    setPasswordSuccess(null)
    setPasswordDialogOpen(true)
  }

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(null)

    if (!currentPasswordInput) {
      setPasswordError('Por favor informe a senha atual.')
      return
    }

    if (newPasswordInput.length < 8) {
      setPasswordError('A nova senha deve ter no mínimo 8 caracteres.')
      return
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordError('A nova senha e a confirmação não coincidem.')
      return
    }

    if (currentPasswordInput === newPasswordInput) {
      setPasswordError('A nova senha deve ser diferente da senha atual.')
      return
    }

    setChangingPassword(true)
    try {
      await changeAdminPassword(currentPasswordInput, newPasswordInput)
      setPasswordSuccess('Senha alterada com sucesso! Utilize a nova senha nos próximos acessos.')
      toast({
        title: 'Senha atualizada',
        description: 'Sua senha de administrador foi alterada com sucesso.',
      })
      setTimeout(() => {
        setPasswordDialogOpen(false)
      }, 1800)
    } catch (err: any) {
      console.error('Erro ao alterar senha:', err)
      const msg =
        err?.data?.data?.oldPassword?.message ||
        err?.data?.message ||
        err?.message ||
        'Não foi possível alterar a senha. Verifique se a senha atual está correta.'
      setPasswordError(msg)
      toast({
        title: 'Erro na alteração de senha',
        description: msg,
        variant: 'destructive',
      })
    } finally {
      setChangingPassword(false)
    }
  }

  // Filtragem da lista do admin
  const filteredDocs = documents.filter((doc) => {
    if (!searchFilter.trim()) return true
    const term = searchFilter.toLowerCase()
    return (
      doc.title.toLowerCase().includes(term) ||
      (doc.description && doc.description.toLowerCase().includes(term))
    )
  })

  // =========================================================================
  // VIEW: Se não estiver autenticado -> Tela de Login
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F0F4F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background mesh decorativo */}
        <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0B3B7A]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#082852] border border-[#16A34A]/40 flex items-center justify-center text-[#22C55E] shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#082852]">
            Área Restrita do Dono
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-slate-600 font-sans">
            Gerenciamento de Publicações & Biblioteca Digital da Borlim
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-stone-200">
            {loginError && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  E-mail institucional
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="flavio@borlim.com.br"
                  required
                  autoComplete="email"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Senha de acesso
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-slate-800"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-[#0B3B7A] hover:bg-[#1557A6] text-white rounded-lg transition-all shadow-md disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 text-[#22C55E]" />
                  <span>{loginLoading ? 'Verificando...' : 'Entrar no Painel'}</span>
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Acesso exclusivo ao administrador</span>
              </span>
              <Link to="/biblioteca" className="text-[#0B3B7A] hover:underline">
                Voltar à Biblioteca
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // VIEW: Painel Administrativo Autenticado
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col">
      {/* Top Header do Painel Admin */}
      <header className="bg-[#082852] text-white border-b border-[#0B3B7A] py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold text-white">
                  Painel da Biblioteca Borlim
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-emerald-500/20 text-[#22C55E] border border-emerald-500/30">
                  Uso Interno
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Conectado como{' '}
                <strong className="text-white">{currentUser?.email || 'Administrador'}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={openPasswordDialog}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-amber-200 hover:text-white bg-amber-500/15 hover:bg-amber-500/25 rounded-lg border border-amber-400/40 transition-all"
              title="Alterar senha de acesso do administrador"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-300" />
              <span>Trocar Senha</span>
            </button>

            <Link
              to="/biblioteca"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-lg border border-white/15 transition-all"
            >
              <span>Página pública</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#22C55E]" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/60 rounded-lg transition-all"
              title="Encerrar sessão de administrador"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content do Painel */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Barra de Ações: Estatísticas + Botão Novo Documento + Busca */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-slate-500 block">
                Total no Acervo
              </span>
              <span className="text-xl font-bold font-serif text-[#082852]">
                {documents.length} publicações
              </span>
            </div>
            <div className="h-8 w-px bg-stone-200" />
            <div>
              <span className="text-xs font-mono uppercase text-slate-500 block">Publicados</span>
              <span className="text-xl font-bold font-serif text-[#16A34A]">
                {documents.filter((d) => d.published).length} visíveis
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filtrar publicações..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={openCreateDialog}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-xs hover:shadow transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Novo PDF</span>
            </button>
          </div>
        </div>

        {/* Lista de Documentos em Tabela / Cards */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
              Documentos Cadastrados
            </span>
            <button
              type="button"
              onClick={loadAdminDocs}
              disabled={loadingDocs}
              className="text-xs font-mono text-slate-500 hover:text-[#0B3B7A] flex items-center gap-1 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingDocs ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </button>
          </div>

          {loadingDocs ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              Carregando documentos...
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-serif font-bold text-[#082852]">
                Nenhum documento encontrado
              </p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Comece enviando um arquivo PDF com título e descrição.
              </p>
              <button
                type="button"
                onClick={openCreateDialog}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#16A34A] text-white rounded-lg shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Documento</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 overflow-x-auto">
              {filteredDocs.map((doc) => {
                const fileUrl = getDocumentFileUrl(doc, true)
                const isBook = doc.type === 'livro'

                return (
                  <div
                    key={doc.id}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isBook
                              ? 'bg-blue-50 text-[#0B3B7A] border border-blue-200'
                              : 'bg-emerald-50 text-[#15803D] border border-emerald-200'
                          }`}
                        >
                          {isBook ? (
                            <BookOpen className="w-3 h-3" />
                          ) : (
                            <FileText className="w-3 h-3" />
                          )}
                          <span>{isBook ? 'Livro' : 'Artigo'}</span>
                        </span>

                        {doc.category && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-stone-100 text-slate-700 border border-stone-200">
                            {getCategoryLabel(doc.category)}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleTogglePublish(doc)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-colors ${
                            doc.published
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                          }`}
                          title="Clique para alternar visibilidade pública"
                        >
                          {doc.published ? (
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3 h-3 text-stone-500" />
                          )}
                          <span>{doc.published ? 'Publicado' : 'Rascunho'}</span>
                        </button>

                        {doc.published_at && (
                          <span className="text-[11px] font-mono text-slate-500">
                            • Data: {doc.published_at}
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-slate-500">
                          • {formatFileSize(doc.file_size)}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-[#082852] line-clamp-1 mb-1">
                        {doc.title}
                      </h3>

                      {doc.description && (
                        <p className="text-xs text-slate-600 line-clamp-2 max-w-3xl">
                          {doc.description}
                        </p>
                      )}

                      {doc.file && (
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#16A34A]">
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Arquivo anexado: {doc.file}</span>
                        </div>
                      )}
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex items-center gap-2 shrink-0">
                      {fileUrl && (
                        <a
                          href={fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-600 hover:text-[#16A34A] hover:bg-emerald-50 rounded-lg border border-stone-200 transition-colors"
                          title="Baixar arquivo atual"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => openEditDialog(doc)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-semibold text-[#0B3B7A] hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                        title="Editar metadados ou substituir PDF"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmDoc(doc)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                        title="Excluir documento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Modal / Diálogo de Criação e Edição */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-bold text-[#082852]">
              {editingDoc ? 'Editar Publicação' : 'Publicar Novo Documento (PDF)'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              Preencha os dados técnicos da publicação e faça o upload do arquivo PDF oficial.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveDocument} className="space-y-4 mt-2">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                Título da Publicação *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Guia Prático da Reforma Tributária: IBS e CBS..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tipo de Documento *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as LibraryDocumentType })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
                >
                  <option value="livro">Livro / Manual Metodológico</option>
                  <option value="artigo">Artigo Técnico / Estudo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Categoria Temática *
                </label>
                <select
                  value={formData.category || 'reforma_tributaria'}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as LibraryCategory })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
                >
                  {LIBRARY_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Data de Publicação
                </label>
                <input
                  type="date"
                  value={formData.published_at}
                  onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                Descrição Curta / Síntese Executiva
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Breve resumo dos tópicos abordados para os visitantes do portal..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
              />
            </div>

            {/* Upload de Arquivo PDF */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                Arquivo PDF
              </label>

              {editingDoc?.file && (
                <div className="mb-2 text-xs text-slate-600 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>
                    Arquivo atual: <strong>{editingDoc.file}</strong> (
                    {formatFileSize(editingDoc.file_size)})
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null
                  setFormData({ ...formData, file: f })
                }}
                className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-mono file:font-bold file:bg-[#0B3B7A] file:text-white hover:file:bg-[#1557A6]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Formato aceito: .pdf (máx. 50MB). O visitante poderá baixar o PDF diretamente.
              </p>
            </div>

            {/* Texto integral ou síntese para cópia */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                Texto Estruturado (para botão "Copiar Conteúdo")
              </label>
              <textarea
                rows={4}
                value={formData.content_text}
                onChange={(e) => setFormData({ ...formData, content_text: e.target.value })}
                placeholder="Insira o texto completo, síntese ou tópicos chave que os leitores poderão copiar rapidamente com um clique..."
                className="w-full px-3 py-2 text-xs font-mono bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
              />
            </div>

            {/* Flag Publicado */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="doc-published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-[#16A34A] rounded border-stone-300 focus:ring-[#16A34A]"
              />
              <label
                htmlFor="doc-published"
                className="text-xs font-mono font-bold text-slate-700 cursor-pointer"
              >
                Publicar imediatamente (tornar visível na página pública da Biblioteca)
              </label>
            </div>

            <DialogFooter className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 text-xs font-mono font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={savingDoc}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-xs disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>
                  {savingDoc
                    ? 'Salvando...'
                    : editingDoc
                      ? 'Salvar Alterações'
                      : 'Publicar Documento'}
                </span>
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog
        open={Boolean(deleteConfirmDoc)}
        onOpenChange={(open) => !open && setDeleteConfirmDoc(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg font-bold text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Confirmar Exclusão</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              Tem certeza de que deseja excluir permanentemente o documento{' '}
              <strong className="text-slate-800">"{deleteConfirmDoc?.title}"</strong>? Esta ação
              removerá o arquivo da biblioteca pública e não poderá ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteConfirmDoc(null)}
              className="px-4 py-2 text-xs font-mono font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={deleting}
              onClick={handleDeleteConfirm}
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs disabled:opacity-50"
            >
              {deleting ? 'Excluindo...' : 'Excluir Definitivamente'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Troca de Senha */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg font-bold text-[#082852] flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#16A34A]" />
              <span>Alterar Senha do Administrador</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              Atualize a senha de acesso da conta <strong>{currentUser?.email}</strong>. Escolha uma
              senha segura com no mínimo 8 caracteres.
            </DialogDescription>
          </DialogHeader>

          {passwordError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs text-emerald-800">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <form onSubmit={handleChangePasswordSubmit} className="space-y-4 mt-1">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                Senha Atual *
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder="Digite sua senha atual"
                  autoComplete="current-password"
                  className="w-full pl-3 pr-9 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                Nova Senha *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  className="w-full pl-3 pr-9 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-sans">
                Dica: combine letras maiúsculas, minúsculas, números e símbolos.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                Confirmar Nova Senha *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                placeholder="Repita a nova senha"
                autoComplete="new-password"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-slate-800"
              />
            </div>

            <DialogFooter className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPasswordDialogOpen(false)}
                className="px-4 py-2 text-xs font-mono font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={changingPassword}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#0B3B7A] hover:bg-[#1557A6] text-white rounded-lg shadow-xs disabled:opacity-50"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>{changingPassword ? 'Salvando...' : 'Salvar Nova Senha'}</span>
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
