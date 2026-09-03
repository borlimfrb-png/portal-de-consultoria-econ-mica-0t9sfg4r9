import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Calculator,
  Target,
  AlertTriangle,
  Check,
  Linkedin,
  FileSpreadsheet,
  ExternalLink,
  Coins,
  Scale,
  Handshake,
  Users2,
  PieChart,
  Layers,
  HelpCircle,
  Briefcase,
  SearchCheck,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

export default function Sobre() {
  const coreFeatures = [
    {
      icon: BarChart3,
      badge: '48 Indicadores',
      title: 'Diagnóstico por 48 Indicadores de Desempenho',
      desc: 'Demonstramos com precisão analítica os pontos fortes e as vulnerabilidades da sua estrutura financeira, fundamentados em quarenta e oito indicadores de desempenho rigorosos.',
    },
    {
      icon: AlertTriangle,
      badge: 'Prevenção & Solvência',
      title: 'Análise de Insolvência Imediata e em 12 Meses',
      desc: 'Identificamos antecipadamente se a empresa apresenta riscos de insolvência imediata ou no período de doze meses, assegurando a tomada de medidas corretivas em tempo hábil.',
    },
    {
      icon: ShieldCheck,
      badge: 'Valuation & Ativos',
      title: 'Avaliação Segura de Ativos para Venda do Negócio',
      desc: 'Numa eventual alienação ou negociação do seu negócio, empregamos indicadores consolidados e seguros para determinar com exatidão o valor real dos seus ativos.',
    },
  ]

  const strategicPlans = [
    {
      number: '01',
      title: 'Planejamento Financeiro',
      icon: Calculator,
      highlight: 'Gestão do Fluxo de Caixa, Capital de Giro e Reinvestimento',
      description:
        'Com essa ferramenta vamos planejar de forma eficiente o fluxo de entrada e saída do capital de giro e demonstrar sugestões possíveis para a empresa investir os lucros no seu próprio negócio.',
      benefits: [
        'Planejamento eficiente e minucioso do fluxo de entrada e saída de caixa',
        'Gestão estratégica e otimizada do capital de giro operacional',
        'Sugestões fundamentadas para reinvestir os lucros no próprio negócio',
        'Preservação e blindagem da liquidez corrente da empresa',
      ],
    },
    {
      number: '02',
      title: 'Planejamento Econômico',
      icon: TrendingUp,
      highlight: 'Maximização e Sustentabilidade do Lucro Mensal',
      description:
        'Com ele vamos melhorar o lucro mensal da empresa, alinhando receitas, custos e despesas operacionais a parâmetros consistentes de rentabilidade.',
      benefits: [
        'Melhoria contínua e expressiva do lucro mensal da empresa',
        'Otimização da margem de contribuição por linha de produto e serviço',
        'Racionalização criteriosa da estrutura de custos fixos e variáveis',
        'Equilíbrio e sustentabilidade dos resultados econômico-financeiros',
      ],
    },
    {
      number: '03',
      title: 'Balanced Scorecard',
      icon: Target,
      highlight: 'Competitividade Estratégica e Eficiência de Mercado',
      description:
        'Com essa ferramenta a empresa vai ficar muito mais competitiva no mercado, ou seja, nenhum negócio será perdido com a implantação do Balanced Scorecard.',
      benefits: [
        'Elevação substancial da competitividade corporativa perante o mercado',
        'Garantia de que nenhum negócio será perdido após a implantação da metodologia',
        'Alinhamento integral entre as diretrizes estratégicas e a rotina operacional',
        'Acompanhamento integrado de metas financeiras, processos, clientes e pessoas',
      ],
    },
  ]

  const differentials = [
    {
      title: 'Diagnóstico Completo com 48 Indicadores',
      desc: 'Mapeamento exaustivo de variáveis financeiras para evidenciar com clareza os pontos fortes e as vulnerabilidades do negócio.',
    },
    {
      title: 'Prevenção de Insolvência (Imediata e em 12 Meses)',
      desc: 'Modelagem preventiva voltada a antecipar e mitigar ameaças à solvência e à liquidez da empresa.',
    },
    {
      title: 'Valuation & Avaliação Segura de Ativos',
      desc: 'Emprego de metodologia criteriosa e indicador seguro para precificação patrimonial em processos de venda ou reestruturação.',
    },
    {
      title: 'Três Tipos Estratégicos de Planejamentos',
      desc: 'Soluções integradas de Planejamento Financeiro, Planejamento Econômico e Balanced Scorecard sob medida para a sua operação.',
    },
  ]

  const valuationMoments = [
    {
      icon: Handshake,
      title: 'Venda Total ou Parcial do Negócio (M&A)',
      desc: 'Numa possível venda, saber exatamente quanto valem a empresa e seus ativos permite negociar com firmeza, sem deixar dinheiro na mesa nem inviabilizar propostas com valores fora da realidade.',
    },
    {
      icon: Users2,
      title: 'Entrada ou Saída de Sócios',
      desc: 'Apuração justa e transparente de haveres societários na admissão de investidores ou na dissolução parcial de quotas, prevenindo disputas judiciais desgastantes.',
    },
    {
      icon: Briefcase,
      title: 'Planejamento Sucessório e Patrimonial',
      desc: 'Estruturação harmoniosa e documentada da transmissão patrimonial familiar, conferindo segurança jurídica e financeira para as próximas gerações.',
    },
    {
      icon: DollarSign,
      title: 'Captação de Recursos e Financiamentos',
      desc: 'Apresentação formal a bancos, fundos e investidores com laudo consistente e fundamentado na capacidade real de geração de resultados e lastro de ativos.',
    },
  ]

  const valuationMethods = [
    {
      icon: ShieldCheck,
      tag: 'Especialidade Borlim',
      title: 'Avaliação Patrimonial de Ativos com Indicador Seguro',
      desc: 'Numa possível venda do seu negócio, com a utilização de um indicador seguro avaliaremos o valor real dos seus ativos (tangíveis e intangíveis), considerando depreciações, lastro operacional e solvência.',
      highlight: 'Alinhado ao diagnóstico de 48 indicadores da Borlim',
    },
    {
      icon: TrendingUp,
      tag: 'Capacidade Futura',
      title: 'Fluxo de Caixa Descontado (FCD)',
      desc: 'Projeta a capacidade de geração de caixa operacional da empresa ao longo do tempo, descontada a uma taxa que reflete o risco de oportunidade e do setor.',
      highlight: 'Determinação do valor econômico intrínseco',
    },
    {
      icon: Scale,
      tag: 'Mercado & Comparáveis',
      title: 'Múltiplos de Mercado & Transações Similares',
      desc: 'Compara métricas contábeis e financeiras (como EBITDA, receita e faturamento) com transações e empresas atuantes no mesmo segmento econômico.',
      highlight: 'Parâmetro de competitividade setorial',
    },
  ]

  const valuationSteps = [
    {
      step: '01',
      title: 'Diagnóstico de 48 Indicadores',
      desc: 'Levantamento minucioso dos 48 indicadores de desempenho econômico-financeiro para identificar pontos fortes e vulnerabilidades da empresa.',
    },
    {
      step: '02',
      title: 'Análise de Insolvência Imediata e em 12 Meses',
      desc: 'Verificação da solidez de curto e médio prazo, eliminando riscos ocultos e assegurando premissas realistas para a precificação.',
    },
    {
      step: '03',
      title: 'Avaliação Segura de Ativos e Projeções',
      desc: 'Aplicação de indicador seguro para quantificar o valor de ativos, contingências, capacidade de caixa e valor de liquidação ou continuidade.',
    },
    {
      step: '04',
      title: 'Laudo de Avaliação & Suporte Estratégico',
      desc: 'Entrega de relatório executivo fundamentado, defensável e pronto para apoiar negociações com sócios, compradores ou investidores.',
    },
  ]

  const valuationBenefits = [
    {
      title: 'Base Objetiva e Defensável para Negociar',
      desc: 'Argumentação técnica e sólida frente a compradores, auditores e investidores, evitando palpites subjetivos.',
    },
    {
      title: 'Valor Justo dos Ativos e do Negócio',
      desc: 'Utilização de indicador seguro para mensurar o patrimônio real com total transparência e precisão técnica.',
    },
    {
      title: 'Identificação e Mitigação de Riscos de Insolvência',
      desc: 'Clareza antecipada sobre a saúde da liquidez imediata e no horizonte de doze meses durante a transação.',
    },
    {
      title: 'Tomada de Decisão Segura e Estratégica',
      desc: 'Segurança para o empresário decidir o melhor momento para vender, reinvestir, expandir ou reorganizar a sociedade.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* 1. Header Hero (Navy/Blue) */}
      <section className="bg-[#082852] text-white py-16 sm:py-20 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-[#0B3B7A]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Institucional — BORLIM Consultoria Empresarial
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Especialistas em diagnosticar e planejar o sistema financeiro da sua empresa.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-5 leading-relaxed font-sans">
              A <strong>Borlim Consultoria</strong> é especializada em diagnosticar e planejar o
              sistema financeiro da sua empresa. Demonstramos os pontos fortes e fracos com quarenta
              e oito indicadores de desempenho e estabelecemos planejamentos estratégicos orientados
              ao fortalecimento do capital de giro, à ampliação do lucro mensal, à excelência
              competitiva e à avaliação segura de ativos em processos de Valuation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#valuation"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <Coins className="w-4 h-4 text-emerald-100" />
                <span>Conhecer o Trabalho de Valuation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#planejamentos"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <span>Planejamentos Estratégicos</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Narrative: O que fazemos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Main Statement Box */}
          <div className="lg:col-span-7 space-y-6 text-slate-800 leading-relaxed font-serif text-base sm:text-lg">
            <div className="inline-block border-b-2 border-[#16A34A] pb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Atuação Institucional & Diagnóstico
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] leading-snug">
              Diagnóstico preciso, prevenção rigorosa de insolvência e avaliação patrimonial de
              ativos.
            </h2>

            <div className="p-6 bg-white rounded-xl border-l-4 border-l-[#16A34A] border border-slate-200 shadow-xs space-y-4 font-sans text-sm sm:text-base text-slate-700">
              <p className="leading-relaxed">
                <strong className="text-[#082852] font-serif text-base sm:text-lg block mb-1">
                  A Borlim Consultoria é especializada em diagnosticar e planejar o sistema
                  financeiro da sua empresa.
                </strong>
                Demonstramos os pontos fortes e fracos com{' '}
                <strong>quarenta e oito indicadores de desempenho</strong>.
              </p>
              <p className="leading-relaxed">
                Além dos indicadores vamos demonstrar se a empresa tem{' '}
                <strong>problemas de insolvência imediata ou no período de doze meses</strong>.
              </p>
              <p className="leading-relaxed">
                Numa possível venda do seu negócio, com a utilização de um indicador seguro{' '}
                <strong>avaliaremos o valor dos seus Ativos</strong>.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Com base nesse diagnóstico técnico aprofundado, estruturamos soluções corporativas que
              blindam a saúde financeira do negócio, conferem total previsibilidade de fluxo de
              caixa e pavimentam decisões estratégicas de alto impacto — seja para reinvestir no
              próprio negócio, seja para negociar com solidez em um processo de Valuation.
            </p>
          </div>

          {/* Quick Summary / Diferenciais */}
          <div className="lg:col-span-5 bg-white p-8 rounded-xl border border-slate-200 space-y-6 shadow-xs">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#15803D] font-bold block mb-1">
                Pilares de Excelência
              </span>
              <h3 className="font-serif text-xl font-bold text-[#082852]">Diferenciais BORLIM</h3>
            </div>

            <div className="space-y-4">
              {differentials.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-[#082852]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Atuação Personalizada
              </span>
              <p className="text-xs text-slate-700 font-sans leading-relaxed">
                Atendimento consultivo e técnico a empresas de pequeno, médio e grande porte que
                priorizam solidez de liquidez, incremento real de lucratividade, avaliação segura de
                ativos e crescimento corporativo sustentável.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Diagnóstico e Avaliação - 3 Pilares Visuais */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Metodologia de Diagnóstico
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-1">
              Como Diagnosticamos a Saúde Financeira da Sua Empresa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Estrutura analítica em três dimensões integradas para mapear riscos, oportunidades e o
              valor real do patrimônio da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreFeatures.map((feat, idx) => {
              const Icon = feat.icon
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs hover:border-[#16A34A] transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#16A34A]/5 rounded-bl-full pointer-events-none" />
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#0B3B7A] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] mb-3 border border-emerald-200">
                      {feat.badge}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852] mb-3 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 4. NOVA SEÇÃO DEDICADA: Valuation / Avaliação de Empresas */}
        <section
          id="valuation"
          aria-labelledby="valuation-heading"
          className="mb-20 scroll-mt-24 bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#16A34A]/5 rounded-full blur-2xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
              <Coins className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                Serviço Especializado de Avaliação de Empresas
              </span>
            </div>
            <h2
              id="valuation-heading"
              className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight"
            >
              Valuation BORLIM: Avaliação Precisa e Segura dos Ativos da Sua Empresa
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 font-sans leading-relaxed">
              O <strong>Valuation</strong> (avaliação de empresas) é o processo técnico e econômico
              responsável por determinar o <strong>valor justo de um negócio</strong> e de seus
              ativos. Na <strong>Borlim Consultoria</strong>, unimos nosso diagnóstico exclusivo de{' '}
              <strong>48 indicadores de desempenho</strong>, a análise antecipada de{' '}
              <strong>risco de insolvência imediata e em 12 meses</strong> e a{' '}
              <strong>
                utilização de um indicador seguro para avaliar o valor dos seus ativos
              </strong>
              , entregando uma base incontestável para transações e decisões societárias.
            </p>
          </div>

          {/* Destaque central: Citação / Metodologia Borlim */}
          <div className="mb-14 p-6 sm:p-8 bg-gradient-to-r from-[#082852] to-[#0B3B7A] rounded-xl text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                  A Metodologia da Borlim Consultoria
                </span>
                <blockquote className="font-serif text-lg sm:text-xl font-medium leading-relaxed text-slate-100">
                  “Numa possível venda do seu negócio, com a utilização de um indicador seguro
                  avaliaremos o valor dos seus Ativos.”
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Não trabalhamos com estimativas subjetivas. Cruzamos a solidez dos seus ativos com
                  o comportamento dos 48 indicadores financeiros e a blindagem contra insolvência
                  (imediata e em 12 meses), assegurando que o empresário saiba exatamente o piso, o
                  teto e o valor justo da sua operação.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2.5">
                <Link
                  to="/valuation"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#082852] hover:bg-slate-100 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group"
                >
                  <Coins className="w-4 h-4 text-[#16A34A]" />
                  <span>Ver Página Completa de Valuation</span>
                  <ArrowRight className="w-4 h-4 text-[#16A34A] group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20Valuation%20da%20minha%20empresa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group border border-[#22C55E]/40"
                >
                  <Phone className="w-4 h-4" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quando é necessário o Valuation? (4 Momentos) */}
          <div className="mb-14">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Cenários de Aplicação
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mt-1">
                Quando a Sua Empresa Precisa de um Laudo de Valuation?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                Momentos cruciais na trajetória empresarial exigem respaldo numérico consistente e
                independente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {valuationMoments.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:border-[#16A34A] transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#082852] text-[#22C55E] flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#082852] mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Abordagens e Metodologias Técnicas */}
          <div className="mb-14">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Abordagens Metodológicas
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mt-1">
                Metodologias Utilizadas na Precificação Corporativa
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                Trabalhamos abordagens complementares que convergem para uma precificação precisa e
                defensável no mercado.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {valuationMethods.map((method, idx) => {
                const Icon = method.icon
                const isBorlimPillar = idx === 0
                return (
                  <div
                    key={idx}
                    className={`p-6 sm:p-7 rounded-xl border flex flex-col justify-between transition-all ${
                      isBorlimPillar
                        ? 'bg-emerald-50/50 border-[#16A34A] shadow-xs'
                        : 'bg-[#F8FAFC] border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                            isBorlimPillar
                              ? 'bg-[#16A34A] text-white'
                              : 'bg-[#0B3B7A] text-[#22C55E]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${
                            isBorlimPillar
                              ? 'bg-[#16A34A]/10 text-[#15803D] border-[#16A34A]/30'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {method.tag}
                        </span>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-[#082852] mb-2 leading-snug">
                        {method.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-4">
                        {method.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isBorlimPillar ? 'text-[#16A34A]' : 'text-slate-400'
                        }`}
                      />
                      <span className="text-xs font-sans font-semibold text-slate-700">
                        {method.highlight}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* O Passo a Passo da Avaliação Borlim */}
          <div className="mb-14 bg-[#F8FAFC] p-8 rounded-xl border border-slate-200">
            <div className="mb-8 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Fluxo Técnico
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mt-1">
                Etapas do Processo de Valuation na BORLIM
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                Rigor metodológico da coleta documental à entrega do laudo executivo final.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuationSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs h-full flex flex-col">
                    <span className="font-mono text-xl font-bold text-[#15803D] mb-2">
                      {step.step}
                    </span>
                    <h5 className="font-serif text-base font-bold text-[#082852] mb-2">
                      {step.title}
                    </h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed mt-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios para o Empresário */}
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Vantagens Competitivas
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mt-1">
                Por Que Fazer a Avaliação da Sua Empresa com a BORLIM?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valuationBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <div className="w-8 h-8 rounded-md bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#082852] font-sans">
                      {benefit.title}
                    </h5>
                    <p className="text-xs text-slate-600 font-sans mt-0.5 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner CTA link para página dedicada de Valuation */}
            <div className="mt-8 p-6 bg-emerald-50/80 border border-emerald-300 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                  Conteúdo Expandido & Engenharia Financeira
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#082852]">
                  Quer entender o FCD, os Múltiplos e a Avaliação de Ativos em detalhes?
                </h4>
                <p className="text-xs text-slate-600 font-sans">
                  Acesse nossa página exclusiva de Valuation com exemplos práticos, perguntas
                  frequentes e detalhamento metodológico.
                </p>
              </div>

              <Link
                to="/valuation"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group"
              >
                <span>Ver página completa de Valuation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Planejamentos Estratégicos (Os 3 Tipos) */}
        <div
          id="planejamentos"
          className="mb-20 scroll-mt-24 bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm"
        >
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Soluções Estratégicas
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-1">
              Três Tipos Estratégicos de Planejamentos
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Com base nos indicadores estabeleceremos{' '}
              <strong>três tipos estratégicos de planejamentos</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {strategicPlans.map((plan, idx) => {
              const Icon = plan.icon
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] p-6 sm:p-8 rounded-xl border border-slate-200 hover:border-[#16A34A] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#0B3B7A] text-[#22C55E] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-[#15803D]">
                        {plan.number}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#082852] mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-[#15803D] uppercase tracking-wider mb-3">
                      {plan.highlight}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mb-6">
                      {plan.description}
                    </p>

                    <div className="pt-4 border-t border-slate-200 space-y-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                        Principais Entregas:
                      </span>
                      {plan.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Banner CTA link para página dedicada de Planejamento */}
          <div className="mt-10 p-6 bg-emerald-50/80 border border-emerald-300 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                Conteúdo Dedicado & Metodologia Completa
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#082852]">
                Quer saber como implantar o Planejamento Financeiro, Econômico e o Balanced
                Scorecard?
              </h4>
              <p className="text-xs text-slate-600 font-sans">
                Acesse nossa página exclusiva de Planejamento com os 48 indicadores, teste de
                insolvência, perguntas frequentes e exemplos práticos.
              </p>
            </div>

            <Link
              to="/planejamento"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group"
            >
              <span>Ver página completa de Planejamento</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 6. Contact & Institutional Card (Navy/Blue) */}
        <div className="bg-[#082852] text-white rounded-2xl p-8 sm:p-12 border border-[#0B3B7A] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Contato Institucional & Atendimento Consultivo
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2 mb-4 leading-tight">
                Inicie o diagnóstico financeiro ou o Valuation da sua empresa com a BORLIM.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                Conheça em detalhes os pontos fortes e os pontos fracos do seu sistema financeiro,
                previna riscos de insolvência imediata ou em 12 meses, apure o valor real dos seus
                ativos e implante planejamentos estratégicos com a nossa equipe:
              </p>

              <div className="space-y-3 font-mono text-xs">
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
                    (WhatsApp)
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/flavio-bordignon-bordignon-8b1a63b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors group"
                  aria-label="LinkedIn - Flávio Bordignon"
                >
                  <Linkedin className="w-4 h-4 text-[#16A34A] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    LinkedIn
                  </span>
                </a>
                <div className="flex items-center gap-3 text-slate-200">
                  <MapPin className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>São Paulo — SP, Brasil</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <Building2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>BORLIM Consultoria Empresarial Ltda.</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#0B3B7A] p-8 rounded-xl border border-slate-700 text-center shadow-inner">
              {/* Official Brand Logo */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-md mb-4 w-full max-w-[260px] flex items-center justify-center">
                <img
                  src={logoBorlim}
                  alt="BORLIM Consultoria Empresarial"
                  className="h-14 w-auto max-w-full object-contain"
                />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Assessoria Financeira</h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Atendimento consultivo e personalizado para empresários, diretorias e investidores.
              </p>
              <div className="w-full space-y-2.5">
                <a
                  href="https://analise-de-balanco-6514f.goskip.app"
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
                  href="https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20diagn%C3%B3stico%20financeiro%20e%20valuation%20para%20minha%20empresa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                >
                  <span>Solicitar Diagnóstico / Valuation</span>
                  <ArrowRight className="w-4 h-4 text-[#16A34A]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
