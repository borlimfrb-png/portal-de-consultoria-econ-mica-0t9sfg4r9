import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  FileText,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  FileSpreadsheet,
  Mail,
  ShieldAlert,
  Calendar,
  HardDrive,
  Eye,
} from 'lucide-react'
import { LibraryDocument, LibraryDocumentType } from '@/types'
import {
  getPublishedLibraryDocuments,
  getDocumentFileUrl,
  formatFileSize,
} from '@/services/library'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export default function Biblioteca() {
  const [documents, setDocuments] = useState<LibraryDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<LibraryDocumentType | 'all'>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [readingDoc, setReadingDoc] = useState<LibraryDocument | null>(null)
  const { toast } = useToast()

  const loadDocuments = async () => {
    setLoading(true)
    try {
      const docs = await getPublishedLibraryDocuments()
      setDocuments(docs)
    } catch (error) {
      console.error('Falha ao carregar acervo da biblioteca:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  // Filtro client-side ágil por busca e tipo
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesType = selectedType === 'all' || doc.type === selectedType
      if (!matchesType) return false

      if (!searchTerm.trim()) return true
      const term = searchTerm.toLowerCase().trim()
      const titleMatch = doc.title?.toLowerCase().includes(term)
      const descMatch = doc.description?.toLowerCase().includes(term)
      const contentMatch = doc.content_text?.toLowerCase().includes(term)

      return titleMatch || descMatch || contentMatch
    })
  }, [documents, selectedType, searchTerm])

  // Contadores por tipo
  const counts = useMemo(() => {
    const total = documents.length
    const livros = documents.filter((d) => d.type === 'livro').length
    const artigos = documents.filter((d) => d.type === 'artigo').length
    return { total, livros, artigos }
  }, [documents])

  const handleCopyContent = async (doc: LibraryDocument) => {
    const textToCopy =
      doc.content_text ||
      `${doc.title.toUpperCase()}\n\n${doc.description || ''}\n\nBorlim Consultoria Econômica & Empresarial\nContato: flavio@borlim.com.br | WhatsApp: (17) 99765-0672`

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedId(doc.id)
      toast({
        title: 'Conteúdo copiado!',
        description: `O texto de "${doc.title.slice(0, 40)}..." foi copiado para a área de transferência.`,
      })
      setTimeout(() => {
        setCopiedId(null)
      }, 2500)
    } catch (err) {
      toast({
        title: 'Não foi possível copiar',
        description: 'Seu navegador bloqueou o acesso à área de transferência.',
        variant: 'destructive',
      })
    }
  }

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. Header Band Editorial & Tecnológico da Borlim */}
      <section className="bg-[#082852] text-white border-b border-[#0B3B7A] py-14 sm:py-16 relative overflow-hidden">
        {/* Tech mesh & Glowing orbs */}
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#22C55E]/70 to-transparent shadow-[0_0_15px_#22C55E]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#22C55E]/40 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Acervo Técnico & Publicações
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Biblioteca de Estudos & Livros
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-sans">
              Publicações executivas, manuais metodológicos e artigos analíticos elaborados pela
              equipe de consultores econômicos da Borlim. Acesso público e irrestrito para download
              de arquivos e consulta dos conteúdos técnicos.
            </p>

            {/* Micro badges estatísticos */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-slate-700/60 font-mono text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-md border border-white/15 text-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>{counts.livros} Livros & Manuais</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-md border border-white/15 text-slate-200">
                <FileText className="w-3.5 h-3.5 text-emerald-300" />
                <span>{counts.artigos} Artigos Técnicos</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#16A34A]/30 rounded-md border border-[#22C55E]/40 text-emerald-200 font-semibold">
                <Download className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Download Livre em PDF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Barra de Ferramentas / Filtros */}
      <section className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 py-4 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            {/* Filtros por tipo */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                type="button"
                onClick={() => setSelectedType('all')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                  selectedType === 'all'
                    ? 'bg-[#16A34A] text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Todos ({counts.total})</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType('livro')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                  selectedType === 'livro'
                    ? 'bg-[#0B3B7A] text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Livros ({counts.livros})</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType('artigo')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                  selectedType === 'artigo'
                    ? 'bg-[#0B3B7A] text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Artigos ({counts.artigos})</span>
              </button>
            </div>

            {/* Input de Busca */}
            <div className="relative w-full md:w-80 shrink-0">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por título, assunto ou termo..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-[#082852] placeholder:text-slate-400 font-sans"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-mono"
                >
                  limpar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Grade de Documentos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex-1 w-full">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between h-80"
              >
                <div>
                  <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
                  <div className="h-6 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-slate-100 rounded w-full mb-1" />
                  <div className="h-3 bg-slate-100 rounded w-4/5" />
                </div>
                <div className="h-10 bg-slate-100 rounded w-full pt-2" />
              </div>
            ))}
          </div>
        ) : filteredDocuments.length === 0 ? (
          /* Estado Vazio Elegante */
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300 p-8 shadow-xs max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-[#16A34A]">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#082852] mb-2">
              Em breve novos conteúdos
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
              {searchTerm || selectedType !== 'all'
                ? 'Nenhum documento encontrado com os filtros aplicados. Tente buscar por outros termos ou verifique todas as categorias.'
                : 'Nosso acervo de publicações técnicas está sendo continuamente alimentado por nossos especialistas.'}
            </p>
            {(searchTerm || selectedType !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedType('all')
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3B7A] hover:bg-[#1557A6] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
              >
                <span>Limpar filtros</span>
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-stone-200 pb-3 mb-6">
              <span>
                Exibindo <strong className="text-slate-800">{filteredDocuments.length}</strong> de{' '}
                {documents.length} documentos publicados
              </span>
              <span className="hidden sm:inline text-slate-400">
                Formato padrão: PDF & Texto Estruturado
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => {
                const isBook = doc.type === 'livro'
                const fileUrl = getDocumentFileUrl(doc, true)
                const viewUrl = getDocumentFileUrl(doc, false)
                const hasFile = Boolean(doc.file)
                const hasText = Boolean(doc.content_text)

                return (
                  <article
                    key={doc.id}
                    className="group bg-white rounded-xl border border-stone-200/90 hover:border-[#16A34A]/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
                  >
                    {/* Hairline verde sutil no topo do card */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      {/* Top Meta: Tipo + Data */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider ${
                            isBook
                              ? 'bg-blue-50 text-[#0B3B7A] border border-blue-200/80'
                              : 'bg-emerald-50 text-[#15803D] border border-emerald-200/80'
                          }`}
                        >
                          {isBook ? (
                            <BookOpen className="w-3 h-3 text-[#0B3B7A]" />
                          ) : (
                            <FileText className="w-3 h-3 text-[#16A34A]" />
                          )}
                          <span>{isBook ? 'Livro / Manual' : 'Artigo Técnico'}</span>
                        </span>

                        {doc.published_at && (
                          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{doc.published_at}</span>
                          </span>
                        )}
                      </div>

                      {/* Título */}
                      <h2 className="font-serif text-lg font-bold text-[#082852] group-hover:text-[#0B3B7A] leading-snug transition-colors line-clamp-3 mb-2.5">
                        {doc.title}
                      </h2>

                      {/* Descrição curta */}
                      {doc.description && (
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                          {doc.description}
                        </p>
                      )}
                    </div>

                    {/* Footer do Card: Metadados do Arquivo + Ações */}
                    <div className="pt-4 border-t border-stone-100 mt-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3.5">
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3 text-slate-400" />
                          <span>{formatFileSize(doc.file_size)}</span>
                        </span>
                        <span className="text-slate-400">PDF Editorial</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {/* Botão Baixar PDF */}
                        {hasFile && fileUrl ? (
                          <a
                            href={fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-xs hover:shadow transition-all text-center"
                            title={`Baixar o arquivo PDF de "${doc.title}"`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Baixar PDF</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setReadingDoc(doc)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#0B3B7A] hover:bg-[#1557A6] text-white rounded-lg shadow-xs transition-colors text-center"
                            title="Ler o conteúdo deste documento diretamente no portal"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Visualizar</span>
                          </button>
                        )}

                        {/* Botão Copiar Conteúdo */}
                        <button
                          type="button"
                          onClick={() => handleCopyContent(doc)}
                          className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg border transition-all ${
                            copiedId === doc.id
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-white hover:bg-stone-50 text-slate-700 border-stone-200'
                          }`}
                          title="Copiar texto ou síntese para a área de transferência"
                        >
                          {copiedId === doc.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="font-bold">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* 4. Banner Institucional / CTAs Oficiais da Borlim */}
      <section className="bg-white border-t border-stone-200/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#082852] to-[#0B3B7A] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg border border-[#16A34A]/30">
            <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16A34A]/25 border border-[#22C55E]/40 text-[#22C55E] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Consultoria Especializada & Inteligência Contábil</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Precisa de uma análise personalizada para sua empresa?
                </h3>
                <p className="text-sm text-slate-300 mt-2.5 leading-relaxed font-sans">
                  Aplicamos diagnósticos de fluxo de caixa, valuation, planejamento de transição
                  para o IBS/CBS e ferramentas decisórias para mitigar riscos e maximizar a
                  rentabilidade corporativa.
                </p>
              </div>

              {/* Botões Oficiais */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href={balanceAnalysisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.35)] hover:shadow-[0_0_30px_rgba(34,197,94,0.65)] transition-all border border-[#22C55E]/70 font-mono"
                >
                  <FileSpreadsheet className="w-4 h-4 text-white" />
                  <span>GESTÃO EMPRESARIAL</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-100" />
                </a>

                <a
                  href="https://wa.me/5517997650672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-emerald-50 border border-stone-200 rounded-lg shadow-xs transition-all font-mono"
                >
                  <MessageCircle className="w-4 h-4 text-[#16A34A]" />
                  <span>(17) 99765-0672</span>
                </a>

                <a
                  href="mailto:flavio@borlim.com.br?subject=Biblioteca%20Borlim%20-%20Consulta%20Econ%C3%B4mica"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all font-mono"
                >
                  <Mail className="w-4 h-4 text-[#22C55E]" />
                  <span>Contato</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal para Visualização / Leitura de Conteúdo do Documento */}
      {readingDoc && (
        <Dialog open={Boolean(readingDoc)} onOpenChange={(open) => !open && setReadingDoc(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider ${
                    readingDoc.type === 'livro'
                      ? 'bg-blue-50 text-[#0B3B7A] border border-blue-200'
                      : 'bg-emerald-50 text-[#15803D] border border-emerald-200'
                  }`}
                >
                  {readingDoc.type === 'livro' ? 'Livro / Manual' : 'Artigo Técnico'}
                </span>
                {readingDoc.published_at && (
                  <span className="text-xs font-mono text-slate-500">
                    Publicado em {readingDoc.published_at}
                  </span>
                )}
              </div>
              <DialogTitle className="font-serif text-xl font-bold text-[#082852]">
                {readingDoc.title}
              </DialogTitle>
              {readingDoc.description && (
                <DialogDescription className="text-xs text-slate-600 mt-1">
                  {readingDoc.description}
                </DialogDescription>
              )}
            </DialogHeader>

            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-stone-200 font-sans text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
              {readingDoc.content_text ||
                'Nenhum texto adicional cadastrado para pré-visualização. Por favor, baixe o PDF completo para leitura.'}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => handleCopyContent(readingDoc)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg border border-stone-200 hover:bg-stone-50 text-slate-700"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar texto</span>
              </button>

              {readingDoc.file && (
                <a
                  href={getDocumentFileUrl(readingDoc, true) || '#'}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF</span>
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
