import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Coins,
  ShieldCheck,
  TrendingUp,
  Scale,
  Handshake,
  Users2,
  Briefcase,
  DollarSign,
  CheckCircle2,
  Check,
  ArrowRight,
  Phone,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  Building2,
  HelpCircle,
  BarChart3,
  Calculator,
  ChevronDown,
  Layers,
  SearchCheck,
  AlertTriangle,
  Award,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

export default function Valuation() {
  const [activeTab, setActiveTab] = useState<'fcd' | 'multiplos' | 'ativos'>('fcd')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20Valuation%20da%20minha%20empresa.'

  const valuationMoments = [
    {
      icon: Handshake,
      title: 'Venda Total ou Parcial do Negócio (M&A)',
      tag: 'Fusões & Aquisições',
      desc: 'Numa possível venda, saber exatamente quanto valem a empresa e seus ativos permite negociar com firmeza, sem deixar dinheiro na mesa nem inviabilizar propostas por estimativas irreais perante compradores estratégicos ou financeiros.',
      detail:
        'O laudo atua como dossiê formal de diligência prévia (Vendor Due Diligence), acelerando o fechamento do negócio.',
    },
    {
      icon: Users2,
      title: 'Entrada, Saída ou Dissolução de Sócios',
      tag: 'Societário',
      desc: 'Apuração justa e transparente de haveres societários na admissão de investidores ou na dissolução de quotas, respaldando o valor contábil e econômico para prevenir disputas judiciais desgastantes.',
      detail:
        'Evita critérios empíricos ou arbitrários, fornecendo critérios técnicos aceitos pela legislação e tribunais.',
    },
    {
      icon: Briefcase,
      title: 'Planejamento Sucessório e Patrimonial',
      tag: 'Sucessão Familiar',
      desc: 'Estruturação harmoniosa e documentada da transmissão patrimonial familiar, conferindo segurança jurídica, fiscal e de governança para as próximas gerações.',
      detail:
        'Facilita a doação com reserva de usufruto, criação de holdings familiares e equalização de quinhões entre herdeiros.',
    },
    {
      icon: DollarSign,
      title: 'Captação de Recursos, Fundos e Mútuos',
      tag: 'Financiamento & Equity',
      desc: 'Apresentação formal a bancos de fomento, fundos de Private Equity, Venture Capital e investidores institucionais com laudo robusto baseado em geração de caixa real e lastro patrimonial.',
      detail:
        'Aumenta substancialmente o poder de barganha no custo da dívida e no percentual de equity cedido.',
    },
  ]

  const borlimPillars = [
    {
      icon: BarChart3,
      badge: 'Diagnóstico 360°',
      title: '48 Indicadores de Desempenho Financeiro',
      desc: 'Análise minuciosa de métricas de liquidez, rentabilidade operacional, ciclo financeiro, margens de contribuição, endividamento e giro de ativos. Nenhum ponto cego permanece oculto.',
    },
    {
      icon: AlertTriangle,
      badge: 'Prevenção de Crise',
      title: 'Insolvência Imediata e em 12 Meses',
      desc: 'Modelagem antecipada de risco de insolvência no curto e médio prazo. Asseguramos que o laudo reflita a capacidade real de honrar compromissos operacionais sem comprometer a continuidade.',
    },
    {
      icon: ShieldCheck,
      badge: 'Segurança Patrimonial',
      title: 'Avaliação por Indicador Seguro de Ativos',
      desc: 'Mensuração criteriosa do valor dos ativos tangíveis e intangíveis com a aplicação de um indicador seguro. Estabelecemos a base patrimonial sólida e incontestável para transações.',
    },
  ]

  const valuationSteps = [
    {
      step: '01',
      title: 'Diagnóstico dos 48 Indicadores & Coleta',
      desc: 'Levantamento minucioso dos balanços, DREs, fluxo de caixa e documentação contábil para apurar os 48 indicadores financeiros da metodologia Borlim.',
    },
    {
      step: '02',
      title: 'Teste de Solvência & Análise de Riscos',
      desc: 'Verificação antecipada de vulnerabilidades de liquidez imediata e projeção de solvência para os próximos 12 meses, expurgando distorções pontuais.',
    },
    {
      step: '03',
      title: 'Modelagem Econômica (FCD, Múltiplos e Ativos)',
      desc: 'Aplicação integrada das abordagens: FCD com taxa de desconto calculada, Múltiplos de Mercado com pares do segmento e Indicador Seguro para avaliação patrimonial.',
    },
    {
      step: '04',
      title: 'Emissão do Laudo Executivo & Suporte',
      desc: 'Entrega do relatório técnico de Valuation com memorial de cálculo, cenários de sensibilidade (otimista, neutro e conservador) e apoio consultivo nas negociações.',
    },
  ]

  const valuationBenefits = [
    {
      title: 'Base Objetiva e Defensável em Negociações',
      desc: 'Argumentação técnica e incontestável perante compradores, investidores, bancos e peritos, afastando achismos e precificações genéricas.',
    },
    {
      title: 'Valor Justo dos Ativos e do Negócio',
      desc: 'Aplicação de indicador seguro para mensurar o patrimônio real com total transparência, considerando amortização, conservação e liquidez.',
    },
    {
      title: 'Blindagem Contra Riscos de Insolvência',
      desc: 'Clareza antecipada sobre a saúde de curto prazo e nos próximos 12 meses, garantindo premissas de continuidade fiéis à realidade.',
    },
    {
      title: 'Faixa de Negociação: Piso, Justo e Teto',
      desc: 'Apresentação clara de cenários de sensibilidade para que o empresário saiba exatamente os limites de concessão e o valor ótimo do fechamento.',
    },
    {
      title: 'Identificação de Alavancas de Valor',
      desc: 'O diagnóstico aponta quais gargalos operacionais e financeiros, quando corrigidos, mais elevam o valor final da empresa antes da venda.',
    },
    {
      title: 'Segurança Jurídica para Acordos de Sócios',
      desc: 'Laudo pericial documentado e auditável, adequado para respaldo em estatutos, contratos sociais, divórcios e inventários patrimoniais.',
    },
  ]

  const faqs = [
    {
      q: 'Qual a diferença entre o Valor Contábil e o Valuation Econômico?',
      a: 'O valor contábil (Patrimônio Líquido) reflete o custo histórico de aquisição dos ativos menos as depreciações acumuladas registradas no balanço. Já o Valuation Econômico (em especial pelo Fluxo de Caixa Desconhecido ou Múltiplos) precifica a capacidade futura da empresa de gerar lucros, a força da sua marca, a carteira de clientes e sua posição competitiva. Muitas empresas operam com valor contábil modesto, mas possuem um Valuation de mercado várias vezes superior devido ao seu poder de geração de caixa.',
    },
    {
      q: 'Por que a Borlim avalia insolvência imediata e em 12 meses antes de precificar?',
      a: 'Uma empresa pode apresentar faturamento elevado e lucros no papel, mas enfrentar um descasamento agudo de fluxo de caixa que ameace sua continuidade nos próximos meses. Na Borlim, o teste preventivo de insolvência imediata e em 12 meses garante que o Valuation não seja construído sobre premissas frágeis. Isso protege o empresário de contrapropostas agressivas do comprador durante a Due Diligence.',
    },
    {
      q: 'O que é o "Indicador Seguro" aplicado na avaliação dos ativos pela Borlim?',
      a: 'É a metodologia própria da Borlim que audita e ajusta o valor dos ativos operacionais e não operacionais da empresa, corrigindo distorções como estoques obsoletos, créditos de liquidação duvidosa, depreciações fiscais irreais e maquinários já amortizados mas em plena produtividade. Com isso, apura-se o valor de reposição e o valor de liquidação ordenada dos ativos, oferecendo uma âncora patrimonial segura para o piso da negociação.',
    },
    {
      q: 'Quanto tempo leva para a conclusão de um Laudo de Valuation?',
      a: 'O prazo varia conforme o porte da empresa e a prontidão das demonstrações contábeis e financeiras. Em média, um projeto de Valuation completo da Borlim — compreendendo diagnóstico dos 48 indicadores, modelagem do FCD, análise de múltiplos e elaboração do laudo executivo — leva de 2 a 4 semanas de trabalho técnico conjunto.',
    },
    {
      q: 'A Borlim auxilia na mesa de negociação com os compradores ou sócios?',
      a: 'Sim. Além de entregar o relatório completo com análises de sensibilidade (piso, valor justo e teto), nossa equipe sênior participa de reuniões estratégicas com fundos, assessores jurídicos ou potenciais compradores para sustentar tecnicamente cada premissa econômica adotada no laudo.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-[#0B3B7A]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Breadcrumb */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40">
              <Coins className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Especialidade Técnica — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Valuation & Avaliação de Empresas
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              Precificação justa, defensável e ancorada na capacidade real de geração de caixa e no
              lastro seguro de ativos.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Na <strong>Borlim Consultoria</strong>, unimos um diagnóstico exclusivo de{' '}
              <strong>48 indicadores de desempenho econômico-financeiro</strong>, análise preventiva
              de <strong>risco de insolvência imediata e em 12 meses</strong> e a utilização de um{' '}
              <strong>indicador seguro para avaliar o valor dos seus ativos</strong>. Combinamos as
              três principais abordagens do mercado —{' '}
              <strong>Fluxo de Caixa Descontado (FCD)</strong>,{' '}
              <strong>Múltiplos de Mercado</strong> e{' '}
              <strong>Avaliação Patrimonial de Ativos</strong> — para entregar um laudo executivo
              incontestável para fusões, aquisições, dissoluções societárias ou captações de
              capital.
            </p>

            {/* CTAs do Hero */}
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
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-[#082852] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group"
              >
                <Phone className="w-4 h-4 text-[#16A34A]" />
                <span>Falar com o Especialista</span>
                <ArrowRight className="w-4 h-4 text-[#082852] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20Valuation%20-%20Borlim"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITAÇÃO CENTRAL & A METODOLOGIA BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                  Compromisso Metodológico Borlim
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#082852] leading-snug">
                “Numa possível venda do seu negócio, com a utilização de um indicador seguro
                avaliaremos o valor dos seus Ativos.”
              </blockquote>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Não trabalhamos com estimativas empíricas ou fórmulas genéricas de internet.
                Cruzamos a solidez real dos seus ativos patrimoniais com o diagnóstico exaustivo de
                48 indicadores financeiros e o teste preventivo de insolvência imediata e para 12
                meses. O resultado é um laudo consistente e defensável, pronto para a mesa de
                negociação com auditores, bancos, fundos e novos sócios.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#F8FAFC] p-6 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Contato Direto com o Consultor
                </span>
                <p className="font-serif text-lg font-bold text-[#082852]">Flávio Bordignon</p>
                <p className="text-xs text-slate-600 font-sans">
                  Economista e consultor sênior na BORLIM Consultoria Empresarial.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-2 font-mono text-xs">
                <a
                  href="https://wa.me/5517997650672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-700 hover:text-[#16A34A] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>(17) 99765-0672 (WhatsApp)</span>
                </a>
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="flex items-center gap-2 text-slate-700 hover:text-[#16A34A] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>flavio@borlim.com.br</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OS TRÊS PILARES DA METODOLOGIA BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Fundamentos Técnicos
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            A Tríade Analítica da BORLIM para Avaliação de Empresas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Diferente de avaliações genéricas baseadas apenas em uma fórmula isolada, nossa
            abordagem investiga profundamente a estrutura de capital e a sustentabilidade
            operacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {borlimPillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B3B7A] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] mb-3 border border-emerald-200">
                    {pillar.badge}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852] mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. APROFUNDAMENTO TÉCNICO DAS ABORDAGENS: TABS / COMPARATIVO DETALHADO */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                Engenharia Financeira & Metodologias
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight">
              Metodologias em Profundidade: Como a Borlim Avalia o Seu Negócio
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              O valor de uma empresa não é um número único e estático, mas sim uma faixa de
              negociação delimitada pela convergência de métodos complementares. Abaixo detalhamos o{' '}
              <strong>Fluxo de Caixa Descontado (FCD)</strong>, os{' '}
              <strong>Múltiplos de Mercado</strong> e a{' '}
              <strong>Avaliação Patrimonial de Ativos</strong> com linguagem acessível para
              tomadores de decisão.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-8">
            <button
              onClick={() => setActiveTab('fcd')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === 'fcd'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#22C55E]" />
              <span>1. Fluxo de Caixa Descontado (FCD)</span>
            </button>

            <button
              onClick={() => setActiveTab('multiplos')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === 'multiplos'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Scale className="w-4 h-4 text-[#22C55E]" />
              <span>2. Múltiplos de Mercado & Transações</span>
            </button>

            <button
              onClick={() => setActiveTab('ativos')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === 'ativos'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>3. Avaliação por Ativos & Indicador Seguro</span>
            </button>
          </div>

          {/* Tab 1: FCD Detalhado */}
          {activeTab === 'fcd' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      Conceito & Fundamento Teórico
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      O que é o Fluxo de Caixa Descontado (FCD)?
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      O <strong>Fluxo de Caixa Descontado (Discounted Cash Flow - DCF)</strong> é o
                      método mais respeitado no ambiente acadêmico, bancos de investimento e fundos
                      globais. Ele parte do princípio econômico de que{' '}
                      <strong>
                        o valor de um negócio é a soma de todo o dinheiro que ele é capaz de gerar
                        no futuro, trazido ao valor presente por uma taxa de desconto que reflete o
                        risco do negócio
                      </strong>
                      .
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Em vez de olhar apenas para o balanço passado ou lucros contábeis (que podem
                      ser mascarados por depreciações ou prazos de pagamento), o FCD calcula a
                      geração de caixa livre (FCFF ou FCFE) disponível para acionistas e credores
                      após todos os custos operacionais, tributos e investimentos necessários em
                      máquinas e capital de giro (Capex e NCG).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Calculator className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          A Taxa de Desconto (WACC / Ke)
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        A taxa de desconto traduz o custo de oportunidade do capital. Ela pondera a
                        taxa livre de risco da economia (como o CDI/Tesouro Direto Selic no Brasil),
                        o risco-país, o risco específico do segmento (Beta) e a estrutura de dívida
                        vs. capital próprio da empresa. Um risco maior exige taxa maior, o que reduz
                        o valor presente do caixa.
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <TrendingUp className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Valor Residual / Perpetuidade
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Como as empresas são constituídas para durar indefinidamente (princípio da
                        continuidade), modelamos um horizonte explícito (geralmente de 5 a 10 anos)
                        e, a partir daí, calculamos o valor da perpetuidade com base em uma taxa de
                        crescimento conservadora alinhada à inflação ou ao PIB de longo prazo.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#15803D] flex items-center gap-2">
                      <SearchCheck className="w-5 h-5 text-[#15803D]" />
                      Como a BORLIM Aplica o FCD na Prática:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      Não projetamos metas fantasiosas de faturamento. Nosso diferencial é que{' '}
                      <strong>
                        as projeções do FCD são calibradas diretamente pelo diagnóstico dos 48
                        indicadores
                      </strong>
                      . Analisamos histórico de margem bruta, giro de estoques, prazo médio de
                      cobrança e índice de inadimplência real. Além disso, antes de definir a taxa
                      de desconto, auditamos se a empresa possui riscos de insolvência imediata ou
                      em 12 meses, ajustando o prêmio de risco com exatidão científica.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  {/* Card Vantagens e Limitações */}
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Quadro Síntese
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">Quando Usar o FCD?</h4>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Empresas com histórico operacional consistente e previsibilidade de caixa.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Negócios em fase de expansão, captação com fundos ou entrada de novos
                          sócios.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Operações com forte geração de caixa mas poucos ativos físicos (ex.:
                          serviços, software, consultorias).
                        </span>
                      </li>
                    </ul>

                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        Atenção Técnica
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        O FCD é altamente sensível às premissas de taxa de desconto e crescimento na
                        perpetuidade. Uma pequena variação na taxa pode alterar o valor em milhões.
                        Por isso, a Borlim sempre entrega uma matriz de sensibilidade detalhada.
                      </p>
                    </div>
                  </div>

                  {/* Exemplo Prático Box */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                      Exemplo Prático Ilustrativo
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#082852]">
                      Distribuidora com R$ 1,2M de Caixa Livre/ano
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Suponha uma empresa distribuidora que gere R$ 1,2 milhão de caixa livre anual,
                      com crescimento estimado de 4% a.a. e taxa de desconto WACC de 13,5% ao ano
                      (com base na Selic e risco setorial). O cálculo a valor presente dos próximos
                      5 anos mais a perpetuidade aponta um Enterprise Value em torno de R$ 11,8
                      milhões. Deduzindo o endividamento líquido e somando as disponibilidades,
                      atinge-se o valor das cotas dos sócios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Múltiplos de Mercado Detalhado */}
          {activeTab === 'multiplos' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      Conceito & Avaliação Relativa
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      O que são Múltiplos de Mercado & Transações Similares?
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      A abordagem de <strong>Múltiplos de Mercado (Relative Valuation)</strong>{' '}
                      parte da lógica de que negócios semelhantes devem ser avaliados por preços
                      proporcionais. É um método amplamente utilizado por analistas de M&A e fundos
                      de investimento para verificar rapidamente a razoabilidade de uma proposta de
                      compra ou venda frente à realidade competitiva do setor.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Consiste em comparar indicadores contábeis da empresa avaliada (como EBITDA,
                      Faturamento Líquido ou Lucro Líquido) com empresas do mesmo setor que foram
                      negociadas recentemente ou têm ações transacionadas em bolsa de valores.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803D] font-bold">
                        Mais Utilizado no Mercado
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#082852]">EV / EBITDA</h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        Mede quantas vezes a geração de caixa operacional da empresa equivale ao
                        valor total da firma (Enterprise Value). É neutro quanto à estrutura
                        tributária e de dívida.
                      </p>
                    </div>

                    <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B3B7A] font-bold">
                        Margem & Escala
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#082852]">
                        EV / Receita Líquida
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        Útil em empresas com margens temporariamente comprimidas ou em fase
                        acelerada de ganho de market share, como tecnologia, varejo e startups.
                      </p>
                    </div>

                    <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                        Visão do Acionista
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#082852]">
                        P/L (Preço / Lucro)
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        Indica quantos anos de lucro líquido anual acumulado seriam necessários para
                        pagar o valor de compra das quotas ou ações da sociedade.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#15803D] flex items-center gap-2">
                      <SearchCheck className="w-5 h-5 text-[#15803D]" />
                      Como a BORLIM Aplica os Múltiplos com Responsabilidade:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      Aplicar múltiplos de grandes multinacionais abertas na B3 ou NYSE a uma
                      empresa de médio porte brasileira é um erro clássico que infla o Valuation de
                      forma irresponsável. Na <strong>BORLIM</strong>, realizamos os seguintes
                      ajustes indispensáveis:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-sans pl-2">
                      <li>
                        • <strong>Desconto por Iliquidez de Capital Fechado (DLOM):</strong>{' '}
                        ajustamos o múltiplo porque cotas de empresas limitadas não são vendidas com
                        a rapidez de ações em bolsa.
                      </li>
                      <li>
                        • <strong>Normalização do EBITDA:</strong> expurgamos salários de sócios
                        fora de mercado, despesas pessoais lançadas na pessoa jurídica e receitas
                        não recorrentes.
                      </li>
                      <li>
                        • <strong>Ponderação com 48 Indicadores:</strong> se a empresa tem liquidez
                        ou giro inferior aos pares do segmento, aplicamos o desconto correspondente
                        no múltiplo.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Quadro Síntese
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Quando Usar Múltiplos?
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Sectores maduros com diversas transações recentes comprovadas (indústria,
                          saúde, logística).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Como validação cruzada do FCD para identificar se a projeção está coerente
                          com o mercado.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Rodadas rápidas de sondagem preliminar com compradores em potencial.
                        </span>
                      </li>
                    </ul>

                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        Limitação do Método
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Os múltiplos ignoram particularidades exclusivas da sua operação, como
                        contratos de longo prazo fechados, vantagens fiscais específicas ou passivos
                        ocultos. Por isso, a Borlim nunca os utiliza como método único e isolado.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                      Exemplo Prático Ilustrativo
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#082852]">
                      Indústria com EBITDA Normalizado de R$ 3,0M
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Se transações de indústrias correlatas no interior paulista fecham a múltiplos
                      médios de 4,5x a 5,5x EBITDA, uma empresa com EBITDA de R$ 3,0M terá seu
                      Enterprise Value estimado entre R$ 13,5M e R$ 16,5M. Ajustando a dívida
                      líquida, define-se o Equity Value com precisão mercadológica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Avaliação por Ativos Detalhado */}
          {activeTab === 'ativos' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      Especialidade e Pilar BORLIM
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      Avaliação Patrimonial de Ativos com Indicador Seguro
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      A <strong>Avaliação Patrimonial Ajustada (Asset-Based Valuation)</strong>{' '}
                      apura o valor econômico de todos os bens e direitos pertencentes à pessoa
                      jurídica, deduzidas todas as obrigações e contingências. É o método que
                      estabelece o <strong>piso financeiro da empresa</strong>: nenhum negócio deve
                      ser vendido por valor inferior ao que se obteria na realização ordenada de
                      seus ativos livres de dívidas.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Muitos empresários subestimam ou superestimam seu patrimônio ao olhar apenas
                      para o balancete contábil. Na Borlim, aplicamos um{' '}
                      <strong>indicador seguro de avaliação de ativos</strong> que corrige tanto a
                      depreciação contábil excessiva (máquinas com valor residual zero no balanço,
                      mas avaliadas em milhões no mercado) quanto ativos fictícios (estoques sem
                      giro e créditos incobráveis).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Building2 className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Ativos Tangíveis Reavaliados
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Galpões, terrenos industriais, frota, maquinário operacional, estoques reais
                        e aplicações de caixa. Ajustamos a valor de reposição e valor justo de
                        mercado, eliminando a distorção gerada por regras fiscais da Receita
                        Federal.
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Award className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Intangíveis e Passivos Ocultos
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Identificamos marcas registradas no INPI, carteira de clientes recorrentes,
                        patentes, licenças regulatórias e softwares próprios. Em paralelo, auditamos
                        passivos tributários, cíveis, trabalhistas e riscos de insolvência imediata
                        e em 12 meses.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#15803D] flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#15803D]" />
                      O que significa “com a utilização de um indicador seguro avaliaremos o valor
                      dos seus Ativos”?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      Significa que numa negociação de venda, o empresário não ficará vulnerável a
                      depreciações oportunistas feitas pelo comprador. Nosso laudo apresenta um
                      indicador técnico auditável que comprova a liquidez, o estado operacional e o
                      custo de reposição dos ativos. Se o comprador tentar pagar apenas o patrimônio
                      contábil, nosso laudo prova exatamente quanto a empresa vale pelo seu lastro
                      seguro de bens.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Quadro Síntese
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Quando Usar a Avaliação de Ativos?
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Empresas intensivas em capital (indústrias, construtoras, agronegócio,
                          frotistas, galpões).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>Apuração de haveres na saída litigiosa ou amigável de sócios.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Reestruturação societária, recuperação judicial ou definição de garantias
                          para grandes financiamentos.
                        </span>
                      </li>
                    </ul>

                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#22C55E] font-bold block">
                        Diferencial Borlim
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Cruzamos a solidez dos ativos com os 48 indicadores financeiros. Dessa
                        forma, avaliamos não apenas o metal e o concreto, mas a capacidade daquele
                        maquinário de produzir rentabilidade e fluxo livre.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                      Exemplo Prático Ilustrativo
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#082852]">
                      Empresa Metalúrgica Familiar
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Uma metalúrgica cujo balanço registrava patrimônio líquido contábil de R$ 4,5
                      milhões teve seus galpões e maquinários modernos reavaliados por indicador
                      seguro a valor de mercado em R$ 11,2 milhões. Com a exclusão de estoques
                      obsoletos e precificação de dívidas fiscais parceladas, o piso de negociação
                      subiu de R$ 4,5M para R$ 9,8M, impedindo que os sócios vendessem a empresa por
                      metade do que valia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. CENÁRIOS DE APLICAÇÃO: QUANDO A EMPRESA PRECISA DE VALUATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Cenários de Aplicação Estratégica
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Quando a Sua Empresa Deve Contratar um Laudo de Valuation?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Em transações corporativas relevantes, assinar acordos sem um laudo formal independente
            submete os sócios a riscos financeiros desproporcionais e disputas judiciais
            prolongadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {valuationMoments.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white hover:border-[#16A34A] transition-all shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 font-sans flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{item.detail}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. PROCESSO EM 4 ETAPAS DA BORLIM */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-y border-[#0B3B7A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
              Fluxo Técnico Executivo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
              As 4 Etapas do Processo de Valuation na BORLIM
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans leading-relaxed">
              Do levantamento dos dados contábeis à entrega do relatório pericial com suporte direto
              aos acionistas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuationSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xs flex flex-col justify-between hover:border-[#22C55E]/60 transition-all group"
              >
                <div>
                  <span className="font-mono text-3xl font-bold text-[#22C55E] block mb-3 group-hover:scale-105 transition-transform">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg border border-[#22C55E]/40"
            >
              <Phone className="w-4 h-4" />
              <span>Solicitar Proposta de Laudo de Valuation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. BENEFÍCIOS PARA O EMPRESÁRIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Vantagens Competitivas
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Por Que Fazer a Avaliação da Sua Empresa com a BORLIM?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Benefícios práticos que transformam cálculos econômicos em poder real de barganha e
            tranquilidade para os acionistas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuationBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#16A34A] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#082852] mb-2 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ - PERGUNTAS FREQUENTES */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Tira-Dúvidas
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre Valuation de Empresas
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4.5 bg-[#F8FAFC] hover:bg-slate-100 flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="font-serif text-sm sm:text-base font-bold text-[#082852] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#16A34A]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 py-5 bg-white border-t border-slate-200 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed space-y-2 animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. CONTATO & CTA INSTITUCIONAL (GESTÃO EMPRESARIAL + CONTATOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Atendimento Técnico & Laudos Periciais
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Descubra o valor real e justo da sua empresa com a BORLIM Consultoria.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Fale diretamente com nossa equipe técnica para solicitar um diagnóstico de 48
                indicadores, avaliação de risco de insolvência imediata e em 12 meses ou uma
                proposta completa de Laudo de Valuation.
              </p>

              <div className="space-y-3 font-mono text-xs pt-2">
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    flavio@borlim.com.br
                  </span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    (17) 99765-0672 (WhatsApp)
                  </span>
                </a>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <Building2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>BORLIM Consultoria Empresarial Ltda. — São Paulo / SP</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0B3B7A] p-8 sm:p-10 rounded-2xl border border-slate-700 text-center shadow-inner">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-md mb-4 w-full max-w-[260px] flex items-center justify-center">
                <img
                  src={logoBorlim}
                  alt="BORLIM Consultoria Empresarial"
                  className="h-14 w-auto max-w-full object-contain"
                />
              </div>

              <h3 className="font-serif text-lg font-bold text-white">Gestão & Valuation</h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Acesse o nosso sistema completo ou converse com o especialista.
              </p>

              <div className="w-full space-y-3">
                <a
                  href={balanceAnalysisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-xl border-2 border-[#22C55E] group"
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
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Solicitar Valuation pelo WhatsApp</span>
                </a>

                <Link
                  to="/sobre"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-all border border-white/20"
                >
                  <span>Ver Página Sobre a Consultoria</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
