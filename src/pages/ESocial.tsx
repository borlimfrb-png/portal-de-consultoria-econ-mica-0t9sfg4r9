/**
 * Página eSocial (/esocial) — Portal Borlim.
 * Padrão editorial: hero azul-marinho #082852, fundo azulado #F0F4F8,
 * cards brancos, verde #16A34A/#15803D nos CTAs e destaques.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Phone,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  Info,
  Network,
  Building2,
  CalendarClock,
  AlertTriangle,
  ListChecks,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  ShieldAlert,
  Users,
  FileText,
  Layers,
} from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/5517997650672?text=' +
  encodeURIComponent(
    'Olá! Gostaria de saber mais sobre eSocial e organização da folha — Borlim Consultoria.',
  )
const GESTAO_EMPRESARIAL_URL = 'https://gestao.borlim.com.br'

/* ============================ DADOS DE CONTEÚDO ============================ */

const EVENTOS_ESOCIAL = [
  {
    codigo: 'S-2200',
    nome: 'Admissão',
    desc: 'Cada contratação: dados do empregado, cargo, salário, jornada e regime. Transmitido antes do início do trabalho.',
  },
  {
    codigo: 'S-2201',
    nome: 'Exame toxicológico',
    desc: 'Resultado do exame de motoristas profissionais (categorias C, D e E), com prazos próprios de envio.',
  },
  {
    codigo: 'S-2230',
    nome: 'Afastamento temporário',
    desc: 'Licenças, atestados e afastamentos previdenciários que suspendem ou interrompem o contrato.',
  },
  {
    codigo: 'S-2240',
    nome: 'Exposição a agentes nocivos',
    desc: 'Condições ambientais de trabalho — base do adicional de insalubridade/periculosidade e da aposentadoria especial.',
  },
  {
    codigo: 'S-2299',
    nome: 'Desligamento',
    desc: 'Rescisão: motivo, verbas, aviso prévio, data projetada. É ele que libera o seguro-desemprego e o saque do FGTS.',
  },
  {
    codigo: 'S-1299',
    nome: 'Fechamento dos eventos periódicos',
    desc: 'Encerra a competência: depois dele, a folha daquele mês fica fechada para alterações.',
  },
  {
    codigo: 'S-1200 / S-1210',
    nome: 'Folha mensal (remuneração e pagamentos)',
    desc: 'S-1200 envia as verbas de cada empregado; S-1210 informa os pagamentos efetuados com a data real do crédito.',
  },
]

const PRAZOS_ESOCIAL = [
  {
    evento: 'S-2200 (admissão)',
    prazo: 'Até o dia 15 do mês seguinte, e sempre ANTES do primeiro dia de trabalho.',
  },
  {
    evento: 'S-2299 (desligamento)',
    prazo: 'Até o dia 15 do mês seguinte à rescisão — e antes do pagamento das verbas.',
  },
  {
    evento: 'S-1200 / S-1210 (folha)',
    prazo: 'Até o dia 15 do mês seguinte à competência pagá.',
  },
  {
    evento: 'S-1299 (fechamento)',
    prazo: 'Depois de todos os eventos da competência, ainda até o dia 15 do mês seguinte.',
  },
  {
    evento: 'S-2240 (agentes nocivos)',
    prazo: 'Até o dia 15 do mês seguinte à admissão ou à mudança de função.',
  },
  {
    evento: 'S-2230 (afastamento)',
    prazo: 'Até o dia 15 do mês seguinte — afastamentos previdenciários têm regras específicas.',
  },
]

const ETAPAS_IMPLANTACAO = [
  {
    etapa: '1. Cadastro',
    desc: 'Registrar a empresa no portal do eSocial, obter certificado digital (e-CNPJ) e perfil de tributação.',
  },
  {
    etapa: '2. Tabelas',
    desc: 'Carregar tabelas de eventos não periódicos: cargos, funções, horários e turnos, rubricas (códigos de verba).',
  },
  {
    etapa: '3. Empregados',
    desc: 'Enviar eventos cadastrais (S-2200, S-2205, S-2206): admissões, alterações contratuais e dados cadastrais.',
  },
  {
    etapa: '4. Folha mensal',
    desc: 'Transmitir os eventos periódicos (S-1200/1210/1299) todo mês — é a rotina que passa a valer permanentemente.',
  },
]

