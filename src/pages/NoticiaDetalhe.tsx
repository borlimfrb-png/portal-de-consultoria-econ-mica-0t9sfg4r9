import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  Sparkles,
  TrendingUp,
  Share2,
  Calendar,
  Check,
  Building2,
  Scale,
} from 'lucide-react'
import { NewsArticle, EconomicIndicator } from '@/types'
import { getNewsArticleByIdOrSlug, getRelatedNews } from '@/services/news'
import { getEconomicIndicators } from '@/services/indicators'
import NewsCard from '@/components/NewsCard'
import { toast } from '@/hooks/use-toast'

export default function NoticiaDetalhe() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [related, setRelated] = useState<NewsArticle[]>([])
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) return

    const loadArticleData = async () => {
      setLoading(true)
      const data = await getNewsArticleByIdOrSlug(id)
      setArticle(data)

      if (data) {
        const [relatedData, indData] = await Promise.all([
          getRelatedNews(data.id, data.category, 3),
          getEconomicIndicators(),
        ])
        setRelated(relatedData)
        setIndicators(indData)
      }

      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    loadArticleData()
  }, [id])

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast({
        title: 'Link copiado!',
        description: 'O link da matéria foi copiado para a sua área de transferência.',
      })
      setTimeout(() => setCopied(false), 2500)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-6" />
        <div className="h-10 bg-slate-200 rounded w-3/4 mb-4" />
        <div className="h-10 bg-slate-200 rounded w-1/2 mb-8" />
        <div className="aspect-[16/9] bg-slate-200 rounded-lg mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-4/6" />
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#082852] mb-3">
          Matéria não encontrada
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          A publicação solicitada não existe ou foi arquivada.
        </p>
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Notícias</span>
        </Link>
      </div>
    )
  }

  const categoryLabels: Record<string, string> = {
    reforma_tributaria: 'Reforma Tributária',
    economia: 'Economia',
    mercados: 'Mercados',
    politica_fiscal: 'Política Fiscal',
  }

  // Key indicators for the Context Card
  const selic = indicators.find((i) => i.code === 'selic')
  const ipca = indicators.find((i) => i.code === 'ipca_12m')
  const cdi = indicators.find((i) => i.code === 'cdi')
  const dolar = indicators.find((i) => i.code === 'dolar_comercial')

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Breadcrumb / Navigation */}
      <div className="bg-slate-100/80 border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-mono text-slate-600">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-1.5 hover:text-[#16A34A] transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para todas as notícias</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 hover:text-[#16A34A] transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
            <span>{copied ? 'Link copiado' : 'Compartilhar'}</span>
          </button>
        </div>
      </div>

      {/* 2. Article Hero & Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1">
        <article className="space-y-8">
          {/* Header & Meta */}
          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#16A34A] text-white">
                {categoryLabels[article.category] || article.category}
              </span>
              <span className="text-xs font-mono text-slate-500">{article.source}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#082852] leading-[1.2] tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-y border-slate-200 py-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.published_at?.slice(0, 16)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Leitura estimada: {article.read_time_minutes || 4} min
              </span>
              <span>•</span>
              <span className="text-[#15803D] font-semibold">Síntese Editorial Automatizada</span>
            </div>
          </header>

          {/* Featured Image */}
          {article.image_url && (
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Lead Summary Paragraph (Large Serif) */}
          <div className="text-lg sm:text-xl font-serif text-[#082852] leading-relaxed bg-slate-50 p-6 rounded-xl border-l-4 border-[#16A34A]">
            <p className="italic">{article.summary}</p>
          </div>

          {/* AI Analysis / Strategic perspective */}
          {article.ai_analysis && (
            <div className="bg-gradient-to-br from-[#0B3B7A] to-[#082852] text-white p-6 sm:p-8 rounded-xl border border-slate-700 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#22C55E] mb-3">
                <Sparkles className="w-4 h-4 text-[#22C55E]" />
                <span>Perspectiva Estratégica da Consultoria</span>
              </div>
              <p className="font-serif text-base text-slate-200 leading-relaxed">
                {article.ai_analysis}
              </p>
            </div>
          )}

          {/* Context Card (Navy/Blue): Economic Indicators snapshot */}
          <div className="bg-[#082852] text-white p-6 rounded-xl border border-slate-700 shadow-md">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Contexto Macroeconômico de Referência
                </h3>
              </div>
              <Link
                to="/indicadores"
                className="text-[11px] font-mono text-[#22C55E] hover:underline"
              >
                Ver todos ›
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {selic && (
                <div className="bg-[#0B3B7A] p-3 rounded border border-slate-700">
                  <span className="text-[10px] font-mono text-slate-300 block uppercase">
                    Selic Meta
                  </span>
                  <span className="text-lg font-mono font-bold text-[#22C55E]">
                    {selic.current_value.toFixed(2)}%
                  </span>
                </div>
              )}
              {ipca && (
                <div className="bg-[#0B3B7A] p-3 rounded border border-slate-700">
                  <span className="text-[10px] font-mono text-slate-300 block uppercase">
                    IPCA 12m
                  </span>
                  <span className="text-lg font-mono font-bold text-[#60A5FA]">
                    {ipca.current_value.toFixed(2)}%
                  </span>
                </div>
              )}
              {cdi && (
                <div className="bg-[#0B3B7A] p-3 rounded border border-slate-700">
                  <span className="text-[10px] font-mono text-slate-300 block uppercase">
                    CDI Anual
                  </span>
                  <span className="text-lg font-mono font-bold text-slate-200">
                    {cdi.current_value.toFixed(2)}%
                  </span>
                </div>
              )}
              {dolar && (
                <div className="bg-[#0B3B7A] p-3 rounded border border-slate-700">
                  <span className="text-[10px] font-mono text-slate-300 block uppercase">
                    Dólar PTAX
                  </span>
                  <span className="text-lg font-mono font-bold text-emerald-400">
                    R$ {dolar.current_value.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <Link
              to="/noticias"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A] hover:text-[#16A34A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para notícias</span>
            </Link>

            {article.source_url && (
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B3B7A] hover:bg-[#082852] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
              >
                <span>Ver publicação original na fonte ({article.source})</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#22C55E]" />
              </a>
            )}
          </div>
        </article>

        {/* 3. Related News Section */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#082852]">
                Matérias Relacionadas
              </h3>
              <Link
                to={`/noticias?categoria=${article.category}`}
                className="text-xs font-mono font-bold text-[#15803D] hover:underline uppercase"
              >
                Mais sobre {categoryLabels[article.category]} ›
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <NewsCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
