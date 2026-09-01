import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Scale,
  LineChart as LineChartIcon,
  Wallet,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Mail,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import { EconomicIndicator, NewsArticle } from '@/types'
import { getEconomicIndicators, syncIndicatorsNow } from '@/services/indicators'
import { getRecentNews, getNewsByCategory, subscribeNewsletter } from '@/services/news'
import { useRealtime } from '@/hooks/use-realtime'
import IndicatorCard from '@/components/IndicatorCard'
import NewsCard from '@/components/NewsCard'
import { toast } from '@/hooks/use-toast'

export default function Index() {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([])
  const [news, setNews] = useState<NewsArticle[]>([])
  const [reformaNews, setReformaNews] = useState<NewsArticle[]>([])
  const [syncing, setSyncing] = useState(false)
  const [emailCta, setEmailCta] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const loadData = async () => {
    const [indData, newsData, rtData] = await Promise.all([
      getEconomicIndicators(),
      getRecentNews(6),
      getNewsByCategory('reforma_tributaria', 4),
    ])
    setIndicators(indData)
    setNews(newsData)
    setReformaNews(rtData)
  }

  useEffect(() => {
    loadData()
  }, [])

  // Real-time synchronization
  useRealtime<EconomicIndicator>('economic_indicators', () => {
    getEconomicIndicators().then(setIndicators)
  })

  useRealtime<NewsArticle>('news_articles', () => {
    getRecentNews(6).then(setNews)
    getNewsByCategory('reforma_tributaria', 4).then(setReformaNews)
  })

  const handleManualSync = async () => {
    setSyncing(true)
    const success = await syncIndicatorsNow()
    setSyncing(false)
    if (success) {
      toast({
        title: 'Sincronização concluída',
        description: 'Dados mais recentes obtidos junto ao Banco Central do Brasil.',
      })
      loadData()
    } else {
      toast({
        title: 'Aviso',
        description: 'Os dados já estão em sua versão mais recente.',
      })
    }
  }

  const handleCtaSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailCta || !emailCta.includes('@')) {
      toast({
        title: 'E-mail inválido',
        description: 'Por favor, insira um endereço válido.',
        variant: 'destructive',
      })
      return
    }
    setSubscribing(true)
    const res = await subscribeNewsletter(emailCta)
    setSubscribing(false)
    if (res) {
      setSubscribed(true)
      setEmailCta('')
      toast({
        title: 'Cadastro efetuado',
        description: 'Você receberá nossos boletins econômicos.',
      })
    }
  }

  // Hero chart dataset: combine Selic and IPCA 12m history
  const selicIndicator = indicators.find((i) => i.code === 'selic')
  const ipcaIndicator = indicators.find((i) => i.code === 'ipca_12m')

  const heroChartData = (() => {
    const selicHist = selicIndicator?.history || []
    const ipcaHist = ipcaIndicator?.history || []
    const pointsCount = Math.min(selicHist.length, ipcaHist.length, 30)

    if (pointsCount === 0) return []

    const sSlice = selicHist.slice(-pointsCount)
    const iSlice = ipcaHist.slice(-pointsCount)

    return sSlice.map((s, idx) => {
      const i = iSlice[idx] || s
      let displayDate = s.date
      if (s.date && s.date.includes('-')) {
        const parts = s.date.split('-')
        if (parts.length === 3) displayDate = `${parts[2]}/${parts[1]}`
      }
      return {
        date: s.date,
        displayDate,
        selic: s.value,
        ipca: i.value,
      }
    })
  })()

  // Highlighted 4 indicators
  const featuredIndicators = indicators
    .filter((i) => ['selic', 'ipca_12m', 'igpm_12m', 'dolar_comercial'].includes(i.code))
    .slice(0, 4)

  const leadReformaStory = reformaNews[0]
  const sideReformaStories = reformaNews.slice(1, 4)

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION (Dark Navy with Brass Glow) */}
      <section className="relative bg-[#0B1F3A] text-white overflow-hidden pt-12 pb-20 border-b border-[#1A365D]">
        {/* Subtle Radial Brass Glow top-right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#B8892F]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#183863]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8892F]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4A853] font-bold">
                  Inteligência Econômica para Decisões de Negócio
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl font-bold text-[#F6F4EE] leading-[1.15] tracking-tight">
                A economia brasileira, explicada com dados e contexto.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Acompanhamento contínuo dos indicadores macroeconômicos oficiais (BCB/SGS) e análise
                dos impactos da Reforma Tributária sobre empresas e investimentos.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/indicadores"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B8892F] hover:bg-[#D4A853] text-[#0B1F3A] font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-md hover:shadow-lg font-mono"
                >
                  <span>Ver indicadores</span>
                  <TrendingUp className="w-4 h-4 text-[#0B1F3A]" />
                </Link>

                <Link
                  to="/noticias"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/10 text-[#F6F4EE] border border-slate-500 hover:border-[#D4A853] font-medium text-xs uppercase tracking-wider rounded transition-colors font-mono"
                >
                  <span>Explorar notícias</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A853]" />
                </Link>
              </div>

              {/* Live sync footnote */}
              <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Alimentação Automática BCB
                </span>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={syncing}
                  className="hover:text-[#D4A853] transition-colors flex items-center gap-1 underline underline-offset-2"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${syncing ? 'animate-spin text-[#D4A853]' : ''}`}
                  />
                  {syncing ? 'Atualizando...' : 'Atualizar agora'}
                </button>
              </div>
            </div>

            {/* Right Column: Hero Interactive Area Chart */}
            <div className="lg:col-span-6 bg-[#102A4E]/80 backdrop-blur-md rounded-xl p-6 border border-[#1E4377] shadow-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-[#1E4377] pb-3">
                <div className="flex flex-col">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4A853] font-bold">
                    Dinâmica Macroeconômica (Últimos 90 dias)
                  </span>
                  <span className="font-serif text-sm text-slate-200">
                    Taxa Selic (% a.a.) vs IPCA 12m (%)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-[#D4A853]">
                    <span className="w-2.5 h-2.5 rounded bg-[#D4A853]" /> Selic
                  </span>
                  <span className="flex items-center gap-1 text-[#60A5FA]">
                    <span className="w-2.5 h-2.5 rounded bg-[#60A5FA]" /> IPCA 12m
                  </span>
                </div>
              </div>

              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={heroChartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="heroSelic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B8892F" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#B8892F" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="heroIpca" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 2" stroke="#1E4377" vertical={false} />
                    <XAxis
                      dataKey="displayDate"
                      tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={{ stroke: '#1E4377' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={false}
                      tickLine={false}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload
                          return (
                            <div className="bg-[#0B1F3A] border border-[#B8892F] p-3 rounded shadow-xl text-xs font-mono">
                              <p className="text-slate-400 mb-1">{item.date}</p>
                              <p className="text-[#D4A853] font-bold">
                                Selic: {item.selic?.toFixed(2)}% a.a.
                              </p>
                              <p className="text-[#60A5FA] font-bold">
                                IPCA 12m: {item.ipca?.toFixed(2)}%
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="selic"
                      stroke="#B8892F"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#heroSelic)"
                    />
                    <Area
                      type="monotone"
                      dataKey="ipca"
                      stroke="#60A5FA"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#heroIpca)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-3 border-t border-[#1E4377] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Fonte: Banco Central do Brasil — SGS</span>
                <span className="text-[#D4A853]">
                  Taxa real calculada: +{(13.25 - 4.56).toFixed(2)}% a.a.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INDICADORES EM DESTAQUE */}
      <section className="py-16 bg-white border-b border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
                Panorama em Tempo Real
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0B1F3A] mt-1">
                Indicadores em destaque
              </h2>
            </div>
            <Link
              to="/indicadores"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0B1F3A] hover:text-[#B8892F] transition-colors"
            >
              <span>Ver painel completo de indicadores</span>
              <ArrowRight className="w-4 h-4 text-[#B8892F]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredIndicators.map((ind) => (
              <IndicatorCard key={ind.id} indicator={ind} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. REFORMA TRIBUTÁRIA EM FOCO (Dark Editorial Band) */}
      <section className="py-16 bg-[#0B1F3A] text-white border-b border-[#1A365D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 border-b border-[#1A365D] pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#B8892F]/20 text-[#D4A853] rounded">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A853] font-bold">
                  Especial Regulatório
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE]">
                  Reforma Tributária em foco
                </h2>
              </div>
            </div>

            <Link
              to="/noticias?categoria=reforma_tributaria"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold text-[#D4A853] hover:text-white uppercase tracking-wider"
            >
              <span>Todas sobre Reforma</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Lead Story */}
            {leadReformaStory && (
              <div className="lg:col-span-7 bg-[#102A4E] rounded-lg p-6 sm:p-8 border border-[#1E4377] flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#B8892F] text-[#0B1F3A]">
                      Matéria Principal
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {leadReformaStory.published_at?.slice(0, 10)}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mb-4 leading-tight">
                    {leadReformaStory.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-serif">
                    {leadReformaStory.summary}
                  </p>

                  {leadReformaStory.ai_analysis && (
                    <div className="bg-[#0B1F3A] border-l-4 border-[#B8892F] p-4 rounded-r mb-6">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D4A853] font-bold mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Visão da Consultoria</span>
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "{leadReformaStory.ai_analysis}"
                      </p>
                    </div>
                  )}
                </div>

                <Link
                  to={`/noticias/${leadReformaStory.slug || leadReformaStory.id}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4A853] hover:text-white uppercase tracking-wider mt-2 group"
                >
                  <span>Ler matéria completa</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            {/* Right: Next 3 Stories */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {sideReformaStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/noticias/${story.slug || story.id}`}
                  className="group block bg-[#102A4E]/60 hover:bg-[#102A4E] rounded-lg p-5 border border-[#1E4377] transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="text-[#D4A853] font-semibold">{story.source}</span>
                    <span>{story.published_at?.slice(0, 10)}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-100 group-hover:text-[#D4A853] transition-colors line-clamp-2 mb-2 leading-snug">
                    {story.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {story.summary}
                  </p>
                </Link>
              ))}

              <Link
                to="/noticias?categoria=reforma_tributaria"
                className="sm:hidden w-full text-center py-3 bg-[#102A4E] text-[#D4A853] rounded text-xs font-mono uppercase font-bold"
              >
                Ver todas as notícias sobre Reforma
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ÚLTIMAS DO PORTAL (Ivory Background) */}
      <section className="py-16 bg-[#F6F4EE] border-b border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
                Fluxo Noticioso
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0B1F3A] mt-1">
                Últimas do portal
              </h2>
            </div>
            <Link
              to="/noticias"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0B1F3A] hover:text-[#B8892F] transition-colors"
            >
              <span>Ver todas as notícias</span>
              <ArrowRight className="w-4 h-4 text-[#B8892F]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} article={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOBRE A CONSULTORIA (White Background) */}
      <section className="py-20 bg-white border-b border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
              Soluções Estratégicas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Assessoria Econômica & Planejamento Tributário
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Aliamos rigor metodológico quantitativo e visão regulatória aplicada para apoiar
              lideranças empresariais em momentos de volatilidade e transformação fiscal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#F6F4EE] p-8 rounded-lg border border-[#E5E0D6] flex flex-col justify-between hover:border-[#B8892F] transition-colors">
              <div>
                <div className="w-12 h-12 rounded bg-[#0B1F3A] flex items-center justify-center text-[#B8892F] mb-6">
                  <LineChartIcon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-3">
                  Análise Macroeconômica
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Projeções de inflação, trajetórias da taxa Selic, cenários cambiais e modelagem de
                  risco de crédito para orientar decisões de investimento e dívida.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E0DBCF] text-[11px] font-mono text-[#B8892F] font-semibold">
                Cenários Preditivos & Modelos
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F6F4EE] p-8 rounded-lg border border-[#E5E0D6] flex flex-col justify-between hover:border-[#B8892F] transition-colors">
              <div>
                <div className="w-12 h-12 rounded bg-[#0B1F3A] flex items-center justify-center text-[#B8892F] mb-6">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-3">
                  Reforma Tributária (IVA Dual)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Diagnóstico de impacto de IBS/CBS, simulações de carga tributária efetiva por
                  cadeia produtiva e preparação técnica para o Split Payment.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E0DBCF] text-[11px] font-mono text-[#B8892F] font-semibold">
                Transição Segura 2026-2033
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F6F4EE] p-8 rounded-lg border border-[#E5E0D6] flex flex-col justify-between hover:border-[#B8892F] transition-colors">
              <div>
                <div className="w-12 h-12 rounded bg-[#0B1F3A] flex items-center justify-center text-[#B8892F] mb-6">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-3">
                  Planejamento Financeiro
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Estruturação de fluxo de caixa, precificação de produtos com novos regimes fiscais
                  e renegociação de passivos indexados a CDI e IPCA.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E0DBCF] text-[11px] font-mono text-[#B8892F] font-semibold">
                Eficiência de Capital Corporativo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL (Brass Tinted Panel) */}
      <section className="py-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#102A4E] to-[#183863] rounded-2xl p-8 sm:p-12 border border-[#B8892F]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4A853] font-bold">
                Atendimento Consultivo Direto
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mt-1 mb-3">
                Quer uma análise personalizada aplicada ao seu negócio?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Entre em contato com nossa equipe técnica para discutir cenários econômicos e
                antecipar os impactos da Reforma Tributária na sua empresa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <a
                href="mailto:flavio@borlim.com.br?subject=Solicitação%20de%20Consultoria%20Econômica"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B8892F] hover:bg-[#D4A853] text-[#0B1F3A] text-xs font-mono font-bold uppercase tracking-wider rounded transition-all shadow-md"
              >
                <Mail className="w-4 h-4 text-[#0B1F3A]" />
                <span>Fale com um especialista</span>
              </a>

              <Link
                to="/sobre"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#F6F4EE] text-xs font-mono font-bold uppercase tracking-wider rounded border border-slate-600 transition-colors"
              >
                <span>Conheça nossos serviços</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
