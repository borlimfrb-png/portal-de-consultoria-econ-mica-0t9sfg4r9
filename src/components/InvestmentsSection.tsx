import { useState, useMemo } from 'react'
import {
  TrendingUp,
  Award,
  Calculator,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Info,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  Percent,
} from 'lucide-react'
import {
  EconomicRates,
  getInvestmentsRanking,
  simulateInvestments,
  getRegressiveTaxRate,
} from '@/data/investments'

interface InvestmentsSectionProps {
  rates: EconomicRates
}

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000, 500000]

const PRESET_MONTHS = [
  { label: '6 meses', months: 6, desc: 'Curto prazo (IR 22,5% / Isento)' },
  { label: '1 ano (12m)', months: 12, desc: 'Médio prazo (IR 17,5% / Isento)' },
  { label: '2 anos (24m)', months: 24, desc: 'Médio-longo (IR 15,0% / Isento)' },
  { label: '3 anos (36m)', months: 36, desc: 'Longo prazo (IR 15,0% / Isento)' },
  { label: '5 anos (60m)', months: 60, desc: 'Horizonte estrutural (IR 15,0%)' },
]

export default function InvestmentsSection({ rates }: InvestmentsSectionProps) {
  // Ranking de referência em 12 meses
  const ranking = useMemo(() => getInvestmentsRanking(rates, 12), [rates])
  const bestOption = ranking[0]

  // Estado interativo do Simulador - SEM GRAVAR NADA (em memória)
  const [inputAmount, setInputAmount] = useState<string>('10000')
  const [selectedMonths, setSelectedMonths] = useState<number>(12)
  const [activeTab, setActiveTab] = useState<'ranking' | 'simulador'>('ranking')

  // Limpeza de valor numérico
  const numericAmount = useMemo(() => {
    if (!inputAmount) return 0
    // Remove tudo exceto dígitos e vírgulas/pontos
    const cleaned = inputAmount.replace(/\./g, '').replace(',', '.')
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) || parsed < 0 ? 0 : parsed
  }, [inputAmount])

  // Exemplo visual pré-preenchido se o usuário zerar o campo
  const effectiveSimAmount = numericAmount > 0 ? numericAmount : 10000
  const isUsingFallbackAmount = numericAmount <= 0

  // Resultados da simulação
  const simulationResults = useMemo(() => {
    return simulateInvestments(effectiveSimAmount, selectedMonths, rates)
  }, [effectiveSimAmount, selectedMonths, rates])

  const bestSimResult = simulationResults[0]
  const currentTaxInfo = useMemo(() => getRegressiveTaxRate(selectedMonths), [selectedMonths])

  // Formatadores de moeda e porcentagem
  const formatBRL = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatPercent = (value: number) => {
    return `${value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Permitir dígitos e formatação amigável
    setInputAmount(val)
  }

  return (
    <section id="investimentos" className="mt-16 pt-10 border-t border-stone-200/90 scroll-mt-24">
      {/* 1. Header da Seção de Investimentos */}
      <div className="bg-[#082852] text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#0B3B7A] relative overflow-hidden mb-10">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16A34A]/20 border border-[#16A34A]/40 rounded-full text-xs font-mono font-bold text-[#22C55E] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>INTELIGÊNCIA DE MERCADO BORLIM</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Investimentos: Qual é a Melhor Aplicação Atual?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Descubra onde seu capital rende mais com base nas taxas <strong>ao vivo</strong> do
              Banco Central (Selic a <strong>{rates.selic.toFixed(2)}%</strong> e CDI a{' '}
              <strong>{rates.cdi.toFixed(2)}%</strong>). Compare o retorno líquido descontando o
              Imposto de Renda real e simule ganhos sem salvar nenhum dado pessoal.
            </p>
          </div>

          {/* Quick badge "Melhor Aplicação Atual" */}
          {bestOption && (
            <div className="bg-white/10 backdrop-blur-md border border-[#16A34A] rounded-xl p-4 sm:p-5 text-left shrink-0 lg:max-w-xs shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E] mb-1">
                <Award className="w-4 h-4 text-[#22C55E]" />
                <span>Melhor Opção Líquida</span>
              </div>
              <div className="font-serif text-lg sm:text-xl font-bold text-white">
                {bestOption.name}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#22C55E]">
                  {formatPercent(bestOption.netAnnualRate)}
                </span>
                <span className="text-xs text-slate-300 font-mono">ao ano líquido</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-2 leading-tight">
                Indexador: <span className="font-bold text-white">{bestOption.indexerDisplay}</span>{' '}
                ({bestOption.taxTreatment}).
              </p>
            </div>
          )}
        </div>

        {/* Status das taxas ao vivo */}
        <div className="mt-6 pt-6 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span>Selic Meta:</span>{' '}
              <strong className="text-white font-bold">{rates.selic.toFixed(2)}% a.a.</strong>
              {rates.isEstimateSelic && (
                <span className="text-[10px] text-amber-300 ml-1">(estimativa)</span>
              )}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0B3B7A] border border-white/40" />
              <span>CDI Over:</span>{' '}
              <strong className="text-white font-bold">{rates.cdi.toFixed(2)}% a.a.</strong>
              {rates.isEstimateCdi && (
                <span className="text-[10px] text-amber-300 ml-1">(estimativa)</span>
              )}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <span>IPCA 12m:</span>{' '}
              <strong className="text-white font-bold">{rates.ipca.toFixed(2)}%</strong>
              {rates.isEstimateIpca && (
                <span className="text-[10px] text-amber-300 ml-1">(estimativa)</span>
              )}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 italic">
            Atualizado conforme base oficial do BCB / SGS
          </div>
        </div>
      </div>

      {/* 2. Navegação entre Abas (Ranking vs Simulador) */}
      <div className="flex items-center justify-between border-b border-stone-200 mb-8 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('ranking')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all ${
              activeTab === 'ranking'
                ? 'bg-[#082852] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Award className="w-4 h-4 text-[#22C55E]" />
            <span>1. Comparativo & Ranking Geral</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulador')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all ${
              activeTab === 'simulador'
                ? 'bg-[#16A34A] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>2. Grade Simuladora de Ganho</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 ml-1">
              Sem gravar
            </span>
          </button>
        </div>

        <a
          href="https://analise-de-balanco-6514f.goskip.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#15803D] hover:text-[#16A34A] transition-colors"
        >
          <span>Gestão Empresarial</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ABA 1: RANKING COMPARATIVO DA MELHOR APLICAÇÃO ATUAL */}
      {activeTab === 'ranking' && (
        <div className="space-y-8">
          {/* Card Resumo do Vencedor */}
          <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50/40 rounded-2xl p-6 sm:p-8 border-2 border-[#16A34A] card-subtle-shadow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16A34A] text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>RESPOSTA DO ESPECIALISTA: MELHOR APLICAÇÃO ATUAL</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852]">
                  {bestOption.name}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {bestOption.description} Com as taxas vigentes hoje no mercado financeiro, esta
                  modalidade entrega o maior retorno líquido de Imposto de Renda{' '}
                  <span className="font-semibold text-[#15803D]">
                    ({formatPercent(bestOption.netAnnualRate)} a.a.)
                  </span>
                  , superando a poupança e CDBs convencionais no horizonte de 12 meses.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm shrink-0 min-w-[240px] text-center">
                <span className="text-xs font-mono uppercase text-slate-500 font-bold block mb-1">
                  Rendimento Líquido Estimado
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#15803D] block">
                  {formatPercent(bestOption.netAnnualRate)}
                </span>
                <span className="text-[11px] font-mono text-slate-500 block mt-1">
                  ao ano • {bestOption.taxTreatment}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveTab('simulador')}
                  className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Simular Meu Capital</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabela Comparativa Completa */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                  Classificação por Retorno Líquido
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                  Ranking das Aplicações Financeiras no Brasil
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Horizonte de referência: 12 meses (alíquota de 17,5% de IR sobre o lucro para
                  aplicações tributadas; LCI/LCA e Poupança são isentas).
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono bg-stone-100 px-3 py-1.5 rounded-lg text-slate-700 shrink-0 self-start sm:self-auto">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span>Base SGS / Banco Central</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-xs font-mono uppercase tracking-wider text-slate-600">
                    <th className="py-3.5 px-4 font-bold text-center w-16">Posição</th>
                    <th className="py-3.5 px-4 font-bold">Aplicação Financeira</th>
                    <th className="py-3.5 px-4 font-bold">Indexador / Regra</th>
                    <th className="py-3.5 px-4 font-bold text-right">Rend. Bruto</th>
                    <th className="py-3.5 px-4 font-bold text-center">Alíquota IR</th>
                    <th className="py-3.5 px-4 font-bold text-right">Rend. Líquido (a.a.)</th>
                    <th className="py-3.5 px-4 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm font-mono">
                  {ranking.map((item) => (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        item.isBest
                          ? 'bg-emerald-50/70 font-semibold'
                          : 'hover:bg-[#F5F3EC]/50 text-slate-800'
                      }`}
                    >
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                            item.isBest
                              ? 'bg-[#16A34A] text-white shadow-xs'
                              : item.rank === 2
                                ? 'bg-[#0B3B7A] text-white'
                                : 'bg-stone-200 text-slate-700'
                          }`}
                        >
                          {item.rank}º
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-serif font-bold text-base text-[#082852]">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 font-sans mt-0.5 line-clamp-1">
                          {item.liquidity}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-[#0B3B7A] bg-blue-50/80 px-2.5 py-1 rounded border border-blue-100 text-xs">
                          {item.indexerDisplay}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right tabular-nums text-slate-700">
                        {formatPercent(item.grossAnnualRate)}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-xs ${
                            item.isTaxExempt
                              ? 'bg-emerald-100 text-[#15803D] font-bold border border-emerald-200'
                              : 'bg-stone-100 text-slate-700 border border-stone-200'
                          }`}
                        >
                          {item.isTaxExempt ? '0% (Isento)' : `${item.effectiveTaxRate}%`}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right tabular-nums font-bold text-base">
                        <span
                          className={
                            item.isBest ? 'text-[#15803D] font-extrabold text-lg' : 'text-[#082852]'
                          }
                        >
                          {formatPercent(item.netAnnualRate)}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center">
                        {item.isBest ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#16A34A] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                            <Award className="w-3.5 h-3.5" />
                            <span>Melhor Opção</span>
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-sans">Alternativa</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Explicações e Alertas Honestos */}
            <div className="p-5 bg-stone-50 border-t border-stone-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-2 max-w-3xl">
                <Info className="w-4 h-4 text-[#0B3B7A] shrink-0 mt-0.5" />
                <span>
                  <strong>Aviso de Transparência Borlim:</strong> As estimativas utilizam as taxas
                  reais do SGS/Banco Central (CDI, Selic e IPCA) capitalizadas anualmente. Não
                  constituem recomendação direta de investimento individualizada. Cada empresa ou
                  pessoa física deve considerar prazos de liquidez e risco de contraparte.
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('simulador')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#082852] hover:bg-[#0B3B7A] text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors shrink-0"
              >
                <span>Fazer Simulação</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#22C55E]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: GRADE / SIMULADOR DE GANHO — SEM PERSISTIR NADA */}
      {activeTab === 'simulador' && (
        <div className="space-y-8">
          {/* Card de Configuração do Simulador */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 card-subtle-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#15803D] mb-1">
                  <Calculator className="w-4 h-4" />
                  <span>Simulação em Tempo Real no Navegador</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#082852]">
                  Simule o Rendimento do seu Capital
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Digite o valor que deseja aplicar e selecione o prazo desejado. A grade calcula
                  automaticamente o rendimento bruto, o Imposto de Renda devido e o ganho líquido
                  para todas as opções.{' '}
                  <strong>Nenhum dado é salvo no banco de dados nem em cookies.</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 text-[#15803D] px-3 py-2 rounded-xl border border-emerald-200 text-xs font-mono font-semibold shrink-0">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacidade 100% Protegida</span>
              </div>
            </div>

            {/* Controles de Entrada */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              {/* Campo de Valor em R$ */}
              <div className="lg:col-span-5 space-y-2">
                <label
                  htmlFor="invest-amount"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#082852]"
                >
                  Valor a Investir (R$):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono font-bold text-slate-400">
                    R$
                  </span>
                  <input
                    id="invest-amount"
                    type="text"
                    value={inputAmount}
                    onChange={handleAmountChange}
                    placeholder="Ex: 10.000"
                    className="w-full pl-11 pr-4 py-3 bg-[#F5F3EC]/50 border-2 border-stone-200 rounded-xl font-mono text-xl font-bold text-[#082852] focus:outline-none focus:border-[#16A34A] focus:bg-white transition-all shadow-inner"
                  />
                  {inputAmount && (
                    <button
                      type="button"
                      onClick={() => setInputAmount('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-mono p-1"
                      title="Limpar campo"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                {/* Atalhos rápidos de valores */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-mono text-slate-500 mr-1">Atalhos:</span>
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setInputAmount(amt.toString())}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition-colors ${
                        numericAmount === amt
                          ? 'bg-[#082852] text-white'
                          : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                      }`}
                    >
                      {amt >= 1000 ? `${amt / 1000}k` : amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seletor de Prazo */}
              <div className="lg:col-span-7 space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#082852]">
                  Prazo de Permanência:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRESET_MONTHS.map((item) => {
                    const isSelected = selectedMonths === item.months
                    return (
                      <button
                        key={item.months}
                        type="button"
                        onClick={() => setSelectedMonths(item.months)}
                        className={`p-2.5 rounded-xl text-center border transition-all ${
                          isSelected
                            ? 'bg-[#16A34A] text-white border-[#15803D] shadow-sm font-bold scale-[1.02]'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-slate-700 font-medium'
                        }`}
                      >
                        <div className="font-mono text-xs sm:text-sm font-bold">{item.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 truncate ${
                            isSelected ? 'text-emerald-100' : 'text-slate-500'
                          }`}
                        >
                          {item.months <= 12 ? `${item.months} meses` : `${item.months / 12} anos`}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Resumo da alíquota aplicável no prazo selecionado */}
                <div className="text-[11px] font-mono text-slate-600 flex items-center justify-between pt-1">
                  <span>
                    Tabela regressiva no prazo:{' '}
                    <strong className="text-[#082852]">{currentTaxInfo.rangeLabel}</strong>
                  </span>
                  <span className="text-[#15803D] font-bold">LCI/LCA e Poupança: 0% de IR</span>
                </div>
              </div>
            </div>

            {/* Aviso quando o valor digitado for vazio/zero */}
            {isUsingFallbackAmount && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs font-mono text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Campo de valor vazio: exibindo simulação ilustrativa com o valor padrão de{' '}
                  <strong>R$ 10.000,00</strong>. Digite qualquer quantia acima para recalcular.
                </span>
              </div>
            )}
          </div>

          {/* Destaque Visual da Melhor Aplicação na Simulação */}
          {bestSimResult && (
            <div className="bg-[#082852] text-white rounded-2xl p-6 sm:p-7 shadow-md border border-[#0B3B7A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E]">
                  <Award className="w-4 h-4 text-[#22C55E]" />
                  <span>
                    Vencedora para{' '}
                    {effectiveSimAmount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}{' '}
                    em {selectedMonths} meses:
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">{bestSimResult.name}</h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Rendimento líquido total de{' '}
                  <strong className="text-[#22C55E]">{formatBRL(bestSimResult.netYield)}</strong> (
                  {formatPercent(bestSimResult.netReturnPercent)} sobre o valor aplicado).{' '}
                  {bestSimResult.diffFromPoupanca > 0 && (
                    <span>
                      Isso representa{' '}
                      <strong className="text-[#22C55E]">
                        +{formatBRL(bestSimResult.diffFromPoupanca)}
                      </strong>{' '}
                      a mais do que deixar o mesmo capital na caderneta de poupança!
                    </span>
                  )}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-right shrink-0 min-w-[200px]">
                <span className="text-[11px] font-mono uppercase text-slate-300 block">
                  Montante Líquido Final
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#22C55E] block">
                  {formatBRL(bestSimResult.netAmount)}
                </span>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                  Capital Inicial + Lucro Líquido
                </span>
              </div>
            </div>
          )}

          {/* GRADE COMPARATIVA DOS RESULTADOS DA SIMULAÇÃO */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                  Simulação Comparada
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                  Grade de Resultados: Ganhos Brutos vs Líquidos
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Valores estimados para uma aplicação de{' '}
                  <strong>{formatBRL(effectiveSimAmount)}</strong> pelo prazo de{' '}
                  <strong>{selectedMonths} meses</strong>.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                Sem gravação • Em memória
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-xs font-mono uppercase tracking-wider text-slate-600">
                    <th className="py-3.5 px-4 font-bold">Aplicação</th>
                    <th className="py-3.5 px-4 font-bold">Indexador</th>
                    <th className="py-3.5 px-4 font-bold text-right">Montante Bruto</th>
                    <th className="py-3.5 px-4 font-bold text-right">Lucro Bruto</th>
                    <th className="py-3.5 px-4 font-bold text-center">IR Retido</th>
                    <th className="py-3.5 px-4 font-bold text-right">Lucro Líquido (R$)</th>
                    <th className="py-3.5 px-4 font-bold text-right">Montante Final Líquido</th>
                    <th className="py-3.5 px-4 font-bold text-right">Ganho vs Poupança</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm font-mono">
                  {simulationResults.map((row) => (
                    <tr
                      key={row.id}
                      className={`transition-colors ${
                        row.isBest
                          ? 'bg-emerald-50/80 font-semibold'
                          : 'hover:bg-[#F5F3EC]/50 text-slate-800'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {row.isBest && (
                            <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
                          )}
                          <span className="font-serif font-bold text-[#082852]">{row.name}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-xs font-semibold text-[#0B3B7A] bg-slate-100 px-2 py-0.5 rounded">
                          {row.indexerDisplay}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right tabular-nums text-slate-600">
                        {formatBRL(row.grossAmount)}
                      </td>

                      <td className="py-4 px-4 text-right tabular-nums text-slate-700 font-medium">
                        {formatBRL(row.grossYield)}
                      </td>

                      <td className="py-4 px-4 text-center tabular-nums">
                        {row.isTaxExempt ? (
                          <span className="text-xs text-[#15803D] font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            Isento (R$ 0,00)
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 font-medium">
                            - {formatBRL(row.taxAmount)}{' '}
                            <span className="text-[10px] text-slate-500 font-normal">
                              ({row.taxRatePercent}%)
                            </span>
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right tabular-nums">
                        <span
                          className={`font-bold ${
                            row.isBest ? 'text-[#15803D] text-base' : 'text-[#082852]'
                          }`}
                        >
                          +{formatBRL(row.netYield)}
                        </span>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {formatPercent(row.netReturnPercent)} líquido
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right tabular-nums font-bold">
                        <span
                          className={`text-base ${
                            row.isBest ? 'text-[#15803D] font-extrabold text-lg' : 'text-[#082852]'
                          }`}
                        >
                          {formatBRL(row.netAmount)}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right tabular-nums">
                        {row.id === 'poupanca' ? (
                          <span className="text-xs text-slate-400 font-sans italic">
                            Referência Base
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-[#15803D] bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                            +{formatBRL(row.diffFromPoupanca)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tabela Didática do IR Regressivo */}
            <div className="p-6 bg-stone-50 border-t border-stone-200">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h5 className="font-serif font-bold text-sm text-[#082852] mb-1">
                    Entendendo o IR Regressivo da Renda Fixa (Lei Federal 11.033/2004)
                  </h5>
                  <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                    O Imposto de Renda incide <strong>exclusivamente sobre o lucro</strong>{' '}
                    (rendimento), nunca sobre o capital investido. Quanto mais tempo o dinheiro
                    permanece aplicado, menor é a mordida do leão.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto text-xs font-mono text-center">
                  <div
                    className={`p-2 rounded border ${
                      currentTaxInfo.ratePercent === 22.5
                        ? 'bg-emerald-100 border-[#16A34A] font-bold text-[#15803D]'
                        : 'bg-white border-stone-200 text-slate-600'
                    }`}
                  >
                    <div>Até 180 dias</div>
                    <div className="font-bold text-sm">22,5%</div>
                  </div>
                  <div
                    className={`p-2 rounded border ${
                      currentTaxInfo.ratePercent === 20.0
                        ? 'bg-emerald-100 border-[#16A34A] font-bold text-[#15803D]'
                        : 'bg-white border-stone-200 text-slate-600'
                    }`}
                  >
                    <div>181 a 360 dias</div>
                    <div className="font-bold text-sm">20,0%</div>
                  </div>
                  <div
                    className={`p-2 rounded border ${
                      currentTaxInfo.ratePercent === 17.5
                        ? 'bg-emerald-100 border-[#16A34A] font-bold text-[#15803D]'
                        : 'bg-white border-stone-200 text-slate-600'
                    }`}
                  >
                    <div>361 a 720 dias</div>
                    <div className="font-bold text-sm">17,5%</div>
                  </div>
                  <div
                    className={`p-2 rounded border ${
                      currentTaxInfo.ratePercent === 15.0
                        ? 'bg-emerald-100 border-[#16A34A] font-bold text-[#15803D]'
                        : 'bg-white border-stone-200 text-slate-600'
                    }`}
                  >
                    <div>+720 dias (2a+)</div>
                    <div className="font-bold text-sm">15,0%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Glossário Educativo / Empresarial */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase text-[#0B3B7A]">
            <Percent className="w-4 h-4 text-[#16A34A]" />
            <span>O que é CDI?</span>
          </div>
          <h4 className="font-serif font-bold text-base text-[#082852] mb-1">
            Certificado de Depósito Interbancário
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            É a taxa média que os bancos cobram para emprestar dinheiro uns aos outros de um dia
            para o outro. Ela anda sempre colada à Taxa Selic (cerca de 0,10 p.p. abaixo) e serve de
            régua para quase toda a renda fixa do país.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase text-[#0B3B7A]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Por que LCI e LCA são Isentas?</span>
          </div>
          <h4 className="font-serif font-bold text-base text-[#082852] mb-1">
            Incentivo ao Agro e Imobiliário
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Criadas por lei federal para canalizar recursos a setores estratégicos. Por não pagarem
            IRPF, uma LCI a 90% do CDI frequentemente entrega retorno líquido superior a um CDB
            tributado de 100% ou 105% do CDI.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase text-[#0B3B7A]">
            <SlidersHorizontal className="w-4 h-4 text-[#16A34A]" />
            <span>Gestão do Caixa da Empresa</span>
          </div>
          <h4 className="font-serif font-bold text-base text-[#082852] mb-1">
            De Empresário para Empresário
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Deixar dinheiro parado na conta corrente ou na poupança corrói o poder de compra da
            empresa diante da inflação. Aplicar reservas operacionais em títulos de liquidez diária
            gera receita financeira e fortalece a liquidez corporativa.
          </p>
        </div>
      </div>

      {/* 4. Banner CTA: Flávio Bordignon / Borlim Consultoria */}
      <div className="mt-10 bg-gradient-to-r from-[#082852] to-[#0B3B7A] rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-[#0B3B7A] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
            Assessoria & Estratégia Corporativa
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold">
            Quer otimizar a estrutura de capital e o caixa da sua empresa?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Fale com os consultores da Borlim para planejar o capital de giro, escolher instrumentos
            seguros de rentabilização de caixa e modelar a saúde financeira do seu negócio.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href="https://wa.me/5517997650672"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md hover:scale-[1.02]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp (17) 99765-0672</span>
          </a>

          <a
            href="mailto:flavio@borlim.com.br?subject=Consulta%20sobre%20Gest%C3%A3o%20de%20Caixa%20e%20Investimentos"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/20"
          >
            <Mail className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>flavio@borlim.com.br</span>
          </a>

          <a
            href="https://analise-de-balanco-6514f.goskip.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0B3B7A] hover:bg-[#1557A6] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-[#16A34A]"
            title="Acessar Sistema de Gestão Empresarial (abre em nova aba)"
          >
            <span>GESTÃO EMPRESARIAL</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#22C55E]" />
          </a>
        </div>
      </div>
    </section>
  )
}
