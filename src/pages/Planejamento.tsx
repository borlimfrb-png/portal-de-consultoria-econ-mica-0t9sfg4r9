import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calculator,
  TrendingUp,
  Target,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Check,
  ArrowRight,
  Phone,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  Building2,
  HelpCircle,
  ChevronDown,
  Layers,
  ArrowUpRight,
  DollarSign,
  PieChart,
  Coins,
  Repeat,
  Compass,
  Briefcase,
  Users2,
  Sparkles,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

export default function Planejamento() {
  const [activePlanTab, setActivePlanTab] = useState<'financeiro' | 'economico' | 'bsc'>(
    'financeiro',
  )
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20Planejamento%20Econ%C3%B4mico%20e%20Financeiro%20para%20minha%20empresa.'

  // Os 3 Fundamentos do Diagnóstico Prévio (A Fundação)
  const diagnosticPillars = [
    {
      icon: BarChart3,
      badge: 'Raio-X de 48 Indicadores',
      title: 'Diagnóstico dos 48 Indicadores de Desempenho',
      desc: 'Mapeamento minucioso do sistema financeiro da empresa: prazos médios, liquidez corrente e seca, capital de giro, margens operacionais, endividamento e rentabilidade sobre o patrimônio. Demonstramos claramente onde estão os pontos fortes e as vulnerabilidades antes de qualquer decisão.',
    },
    {
      icon: AlertTriangle,
      badge: 'Prevenção & Solvência',
      title: 'Teste de Insolvência Imediata e em 12 Meses',
      desc: 'Demonstramos com antecedência se a sua empresa apresenta risco de insolvência imediata ou nos próximos 12 meses. Separamos faturamento contábil de caixa real para que o negócio nunca seja pego de surpresa por descasamentos de datas ou falta de fôlego.',
    },
    {
      icon: ShieldCheck,
      badge: 'Solidez & Continuidade',
      title: 'Decisões Baseadas no Patrimônio Real e Lucro Líquido',
      desc: 'Integração direta com o valor real dos seus ativos e estrutura de custos. Cada recomendação de corte, investimento ou precificação é calibrada para proteger o patrimônio construído e garantir sustentabilidade de longo prazo.',
    },
  ]

  // Os 3 Tipos Estratégicos de Planejamentos
  const strategicPlansSummary = [
    {
      id: 'financeiro',
      number: '01',
      title: 'Planejamento Financeiro',
      subtitle: 'Fluxo de Caixa, Capital de Giro e Reinvestimento dos Lucros',
      icon: Calculator,
      highlight: 'Entrada e saída do capital de giro + onde reinvestir',
      phrase:
        'Planejar de forma eficiente o fluxo de entrada e saída do capital de giro e demonstrar sugestões para a empresa investir os lucros no próprio negócio.',
      actionCta: 'Ver detalhes do Planejamento Financeiro',
    },
    {
      id: 'economico',
      number: '02',
      title: 'Planejamento Econômico',
      subtitle: 'Maximização e Sustentabilidade do Lucro Mensal',
      icon: TrendingUp,
      highlight: 'Aumentar o lucro mensal da empresa',
      phrase:
        'Melhorar o lucro mensal da empresa, alinhando receitas, margem de contribuição, custos e despesas operacionais a parâmetros reais de rentabilidade.',
      actionCta: 'Ver detalhes do Planejamento Econômico',
    },
    {
      id: 'bsc',
      number: '03',
      title: 'Balanced Scorecard (BSC)',
      subtitle: 'Competitividade Estratégica e Retenção Absoluta de Negócios',
      icon: Target,
      highlight: 'Nenhum negócio será perdido no mercado',
      phrase:
        'Deixar a empresa muito mais competitiva no mercado — nenhum negócio será perdido com a implantação do Balanced Scorecard.',
      actionCta: 'Ver detalhes do Balanced Scorecard',
    },
  ]

  // Etapas do Processo de Implantação
  const planningSteps = [
    {
      step: '01',
      title: 'Coleta Documental & Diagnóstico dos 48 Indicadores',
      desc: 'Análise aprofundada de balanços, DREs, extratos, relatórios de faturamento, controles de contas a pagar e a receber para calcular os 48 indicadores da Borlim.',
    },
    {
      step: '02',
      title: 'Auditoria de Insolvência (Imediata e em 12 Meses)',
      desc: 'Projeção rigorosa do fôlego financeiro para hoje e para os próximos 12 meses. Identificamos previamente gargalos de liquidez e riscos de descasamento de capital de giro.',
    },
    {
      step: '03',
      title: 'Modelagem dos Três Planejamentos Estratégicos',
      desc: 'Construção personalizada do Planejamento Financeiro (fluxo e giro), Planejamento Econômico (lucro mensal) e Balanced Scorecard (competitividade e clientes).',
    },
    {
      step: '04',
      title: 'Apresentação Executiva, Metas e Acompanhamento',
      desc: 'Reunião de entrega com os sócios e diretoria: plano de ação prático, sugestões de reinvestimento dos lucros, painel de bordo e suporte consultivo contínuo.',
    },
  ]

  // Benefícios para o Empresário
  const planningBenefits = [
    {
      title: 'Controle Absoluto do Fluxo de Caixa e Capital de Giro',
      desc: 'Você para de apagar incêndios bancários diários e passa a antecipar com precisão as entradas e saídas de recursos mês a mês.',
    },
    {
      title: 'Lucro Mensal Concreto e Mensurável',
      desc: 'Identificação cirúrgica de linhas deficitárias, renegociação de custos e aumento real da margem de lucro líquido depositada na conta.',
    },
    {
      title: 'Sugestões Práticas de Onde Reinvestir os Lucros',
      desc: 'Demonstramos tecnicamente quais investimentos no próprio negócio trazem maior retorno sobre o capital próprio, acelerando o crescimento sem endividamento tóxico.',
    },
    {
      title: 'Prevenção Antecipada de Insolvência a 12 Meses',
      desc: 'Blindagem da solvência: você sabe com 1 ano de antecedência se haverá pressão de caixa e quais ajustes contratuais ou operacionais devem ser feitos.',
    },
    {
      title: 'Competitividade Implacável com o Balanced Scorecard',
      desc: 'Alinhamento de metas comerciais, operacionais e de equipe para assegurar que nenhum cliente ou oportunidade de venda seja perdida.',
    },
    {
      title: 'Sinergia Direta com o Valuation da Empresa',
      desc: 'Uma empresa com fluxo de caixa previsível, lucro mensal consistente e BSC implantado vale muito mais na hora de negociar cotas com investidores ou sócios.',
    },
  ]

  // Perguntas Frequentes (FAQ de empresários reais)
  const faqs = [
    {
      q: 'Qual é a diferença real entre Planejamento Financeiro e Planejamento Econômico?',
      a: 'É uma distinção vital que confunde muitos empresários. O Planejamento Econômico cuida do Lucro (Regime de Competência): ele analisa suas vendas, custos dos produtos/serviços, margem de contribuição e despesas fixas para garantir que sua operação seja lucrativa no papel e no resultado final. Já o Planejamento Financeiro cuida do Caixa (Regime de Caixa): ele organiza o fluxo de entrada e saída de dinheiro no tempo, gerencia os prazos de recebimento e pagamento (capital de giro) e aponta onde reinvestir os lucros. Uma empresa pode ter lucro econômico alto no mês, mas quebrar por falta de planejamento financeiro se o dinheiro estiver todo preso em estoque ou a receber a 90 dias.',
    },
    {
      q: 'O que são os 48 indicadores e por que eles são o ponto de partida?',
      a: 'Os 48 indicadores da Borlim são um conjunto completo de métricas que medem a saúde de toda a cadeia da sua empresa: liquidez (imediata, seca, corrente e geral), estrutura de capital e endividamento bancário/fiscal, prazos médios de estocagem, compras e recebimentos (ciclo financeiro e operacional), margens bruta, operacional e líquida, giro de ativos e retorno sobre o patrimônio líquido (ROE/ROIC). Sem esses 48 indicadores, qualquer planejamento seria apenas um palpite. Com eles, nós sabemos com exatidão onde o negócio sangra dinheiro e onde estão as maiores oportunidades.',
    },
    {
      q: 'Como funciona a análise de insolvência imediata e no período de 12 meses?',
      a: 'Nós confrontamos a capacidade imediata de geração e liquidez da empresa contra todos os compromissos exigíveis no curto prazo (fornecedores, folhas, tributos e parcelas de empréstimos). Depois, modelamos o fluxo projetado para os próximos 12 meses sob cenários realistas, conservadores e de estresse. O teste revela com até um ano de antecedência se a empresa terá gargalos de caixa, permitindo renegociar prazos com tranquilidade antes que o problema se torne uma crise.',
    },
    {
      q: 'O que é o Balanced Scorecard (BSC) e como ele garante que "nenhum negócio será perdido"?',
      a: 'O Balanced Scorecard é uma metodologia consagrada mundialmente que conecta os objetivos financeiros da empresa a três outras perspectivas fundamentais: Clientes e Mercado, Processos Internos de Entrega e Aprendizado/Pessoas. Na prática da Borlim, o BSC evita que o foco excessivo no corte de custos prejudique o atendimento ao cliente ou atrase entregas. Quando a equipe de vendas, a produção e o financeiro trabalham sob o mesmo painel com metas claras de retenção, tempo de resposta e qualidade, a empresa ganha agilidade e poder comercial — por isso afirmamos que nenhum negócio será perdido para a concorrência.',
    },
    {
      q: 'Como a Borlim orienta a empresa a investir os lucros no próprio negócio?',
      a: 'Gerar lucro é apenas metade da equação; a outra metade é saber o que fazer com ele. A Borlim demonstra tecnicamente para os sócios quais caminhos trazem a melhor rentabilidade ajustada ao risco: aumentar estoque estratégico com desconto à vista de fornecedores, modernizar máquinas para reduzir desperdício, expandir equipe comercial, constituir reserva de emergência remunerada ou amortizar dívidas bancárias caras. Cada sugestão é sustentada por cálculo de retorno sobre o capital investido.',
    },
    {
      q: 'Minha empresa é de médio ou pequeno porte. O planejamento estratégico se aplica?',
      a: 'Com certeza. São justamente as pequenas e médias empresas as que mais ganham com o planejamento da Borlim, pois costumam operar com margens mais apertadas e menor fôlego bancário. Empresários de PMEs frequentemente acumulam a função de vendas, operação e finanças. Com o nosso diagnóstico e os três planejamentos estruturados, o dono ganha clareza, ganha tempo e passa a tomar decisões embasadas em números sólidos.',
    },
    {
      q: 'Qual é a relação entre Planejamento Econômico-Financeiro e o Valuation da empresa?',
      a: 'Eles são duas faces da mesma moeda. O Valuation calcula quanto a sua empresa vale hoje. Já o Planejamento Econômico e Financeiro é a alavanca que faz esse valor disparar nos próximos meses e anos. Quando um investidor ou comprador analisa sua empresa e encontra um fluxo de caixa previsível, lucro mensal comprovado e um Balanced Scorecard em pleno funcionamento, o risco percebido desaba e o valor da empresa aumenta substancialmente.',
    },
    {
      q: 'Quanto tempo leva a consultoria e qual é a dedicação exigida da minha equipe?',
      a: 'O diagnóstico inicial dos 48 indicadores e o teste de insolvência são concluídos habitualmente entre 2 e 4 semanas após o fornecimento dos dados básicos. A dedicação da sua equipe é mínima e orientada: nós enviamos uma lista objetiva de documentos (balancetes, DREs, relatórios de contas e faturamento) e conduzimos reuniões de alinhamento com a diretoria sem interromper a rotina produtiva da empresa.',
    },
    {
      q: 'Como posso dar o primeiro passo para implantar o Planejamento na minha empresa?',
      a: 'Basta entrar em contato com nossa equipe técnica pelo botão do WhatsApp (17) 99765-0672 ou pelo e-mail flavio@borlim.com.br. Realizamos uma primeira conversa diagnóstica, sem custo, para entender a realidade do seu negócio e apresentar uma proposta personalizada para a sua empresa.',
    },
  ]

  // Cenários práticos de aplicação
  const practicalScenarios = [
    {
      icon: DollarSign,
      title: 'A empresa fatura bem, mas a conta bancária está sempre no limite',
      desc: 'Cenário típico de descasamento de capital de giro: prazos concedidos a clientes são longos demais em comparação aos prazos dos fornecedores. Nosso Planejamento Financeiro estanca essa hemorragia e equilibra o fluxo.',
    },
    {
      icon: TrendingUp,
      title: 'O faturamento cresce, mas o lucro mensal líquido não aparece',
      desc: 'Sintoma clássico de custos ocultos, despesas que escalam acima da receita e precificação defasada. Nosso Planejamento Econômico reorganiza a margem de contribuição e eleva o resultado líquido mensal.',
    },
    {
      icon: Users2,
      title: 'Perda constante de propostas e clientes para a concorrência',
      desc: 'Falta de velocidade de resposta comercial, falhas de entrega ou falta de pós-venda estruturado. A implantação do Balanced Scorecard elimina gargalos entre setores e fecha a porta para perdas comerciais.',
    },
    {
      icon: PieChart,
      title: 'Incerteza sobre onde aplicar o lucro acumulado da empresa',
      desc: 'Retirar tudo em pró-labore/dividendos ou reinvestir no escuro? A Borlim demonstra onde cada real de lucro reinvestido traz o maior ganho para acelerar a prosperidade do negócio.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO INSTITUCIONAL */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        {/* Subtle decorative glowing backdrops */}
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-[#0B3B7A]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Breadcrumb */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40">
              <Compass className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Especialidade Estratégica — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Planejamento Econômico & Financeiro
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              Para a sua empresa prosperar ainda mais, com fluxo de capital de giro eficiente, lucro
              mensal crescente e competitividade imbatível no mercado.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              A <strong>Borlim Consultoria Empresarial</strong> é especializada em diagnosticar e
              planejar o sistema financeiro da sua empresa. Demonstramos com rigor técnico os pontos
              fortes e fracos com <strong>48 indicadores de desempenho</strong> e apuramos se o seu
              negócio apresenta{' '}
              <strong>riscos de insolvência imediata ou no período de doze meses</strong>. Com base
              nessa fundação matemática e segura, estruturamos os{' '}
              <strong>três tipos de planejamentos estratégicos</strong>: o{' '}
              <strong>Planejamento Financeiro</strong> (eficiência de fluxo de entrada e saída do
              capital de giro e sugestões para reinvestir lucros), o{' '}
              <strong>Planejamento Econômico</strong> (melhorar o lucro mensal) e o{' '}
              <strong>Balanced Scorecard</strong> (tornar a empresa muito mais competitiva para que
              nenhum negócio seja perdido).
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

              <Link
                to="/valuation"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Coins className="w-4 h-4 text-emerald-300" />
                <span>Ver também: Valuation de Empresas</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITAÇÃO CENTRAL & O COMPROMISSO METODOLÓGICO BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                  Compromisso Técnico Borlim
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#082852] leading-snug">
                “A Borlim é especializada em diagnosticar e planejar o sistema financeiro da sua
                empresa, demonstrando pontos fortes e fracos com 48 indicadores de desempenho.”
              </blockquote>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Antes de traçar qualquer plano de metas ou expansão, nós colocamos a empresa no
                raio-X. Verificamos se há problemas de insolvência imediata ou nos próximos doze
                meses. A partir desse diagnóstico inquestionável, desenhamos com o empresário o mapa
                para controlar o capital de giro, aumentar o lucro mensal e posicionar o negócio de
                forma tão competitiva que nenhuma venda ou contrato seja perdido.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#F8FAFC] p-6 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Atendimento Direto com o Consultor
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

      {/* 3. A FUNDAÇÃO: O DIAGNÓSTICO DOS 48 INDICADORES & TESTE DE INSOLVÊNCIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            A Fundação de Todo o Trabalho
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Diagnóstico 360° com 48 Indicadores & Prevenção de Insolvência
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Nenhum planejamento é eficaz se for construído sobre suposições. Conheça a base
            analítica proprietária da BORLIM que dá suporte aos três planejamentos estratégicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diagnosticPillars.map((pillar, idx) => {
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

        {/* Banner Explicativo de Insolvência Imediata vs 12 Meses */}
        <div className="mt-10 p-6 sm:p-8 bg-gradient-to-r from-[#082852] to-[#0B3B7A] rounded-2xl text-white shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#22C55E]" />
                Auditoria de Solvência Borlim
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                Por que testar a insolvência imediata e no período de 12 meses?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Mais de 70% das empresas que encerram atividades no Brasil eram lucrativas no papel,
                mas sucumbiram à falta de liquidez no fluxo de caixa diário. Ao auditar tanto o
                fôlego imediato quanto o horizonte de 12 meses, identificamos descompassos sazonais,
                parcelas de financiamentos e impostos represados antes que eles se tornem uma
                emergência bancária.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#22C55E] font-bold block mb-1">
                  Insolvência Imediata
                </span>
                <p className="text-xs text-slate-200 font-sans">
                  Capacidade de honrar compromissos dos próximos 30 a 60 dias com caixa disponível e
                  recebíveis líquidos.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#22C55E] font-bold block mb-1">
                  Insolvência em 12 Meses
                </span>
                <p className="text-xs text-slate-200 font-sans">
                  Sustentabilidade do ciclo operacional e capacidade de absorver variações de juros,
                  custos de reposição e sazonalidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OS TRÊS TIPOS DE PLANEJAMENTOS EM PROFUNDIDADE (TABS / GUIA DETALHADO) */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                Os Três Tipos Estratégicos de Planejamentos
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight">
              A Tríade Estratégica da BORLIM para a Sua Empresa Prosperar
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Com base nos 48 indicadores, estruturamos soluções sob medida divididas em três
              grandes vertentes complementares. Escolha abaixo para explorar o impacto prático de
              cada uma na sua empresa.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-8">
            <button
              onClick={() => setActivePlanTab('financeiro')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activePlanTab === 'financeiro'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4 text-[#22C55E]" />
              <span>1. Planejamento Financeiro</span>
            </button>

            <button
              onClick={() => setActivePlanTab('economico')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activePlanTab === 'economico'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#22C55E]" />
              <span>2. Planejamento Econômico</span>
            </button>

            <button
              onClick={() => setActivePlanTab('bsc')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activePlanTab === 'bsc'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Target className="w-4 h-4 text-[#22C55E]" />
              <span>3. Balanced Scorecard</span>
            </button>
          </div>

          {/* TAB 1: PLANEJAMENTO FINANCEIRO */}
          {activePlanTab === 'financeiro' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      1. Planejamento Financeiro — Caixa, Liquidez & Capital de Giro
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      Planejar de forma eficiente o fluxo de entrada e saída do capital de giro e
                      onde reinvestir os lucros
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      O <strong>Planejamento Financeiro da Borlim</strong> cuida do oxigênio diário
                      da sua empresa: o dinheiro no banco. Nosso foco é organizar de forma técnica e
                      eficiente o <strong>fluxo de entrada e saída do capital de giro</strong>,
                      eliminando a dependência crônica de limite de cheque especial, antecipação
                      cara de recebíveis e empréstimos de curto prazo com juros corrosivos.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Além de equilibrar as entradas e saídas, nossa consultoria desenvolve{' '}
                      <strong>
                        sugestões fundamentadas para a empresa reinvestir os lucros no seu próprio
                        negócio
                      </strong>
                      . Demonstramos com cálculos exatos qual o destino do lucro que trará maior
                      multiplicação patrimonial — seja reforço de estoques estratégicos com ganho de
                      escala, modernização de equipamentos, tecnologia ou expansão comercial.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Repeat className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Sincronização do Ciclo Financeiro
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Calibramos a relação entre o Prazo Médio de Recebimento (PMR), Prazo Médio
                        de Pagamento a Fornecedores (PMP) e o Prazo de Estocagem (PME). Quando essas
                        datas são sincronizadas, a necessidade de capital de giro (NCG) diminui
                        drasticamente, sobrando mais dinheiro livre em caixa.
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Coins className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Reinvestimento Estratégico dos Lucros
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Muitos empresários hesitam entre retirar dividendos, comprar ativos físicos
                        ou deixar o dinheiro parado. A Borlim demonstra onde cada real de lucro
                        reinvestido gera maior taxa interna de retorno (TIR) sem comprometer a
                        liquidez de emergência.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#15803D] flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                      O que o empresário recebe no Planejamento Financeiro da Borlim:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>Fluxo de caixa projetado diário, semanal e mensal para 12 meses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>Dimensionamento exato da Necessidade de Capital de Giro (NCG)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>
                          Plano de eliminação de endividamento de curto prazo e juros altos
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>Matriz de decisão para reinvestir os lucros no próprio negócio</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Impacto Prático
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Fim das Surpresas de Fim de Mês
                    </h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Você saberá exatamente quanto dinheiro terá em conta no dia 10, no dia 20 e no
                      dia 30, mesmo em meses de sazonalidade ou pagamento de 13º salário e tributos.
                    </p>
                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#22C55E] font-bold block">
                        Baseado nos Indicadores:
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Liquidez Corrente, Liquidez Imediata, Ciclo de Caixa, Giro de Contas a
                        Receber e Cobertura de Juros.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                      Caso Típico de Sucesso
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#082852]">
                      Distribuidora Comercial
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Uma distribuidora gastava R$ 28 mil mensais em desconto de duplicatas e cheque
                      especial. Com o replanejamento dos prazos de recebimento e fornecedores
                      conduzido pela Borlim, o ciclo de caixa foi reduzido em 19 dias, liberando R$
                      380 mil em capital de giro próprio e zerando a despesa bancária desnecessária.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLANEJAMENTO ECONÔMICO */}
          {activePlanTab === 'economico' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      2. Planejamento Econômico — Lucro Mensal & Rentabilidade Real
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      Melhorar o lucro mensal da empresa, alinhando receitas, custos e margem
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      O <strong>Planejamento Econômico da Borlim</strong> tem como meta direta e
                      inegociável: <strong>melhorar o lucro mensal da sua empresa</strong>. Muitos
                      empresários comemoram recordes de faturamento, mas percebem no final do mês
                      que a margem líquida é minúscula ou até negativa. Isso acontece porque a
                      estrutura de custos fixos e despesas operacionais não acompanha a lógica da
                      precificação.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Trabalhamos na raiz do resultado econômico (Demonstração do Resultado do
                      Exercício - DRE gerencial): identificamos quais produtos, serviços ou clientes
                      geram margem de contribuição positiva e quais estão secretamente drenando os
                      resultados da operação. A partir desse mapeamento, estabelecemos metas de
                      rentabilidade mensal que transformam volume bruto de vendas em lucro real no
                      bolso dos sócios.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <PieChart className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Margem de Contribuição & Ponto de Equilíbrio
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Calculamos com precisão o ponto de equilíbrio contábil, financeiro e
                        econômico. Você descobre em qual dia exato do mês a empresa paga todas as
                        suas contas fixas e a partir de quando cada venda passa a ser lucro puro
                        para o negócio.
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <BarChart3 className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Engenharia de Custos & Precificação Saudável
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Avaliamos a formação dos seus preços de venda à luz do impacto dos tributos
                        da Reforma Tributária e dos custos diretos. Ajustamos os preços com
                        inteligência de mercado, sem perder vendas e garantindo a margem necessária
                        para remunerar o capital.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#15803D] flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                      O que o empresário recebe no Planejamento Econômico da Borlim:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>DRE Gerencial mensal estruturada para tomada rápida de decisões</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>Análise de rentabilidade por linha de produto, serviço e filial</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>Metas claras de corte de custos sem comprometer a qualidade</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>
                          Acompanhamento da evolução do Lucro Operacional Líquido e EBITDA
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Foco no Resultado Final
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Faturamento é Ego, Lucro é Sanidade
                    </h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Não adianta dobrar de tamanho vendendo com margem negativa. O Planejamento
                      Econômico garante que cada nova venda aumente de verdade o lucro líquido final
                      da sua empresa.
                    </p>
                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#22C55E] font-bold block">
                        Baseado nos Indicadores:
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Margem Bruta, Margem EBITDA, Margem Líquida, Retorno sobre Ativos (ROA) e
                        Retorno sobre Patrimônio Líquido (ROE).
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                      Caso Típico de Sucesso
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#082852]">
                      Empresa de Serviços Terceirizados
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Uma prestadora de serviços faturava R$ 1,2 milhão ao mês com apenas 2,1% de
                      margem líquida. A auditoria econômica da Borlim revelou que 3 grandes
                      contratos tinham preço defasado e causavam prejuízo. Com a repactuação desses
                      contratos e corte de despesas administrativas redundantes, a margem líquida
                      subiu para 8,7% — mais de R$ 75 mil adicionais de lucro líquido mensal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BALANCED SCORECARD */}
          {activePlanTab === 'bsc' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      3. Balanced Scorecard (BSC) — Competitividade & Retenção de Negócios
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      Deixar a empresa muito mais competitiva no mercado: nenhum negócio será
                      perdido
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      O <strong>Balanced Scorecard (BSC)</strong> é a ferramenta definitiva para
                      conectar a estratégia da empresa ao trabalho do dia a dia. Com essa
                      metodologia,{' '}
                      <strong>
                        sua empresa vai ficar muito mais competitiva no mercado — ou seja, nenhum
                        negócio será perdido com a implantação do Balanced Scorecard
                      </strong>
                      .
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Enquanto muitos empresários controlam apenas o financeiro, o BSC integra 4
                      dimensões vitais para garantir que sua empresa vença a concorrência:{' '}
                      <strong>1. Perspectiva Financeira</strong> (lucro e retorno);{' '}
                      <strong>2. Perspectiva de Clientes & Mercado</strong> (satisfação, preço,
                      prazos e retenção); <strong>3. Processos Internos</strong> (qualidade,
                      velocidade de entrega e redução de retrabalho); e{' '}
                      <strong>4. Aprendizado & Pessoas</strong> (equipe capacitada e engajada).
                      Quando todas as engrenagens giram juntas, propostas comerciais não ficam
                      paradas na gaveta, os clientes são atendidos com excelência e a empresa ganha
                      musculatura competitiva sem precedentes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Target className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Blindagem Comercial & Agilidade de Resposta
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        A Borlim mapeia onde os negócios estão sendo perdidos: cotações demoradas,
                        falta de flexibilidade de pagamento, problemas de estoque ou pós-venda
                        falho. O BSC alinha metas claras para que o setor comercial e o operacional
                        ajam com precisão imediata.
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Sparkles className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Painel de Bordo Estratégico (Dashboard)
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Criamos um mapa estratégico visual e intuitivo com metas e indicadores para
                        cada líder de setor. A diretoria passa a acompanhar a saúde de toda a
                        empresa em uma única tela, com aviso prévio de desvios antes que eles afetem
                        os clientes.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#15803D] flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                      O que o empresário recebe com o Balanced Scorecard da Borlim:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>
                          Mapa Estratégico completo nas 4 perspectivas (Financeira, Clientes,
                          Processos e Pessoas)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>
                          Metas operacionais e indicadores de desempenho (KPIs) por departamento
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>Processo de resposta ágil para propostas para não perder vendas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>Rotina periódica de revisão de metas e direcionamento executivo</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      A Promessa Borlim
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      “Nenhum Negócio Será Perdido”
                    </h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Quando as metas comerciais, a operação e o financeiro falam a mesma língua, a
                      empresa ganha velocidade, consistência e autoridade na negociação com clientes
                      estratégicos.
                    </p>
                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#22C55E] font-bold block">
                        As 4 Perspectivas:
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        1. Financeira (Resultados)
                        <br />
                        2. Clientes (Satisfação & Valor)
                        <br />
                        3. Processos Internos (Velocidade & Padrão)
                        <br />
                        4. Pessoas & Aprendizado (Engajamento)
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                      Caso Típico de Sucesso
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#082852]">
                      Indústria Metalmecânica
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      A empresa perdia até 35% das cotações porque a fábrica demorava 4 dias para
                      informar prazo de entrega ao comercial. Com o Balanced Scorecard da Borlim,
                      instituiu-se um KPI conjunto de resposta em 24h e integração de estoque. A
                      taxa de conversão de vendas saltou de 42% para 78% em apenas 4 meses,
                      garantindo que nenhum cliente de porte migrasse para a concorrência.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. CENÁRIOS PRÁTICOS: QUANDO CONTRATAR O PLANEJAMENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Cenários de Aplicação Prática
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Identifica Alguma Dessas Situações no Seu Negócio?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Dificuldades comuns no dia a dia corporativo que são solucionadas de forma estrutural
            pelo nosso trabalho de Planejamento Econômico e Financeiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {practicalScenarios.map((scenario, idx) => {
            const Icon = scenario.icon
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
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-50 text-[#15803D] border border-emerald-200">
                      Cenário #{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852]">
                    {scenario.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {scenario.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-600 font-sans flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="font-semibold text-[#082852]">
                    Solucionado com os 48 Indicadores da Borlim
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. O PROCESSO EM 4 ETAPAS */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-y border-[#0B3B7A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
              Metodologia Conduzida Passo a Passo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
              Como Funciona a Implantação na Sua Empresa
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans leading-relaxed">
              Trabalho consultivo ágil, sem sobrecarregar sua equipe e com foco exclusivo em
              resultados práticos de liquidez e lucratividade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {planningSteps.map((step, idx) => (
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
              <span>Solicitar Diagnóstico e Planejamento para Minha Empresa</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. BENEFÍCIOS PARA O EMPRESÁRIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Vantagens Diretas para o Dono do Negócio
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Por Que Fazer o Planejamento Econômico-Financeiro com a BORLIM?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Benefícios objetivos que transformam desorganização e incerteza em tranquilidade,
            previsibilidade financeira e crescimento sustentável.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {planningBenefits.map((benefit, idx) => (
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

      {/* 8. SINERGIA ENTRE PLANEJAMENTO E VALUATION (A PONTE ESTRATÉGICA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-[#082852] via-[#0B3B7A] to-[#082852] text-white p-8 sm:p-12 rounded-3xl border border-[#0B3B7A] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16A34A]/20 border border-[#16A34A]/40 text-[#22C55E]">
                <Coins className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold">
                  Sinergia Estratégica
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Planejamento & Valuation: Duas Forças que Multiplicam o Valor do Seu Negócio
              </h3>
              <p className="text-sm text-slate-200 font-sans leading-relaxed">
                Um bom laudo de Valuation revela quanto a sua empresa vale hoje no mercado. Porém, é
                o <strong>Planejamento Econômico e Financeiro</strong> que eleva esse valor
                continuamente. Ao maximizar o lucro mensal, organizar o capital de giro e blindar a
                competitividade com o Balanced Scorecard, a geração futura de caixa (FCD) cresce, as
                dívidas caem e a empresa passa a valer muito mais numa eventual negociação de sócios
                ou venda total.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                to="/valuation"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group border border-[#22C55E]/40"
              >
                <Coins className="w-4 h-4" />
                <span>Conhecer Serviço de Valuation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/sobre"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider rounded-lg transition-all border border-white/20"
              >
                <span>Sobre a Consultoria BORLIM</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ - PERGUNTAS FREQUENTES */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Tira-Dúvidas de Empresário para Empresário
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre Planejamento Econômico e Financeiro
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Respostas claras para as principais incertezas sobre fluxo de caixa, lucro mensal,
              insolvência e Balanced Scorecard.
            </p>
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

      {/* 10. CONTATO & CTA INSTITUCIONAL (GESTÃO EMPRESARIAL + CONTATOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Atendimento Técnico & Diagnóstico Prévio
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Vamos fazer a sua empresa prosperar ainda mais com a BORLIM Consultoria.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse diretamente com o nosso economista e tire dúvidas sobre os 48 indicadores
                de desempenho, prevenção de insolvência imediata e em 12 meses, fluxo de capital de
                giro, lucro mensal e implantação do Balanced Scorecard para a sua empresa.
              </p>

              <div className="space-y-3 font-mono text-xs pt-2">
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#16A34A] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    flavio@borlim.com.br
                  </span>
                </a>
                <a
                  href="https://wa.me/5517997650672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#16A34A] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    (17) 99765-0672
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans font-normal">
                    (WhatsApp Direto)
                  </span>
                </a>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <Building2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>BORLIM Consultoria Empresarial Ltda. — São Paulo, SP</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0B3B7A] p-8 rounded-2xl border border-slate-700 text-center shadow-inner">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-md mb-4 w-full max-w-[260px] flex items-center justify-center">
                <img
                  src={logoBorlim}
                  alt="BORLIM Consultoria Empresarial"
                  className="h-14 w-auto max-w-full object-contain"
                />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Consultoria Estratégica</h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Atendimento personalizado para empresários, sócios e diretorias corporativas.
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
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow group"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Falar com Flávio Bordignon</span>
                  <ArrowRight className="w-4 h-4 text-[#082852] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
