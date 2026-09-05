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
      desc: 'Ao sentar para negociar com um comprador ou investidor, você precisa saber com precisão quanto a empresa e seus bens realmente valem. Sem achismos, sem deixar dinheiro na mesa e sem pedir valores fora da realidade do mercado.',
      detail:
        'O laudo funciona como dossiê formal de auditoria prévia (Due Diligence do vendedor), acelerando o fechamento do negócio.',
    },
    {
      icon: Users2,
      title: 'Entrada, Saída ou Acordo entre Sócios',
      tag: 'Sociedade & Acordos',
      desc: 'Cálculo justo e transparente da participação de cada sócio, seja para admitir um novo parceiro ou calcular a saída (apuração de haveres), evitando conflitos e disputas judiciais desgastantes.',
      detail:
        'Substitui discussões subjetivas por critérios econômicos e contábeis sólidos, aceitos pela legislação e pelos tribunais.',
    },
    {
      icon: Briefcase,
      title: 'Planejamento Sucessório e Patrimônio Familiar',
      tag: 'Sucessão & Família',
      desc: 'Organização clara e documentada da passagem do negócio para herdeiros ou criação de holding familiar, assegurando equilíbrio entre os filhos e total proteção jurídica e fiscal.',
      detail:
        'Facilita a doação de cotas com usufruto, reorganizações societárias e a divisão justa do patrimônio construído.',
    },
    {
      icon: DollarSign,
      title: 'Captação de Recursos, Empréstimos e Financiamentos',
      tag: 'Crédito & Bancos',
      desc: 'Apresentação formal a bancos de desenvolvimento, fundos de investimento ou parceiros de crédito com um laudo que comprova a capacidade real de pagamento e o patrimônio da empresa.',
      detail:
        'Dá mais força ao empresário para negociar juros menores, prazos maiores e garantias compatíveis.',
    },
  ]

  const borlimPillars = [
    {
      icon: BarChart3,
      badge: 'Diagnóstico 360°',
      title: '48 Indicadores de Desempenho Financeiro',
      desc: 'Raio-X completo da empresa: caixa, rentabilidade, prazos de pagamento e recebimento, endividamento, custos e giro de estoque. Nenhum ponto cego fica de fora antes de calcular o valor.',
    },
    {
      icon: AlertTriangle,
      badge: 'Prevenção de Crise',
      title: 'Insolvência Imediata e em 12 Meses',
      desc: 'Teste antecipado de fôlego financeiro para hoje e para os próximos 12 meses. Garantimos que o valor da empresa esteja apoiado na capacidade real de honrar compromissos operacionais no dia a dia.',
    },
    {
      icon: ShieldCheck,
      badge: 'Segurança Patrimonial',
      title: 'Avaliação de Ativos com Indicador Seguro',
      desc: 'Reavaliação criteriosa de máquinas, imóveis, estoques e marcas com metodologia segura. Definimos o piso patrimonial do negócio para que você nunca venda por menos do que seus bens valem.',
    },
  ]

  const valuationSteps = [
    {
      step: '01',
      title: 'Diagnóstico dos 48 Indicadores & Coleta de Dados',
      desc: 'Análise detalhada de balanços, demonstrativos (DRE), relatórios de faturamento e contas para apurar os 48 indicadores da metodologia Borlim.',
    },
    {
      step: '02',
      title: 'Teste de Solvência & Análise de Riscos',
      desc: 'Checagem do fôlego de caixa imediato e projeção da saúde financeira para os próximos 12 meses, separando o que é lucro real do que é distorção passageira.',
    },
    {
      step: '03',
      title: 'Cálculo Econômico (Caixa Futuro, Múltiplos e Ativos)',
      desc: 'Cruzamento das 3 metodologias: Fluxo de Caixa Descontado calibrado com a Selic, comparação com negócios do mesmo setor e avaliação patrimonial por indicador seguro.',
    },
    {
      step: '04',
      title: 'Laudo Executivo & Apoio na Negociação',
      desc: 'Entrega do relatório técnico com memorial de cálculo, faixa de valor (piso, justo e teto) e orientação direta dos consultores para as conversas decisivas.',
    },
  ]

  const valuationBenefits = [
    {
      title: 'Argumentação Segura e Firme na Negociação',
      desc: 'Você senta com compradores, investidores ou bancos com números comprovados e auditáveis na mão, sem depender de palpites ou regras genéricas.',
    },
    {
      title: 'Valor Real dos Seus Bens e do Negócio',
      desc: 'Aplicação de indicador seguro que corrige a defasagem dos livros contábeis, mostrando quanto valem seus equipamentos, imóveis e ativos de verdade.',
    },
    {
      title: 'Visão Clara de Caixa e Sem Surpresas',
      desc: 'O teste de insolvência imediata e em 12 meses revela se o faturamento se converte em dinheiro no bolso, blindando sua posição perante compradores.',
    },
    {
      title: 'Faixa Estratégica: Piso, Valor Justo e Teto',
      desc: 'Você descobre exatamente o valor mínimo aceitável, o valor de mercado justo e o teto da negociação para fechar no melhor cenário possível.',
    },
    {
      title: 'Identificação do Que Aumenta o Valor da Empresa',
      desc: 'O diagnóstico aponta quais gargalos operacionais ou financeiros, se corrigidos antes da venda, mais elevam o valor de mercado do negócio.',
    },
    {
      title: 'Validade Jurídica para Acordos e Sucessão',
      desc: 'Relatório pericial estruturado e auditável, adequado para formalização em contratos sociais, inventários, holdings e acordos de acionistas.',
    },
  ]

  const faqs = [
    {
      q: 'Quanto custa um laudo de Valuation e como ele é precificado?',
      a: 'O investimento e o escopo variam conforme o porte, o segmento e a complexidade de cada empresa — como volume de filiais, composição dos ativos patrimoniais e nível de organização contábil. Na Borlim, não trabalhamos com tabelas genéricas ou valores engessados: realizamos uma conversa diagnóstica inicial para compreender a sua necessidade específica e apresentar uma proposta técnica sob medida, transparente e sem custos ocultos. Fale diretamente com o economista Flávio Bordignon pelo WhatsApp (17) 99765-0672 ou e-mail flavio@borlim.com.br.',
    },
    {
      q: 'Quanto tempo leva o processo de avaliação da empresa?',
      a: 'O cronograma de execução varia de acordo com o porte do negócio, a disponibilidade dos demonstrativos contábeis e a complexidade da estrutura patrimonial da empresa. A Borlim conduz cada etapa com agilidade e rigor técnico — desde a checagem dos 48 indicadores financeiros e testes de insolvência até a modelagem dos fluxos futuros e entrega do laudo pericial final. Para receber uma estimativa de cronograma adequada à sua demanda, consulte a Borlim pelo WhatsApp (17) 99765-0672 ou e-mail flavio@borlim.com.br.',
    },
    {
      q: 'Quais documentos e informações preciso fornecer para iniciar?',
      a: 'A relação de informações varia de acordo com o regime tributário, o porte e o setor da sua empresa. De modo geral, partimos dos demonstrativos contábeis recentes (Balanço Patrimonial e DRE), controles gerenciais de fluxo de caixa, estrutura de endividamento e inventário de ativos. Para evitar sobrecarga na sua rotina, a Borlim orienta a coleta em uma reunião inicial guiada, solicitando apenas o estritamente necessário para cada caso. Contate-nos pelo WhatsApp (17) 99765-0672 ou e-mail flavio@borlim.com.br para orientações prévias.',
    },
    {
      q: 'O laudo de Valuation serve para bancos, financiamentos e fundos de investimento?',
      a: 'Sim. O laudo da Borlim segue padrões econômicos e periciais amplamente reconhecidos (CVM, IFRS, CPC e normas de perícia econômico-financeira). Instituições financeiras, bancos de fomento, fundos de investimento e parceiros comerciais utilizam nossos relatórios para embasar concessão de garantias, limites de crédito e decisões de participação societária.',
    },
    {
      q: 'A avaliação serve para entrada ou saída de sócio (apuração de haveres)?',
      a: 'Com certeza, é uma das principais finalidades do Valuation. O estudo independente da Borlim estabelece uma base neutra, justa e tecnicamente fundamentada para o valor das quotas ou ações da sociedade. Essa abordagem protege tanto quem permanece quanto quem se desliga da operação, conferindo transparência à apuração de haveres e prevenindo litígios judiciais.',
    },
    {
      q: 'Qual é a diferença entre Valor Contábil e Valor de Mercado (Valuation)?',
      a: 'O Valor Contábil (Patrimônio Líquido) registra o custo histórico dos bens da empresa deduzido das depreciações contábeis e fiscais. Já o Valor de Mercado (Valuation Econômico) mede a real capacidade do negócio de gerar caixa no futuro, considerando sua carteira de clientes, reputação de marca, posicionamento competitivo e retorno sobre o capital. Por isso, empresas com patrimônio contábil reduzido frequentemente possuem valor de mercado expressivo quando operam com geração consistente de caixa.',
    },
    {
      q: 'Com que frequência a empresa deve atualizar o seu Valuation?',
      a: 'A necessidade de atualização depende do momento estratégico da empresa. Em processos de venda, fusão, entrada de novos investidores ou reestruturação societária, a revisão deve ocorrer sempre que surgirem fatos econômicos relevantes, oscilações macroeconômicas expressivas (como juros e inflação) ou alterações na estrutura do negócio. Para acompanhamento de governança e gestão patrimonial, a Borlim orienta revisões periódicas alinhadas ao monitoramento contínuo dos indicadores financeiros. Fale conosco para definir a periodicidade recomendada ao seu perfil.',
    },
    {
      q: 'O processo e as informações compartilhadas são confidenciais?',
      a: 'Sim, sob sigilo rigoroso. Antes de qualquer envio de dados contábeis, operacionais ou estratégicos, a Borlim firma um Acordo de Confidencialidade (NDA - Non-Disclosure Agreement) formal com plena validade jurídica. Todas as informações financeiras, margens, relações comerciais e dados patrimoniais do seu negócio são tratados com absoluto segredo profissional.',
    },
    {
      q: 'O que é o "Indicador Seguro" de avaliação de ativos da Borlim?',
      a: 'É a metodologia proprietária da Borlim para apurar e sanear o valor real de mercado dos ativos da empresa — como instalações e equipamentos em pleno funcionamento produtivo (mesmo que contabilmente depreciados no papel fiscal), além do expurgo técnico de estoques sem giro ou créditos de liquidação incerta. Com o indicador seguro, fixamos um piso patrimonial consistente para que você não negocie seu negócio abaixo do que seus ativos efetivamente valem.',
    },
    {
      q: 'E se eu ou outra parte discordarmos do valor encontrado no laudo?',
      a: 'O trabalho da Borlim não se limita a um único número fechado: fornecemos uma análise de sensibilidade completa, contemplando diferentes cenários mercadológicos e o memorial técnico integral de cálculo. Havendo questionamentos, nossos especialistas participam de reuniões conjuntas com os sócios, diretorias ou assessores jurídicos para detalhar cada premissa adotada e demonstrar a solidez dos critérios econômicos aplicados.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F3EC]">
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
              Descubra quanto sua empresa realmente vale no mercado com números seguros,
              transparentes e defensáveis.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Na <strong>Borlim Consultoria</strong>, traduzimos a complexidade financeira em
              decisões práticas para empresários. Combinamos um diagnóstico completo de{' '}
              <strong>48 indicadores de desempenho financeiro</strong>, checagem preventiva de{' '}
              <strong>fôlego de caixa (insolvência imediata e em 12 meses)</strong> e a aplicação de
              um <strong>indicador seguro para reavaliar o valor real dos seus ativos</strong>.
              Cruzamos as três principais metodologias do mercado —{' '}
              <strong>Fluxo de Caixa Descontado (o caixa futuro trazido para hoje)</strong>,{' '}
              <strong>Múltiplos de Mercado (comparação com transações do mesmo setor)</strong> e{' '}
              <strong>
                Avaliação Patrimonial de Ativos (o piso dos seus bens livres de dívidas)
              </strong>{' '}
              — para que você negocie com segurança na venda do negócio, na entrada ou saída de
              sócios e perante bancos e investidores.
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
                Não usamos regras de bolso nem palpites de internet. Cruzamos a solidez real dos
                seus bens com o diagnóstico aprofundado de 48 indicadores financeiros e a análise
                preventiva de insolvência imediata e em 12 meses. O resultado é um laudo executivo
                consistente, claro para você e inquestionável na mesa de negociação com sócios,
                bancos, investidores ou compradores.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#EDEAE0]/70 p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
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
              O valor de uma empresa não é um palpite solto, mas sim uma faixa estratégica (piso,
              valor justo e teto) construída pelo cruzamento de métodos complementares. Veja a
              seguir como funcionam o <strong>Fluxo de Caixa Descontado (FCD)</strong>, os{' '}
              <strong>Múltiplos de Mercado</strong> e a{' '}
              <strong>Avaliação Patrimonial de Ativos</strong>, com cada conceito explicado de
              empresário para empresário.{' '}
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
                  <div className="bg-[#EDEAE0]/60 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      1. Fluxo de Caixa Descontado (FCD) — Visão do Empresário
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      Quanto dinheiro a sua empresa vai colocar no bolso dos donos no futuro?
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      O <strong>Fluxo de Caixa Descontado (FCD, ou Discounted Cash Flow)</strong> é
                      o método mais reconhecido por bancos, peritos judiciais e investidores no
                      mundo todo. A lógica é direta e intuitiva:{' '}
                      <strong>
                        sua empresa vale o total de dinheiro limpo que ela é capaz de gerar nos
                        próximos anos, trazido para o valor de hoje com um desconto que reflete o
                        risco do negócio
                      </strong>
                      .
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Faturamento não é dinheiro no bolso, e lucro no papel muitas vezes não paga
                      boleto. Por isso, o FCD trabalha com o <strong>Caixa Livre</strong>: o
                      dinheiro real que sobra na conta da empresa depois de pagar salários,
                      fornecedores, impostos e de investir na compra ou troca de máquinas (Capex) e
                      no fôlego de capital de giro (NCG).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Calculator className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Taxa de Desconto (WACC) — O Custo do Dinheiro
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Receber R$ 1 milhão daqui a 5 anos não vale o mesmo que receber hoje. A taxa
                        de desconto (denominada{' '}
                        <strong>WACC — custo médio ponderado do capital</strong>) calcula exatamente
                        esse desconto. Ela considera a Selic (o rendimento sem risco da economia
                        brasileira), o risco-país Brasil, o risco específico do seu ramo de
                        atividade (o fator Beta) e a proporção entre dívidas bancárias e dinheiro
                        dos sócios. Quanto maior o risco da operação, maior essa taxa.
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <TrendingUp className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Perpetuidade — A Continuidade do Negócio
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Sua empresa não acaba no final da projeção de 5 anos. A{' '}
                        <strong>perpetuidade</strong> calcula o valor do negócio para todos os anos
                        seguintes de funcionamento contínuo, adotando uma taxa de crescimento
                        prudente alinhada à inflação oficial ou ao crescimento esperado do país. É o
                        valor que premia a história e a longevidade da marca que você construiu.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#15803D] flex items-center gap-2">
                      <SearchCheck className="w-5 h-5 text-[#15803D]" />
                      Como a Borlim Aplica o FCD na Prática:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      Não criamos planos mágicos ou metas irrealistas de vendas. Nosso diferencial é
                      que{' '}
                      <strong>
                        as projeções do FCD nascem calibradas pelo diagnóstico prévio dos 48
                        indicadores
                      </strong>
                      . Verificamos seus prazos médios de recebimento, giro de estoque,
                      inadimplência histórica e margens reais. Além disso, aplicamos o teste
                      preventivo de insolvência imediata e em 12 meses: assim, o comprador nunca
                      poderá alegar na mesa de negociação que a empresa tem problemas ocultos de
                      liquidez.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  {/* Card Vantagens e Limitações */}
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Em Poucas Palavras
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">Quando Usar o FCD?</h4>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Empresas com histórico financeiro consolidado e previsibilidade de
                          clientes.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Negócios em expansão, captação de investimento ou negociação de quotas
                          entre sócios.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Prestadores de serviços, distribuidoras e empresas que geram muito caixa
                          sem precisar de grandes fábricas.
                        </span>
                      </li>
                    </ul>

                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        Atenção do Consultor
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Uma pequena mudança na taxa de juros mexe muito no valor final. Por isso, a
                        Borlim sempre entrega uma tabela de sensibilidade mostrando o valor nos
                        cenários conservador, realista e otimista.
                      </p>
                    </div>
                  </div>

                  {/* Exemplo Prático Box */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                      Exemplo Prático Ilustrativo
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#082852]">
                      Distribuidora com Caixa Livre de R$ 1,2 milhão ao ano
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Imagine uma distribuidora que coloque limpo no caixa R$ 1,2 milhão por ano,
                      com crescimento anual estimado em 4% e taxa de desconto (WACC) calculada em
                      13,5% ao ano (com base na taxa Selic atual e no risco do setor). O cálculo a
                      valor presente dos próximos 5 anos somado à perpetuidade aponta um valor da
                      operação (Enterprise Value) próximo a R$ 11,8 milhões. Subtraindo as dívidas
                      líquidas e somando o saldo bancário, chegamos ao valor final que cabe aos
                      donos (Equity Value).
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
                  <div className="bg-[#EDEAE0]/60 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      2. Múltiplos de Mercado — Comparação com o Setor
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      Por quanto empresas semelhantes à sua foram compradas recentemente?
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      A avaliação por <strong>Múltiplos de Mercado</strong> funciona de forma
                      parecida com a precificação de um imóvel pelo metro quadrado da vizinhança: se
                      empresas parecidas com a sua são vendidas por 5 vezes o resultado operacional
                      anual, seu negócio provavelmente terá uma referência proporcional no mercado.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      É o método preferido de investidores e fundos para bater o olho e checar
                      rapidamente se a proposta faz sentido. Comparamos o resultado da sua empresa
                      com transações reais de compra e venda e empresas de capital aberto do seu
                      segmento.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803D] font-bold">
                        Mais Utilizado
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#082852]">EV / EBITDA</h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        Mostra quantas vezes o valor da empresa equivale ao seu caixa operacional
                        bruto (EBITDA — lucro antes de juros, impostos, depreciação e amortização).
                        Elimina distorções fiscais e de endividamento.
                      </p>
                    </div>

                    <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B3B7A] font-bold">
                        Margem & Faturamento
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#082852]">
                        EV / Receita Líquida
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        Compara o valor da empresa com seu faturamento anual líquido. Muito usado em
                        empresas em rápido crescimento, comércio, plataformas e empresas que ainda
                        estão ampliando margens.
                      </p>
                    </div>

                    <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                        Retorno do Sócio
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#082852]">
                        P/L (Preço / Lucro)
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        Indica em quantos anos o lucro líquido acumulado pagaria o valor de compra
                        da empresa. É o indicador clássico de retorno do investimento para os
                        sócios.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#15803D] flex items-center gap-2">
                      <SearchCheck className="w-5 h-5 text-[#15803D]" />
                      Como a Borlim Aplica os Múltiplos com Responsabilidade:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      Copiar múltiplos de grandes multinacionais que têm ações na bolsa para avaliar
                      uma PME familiar brasileira é um erro grave que gera valores ilusórios. Na{' '}
                      <strong>Borlim</strong>, fazemos os três ajustes essenciais:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-sans pl-2">
                      <li>
                        • <strong>Desconto de Iliquidez de Empresa Fechada:</strong> cotas de uma
                        empresa de médio porte não são vendidas com um clique como ações em bolsa;
                        por isso aplicamos o desconto técnico cabível.
                      </li>
                      <li>
                        • <strong>Normalização do EBITDA:</strong> ajustamos retiradas de pró-labore
                        fora do padrão de mercado, gastos pessoais lançados na pessoa jurídica e
                        receitas atípicas de um único ano.
                      </li>
                      <li>
                        • <strong>Ajuste pelos 48 Indicadores:</strong> comparamos se sua empresa
                        tem liquidez e rotação de estoques melhores ou piores do que a média dos
                        concorrentes, calibrando o múltiplo para cima ou para baixo.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Em Poucas Palavras
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Quando Usar Múltiplos?
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Segmentos com muitas negociações recentes registradas (indústrias,
                          clínicas, logística).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Como prova dos nove: checar se o cálculo do Fluxo de Caixa Descontado
                          condiz com o mercado.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Para conversas preliminares rápidas com interessados e parceiros
                          estratégicos.
                        </span>
                      </li>
                    </ul>

                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        Cuidado Necessário
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Múltiplos sozinhos não enxergam a fidelidade dos seus clientes, a segurança
                        dos seus contratos nem dívidas fiscais antigas. Por isso a Borlim nunca usa
                        múltiplos de forma isolada.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                      Exemplo Prático Ilustrativo
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#082852]">
                      Indústria com Caixa Operacional (EBITDA) de R$ 3,0 milhões
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Se transações de indústrias semelhantes no interior paulista vêm sendo
                      fechadas entre 4,5 e 5,5 vezes o EBITDA ajustado, uma empresa com R$ 3,0
                      milhões de EBITDA anual terá seu valor de operação balizado entre R$ 13,5M e
                      R$ 16,5M. Deduzindo as dívidas líquidas, chega-se com firmeza ao valor das
                      cotas dos donos.
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
                  <div className="bg-[#EDEAE0]/60 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      3. Avaliação Patrimonial — O Lastro Seguro da Empresa
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      Quanto valem os bens e o patrimônio real que sua empresa construiu?
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      A <strong>Avaliação Patrimonial de Ativos (Asset-Based Valuation)</strong>{' '}
                      apura o valor real de mercado de todos os bens e direitos da empresa (imóveis,
                      máquinas, frota, estoques, marcas e recebíveis), subtraindo todas as dívidas e
                      pendências. É o método que define o{' '}
                      <strong>piso inegociável da negociação</strong>: nenhuma empresa deve ser
                      vendida por valor menor do que seus bens próprios renderiam se fossem
                      realizados de forma organizada.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Muitos empresários perdem dinheiro porque olham apenas para o balanço
                      contábil. Na contabilidade, máquinas modernas compradas há anos podem constar
                      com valor zero por causa da depreciação fiscal, quando continuam produzindo e
                      valem milhões de reais. Na Borlim, aplicamos um{' '}
                      <strong>indicador seguro de avaliação de ativos</strong> que corrige essas
                      distorções e garante que o patrimônio real seja reconhecido pelo comprador.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Building2 className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Bens Físicos Reavaliados (Ativos Tangíveis)
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Galpões, terrenos próprios, frotas, máquinas industriais, equipamentos de
                        escritório, estoques auditados e dinheiro em caixa. Trazemos tudo para o
                        valor justo de mercado e custo de reposição, eliminando a defasagem criada
                        pelas tabelas fiscais da Receita Federal.
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-[#0B3B7A]">
                        <Award className="w-5 h-5 text-[#16A34A]" />
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          Marcas, Intangíveis e Dívidas Ocultas
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        Avaliamos marcas registradas no INPI, carteira de clientes ativos, patentes,
                        licenças de operação e sistemas próprios. Ao mesmo tempo, auditamos
                        eventuais passivos fiscais, trabalhistas e riscos de insolvência imediata e
                        em 12 meses, para que nenhuma surpresa apareça no meio do caminho.
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
                      Significa que na hora de negociar, o empresário não fica refém de descontos
                      oportunistas do comprador. Nosso laudo apresenta um indicador técnico
                      auditável que comprova a liquidez, o estado de conservação e o valor de
                      reposição dos seus bens. Se a outra parte tentar pagar apenas o valor contábil
                      depreciado do balancete, nosso laudo demonstra na vírgula quanto a empresa
                      realmente tem de lastro patrimonial seguro.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Em Poucas Palavras
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Quando Usar a Avaliação de Ativos?
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Empresas com muitas máquinas, veículos ou galpões (indústrias,
                          agronegócio, frotistas, construção).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Separação de cotas e apuração de haveres na entrada ou saída de sócios.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>
                          Garantias para empréstimos bancários de grande porte ou reestruturações
                          societárias.
                        </span>
                      </li>
                    </ul>

                    <div className="pt-4 border-t border-slate-700/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#22C55E] font-bold block">
                        Diferencial Borlim
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Conectamos o valor dos bens físicos aos 48 indicadores financeiros.
                        Avaliamos não só o ferro e o tijolo, mas a capacidade real de cada máquina e
                        galpão de continuar gerando lucro e caixa.
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
                      seguro a valor de mercado em R$ 11,2 milhões. Com o expurgo de estoques sem
                      giro e a contabilização correta de dívidas parceladas, o piso mínimo de
                      negociação subiu de R$ 4,5M para R$ 9,8M, impedindo que a família vendesse o
                      negócio por menos da metade do que seus bens valiam.
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
              Etapas Claras e Conduzidas pela Borlim
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
              Como Funciona o Processo de Avaliação na BORLIM
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans leading-relaxed">
              Do envio dos primeiros documentos contábeis à entrega do laudo executivo com apoio
              direto dos nossos economistas.
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
            Vantagens Práticas para o Dono do Negócio
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Por Que Avaliar a Sua Empresa com a BORLIM?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Benefícios diretos que transformam cálculos e números técnicos em poder real de
            negociação e tranquilidade para sua família e seus sócios.
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
                    className="w-full text-left px-6 py-4.5 bg-[#EDEAE0]/50 hover:bg-stone-100 flex items-center justify-between gap-4 transition-colors"
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
                Descubra quanto sua empresa realmente vale no mercado com a BORLIM Consultoria.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse diretamente com o nosso economista e tire dúvidas sobre o diagnóstico de 48
                indicadores, testes de insolvência imediata e em 12 meses, avaliação por indicador
                seguro de ativos ou solicite uma proposta fechada de Laudo de Valuation para o seu
                negócio.
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
              <div className="bg-white p-4 rounded-2xl border border-white/20 shadow-lg mb-4 w-full max-w-[260px] flex items-center justify-center">
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
