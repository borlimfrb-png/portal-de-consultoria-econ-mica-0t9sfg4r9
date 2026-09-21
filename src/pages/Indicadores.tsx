import { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Info,
  Calendar,
  Layers,
  Database,
  ArrowUpRight,
  ChevronRight,
  Filter,
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import { EconomicIndicator, IndicatorCategory } from '@/types'
import { getEconomicIndicators, syncIndicatorsNow } from '@/services/indicators'
import { useRealtime } from '@/hooks/use-realtime'
import IndicatorAreaChart from '@/components/IndicatorAreaChart'
import Sparkline from '@/components/Sparkline'
import InvestmentsSection from '@/components/InvestmentsSection'
import { EconomicRates } from '@/data/investments'
import { toast } from '@/hooks/use-toast'

export default function Indicadores() {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([])
  const [selectedCategory, setSelectedCategory] = useState<IndicatorCategory | 'all'>('all')
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('')

  const loadIndicators = async () => {
    setLoading(true)
    const data = await getEconomicIndicators()
    setIndicators(data)
    setLoading(false)
    setLastUpdatedTime(
      new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    )
  }

  useEffect(() => {
    loadIndicators()
  }, [])

  // Real-time synchronization
  useRealtime<EconomicIndicator>('economic_indicators', () => {
    getEconomicIndicators().then((data) => {
      setIndicators(data)
      setLastUpdatedTime(
        new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      )
    })
  })

  const handleManualSync = async () => {
    setSyncing(true)
    const success = await syncIndicatorsNow()
    setSyncing(false)
    if (success) {
      toast({
        title: 'Sincronizado com o Banco Central',
        description: 'Séries do SGS atualizadas com as últimas observações publicadas.',
      })
      loadIndicators()
    } else {
      toast({
        title: 'Informação',
        description: 'As séries já estão atualizadas com as informações mais recentes do BCB.',
      })
    }
  }

  const categoryChips: { id: IndicatorCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Todos os Indicadores' },
    { id: 'cambio', label: 'Câmbio (Comercial, Turismo, Cartão)' },
    { id: 'juros', label: 'Juros' },
    { id: 'inflacao', label: 'Inflação' },
    { id: 'atividade', label: 'Atividade Econômica' },
  ]

  // Extração das taxas ativas para a seção de Investimentos
  const economicRates: EconomicRates = (() => {
    const selicObj = indicators.find((i) => i.code === 'selic')
    const cdiObj = indicators.find((i) => i.code === 'cdi')
    const ipcaObj = indicators.find((i) => i.code === 'ipca_12m')

    const selicVal = selicObj?.current_value
    const cdiVal = cdiObj?.current_value
    const ipcaVal = ipcaObj?.current_value

    return {
      selic: typeof selicVal === 'number' && !isNaN(selicVal) ? selicVal : 13.75,
      cdi: typeof cdiVal === 'number' && !isNaN(cdiVal) ? cdiVal : 13.9,
      ipca: typeof ipcaVal === 'number' && !isNaN(ipcaVal) ? ipcaVal : 4.22,
      isEstimateSelic: typeof selicVal !== 'number' || isNaN(selicVal),
      isEstimateCdi: typeof cdiVal !== 'number' || isNaN(cdiVal),
      isEstimateIpca: typeof ipcaVal !== 'number' || isNaN(ipcaVal),
    }
  })()

  const filteredIndicators = indicators.filter((ind) => {
    if (selectedCategory === 'all') return true
    return ind.category === selectedCategory
  })

  // Comparison Multi-series line chart: IPCA 12m vs IGP-M
  const ipcaInd = indicators.find((i) => i.code === 'ipca_12m')
  const igpmInd = indicators.find((i) => i.code === 'igpm_12m')

  const comparisonChartData = (() => {
    const ipcaHist = ipcaInd?.history || []
    const igpmHist = igpmInd?.history || []
    const len = Math.min(ipcaHist.length, igpmHist.length, 30)
    if (len === 0) return []

    const ipcaSlice = ipcaHist.slice(-len)
    const igpmSlice = igpmHist.slice(-len)

    return ipcaSlice.map((item, idx) => {
      const igpmItem = igpmSlice[idx] || item
      let label = item.date
      if (item.date && item.date.includes('-')) {
        const p = item.date.split('-')
        if (p.length === 3) label = `${p[2]}/${p[1]}`
      }
      return {
        date: item.date,
        displayDate: label,
        ipca: item.value,
        igpm: igpmItem.value,
      }
    })
  })()

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. Header Band (Fintech Terminal Header with Mesh & Orbs) */}
      <section className="bg-[#082852] text-white py-14 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 mb-3 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                  Sistema Gerenciador de Séries Temporais (SGS / BCB)
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Indicadores Econômicos
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2.5 max-w-2xl leading-relaxed font-sans">
                Atualizados automaticamente a partir do Banco Central do Brasil (SGS) todos os dias
                às 08:00 e 18:00 UTC. Séries históricas com acompanhamento em tempo real.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {lastUpdatedTime && (
                <div className="bg-[#0B3B7A] border border-slate-700 px-3 py-2 rounded-lg text-xs font-mono text-slate-300 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                  </span>
                  <span>Última checagem: {lastUpdatedTime}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleManualSync}
                disabled={syncing}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 border border-[#22C55E]/40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? 'Atualizando...' : 'Sincronizar BCB'}</span>
              </button>

              <a
                href="#investimentos"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-[#0B3B7A] hover:bg-[#1557A6] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-emerald-400/40 text-emerald-300 hover:text-white shadow-xs"
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Ver Investimentos</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <section className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-mono text-slate-500 uppercase font-semibold flex items-center gap-1 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filtrar:
            </span>
            {categoryChips.map((chip) => {
              const isActive = selectedCategory === chip.id
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedCategory(chip.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#16A34A] text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  {chip.label}
                </button>
              )
            })}

            <div className="h-4 w-[1px] bg-stone-300 mx-1 shrink-0" />

            <a
              href="#investimentos"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shrink-0 bg-emerald-50 hover:bg-emerald-100 text-[#15803D] border border-emerald-200 inline-flex items-center gap-1"
            >
              <span>⭐ Investimentos & Simulador</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Main Content: Indicator Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 border border-slate-200 h-80 flex flex-col justify-between"
              >
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
                <div className="h-12 bg-slate-200 rounded w-1/2 mb-4" />
                <div className="h-32 bg-slate-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredIndicators.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 p-8">
            <Database className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-[#082852] mb-2">
              Nenhum indicador encontrado para esta categoria
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Tente selecionar outra categoria ou recarregar os dados do Banco Central.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg"
            >
              Ver todos os indicadores
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredIndicators.map((indicator) => {
              const variation = indicator.variation ?? 0
              const isPositive = variation > 0
              const isNegative = variation < 0

              let formattedDate = indicator.reference_date
              if (indicator.reference_date && indicator.reference_date.includes('-')) {
                const [y, m, d] = indicator.reference_date.split('-')
                formattedDate = `${d}/${m}/${y}`
              }

              // Color scheme by category
              const chartColor =
                indicator.category === 'juros'
                  ? '#0B3B7A'
                  : indicator.category === 'inflacao'
                    ? '#16A34A'
                    : indicator.category === 'cambio'
                      ? '#15803D'
                      : '#1557A6'

              return (
                <div
                  key={indicator.id}
                  id={indicator.code}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 card-subtle-shadow card-hover-lift flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Top Row: Details & Main Value */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                        {indicator.category.toUpperCase()} • CÓDIGO SGS:{' '}
                        {indicator.source_code || indicator.code}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Ref: {formattedDate}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-[#082852] mb-2">
                      {indicator.name}
                    </h2>

                    <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                      {indicator.description}
                    </p>

                    <div className="flex flex-wrap items-baseline justify-between gap-4 p-4 bg-[#F0F4F8]/70 rounded-lg border border-stone-200 mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-4xl font-extrabold text-[#082852] tracking-tight">
                          {indicator.unit === 'R$'
                            ? indicator.current_value.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })
                            : indicator.current_value.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                        </span>
                        {indicator.unit !== 'R$' && (
                          <span className="text-base font-semibold font-mono text-slate-600">
                            {indicator.unit}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span
                          className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded ${
                            isPositive
                              ? 'text-[#15803D] bg-emerald-50'
                              : isNegative
                                ? 'text-[#DC2626] bg-red-50'
                                : 'text-slate-600 bg-slate-200'
                          }`}
                        >
                          {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
                          {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
                          <span>
                            {isPositive ? '+' : ''}
                            {variation.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </span>
                        <span className="text-slate-500">variação recente</span>
                      </div>
                    </div>

                    {/* Interactive Area Chart */}
                    <div className="mb-6">
                      <IndicatorAreaChart
                        history={indicator.history}
                        unit={indicator.unit}
                        color={chartColor}
                        height={220}
                        name={`Evolução histórica (${indicator.short_name})`}
                      />
                    </div>

                    {/* Recent 10 Observations Table */}
                    {indicator.history && indicator.history.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 block mb-2">
                          Últimas Observações Registradas
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                          {indicator.history
                            .slice(-10)
                            .reverse()
                            .map((obs, idx) => {
                              let dLabel = obs.date
                              if (obs.date && obs.date.includes('-')) {
                                const [y, m, d] = obs.date.split('-')
                                dLabel = `${d}/${m}/${y}`
                              }
                              return (
                                <div
                                  key={idx}
                                  className="p-2 bg-stone-50 rounded border border-stone-200/80 flex flex-col"
                                >
                                  <span className="text-[10px] text-slate-500">{dLabel}</span>
                                  <span className="font-bold text-[#082852] tabular-nums">
                                    {indicator.unit === 'R$'
                                      ? obs.value.toLocaleString('pt-BR', {
                                          style: 'currency',
                                          currency: 'BRL',
                                        })
                                      : `${obs.value.toLocaleString('pt-BR', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })} ${indicator.unit}`}
                                  </span>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Fonte: {indicator.source}</span>
                    <span className="text-slate-600 font-semibold">{indicator.frequency}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 4. COMPARATIVO SECTION (IPCA 12m vs IGP-M) */}
        {comparisonChartData.length > 0 && (
          <section className="mt-16 bg-white rounded-2xl p-8 border border-stone-200/90 card-subtle-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                  Análise Comparativa
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#082852] mt-1">
                  Dispersão de Inflação: IPCA 12m vs IGP-M 12m
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Comparação direta entre o índice oficial de preços ao consumidor (IBGE) e o índice
                  geral de preços de mercado (FGV).
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#0B3B7A] font-bold">
                  <span className="w-3 h-3 rounded bg-[#0B3B7A]" /> IPCA 12m (Consumo)
                </span>
                <span className="flex items-center gap-1.5 text-[#16A34A] font-bold">
                  <span className="w-3 h-3 rounded bg-[#16A34A]" /> IGP-M 12m (Contratos/Atacado)
                </span>
              </div>
            </div>

            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={comparisonChartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="displayDate"
                    tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    axisLine={false}
                    tickLine={false}
                    domain={['auto', 'auto']}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const row = payload[0].payload
                        return (
                          <div className="bg-[#082852] text-white p-3 rounded shadow-xl border border-[#16A34A] text-xs font-mono">
                            <p className="text-slate-300 mb-1">{row.date}</p>
                            <p className="font-bold text-slate-100">
                              IPCA 12m: {row.ipca?.toFixed(2)}%
                            </p>
                            <p className="font-bold text-[#22C55E]">
                              IGP-M 12m: {row.igpm?.toFixed(2)}%
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-700">
                              Spread: {(row.igpm - row.ipca).toFixed(2)} p.p.
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ipca"
                    name="IPCA 12m"
                    stroke="#0B3B7A"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#0B3B7A' }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="igpm"
                    name="IGP-M 12m"
                    stroke="#16A34A"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#16A34A' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between font-mono">
              <span>Fontes: IBGE e FGV (SGS/BCB)</span>
              <span>Diferencial de indexação para contratos corporativos</span>
            </div>
          </section>
        )}

        {/* 5. NOVA SEÇÃO DE INVESTIMENTOS (Melhor Aplicação Atual + Grade Simuladora sem Gravação) */}
        <InvestmentsSection rates={economicRates} />
      </main>
    </div>
  )
}
