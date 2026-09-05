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
      desc: 'Muitos empresários somam 30% sobre o custo achando que estão operando com 30% de margem. Se um produto custa R$ 70 e você vende a R$ 100, seu markup sobre o custo foi de 42,86%, mas sua margem sobre o preço de venda é de 30%. Se inverter o cálculo, o prejuízo é certo.',
    },
    {
      icon: DollarSign,
      badge: 'Conceito Fundamental #2',
      title: 'Margem de Contribuição Real',
      desc: 'É o valor que sobra de cada venda após abater os custos e despesas variáveis diretas (matéria-prima, mercadoria, comissões e impostos sobre a venda). É essa margem que paga os custos fixos da empresa e gera o lucro líquido final no bolso dos sócios.',
    },
    {
      icon: Calculator,
      badge: 'Conceito Fundamental #3',
      title: 'Ponto de Equilíbrio Operacional (Break-even)',
      desc: 'O faturamento exato necessário para cobrir 100% dos custos e despesas fixas. Abaixo dele a empresa opera no vermelho; acima dele, cada unidade vendida contribui integralmente para o lucro mensal da operação.',
    },
    {
      icon: Scale,
      badge: 'Conceito Fundamental #4',
      title: 'Custos Fixos vs. Variáveis & Reforma Tributária',
      desc: 'Separar o que varia com o volume de vendas daquilo que vence faça chuva ou faça sol (aluguel, folha fixa). No novo cenário da Reforma Tributária (IBS e CBS com crédito pleno), o preço precisa ser recalculado "por fora", eliminando a cumulatividade de PIS/COFINS e ICMS.',
    },
  ]

  // Os 5 Erros Clássicos de Precificação
  const pricingMistakes = [
    {
      title: 'Copiar cegamente a tabela do concorrente',
      desc: 'Seu concorrente pode ter custos de matéria-prima menores, sede própria sem aluguel, dívidas bancárias já amortizadas ou estar à beira da insolvência vendendo sem lucro para gerar caixa imediato.',
      solution:
        'Calcular a estrutura real de custos da sua operação antes de balizar com o mercado.',
    },
    {
      title: 'Confundir faturamento com lucro (o engano do markup)',
      desc: 'Calcular 20% de margem no papel, mas aplicar 20% de markup simples sobre os custos diretos, esquecendo que comissões, cartão e impostos incidem sobre o preço total final da nota fiscal.',
      solution:
        'Utilizar fórmula de markup multiplicador divisor que projeta o preço líquido final.',
    },
    {
      title: 'Desconsiderar perdas, refugos e ociosidade da equipe',
      desc: 'Na indústria, matéria-prima perdida no processo e horas paradas de máquina; nos serviços, horas não faturadas (férias, prospecção e ociosidade) que continuam gerando folha de pagamento todo mês.',
      solution:
        'Incorporar índice de perdas técnicas e taxa de utilização produtiva no custo-base.',
    },
    {
      title: 'Não prever o impacto do capital de giro nos prazos concedidos',
      desc: 'Vender em 6 vezes sem juros sem embutir o custo financeiro do dinheiro no tempo. Se o fornecedor cobra em 30 dias e o cliente paga em 180, a empresa terá de buscar empréstimos bancários caros.',
      solution: 'Precificar de acordo com o prazo de recebimento e o ciclo financeiro do negócio.',
    },
    {
      title: 'Ignorar o impacto da transição para a Reforma Tributária (IBS/CBS)',
      desc: 'Tratar tributos como percentuais estáticos sem monitorar a não-cumulatividade ampla do IBS e da CBS. Quem não auditar os créditos nas compras ficará com preços defasados e sem competitividade.',
      solution: 'Alinhamento contínuo com os especialistas em Reforma Tributária da Borlim.',
    },
  ]

  // Passos de Trabalho Borlim em Formação de Preço
  const pricingSteps = [
    {
      step: '01',
      title: 'Diagnóstico dos 48 Indicadores & Raio-X de Custos',
      desc: 'Mapeamento minucioso de custos diretos, indiretos, despesas administrativas, prazos médios de recebimento e fôlego de capital de giro na contabilidade e na operação da sua empresa.',
    },
    {
      step: '02',
      title: 'Segregação Estrutural: Custos Fixos, Variáveis e Tributos',
      desc: 'Separação cirúrgica entre o que varia estritamente com a venda e a estrutura fixa. Simulação de tributação atual e do impacto do novo sistema tributário IBS/CBS sobre cada linha de produtos ou serviços.',
    },
    {
      step: '03',
      title: 'Modelagem dos Simuladores por Segmento & Markup Seguro',
      desc: 'Construção da planilha e simulador customizado para a sua realidade (Indústria com CIF e refugos; Comércio com CMV e giro; Serviços com homem-hora e taxa de utilização).',
    },
    {
      step: '04',
      title: 'Integração com DRE Gerencial, Metas e Acompanhamento',
      desc: 'Conexão direta com o Planejamento Econômico (lucro mensal), teste de insolvência em 12 meses e treinamento da sua equipe comercial para negociar margens com segurança.',
    },
  ]

  // FAQs específicos de Formação de Preço
  const pricingFaqs = [
    {
      q: 'Qual é a diferença exata entre Markup e Margem de Lucro e por que esse erro quebra empresas?',
      a: 'O Markup é o índice aplicado SOBRE O CUSTO para chegar ao preço de venda (olha para a base de custo). Já a Margem de Lucro é a porcentagem SOBRE O PREÇO DE VENDA que sobra no bolso da empresa. Exemplo didático: se um produto custa R$ 100,00 e você deseja uma margem líquida de 20%, pagando 15% de impostos e comissões, você NÃO PODE simplesmente somar 35% aos R$ 100,00 (vendendo a R$ 135,00). Vendendo a R$ 135,00, os 15% de tributos sobre o preço total darão R$ 20,25; sobrando R$ 114,75; menos o custo de R$ 100,00, seu lucro foi de R$ 14,75 (apenas 10,9% de margem real, quase metade do que você planejou!). O cálculo correto exige o markup divisor: Preço = Custo / (1 - (Impostos% + Margem Desejada%)). Ou seja: R$ 100 / (1 - 0,35) = R$ 153,85. Esse descompasso é uma das causas silenciosas de insolvência que a Borlim identifica e corrige.',
    },
    {
      q: 'Como a formação de preço varia entre Indústria, Comércio e Serviços na metodologia da Borlim?',
      a: 'Cada segmento possui geradores de custo completamente distintos: (1) Na INDÚSTRIA, o núcleo é o Custo de Produção (matéria-prima direta, mão de obra fabril, custos indiretos de fabricação rateados, consumo de energia, depreciação do maquinário e perdas/refugos de matéria-prima no chão de fábrica); (2) No COMÉRCIO, o núcleo é o CMV (Custo das Mercadorias Vendidas), frete de entrada, crédito tributário na compra, tempo de estocagem (giro de estoque e capital parado que custa juros) e bonificações/descontos comerciais por volume; (3) Nos SERVIÇOS, o núcleo é o valor do Homem-Hora ou Homem-Mês, o rateio dos custos fixos da estrutura por hora produtiva real (taxa de utilização da equipe, descontando férias e ociosidade) e a gestão de escopo (evitando horas extras não cobradas). A Borlim constrói a regra específica do seu negócio, nunca uma fórmula genérica.',
    },
    {
      q: 'Como a Formação de Preço se conecta com o Planejamento Econômico da Borlim?',
      a: 'Eles são duas faces da mesma moeda. O Planejamento Econômico tem por objetivo central melhorar o lucro mensal da empresa e estruturar a DRE gerencial. Nenhuma DRE gerencial tem resultado positivo se os preços dos produtos ou serviços forem formados no escuro. A Formação de Preço garante que cada unidade vendida entregue a Margem de Contribuição esperada. Quando a equipe comercial vende com preços calibrados, o Ponto de Equilíbrio é atingido mais rápido no mês, gerando lucro sustentável e fluxo de capital de giro saudável.',
    },
    {
      q: 'O que é Margem de Contribuição e como ela define se um produto deve continuar em linha?',
      a: 'Margem de Contribuição = Preço de Venda Líquido - Custos Variáveis - Despesas Variáveis. Ela representa o quanto cada venda contribui fisicamente para pagar os custos fixos da empresa (aluguel, folha administrativa, etc.) e formar o lucro. Se um produto tem margem de contribuição negativa, quanto mais você vende, maior é o seu prejuízo. Se a margem de contribuição for positiva, ele ajuda a amortizar a estrutura da empresa. A Borlim calcula a margem de contribuição de cada produto, serviço ou linha de negócio, apontando quais itens devem ser incentivados e quais precisam de reajuste ou descontinuação.',
    },
    {
      q: 'Como a Reforma Tributária (IBS e CBS) afetará os preços dos meus produtos e serviços?',
      a: 'A Reforma Tributária substitui cinco tributos (PIS, COFINS, IPI, ICMS e ISS) por um IVA Dual (IBS estadual/municipal e CBS federal), instituindo a não-cumulatividade ampla e a tributação no destino. No modelo antigo, impostos "por dentro" geravam cálculos complexos e bitributação oculta. No novo modelo, todas as compras da sua empresa geram crédito financeiro integral, e o imposto é calculado "por fora". Indústrias e comércios terão cadeias de crédito mais limpas, enquanto o setor de serviços (que tem muita folha de pagamento, a qual não gera crédito de IBS/CBS) precisará de reavaliação precisa de margem para não perder lucratividade. A Borlim já prepara a precificação da sua empresa para essa transição regulatória.',
    },
    {
      q: 'E se o preço calculado tecnicamente ficar acima do que o meu concorrente pratica?',
      a: 'Esse é o momento em que a consultoria econômica da Borlim faz a diferença. Se o preço técnico ficou acima do mercado, nós não forçamos um corte irresponsável de margem que levaria sua empresa ao prejuízo. Nós investigamos onde estão as ineficiências: custo de aquisição com fornecedores, perdas no processo fabril, giro de estoque lento, ociosidade da equipe de serviços ou excesso de custos fixos indiretos. Além disso, utilizamos os conceitos do Balanced Scorecard para agregar valor ao produto/serviço (prazos, qualidade, confiabilidade) para que seu cliente compre por valor, e não apenas por menor preço.',
    },
    {
      q: 'Como a Borlim avalia se o preço praticado cobre o fôlego de Capital de Giro?',
      a: 'Através do diagnóstico dos 48 indicadores de desempenho e da análise de insolvência em 12 meses. Se a sua empresa vende a prazo (ex.: 60 e 90 dias) e paga fornecedores à vista ou em 30 dias, há uma Necessidade de Capital de Giro (NCG) que custa dinheiro no banco (juros e taxas bancárias). Esse custo financeiro da estocagem e do financiamento ao cliente precisa estar contemplado no preço de venda a prazo. Caso contrário, a empresa bate recorde de vendas e quebra por falta de caixa.',
    },
    {
      q: 'Como posso contratar o trabalho de Formação de Preço para Vendas da Borlim?',
      a: 'Entre em contato direto com o economista Flávio Bordignon pelo WhatsApp (17) 99765-0672 ou e-mail flavio@borlim.com.br. Realizamos uma primeira conversa diagnóstica sobre o seu negócio (seja Indústria, Comércio ou Serviços) para entender sua estrutura atual de custos e propor um plano de implantação sob medida.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F3EC]">
      {/* 1. HERO INSTITUCIONAL */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        {/* Glows decorativos suaves */}
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-[#0B3B7A]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Breadcrumb */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40">
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
              empresário para empresário, sem fórmulas mágicas e sem suposições perigosas. Cada
              segmento econômico tem uma lógica de custo inteiramente própria: a{' '}
              <strong>Indústria</strong> depende do custo de produção, mão de obra fabril, custos
              indiretos de fabricação (CIF) e perdas/refugos; o <strong>Comércio</strong> gira em
              torno do CMV, giro de estoque e capital imobilizado; e os <strong>Serviços</strong>{' '}
              exigem o cálculo exato do homem-hora, taxa de utilização e rateio da estrutura fixa
              por hora produtiva real.
            </p>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-3xl">
              Conectada aos nossos <strong>48 indicadores de desempenho</strong>, ao{' '}
              <strong>Planejamento Econômico (lucro mensal)</strong> e ao teste preventivo de
              insolvência em 12 meses, a precificação correta elimina o erro clássico de confundir
              margem com markup, ajusta sua empresa ao novo cenário da{' '}
              <strong>Reforma Tributária (IBS e CBS)</strong> e garante que cada venda gere dinheiro
              líquido no caixa.
            </p>

            {/* CTAs Oficiais do Hero */}
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
                Vender mais sem saber a margem real de cada item acelera a falência. A BORLIM ensina
                e implanta na sua empresa a disciplina técnica da formação de preço para vendas:
                separação precisa de custos fixos e variáveis, cálculo de markup multiplicador e
                divisor, identificação do ponto de equilíbrio por linha e adequação aos novos
                créditos tributários da Reforma. De empresário para empresário, colocamos fim aos
                preços calculados por intuição.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#EDEAE0]/70 p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
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
                Ao dividir em vez de somar, você garante que as alíquotas que incidem sobre o preço
                final da nota fiscal (impostos sobre faturamento, comissões de vendedores e taxa de
                cartão) sejam 100% cobertas sem corroer a sua margem de lucro líquido planejada.
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
                  : 'bg-[#EDEAE0]/70 text-[#082852] border border-stone-300 hover:bg-stone-200/80'
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
                  : 'bg-[#EDEAE0]/70 text-[#082852] border border-stone-300 hover:bg-stone-200/80'
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
                  : 'bg-[#EDEAE0]/70 text-[#082852] border border-stone-300 hover:bg-stone-200/80'
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
            <div className="bg-[#F5F3EC] p-6 sm:p-10 rounded-3xl border border-stone-300 shadow-sm animate-fade-in">
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
                    Na indústria, o produto não nasce pronto na prateleira: ele é transformado a
                    partir de insumos brutos mediante o consumo de mão de obra fabril direta (MOD),
                    tempo de maquinário e despesas gerais de fábrica. O cálculo do preço industrial
                    exige o domínio do <strong>Custo de Produção</strong> e a distinção precisa
                    entre
                    <strong>custeio por absorção</strong> (obrigatório para fins contábeis e
                    fiscais) e <strong>custeio variável</strong> (o padrão gerencial recomendado
                    pela Borlim para tomadas de decisão e cálculo da margem de contribuição).
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
                        Materiais fisicamente incorporados ao produto (ex.: aço, plástico, resinas),
                        considerando o custo líquido após créditos de IPI/ICMS e IBS/CBS.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Mão de Obra Direta (MOD)
                        </strong>
                        Salários, encargos sociais trabalhistas (INSS, FGTS, férias, 13º) e
                        benefícios da equipe que atua diretamente na linha de transformação.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Custos Indiretos de Fabricação (CIF)
                        </strong>
                        Energia elétrica fabril, manutenção de máquinas, supervisão de fábrica,
                        depreciação de equipamentos e aluguel do galpão de produção.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Perdas, Cavacos & Refugos Fabris
                        </strong>
                        Todo processo gera sobras e perdas técnicas. Se 5% da chapa é perdida no
                        corte, esse refugo deve ser incorporado ao custo do lote, e não absorvido no
                        prejuízo.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs sm:text-sm text-slate-700">
                    <h5 className="font-serif font-bold text-[#15803D] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      Escala e Ponto de Equilíbrio de Produção:
                    </h5>
                    <p>
                      Quanto maior o volume produzido, menor é o custo fixo indireto (CIF) alocado a
                      cada unidade. A Borlim calcula com exatidão a{' '}
                      <strong>capacidade instalada</strong> e o lote mínimo de produção para que a
                      sua fábrica nunca produza abaixo do ponto de equilíbrio operacional.
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
            <div className="bg-[#F5F3EC] p-6 sm:p-10 rounded-3xl border border-stone-300 shadow-sm animate-fade-in">
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
                    No comércio (seja varejo de rua, e-commerce, distribuidora ou atacado), a
                    empresa compra mercadorias prontas para revenda. Aqui, o grande segredo da
                    precificação está na correta apuração do{' '}
                    <strong>CMV (Custo das Mercadorias Vendidas)</strong>, no frete de aquisição
                    (FOB), no aproveitamento de créditos fiscais e, principalmente, no{' '}
                    <strong>giro de estoque</strong>: estoque parado no galpão é capital de giro
                    imobilizado que consome juros bancários e reduz a margem real.
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-serif text-base font-bold text-[#082852]">
                      Conceitos Fundamentais do Varejo e Atacado:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Custo de Aquisição Líquido (CMV)
                        </strong>
                        Preço do fornecedor somado ao frete de entrada, seguro e taxas, abatidos os
                        créditos tributários recuperáveis (ICMS, PIS/COFINS e futura CBS/IBS).
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Giro de Estoque & Capital Parado
                        </strong>
                        Um produto que demora 180 dias para vender custa muito mais caro em capital
                        de giro do que um produto que gira em 15 dias. A margem deve refletir a
                        velocidade da rotação.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Margem Bruta Comercial
                        </strong>
                        Diferença entre o preço de venda líquido de impostos e o CMV. É o indicador
                        vital monitorado nos 48 indicadores da Borlim para avaliar a eficiência do
                        comprador.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Descontos por Volume & Políticas de Preço
                        </strong>
                        Precificação em faixas de quantidade (atacarejo) calculadas de forma que o
                        ganho em volume compense rigorosamente a redução percentual da margem
                        unitária.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs sm:text-sm text-slate-700">
                    <h5 className="font-serif font-bold text-[#15803D] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      O Perigo da Taxa de Cartão e Antecipação de Recebíveis:
                    </h5>
                    <p>
                      Muitos comerciantes precificam pensando no dinheiro à vista e oferecem 10x sem
                      juros. As taxas de parcelamento e de antecipação do cartão consomem até 8% do
                      faturamento. Na Borlim, o markup comercial embute a média ponderada dos meios
                      de pagamento para blindar o caixa.
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
            <div className="bg-[#F5F3EC] p-6 sm:p-10 rounded-3xl border border-stone-300 shadow-sm animate-fade-in">
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
                    No setor de serviços (consultorias, engenharias, tecnologia, agências, clínicas,
                    manutenção e transportes), o estoque não fica na prateleira: o produto é o tempo
                    e o conhecimento da equipe técnica. O cálculo do preço em serviços é um dos mais
                    desafiadores, pois exige a apuração do{' '}
                    <strong>Homem-Hora (ou Valor-Hora)</strong>, a consideração da{' '}
                    <strong>taxa de utilização produtiva</strong> (horas faturadas vs. horas
                    disponíveis) e o controle rigoroso contra o <em>escopo-creep</em> (trabalho
                    extra não cobrado).
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
                        Salário bruto somado a encargos trabalhistas, provisão de férias, 13º, FGTS,
                        benefícios, alimentação e treinamentos dividido pelas horas efetivas de
                        trabalho.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Taxa de Utilização da Equipe
                        </strong>
                        Nenhum profissional produz 176 horas por mês para clientes. Há reuniões
                        internas, prospecção e ociosidade. Se a taxa de utilização é de 70%, o custo
                        da hora faturada precisa ser ajustado.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Rateio da Estrutura Fixa por Hora
                        </strong>
                        Softwares corporativos, aluguel do escritório, administrativo e comercial
                        devem ser absorvidos proporcionalmente pelas horas produtivas estimadas no
                        mês.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#082852] block mb-1">
                          • Precificação por Projeto vs. por Hora
                        </strong>
                        Preço fechado (escopo fixo) transfere o risco de prazo para a sua empresa.
                        Sem cláusulas claras de aditivos de escopo (escopo-creep), o projeto consome
                        o dobro das horas e gera prejuízo.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs sm:text-sm text-slate-700">
                    <h5 className="font-serif font-bold text-[#15803D] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      Atenção Especial na Reforma Tributária para Serviços:
                    </h5>
                    <p>
                      Com a unificação do ISS em IBS e PIS/COFINS em CBS, o setor de serviços (cuja
                      maior despesa é folha salarial, que não gera crédito tributário) precisa de
                      cálculos minuciosos para não ter sua margem comprimida pela alíquota padrão. A
                      Borlim simula esse impacto com antecedência.
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
                Na metodologia da BORLIM Consultoria, a Formação de Preço não é um exercício
                isolado: ela se conecta diretamente ao <strong>Planejamento Econômico</strong> (que
                melhora o lucro mensal da empresa e estrutura a DRE gerencial), ao{' '}
                <strong>Planejamento Financeiro</strong> (que equilibra o capital de giro e o prazo
                concedido aos clientes) e ao <strong>Balanced Scorecard</strong> (que garante
                competitividade comercial para nenhum negócio ser perdido).
              </p>
              <p className="text-sm text-slate-200 font-sans leading-relaxed">
                Quando cada produto da sua <strong>Indústria</strong>, cada mercadoria do seu{' '}
                <strong>Comércio</strong> ou cada hora do seu <strong>Serviço</strong> é precificada
                pelo método técnico, seu <strong>Ponto de Equilíbrio</strong> é atingido com menos
                esforço, a empresa afasta o risco de insolvência imediata e em 12 meses e o{' '}
                <strong>Valuation</strong> do seu patrimônio dispara.
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
                Vamos colocar a sua empresa no caminho da lucratividade real com a BORLIM
                Consultoria.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse diretamente com o nosso economista e tire todas as suas dúvidas sobre a
                formação de preço da sua indústria, comércio ou empresa de serviços. Integre sua
                precificação aos 48 indicadores de desempenho financeiro, ao teste de insolvência em
                12 meses e ao Planejamento Econômico.
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
