import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  FileSpreadsheet,
  Coins,
  Compass,
  Building2,
  Scale,
  RefreshCw,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react'
import Sparkline from '@/components/Sparkline'
import {
  STOCK_HIGHLIGHTS,
  StockHighlightItem,
  StockRecommendationType,
} from '@/data/stockHighlights'

interface StockHighlightsSectionProps {
  balanceAnalysisUrl?: string
  whatsappUrl?: string
}

export default function StockHighlightsSection({
  balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app',
  whatsappUrl = 'https://wa.me/5517997650672',
}: StockHighlightsSectionProps) {
  const [activeTab, setActiveTab] = useState<'todos' | 'compra' | 'venda'>('todos')
  const [selectedSector, setSelectedSector] = useState<string>('todos')
  const [lastReviewDate] = useState<string>(() => {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  })

  const compras = STOCK_HIGHLIGHTS.filter((s) => s.recommendation === 'compra')
  const vendas = STOCK_HIGHLIGHTS.filter((s) => s.recommendation === 'venda')

  const sectors = ['todos', ...Array.from(new Set(STOCK_HIGHLIGHTS.map((s) => s.sector)))]

  const filteredItems = STOCK_HIGHLIGHTS.filter((item) => {
    const matchTab = activeTab === 'todos' || item.recommendation === activeTab
    const matchSector = selectedSector === 'todos' || item.sector === selectedSector
    return matchTab && matchSector
  })

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatPercent = (val: number) => {
    return val.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <section
      id="destaques-acoes"
      className="bg-[#082852] text-white py-16 sm:py-20 border-y border-[#0B3B7A] relative overflow-hidden"
    >
      {/* Background Decorativo com Grid e Glow institucional */}
      <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-[#1557A6]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#0B3B7A]/80">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16A34A]/20 border border-[#22C55E]/40 text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RADAR DE OPORTUNIDADES & RISCOS DA B3 (IBOVESPA)</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Melhores Ações: Compra vs. Pontos de Atenção
            </h2>

            <p className="font-serif text-lg sm:text-xl text-emerald-300 mt-3 font-normal leading-relaxed">
              Análise educativa de Blue Chips para tomada de decisão com mentalidade de empresário:
              foco em geração de caixa, dividendos, margem de segurança e ciclos macroeconômicos.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Diferente da especulação diária de corretoras, examinamos empresas pelo balanço real:
              capacidade de suportar a Selic, retorno sobre o capital e poder de repasse de preço.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-lg bg-[#0B1F3A]/90 border border-slate-700/80 text-[11px] font-mono text-slate-300 flex items-center gap-2 shadow-inner">
              <Calendar className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Revisão Periódica: {lastReviewDate}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#16A34A]/10 border border-[#22C55E]/30 text-[11px] font-mono text-emerald-300">
              Blue Chips B3
            </div>
          </div>
        </div>

        {/* Barra de Filtros e Abas */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Abas Principais: Todos / Compra / Venda */}
          <div className="inline-flex p-1.5 bg-[#0B1F3A] rounded-xl border border-slate-700/70 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'todos'
                  ? 'bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todas as Blue Chips ({STOCK_HIGHLIGHTS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('compra')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'compra'
                  ? 'bg-[#16A34A] text-white shadow-md'
                  : 'text-emerald-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Oportunidades de Compra ({compras.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('venda')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'venda'
                  ? 'bg-[#C0392B] text-white shadow-md'
                  : 'text-rose-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Atenção & Venda ({vendas.length})</span>
            </button>
          </div>

          {/* Filtro Setorial */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 hidden sm:inline">
              Setor:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {sectors.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setSelectedSector(sec)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-colors shrink-0 ${
                    selectedSector === sec
                      ? 'bg-white/20 text-white font-bold border border-white/40'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                >
                  {sec === 'todos' ? 'Todos os Setores' : sec}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo Estatístico em 2 Colunas (Visão Executiva) */}
        {activeTab === 'todos' && selectedSector === 'todos' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box Compra */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-[#0B1F3A] to-[#082852] border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#22C55E] font-bold">
                    Tese de Compra (5 Ações)
                  </div>
                  <div className="text-xs text-slate-300">
                    Média de Dividend Yield de{' '}
                    <strong className="text-white font-mono">
                      {formatPercent(
                        compras.reduce((acc, c) => acc + c.dividendYield, 0) / compras.length,
                      )}
                      % a.a.
                    </strong>{' '}
                    com múltiplos defensivos.
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded border border-[#22C55E]/30 hidden sm:inline">
                Valor & Renda
              </span>
            </div>

            {/* Box Venda */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/40 via-[#0B1F3A] to-[#082852] border border-rose-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                    Tese de Atenção / Venda (4 Ações)
                  </div>
                  <div className="text-xs text-slate-300">
                    Sensibilidade a juros altos, alavancagem de balanço ou perda de margem
                    operacional.
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/30 hidden sm:inline">
                Cautela & Risco
              </span>
            </div>
          </div>
        )}

        {/* Grid de Cards das Ações */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isBuy = item.recommendation === 'compra'
            const isVarPositive = item.variationPercent > 0
            const isVarNegative = item.variationPercent < 0

            return (
              <div
                key={item.ticker}
                className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group border ${
                  isBuy
                    ? 'bg-gradient-to-b from-[#0B1F3A] to-[#082852] border-emerald-500/30 hover:border-[#22C55E] hover:shadow-[0_0_25px_rgba(34,197,94,0.18)]'
                    : 'bg-gradient-to-b from-[#0B1F3A] to-[#082852] border-rose-500/30 hover:border-rose-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]'
                }`}
              >
                {/* Linha de acento de status no topo */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] ${
                    isBuy ? 'bg-[#22C55E]' : 'bg-[#EF4444]'
                  }`}
                />

                {/* Topo do Card: Ticker + Badges */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-mono font-extrabold text-white tracking-wider">
                          {item.ticker}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-extrabold uppercase tracking-wider border ${
                            isBuy
                              ? 'bg-[#16A34A]/20 text-[#22C55E] border-[#22C55E]/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}
                        >
                          {item.badgeLabel}
                        </span>
                      </div>
                      <div className="font-serif text-base text-slate-200 font-bold mt-0.5 line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {item.sector}
                      </div>
                    </div>

                    {/* Preço de Referência e Variação */}
                    <div className="text-right shrink-0">
                      <div className="font-mono text-xl font-extrabold text-white">
                        {formatBRL(item.referencePrice)}
                      </div>
                      <div
                        className={`inline-flex items-center gap-0.5 text-xs font-mono font-bold mt-0.5 ${
                          isVarPositive
                            ? 'text-[#22C55E]'
                            : isVarNegative
                              ? 'text-rose-400'
                              : 'text-slate-300'
                        }`}
                      >
                        {isVarPositive && <TrendingUp className="w-3 h-3" />}
                        {isVarNegative && <TrendingDown className="w-3 h-3" />}
                        <span>
                          {isVarPositive ? '+' : ''}
                          {formatPercent(item.variationPercent)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Indicadores-Chave de Valuation e Proventos */}
                  <div className="grid grid-cols-3 gap-2 my-4 p-2.5 rounded-xl bg-[#082852]/80 border border-slate-700/60">
                    <div className="text-center border-r border-slate-700/60">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">
                        Div. Yield
                      </div>
                      <div
                        className={`text-xs font-mono font-bold mt-0.5 ${
                          item.dividendYield >= 6 ? 'text-[#22C55E]' : 'text-slate-200'
                        }`}
                      >
                        {formatPercent(item.dividendYield)}%
                      </div>
                    </div>

                    <div className="text-center border-r border-slate-700/60">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">
                        P/L (Múltiplo)
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                        {item.peRatio < 0 ? 'Negativo' : `${formatPercent(item.peRatio)}x`}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">
                        Horizonte
                      </div>
                      <div className="text-[11px] font-mono font-semibold text-slate-300 mt-0.5 truncate px-1">
                        {item.horizonte}
                      </div>
                    </div>
                  </div>

                  {/* Mini Gráfico Sparkline de Evolução */}
                  <div className="mb-4 p-3 rounded-xl bg-[#082852]/50 border border-slate-700/40 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                        Evolução Recente
                      </div>
                      <div className="text-[11px] font-mono text-slate-300">
                        {isBuy ? 'Trajetória sustentada' : 'Volatilidade / Pressão'}
                      </div>
                    </div>
                    <Sparkline
                      data={item.sparkline}
                      width={120}
                      height={32}
                      color={isBuy ? '#22C55E' : '#EF4444'}
                      strokeWidth={2.2}
                    />
                  </div>

                  {/* Explicação de Empresário para Empresário */}
                  <div className="mt-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5 font-bold">
                      <Building2 className="w-3 h-3 text-[#22C55E]" />
                      <span>Diagnóstico Corporativo Borlim:</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans bg-white/5 p-3 rounded-lg border border-white/5">
                      {item.explanation}
                    </p>
                  </div>

                  {/* 3 Fundamentos-Chave em tópicos */}
                  <div className="mt-3.5 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Fundamentos Observados:
                    </div>
                    {item.fundamentos.map((fund, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] text-slate-300"
                      >
                        <span
                          className={`mt-0.5 font-bold ${isBuy ? 'text-[#22C55E]' : 'text-rose-400'}`}
                        >
                          {isBuy ? '✓' : '•'}
                        </span>
                        <span className="leading-snug">{fund}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rodapé do Card: Ponto de Atenção / Ação Recomendada */}
                <div className="mt-5 pt-3.5 border-t border-slate-700/70">
                  <div className="text-[11px] text-slate-300 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-tight text-slate-300">
                      <strong className="text-amber-300">Atenção:</strong> {item.pontoAtencao}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bloco Metodológico: O que a Análise Borlim Observa */}
        <div className="mt-14 bg-[#0B1F3A] rounded-2xl p-6 sm:p-8 border border-[#0B3B7A] shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/70">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider mb-2">
                <Scale className="w-3.5 h-3.5" />
                <span>METODOLOGIA BORLIM DE SELEÇÃO</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Como Avaliamos Empresas de Capital Aberto
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Nossa matriz de análise não persegue dicas ou &ldquo;day trade&rdquo;. Aplicamos o
                mesmo rigor do Valuation Empresarial da Borlim para auditar se o ativo merece o
                capital de longo prazo do gestor.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/valuation"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Metodologia de Valuation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#082852]/70 border border-slate-700/60">
              <div className="text-xs font-mono font-bold text-[#22C55E] uppercase mb-1">
                1. Geração de Caixa Livre
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Empresas com fluxo de caixa operacional positivo após despesas de capital (Capex),
                garantindo capacidade de pagar dividendos sem recorrer a endividamento bancário.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#082852]/70 border border-slate-700/60">
              <div className="text-xs font-mono font-bold text-[#22C55E] uppercase mb-1">
                2. Múltiplos & Valuation
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Preço sobre Lucro (P/L), Preço sobre Valor Patrimonial (P/VP) e EV/Ebitda comparados
                à média histórica e aos concorrentes internacionais do mesmo setor.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#082852]/70 border border-slate-700/60">
              <div className="text-xs font-mono font-bold text-[#22C55E] uppercase mb-1">
                3. Poder de Preço (Moat)
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Vantagens competitivas estruturais (barreiras de entrada, marcas líderes, contratos
                de longo prazo) que protegem a margem bruta da inflação e das oscilações de custos.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#082852]/70 border border-slate-700/60">
              <div className="text-xs font-mono font-bold text-[#22C55E] uppercase mb-1">
                4. Endividamento Seguro
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Relação Dívida Líquida / Ebitda estritamente sob controle (abaixo de 2,5x), evitando
                asfixia financeira e erosão do lucro pelas taxas de juros (Selic).
              </div>
            </div>
          </div>

          {/* CTA Box de Alocação de Caixa Empresarial */}
          <div className="mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-[#16A34A]/20 via-[#0B1F3A] to-[#1557A6]/20 border border-[#22C55E]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase text-[#22C55E] font-bold">
                DÚVIDA DE GESTÃO PATRIMONIAL:
              </div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                Sua empresa tem sobras de caixa e você não sabe onde alocar?
              </h4>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                A Borlim estrutura a separação entre <strong>Capital de Giro (NCG)</strong> em
                títulos conservadores de alta liquidez e <strong>Reservas Estratégicas</strong> em
                ativos geradores de dividendos.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md border border-[#22C55E]"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>GESTÃO EMPRESARIAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>(17) 99765-0672</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Legal Obrigatório Reforçado */}
        <div className="mt-8 p-4 rounded-xl bg-[#0B1F3A]/70 border border-amber-500/30 text-xs text-slate-300 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-300">
              Aviso Legal de Finalidade Educativa (Instrução CVM):
            </strong>{' '}
            As análises, gráficos, múltiplos e classificações apresentados nesta seção possuem
            finalidade{' '}
            <strong>exclusivamente didática, pedagógica e de simulação empresarial</strong>. Não
            constituem relatório de análise de valores mobiliários, assessoria financeira, promessa
            de rentabilidade futura, nem recomendação individualizada de compra ou venda de
            quaisquer ações, índices ou derivativos. A rentabilidade passada não é garantia de
            resultados futuros. Todo investimento em renda variável envolve risco de perda
            patrimonial. A BORLIM Consultoria não realiza intermediação financeira nem captação de
            recursos de terceiros.
          </div>
        </div>
      </div>
    </section>
  )
}
