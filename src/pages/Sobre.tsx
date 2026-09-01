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
} from 'lucide-react'

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
      title: 'Avaliação Segura de Ativos',
      desc: 'Emprego de metodologia criteriosa e indicadores sólidos para precificação patrimonial em processos de venda ou reestruturação.',
    },
    {
      title: 'Três Tipos Estratégicos de Planejamentos',
      desc: 'Soluções integradas de Planejamento Financeiro, Planejamento Econômico e Balanced Scorecard sob medida para a sua operação.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F4EE]">
      {/* 1. Header Hero (Navy) */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-[#1A365D] relative overflow-hidden">
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#B8892F]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-[#183863]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#B8892F]/15 border border-[#B8892F]/30">
              <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4A853] font-bold">
                Institucional — BORLIM Consultoria Empresarial
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE] leading-tight">
              Especialistas em diagnosticar e planejar o sistema financeiro da sua empresa.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-5 leading-relaxed font-sans">
              A <strong>Borlim Consultoria</strong> é especializada em diagnosticar e planejar o
              sistema financeiro da sua empresa. Demonstramos os pontos fortes e fracos com quarenta
              e oito indicadores de desempenho e estabelecemos planejamentos estratégicos orientados
              ao fortalecimento do capital de giro, à ampliação do lucro mensal e à excelência
              competitiva.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Narrative: O que fazemos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Main Statement Box */}
          <div className="lg:col-span-7 space-y-6 text-slate-800 leading-relaxed font-serif text-base sm:text-lg">
            <div className="inline-block border-b-2 border-[#B8892F] pb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
                Atuação Institucional & Diagnóstico
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A] leading-snug">
              Diagnóstico preciso, prevenção rigorosa de insolvência e avaliação patrimonial de
              ativos.
            </h2>

            <div className="p-6 bg-white rounded-xl border-l-4 border-l-[#B8892F] border border-[#E5E0D6] shadow-xs space-y-4 font-sans text-sm sm:text-base text-slate-700">
              <p className="leading-relaxed">
                <strong className="text-[#0B1F3A] font-serif text-base sm:text-lg block mb-1">
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
              caixa e pavimentam decisões estratégicas de alto impacto.
            </p>
          </div>

          {/* Quick Summary / Diferenciais */}
          <div className="lg:col-span-5 bg-[#EDE9DE] p-8 rounded-xl border border-[#E5E0D6] space-y-6 shadow-xs">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#B8892F] font-bold block mb-1">
                Pilares de Excelência
              </span>
              <h3 className="font-serif text-xl font-bold text-[#0B1F3A]">Diferenciais BORLIM</h3>
            </div>

            <div className="space-y-4">
              {differentials.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B8892F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-[#0B1F3A]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E0DBCF] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Atuação Personalizada
              </span>
              <p className="text-xs text-slate-700 font-sans leading-relaxed">
                Atendimento consultivo e técnico a empresas de pequeno, médio e grande porte que
                priorizam solidez de liquidez, incremento real de lucratividade e crescimento
                corporativo sustentável.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Diagnóstico e Avaliação - 3 Pilares Visuais */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
              Metodologia de Diagnóstico
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
              Como Diagnosticamos a Saúde Financeira da Sua Empresa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Estrutura analítica em três dimensões integradas para mapear riscos, oportunidades e
              valor patrimonial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreFeatures.map((feat, idx) => {
              const Icon = feat.icon
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl border border-[#E5E0D6] shadow-xs hover:border-[#B8892F] transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#B8892F]/5 rounded-bl-full pointer-events-none" />
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#0B1F3A] text-[#B8892F] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EDE9DE] text-[#0B1F3A] mb-3 border border-[#D5CFBF]">
                      {feat.badge}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1F3A] mb-3 leading-snug">
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

        {/* 4. Planejamentos Estratégicos (Os 3 Tipos) */}
        <div className="mb-20 bg-white rounded-2xl p-8 sm:p-12 border border-[#E5E0D6] shadow-sm">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
              Soluções Estratégicas
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
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
                  className="bg-[#F6F4EE] p-6 sm:p-8 rounded-xl border border-[#E5E0D6] hover:border-[#B8892F] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#0B1F3A] text-[#B8892F] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-[#B8892F]">
                        {plan.number}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-[#B8892F] uppercase tracking-wider mb-3">
                      {plan.highlight}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mb-6">
                      {plan.description}
                    </p>

                    <div className="pt-4 border-t border-[#E0DBCF] space-y-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                        Principais Entregas:
                      </span>
                      {plan.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-[#B8892F] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 5. Contact & Institutional Card (Navy) */}
        <div className="bg-[#0B1F3A] text-white rounded-2xl p-8 sm:p-12 border border-[#1A365D] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4A853] font-bold">
                Contato Institucional & Atendimento Consultivo
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mt-2 mb-4 leading-tight">
                Inicie o diagnóstico financeiro da sua empresa com a BORLIM.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                Conheça em detalhes os pontos fortes e os pontos fracos do seu sistema financeiro,
                previna riscos de insolvência e implante planejamentos estratégicos sob medida com a
                nossa equipe:
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#D4A853] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#B8892F] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold underline underline-offset-4 decoration-[#B8892F]/60">
                    flavio@borlim.com.br
                  </span>
                </a>
                <a
                  href="https://wa.me/5517997650672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#D4A853] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#B8892F] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold underline underline-offset-4 decoration-[#B8892F]/60">
                    (17) 99765-0672
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans font-normal">
                    (WhatsApp)
                  </span>
                </a>
                <div className="flex items-center gap-3 text-slate-200">
                  <MapPin className="w-4 h-4 text-[#B8892F] shrink-0" />
                  <span>São Paulo — SP, Brasil</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <Building2 className="w-4 h-4 text-[#B8892F] shrink-0" />
                  <span>BORLIM Consultoria Empresarial Ltda.</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#102A4E] p-8 rounded-xl border border-[#1E4377] text-center shadow-inner">
              {/* Official Brand Logo */}
              <div className="bg-white p-3.5 rounded-lg border border-[#B8892F]/60 shadow-md mb-4 max-w-[220px]">
                <img
                  src="/src/assets/logotipo-borlim-73de3.jpg"
                  alt="BORLIM Consultoria Empresarial"
                  className="w-full h-auto max-h-12 object-contain mix-blend-multiply"
                />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F4EE]">Assessoria Financeira</h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Atendimento consultivo e personalizado para empresários e diretorias.
              </p>
              <a
                href="https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20diagn%C3%B3stico%20financeiro%20para%20minha%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B8892F] hover:bg-[#D4A853] text-[#0B1F3A] text-xs font-mono font-bold uppercase tracking-wider rounded transition-all shadow"
              >
                <span>Solicitar Diagnóstico Financeiro</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
