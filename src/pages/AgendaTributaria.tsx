import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileSpreadsheet,
  ExternalLink,
  Phone,
  Mail,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Search,
  Filter,
  Building2,
  HelpCircle,
  Tag,
  Compass,
  Coins,
  ChevronDown,
  Building,
  Landmark,
  BadgeAlert,
  Clock,
  Sparkles,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'
import {
  CATALOGO_TRIBUTOS,
  MESES_AGENDA,
  CONSEQUENCIAS_ATRASO,
  TributoItem,
} from '@/data/agendaTributaria'

export default function AgendaTributaria() {
  // Mês atual como padrão (1 a 12)
  const currentMonthNumber = useMemo(() => {
    const m = new Date().getMonth() + 1
    return m >= 1 && m <= 12 ? m : 1
  }, [])

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthNumber)
  const [searchTerm, setSearchTerm] = useState('')
  const [regimeFilter, setRegimeFilter] = useState<string>('todos')
  const [esferaFilter, setEsferaFilter] = useState<string>('todas')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedTributoModal, setSelectedTributoModal] = useState<TributoItem | null>(null)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20Planejamento%20e%20Agenda%20Tribut%C3%A1ria%20com%20a%20Borlim.'

  // Dados do mês selecionado
  const mesAtualDados = useMemo(() => {
    return (
      MESES_AGENDA.find((m) => m.numero === selectedMonth) ||
      MESES_AGENDA[currentMonthNumber - 1] ||
      MESES_AGENDA[0]
    )
  }, [selectedMonth, currentMonthNumber])

  // Lista de itens do mês com filtro de texto, regime e esfera
  const tributosFiltrados = useMemo(() => {
    return mesAtualDados.tributos
      .map((item) => {
        const catalogo = CATALOGO_TRIBUTOS[item.tributoId]
        return {
          ...item,
          detalhe: catalogo,
        }
      })
      .filter(({ detalhe }) => {
        if (!detalhe) return false

        // Filtro de texto (nome, sigla, código ou explicação)
        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase()
          const matchNome = detalhe.nome.toLowerCase().includes(term)
          const matchSigla = detalhe.sigla.toLowerCase().includes(term)
          const matchCodigo = (detalhe.codigoReceita || '').toLowerCase().includes(term)
          const matchOQueE = detalhe.oQueE.toLowerCase().includes(term)
          const matchQuemPaga = detalhe.quemPaga.toLowerCase().includes(term)
          if (!matchNome && !matchSigla && !matchCodigo && !matchOQueE && !matchQuemPaga) {
            return false
          }
        }

        // Filtro de regime
        if (regimeFilter !== 'todos') {
          const matchRegime = detalhe.regime.some(
            (r) => r.toLowerCase() === regimeFilter.toLowerCase(),
          )
          if (!matchRegime) return false
        }

        // Filtro de esfera
        if (esferaFilter !== 'todas') {
          if (detalhe.esfera.toLowerCase() !== esferaFilter.toLowerCase()) {
            return false
          }
        }

        return true
      })
  }, [mesAtualDados, searchTerm, regimeFilter, esferaFilter])

  const faqsAgenda = [
    {
      q: 'O que acontece quando o vencimento cai em sábado, domingo ou feriado bancário?',
      a: 'A regra varia segundo a legislação de cada tributo. Nos tributos federais ordinários (como PIS, COFINS, IPI, IRRF, contribuições previdenciárias e retenções da DCTFWeb), a legislação federal (art. 18 da MP 2.158-35/2001 e art. 30 da Lei 10.833/2003) determina expressamente a ANTECIPAÇÃO para o dia útil imediatamente anterior. Já o DAS do Simples Nacional possui regra expressa que PRORROGA o vencimento para o primeiro dia útil seguinte (art. 21 da LC 123/2006). O FGTS Digital antecipa o recolhimento se o dia 20 for feriado ou fim de semana. Por cautela, consulte sempre o calendário oficial e seu departamento contábil.',
    },
    {
      q: 'Por que o ICMS e o ISS não possuem um único dia fixo na tabela?',
      a: 'Porque o ICMS é de competência de cada um dos 26 Estados e do Distrito Federal, com prazos fixados no Código de Prazo de Recolhimento (CPR) ou decreto estadual próprio (geralmente entre os dias 10 e 20). Da mesma forma, o ISSQN é de competência municipal, variando de acordo com o Código Tributário de cada um dos mais de 5.570 municípios do Brasil (frequentemente fixado no dia 10 ou 15 do mês subsequente). Por rigor técnico, a Borlim não inventa datas genéricas e orienta a confirmação no domicílio tributário da empresa.',
    },
    {
      q: 'Qual a diferença entre DARF Numerado (DCTFWeb) e o DARF Comum antigo?',
      a: 'Com a implantação da DCTFWeb pela Receita Federal, praticamente todas as contribuições previdenciárias (antiga GPS), retenções da folha (IRRF 0561), retenções sobre serviços (IRRF 1708, CSRF 5952) e tributos federais sobre o faturamento (PIS, COFINS e IPI) passaram a ser consolidados e emitidos em um DARF Único Numerado, gerado diretamente no portal e-CAC. Esse DARF já vem com código de barras e QR Code para pagamento via Pix, substituindo o preenchimento manual do DARF comum sem código de barras.',
    },
    {
      q: 'Empresas do Simples Nacional precisam pagar outros tributos fora do DAS?',
      a: 'Sim, em determinadas circunstâncias. Embora o DAS unifique os tributos sobre a receita bruta, empresas do Simples podem ser obrigadas a recolher: o FGTS dos colaboradores, tributos como responsáveis por retenção na fonte (IRRF sobre pró-labore ou pagamentos a terceiros), ICMS Diferencial de Alíquota (DIFAL), ICMS Substituição Tributária (ICMS-ST) nas compras interestaduais e tributos sobre operações de importação.',
    },
    {
      q: 'Como o Planejamento Econômico-Financeiro da Borlim ajuda a evitar passivos fiscais?',
      a: 'O planejamento econômico da Borlim analisa a fundo o seu Fluxo de Caixa Projetado e o Capital de Giro necessário para suportar as datas de pico de recolhimento tributário (especialmente os dias 20, 25 e o fechamento de trimestres com IRPJ e CSLL). Além disso, avaliamos o melhor enquadramento tributário (Simples Nacional vs. Lucro Presumido vs. Lucro Real) e auxiliamos na formação correta do preço de venda com a tributação devidamente embutida na margem de contribuição.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. HERO SECTION (Fintech Tax Calendar Engine) */}
      <section className="bg-[#082852] text-white py-14 sm:py-20 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-[#1557A6]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Breadcrumb */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <CalendarDays className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Orientação Fiscal & Governança — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Agenda Tributária Mensal
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              Vencimentos de tributos federais, estaduais e municipais, códigos oficiais de receita
              e explicações didáticas para empresários e gestores.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Acompanhe com clareza as datas-limite de recolhimento dos tributos incidentes sobre a
              sua operação: <strong>DAS do Simples Nacional</strong>, <strong>DCTFWeb/INSS</strong>,{' '}
              <strong>FGTS Digital</strong>, <strong>IRRF</strong>, <strong>CSRF</strong>,{' '}
              <strong>PIS/COFINS</strong>, <strong>IPI</strong>, <strong>IRPJ</strong>,{' '}
              <strong>CSLL</strong> e as diretrizes para <strong>ICMS</strong> e{' '}
              <strong>ISS</strong>. Consulte os códigos de recolhimento, quem é obrigado a pagar e
              como cada tributo é apurado para manter seu fluxo de caixa e sua empresa livres de
              multas e pendências fiscais.
            </p>

            {/* CTAs do Hero */}
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
                href="mailto:flavio@borlim.com.br?subject=D%C3%BAvidas%20sobre%20Planejamento%20e%20Agenda%20Tribut%C3%A1ria%20-%20Borlim"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AVISO INSTITUCIONAL OFICIAL & REGRA DE ANTECIPAÇÃO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="p-6 sm:p-7 bg-white rounded-2xl border border-stone-200 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif text-base font-bold text-[#082852]">
                    Aviso Importante sobre o Calendário e Prorrogações
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 font-bold">
                    Calendário Geral da Receita Federal
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Os vencimentos seguem o calendário oficial da Receita Federal do Brasil, Caixa
                  Econômica Federal e legislações vigentes. Datas podem sofrer prorrogações
                  extraordinárias decretadas pelo Poder Público. Quando o vencimento coincidir com
                  sábado, domingo ou feriado bancário, a regra geral da maioria dos tributos
                  federais é a <strong>antecipação para o dia útil imediatamente anterior</strong>{' '}
                  (exceto o Simples Nacional, que por previsão expressa da LC 123/2006 prorroga para
                  o 1º dia útil subsequente). Confirme sempre na publicação oficial do fisco ou
                  consulte a Borlim Consultoria.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                <span>Tirar Dúvida</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#22C55E]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SELETOR DE MÊS & NAVEGAÇÃO DOS 12 MESES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[#15803D]">
              <Calendar className="w-4 h-4 text-[#16A34A]" />
              <span>Selecione o Mês de Referência</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-1">
              {mesAtualDados.nomeCompleto}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
            <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Mês em vigência no calendário:</span>
            <strong className="text-[#082852]">{MESES_AGENDA[currentMonthNumber - 1]?.nome}</strong>
          </div>
        </div>

        {/* Grade de Tabs dos 12 Meses */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5 sm:gap-2">
          {MESES_AGENDA.map((mes) => {
            const isSelected = selectedMonth === mes.numero
            const isCurrentMonth = mes.numero === currentMonthNumber

            return (
              <button
                key={mes.numero}
                type="button"
                onClick={() => setSelectedMonth(mes.numero)}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center transition-all border relative ${
                  isSelected
                    ? 'bg-[#082852] text-white border-[#082852] shadow-md scale-[1.02]'
                    : 'bg-white hover:bg-stone-100/80 text-slate-700 border-stone-200'
                }`}
              >
                {isCurrentMonth && (
                  <span
                    className={`absolute -top-1.5 right-1 text-[9px] font-mono font-bold px-1 rounded ${
                      isSelected ? 'bg-[#16A34A] text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    Hoje
                  </span>
                )}
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider ${
                    isSelected ? 'text-emerald-300' : 'text-slate-400'
                  }`}
                >
                  Mês {mes.numero < 10 ? `0${mes.numero}` : mes.numero}
                </span>
                <span className="font-serif text-xs sm:text-sm font-bold truncate max-w-full">
                  {mes.nome}
                </span>
              </button>
            )
          })}
        </div>

        {/* Destaque / Alerta do Mês Selecionado */}
        {mesAtualDados.destaqueMes && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-slate-700 text-xs sm:text-sm flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#082852] font-semibold">
                Destaque estratégico de {mesAtualDados.nome}:
              </strong>{' '}
              {mesAtualDados.destaqueMes}
            </div>
          </div>
        )}
      </section>

      {/* 4. FILTROS & BUSCA DINÂMICA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Campo de Busca */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por tributo, sigla (ex: DAS, IRPJ, PIS) ou código de receita..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-200 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] bg-[#F0F4F8]/40"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-mono"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Filtros em Linha: Regime & Esfera */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Regime:</span>
            </div>
            <select
              value={regimeFilter}
              onChange={(e) => setRegimeFilter(e.target.value)}
              className="text-xs py-2 px-2.5 rounded-lg border border-stone-200 bg-white font-sans text-slate-700 focus:outline-none focus:border-[#16A34A]"
            >
              <option value="todos">Todos os regimes</option>
              <option value="Simples Nacional">Simples Nacional</option>
              <option value="Lucro Presumido">Lucro Presumido</option>
              <option value="Lucro Real">Lucro Real</option>
              <option value="MEI">MEI</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono pl-1">
              <span>Esfera:</span>
            </div>
            <select
              value={esferaFilter}
              onChange={(e) => setEsferaFilter(e.target.value)}
              className="text-xs py-2 px-2.5 rounded-lg border border-stone-200 bg-white font-sans text-slate-700 focus:outline-none focus:border-[#16A34A]"
            >
              <option value="todas">Todas as esferas</option>
              <option value="Federal">Federal</option>
              <option value="Estadual">Estadual</option>
              <option value="Municipal">Municipal</option>
            </select>

            <span className="text-xs text-slate-500 font-mono pl-2">
              Mostrando <strong>{tributosFiltrados.length}</strong> tributos
            </span>
          </div>
        </div>
      </section>

      {/* 5. LISTAGEM PRINCIPAL DOS TRIBUTOS DO MÊS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {tributosFiltrados.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 shadow-xs">
            <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#082852]">
              Nenhum tributo encontrado para os filtros aplicados
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
              Tente limpar o termo de busca ou selecionar "Todos os regimes" para visualizar os
              vencimentos de {mesAtualDados.nome}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setRegimeFilter('todos')
                setEsferaFilter('todas')
              }}
              className="mt-4 px-4 py-2 bg-[#082852] text-white text-xs font-mono uppercase tracking-wider rounded-lg"
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {tributosFiltrados.map((item, idx) => {
              const tributo = item.detalhe
              if (!tributo) return null

              const isFederal = tributo.esfera === 'Federal'
              const isEstadual = tributo.esfera === 'Estadual'

              return (
                <div
                  key={`${item.tributoId}-${idx}`}
                  className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:border-[#16A34A] transition-all group"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                    {/* Lado Esquerdo: Tag da data e Título do tributo */}
                    <div className="flex items-start gap-4">
                      {/* Badge da data de vencimento */}
                      <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#082852] text-white shrink-0 min-w-[70px] sm:min-w-[85px] text-center shadow-xs">
                        <span className="text-[10px] font-mono uppercase text-emerald-300 font-bold">
                          Vencimento
                        </span>
                        <span className="font-serif text-base sm:text-lg font-bold leading-tight">
                          {typeof item.dia === 'number' ? `Dia ${item.dia}` : item.dia}
                        </span>
                        <span className="text-[9px] font-mono text-slate-300 mt-0.5">
                          {mesAtualDados.nome.slice(0, 3)}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                              isFederal
                                ? 'bg-blue-50 text-[#0B3B7A] border border-blue-200'
                                : isEstadual
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : 'bg-emerald-50 text-[#15803D] border border-emerald-200'
                            }`}
                          >
                            Esfera {tributo.esfera}
                          </span>

                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {tributo.periodicidade}
                          </span>

                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              tributo.regraAntecipacaoPostergacao === 'Antecipa'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : tributo.regraAntecipacaoPostergacao === 'Prorroga'
                                  ? 'bg-teal-50 text-teal-800 border border-teal-200'
                                  : 'bg-stone-100 text-stone-700 border border-stone-200'
                            }`}
                            title="Comportamento em dia não útil (sábado/domingo/feriado)"
                          >
                            Regra: {tributo.regraAntecipacaoPostergacao} em fim de semana
                          </span>
                        </div>

                        <h3 className="font-serif text-base sm:text-xl font-bold text-[#082852] leading-snug">
                          {tributo.nome}
                        </h3>

                        {item.notaEspecifica && (
                          <p className="text-xs text-[#15803D] font-mono font-medium flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                            <span>{item.notaEspecifica}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Lado Direito: Código de Receita DARF/DAS */}
                    <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 bg-[#F0F4F8]/70 p-3 rounded-xl border border-stone-200 shrink-0">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                          Código de Receita / Guia
                        </span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#082852]">
                          {tributo.codigoReceita || 'Consulte legislação local'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedTributoModal(tributo)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0B3B7A] hover:text-[#16A34A] font-semibold underline underline-offset-2"
                      >
                        <Info className="w-3 h-3" />
                        <span>Ver detalhes</span>
                      </button>
                    </div>
                  </div>

                  {/* Bloco de Explicações Didáticas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs font-sans">
                    {/* Para que serve / O que é */}
                    <div className="space-y-1">
                      <span className="font-mono uppercase tracking-wider text-[10px] text-slate-500 font-bold block">
                        Para que serve (O que é):
                      </span>
                      <p className="text-slate-700 leading-relaxed">{tributo.oQueE}</p>
                    </div>

                    {/* Quem deve pagar */}
                    <div className="space-y-1">
                      <span className="font-mono uppercase tracking-wider text-[10px] text-slate-500 font-bold block">
                        Quem deve pagar:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{tributo.quemPaga}</p>
                    </div>

                    {/* Como apurar e recolher */}
                    <div className="space-y-1">
                      <span className="font-mono uppercase tracking-wider text-[10px] text-slate-500 font-bold block">
                        Como apurar e recolher:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{tributo.comoApurarEPagar}</p>
                    </div>
                  </div>

                  {/* Tags de Regimes Aplicáveis */}
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-400 font-mono text-[10px]">Aplicável a:</span>
                      {tributo.regime.map((reg, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-slate-700"
                        >
                          {reg}
                        </span>
                      ))}
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#16A34A] hover:text-[#15803D] font-mono text-[11px] font-bold flex items-center gap-1"
                    >
                      <span>Orientação Borlim para este tributo</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* 6. MODAL SIMPLES COM DETALHE COMPLETO DO TRIBUTO */}
      {selectedTributoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#082852]/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803D] font-bold">
                  Ficha Técnica do Tributo
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mt-0.5">
                  {selectedTributoModal.nome}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTributoModal(null)}
                className="p-1 rounded-lg hover:bg-stone-100 text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm font-sans text-slate-700">
              <div className="grid grid-cols-2 gap-3 bg-[#F0F4F8] p-3 rounded-xl border border-stone-200 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">CÓDIGO DE RECEITA:</span>
                  <span className="font-bold text-[#082852]">
                    {selectedTributoModal.codigoReceita || 'Conforme UF/Município'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">ESFERA:</span>
                  <span className="font-bold text-[#082852]">{selectedTributoModal.esfera}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">VENCIMENTO PADRÃO:</span>
                  <span className="font-bold text-[#082852]">
                    {selectedTributoModal.diaVencimentoPadrao}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">REGRA EM FIM DE SEMANA:</span>
                  <span className="font-bold text-[#082852]">
                    {selectedTributoModal.regraAntecipacaoPostergacao}
                  </span>
                </div>
              </div>

              <div>
                <strong className="text-[#082852] block mb-1 font-serif text-sm">
                  O que é e para que serve:
                </strong>
                <p className="leading-relaxed">{selectedTributoModal.oQueE}</p>
              </div>

              <div>
                <strong className="text-[#082852] block mb-1 font-serif text-sm">
                  Quem deve recolher:
                </strong>
                <p className="leading-relaxed">{selectedTributoModal.quemPaga}</p>
              </div>

              <div>
                <strong className="text-[#082852] block mb-1 font-serif text-sm">
                  Como é apurado e transmitido:
                </strong>
                <p className="leading-relaxed">{selectedTributoModal.comoApurarEPagar}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase rounded-lg"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Consultar Flávio Bordignon</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedTributoModal(null)}
                className="px-4 py-2 border border-stone-200 rounded-lg text-xs font-mono text-slate-700 hover:bg-stone-50"
              >
                Fechar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. CONSEQUÊNCIAS DO ATRASO: MULTA, JUROS SELIC E DÍVIDA ATIVA */}
      <section className="bg-white py-16 sm:py-24 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-700">
                Gestão de Riscos Fiscais & Financeiros
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight">
              Por que Acompanhar Rigorosamente a Agenda Tributária?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              O atraso no recolhimento de tributos não representa apenas uma conta a pagar a mais no
              mês seguinte: ele mina a saúde financeira do negócio, encarece o capital de giro com a
              taxa SELIC e pode inviabilizar contratos comerciais fundamentais. Veja as
              consequências imediatas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONSEQUENCIAS_ATRASO.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F5F3EC]/50 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between hover:border-rose-400 transition-all shadow-2xs group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <BadgeAlert className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#082852] mb-2 leading-snug">
                    {item.titulo}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-3">
                    {item.descricao}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-200 text-[11px] font-mono text-[#0B3B7A] font-semibold flex items-start gap-1.5">
                  <span className="text-rose-600">›</span>
                  <span>{item.impacto}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONEXÃO COM OS SERVIÇOS BORLIM: PLANEJAMENTO ECONÔMICO & FORMAÇÃO DE PREÇO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-12 border border-[#0B3B7A] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-10 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
              Soluções Integradas BORLIM
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2 leading-tight">
              Transforme a Gestão Fiscal em Previsibilidade de Caixa
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans leading-relaxed">
              Pagar tributos em dia sem sufocar o capital de giro da empresa exige sincronia entre
              prazos médios de recebimento dos clientes, margens reais de contribuição e a escolha
              do regime societário mais econômico. A Borlim atua estrategicamente nessas frentes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Card Planejamento */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xs flex flex-col justify-between hover:border-[#22C55E]/60 transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B3B7A] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Planejamento Econômico & Financeiro
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Estruturação do fluxo de caixa operacional, cálculo da Necessidade de Capital de
                  Giro (NCG) e modelagem orçamentária para que os dias de vencimento (como o dia 20
                  e o dia 25) nunca mais peguem o saldo bancário da empresa despreparado.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  to="/planejamento"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#22C55E] hover:text-white transition-colors"
                >
                  <span>Conhecer Planejamento Econômico</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card Formação de Preço */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xs flex flex-col justify-between hover:border-[#22C55E]/60 transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B3B7A] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Tag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Formação de Preço para Vendas
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Inclusão exata da carga tributária (Simples, ICMS, PIS/COFINS, ISS) na fórmula de
                  markup e margem de contribuição. Garanta que o preço final cubra todos os impostos
                  e ainda gere lucro líquido e caixa real para os sócios.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  to="/formacao-de-preco"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#22C55E] hover:text-white transition-colors"
                >
                  <span>Conhecer Formação de Preço</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ - PERGUNTAS FREQUENTES DA AGENDA TRIBUTÁRIA */}
      <section className="bg-white py-16 sm:py-24 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Tira-Dúvidas Tributário
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre a Agenda e Vencimentos
            </h2>
          </div>

          <div className="space-y-4">
            {faqsAgenda.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="border border-stone-200 rounded-xl overflow-hidden transition-colors"
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
                    <div className="px-6 py-5 bg-white border-t border-stone-200 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed space-y-2 animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 10. CONTATO & CTA INSTITUCIONAL (GESTÃO EMPRESARIAL + CONTATOS OFICIAIS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Consultoria Econômica & Governança
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Proteja o caixa da sua empresa com inteligência tributária e financeira.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse com o economista Flávio Bordignon para avaliar o enquadramento tributário
                do seu negócio, calcular o capital de giro ideal para honrar a agenda fiscal ou
                solicitar um diagnóstico de planejamento para sua empresa.
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

              <h3 className="font-serif text-lg font-bold text-white">Sistema & Consultoria</h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Acesse o Sistema de Gestão Empresarial ou fale direto no WhatsApp.
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
                  to="/sobre"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-all border border-white/20"
                >
                  <span>Conhecer a Borlim Consultoria</span>
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