const RISCOS_MULTAS = [
  {
    titulo: 'Multas por atraso',
    desc: 'Empresas com lucro: R$ 2,00 por dia-calendário por empregado (folha) e R$ 20,00 por dia por evento de segurança e saúde.',
  },
  {
    titulo: 'Multas por inconsistência',
    desc: 'Informação incorreta ou incompleta: R$ 6,00 por empregado/evento não prestado, ou R$ 3,00 quando corrigida fora do prazo.',
  },
  {
    titulo: 'Falta de admissão/desligamento',
    desc: 'Não informar admissão: R$ 3.000,00 por empregado; não informar desligamento: R$ 1.000,00 (grupos já fiscalizados).',
  },
  {
    titulo: 'Auto de infração trabalhista',
    desc: 'Divergências no S-2200/2299 viram notificação da fiscalização do trabalho, com autos de infração e ações rescisórias.',
  },
]

const FAQ_ESOCIAL = [
  {
    q: 'O Simples Nacional está obrigado ao eSocial?',
    a: 'Sim. Desde 2019 as microempresas e EPPs do Simples transmitem o eSocial pela versão simplificada. Pela LC 123/2006, o Simples tem apenas a dispensa de alguns eventos (por exemplo, S-2250 e S-2260) e o uso do módulo folha web simplificado — a obrigação de transmitir S-2200, S-1200 e S-1299 permanece.',
  },
  {
    q: 'O que acontece se não enviar a tempo?',
    a: 'Há multa por atraso (R$ 2,00 por dia por empregado na folha, R$ 20,00 por dia em eventos de SST), bloqueio do CAGED e risco de auto de infração. Atrasos reincidentes elevam o enquadramento fiscal da empresa.',
  },
  {
    q: 'Preciso de certificado digital?',
    a: 'Sim, para a maioria dos perfis: o e-CNPJ é exigido para assinar os eventos. O MEI é a exceção relevante — ele pode usar código de acesso em vez de certificado.',
  },
  {
    q: 'Preciso dispensar meu contador?',
    a: 'Não. O eSocial não substitui a escrita fiscal: ele unifica a informação trabalhista/previdenciária. O contador continua apurando guias, folha e obrigações — o que muda é que a origem de tudo é o evento transmitido.',
  },
  {
    q: 'O eSocial substitui a folha de pagamento?',
    a: 'Não. A folha continua sendo um documento interno e contratual. O eSocial é a DECLARAÇÃO dela ao governo: os valores no S-1200 precisam bater centavo por centavo com a folha interna e com o pagamento no S-1210.',
  },
  {
    q: 'Doméstico e empregador pessoa física também estão obrigados?',
    a: 'Sim. O eSocial Doméstico existe desde 2015 e funciona pelo app do governo. Empregador pessoa física com empregado doméstico transmite admissão, folha e desligamento, com prazos próprios.',
  },
  {
    q: 'O que é o "eSocial Folha unificado"?',
    a: 'A simplificação de 2023-2025 que reduziu a quantidade de eventos de folha (do antigo modelo em fases para um único layout unificado), com prazos concentrados no dia 15 do mês seguinte e menos eventos duplicados (por exemplo, extinção do antigo S-1202/1207 para a maioria dos perfis).',
  },
]

/* ================================ PÁGINA ================================ */

