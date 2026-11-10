/**
 * Página Trabalhista (/trabalhista) — Escala 5x2 explicada em detalhes.
 * Padrão editorial do portal: hero tecnológico com grid/glow, seções em cards,
 * cores azul (#082852) / verde (#16A34A, #22C55E) / branco da Borlim.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Landmark,
  Scale,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Clock,
  Moon,
  FileWarning,
  Gavel,
  Calendar,
  Calculator,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Users,
  Timer,
  Wallet,
  TrendingUp,
  Info,
} from 'lucide-react'
import {
  ESCALAS_COMPARATIVAS,
  PONTOS_ATENCAO,
  FAQ_TRABALHISTA,
  WHATSAPP_URL_TRABALHISTA,
  GESTAO_EMPRESARIAL_URL,
} from '@/data/trabalhista'
import {
  CalculadoraFerias,
  CalculadoraRescisao,
} from '@/components/trabalhista/CalculadoraFeriasRescisao'

const ICONE_MAP: Record<string, typeof Clock> = {
  Clock,
  Moon,
  FileWarning,
  Gavel,
}

export default function Trabalhista() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const whatsappUrl = WHATSAPP_URL_TRABALHISTA
  const balanceAnalysisUrl = GESTAO_EMPRESARIAL_URL

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. HERO TECNOLÓGICO */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-[450px] h-[450px] bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-28 -left-28 w-[450px] h-[450px] bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <Users className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Gestão Trabalhista & Folha — BORLIM Consultoria
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Escala 5x2: como funciona
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              A escala mais comum do Brasil explicada do zero: jornada, repouso semanal remunerado,
              DSR, horas extras e os cuidados que o empregador não pode ignorar.
            </p>
            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Na escala <strong>5x2</strong>, o empregado trabalha <strong>5 dias</strong> e
              descansa <strong>2</strong>. É o padrão de referência da <strong>CLT</strong> (arts.
              7º, XV e 67, da Constituição Federal; arts. 59 a 74 da CLT) — e a régua sobre a qual
              incidem <strong>horas extras, DSR, adicional noturno e banco de horas</strong>. Aqui
              você entende o cálculo passo a passo, com exemplos numéricos e sem juridiquês.
            </p>

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

              <a
                href="mailto:flavio@borlim.com.br?subject=D%C3%BAvidas%20sobre%20Escala%205x2%20e%20Gest%C3%A3o%20Trabalhista%20-%20Borlim"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>

            {/* Atalhos para as calculadoras */}
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href="#calculadora-ferias"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-[#22C55E]/40 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all group"
              >
                <Calculator className="w-4 h-4 text-[#22C55E]" />
                <span>Calculadora de Férias</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#calculadora-rescisao"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-[#22C55E]/40 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all group"
              >
                <Wallet className="w-4 h-4 text-[#22C55E]" />
                <span>Calculadora de Rescisão</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O QUE É A ESCALA 5X2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-lg">
          <div className="flex items-start gap-3.5 mb-5">
            <div className="p-2.5 rounded-xl bg-[#082852] text-[#22C55E] shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                O que é a escala 5x2
              </h2>
              <p className="text-xs font-mono uppercase tracking-wider text-[#15803D] font-bold mt-0.5">
                Referência legal: CF art. 7º, XV e 67 · CLT arts. 59 a 74
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
              <p>
                Na escala 5x2, o empregado cumpre <strong>5 dias de trabalho</strong> seguidos de{' '}
                <strong>2 dias de descanso</strong>. Um desses dias de descanso é o{' '}
                <strong>repouso semanal remunerado (RSR)</strong>, garantido pelo art. 7º, XV, da
                Constituição Federal e pelo art. 67 da CLT: a cada semana, um dia de folga
                remunerado, preferencialmente aos domingos. O outro dia é o <strong>sábado</strong>{' '}
                (ou o dia acordado em convenção coletiva) — que na 5x2 fixa funciona como{' '}
                <strong>DSR</strong>
                (&ldquo;descanso semanal remunerado&rdquo; na prática do folha: o dia de folga que o
                salário mensal já cobre).
              </p>
              <p>
                É a <strong>escala mais comum do Brasil</strong>: escritórios, indústrias, comércio
                de balcão e a maior parte das funções administrativas seguem o padrão. Ela pode ser{' '}
                <strong>fixa</strong> — de segunda a sexta, com folga em sábado e domingo — ou{' '}
                <strong>alternada</strong>, quando os dias de folga giram (por exemplo, folga em
                domingos alternados), mantendo sempre 5 dias de trabalho para cada 2 de descanso.
              </p>
              <p>
                O limite legal de jornada continua valendo: <strong>44 horas semanais</strong> e{' '}
                <strong>8 horas diárias</strong> (ou 220 horas mensais como régua de folha), com
                intervalo intrajornada de no mínimo 1 hora quando a jornada ultrapassa 6 horas.
              </p>
            </div>

            {/* Diagrama da semana */}
            <div className="bg-[#F0F4F8] p-5 rounded-2xl border border-stone-200">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#15803D]">
                Semana tipo (folga fixa)
              </span>
              <div className="mt-4 space-y-2">
                {[
                  { dia: 'Segunda', tipo: 'trabalho' },
                  { dia: 'Terça', tipo: 'trabalho' },
                  { dia: 'Quarta', tipo: 'trabalho' },
                  { dia: 'Quinta', tipo: 'trabalho' },
                  { dia: 'Sexta', tipo: 'trabalho' },
                  { dia: 'Sábado', tipo: 'folga-dsr' },
                  { dia: 'Domingo', tipo: 'folga-rsr' },
                ].map((d) => (
                  <div
                    key={d.dia}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-bold border ${
                      d.tipo === 'trabalho'
                        ? 'bg-[#082852] text-white border-[#082852]'
                        : d.tipo === 'folga-dsr'
                          ? 'bg-[#16A34A]/15 text-[#15803D] border-[#22C55E]/40'
                          : 'bg-white text-slate-600 border-stone-200'
                    }`}
                  >
                    <span>{d.dia}</span>
                    <span className="text-[10px] uppercase tracking-wider">
                      {d.tipo === 'trabalho'
                        ? '8h de trabalho'
                        : d.tipo === 'folga-dsr'
                          ? 'folga (DSR)'
                          : 'folga (RSR)'}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-3 font-sans leading-snug">
                5 × 8h = 40h de trabalho semanal + repouso remunerado. Régua mensal de folha:{' '}
                <strong className="text-[#082852]">220 horas</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMO CALCULAR NA PRÁTICA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Passo a Passo do Cálculo
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Como calcular a escala 5x2 na prática
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Dias trabalhados, horas mensais, valor da hora, DSR e feriados — com um exemplo numérico
            completo de salário de R$ 2.500,00.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              icone: Calendar,
              titulo: 'Dias trabalhados no mês',
              valor: '21 a 23 dias',
              desc: 'Varia conforme o calendário: 22 é o número mais comum. Feriados em dias úteis reduzem; os dias extras de virada de semana aumentam.',
            },
            {
              icone: Timer,
              titulo: 'Horas mensais',
              valor: '220 h',
              desc: 'Régua padrão da folha: 8h/dia × 5 dias × 5 semanas + repouso. É o divisor usado para achar o valor da hora (salário ÷ 220).',
            },
            {
              icone: ShieldCheck,
              titulo: 'RSR / DSR',
              valor: 'Sáb + Dom',
              desc: 'Todo dia de folga é remunerado. No mensalista, já está dentro do salário; nas horas extras e comissões, é acrescido proporcionalmente.',
            },
            {
              icone: Sparkles,
              titulo: 'Feriados',
              valor: 'Não reduzem',
              desc: 'Feriado em dia útil é dia pago sem trabalhar. Feriado que cai na folga não gera pagamento em dobro — salvo previsão em convenção coletiva.',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <card.icone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#082852] mb-1">{card.titulo}</h3>
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 mb-3">
                {card.valor}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Exemplo numérico: R$ 2.500 */}
        <div className="bg-[#082852] rounded-3xl p-6 sm:p-10 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#16A34A]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-6">
              <Calculator className="w-5 h-5 text-[#22C55E]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Exemplo numérico completo — salário de R$ 2.500,00 (mensalista)
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  {
                    passo: '1',
                    titulo: 'Valor da hora normal',
                    conta: 'R$ 2.500,00 ÷ 220 h',
                    resultado: '= R$ 11,36 por hora',
                  },
                  {
                    passo: '2',
                    titulo: 'Dias úteis do mês (ex.: 22 dias úteis, 8 folgas)',
                    conta: '22 dias úteis × R$ 11,36 × 8h',
                    resultado: '= R$ 2.000,00 (dias úteis)',
                  },
                  {
                    passo: '3',
                    titulo: 'Valor do DSR (folgas remuneradas)',
                    conta: 'R$ 2.000,00 ÷ 22 × 8',
                    resultado: '= R$ 727,27 (proporção 8/30 do mês)',
                  },
                  {
                    passo: '4',
                    titulo: 'Total do mês (conferência)',
                    conta: 'R$ 2.000,00 + R$ 500,00 de DSR proporcional',
                    resultado: '= R$ 2.500,00 (salário contratual)',
                  },
                ].map((linha) => (
                  <div
                    key={linha.passo}
                    className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#16A34A] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {linha.passo}
                    </span>
                    <div className="flex-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                        {linha.titulo}
                      </span>
                      <span className="text-sm text-slate-200 font-mono block mt-1">
                        {linha.conta}
                      </span>
                      <span className="text-sm text-white font-mono font-bold">
                        {linha.resultado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 p-6 rounded-2xl border border-white/15">
                <span className="text-xs font-mono uppercase tracking-wider text-[#22C55E] font-bold">
                  Nota didática
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-sans mt-3">
                  Para o <strong>mensalista</strong>, o salário de R$ 2.500,00 já inclui jornada +
                  DSR: a conta acima é a <strong>decomposição</strong> que explica de onde vem o
                  número. O cálculo do DSR muda de papel quando há{' '}
                  <strong>hora extra ou comissão</strong>: essas variáveis precisam ser{' '}
                  <strong>refletidas também nas folgas</strong>. É esse reflexo que a próxima seção
                  mostra.
                </p>
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Dias úteis</span>
                    <span className="text-white font-bold">22</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Folgas (sáb + dom)</span>
                    <span className="text-white font-bold">8</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Horas contratadas</span>
                    <span className="text-white font-bold">220 h</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Valor da hora</span>
                    <span className="text-[#22C55E] font-bold">R$ 11,36</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HORAS EXTRAS */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Jornada Excedente
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Horas extras na escala 5x2
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Adicionais de 50% em dias úteis e 100% em domingos e feriados — e o reflexo
              obrigatório no descanso semanal remunerado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 sm:p-7 bg-[#F0F4F8]/60 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#082852]">
                  +50% — dias úteis (seg a sáb)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mb-3">
                Hora extra prestada em dia útil (ou sábado trabalhado, quando a folga for no
                domingo) recebe o <strong>adicional de 50%</strong> sobre o valor da hora normal
                (art. 59 da CLT). Limite legal: <strong>2 horas extras por dia</strong>.
              </p>
              <div className="p-3 bg-white rounded-xl border border-stone-200 font-mono text-xs">
                <span className="text-slate-500">Hora extra útil (R$ 11,36 base):</span>
                <span className="block text-[#082852] font-bold mt-1">
                  R$ 11,36 × 1,5 = R$ 17,04 / hora
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 bg-[#F0F4F8]/60 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#082852]">
                  +100% — domingos e feriados
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mb-3">
                Quando a folga da 5x2 é <strong>alternada</strong> e o empregado é convocado em{' '}
                <strong>domingo ou feriado</strong>, a hora extra recebe o{' '}
                <strong>adicional de 100%</strong> (o dobro da hora normal). Em convenções
                coletivas, o percentual pode ser maior.
              </p>
              <div className="p-3 bg-white rounded-xl border border-stone-200 font-mono text-xs">
                <span className="text-slate-500">Hora extra em domingo (R$ 11,36 base):</span>
                <span className="block text-[#082852] font-bold mt-1">
                  R$ 11,36 × 2 = R$ 22,72 / hora
                </span>
              </div>
            </div>
          </div>

          {/* Reflexo no DSR com exemplo numérico */}
          <div className="p-6 sm:p-8 bg-[#082852] rounded-2xl border border-[#0B3B7A] shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#16A34A]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Wallet className="w-5 h-5 text-[#22C55E]" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    Reflexo obrigatório no DSR
                  </h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  As horas extras do mês <strong>integraram o valor do descanso</strong>. Para quem
                  folga no domingo (1 folga semanal), o reflexo é:{' '}
                  <strong>soma das horas extras ÷ dias úteis do mês × domingos do mês</strong>.
                  Ignorar esse reflexo é uma das principais causas de autuação trabalhista.
                </p>
              </div>

              <div className="bg-white/10 p-5 sm:p-6 rounded-2xl border border-white/15 font-mono text-xs sm:text-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-[#22C55E] font-bold block mb-3">
                  Exemplo — 10 h extras úteis no mês de 22 dias úteis e 4 domingos
                </span>
                <div className="space-y-2 text-slate-200">
                  <div className="flex justify-between">
                    <span>10 h × R$ 17,04</span>
                    <span className="text-white font-bold">R$ 170,40</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reflexo DSR (÷22 × 4)</span>
                    <span className="text-white font-bold">R$ 30,98</span>
                  </div>
                  <div className="border-t border-white/15 pt-2 flex justify-between text-white font-bold">
                    <span>Total a pagar nas HE</span>
                    <span className="text-[#22C55E]">R$ 201,38</span>
                  </div>
                  <div className="text-[10px] text-slate-400 leading-snug pt-1 font-sans">
                    Sem o reflexo, o empregador pagaria só R$ 170,40 — e deveria R$ 30,98 a mais por
                    mês de DSR.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BANCO DE HORAS E ESCALAS ALTERNATIVAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Flexibilidade com Controle
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Banco de horas e escalas alternativas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Como a 5x2 se compara com outras escalas usadas no Brasil — e quando o banco de horas
            substitui (ou não) o pagamento de horas extras.
          </p>
        </div>

        {/* Banco de horas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 sm:p-7 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center">
                <Timer className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#082852]">
                Banco de horas (CLT art. 59, §2º)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              Permite <strong>compensar</strong> jornada: horas a mais em um dia entram no banco e
              são &ldquo;retiradas&rdquo; como folga em outro dia, no mesmo mês (acordo individual)
              ou em até <strong>12 meses</strong> (acordo ou convenção coletiva). O que o banco de
              horas <strong>não</strong> faz: apagar saldo ao fim do período — saldo positivo é pago
              como hora extra; saldo negativo sem previsão não pode ser descontado. Para a 5x2, o
              banco de horas é comum para absorver picos de produção sem estourar a folha.
            </p>
          </div>
          <div className="p-6 sm:p-7 bg-emerald-50 rounded-2xl border border-emerald-200">
            <h4 className="font-serif text-base font-bold text-[#082852] mb-2">Regra de bolso</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              Banco de horas <strong>compensa</strong>; hora extra <strong>paga</strong>. Se o pico
              de demanda é recorrente todo mês, ele não é banco de horas — é jornada extra
              contratual que vira passivo quando não é remunerada.
            </p>
          </div>
        </div>

        {/* Tabela comparativa de escalas */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-[#082852] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-[#22C55E]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                Comparativo de escalas: dias trabalhados e descanso
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono font-bold bg-[#16A34A] text-white px-3 py-1 rounded">
              CLT · turnos e revezamento
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F0F4F8] border-b border-stone-200">
                  {[
                    'Escala',
                    'Ritmo',
                    'Dias trabalhados',
                    'Descanso',
                    'Horas semanais',
                    'Destaque',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-600 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {ESCALAS_COMPARATIVAS.map((esc) => (
                  <tr
                    key={esc.nome}
                    className={`hover:bg-stone-50/70 transition-colors ${
                      esc.nome === '5x2' ? 'bg-emerald-50/50' : ''
                    }`}
                  >
                    <td className="px-4 sm:px-5 py-4">
                      <span
                        className={`font-mono text-base font-bold ${
                          esc.nome === '5x2' ? 'text-[#16A34A]' : 'text-[#082852]'
                        }`}
                      >
                        {esc.nome}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-xs sm:text-sm text-slate-700 font-sans">
                      {esc.ritmo}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-xs sm:text-sm font-mono text-[#082852] font-bold whitespace-nowrap">
                      {esc.diasTrabalhados}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-xs sm:text-sm text-slate-700 font-sans">
                      {esc.descanso}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-xs sm:text-sm text-slate-700 font-sans whitespace-nowrap">
                      {esc.horasSemanais}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-xs text-[#15803D] font-sans font-medium">
                      {esc.destaque}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5B. CALCULADORA DE FÉRIAS */}
      <section
        id="calculadora-ferias"
        className="bg-white py-16 sm:py-20 border-y border-stone-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Calculadora Interativa
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Calculadora de Férias
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Férias proporcionais, 1/3 constitucional, abono pecuniário, INSS e IRRF das tabelas
              vigentes — com memória de cálculo passo a passo. Cálculo ao vivo no navegador.
            </p>
          </div>
          <CalculadoraFerias />
        </div>
      </section>

      {/* 5C. CALCULADORA DE RESCISÃO */}
      <section
        id="calculadora-rescisao"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Calculadora Interativa
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Calculadora de Rescisão
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Escolha o motivo da rescisão e veja as verbas mudarem: saldo de salário, 13º e férias
            proporcionais, aviso prévio, multa e saque do FGTS — tudo passo a passo.
          </p>
        </div>
        <CalculadoraRescisao />
      </section>

      {/* 6. PONTOS DE ATENÇÃO PARA O EMPREGADOR */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              Riscos e Obrigações
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Pontos de atenção para o empregador
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              O que a fiscalização e a Justiça do Trabalho mais cobram em empresas com escala 5x2.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PONTOS_ATENCAO.map((p) => {
              const Icone = ICONE_MAP[p.icone] ?? Clock
              return (
                <div
                  key={p.titulo}
                  className="p-6 sm:p-7 bg-[#F0F4F8]/60 rounded-2xl border border-stone-200 hover:border-amber-400 transition-all group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icone className="w-5 h-5" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#082852]">
                        {p.titulo}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                        {p.descricao}
                      </p>
                      <div className="text-xs font-sans text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200/60 leading-snug flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-mono uppercase text-[10px] block text-amber-900 mb-0.5">
                            Risco:
                          </strong>
                          {p.risco}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. COMO A BORLIM AJUDA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Sinergia Integrada BORLIM
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Como a Borlim ajuda na gestão da escala e da folha
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            A escala 5x2 conecta jornada, custo de folha e encargos. Nossas frentes cobrem os dois
            lados dessa conta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 mb-3 inline-block">
                Custo de Folha
              </span>
              <h3 className="font-serif text-xl font-bold text-[#082852] mb-3">
                Gestão Financeira
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                Projeção do <strong>custo total da folha</strong> (salários, horas extras, DSR,
                adicionais e encargos) dentro do fluxo de caixa e dos 48 indicadores
                econômico-financeiros da Borlim — para saber quanto cada ponto percentual de hora
                extra pesa no lucro do mês.
              </p>
            </div>
            <Link
              to="/gestao-financeira"
              className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg bg-[#F0F4F8] hover:bg-[#16A34A] text-[#082852] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Acessar Gestão Financeira</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 mb-3 inline-block">
                Encargos e Vencimentos
              </span>
              <h3 className="font-serif text-xl font-bold text-[#082852] mb-3">
                Agenda Tributária
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                Os <strong>encargos sobre a folha</strong> (INSS/DCTFWeb, FGTS Digital, IRRF) têm
                vencimentos fixos que precisam conviver com o fechamento da escala. A Agenda
                Tributária Mensal acompanha cada data-limite para evitar multas e juros.
              </p>
            </div>
            <Link
              to="/agenda-tributaria"
              className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg bg-[#F0F4F8] hover:bg-[#16A34A] text-[#082852] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Acessar Agenda Tributária</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ EM ACORDEÃO */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Esclarecimentos Práticos
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Perguntas frequentes sobre a escala 5x2
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
              Respostas diretas para as dúvidas mais comuns de empregadores e gestores.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_TRABALHISTA.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-[#F0F4F8]/40 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#082852]">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#16A34A] text-white rotate-180'
                          : 'bg-stone-200 text-slate-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans border-t border-stone-200/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-sans">
              <strong>Nota de caráter informativo:</strong> este conteúdo é educativo e não
              substitui análise jurídica individualizada. Convenções coletivas da categoria podem
              alterar percentuais, regras de compensação e critérios de DSR. Para decisões sobre a
              sua folha, consulte o departamentode pessoal, o jurídico trabalhista ou converse com a
              Borlim.
            </p>
          </div>
        </div>
      </section>

      {/* 9. SEÇÃO FINAL COM CTAs OFICIAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Consultoria Econômica & Gestão de Folha
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Coloque a escala 5x2 sob controle financeiro com a BORLIM.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse com o nosso economista para projetar o custo real da folha com horas extras
                e DSR, organizar os vencimentos dos encargos e proteger a margem do negócio.
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
              <h3 className="font-serif text-lg font-bold text-white">
                Inteligência Trabalhista & Gestão
              </h3>
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
                  <span>Falar no WhatsApp (17) 99765-0672</span>
                </a>
                <Link
                  to="/agenda-tributaria"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-all border border-white/20"
                >
                  <span>Ver Agenda Tributária Mensal</span>
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
