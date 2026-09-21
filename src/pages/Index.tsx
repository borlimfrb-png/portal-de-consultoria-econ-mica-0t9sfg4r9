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
  FileSpreadsheet,
  Coins,
  Calculator,
  CheckCircle2,
  Tag,
  Target,
  CircleDollarSign,
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

  // Highlighted 4 indicators (Selic, IPCA, IGP-M e Dólar Comercial)
  const featuredIndicators = indicators
    .filter((i) => ['selic', 'ipca_12m', 'igpm_12m', 'dolar_comercial'].includes(i.code))
    .slice(0, 4)

  const leadReformaStory = reformaNews[0]
  const sideReformaStories = reformaNews.slice(1, 4)

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION (Fintech Premium: Tech Mesh, Glows, Glassmorphism & Terminal Metrics) */}
      <section className="relative bg-[#082852] text-white overflow-hidden pt-14 pb-20 sm:pb-24 border-b border-[#0B3B7A]">
        {/* Technological background patterns & glowing orbs — Intensified glow & animated grid */}
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#1557A6]/40 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_35%,#082852_95%)] pointer-events-none" />

        {/* Top/bottom edge subtle green glow lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22C55E]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22C55E]/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Typography, Live Terminal Stats & CTAs */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              {/* Eyebrow badge with live pulse */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 w-fit backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                  Inteligência Macroeconômica & Consultoria Estratégica
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.12] tracking-tight">
                A economia brasileira, explicada com{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#22C55E] to-teal-300">
                  dados e precisão
                </span>
                .
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-sans">
                Acompanhamento contínuo dos indicadores macroeconômicos oficiais (BCB/SGS) e análise
                dos impactos da Reforma Tributária sobre empresas e investimentos.
              </p>

              {/* Mini Terminal Metrics (Tech HUD Grid) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[#0B3B7A]/60 border border-slate-700/80 backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Taxa Selic
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-[#22C55E] tabular-nums">
                    {selicIndicator?.current_value
                      ? `${selicIndicator.current_value.toFixed(2)}%`
                      : '13,25%'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Meta Copom</span>
                </div>
                <div className="flex flex-col border-x border-slate-700/60 px-2 sm:px-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    IPCA 12m
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-[#60A5FA] tabular-nums">
                    {ipcaIndicator?.current_value
                      ? `${ipcaIndicator.current_value.toFixed(2)}%`
                      : '4,56%'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Inflação Oficial</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Juro Real
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-white tabular-nums">
                    +
                    {(
                      (selicIndicator?.current_value ?? 13.25) -
                      (ipcaIndicator?.current_value ?? 4.56)
                    ).toFixed(2)}
                    %
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/90 font-medium">
                    Líquido a.a.
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {/* Main Featured Brand CTA: GESTÃO EMPRESARIAL com Glow Verde Intensificado */}
                <a
                  href="https://analise-de-balanco-6514f.goskip.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all shadow-[0_0_25px_rgba(34,197,94,0.45)] hover:shadow-[0_0_40px_rgba(34,197,94,0.75)] font-mono border-2 border-[#22C55E]/80 hover:border-[#22C55E] hover:scale-[1.03] active:scale-[0.99] group relative overflow-hidden"
                  title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
                >
                  <span className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute -inset-1 bg-emerald-400/25 blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">GESTÃO EMPRESARIAL</span>
                  <ExternalLink className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 transition-transform relative z-10" />
                </a>

                <Link
                  to="/indicadores"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#0B3B7A] hover:bg-[#1557A6] text-white border border-[#22C55E]/60 hover:border-[#22C55E] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md font-mono"
                >
                  <span>Ver indicadores</span>
                  <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                </Link>

                <Link
                  to="/noticias"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-slate-600 hover:border-[#16A34A] font-medium text-xs uppercase tracking-wider rounded-lg transition-colors font-mono"
                >
                  <span>Notícias</span>
                  <ArrowRight className="w-4 h-4 text-[#22C55E]" />
                </Link>
              </div>

              {/* Live sync footnote */}
              <div className="pt-1 flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-[#22C55E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  Alimentação Automática BCB / SGS
                </span>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={syncing}
                  className="hover:text-[#22C55E] transition-colors flex items-center gap-1 underline underline-offset-2"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${syncing ? 'animate-spin text-[#22C55E]' : ''}`}
                  />
                  {syncing ? 'Atualizando...' : 'Atualizar agora'}
                </button>
              </div>
            </div>

            {/* Right Column: Hero Interactive Area Chart (Financial Terminal Glass Panel) */}
            <div className="lg:col-span-6 bg-[#0B3B7A]/85 backdrop-blur-md rounded-2xl p-6 border border-[#22C55E]/40 hover:border-[#22C55E]/70 shadow-[0_0_35px_rgba(8,40,82,0.8),0_0_25px_rgba(34,197,94,0.2)] relative overflow-hidden group transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#16A34A]/25 rounded-full blur-2xl pointer-events-none animate-float-slow-1" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1557A6]/35 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 border-b border-slate-700/80 pb-3">
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#22C55E] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    Dinâmica Macroeconômica (Últimos 90 dias)
                  </span>
                  <span className="font-serif text-sm text-white font-medium">
                    Taxa Selic (% a.a.) vs IPCA 12m (%)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-[#22C55E] font-semibold">
                    <span className="w-2.5 h-2.5 rounded bg-[#16A34A]" /> Selic
                  </span>
                  <span className="flex items-center gap-1.5 text-[#60A5FA] font-semibold">
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
                        <stop offset="5%" stopColor="#16A34A" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#16A34A" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="heroIpca" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 2" stroke="#1E4B8A" vertical={false} />
                    <XAxis
                      dataKey="displayDate"
                      tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={{ stroke: '#1E4B8A' }}
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
                            <div className="bg-[#082852]/95 backdrop-blur-md border border-[#16A34A] p-3 rounded-lg shadow-xl text-xs font-mono">
                              <p className="text-slate-400 mb-1">{item.date}</p>
                              <p className="text-[#22C55E] font-bold">
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
                      stroke="#16A34A"
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

              <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Fonte Oficial: Banco Central do Brasil — SGS</span>
                <span className="text-[#22C55E] font-semibold">
                  Taxa real de juros calculada: +
                  {(
                    (selicIndicator?.current_value ?? 13.25) -
                    (ipcaIndicator?.current_value ?? 4.56)
                  ).toFixed(2)}
                  % a.a.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INDICADORES EM DESTAQUE */}
      <section className="py-16 bg-[#F0F4F8] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Panorama em Tempo Real
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#082852] mt-1">
                Indicadores em destaque
              </h2>
            </div>
            <Link
              to="/indicadores"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A] hover:text-[#16A34A] transition-colors"
            >
              <span>Ver painel completo de indicadores</span>
              <ArrowRight className="w-4 h-4 text-[#16A34A]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredIndicators.map((ind) => (
              <IndicatorCard key={ind.id} indicator={ind} />
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 NOSSOS SERVIÇOS — VALUATION & PLANEJAMENTO ESTRATÉGICO */}
      <section className="py-16 sm:py-20 bg-[#E5EDF5]/60 border-b border-stone-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Especialidades da BORLIM Consultoria
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#082852] mt-1">
                Nossos Serviços Estratégicos
              </h2>
              <p className="text-sm sm:text-base text-slate-700 mt-2 font-sans leading-relaxed">
                Consultoria econômica e financeira de empresário para empresário, fundamentada em 48
                indicadores de desempenho e auditoria preventiva de insolvência.
              </p>
            </div>
            <a
              href="https://analise-de-balanco-6514f.goskip.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#15803D] hover:text-[#16A34A] transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Acessar Gestão Empresarial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Card 1: Gestão Financeira */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#16A34A] card-hover-lift transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm p-3">
                    <CircleDollarSign className="w-7 h-7" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] border border-emerald-200">
                    Controle & Caixa
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852] mb-2.5 group-hover:text-[#0B3B7A] transition-colors leading-snug">
                  Gestão Financeira
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-5">
                  Fluxo de caixa prático, diferença entre lucro e caixa real, ferramentas de
                  decisão, diagnóstico dos 48 indicadores e análise de risco de insolvência imediata
                  e em 12 meses.
                </p>

                <div className="space-y-2 mb-6 pt-3 border-t border-slate-100 font-sans text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Ciclo operacional vs. financeiro & NCG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Ferramentas: DRE, Ponto de Equilíbrio e Liquidez</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>48 indicadores e insolvência em 12 meses</span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  to="/gestao-financeira"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow group/btn border border-[#0B3B7A] hover:border-[#16A34A]"
                >
                  <span>Conhecer Gestão</span>
                  <ArrowRight className="w-4 h-4 text-[#22C55E] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Valuation */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#16A34A] card-hover-lift transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <Coins className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] border border-emerald-200">
                    Avaliação Pericial
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mb-3 group-hover:text-[#0B3B7A] transition-colors leading-snug">
                  Valuation & Avaliação de Empresas
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                  Avaliação precisa de ativos com indicador seguro para definir o piso patrimonial
                  do negócio, diagnóstico rigoroso com 48 indicadores e análise preventiva de
                  insolvência imediata e em 12 meses para negociações com sócios, compradores e
                  bancos.
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-slate-100 font-sans text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Indicador seguro de reavaliação de ativos físicos e intangíveis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Diagnóstico 360° com 48 indicadores de desempenho financeiro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Teste de insolvência imediata e no período de 12 meses</span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  to="/valuation"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow group/btn border border-[#0B3B7A] hover:border-[#16A34A]"
                >
                  <span>Conhecer Valuation</span>
                  <ArrowRight className="w-4 h-4 text-[#22C55E] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 3: Planejamento */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#16A34A] card-hover-lift transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0B3B7A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#0B3B7A]/10 transition-colors" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <Calculator className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#0B3B7A] border border-blue-200">
                    Gestão & Estratégia
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mb-3 group-hover:text-[#0B3B7A] transition-colors leading-snug">
                  Planejamento Econômico e Financeiro
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                  Estruturação dos três planejamentos estratégicos da Borlim (Financeiro, Econômico
                  e Balanced Scorecard) com teste preventivo de insolvência em 12 meses, garantindo
                  fluxo eficiente de capital de giro e maximização do lucro mensal da empresa.
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-slate-100 font-sans text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Planejamento Financeiro: fluxo de capital de giro e reinvestimento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Planejamento Econômico: melhoria consistente do lucro mensal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Balanced Scorecard: competitividade para nenhum negócio ser perdido</span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  to="/planejamento"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow group/btn border border-[#0B3B7A] hover:border-[#16A34A]"
                >
                  <span>Conhecer o Planejamento</span>
                  <ArrowRight className="w-4 h-4 text-[#22C55E] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 4: Formação de Preço para Vendas */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#16A34A] card-hover-lift transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <Tag className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] border border-emerald-200">
                    Pricing & Rentabilidade
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mb-3 group-hover:text-[#0B3B7A] transition-colors leading-snug">
                  Formação de Preço para Vendas
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                  Precificação técnica para Indústria (custo fabril e CIF), Comércio (CMV e giro) e
                  Serviços (homem-hora e utilização), conectada à margem de contribuição, ao ponto
                  de equilíbrio e à nova Reforma Tributária (IBS/CBS).
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-slate-100 font-sans text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Eliminação do erro clássico de confundir markup com margem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Metodologia sob medida para Indústria, Comércio e Serviços</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Conexão direta com a melhoria do lucro mensal e capital de giro</span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  to="/formacao-de-preco"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow group/btn border border-[#0B3B7A] hover:border-[#16A34A]"
                >
                  <span>Conhecer Formação de Preço</span>
                  <ArrowRight className="w-4 h-4 text-[#22C55E] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 5: Balanced Scorecard */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#16A34A] card-hover-lift transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] border border-emerald-200">
                    Competitividade & BSC
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mb-3 group-hover:text-[#0B3B7A] transition-colors leading-snug">
                  Balanced Scorecard (BSC)
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                  A empresa fica muito mais competitiva no mercado e nenhum negócio será perdido.
                  Alinhamento das 4 perspectivas (Financeira, Clientes, Processos e Pessoas) com os
                  48 indicadores da Borlim.
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-slate-100 font-sans text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Blindagem comercial: nenhum negócio perdido por demora ou falha</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>As 4 perspectivas mapeadas em indicadores práticos (KPIs)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Sinergia com Planejamento Financeiro, Econômico e Valuation</span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  to="/balanced-scorecard"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow group/btn border border-[#0B3B7A] hover:border-[#16A34A]"
                >
                  <span>Conhecer o BSC</span>
                  <ArrowRight className="w-4 h-4 text-[#22C55E] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3. REFORMA TRIBUTÁRIA EM FOCO (Fintech Terminal Band) */}
      <section className="py-16 sm:py-20 bg-[#082852] text-white border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-30 tech-grid-animated pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#1557A6]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-10 border-b border-slate-700/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-[#16A34A]/20 text-[#22C55E] rounded-xl border border-emerald-500/30">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                  Especial Regulatório & Tributário
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Reforma Tributária em foco
                </h2>
              </div>
            </div>

            <Link
              to="/noticias?categoria=reforma_tributaria"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#22C55E] hover:text-white uppercase tracking-wider transition-colors"
            >
              <span>Todas sobre Reforma</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Lead Story */}
            {leadReformaStory && (
              <div className="lg:col-span-7 bg-[#0B3B7A]/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-700/80 flex flex-col justify-between h-full shadow-xl">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#16A34A] text-white">
                      Matéria Principal
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      {leadReformaStory.published_at?.slice(0, 10)}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                    {leadReformaStory.title}
                  </h3>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 font-serif">
                    {leadReformaStory.summary}
                  </p>

                  {leadReformaStory.ai_analysis && (
                    <div className="bg-[#082852] border-l-4 border-[#16A34A] p-4 rounded-r-xl mb-6">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#22C55E] font-bold mb-1">
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
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#22C55E] hover:text-white uppercase tracking-wider mt-2 group"
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
                  className="group block bg-[#0B3B7A]/60 hover:bg-[#0B3B7A]/90 backdrop-blur-sm rounded-xl p-5 border border-slate-700/80 hover:border-[#16A34A]/50 transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="text-[#22C55E] font-semibold">{story.source}</span>
                    <span>{story.published_at?.slice(0, 10)}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white group-hover:text-[#22C55E] transition-colors line-clamp-2 mb-2 leading-snug">
                    {story.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {story.summary}
                  </p>
                </Link>
              ))}

              <Link
                to="/noticias?categoria=reforma_tributaria"
                className="sm:hidden w-full text-center py-3 bg-[#0B3B7A] text-[#22C55E] rounded-lg text-xs font-mono uppercase font-bold"
              >
                Ver todas as notícias sobre Reforma
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ÚLTIMAS DO PORTAL */}
      <section className="py-16 bg-[#F0F4F8] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Fluxo Noticioso
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#082852] mt-1">
                Últimas do portal
              </h2>
            </div>
            <Link
              to="/noticias"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A] hover:text-[#16A34A] transition-colors"
            >
              <span>Ver todas as notícias</span>
              <ArrowRight className="w-4 h-4 text-[#16A34A]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} article={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOBRE A CONSULTORIA */}
      <section className="py-20 bg-[#E5EDF5]/50 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Soluções Estratégicas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#082852] mt-2 mb-4">
              Assessoria Econômica & Planejamento Tributário
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Aliamos rigor metodológico quantitativo e visão regulatória aplicada para apoiar
              lideranças empresariais em momentos de volatilidade e transformação fiscal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200/90 flex flex-col justify-between hover:border-[#16A34A] card-hover-lift transition-all shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#082852] flex items-center justify-center text-[#22C55E] mb-6 group-hover:scale-105 transition-transform shadow-xs">
                  <LineChartIcon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#082852] mb-3 group-hover:text-[#0B3B7A] transition-colors">
                  Análise Macroeconômica
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Projeções de inflação, trajetórias da taxa Selic, cenários cambiais e modelagem de
                  risco de crédito para orientar decisões de investimento e dívida.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-200 text-[11px] font-mono text-[#15803D] font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>Cenários Preditivos</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200/90 flex flex-col justify-between hover:border-[#16A34A] card-hover-lift transition-all shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#082852] flex items-center justify-center text-[#22C55E] mb-6 group-hover:scale-105 transition-transform shadow-xs">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#082852] mb-3 group-hover:text-[#0B3B7A] transition-colors">
                  Reforma Tributária (IVA Dual)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Diagnóstico de impacto de IBS/CBS, simulações de carga tributária efetiva por
                  cadeia produtiva e preparação técnica para o Split Payment.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-200 text-[11px] font-mono text-[#15803D] font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>Transição 2026-2033</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200/90 flex flex-col justify-between hover:border-[#16A34A] card-hover-lift transition-all shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#082852] flex items-center justify-center text-[#22C55E] mb-6 group-hover:scale-105 transition-transform shadow-xs">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#082852] mb-3 group-hover:text-[#0B3B7A] transition-colors">
                  Planejamento Financeiro
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Estruturação de fluxo de caixa, precificação de produtos com novos regimes fiscais
                  e renegociação de passivos indexados a CDI e IPCA.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-200 text-[11px] font-mono text-[#15803D] font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>Eficiência de Capital</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL (Fintech Glass Panel com Grid & Glow) */}
      <section className="py-16 sm:py-20 bg-[#082852] text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-30 tech-grid-animated pointer-events-none" />
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-[#0B3B7A]/95 via-[#082852]/98 to-[#0B3B7A]/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border-2 border-[#22C55E]/50 shadow-[0_0_50px_rgba(8,40,82,0.9),0_0_30px_rgba(34,197,94,0.3)] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#22C55E]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold bg-[#16A34A]/15 border border-[#22C55E]/30 mb-3 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                Atendimento Consultivo Direto
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1 mb-3">
                Quer uma análise personalizada aplicada ao seu negócio?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Entre em contato com nossa equipe técnica para discutir cenários econômicos e
                antecipar os impactos da Reforma Tributária na sua empresa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto relative z-10">
              {/* Main Green CTA: GESTÃO EMPRESARIAL */}
              <a
                href="https://analise-de-balanco-6514f.goskip.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_25px_rgba(34,197,94,0.45)] hover:shadow-[0_0_40px_rgba(34,197,94,0.75)] border-2 border-[#22C55E]/80 hover:border-[#22C55E] group relative overflow-hidden hover:scale-[1.03] active:scale-[0.99]"
                title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
              >
                <span className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">GESTÃO EMPRESARIAL</span>
                <ExternalLink className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 transition-transform relative z-10" />
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=Solicitação%20de%20Consultoria%20Econômica"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-[#082852] hover:bg-slate-100 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md hover:scale-[1.01]"
              >
                <Mail className="w-4 h-4 text-[#0B3B7A]" />
                <span>Fale com especialista</span>
              </a>

              <Link
                to="/sobre"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg border border-slate-600 transition-colors backdrop-blur-sm"
              >
                <span>Nossos serviços</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