export default function ESocial() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* HERO */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-[450px] h-[450px] bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-28 -left-28 w-[450px] h-[450px] bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <Network className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Escrituração Digital das Obrigações Fiscais — BORLIM Consultoria
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              eSocial: o que é e como se organizar
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              O sistema unificado do governo para enviar informações trabalhistas, previdenciárias e
              fiscais — explicado para o empresário, sem juridiquês.
            </p>
            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Desde o <strong>eSocial Folha unificado</strong> (2023-2025), a rotina do RH e da
              contabilidade convergiu para um único fluxo mensal com prazo no{' '}
              <strong>dia 15</strong>. Aqui você entende{' '}
              <strong>quem está obrigado, quais eventos transmitir, os prazos, as multas</strong> e
              o passo a passo prático de organização.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href={GESTAO_EMPRESARIAL_URL}
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
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-[#082852] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group"
              >
                <Phone className="w-4 h-4 text-[#16A34A]" />
                <span>Falar com o Especialista</span>
                <ArrowRight className="w-4 h-4 text-[#082852] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=D%C3%BAvidas%20sobre%20o%20eSocial%20-%20Borlim"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE É */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-lg">
          <div className="flex items-start gap-3.5 mb-5">
            <div className="p-2.5 rounded-xl bg-[#082852] text-[#22C55E] shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                O que é o eSocial
              </h2>
              <p className="text-xs font-mono uppercase tracking-wider text-[#15803D] font-bold mt-0.5">
                Escrituração Digital das Obrigações Fiscais, Previdenciárias e Trabalhistas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
              <p>
                O <strong>eSocial</strong> é o sistema do governo federal que{' '}
                <strong>
                  unifica o envio de informações trabalhistas, previdenciárias e fiscais
                </strong>{' '}
                sobre os vínculos de trabalho. Em vez de entregar separadamente CAGED, GFIP, folha
                resumida ao INSS eLivro de registro em papel, a empresa transmite um único conjunto
                de eventos digitais — e o governo cruza tudo com FGTS, INSS, IRRF e fiscalização.
              </p>
              <p>
                Na prática, cada movimento da folha virou um <strong>evento</strong> com prazo
                próprio: admissão (S-2200), afastamento (S-2230), desligamento (S-2299), folha
                mensal (S-1200/S-1210) e fechamento (S-1299). Transmitir atrasado, com divergência
                ou não transmitir gera <strong>multa automática</strong>.
              </p>
            </div>

            <div className="bg-[#F0F4F8] p-5 rounded-2xl border border-stone-200">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#15803D] flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Quem está obrigado
              </span>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                {[
                  'Empresas com empregados CLT — todos os portes e setores, incluindo o Simples Nacional e o MEI com empregado',
                  'Órgãos públicos e entidades sem fins lucrativos com pessoal próprio',
                  'Empregadores pessoa física (doméstico, segurado especial)',
                  'Contratantes de serviços com retenção (obra, serviço com 11-20% retido)',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Os Eventos do eSocial
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Cada movimento da folha é um evento
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Os códigos que o empresário precisa conhecer — e o que cada um comunica ao governo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTOS_ESOCIAL.map((ev) => (
            <div
              key={ev.codigo}
              className="p-6 bg-white rounded-2xl border border-stone-200 hover:border-[#16A34A] transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm font-bold text-[#082852] bg-[#F0F4F8] px-2.5 py-1 rounded-lg border border-stone-200">
                  {ev.codigo}
                </span>
                <span className="font-serif text-base font-bold text-[#082852]">{ev.nome}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {ev.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRAZOS + ETAPAS */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold flex items-center gap-2">
              <CalendarClock className="w-4 h-4" /> Prazos de envio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2 mb-6">
              A régua do dia 15
            </h2>
            <div className="space-y-3">
              {PRAZOS_ESOCIAL.map((p) => (
                <div
                  key={p.evento}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 p-4 bg-[#F0F4F8]/60 rounded-xl border border-stone-200"
                >
                  <span className="font-mono text-xs font-bold text-[#082852]">{p.evento}</span>
                  <span className="text-xs text-slate-600 sm:text-right sm:ml-4">{p.prazo}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" /> Implantação
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2 mb-6">
              As 4 etapas de implantação
            </h2>
            <div className="space-y-3">
              {ETAPAS_IMPLANTACAO.map((et) => (
                <div
                  key={et.etapa}
                  className="p-4 rounded-xl border-l-4 border-[#16A34A] bg-[#F0F4F8]/60 border border-stone-200"
                >
                  <span className="font-mono text-xs font-bold text-[#082852] block">
                    {et.etapa}
                  </span>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{et.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MUDANÇAS + PASSO A PASSO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> O que mudou
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2 mb-4">
              eSocial Folha unificado
            </h2>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  Menos eventos de folha: o antigo modelo em fases (leiautes 2.x/3.x) foi
                  substituído por um <strong>leiaute único</strong> com menos duplicação de
                  informação.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  Prazo concentrado no <strong>dia 15 do mês seguinte</strong> para folha, admissões
                  e desligamentos — antes espalhados em datas diferentes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  O <strong>DS-100</strong> substituiu o antigo registro mensal da folha em alguns
                  perfis, e o envio passou a ser <strong>em um único arquivo</strong> por
                  competência nos sistemas simplificados.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  Desligamentos passaram a ser exigidos <strong>antes do pagamento</strong> das
                  verbas rescisórias (o S-2299 antecipado), acelerando a rotina do RH.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold flex items-center gap-2">
              <ListChecks className="w-4 h-4" /> Passo a passo do empresário
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2 mb-4">
              Como se organizar na prática
            </h2>
            <ol className="space-y-3 text-sm text-slate-700 leading-relaxed font-sans">
              {[
                'Organize os dados do RH: documentos dos empregados, CTPS digital, cargo, salário, jornada, horário e dependentes.',
                'Mantenha as tabelas do sistema atualizadas: rubricas (códigos de verba), cargos, funções, horários e turnos.',
                'Transmita a admissão (S-2200) ANTES do primeiro dia de trabalho — nunca depois.',
                'Transmita a folha mensal (S-1200/S-1210) e o fechamento (S-1299) até o dia 15 do mês seguinte.',
                'Confira os relatórios de inconsistência após cada transmissão — erro pequeno hoje vira multa amanhã.',
                'Guarde a folha interna conciliada: o que está no eSocial precisa bater com o que foi pago.',
              ].map((passo, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#082852] text-[#22C55E] text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{passo}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* RISCOS DE MULTAS */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Riscos e Multas
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              O que custa atrasar ou errar no eSocial
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              As penalidades são automáticas e aplicadas por competência — o melhor remédio é a
              rotina organizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RISCOS_MULTAS.map((r) => (
              <div
                key={r.titulo}
                className="p-6 sm:p-7 bg-[#F0F4F8]/60 rounded-2xl border border-stone-200 hover:border-amber-400 transition-all group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#082852]">
                      {r.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO A BORLIM AJUDA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Sinergia Integrada BORLIM
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Como a Borlim ajuda com o eSocial
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            O eSocial exige disciplina de dados e de calendário — exatamente o que as nossas frentes
            de gestão organizam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <CalendarClock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 mb-3 inline-block">
                Agenda Tributária
              </span>
              <h3 className="font-serif text-xl font-bold text-[#082852] mb-3">
                Nenhum prazo do eSocial esquecido
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                Nossa <strong>Agenda Tributária</strong> reúne os vencimentos de folha, guias e
                obrigações acessórias — incluindo o dia 15 do eSocial — em um calendário único para
                o empresário acompanhar.
              </p>
            </div>
            <Link
              to="/agenda-tributaria"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all group"
            >
              <span>Ver Agenda Tributária</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 mb-3 inline-block">
                Gestão Financeira
              </span>
              <h3 className="font-serif text-xl font-bold text-[#082852] mb-3">
                Custo de folha sob controle
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                A <strong>Gestão Financeira</strong> coloca encargos, pró-labore, férias e rescisões
                no orçamento: o empresário vê o custo real do eSocial — não só o evento, mas o
                impacto no caixa.
              </p>
            </div>
            <Link
              to="/gestao-financeira"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all group"
            >
              <span>Ver Gestão Financeira</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Dúvidas Frequentes
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              FAQ do eSocial
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ESOCIAL.map((f, i) => (
              <div
                key={f.q}
                className="rounded-2xl border border-stone-200 bg-[#F0F4F8]/60 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left hover:bg-white/60 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-[#082852]">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#16A34A] shrink-0 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTA INFORMATIVA + CTA FINAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Conteúdo educativo
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Nota informativa
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Esta página tem finalidade <strong>educativa e informativa</strong> e não substitui
                a leitura da legislação vigente (Decreto 10.854/2021, Portarias do Ministério do
                Trabalho e leiautes oficiais do eSocial) nem a orientação do contador da empresa.
                Prazos, leiautes e valores de multa podem ser atualizados por atos normativos.
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
                  href={WHATSAPP_URL}
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
              <h3 className="font-serif text-lg font-bold text-white">
                eSocial sem sustos na fiscalização
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Converse com o nosso economista e organize a rotina de transmissão.
              </p>
              <div className="w-full space-y-3">
                <a
                  href={GESTAO_EMPRESARIAL_URL}
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
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Falar no WhatsApp (17) 99765-0672</span>
                </a>
                <Link
                  to="/trabalhista"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-all border border-white/20"
                >
                  <span>Ver página Trabalhista</span>
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
