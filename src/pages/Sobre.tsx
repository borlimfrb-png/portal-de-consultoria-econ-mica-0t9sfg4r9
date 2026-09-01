import {
  TrendingUp,
  Scale,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Briefcase,
  Layers,
  ArrowRight,
  Database,
  Calculator,
  Compass,
  FileSpreadsheet,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Sobre() {
  const pillars = [
    {
      title: 'Inteligência e Transição da Reforma Tributária',
      icon: Scale,
      tag: 'EC 132/2023 & Leis Complementares',
      desc: 'Assessoria estratégica no diagnóstico de impactos da transição para a CBS (federal) e o IBS (estadual/municipal), além do Imposto Seletivo. Modelagem e simulação da nova dinâmica de não cumulatividade plena, regras de Split Payment nos fluxos financeiros e reestruturação da governança de compras e contratos comerciais.',
    },
    {
      title: 'Análise Macroeconômica & Indicadores em Tempo Real',
      icon: TrendingUp,
      tag: 'BCB, IBGE & FGV',
      desc: 'Acompanhamento sistemático e modelagem das trajetórias de taxas de juros (Selic, CDI), inflação (IPCA, IGP-M), câmbio oficial (Dólar, Euro) e índices de atividade (IBC-Br e Desemprego). Projeções fundamentadas para suportar o planejamento orçamentário anual e a gestão de passivos financeiros corporativos.',
    },
    {
      title: 'Consultoria Estratégica para Decisão Corporativa',
      icon: BarChart3,
      tag: 'C-Level & Conselhos de Administração',
      desc: 'Construção de cenários econômicos de estresse, análise de sensibilidade de margens de contribuição e suporte analítico para comitês executivos. Convertemos complexidade regulatória e volatilidade macroeconômica em diretrizes claras de alocação de capital e precificação sustentável.',
    },
  ]

  const differentials = [
    {
      title: 'Dados Oficiais e Atualização Frequente',
      desc: 'Integração contínua e automatizada com o Sistema Gerenciador de Séries Temporais (SGS) do Banco Central do Brasil, IBGE e publicações oficiais da Câmara e do Senado.',
    },
    {
      title: 'Especialização Focada na Reforma Tributária',
      desc: 'Compreensão técnica profunda dos efeitos do IBS, CBS, Split Payment e alíquotas de referência sobre o fluxo de caixa das empresas de médio e grande porte.',
    },
    {
      title: 'Síntese Executiva Rigorosa',
      desc: 'Comunicação editorial sóbria, objetiva e orientada à tomada de decisão para CEOs, CFOs, diretores jurídicos e conselheiros.',
    },
    {
      title: 'Sede no Coração Financeiro do País',
      desc: 'Atuação a partir de São Paulo com alcance nacional, conectando o pulso dos mercados às diretrizes regulatórias de Brasília.',
    },
  ]

  const portalValueProps = [
    {
      icon: Database,
      title: 'Monitoramento Contínuo',
      desc: 'Indicadores macroeconômicos fundamentais atualizados a cada 6 horas com histórico temporal e cálculo de variação.',
    },
    {
      icon: Calculator,
      title: 'Curadoria Editorial Especializada',
      desc: 'Seleção analítica das deliberações legislativas e decisões de política monetária mais relevantes para o meio empresarial.',
    },
    {
      icon: ShieldCheck,
      title: 'Inteligência Aplicada',
      desc: 'Resumos analíticos e perspectivas práticas sobre os reflexos de cada acontecimento nas margens e operações dos negócios.',
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
              Rigor analítico e inteligência econômica para decisões empresariais estratégicas.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-5 leading-relaxed font-sans">
              Com sede em <strong>São Paulo</strong>, a{' '}
              <strong>BORLIM Consultoria Empresarial</strong> assessora lideranças executivas,
              diretorias financeiras e conselhos de administração na interpretação de dados
              macroeconômicos, monitoramento da volatilidade de mercado e planejamento da transição
              da <strong>Reforma Tributária Brasileira</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Narrative: Nossa História e Posicionamento */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-slate-800 leading-relaxed font-serif text-base sm:text-lg">
            <div className="inline-block border-b-2 border-[#B8892F] pb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
                Nossa História & Propósito
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A] leading-snug">
              Fundada para suprir a necessidade de análise econômica aplicada aos negócios.
            </h2>
            <p>
              A <strong>BORLIM Consultoria Empresarial</strong> foi concebida no polo financeiro de
              São Paulo com uma diretriz clara: eliminar o distanciamento entre a teoria
              macroeconômica, a complexa legislação fiscal brasileira e a tomada de decisão
              cotidiana nas empresas.
            </p>
            <p>
              Em um ecossistema caracterizado por frequentes oscilações na política de juros do
              Banco Central, metas fiscais sob escrutínio constante e a maior reestruturação do
              sistema tributário em quase seis décadas (a{' '}
              <strong>Emenda Constitucional 132/2023</strong>), a intuição tornou-se insuficiente
              para proteger margens e garantir solidez financeira no médio e longo prazo.
            </p>
            <p>
              Nossa atuação combina o rigor técnico de modelos econométricos e monitoramento
              legislativo a uma visão pragmática voltada a resultados corporativos. Auxiliamos
              empresas na adaptação de seus modelos de negócios, na mitigação de riscos de capital e
              no aproveitamento das novas oportunidades trazidas pelo novo arcabouço fiscal e
              regulatório do país.
            </p>
          </div>

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
                Setores de Atuação
              </span>
              <p className="text-xs text-slate-700 font-sans leading-relaxed">
                Indústria de Transformação, Varejo e Distribuição, Agronegócio, Setor Financeiro,
                Tecnologia e Serviços Corporativos.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Proposta de Valor do Portal */}
        <div className="mb-20 bg-white rounded-2xl p-8 sm:p-12 border border-[#E5E0D6] shadow-sm">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
              Plataforma Digital
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
              A Proposta de Valor do Nosso Portal Econômico
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              O Portal da BORLIM Consultoria Empresarial foi desenvolvido para ser um instrumento
              diário de inteligência para gestores e profissionais de finanças, reunindo três
              pilares essenciais:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portalValueProps.map((prop, idx) => {
              const Icon = prop.icon
              return (
                <div
                  key={idx}
                  className="bg-[#F6F4EE] p-6 rounded-xl border border-[#E5E0D6] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#0B1F3A] text-[#B8892F] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {prop.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 4. Áreas de Atuação de Consultoria (Pillars Grid) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
              Serviços de Consultoria
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0B1F3A] mt-1">
              Frentes de Atuação Técnica
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Soluções personalizadas desenhadas para atender às demandas de conselhos executivos e
              diretorias financeiras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl border border-[#E5E0D6] shadow-xs hover:border-[#B8892F] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded bg-[#0B1F3A] text-[#B8892F] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#EDE9DE] text-[#0B1F3A] mb-3">
                      {pillar.tag}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-3 leading-snug">
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
        </div>

        {/* 5. Contact & Institutional Card (Navy) */}
        <div className="bg-[#0B1F3A] text-white rounded-2xl p-8 sm:p-12 border border-[#1A365D] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4A853] font-bold">
                Contato Institucional & Parcerias
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mt-2 mb-4 leading-tight">
                Inicie um diálogo consultivo com a BORLIM.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                Para solicitar diagnósticos setoriais, apresentações sobre os impactos da Reforma
                Tributária ou assessoramento macroeconômico customizado para a sua organização,
                entre em contato com nossa equipe técnica:
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
              <h3 className="font-serif text-lg font-bold text-[#F6F4EE]">Assessoria Executiva</h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Atendimento personalizado para diretorias e conselhos corporativos.
              </p>
              <a
                href="mailto:flavio@borlim.com.br?subject=Solicitação%20de%20Reunião%20de%20Consultoria%20-%20BORLIM"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B8892F] hover:bg-[#D4A853] text-[#0B1F3A] text-xs font-mono font-bold uppercase tracking-wider rounded transition-all shadow"
              >
                <span>Solicitar Reunião Técnica</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
