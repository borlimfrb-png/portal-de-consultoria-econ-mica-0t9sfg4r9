import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  Globe,
  RefreshCw,
  HelpCircle,
  FileSpreadsheet,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Building2,
  PieChart,
  Landmark,
  Compass,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Phone,
  Mail,
  Coins,
  Layers,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react'
import Sparkline from '@/components/Sparkline'
import { getStockIndices, StockIndexItem, FALLBACK_STOCK_INDICES } from '@/services/stocks'

export default function BolsaDeValores() {
  const [indices, setIndices] = useState<StockIndexItem[]>(FALLBACK_STOCK_INDICES)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl = 'https://wa.me/5517997650672'

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getStockIndices()
      setIndices(data)
      setLastUpdated(
        new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    } catch (err: unknown) {
      console.error(err)
      setError('Não foi possível atualizar as cotações agora. Exibindo dados de referência.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Perguntas frequentes
  const faqs = [
    {
      q: 'O que é a Bolsa de Valores e como funciona a B3 no Brasil?',
      a: 'A Bolsa de Valores é o ambiente eletrônico organizado e regulado onde são negociadas frações de empresas de capital aberto (ações), títulos de dívida privada, cotas de fundos imobiliários e contratos futuros. No Brasil, todas as negociações ocorrem na B3 (Brasil, Bolsa, Balcão), sediada em São Paulo e fiscalizada pela Comissão de Valores Mobiliários (CVM) e pelo Banco Central. Para a empresa, a bolsa é um mecanismo de captação de recursos para expansão; para o investidor, é um canal de participação nos lucros e na valorização dos maiores empreendimentos do país e do mundo.',
    },
    {
      q: 'Empresário pode investir sobras de capital de giro na Bolsa?',
      a: 'A reserva de caixa operacional e a necessidade de capital de giro (NCG) imediata NUNCA devem ser alocadas em ações ou ativos com oscilação diária elevada (volatilidade), pois uma queda pontual do mercado poderia coincidir com o vencimento de uma folha de pagamento ou duplicata de fornecedor. Para capital de giro e reserva de emergência da PJ, o correto é aplicar em Renda Fixa pós-fixada de liquidez diária (como CDB 100% CDI, Tesouro Selic ou LCI/LCA — veja nossa seção de Investimentos em /indicadores). A Bolsa de Valores é indicada para o excedente patrimonial e reservas estratégicas de médio e longo prazo (acima de 3 a 5 anos).',
    },
    {
      q: 'Qual é a diferença entre Ações, ETFs, FIIs e Renda Fixa?',
      a: 'Ações representam se tornar sócio direto de uma companhia aberta, participando de lucros (dividendos) e do risco operacional do negócio. ETFs (Exchange Traded Funds) são fundos negociados em bolsa que replicam índices inteiros (ex: BOVA11 replica o Ibovespa, IVVB11 replica o S&P 500 dos EUA), permitindo diversificação instantânea com uma única compra. FIIs (Fundos Imobiliários) reúnem investidores para explorar imóveis físicos (galpões logísticos, lajes corporativas, shoppings) e distribuem aluguéis mensais isentos de IRPF para pessoa física. Já a Renda Fixa é um empréstimo que você faz a um banco ou ao governo, com prazo e taxa definidos antecipadamente.',
    },
    {
      q: 'Quanto de imposto se paga sobre ganhos na Bolsa de Valores?',
      a: 'Para ações em operações normais (swing trade, compradas em um dia e vendidas em outro), vendas de até R$ 20.000,00 no mês por pessoa física contam com isenção de Imposto de Renda sobre o lucro. Acima desse teto mensal, a alíquota é de 15% sobre o ganho líquido, recolhido pelo próprio investidor via DARF até o último dia útil do mês seguinte. Em operações de Day Trade (compra e venda no mesmo dia), a alíquota sobe para 20% sem qualquer faixa de isenção. Fundos Imobiliários (FIIs) têm aluguéis mensais isentos para pessoa física, mas o lucro na venda da cota é tributado em 20%.',
    },
    {
      q: 'Como a BORLIM Consultoria apoia empresários nesse tema?',
      a: 'A Borlim atua de empresário para empresário. Nós não vendemos produtos financeiros nem cobramos corretagem: calculamos com precisão matemática o Valuation da sua empresa para abertura de capital ou atração de sócios investidores (/valuation); estruturamos o seu Planejamento Econômico-Financeiro (/planejamento) para blindar seu capital de giro; e orientamos a melhor aplicação de caixa entre os instrumentos disponíveis no mercado.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F3EC]">
      {/* 1. HERO INSTITUCIONAL */}
      <section className="bg-[#082852] text-white py-14 sm:py-20 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0B3B7A]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Breadcrumb */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40">
              <Globe className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                MERCADOS GLOBAIS & EDUCAÇÃO FINANCEIRA CORPORATIVA
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Bolsa de Valores & Mercados Globais
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              Cotações em tempo real dos 8 maiores índices mundiais e guia executivo de atuação em
              bolsa de empresário para empresário.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Monitore o pulso da <strong>B3 brasileira (Ibovespa)</strong>, de Wall Street (
              <strong>S&P 500, Dow Jones, Nasdaq</strong>) e dos centros financeiros da Europa e
              Ásia (<strong>FTSE, DAX, Nikkei e Hang Seng</strong>). Entenda a dinâmica entre
              capital de giro empresarial, reserva de caixa corporativa e alocação em ativos
              produtivos.
            </p>

            {/* CTAs Oficiais */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-xl border-2 border-[#22C55E] group"
                title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
              >
                <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                <span>GESTÃO EMPRESARIAL</span>
                <ExternalLink className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/30 backdrop-blur-xs"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>WhatsApp: (17) 99765-0672</span>
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=Bolsa%20de%20Valores%20-%20Consulta%20Empresarial"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-transparent hover:bg-white/10 text-slate-200 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-slate-500"
              >
                <Mail className="w-4 h-4 text-[#22C55E]" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COTAÇÕES DAS BOLSAS DO MUNDO */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Painel de Índices Mundiais</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-1">
              Cotações das Bolsas do Mundo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Principais termômetros acionários globais com variação recente e histórico em mini
              gráfico.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs font-mono text-slate-500 hidden md:inline">
                Atualizado às {lastUpdated}
              </span>
            )}
            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-50 border border-stone-300 text-[#082852] text-xs font-mono font-bold rounded-lg transition-colors shadow-xs disabled:opacity-50"
              title="Atualizar cotações agora"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#16A34A]' : ''}`}
              />
              <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between gap-4 text-xs font-mono text-amber-900">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={loadData}
              className="px-3 py-1 bg-amber-600 text-white rounded font-bold hover:bg-amber-700 transition-colors shrink-0"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Grid dos 8 Índices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {indices.map((item) => {
            const isPositive = item.variationPercent > 0
            const isNegative = item.variationPercent < 0
            const isZero = item.variationPercent === 0

            return (
              <div
                key={item.symbol}
                className="bg-white rounded-xl p-5 border border-stone-200/90 hover:border-[#16A34A]/50 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg" role="img" aria-label={item.country}>
                        {item.flag}
                      </span>
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                        {item.country}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-slate-600 border border-stone-200 font-bold">
                      {item.currency}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#082852] line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-500">{item.shortName}</div>

                  <div className="mt-4 flex items-baseline justify-between gap-2">
                    <span className="font-mono text-2xl font-extrabold text-[#082852] tabular-nums">
                      {item.currentValue.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>

                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono font-bold tabular-nums ${
                        isPositive
                          ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                          : isNegative
                            ? 'bg-red-50 text-[#C0392B] border border-red-200'
                            : 'bg-stone-100 text-slate-600'
                      }`}
                    >
                      {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
                      {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
                      <span>
                        {isPositive ? '+' : ''}
                        {item.variationPercent.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        %
                      </span>
                    </div>
                  </div>

                  {item.change !== 0 && (
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      {item.change > 0 ? '+' : ''}
                      {item.change.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      pts
                    </div>
                  )}
                </div>

                {/* Mini Gráfico Sparkline */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Tendência</span>
                  {item.sparkline && item.sparkline.length >= 2 ? (
                    <Sparkline
                      data={item.sparkline}
                      width={100}
                      height={28}
                      color={isNegative ? '#C0392B' : '#16A34A'}
                    />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">estável</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-500 gap-2">
          <span>
            Fontes: AwesomeAPI e consolidações de pregões internacionais (B3, NYSE, Nasdaq, LSE,
            Deutsche Börse, TSE, HKEX).
          </span>
          <span className="text-[11px] text-slate-400">
            Valores de fechamento com defasagem típica de 15 minutos em dias úteis.
          </span>
        </div>
      </section>

      {/* 3. GUIA EDUCATIVO "COMO ATUAR NA BOLSA DE VALORES" (pt-BR, de empresário para empresário) */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-full text-xs font-mono font-bold text-[#15803D] mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>GUIA DO EMPRESÁRIO & GESTOR</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#082852]">
              Como Atuar na Bolsa de Valores com Visão Corporativa
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Diferente de especulações de curto prazo, o empresário de sucesso enxerga o mercado
              acionário como ele realmente é: um mecanismo para se tornar sócio de negócios sólidos,
              proteger o patrimônio da inflação e gerar renda passiva via dividendos.
            </p>
          </div>

          {/* 4 Blocos de Ativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-[#F5F3EC]/70 rounded-xl p-6 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-[#082852] text-white flex items-center justify-center font-bold mb-4">
                <Building2 className="w-5 h-5 text-[#22C55E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#082852] mb-1">
                Ações de Empresas
              </h3>
              <div className="text-xs font-mono text-[#15803D] font-bold mb-2">
                Sociedade Direta
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ao comprar uma ação, você se torna proprietário de uma pequena fração de uma grande
                companhia. Tem direito a receber lucros periódicos (dividendos e juros sobre capital
                próprio — JCP) e à valorização patrimonial de longo prazo.
              </p>
            </div>

            <div className="bg-[#F5F3EC]/70 rounded-xl p-6 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-[#082852] text-white flex items-center justify-center font-bold mb-4">
                <PieChart className="w-5 h-5 text-[#22C55E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#082852] mb-1">
                ETFs (Fundos de Índice)
              </h3>
              <div className="text-xs font-mono text-[#15803D] font-bold mb-2">
                Diversificação Imediata
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fundos negociados em bolsa que compram uma cesta inteira de ativos. Com apenas uma
                cota de BOVA11 você se torna sócio de dezenas de empresas do Ibovespa; com IVVB11 ou
                SPXB11 você investe nas 500 maiores potências americanas em dólar.
              </p>
            </div>

            <div className="bg-[#F5F3EC]/70 rounded-xl p-6 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-[#082852] text-white flex items-center justify-center font-bold mb-4">
                <Coins className="w-5 h-5 text-[#22C55E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#082852] mb-1">
                FIIs (Fundos Imobiliários)
              </h3>
              <div className="text-xs font-mono text-[#15803D] font-bold mb-2">
                Aluguéis Mensais Isentos
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Permitem investir em galpões de logística moderna, prédios corporativos e títulos do
                agronegócio sem a dor de cabeça de reformas ou vacância física direta. Os
                rendimentos mensais são historicamente isentos de IRPF para pessoa física.
              </p>
            </div>

            <div className="bg-[#F5F3EC]/70 rounded-xl p-6 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-[#082852] text-white flex items-center justify-center font-bold mb-4">
                <Landmark className="w-5 h-5 text-[#22C55E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#082852] mb-1">
                Renda Fixa vs Bolsa
              </h3>
              <div className="text-xs font-mono text-[#15803D] font-bold mb-2">
                Reserva & Segurança
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A bolsa NÃO substitui a Renda Fixa de curto prazo. A Renda Fixa serve para proteger
                o capital de giro da sua empresa e a reserva de segurança; a bolsa serve para
                multiplicar o capital excedente que não precisará ser resgatado por anos.
              </p>
            </div>
          </div>

          {/* Passo a Passo para Começar com Segurança */}
          <div className="mb-16">
            <h3 className="font-serif text-2xl font-bold text-[#082852] mb-6">
              Passo a Passo para Atuar com Segurança
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="border border-stone-200 rounded-xl p-5 bg-white relative">
                <span className="text-3xl font-mono font-extrabold text-[#16A34A]/30 absolute right-4 top-4">
                  01
                </span>
                <div className="text-xs font-mono uppercase text-[#15803D] font-bold mb-1">
                  Etapa Inicial
                </div>
                <h4 className="font-serif font-bold text-base text-[#082852] mb-2">
                  Abrir conta em Corretora Credenciada
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Escolha uma instituição devidamente autorizada pelo Banco Central e pela CVM com
                  plataforma estável, baixa taxa de corretagem e atendimento transparente.
                </p>
              </div>

              <div className="border border-stone-200 rounded-xl p-5 bg-white relative">
                <span className="text-3xl font-mono font-extrabold text-[#16A34A]/30 absolute right-4 top-4">
                  02
                </span>
                <div className="text-xs font-mono uppercase text-[#15803D] font-bold mb-1">
                  Governança
                </div>
                <h4 className="font-serif font-bold text-base text-[#082852] mb-2">
                  Definir Perfil de Risco (Suitability)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Entenda se o seu apetite a oscilações é conservador, moderado ou arrojado. Nunca
                  tome posições que tirem seu sono ou que comprometam as operações da empresa.
                </p>
              </div>

              <div className="border border-stone-200 rounded-xl p-5 bg-white relative">
                <span className="text-3xl font-mono font-extrabold text-[#16A34A]/30 absolute right-4 top-4">
                  03
                </span>
                <div className="text-xs font-mono uppercase text-[#15803D] font-bold mb-1">
                  Proteção
                </div>
                <h4 className="font-serif font-bold text-base text-[#082852] mb-2">
                  Diversificação em Setores Não Correlacionados
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Não coloque todos os ovos na mesma cesta: combine bancos sólidos, energia
                  elétrica, commodities e exposição internacional em moeda forte (dólar).
                </p>
              </div>

              <div className="border border-stone-200 rounded-xl p-5 bg-white relative">
                <span className="text-3xl font-mono font-extrabold text-[#16A34A]/30 absolute right-4 top-4">
                  04
                </span>
                <div className="text-xs font-mono uppercase text-[#15803D] font-bold mb-1">
                  Paciência
                </div>
                <h4 className="font-serif font-bold text-base text-[#082852] mb-2">
                  Horizonte de Tempo (3 a 5 anos+)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  O tempo é o melhor amigo do investidor inteligente. Crises políticas e ruídos
                  passam; empresas lucrativas e resilientes continuam gerando caixa e dividendos.
                </p>
              </div>
            </div>
          </div>

          {/* Erros Clássicos de Iniciante vs Boas Práticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-red-700 font-mono text-xs font-bold uppercase mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>Os 4 Erros Clássicos do Iniciante</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Confundir capital de giro com dinheiro para risco:</strong> alocar
                    recursos que a empresa precisará em 30 ou 60 dias em ações ou derivativos.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Comprar no topo por euforia e vender no fundo por pânico:</strong> agir
                    pela emoção de notícias sensacionalistas em vez de analisar fundamentos
                    econômicos.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Tentar adivinhar o momento exato do mercado (Market Timing):</strong>{' '}
                    esperar &ldquo;o dia perfeito&rdquo; para entrar costuma gerar perdas maiores do
                    que aportes regulares constantes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Alavancagem e Day Trade sem preparo institucional:</strong> operar com
                    dinheiro emprestado da corretora é a forma mais rápida de dilapidar patrimônio.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[#15803D] font-mono text-xs font-bold uppercase mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>As 4 Melhores Práticas Corporativas</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#16A34A] font-bold shrink-0">✓</span>
                  <span>
                    <strong>Separar rigidamente finanças da PF e da PJ:</strong> a empresa mantém
                    sua reserva de caixa em títulos públicos ou CDBs; a pessoa física dos sócios faz
                    os investimentos acionários.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#16A34A] font-bold shrink-0">✓</span>
                  <span>
                    <strong>Foco em Dividend Yield e Geração de Caixa:</strong> priorizar negócios
                    consolidados, monopolistas ou líderes de mercado que distribuem proventos
                    consistentes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#16A34A] font-bold shrink-0">✓</span>
                  <span>
                    <strong>Reinvestimento dos proventos:</strong> reinvestir dividendos acelera o
                    efeito dos juros compostos exponencialmente ao longo de 5, 10 e 15 anos.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#16A34A] font-bold shrink-0">✓</span>
                  <span>
                    <strong>Avaliação profunda de Balanço e Múltiplos:</strong> aplicar os mesmos
                    critérios de Valuation e análise que a Borlim utiliza ao avaliar qualquer
                    empresa.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Conexão com os Serviços da Borlim */}
          <div className="bg-gradient-to-r from-[#082852] to-[#0B3B7A] rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-[#0B3B7A]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16A34A]/20 border border-[#16A34A]/40 rounded-full text-xs font-mono font-bold text-[#22C55E]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>CONEXÃO COM A CONSULTORIA BORLIM</span>
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Gestão de Sobras de Caixa & Estratégia de Capital de Giro
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Antes de pensar em aplicar na bolsa, garanta que o caixa do seu negócio está
                  devidamente protegido. Na Borlim, ajudamos a sua empresa a mapear o Ciclo
                  Financeiro, a calcular a Necessidade de Capital de Giro (NCG) e a simular onde
                  alocar as sobras operacionais com rentabilidade e segurança total.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/indicadores#investimentos"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Simulador de Investimentos</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-100" />
                </Link>

                <Link
                  to="/planejamento"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/20"
                >
                  <Compass className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Planejamento & Capital de Giro</span>
                </Link>

                <Link
                  to="/valuation"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/20"
                >
                  <span>Valuation da sua Empresa</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Aviso Legal de Conteúdo Educativo */}
          <div className="mt-8 p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs text-slate-600 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Aviso Legal & Termo de Transparência:</strong> O conteúdo deste portal possui
              finalidade estritamente pedagógica, informativa e de inteligência macroeconômica. Não
              constitui oferta, recomendação individualizada de compra ou venda de ações, títulos ou
              valores mobiliários, nem consultoria de investimentos conforme regulamentada pela CVM.
              Investimentos em bolsa estão sujeitos a riscos de mercado e variações patrimoniais.
              Antes de tomar qualquer decisão, avalie seus objetivos e perfil de risco.
            </div>
          </div>
        </div>
      </section>

      {/* 4. PERGUNTAS FREQUENTES (FAQ EM ACORDEÃO) */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200/80 rounded-full text-xs font-mono font-bold text-slate-700 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>TIRA-DÚVIDAS EXECUTIVO</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852]">
            Perguntas Frequentes sobre Bolsa de Valores
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Respostas diretas e fundamentadas para os principais questionamentos dos empresários.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#082852] hover:text-[#16A34A] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#16A34A]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. BANNER CTA OFICIAL DE ENCERRAMENTO */}
      <section className="py-12 bg-[#082852] border-t border-[#0B3B7A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                BORLIM CONSULTORIA EMPRESARIAL
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Pronto para profissionalizar a gestão financeira do seu negócio?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Utilize nosso sistema de análise de balanços ou fale diretamente com o consultor
                Flávio Bordignon pelo WhatsApp ou e-mail institucional.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md font-mono border border-[#22C55E]"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>GESTÃO EMPRESARIAL</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-100" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>(17) 99765-0672</span>
              </a>

              <a
                href="mailto:flavio@borlim.com.br"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0B3B7A] hover:bg-[#1557A6] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors border border-[#16A34A]"
              >
                <Mail className="w-4 h-4 text-[#22C55E]" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
