import {
  TrendingUp,
  Scale,
  Building,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldAlert,
  BarChart3,
  Award,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Sobre() {
  const pillars = [
    {
      title: 'Análise Macroeconômica Aplicada',
      icon: TrendingUp,
      desc: 'Modelagem econométrica para previsão de taxas de juros, inflação, índices de custos industriais e taxa de câmbio, desenhada especificamente para suportar o planejamento financeiro corporativo.',
    },
    {
      title: 'Consultoria e Transição da Reforma Tributária',
      icon: Scale,
      desc: 'Mapeamento de riscos e oportunidades decorrentes do IBS, CBS e Imposto Seletivo. Simulação de fluxo de caixa sob a mecânica de Split Payment e readequação de contratos comerciais.',
    },
    {
      title: 'Planejamento e Cenários Estratégicos',
      icon: BarChart3,
      desc: 'Construção de cenários de estresse, análise de sensibilidade de margens operacionais e assessoramento em decisões de alocação de capital e estrutura de capital.',
    },
  ]

  const differentials = [
    'Rigor metodológico com dados oficiais do Banco Central do Brasil e IBGE',
    'Monitoramento contínuo das votações e regulamentações no Congresso Nacional',
    'Abordagem orientada a resultados práticos para diretores financeiros e CEOs',
    'Relatórios técnicos sintéticos com linguagem clara e direta',
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Hero (Navy) */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-[#1A365D] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#B8892F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#B8892F]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4A853] font-bold">
                Sobre o Portal & Consultoria
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE] leading-tight">
              Inteligência econômica para antecipar transformações de mercado.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans">
              Somos uma consultoria empresarial especializada em traduzir a complexidade
              macroeconômica e regulatória brasileira em decisões financeiras seguras e rentáveis.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Narrative & Mission (White) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed font-serif text-base sm:text-lg">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A] mb-4">
              Nossa Proposta de Valor
            </h2>
            <p>
              O ambiente de negócios no Brasil é marcado por frequentes oscilações na política
              monetária, inflação e profundas reestruturações no arcabouço fiscal e tributário. Em
              cenários assim, a intuição já não basta para preservar margens e sustentar o
              crescimento.
            </p>
            <p>
              O <strong>Portal de Consultoria Econômica</strong> nasceu com a missão de fornecer às
              lideranças empresariais um canal direto, confiável e automatizado com os dados
              fundamentais da economia brasileira, complementado por análises estratégicas sobre a{' '}
              <strong>Reforma Tributária (EC 132/2023)</strong>.
            </p>
            <p>
              Nossa equipe atua lado a lado com conselhos diretivos e departamentos financeiros,
              convertendo dados brutos em inteligência acionável para precificação, renegociação de
              dívidas e adaptação às novas obrigações fiscais.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#EDE9DE] p-8 rounded-xl border border-[#E5E0D6] space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#0B1F3A]">Por Que Nos Escolher?</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
              {differentials.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B8892F] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[#E0DBCF]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                Foco Setorial
              </span>
              <p className="text-xs text-slate-600">
                Indústria, Serviços, Varejo, Agronegócio e Real Estate.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Areas of Expertise (Pillars Grid) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8892F] font-bold">
              Áreas de Atuação
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0B1F3A] mt-1">
              Pilares de Consultoria
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl border border-[#E5E0D6] card-subtle-shadow hover:border-[#B8892F] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded bg-[#0B1F3A] text-[#B8892F] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 4. Contact & Leadership Section */}
        <div className="bg-[#0B1F3A] text-white rounded-2xl p-8 sm:p-12 border border-[#1A365D] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4A853] font-bold">
                Fale com Nossa Equipe
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mt-2 mb-4">
                Pronto para fortalecer a estratégia da sua empresa?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Agende uma reunião inicial de diagnóstico sem compromisso para analisarmos os
                impactos econômicos e tributários no seu setor.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#D4A853] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#B8892F]" />
                  <span>flavio@borlim.com.br</span>
                </a>
                <div className="flex items-center gap-3 text-slate-200">
                  <Phone className="w-4 h-4 text-[#B8892F]" />
                  <span>+55 (11) 0000-0000</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <MapPin className="w-4 h-4 text-[#B8892F]" />
                  <span>São Paulo — SP, Brasil</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#102A4E] p-8 rounded-xl border border-[#1E4377] text-center">
              <div className="w-16 h-16 rounded-full bg-[#0B1F3A] border-2 border-[#B8892F] flex items-center justify-center text-[#B8892F] font-serif text-2xl font-bold mb-4">
                P
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F4EE]">Atendimento Executivo</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">Consultoria Econômica & Tributária</p>
              <a
                href="mailto:flavio@borlim.com.br?subject=Agendamento%20de%20Reunião%20de%20Consultoria"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B8892F] hover:bg-[#D4A853] text-[#0B1F3A] text-xs font-mono font-bold uppercase tracking-wider rounded transition-all"
              >
                <span>Solicitar Contato Técnico</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
