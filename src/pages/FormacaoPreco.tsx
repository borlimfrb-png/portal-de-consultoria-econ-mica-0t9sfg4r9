import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Tag,
  Factory,
  Store,
  Briefcase,
  Calculator,
  Percent,
  TrendingUp,
  AlertTriangle,
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
  Scale,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Coins,
  Compass,
  DollarSign,
  PieChart,
  Clock,
  Boxes,
  PackageCheck,
  ArrowUpRight,
  Info,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

export default function FormacaoPreco() {
  const [activeSegmentTab, setActiveSegmentTab] = useState<'industria' | 'comercio' | 'servicos'>(
    'industria',
  )
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20a%20Forma%C3%A7%C3%A3o%20de%20Pre%C3%A7o%20para%20Vendas%20da%20minha%20empresa.'

  // 4 Pilares Conceituais Transversais
  const transversalConcepts = [
    {
      icon: Percent,
      badge: 'Conceito Fundamental #1',
      title: 'Markup vs. Margem de Lucro: O Erro Clássico',
      desc: 'Markup é o percentual aplicado sobre o custo direto para definir o preço de venda. Já a margem de lucro é a fatia do preço final que realmente sobra como resultado. Se um produto custa R$ 70,00 e você o vende por R$ 100,00, seu markup sobre o custo foi de 42,86%, mas sua margem de lucro sobre a venda é de 30,00%. Confundir essas duas contas é o caminho mais rápido para operar no prejuízo acreditando ter lucro.',
    },
    {
      icon: DollarSign,
      badge: 'Conceito Fundamental #2',
      title: 'Margem de Contribuição Real',
      desc: 'Margem de contribuição é o valor que sobra de cada venda após pagar todos os custos e despesas variáveis diretas — matéria-prima, compras de mercadoria, comissões de vendedores e impostos da nota fiscal. É exatamente esse saldo que paga as despesas fixas do mês (aluguel, salários e luz) e constrói o lucro líquido real dos sócios.',
    },
    {
      icon: Calculator,
      badge: 'Conceito Fundamental #3',
      title: 'Ponto de Equilíbrio Operacional (Break-even)',
      desc: 'Ponto de equilíbrio (break-even) é o volume exato de faturamento que sua empresa precisa atingir para zerar as contas do mês: cobrir 100% dos custos variáveis e todas as despesas fixas. Abaixo desse ponto, a operação fecha no vermelho. Acima dele, cada nova unidade vendida passa a gerar lucro direto para o caixa.',
    },
    {
      icon: Scale,
      badge: 'Conceito Fundamental #4',
      title: 'Custos Fixos vs. Variáveis & Reforma Tributária',
      desc: 'Custo variável é o que oscila proporcionalmente às vendas (insumos, comissões e tributos diretos). Custo fixo vence faça chuva ou faça sol (aluguel, pró-labore e folha básica). Com a Reforma Tributária (IBS e CBS com modelo de crédito amplo), os tributos passam a ser calculados "por fora", exigindo revisão técnica dos preços para proteger a competitividade da empresa.',
    },
  ]

  // Os 5 Erros Clássicos de Precificação
  const pricingMistakes = [
    {
      title: 'Copiar cegamente a tabela do concorrente',
      desc: 'Seu concorrente pode ter poder de compra maior, galpão próprio sem aluguel, dívidas bancárias já quitadas ou até estar à beira da insolvência, queimando preços sem margem apenas para pagar a folha de hoje.',
      solution:
        'Conhecer e calcular a estrutura real de custos da sua própria operação antes de balizar com o mercado.',
    },
    {
      title: 'Confundir faturamento com lucro (o engano do markup)',
      desc: 'Planejar uma margem de 20% no papel, mas somar 20% de markup simples sobre o custo de compra, esquecendo que impostos sobre faturamento, comissões e taxas de cartão incidem sobre o valor total da nota fiscal.',
      solution:
        'Adotar a fórmula do markup divisor, que projeta o preço líquido final garantindo a cobertura total das deduções.',
    },
    {
      title: 'Desconsiderar perdas, refugos e ociosidade da equipe',
      desc: 'Na indústria, materiais perdidos no corte e máquinas paradas geram custo silencioso. Nos serviços, horas não faturadas (férias, treinamentos e intervalos entre contratos) continuam gerando folha de pagamento.',
      solution:
        'Incorporar o índice de perdas técnicas e a taxa de utilização produtiva no cálculo do custo-base.',
    },
    {
      title: 'Não prever o impacto do capital de giro nos prazos concedidos',
      desc: 'Parcelar vendas em várias parcelas sem juros sem considerar o custo do dinheiro no tempo. Quando o fornecedor cobra em 30 dias e o cliente paga em 120 ou 180 dias, a empresa recorre a empréstimos bancários caros para fechar o caixa.',
      solution:
        'Precificar de acordo com o prazo médio de recebimento e a necessidade real de capital de giro (NCG).',
    },
    {
      title: 'Ignorar o impacto da transição para a Reforma Tributária (IBS/CBS)',
      desc: 'Tratar tributos como alíquotas estáticas sem acompanhar as novas regras de aproveitamento de crédito integral do IBS e da CBS. Quem não auditar os créditos tributários de entrada ficará com preços defasados e sem margem.',
      solution:
        'Revisar continuamente o cálculo tributário com a consultoria especializada da Borlim.',
    },
  ]

  // Passos de Trabalho Borlim em Formação de Preço
  const pricingSteps = [
    {
      step: '01',
      title: 'Diagnóstico dos 48 Indicadores & Raio-X de Custos',
      desc: 'Mapeamento detalhado dos custos diretos, despesas fixas, prazos médios de recebimento e fôlego de capital de giro na contabilidade e na rotina da sua empresa.',
    },
    {
      step: '02',
      title: 'Segregação Estrutural: Custos Fixos, Variáveis e Tributos',
      desc: 'Separação cirúrgica entre o que varia estritamente com as vendas e a estrutura fixa do negócio, simulando a tributação atual e a transição para o modelo IBS/CBS.',
    },
    {
      step: '03',
      title: 'Modelagem dos Simuladores por Segmento & Markup Seguro',
      desc: 'Construção de planilha e simulador sob medida para sua realidade: Indústria com CIF e refugos; Comércio com CMV e giro; Serviços com homem-hora e taxa de ocupação.',
    },
    {
      step: '04',
      title: 'Integração com DRE Gerencial, Metas e Acompanhamento',
      desc: 'Conexão direta com o Planejamento Econômico (foco no lucro mensal), teste de insolvência em 12 meses e capacitação prática da equipe comercial para defender margens.',
    },
  ]

  // FAQs específicos de Formação de Preço
  const pricingFaqs = [
    {
      q: 'Qual é a diferença exata entre Markup e Margem de Lucro e por que esse erro quebra empresas?',
      a: 'O markup é o fator de acréscimo aplicado SOBRE O CUSTO para formar o preço de venda. Já a margem de lucro é a porcentagem SOBRE O PREÇO DE VENDA que efetivamente sobra no caixa. Imagine um produto com custo direto de R$ 100,00 no qual você deseja 20% de margem líquida, pagando 15% entre impostos e comissões. Se você apenas somar 35% ao custo e vender a R$ 135,00, os 15% de tributos e encargos sobre a nota total descontarão R$ 20,25. Sobram R$ 114,75. Abatendo o custo de R$ 100,00, seu lucro real será de R$ 14,75 — uma margem de 10,93%, praticamente metade do planejado! O método correto exige a fórmula do markup divisor: Preço = Custo / [1 - (Impostos% + Margem Desejada%)], resultando em R$ 100,00 / (1 - 0,35) = R$ 153,85. Essa divergência matemática é uma das maiores causas de sangria de caixa que a Borlim identifica e corrige nas empresas.',
    },
    {
      q: 'Como a formação de preço varia entre Indústria, Comércio e Serviços na metodologia da Borlim?',
      a: 'Cada segmento econômico possui geradores de custo específicos. Na INDÚSTRIA, o ponto de partida é o Custo de Produção: matérias-primas, mão de obra fabril direta (MOD), custos indiretos de fabricação (CIF) rateados por máquina, energia e índice de perdas técnicas (refugos). No COMÉRCIO, o núcleo é o Custo das Mercadorias Vendidas (CMV), fretes de entrada (FOB), créditos tributários recuperáveis na compra, tempo de estocagem (giro de estoque que consome capital de giro) e taxas de cartão e antecipação de recebíveis. Nos SERVIÇOS, a base é o custo do homem-hora, a taxa de utilização produtiva da equipe técnica (descontando ociosidade, férias e prospecção) e a proteção de escopo contratual contra horas extras não faturadas. A Borlim constrói simuladores personalizados para o modelo de operação do seu negócio.',
    },
    {
      q: 'Como a Formação de Preço se conecta com o Planejamento Econômico da Borlim?',
      a: 'Eles atuam de forma totalmente integrada. O objetivo central do Planejamento Econômico é melhorar o lucro mensal da empresa e estruturar a DRE gerencial (Demonstração do Resultado do Exercício). No entanto, nenhuma DRE fecha no azul de forma duradoura se os preços dos produtos ou serviços forem calculados sem critério técnico. A Formação de Preço assegura que cada venda entregue a margem de contribuição prevista. Quando a equipe comercial vende com preços ajustados, a empresa alcança o ponto de equilíbrio operacional mais cedo no mês, gerando lucro consistente e protegendo o caixa.',
    },
    {
      q: 'O que é Margem de Contribuição e como ela define se um produto deve continuar em linha?',
      a: 'A Margem de Contribuição é obtida subtraindo do preço de venda líquido todos os custos e despesas variáveis diretas do item. Ela indica exatamente quantos reais cada unidade vendida coloca no caixa para amortizar as contas fixas da empresa (aluguel, salários administrativos e despesas gerais) e gerar o lucro final. Se um produto opera com margem de contribuição negativa, cada nova venda amplia o prejuízo. Por outro lado, produtos com margem de contribuição saudável fortalecem a estrutura do negócio. A Borlim analisa a margem item a item, orientando quais linhas devem ser promovidas, quais exigem repactuação e quais devem ser descontinuadas.',
    },
    {
      q: 'Como a Reforma Tributária (IBS e CBS) afetará os preços dos meus produtos e serviços?',
      a: 'A Reforma Tributária substitui cinco tributos tradicionais (PIS, COFINS, IPI, ICMS e ISS) pelo modelo de IVA Dual, composto pelo IBS (estados e municípios) e pela CBS (União), instituindo o princípio do crédito amplo e a tributação no destino da mercadoria ou serviço. No regime anterior, impostos calculados "por dentro" geravam bitributação e cálculos complexos. No novo sistema, as aquisições de insumos geram crédito integral e a cobrança é feita "por fora". Indústrias e comércios se beneficiam de cadeias de crédito desoneradas. Já as empresas prestadoras de serviços — cuja maior despesa é a folha de pagamento, que não gera crédito tributário — necessitam de recalibração cuidadosa nas margens para manter a rentabilidade líquida. A Borlim prepara a estrutura de preços do seu negócio com simulações preventivas para essa transição.',
    },
    {
      q: 'E se o preço calculado tecnicamente ficar acima do que o meu concorrente pratica?',
      a: 'Esse é o momento em que a consultoria econômica da Borlim se mostra decisiva. Se o preço técnico ficou superior ao do mercado, não recomendamos um corte impulsivo de margem que comprometa o caixa da sua empresa. Nossa equipe audita a cadeia de custos para encontrar ineficiências: renegociação com fornecedores, combate a perdas de processo, aceleração do giro de estoques lentos ou redução de despesas fixas desproporcionais. Simultaneamente, aplicamos conceitos do Balanced Scorecard para fortalecer diferenciais competitivos (pontualidade de entrega, qualidade técnica, assistência e confiabilidade), permitindo que seu cliente decida pelo valor percebido, e não exclusivamente pelo menor preço.',
    },
    {
      q: 'Como a Borlim avalia se o preço praticado cobre o fôlego de Capital de Giro?',
      a: 'Por meio do diagnóstico dos nossos 48 indicadores financeiros e do teste preventivo de insolvência em 12 meses. Quando sua empresa concede prazos elásticos aos clientes (como 60, 90 ou 120 dias) e precisa pagar fornecedores à vista ou em 30 dias, surge uma Necessidade de Capital de Giro (NCG) que consome recursos bancários a juros elevados. Esse custo financeiro do tempo e do carregamento de estoques precisa estar embutido no preço de venda a prazo. Sem essa disciplina, a empresa aumenta as vendas e pode enfrentar falta crítica de liquidez.',
    },
    {
      q: 'Como posso contratar o trabalho de Formação de Preço para Vendas da Borlim?',
      a: 'O investimento e o escopo variam conforme o porte da empresa, o número de filiais ou linhas de produto e a complexidade operacional do segmento — seja Indústria, Comércio ou Serviços. Para receber uma proposta técnica sob medida, fale diretamente com o economista Flávio Bordignon pelo WhatsApp (17) 99765-0672 ou pelo e-mail flavio@borlim.com.br. Realizamos uma primeira conversa diagnóstica para entender sua estrutura atual de custos e propor um plano de implantação sob medida.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. HERO INSTITUCIONAL (Fintech Pricing Engine Architecture) */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-[450px] h-[450px] bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-28 -left-28 w-[450px] h-[450px] bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Breadcrumb */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <Tag className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Especialidade Estratégica — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Formação de Preço para Vendas
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              Indústria, Comércio e Serviços: precificação técnica para maximizar a margem de
              contribuição, cobrir os custos fixos e garantir o lucro mensal real da sua empresa.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Na <strong>BORLIM Consultoria Empresarial</strong>, tratamos a formação de preço de
              empresário para empresário, sem fórmulas prontas e sem achismos. Cada setor da
              economia possui uma dinâmica de custos própria: a <strong>Indústria</strong> depende
              do custo de produção, mão de obra fabril, custos indiretos de fabricação (CIF) e
              controle de refugos; o <strong>Comércio</strong> é pautado pelo Custo das Mercadorias
              Vendidas (CMV), pelo giro de estoque e pelo fôlego do capital de giro; e os{' '}
              <strong>Serviços</strong> exigem a apuração exata do homem-hora, da taxa de ocupação
              da equipe e do rateio da estrutura fixa sobre as horas efetivamente faturadas.
            </p>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-3xl">
              Integrada aos nossos <strong>48 indicadores de desempenho financeiro</strong>, ao{' '}
              <strong>Planejamento Econômico (foco na melhoria do lucro mensal)</strong> e ao teste
              preventivo de insolvência em 12 meses, a precificação técnica elimina a confusão
              clássica entre markup e margem de lucro, prepara o seu negócio para a{' '}
              <strong>Reforma Tributária (IBS e CBS)</strong> e garante que cada venda coloque
              dinheiro limpo no caixa da empresa.
            </p>

            {/* CTAs Oficiais do Hero */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-2xl border border-[#22C55E]/40 hover:scale-[1.02] active:scale-[0.99] group relative overflow-hidden"
                title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                to="/planejamento"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Compass className="w-4 h-4 text-emerald-300" />
                <span>Ver também: Planejamento Econômico</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITAÇÃO CENTRAL & POSICIONAMENTO TÉCNICO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                  Princípio Estratégico Borlim
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#082852] leading-snug">
                “Faturamento é vaidade, lucro é sanidade, mas margem de contribuição no preço certo
                é o que mantém a empresa viva e em crescimento.”
              </blockquote>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Vender mais sem conhecer a margem unitária de cada produto, mercadoria ou serviço é
                o caminho mais rápido para asfixiar o caixa. A BORLIM implanta na sua empresa a
                disciplina técnica da formação de preço: segregação rigorosa entre custos fixos e
                variáveis, aplicação do markup divisor, cálculo do ponto de equilíbrio por linha e
                adequação aos créditos da Reforma Tributária. De empresário para empresário,
                colocamos fim aos preços calculados por intuição ou cópia da concorrência.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#E5EDF5]/70 p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
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

      {/* 3. CONCEITOS TRANSVERSAIS DE FORMAÇÃO DE PREÇO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Fundamentos Universais de Pricing
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Os 4 Pilares Conceituais da Formação de Preço
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Antes de mergulhar na especificidade de cada segmento, estes são os conceitos econômicos
            que todo empresário, diretor ou gestor comercial precisa dominar para não perder
            dinheiro na mesa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transversalConcepts.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] mb-3 border border-emerald-200">
                    {pillar.badge}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#082852] mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Caixinha Didática: A Fórmula do Markup Divisor */}
        <div className="mt-10 p-6 sm:p-8 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/80 border border-emerald-200 rounded-2xl shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#16A34A]" />
                Regra de Ouro do Empresário: A Fórmula do Markup Divisor
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#082852]">
                Preço de Venda = Custo Direto / [1 - (% Impostos + % Comissões + % Despesas
                Variáveis + % Margem de Lucro Desejada)]
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Ao utilizar a divisão no lugar da soma simples, você assegura matematicamente que
                todos os encargos incidentes sobre o valor bruto da nota fiscal (tributos sobre
                faturamento, comissões comerciais e tarifas de cartão) sejam integralmente
                absorvidos, sem corroer a sua margem de lucro líquido planejada.
              </p>
            </div>
            <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-stone-200 text-center font-mono">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
                Exemplo Numérico Real
              </span>
              <p className="text-xs text-slate-700">Custo = R$ 100,00 | Deduções e Margem = 40%</p>
              <p className="text-base font-bold text-[#15803D] mt-1">
                Preço = 100 / (1 - 0,40) = R$ 166,67
              </p>
              <p className="text-[11px] text-slate-500 mt-1 italic">
                (Se somasse 40%, venderia a R$ 140 e teria prejuízo disfarçado)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OS TRÊS SEGMENTOS: INDÚSTRIA, COMÉRCIO E SERVIÇOS (TABS INTERATIVAS COM EXEMPLOS NUMÉRICOS) */}
      <section className="bg-white py-16 sm:py-24 border-y border-stone-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Metodologia por Setor de Atuação
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Como Funciona a Formação de Preço em Cada Segmento
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Clique em cada segmento para conferir os conceitos específicos de custo, os desafios
              de precificação e uma simulação numérica didática completa estruturada pela BORLIM.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={() => setActiveSegmentTab('industria')}
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xs ${
                activeSegmentTab === 'industria'
                  ? 'bg-[#082852] text-white border-2 border-[#16A34A] shadow-md'
                  : 'bg-[#E5EDF5]/70 text-[#082852] border border-stone-300 hover:bg-stone-200/80'
              }`}
            >
              <Factory
                className={`w-4 h-4 ${activeSegmentTab === 'industria' ? 'text-[#22C55E]' : ''}`}
              />
              <span>1. Indústria (Manufatura)</span>
            </button>

            <button
              onClick={() => setActiveSegmentTab('comercio')}
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xs ${
                activeSegmentTab === 'comercio'
                  ? 'bg-[#082852] text-white border-2 border-[#16A34A] shadow-md'
                  : 'bg-[#E5EDF5]/70 text-[#082852] border border-stone-300 hover:bg-stone-200/80'
              }`}
            >
              <Store
                className={`w-4 h-4 ${activeSegmentTab === 'comercio' ? 'text-[#22C55E]' : ''}`}
              />
              <span>2. Comércio (Varejo & Atacado)</span>
            </button>

            <button
              onClick={() => setActiveSegmentTab('servicos')}
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xs ${
                activeSegmentTab === 'servicos'
                  ? 'bg-[#082852] text-white border-2 border-[#16A34A] shadow-md'
                  : 'bg-[#E5EDF5]/70 text-[#082852] border border-stone-300 hover:bg-stone-200/80'
              }`}
            >
              <Briefcase
                className={`w-4 h-4 ${activeSegmentTab === 'servicos' ? 'text-[#22C55E]' : ''}`}
              />
              <span>3. Serviços (Empresas & Projetos)</span>
            </button>
          </div>

          {/* TAB 1: INDÚSTRIA */}
          {activeSegmentTab === 'industria' && (
            <div className="bg-[#F0F4F8] p-6 sm:p-10 rounded-3xl border border-stone-300 shadow-sm animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shadow-xs">
                      <Factory className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                        Segmento Industrial
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852]">
                        Formação de Preço na Indústria
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                    Na indústria, o produto é transformado a partir de matérias-primas e
                    componentes, consumindo mão de obra direta (MOD), energia e tempo de máquinas. O
                    cálculo do preço fabril exige o domínio do <strong>Custo de Produção</strong> e
                    a separação clara entre o <strong>custeio por absorção</strong> (modelo exigido
                    pela contabilidade fiscal) e o <strong>custeio variável</strong> (ferramenta
                    gerencial recomendada pela Borlim para apurar a margem de contribuição real e
                    definir estratégias comerciais).
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-serif text-base font-bold text-[#082852]">
                      Conceitos Fundamentais do Chão de Fábrica:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Matéria-Prima & Insumos Diretos
                        </strong>
                        Materiais que entram diretamente na composição do produto (como aço,
                        polímeros e embalagens), apurados pelo custo líquido de créditos
                        recuperáveis (IPI, ICMS e futura CBS/IBS).
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Mão de Obra Direta (MOD)
                        </strong>
                        Salários, encargos sociais e trabalhistas (INSS, FGTS, férias, 13º e
                        provisões) e benefícios dos operadores que atuam diretamente na linha de
                        transformação.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Custos Indiretos de Fabricação (CIF)
                        </strong>
                        Gastos indispensáveis à planta que não entram em uma única peça de forma
                        direta: energia elétrica fabril, manutenção de equipamentos, supervisão
                        técnica, depreciação de máquinas e aluguel do galpão.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Perdas Técnicas, Cavacos & Refugos
                        </strong>
                        Sobras inevitáveis de usinagem, corte ou estampagem. Se 4% da matéria-prima
                        é descartada no processo produtivo, esse percentual precisa compor a ficha
                        técnica do produto em vez de virar prejuízo oculto.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs sm:text-sm text-slate-700">
                    <h5 className="font-serif font-bold text-[#15803D] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      Escala e Ponto de Equilíbrio Fabril:
                    </h5>
                    <p>
                      Quanto mais a fábrica produz com eficiência, menor é o peso dos Custos
                      Indiretos de Fabricação (CIF) sobre cada unidade. A Borlim calcula com
                      precisão a <strong>capacidade instalada</strong> e o lote mínimo de produção
                      para que a sua planta fabril nunca opere abaixo do ponto de equilíbrio
                      econômico.
                    </p>
                  </div>
                </div>

                {/* Exemplo Numérico da Indústria */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-300 shadow-md space-y-4 font-sans">
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                        Exemplo Didático Ilustrativo
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#082852]">
                        Indústria Metalúrgica Fictícia
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-100 text-[#082852] text-[11px] font-mono font-bold">
                      Peça Estampada A-100
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    Valores simulados para demonstração do método técnico de precificação Borlim:
                  </p>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) Matéria-Prima (Chapa de Aço líq.)</span>
                      <span className="font-semibold text-slate-800">R$ 42,00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) Mão de Obra Direta (0,25 h/peça)</span>
                      <span className="font-semibold text-slate-800">R$ 15,00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) Refugo Técnico Estimado (4%)</span>
                      <span className="font-semibold text-slate-800">R$ 2,28</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) CIF Variável (Energia / Lubrif.)</span>
                      <span className="font-semibold text-slate-800">R$ 5,72</span>
                    </div>
                    <div className="flex justify-between py-1.5 bg-slate-100 px-2 rounded font-bold text-[#082852]">
                      <span>(=) Custo Variável Industrial Total</span>
                      <span>R$ 65,00</span>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-600 font-sans space-y-1">
                      <p className="font-mono text-[11px] text-[#082852] font-semibold">
                        Deduções sobre Preço de Venda (Nota Fiscal):
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Impostos sobre Venda (CBS/IBS líq.)</span>
                        <span>14,0%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Comissões Representantes Comerciais</span>
                        <span>4,0%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Frete de Entrega & Despesas Variáveis</span>
                        <span>3,0%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Margem de Contribuição Desejada (MC)</span>
                        <span>25,0%</span>
                      </p>
                      <p className="flex justify-between font-mono font-bold text-[#15803D] pt-1 border-t border-slate-200">
                        <span>Soma das Alíquotas Deduções + MC</span>
                        <span>46,0%</span>
                      </p>
                    </div>

                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1 text-center">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803D] font-bold block">
                        Aplicação do Markup Divisor Borlim
                      </span>
                      <p className="text-xs text-slate-700 font-mono">
                        Preço = R$ 65,00 / (1 - 0,46) = R$ 65,00 / 0,54
                      </p>
                      <p className="text-xl font-mono font-bold text-[#15803D]">
                        Preço de Venda = R$ 120,37
                      </p>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Cada peça vendida gera exatamente{' '}
                        <strong>R$ 30,09 de Margem de Contribuição</strong> para cobrir os custos
                        fixos da fábrica e gerar o lucro mensal da metalúrgica.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMÉRCIO */}
          {activeSegmentTab === 'comercio' && (
            <div className="bg-[#F0F4F8] p-6 sm:p-10 rounded-3xl border border-stone-300 shadow-sm animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shadow-xs">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                        Segmento Comercial
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852]">
                        Formação de Preço no Comércio
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                    No comércio (lojas físicas, e-commerce, distribuidores ou atacados), a empresa
                    adquire mercadorias prontas para revenda. A chave da rentabilidade comercial
                    está na apuração precisa do{' '}
                    <strong>CMV (Custo das Mercadorias Vendidas)</strong>, no frete de transporte
                    (frete FOB), no aproveitamento integral de créditos fiscais e, acima de tudo, na
                    velocidade do <strong>giro de estoque</strong>: produto parado na prateleira é
                    capital de giro imobilizado que consome juros bancários e corrói a margem
                    líquida da empresa.
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-serif text-base font-bold text-[#082852]">
                      Conceitos Fundamentais do Varejo e Atacado:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • CMV Líquido (Custo de Aquisição)
                        </strong>
                        Preço cobrado pelo fornecedor somado ao frete de entrada (FOB), seguros e
                        taxas, subtraindo todos os créditos tributários recuperáveis (ICMS,
                        PIS/COFINS e nova CBS/IBS).
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Giro de Estoque & Custo do Capital Parado
                        </strong>
                        Um item que demora 180 dias para girar custa muito mais caro em
                        financiamento de capital de giro do que aquele que roda em 15 dias. O preço
                        deve compensar a velocidade de venda de cada linha.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Margem Bruta Comercial
                        </strong>
                        Diferença entre o faturamento líquido de impostos e o CMV. É o indicador
                        essencial acompanhado nos 48 indicadores da Borlim para monitorar o poder de
                        compra da sua empresa.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Escalas de Volume & Preço Diferenciado
                        </strong>
                        Políticas de preços para vendas em quantidade (atacarejo e atacado),
                        desenhadas de modo que o ganho em escala compense com folga o desconto
                        percentual concedido na unidade.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs sm:text-sm text-slate-700">
                    <h5 className="font-serif font-bold text-[#15803D] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      O Impacto Oculto das Taxas de Cartão e Antecipação:
                    </h5>
                    <p>
                      Muitos lojistas formam o preço pensando no recebimento à vista, mas vendem a
                      prazo sem juros no cartão de crédito. Tarifas de maquininha e custos de
                      antecipação de recebíveis chegam a consumir até 8% da receita bruta. Na
                      consultoria da Borlim, o markup comercial embute o custo financeiro ponderado
                      dos meios de pagamento para blindar o fluxo de caixa.
                    </p>
                  </div>
                </div>

                {/* Exemplo Numérico do Comércio */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-300 shadow-md space-y-4 font-sans">
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                        Exemplo Didático Ilustrativo
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#082852]">
                        Comércio Varejista Fictício
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-100 text-[#082852] text-[11px] font-mono font-bold">
                      Linha de Ferramentas Elétricas
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    Valores simulados para demonstração do método técnico de precificação Borlim:
                  </p>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) Preço de Compra Fornecedor</span>
                      <span className="font-semibold text-slate-800">R$ 200,00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) Frete de Entrada (FOB) + Seguro</span>
                      <span className="font-semibold text-slate-800">R$ 14,00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">
                        (-) Crédito Tributário Recuperado na Entrada
                      </span>
                      <span className="font-semibold text-emerald-700">- R$ 24,00</span>
                    </div>
                    <div className="flex justify-between py-1.5 bg-slate-100 px-2 rounded font-bold text-[#082852]">
                      <span>(=) Custo da Mercadoria Vendida (CMV Líquido)</span>
                      <span>R$ 190,00</span>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-600 font-sans space-y-1">
                      <p className="font-mono text-[11px] text-[#082852] font-semibold">
                        Deduções Comerciais sobre Venda no Caixa:
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Simples Nacional / Tributos de Saída</span>
                        <span>10,0%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Taxa Média Cartão de Crédito / Antecipação</span>
                        <span>4,5%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Comissão da Equipe de Vendas</span>
                        <span>3,5%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Margem de Contribuição Desejada (MC)</span>
                        <span>22,0%</span>
                      </p>
                      <p className="flex justify-between font-mono font-bold text-[#15803D] pt-1 border-t border-slate-200">
                        <span>Soma Deduções + Margem Desejada</span>
                        <span>40,0%</span>
                      </p>
                    </div>

                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1 text-center">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803D] font-bold block">
                        Aplicação do Markup Divisor Borlim
                      </span>
                      <p className="text-xs text-slate-700 font-mono">
                        Preço = R$ 190,00 / (1 - 0,40) = R$ 190,00 / 0,60
                      </p>
                      <p className="text-xl font-mono font-bold text-[#15803D]">
                        Preço de Venda na Loja = R$ 316,67
                      </p>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Cada venda entrega{' '}
                        <strong>R$ 69,67 de Margem de Contribuição líquida</strong> para bancar o
                        aluguel do ponto comercial, salários fixos e o lucro do lojista.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVIÇOS */}
          {activeSegmentTab === 'servicos' && (
            <div className="bg-[#F0F4F8] p-6 sm:p-10 rounded-3xl border border-stone-300 shadow-sm animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shadow-xs">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                        Segmento de Serviços
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852]">
                        Formação de Preço em Serviços
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                    No setor de serviços (empresas de tecnologia, engenharia, consultoria, agências,
                    clínicas, transporte e manutenção), o produto é o tempo produtivo e o
                    conhecimento da equipe. A precificação de serviços exige a apuração rigorosa do
                    custo do <strong>homem-hora</strong> (custo da hora de trabalho por
                    especialista), a medição da <strong>taxa de utilização produtiva</strong>{' '}
                    (relação entre horas faturadas a clientes e horas totais pagas na folha) e o
                    controle firme contra alterações não remuneradas de contrato (o desvio de
                    escopo, ou <em>scope creep</em>).
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-serif text-base font-bold text-[#082852]">
                      Conceitos Fundamentais da Prestação de Serviços:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Custo Real do Homem-Hora
                        </strong>
                        Salário bruto somado a encargos trabalhistas (INSS, FGTS, provisões de
                        férias e 13º), benefícios, alimentação, equipamentos e treinamentos,
                        dividido pelas horas efetivas de dedicação ao negócio.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Taxa de Utilização da Equipe Técnica
                        </strong>
                        Nenhum colaborador fatura 100% da sua jornada (160h a 176h/mês) para
                        clientes. Há reuniões internas, alinhamentos, prospecção e intervalos entre
                        projetos. Se a ocupação é de 75%, o custo da hora faturada precisa ser
                        calibrado para essa realidade.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Rateio da Estrutura Fixa por Hora
                        </strong>
                        Licenças de softwares especializados, despesas com escritório, suporte
                        jurídico, administrativo e vendas precisam ser absorvidos proporcionalmente
                        pelas horas produtivas estimadas para o período.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Projeto Fechado vs. Remuneração por Hora
                        </strong>
                        Vender projetos com preço fechado transfere todo o risco de prazo e
                        retrabalho para a empresa prestadora. Sem cláusulas contratuais de aditivo
                        de escopo, um projeto consome o dobro das horas previstas e fecha no
                        vermelho.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs sm:text-sm text-slate-700">
                    <h5 className="font-serif font-bold text-[#15803D] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      Atenção Redobrada na Reforma Tributária para Prestadores de Serviços:
                    </h5>
                    <p>
                      Com a substituição do ISS pelo IBS e do PIS/COFINS pela CBS, o segmento de
                      serviços — cuja estrutura de custos é intensiva em mão de obra (folha de
                      pagamento que não gera créditos tributários de IBS/CBS) — precisa de
                      simulações antecipadas para readequar o preço e proteger sua lucratividade
                      líquida. A Borlim conduz essas simulações com base técnica segura.
                    </p>
                  </div>
                </div>

                {/* Exemplo Numérico de Serviços */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-300 shadow-md space-y-4 font-sans">
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                        Exemplo Didático Ilustrativo
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#082852]">
                        Empresa de Serviços / TI Fictícia
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-100 text-[#082852] text-[11px] font-mono font-bold">
                      Projeto Fechado (80 Horas)
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    Valores simulados para demonstração do método técnico de precificação Borlim:
                  </p>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) Salário Técnico + Encargos (160h)</span>
                      <span className="font-semibold text-slate-800">R$ 9.600,00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">
                        (+) Custo Nominal Hora (R$ 9.600 / 160h)
                      </span>
                      <span className="font-semibold text-slate-800">R$ 60,00 / hora</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) Ajuste Utilização Produtiva (75%)</span>
                      <span className="font-semibold text-slate-800">R$ 80,00 / hora real</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">(+) Custo Direto da Equipe (80 horas)</span>
                      <span className="font-semibold text-slate-800">R$ 6.400,00</span>
                    </div>
                    <div className="flex justify-between py-1.5 bg-slate-100 px-2 rounded font-bold text-[#082852]">
                      <span>(=) Custo Direto Total do Projeto</span>
                      <span>R$ 6.400,00</span>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-600 font-sans space-y-1">
                      <p className="font-mono text-[11px] text-[#082852] font-semibold">
                        Deduções e Margem Alvo do Projeto:
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Impostos sobre Serviços (ISS / CBS / IBS)</span>
                        <span>12,0%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Comissão Comercial / Suporte Contratual</span>
                        <span>5,0%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Reserva para Escopo Extra (Contingência)</span>
                        <span>5,0%</span>
                      </p>
                      <p className="flex justify-between font-mono">
                        <span>• Margem de Lucro / Contribuição Alvo</span>
                        <span>28,0%</span>
                      </p>
                      <p className="flex justify-between font-mono font-bold text-[#15803D] pt-1 border-t border-slate-200">
                        <span>Soma Deduções + Margem Desejada</span>
                        <span>50,0%</span>
                      </p>
                    </div>

                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1 text-center">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803D] font-bold block">
                        Aplicação do Markup Divisor Borlim
                      </span>
                      <p className="text-xs text-slate-700 font-mono">
                        Preço = R$ 6.400,00 / (1 - 0,50) = R$ 6.400,00 / 0,50
                      </p>
                      <p className="text-xl font-mono font-bold text-[#15803D]">
                        Proposta Comercial = R$ 12.800,00
                      </p>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Preço por hora vendida = <strong>R$ 160,00/hora</strong>, garantindo{' '}
                        <strong>R$ 3.584,00 de lucro líquido</strong> após todos os custos, tributos
                        e contingências.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. OS 5 ERROS CLÁSSICOS DE PRECIFICAÇÃO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Auditoria Preventiva de Riscos
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Os 5 Erros Clássicos de Precificação no Brasil
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Armadilhas contábeis e comerciais recorrentes que levam empresas lucrativas no papel a
            enfrentarem crises graves de liquidez bancária.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingMistakes.map((mistake, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#16A34A] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold font-mono text-sm">
                    0{idx + 1}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    Erro Recorrente
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#082852] leading-snug">
                  {mistake.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {mistake.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-700 font-sans space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                  Como a Borlim Resolve:
                </span>
                <p className="text-slate-600">{mistake.solution}</p>
              </div>
            </div>
          ))}

          {/* Card Resumo / Chamada */}
          <div className="p-6 bg-[#082852] text-white rounded-2xl border border-[#0B3B7A] shadow-md flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Sua empresa comete algum desses erros hoje?
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Nossos 48 indicadores financeiros e a análise de solvência em 12 meses identificam
                imediatamente onde a sua tabela de preços está vazando dinheiro.
              </p>
            </div>

            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Solicitar Auditoria de Preços</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SINERGIA ENTRE FORMAÇÃO DE PREÇO E O PLANEJAMENTO ECONÔMICO DA BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-[#082852] via-[#0B3B7A] to-[#082852] text-white p-8 sm:p-12 rounded-3xl border border-[#0B3B7A] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16A34A]/20 border border-[#16A34A]/40 text-[#22C55E]">
                <Compass className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold">
                  Sinergia Estratégica Borlim
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Formação de Preço & Planejamento Econômico: A Dupla Que Garante o Lucro Mensal Real
              </h3>
              <p className="text-sm text-slate-200 font-sans leading-relaxed">
                Na metodologia da BORLIM Consultoria, a formação de preço não é um exercício isolado
                de planilha: ela se integra diretamente ao <strong>Planejamento Econômico</strong>{' '}
                (focado em melhorar o lucro mensal e estruturar a DRE gerencial), ao{' '}
                <strong>Planejamento Financeiro</strong> (responsável por equilibrar o capital de
                giro e os prazos concedidos a clientes) e ao <strong>Balanced Scorecard</strong>{' '}
                (que assegura agilidade comercial para que nenhum negócio seja perdido para a
                concorrência).
              </p>
              <p className="text-sm text-slate-200 font-sans leading-relaxed">
                Quando cada item fabricado na sua <strong>Indústria</strong>, cada mercadoria
                revendida no seu <strong>Comércio</strong> ou cada hora prestada na sua empresa de{' '}
                <strong>Serviços</strong> é precificada com base técnica, o ponto de equilíbrio
                operacional é alcançado com menor esforço de vendas, a empresa afasta o risco de
                insolvência imediata e em 12 meses, e o <strong>Valuation</strong> do seu negócio se
                consolida em patamares muito mais altos.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                to="/planejamento"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group border border-[#22C55E]/40"
              >
                <Compass className="w-4 h-4" />
                <span>Conhecer Planejamento Econômico</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/valuation"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider rounded-lg transition-all border border-white/20"
              >
                <Coins className="w-4 h-4 text-emerald-300" />
                <span>Ver também: Valuation de Empresas</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. O FLUXO DE TRABALHO DA BORLIM (4 ETAPAS) */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-y border-[#0B3B7A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
              Metodologia Conduzida Passo a Passo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
              Como Funciona a Consultoria de Formação de Preço
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans leading-relaxed">
              Trabalho consultivo ágil, transparente e de aplicação imediata na sua tabela de vendas
              e no sistema gerencial da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingSteps.map((step, idx) => (
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
              <span>Solicitar Implantação de Formação de Preço para Minha Empresa</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. FAQ INTERATIVO - PERGUNTAS FREQUENTES */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Tira-Dúvidas de Empresário para Empresário
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre Formação de Preço para Vendas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Respostas diretas e fundamentadas sobre markup, margem de contribuição, Reforma
              Tributária e a realidade dos negócios no Brasil.
            </p>
          </div>

          <div className="space-y-4">
            {pricingFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4.5 bg-[#E5EDF5]/50 hover:bg-stone-100 flex items-center justify-between gap-4 transition-colors"
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

      {/* 9. CONTATO & CTA INSTITUCIONAL FINAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Atendimento Técnico & Diagnóstico Prévio
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Coloque a sua empresa no caminho da lucratividade sustentável com a BORLIM
                Consultoria.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Fale diretamente com o nosso economista e tire suas dúvidas sobre a precificação da
                sua indústria, comércio ou prestadora de serviços. Conecte sua tabela de preços aos
                48 indicadores de desempenho, ao teste preventivo de insolvência em 12 meses e ao
                Planejamento Econômico focado na melhoria do lucro mensal.
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
              <div className="bg-white p-4 rounded-2xl border border-white/20 shadow-lg mb-4 w-full max-w-[260px] flex items-center justify-center">
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
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-[#082852] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Falar com o Especialista</span>
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
