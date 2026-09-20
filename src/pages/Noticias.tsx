import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Sparkles,
  Scale,
  TrendingUp,
  Landmark,
  Layers,
} from 'lucide-react'
import { NewsArticle, NewsCategory } from '@/types'
import { getNewsArticles } from '@/services/news'
import { useRealtime } from '@/hooks/use-realtime'
import NewsCard from '@/components/NewsCard'

export default function Noticias() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryParam = (searchParams.get('categoria') as NewsCategory | 'all') || 'all'
  const searchParam = searchParams.get('busca') || ''

  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [newArticleIds, setNewArticleIds] = useState<Set<string>>(new Set())

  const [searchTerm, setSearchTerm] = useState(searchParam)
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>(categoryParam)

  const loadArticles = async (p = page, cat = selectedCategory, s = searchTerm) => {
    setLoading(true)
    const result = await getNewsArticles({
      page: p,
      perPage: 12,
      category: cat,
      search: s,
    })

    setArticles(result.items)
    setPage(result.page)
    setTotalPages(result.totalPages)
    setTotalItems(result.totalItems)
    setLoading(false)
  }

  useEffect(() => {
    setSelectedCategory(categoryParam)
    setSearchTerm(searchParam)
    loadArticles(1, categoryParam, searchParam)
  }, [categoryParam, searchParam])

  // Real-time updates for news
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
    loadArticles(page, selectedCategory, searchTerm)
  })

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (searchTerm) {
        next.set('busca', searchTerm)
      } else {
        next.delete('busca')
      }
      return next
    })
    loadArticles(1, selectedCategory, searchTerm)
  }

  const handleCategoryChange = (cat: NewsCategory | 'all') => {
    setSelectedCategory(cat)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (cat !== 'all') {
        next.set('categoria', cat)
      } else {
        next.delete('categoria')
      }
      return next
    })
    loadArticles(1, cat, searchTerm)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      loadArticles(newPage, selectedCategory, searchTerm)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const categories: { id: NewsCategory | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'Todas', icon: Layers },
    { id: 'reforma_tributaria', label: 'Reforma Tributária', icon: Scale },
    { id: 'economia', label: 'Economia', icon: TrendingUp },
    { id: 'mercados', label: 'Mercados', icon: Newspaper },
    { id: 'politica_fiscal', label: 'Política Fiscal', icon: Landmark },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. Header Band (Fintech Editorial Wire Header) */}
      <section className="bg-[#082852] text-white border-b border-[#0B3B7A] py-14 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#16A34A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-72 h-72 bg-[#1557A6]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Cobertura Editorial & Feeds Automatizados
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Notícias & Reforma Tributária
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed font-sans">
              Acompanhamento detalhado da regulamentação do IBS, CBS e Imposto Seletivo, além dos
              principais acontecimentos macroeconômicos do país, com síntese orientada à tomada de
              decisão.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Toolbar: Search + Category Chips */}
      <section className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 py-4 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#16A34A] text-white font-bold shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72 shrink-0">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar notícias..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#16A34A] text-[#082852] placeholder:text-slate-400 font-sans"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
            </form>
          </div>
        </div>
      </section>

      {/* 3. News Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden h-96 flex flex-col justify-between"
              >
                <div className="aspect-[16/9] bg-slate-200 w-full" />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-3" />
                    <div className="h-6 bg-slate-200 rounded w-full mb-2" />
                    <div className="h-6 bg-slate-200 rounded w-4/5 mb-4" />
                    <div className="h-3 bg-slate-100 rounded w-full mb-1" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                  </div>
                  <div className="h-4 bg-slate-100 rounded w-1/3 pt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300 p-8">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#082852] mb-2">
              Nenhuma matéria encontrada
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Não encontramos resultados para os termos ou categoria selecionados. Tente ajustar os
              filtros ou redefinir a busca.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSearchParams({})
                loadArticles(1, 'all', '')
              }}
              className="px-5 py-2.5 bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-200 pb-2">
              <span>
                Exibindo {articles.length} de {totalItems} matérias
              </span>
              <span>
                Página {page} de {totalPages || 1}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art) => (
                <NewsCard key={art.id} article={art} isNew={newArticleIds.has(art.id)} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-slate-200 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono rounded bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-40 disabled:hover:bg-white text-slate-700 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                  <button
                    key={pNum}
                    type="button"
                    onClick={() => handlePageChange(pNum)}
                    className={`w-9 h-9 flex items-center justify-center text-xs font-mono font-bold rounded-lg transition-colors ${
                      pNum === page
                        ? 'bg-[#0B3B7A] text-white shadow-xs'
                        : 'bg-white border border-stone-300 hover:bg-stone-50 text-slate-700'
                    }`}
                  >
                    {pNum}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono rounded bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-40 disabled:hover:bg-white text-slate-700 font-semibold"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
