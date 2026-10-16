import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  Newspaper,
  Sparkles,
  Scale,
  TrendingUp,
  Coins,
  Globe,
  Building2,
  BarChart3,
  ExternalLink,
  Phone,
  Mail,
  FileSpreadsheet,
  ArrowUpRight,
  Filter,
  X,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react'
import { NewsArticle } from '@/types'
import { getAllNewsForGrouping } from '@/services/news'
import { useRealtime } from '@/hooks/use-realtime'
import NewsCard from '@/components/NewsCard'
import { NEWS_GROUPS, NewsGroupId, groupArticles, NewsGroupConfig } from '@/data/newsGroups'

export default function Noticias() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParam = searchParams.get('busca') || ''
  const grupoParam = (searchParams.get('grupo') as NewsGroupId | 'todos') || 'todos'

  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParam)
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<NewsGroupId | 'todos'>(grupoParam)
  const [newArticleIds, setNewArticleIds] = useState<Set<string>>(new Set())

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl = 'https://wa.me/5517997650672'

  const loadData = async () => {
    setLoading(true)
    const items = await getAllNewsForGrouping(100)
    setArticles(items)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setSearchTerm(searchParam)
    setSelectedGroupFilter(grupoParam)
  }, [searchParam, grupoParam])

  // Real-time updates for news articles
  useRealtime<NewsArticle>('news_articles', (e) => {
    if (e.action === 'create' && e.record) {
      setNewArticleIds((prev) => new Set(prev).add(e.record.id))
      setTimeout(() => {
        setNewArticleIds((prev) => {
          const next = new Set(prev)
          next.delete(e.record.id)
          return next
        })
      }, 3000)
    }
    loadData()
  })

  // Filtro de busca aplicado no conjunto completo antes de agrupar
  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return articles
    const q = searchTerm.trim().toLowerCase()
    return articles.filter((art) => {
      const titleMatch = (art.title || '').toLowerCase().includes(q)
      const summaryMatch = (art.summary || '').toLowerCase().includes(q)
      const sourceMatch = (art.source || '').toLowerCase().includes(q)
      const analysisMatch = (art.ai_analysis || '').toLowerCase().includes(q)
      return titleMatch || summaryMatch || sourceMatch || analysisMatch
    })
  }, [articles, searchTerm])

  // Agrupamento nos 6 grupos temáticos
  const groupedSections = useMemo(() => {
    return groupArticles(filteredArticles, 6)
  }, [filteredArticles])

  // Total de notícias distribuídas e contadores por grupo
  const groupCounts = useMemo(() => {
    const map: Record<NewsGroupId, number> = {
      'economia-brasileira': 0,
      'economia-mundial': 0,
      'reforma-tributaria': 0,
      'dolar-euro': 0,
      'inflacao-brasileira': 0,
      'pib-brasileiro': 0,
    }
    for (const g of groupedSections) {
      map[g.group.id] = g.totalCount
    }
    return map
  }, [groupedSections])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (searchTerm.trim()) {
        next.set('busca', searchTerm.trim())
      } else {
        next.delete('busca')
      }
      return next
    })
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('busca')
      return next
    })
  }

  const handleSelectGroupFilter = (gId: NewsGroupId | 'todos') => {
    setSelectedGroupFilter(gId)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (gId !== 'todos') {
        next.set('grupo', gId)
      } else {
        next.delete('grupo')
      }
      return next
    })
    if (gId !== 'todos') {
      const target = document.getElementById(`grupo-${gId}`)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const scrollToGroup = (anchorId: string) => {
    const el = document.getElementById(anchorId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Renderizador de ícones temáticos para cada grupo
  const renderGroupIcon = (name: NewsGroupConfig['iconName'], className = 'w-5 h-5') => {
    switch (name) {
      case 'Building2':
        return <Building2 className={className} />
      case 'Globe':
        return <Globe className={className} />
      case 'Scale':
        return <Scale className={className} />
      case 'Coins':
        return <Coins className={className} />
      case 'TrendingUp':
        return <TrendingUp className={className} />
      case 'BarChart3':
        return <BarChart3 className={className} />
      default:
        return <Newspaper className={className} />
    }
  }

  // Seções a serem exibidas (todas ou apenas a selecionada no filtro rápido)
  const visibleSections = useMemo(() => {
    if (selectedGroupFilter === 'todos') {
      return groupedSections
    }
    return groupedSections.filter((s) => s.group.id === selectedGroupFilter)
  }, [groupedSections, selectedGroupFilter])

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. Header Band Tecnológico (Padrão Borlim #082852 com Glows e Grid) */}
      <section className="bg-[#082852] text-white border-b border-[#0B3B7A] py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Badge Live Feed */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Radar Macroeconômico & Cobertura em 6 Grupos Temáticos
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Notícias & Inteligência Econômica
            </h1>

            <p className="text-base sm:text-lg text-emerald-300 mt-3 font-normal leading-relaxed">
              Curadoria editorial em tempo real dividida por temas centrais: Economia Brasileira,
              Economia Mundial, Reforma Tributária, Dólar e Euro, Inflação e PIB.
            </p>

            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-sans max-w-3xl">
              Análise estratégica e sínteses com inteligência artificial para subsidiar decisões de
              diretores financeiros, CEOs e empresários, conectando os fatos ao planejamento
              tributário e gestão da sua empresa.
            </p>

            {/* CTAs Oficiais Borlim */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-lg border border-[#22C55E]/40 group"
                title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
              >
                <FileSpreadsheet className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>GESTÃO EMPRESARIAL</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-100" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/25 backdrop-blur-xs"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>WhatsApp: (17) 99765-0672</span>
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=Portal%20de%20Noticias%20-%20Consulta%20Empresarial"
                className="inline-flex items-center gap-2 px-4 py-3 bg-transparent hover:bg-white/10 text-slate-200 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-slate-500"
              >
                <Mail className="w-4 h-4 text-[#22C55E]" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>

            {/* Barra de Âncoras Rápidas no Hero (Pills clicáveis) */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-[11px] font-mono text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#22C55E]" />
                <span>Navegar diretamente pelos 6 grupos temáticos:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {NEWS_GROUPS.map((grp, index) => {
                  const count = groupCounts[grp.id]
                  return (
                    <button
                      key={grp.id}
                      type="button"
                      onClick={() => scrollToGroup(grp.anchorId)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#16A34A]/30 hover:border-[#22C55E]/60 text-slate-100 hover:text-white transition-all border border-white/15 flex items-center gap-1.5 shadow-xs"
                    >
                      <span className="text-emerald-400 font-bold">{index + 1}.</span>
                      <span>{grp.title}</span>
                      {count > 0 && (
                        <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-white/15 text-slate-200 font-bold">
                          {count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Toolbar Sticky: Busca e Filtro/Âncoras de Grupo */}
      <section className="bg-white/95 backdrop-blur-md border-b border-stone-200/90 py-3.5 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Pills de Grupos com Contadores */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-mono text-slate-500 uppercase font-semibold flex items-center gap-1 mr-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Grupos:
              </span>

              <button
                type="button"
                onClick={() => handleSelectGroupFilter('todos')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                  selectedGroupFilter === 'todos'
                    ? 'bg-[#082852] text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                }`}
              >
                <span>Todos os Grupos</span>
                <span className="text-[10px] opacity-80">({filteredArticles.length})</span>
              </button>

              {NEWS_GROUPS.map((grp) => {
                const isActive = selectedGroupFilter === grp.id
                const count = groupCounts[grp.id]
                return (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => handleSelectGroupFilter(grp.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#16A34A] text-white font-bold shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                    }`}
                  >
                    {renderGroupIcon(grp.iconName, 'w-3.5 h-3.5')}
                    <span>{grp.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Input de Busca */}
            <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-80 shrink-0">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar notícias por palavra-chave..."
                className="w-full pl-9 pr-9 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] focus:bg-white text-[#082852] placeholder:text-slate-400 font-sans shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                  title="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 3. Status da Busca (quando houver termo digitado) */}
      {searchTerm.trim() && (
        <section className="bg-emerald-50/80 border-b border-emerald-200/80 py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-900">
              <Filter className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>
                Filtrando por: <strong>"{searchTerm}"</strong> — Encontradas{' '}
                <strong>{filteredArticles.length}</strong> matérias distribuídas nos grupos abaixo.
              </span>
            </div>
            <button
              onClick={handleClearSearch}
              className="text-[#15803D] hover:underline font-bold text-xs"
            >
              Limpar busca
            </button>
          </div>
        </section>
      )}

      {/* 4. Conteúdo Principal: Seções Temáticas por Grupo */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {loading ? (
          /* Skeleton Loading */
          <div className="space-y-12">
            {[1, 2, 3].map((sectionIdx) => (
              <div key={sectionIdx} className="space-y-4 animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-96 flex flex-col justify-between p-4"
                    >
                      <div className="aspect-[16/9] bg-slate-200 rounded-lg w-full mb-3" />
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-1/4" />
                        <div className="h-5 bg-slate-200 rounded w-full" />
                        <div className="h-3 bg-slate-100 rounded w-3/4" />
                      </div>
                      <div className="h-4 bg-slate-100 rounded w-1/3 pt-3" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          /* Estado Vazio Global (busca sem resultados) */
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 p-8 shadow-xs">
            <Newspaper className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-[#082852] mb-2">
              Nenhuma matéria encontrada para a busca
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Não encontramos notícias com os termos digitados nos 6 grupos temáticos. Tente usar
              termos como "Lula", "PIB", "Selic", "Reforma", "Dólar" ou limpar a busca.
            </p>
            <button
              onClick={handleClearSearch}
              className="px-6 py-2.5 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
            >
              Ver todas as notícias
            </button>
          </div>
        ) : (
          /* Renderização dos 6 Grupos Temáticos */
          <div className="space-y-16">
            {visibleSections.map((sec, idx) => {
              const grp = sec.group
              const groupArticlesList = sec.articles
              const totalInGroup = sec.totalCount

              return (
                <section
                  key={grp.id}
                  id={grp.anchorId}
                  className="scroll-mt-32 pt-2 border-t first:border-t-0 border-stone-200/80"
                >
                  {/* Cabeçalho do Grupo */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] border border-emerald-200/80">
                          {renderGroupIcon(grp.iconName, 'w-3.5 h-3.5 text-[#16A34A]')}
                          <span>{grp.badgeLabel}</span>
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Grupo {idx + 1} de {NEWS_GROUPS.length}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] tracking-tight">
                        {grp.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                        {grp.subtitle}
                      </p>
                    </div>

                    {/* Meta contador do grupo */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0">
                      <span className="px-2.5 py-1 rounded bg-stone-100 border border-stone-200 font-semibold text-slate-700">
                        {groupArticlesList.length}{' '}
                        {groupArticlesList.length === 1
                          ? 'notícia principal'
                          : 'principais notícias'}
                        {totalInGroup > groupArticlesList.length && ` (de ${totalInGroup})`}
                      </span>
                    </div>
                  </div>

                  {/* Grid de Cards ou Estado Vazio Elegante */}
                  {groupArticlesList.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center py-12">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                        {renderGroupIcon(grp.iconName, 'w-6 h-6')}
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#082852] mb-1">
                        Nenhuma notícia neste grupo no momento
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        O monitoramento automatizado do portal varre os feeds do Banco Central,
                        Agência Brasil e veículos econômicos a cada 4 horas. Novas matérias serão
                        vinculadas automaticamente.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groupArticlesList.map((art) => (
                        <NewsCard
                          key={`${grp.id}-${art.id}`}
                          article={art}
                          isNew={newArticleIds.has(art.id)}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </main>

      {/* 5. Bloco de Rodapé Editorial / Newsletter */}
      <section className="bg-white border-t border-stone-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#082852] to-[#0B3B7A] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16A34A]/20 border border-[#22C55E]/40 rounded-full text-xs font-mono font-bold text-[#22C55E] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONSULTORIA ESPECIALIZADA</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                Precisa de análise tributária ou macroeconômica personalizada para a sua empresa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                A BORLIM Consultoria Empresarial calcula o impacto da Reforma Tributária (IBS/CBS),
                simula o custo de oportunidade do capital e estrutura o planejamento financeiro
                completo do seu negócio.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Falar com Flávio Borlim</span>
                </a>
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/20"
                >
                  <Mail className="w-4 h-4 text-[#22C55E]" />
                  <span>flavio@borlim.com.br</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
