import { useState, useId } from 'react'
import { Link } from 'react-router-dom'
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  Percent,
  Receipt,
  Building2,
  Factory,
  Store,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Scale,
  Sparkles,
  RefreshCw,
  Phone,
  FileSpreadsheet,
  ExternalLink,
  ShieldCheck,
  Eye,
  Sliders,
  DollarSign,
  Layers,
  ArrowDownRight,
  ArrowUpRight,
  Info,
} from 'lucide-react'

// Exemplos comparativos setoriais pré-definidos
export interface SetorComparativo {
  id: string
  nome: string
  icone: 'industria' | 'varejo' | 'servicos'
  margemBrutaPercent: number
  descricaoCadeia: string
  receitaExemplo: number
  comprasExemplo: number
  aproveitamentoCreditoPercent: number
  explicacao: string
  alertaSetorial: string
}

export const SETORES_COMPARATIVOS: SetorComparativo[] = [
  {
    id: 'varejo',
    nome: 'Comércio Varejista',
    icone: 'varejo',
    margemBrutaPercent: 20, // margem 20%
    descricaoCadeia: 'Revenda de mercadorias adquiridas de distribuidores e indústrias',
    receitaExemplo: 100000,
    comprasExemplo: 80000, // compras altas (custo mercadoria 80%)
    aproveitamentoCreditoPercent: 100,
    explicacao:
      'No varejo, o volume de compras de mercadorias para revenda é muito alto (80% da receita neste exemplo). Por isso, a empresa apropria R$ 21.200 de crédito de IBS/CBS, e o imposto líquido a recolher é de apenas R$ 5.300 (5,3% da receita bruta).',
    alertaSetorial:
      'Atenção ao regime dos fornecedores: se comprar de empresas do Simples sem crédito por fora, o crédito aproveitado despenca e o imposto a pagar sobe.',
  },
  {
    id: 'industria',
    nome: 'Indústria Transformadora',
    icone: 'industria',
    margemBrutaPercent: 30, // margem 30%
    descricaoCadeia: 'Transformação de matérias-primas, energia e embalagens em produtos acabados',
    receitaExemplo: 100000,
    comprasExemplo: 70000, // insumos e energia ~70%
    aproveitamentoCreditoPercent: 100,
    explicacao:
      'A indústria credita 100% de matérias-primas, embalagens, energia elétrica do processo e fretes. Com compras de R$ 70.000, o crédito é de R$ 18.550, gerando saldo a pagar de R$ 7.950 (7,95% efetivo sobre a receita).',
    alertaSetorial:
      'Fim da cumulatividade: desoneração total de bens de capital (máquinas e equipamentos) com crédito imediato, estimulando a modernização do parque fabril.',
  },
  {
    id: 'servicos',
    nome: 'Prestação de Serviços',
    icone: 'servicos',
    margemBrutaPercent: 40, // margem 40% (ou mais)
    descricaoCadeia: 'Atividades intelectuais, consultorias, saúde e tecnologia da informação',
    receitaExemplo: 100000,
    comprasExemplo: 30000, // poucas compras tributadas; muito custo com folha salarial
    aproveitamentoCreditoPercent: 100,
    explicacao:
      'Serviços possuem estrutura peculiar: o maior custo operacional é a folha de pagamento e encargos trabalhistas, que NÃO geram créditos de IBS/CBS. Com compras de apenas R$ 30.000, o crédito é de R$ 7.950, resultando em recolhimento líquido de R$ 18.550 (18,55% da receita).',
    alertaSetorial:
      'Setor mais pressionado pela reforma: prestadores B2C (consumidor final) precisarão repensar markup e preços para evitar corrosão severa da margem líquida.',
  },
]

// Alíquotas de referência oficiais
export const ALIQUOTA_CBS_PADRAO = 8.8 // 8,8% federal
export const ALIQUOTA_IBS_PADRAO = 17.7 // 17,7% estadual/municipal
export const ALIQUOTA_TOTAL_PADRAO = 26.5 // ~26,5% total

export default function CalculoCbsIbsSection() {
  const inputVendasId = useId()
  const inputComprasId = useId()
  const inputAproveitamentoId = useId()

  // Estados do Simulador Interativo
  const [vendasInput, setVendasInput] = useState<string>('100.000,00')
  const [comprasInput, setComprasInput] = useState<string>('60.000,00')
  const [aproveitamentoCredito, setAproveitamentoCredito] = useState<number>(100) // 0 a 100%

  // Aba ativa de simulações comparativas
  const [selectedSetorId, setSelectedSetorId] = useState<string>('industria')

  // URLs oficiais Borlim
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20simular%20o%20c%C3%A1lculo%20do%20CBS%20e%20IBS%20da%20minha%20empresa%20com%20a%20Borlim.'
  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'

  // Helpers de parsing e formatação BRL
  const parseCurrencyInput = (value: string): number => {
    if (!value) return 0
    // Remove tudo que não for dígito, ponto ou vírgula
    const cleaned = value.replace(/[^\d.,]/g, '')
    // Substitui pontos de milhar e troca vírgula decimal por ponto
    const normalized = cleaned.replace(/\./g, '').replace(',', '.')
    const parsed = parseFloat(normalized)
    return isNaN(parsed) || parsed < 0 ? 0 : parsed
  }

  const formatBRL = (val: number): string => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatPercent = (val: number): string => {
    return (
      val.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + '%'
    )
  }

  // Valores numéricos do simulador
  const numericVendas = parseCurrencyInput(vendasInput)
  const numericCompras = parseCurrencyInput(comprasInput)
  const isUsingFallback = numericVendas === 0 && numericCompras === 0

  // Se ambos zerados, usa exemplo educativo pré-carregado
  const effectiveVendas = isUsingFallback ? 100000 : numericVendas
  const effectiveCompras = isUsingFallback ? 60000 : numericCompras
  const effectiveAproveitamento = isUsingFallback ? 100 : aproveitamentoCredito

  // Cálculos de Débito (Vendas) "por fora"
  const cbsVendas = effectiveVendas * (ALIQUOTA_CBS_PADRAO / 100)
  const ibsVendas = effectiveVendas * (ALIQUOTA_IBS_PADRAO / 100)
  const debitoTotal = cbsVendas + ibsVendas
  const precoTotalNota = effectiveVendas + debitoTotal

  // Cálculos de Crédito (Compras de insumos/mercadorias)
  const fatorAproveitamento = effectiveAproveitamento / 100
  const cbsCredito = effectiveCompras * (ALIQUOTA_CBS_PADRAO / 100) * fatorAproveitamento
  const ibsCredito = effectiveCompras * (ALIQUOTA_IBS_PADRAO / 100) * fatorAproveitamento
  const creditoTotal = cbsCredito + ibsCredito

  // Saldo Líquido a Pagar (ou saldo credor)
  const impostoLiquidoPagar = Math.max(0, debitoTotal - creditoTotal)
  const saldoCredorAcumulado = debitoTotal < creditoTotal ? creditoTotal - debitoTotal : 0
  const custoEfetivoPercent =
    effectiveVendas > 0 ? (impostoLiquidoPagar / effectiveVendas) * 100 : 0

  // Tratamento de input com máscara monetária suave
  const handleVendasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendasInput(e.target.value)
  }

  const handleComprasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComprasInput(e.target.value)
  }

  // Predefinições rápidas para o simulador
  const handleApplyPreset = (vendas: number, compras: number, aproveitamento: number = 100) => {
    setVendasInput(
      vendas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    )
    setComprasInput(
      compras.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    )
    setAproveitamentoCredito(aproveitamento)
  }

  const currentSetor =
    SETORES_COMPARATIVOS.find((s) => s.id === selectedSetorId) || SETORES_COMPARATIVOS[1]

  return (
    <section
      id="calculo-cbs-ibs"
      className="bg-[#F0F4F8] py-16 sm:py-24 border-b border-stone-200 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-[#15803D]">
            <Calculator className="w-3.5 h-3.5 text-[#16A34A]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">
              Guia Prático de Cálculo & Simulação
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#082852] leading-tight">
            Como se Calcula o CBS e o IBS na Prática
          </h2>

          <p className="font-serif text-base sm:text-xl text-slate-700 mt-3 font-normal leading-relaxed">
            Entenda a mecânica do cálculo{' '}
            <strong className="text-[#082852]">&ldquo;por fora&rdquo;</strong>, a dinâmica de
            débitos e créditos na cadeia de suprimentos e simule o impacto real no caixa da sua
            empresa com faturamento e compras.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans max-w-2xl mx-auto">
            Uma abordagem didática e técnica — <em>de empresário para empresário</em> — mostrando
            por que o imposto a pagar depende diretamente de quanto crédito a sua empresa consegue
            aproveitar dos fornecedores.
          </p>
        </div>

        {/* 1. O QUE É O CÁLCULO "POR FORA" vs "POR DENTRO" */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-10 mb-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#082852] text-white font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Percent className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Princípio Fundamental nº 1</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852]">
                1. Como Funciona o Cálculo &ldquo;Por Fora&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
                Fim do imposto sobre imposto: CBS e IBS incidem diretamente sobre o preço líquido de
                venda.
              </p>
            </div>

            {/* Alíquotas de referência em pílula */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
              <span className="bg-blue-50 text-[#082852] border border-blue-200 px-3 py-1.5 rounded-lg font-bold">
                CBS (Federal): {formatPercent(ALIQUOTA_CBS_PADRAO)}
              </span>
              <span className="bg-purple-50 text-purple-900 border border-purple-200 px-3 py-1.5 rounded-lg font-bold">
                IBS (Est./Mun.): {formatPercent(ALIQUOTA_IBS_PADRAO)}
              </span>
              <span className="bg-emerald-50 text-[#15803D] border border-emerald-300 px-3 py-1.5 rounded-lg font-bold">
                Total IVA Dual: ~{formatPercent(ALIQUOTA_TOTAL_PADRAO)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
            {/* Explicação Didática */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                No modelo tributário tradicional brasileiro (com ICMS, ISS, PIS e Cofins), o imposto
                é calculado
                <strong className="text-[#082852]"> &ldquo;por dentro&rdquo;</strong>. Isso
                significa que a alíquota incide sobre uma base que já contém o próprio imposto. Por
                exemplo: um ICMS de 18% nominal representa, na prática, uma carga real de{' '}
                <strong>21,95%</strong> sobre o valor do produto (fórmula: 18 / (1 - 0,18)).
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Com a Reforma Tributária (<strong>EC 132/2023</strong> e{' '}
                <strong>LC 214/2025</strong>), o Brasil adota o padrão internacional de IVA: o
                cálculo passa a ser exclusivamente{' '}
                <strong className="text-[#15803D]">&ldquo;por fora&rdquo;</strong>. O imposto NÃO
                integra a sua própria base de cálculo e NÃO incide sobre outros tributos.
              </p>

              {/* Box da Fórmula Matemática */}
              <div className="p-5 bg-[#F0F4F8] rounded-2xl border border-stone-300 font-mono text-xs sm:text-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] block mb-1">
                  Fórmula Matemática do Preço Final da Nota:
                </span>
                <div className="text-base sm:text-lg font-bold text-[#082852] py-1">
                  Preço Total da Nota = Preço de Venda Líquido + CBS ({ALIQUOTA_CBS_PADRAO}%) + IBS
                  ({ALIQUOTA_IBS_PADRAO}%)
                </div>
                <div className="text-slate-600 text-xs mt-1.5 font-sans">
                  Exemplo: Preço de venda R$ 100,00 + CBS R$ 8,80 + IBS R$ 17,70 ={' '}
                  <strong className="text-[#082852]">Preço final cobrado na NF: R$ 126,50</strong>.
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Nota sobre as alíquotas de referência:</strong> Os percentuais de 8,8%
                  (CBS) e 17,7% (IBS), somando ~26,5%, são estimativas oficiais do Ministério da
                  Fazenda para a neutralidade de arrecadação. A alíquota efetiva final dependerá do
                  setor de atuação (há regimes favorecidos com 60% ou 100% de redução, como saúde,
                  educação e agronegócio) e da regulamentação pelo Senado Federal e Comitê Gestor.
                </span>
              </div>
            </div>

            {/* Comparativo Visual "Por Dentro" vs "Por Fora" */}
            <div className="lg:col-span-5 bg-[#E5EDF5]/70 p-6 rounded-2xl border border-stone-200 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#082852] block">
                Comparativo Didático de Cálculo
              </span>

              {/* Card Atual: Por Dentro */}
              <div className="p-4 bg-white rounded-xl border border-red-200 shadow-xs">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-red-700 mb-1">
                  <span>SISTEMA ATUAL (&ldquo;POR DENTRO&rdquo;)</span>
                  <span className="text-[10px] bg-red-100 px-2 py-0.5 rounded">
                    Complexo & Oculto
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Base = R$ 100 / (1 - 0,18) = <strong>R$ 121,95</strong>.<br />
                  O imposto incide sobre si mesmo e sobre outros tributos. O empresário não enxerga
                  com clareza quanto é produto e quanto é imposto embutido.
                </p>
              </div>

              {/* Card Novo: Por Fora */}
              <div className="p-4 bg-white rounded-xl border border-emerald-300 shadow-xs relative">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#15803D] mb-1">
                  <span>NOVO SISTEMA (&ldquo;POR FORA&rdquo;)</span>
                  <span className="text-[10px] bg-emerald-100 text-[#15803D] px-2 py-0.5 rounded font-bold">
                    Transparente & Simples
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  Preço do Produto = <strong>R$ 100,00</strong>.<br />
                  CBS (8,8%) = R$ 8,80 | IBS (17,7%) = R$ 17,70.
                  <br />
                  Total da Nota = <strong>R$ 126,50</strong>. Cada centavo é discriminado em campo
                  próprio da NF-e.
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-600 pt-1 border-t border-slate-300/60">
                <strong className="text-[#082852]">Vantagem direta:</strong> Elimina a necessidade
                de cálculos reversos para achar o preço de venda líquido, simplificando a governança
                de preços.
              </div>
            </div>
          </div>
        </div>

        {/* 2 & 3. EXEMPLOS PRÁTICOS PASSO A PASSO NA MESMA CADEIA (VENDA + COMPRA) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
          {/* Card 2: Exemplo de Venda (Faturamento de R$ 100.000,00) */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#16A34A] transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-blue-100 text-[#082852] font-mono text-xs font-bold uppercase tracking-wider">
                  2. Exemplo Prático de Venda (Débito)
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Passo a Passo
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mb-3">
                Faturamento: Venda Industrial de R$ 100.000,00
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-sans mb-5 leading-relaxed">
                Imagine uma indústria que vende um lote de mercadorias por{' '}
                <strong>R$ 100.000,00</strong> (valor líquido da mercadoria). Veja como o imposto é
                destacado na NF-e:
              </p>

              {/* Tabela de Etapas do Faturamento */}
              <div className="bg-[#F0F4F8] rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1 border-b border-stone-200">
                  <span className="text-slate-600 font-sans">1. Base de Cálculo da Venda:</span>
                  <span className="font-bold text-[#082852]">{formatBRL(100000)}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-stone-200">
                  <span className="text-slate-600 font-sans">
                    2. CBS Federal ({formatPercent(ALIQUOTA_CBS_PADRAO)}):
                  </span>
                  <span className="font-bold text-blue-900">+{formatBRL(8800)}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-stone-200">
                  <span className="text-slate-600 font-sans">
                    3. IBS Subnacional ({formatPercent(ALIQUOTA_IBS_PADRAO)}):
                  </span>
                  <span className="font-bold text-purple-900">+{formatBRL(17700)}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 bg-white p-3 rounded-xl border border-stone-200 text-xs sm:text-sm">
                  <span className="font-bold text-[#082852] font-sans">
                    Total de Impostos Destacados na NF:
                  </span>
                  <span className="font-extrabold text-[#082852] text-base">
                    {formatBRL(26500)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 text-slate-700">
                  <span className="font-sans font-medium">Preço Total Cobrado do Comprador:</span>
                  <span className="font-bold text-[#15803D] text-base sm:text-lg">
                    {formatBRL(126500)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
              <div className="flex items-start gap-2 text-xs font-sans text-[#15803D] leading-snug">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-mono uppercase text-[10px] block text-[#15803D] mb-0.5">
                    Quem paga esse valor?
                  </strong>
                  Os R$ 26.500,00 de impostos são recolhidos pela empresa vendedora, mas o cliente
                  empresarial (próximo elo da cadeia) se{' '}
                  <strong>credita integralmente de 100% desse valor</strong> para abater das suas
                  próprias vendas futuras.
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Exemplo de Compra e Apuração Líquida */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#16A34A] transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-[#15803D] font-mono text-xs font-bold uppercase tracking-wider">
                  3. Exemplo Prático de Compra (Crédito)
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Apuração Líquida
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mb-3">
                Compras de Insumos: R$ 60.000,00 na Mesma Cadeia
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-sans mb-5 leading-relaxed">
                Para fabricar os produtos vendidos por R$ 100.000,00, a mesma indústria comprou{' '}
                <strong>R$ 60.000,00</strong> em matérias-primas e energia com notas fiscais
                regulares:
              </p>

              {/* Tabela de Créditos e Apuração */}
              <div className="bg-[#F0F4F8] rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1 border-b border-stone-200">
                  <span className="text-slate-600 font-sans">
                    Crédito de CBS ({formatPercent(ALIQUOTA_CBS_PADRAO)}):
                  </span>
                  <span className="font-bold text-blue-900">+{formatBRL(5280)}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-stone-200">
                  <span className="text-slate-600 font-sans">
                    Crédito de IBS ({formatPercent(ALIQUOTA_IBS_PADRAO)}):
                  </span>
                  <span className="font-bold text-purple-900">+{formatBRL(10620)}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-stone-200 bg-white p-2.5 rounded-lg">
                  <span className="font-bold text-[#15803D] font-sans">
                    Crédito Total a Aproveitar:
                  </span>
                  <span className="font-extrabold text-[#15803D]">{formatBRL(15900)}</span>
                </div>

                {/* Cálculo do Imposto a Pagar */}
                <div className="p-3 bg-[#082852] text-white rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Débito s/ Vendas:</span>
                    <span>{formatBRL(26500)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-300">
                    <span>(-) Crédito das Compras:</span>
                    <span>- {formatBRL(15900)}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-700 flex items-center justify-between text-sm sm:text-base font-bold">
                    <span className="text-white">Imposto Líquido a Pagar:</span>
                    <span className="text-[#22C55E] font-extrabold">{formatBRL(10600)}</span>
                  </div>
                </div>

                <div className="text-[11px] font-sans text-slate-600 pt-1 text-right">
                  Carga efetiva real sobre a receita de R$ 100 mil:{' '}
                  <strong className="text-[#082852] font-mono">10,60%</strong> (R$ 10.600 / R$
                  100.000).
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 bg-slate-100/80 p-4 rounded-xl border border-stone-200">
              <div className="text-xs font-sans text-slate-700 leading-snug">
                <strong className="font-mono uppercase text-[10px] block text-[#082852] mb-1">
                  Por que hoje há cumulatividade parcial?
                </strong>
                No regime antigo, boa parte dos créditos era perdida: PIS/Cofins cumulativo não dá
                crédito nenhum; compras interestaduais de ICMS tinham travas e alíquotas desiguais;
                energia e serviços nem sempre eram creditáveis. No IVA Dual, o crédito financeiro é{' '}
                <strong>amplo e irrestrito</strong> para qualquer insumo vinculado à atividade
                empresarial.
              </div>
            </div>
          </div>
        </div>

        {/* 4. SIMULAÇÕES COMPARATIVAS POR FATURAMENTO E SETOR (CARDS INTERATIVOS) */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                Cadeia Produtiva & Margens
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-1">
                4. Simulações Comparativas por Margem e Setor
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
                Veja como a proporção entre compras (crédito) e vendas (débito) muda drasticamente o
                imposto efetivo que sai do caixa.
              </p>
            </div>

            {/* Seletor de Setores */}
            <div className="inline-flex p-1 bg-stone-200/80 rounded-xl shrink-0">
              {SETORES_COMPARATIVOS.map((setor) => {
                const isActive = selectedSetorId === setor.id
                return (
                  <button
                    key={setor.id}
                    type="button"
                    onClick={() => setSelectedSetorId(setor.id)}
                    className={`px-3 sm:px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#082852] text-white shadow-xs'
                        : 'text-slate-700 hover:text-[#082852]'
                    }`}
                  >
                    {setor.icone === 'varejo' && <Store className="w-3.5 h-3.5" />}
                    {setor.icone === 'industria' && <Factory className="w-3.5 h-3.5" />}
                    {setor.icone === 'servicos' && <Briefcase className="w-3.5 h-3.5" />}
                    <span>{setor.nome}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Destaque do Setor Selecionado */}
          {(() => {
            const debitoSetor = currentSetor.receitaExemplo * (ALIQUOTA_TOTAL_PADRAO / 100)
            const creditoSetor =
              currentSetor.comprasExemplo *
              (ALIQUOTA_TOTAL_PADRAO / 100) *
              (currentSetor.aproveitamentoCreditoPercent / 100)
            const impostoLiquidoSetor = Math.max(0, debitoSetor - creditoSetor)
            const aliquotaEfetivaSetor = (impostoLiquidoSetor / currentSetor.receitaExemplo) * 100

            return (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Lado Esquerdo: Diagnóstico e Explicação */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200">
                      Margem Bruta Típica: ~{currentSetor.margemBrutaPercent}%
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Exemplo com Receita de {formatBRL(currentSetor.receitaExemplo)}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                    {currentSetor.nome} — {currentSetor.descricaoCadeia}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {currentSetor.explicacao}
                  </p>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed font-sans">
                    <strong className="font-mono uppercase text-[10px] block text-amber-900 mb-0.5">
                      Ponto Crítico Borlim:
                    </strong>
                    {currentSetor.alertaSetorial}
                  </div>

                  {/* Botão de carregar dados no simulador abaixo */}
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyPreset(
                        currentSetor.receitaExemplo,
                        currentSetor.comprasExemplo,
                        currentSetor.aproveitamentoCreditoPercent,
                      )
                    }
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0B3B7A] hover:text-[#16A34A] transition-colors pt-2"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Carregar estes valores no Simulador Interativo abaixo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Lado Direito: Cards Métricos de Caixa */}
                <div className="lg:col-span-5 bg-[#F0F4F8] p-6 rounded-2xl border border-stone-200 space-y-3 font-mono">
                  <div className="flex items-center justify-between text-xs border-b border-stone-200 pb-2">
                    <span className="text-slate-600 font-sans">Receita Bruta Faturada:</span>
                    <span className="font-bold text-[#082852]">
                      {formatBRL(currentSetor.receitaExemplo)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-stone-200 pb-2">
                    <span className="text-slate-600 font-sans">
                      Compras de Insumos / Mercadorias:
                    </span>
                    <span className="font-bold text-slate-700">
                      {formatBRL(currentSetor.comprasExemplo)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-blue-900 border-b border-stone-200 pb-2">
                    <span className="font-sans">
                      Débito Total ({formatPercent(ALIQUOTA_TOTAL_PADRAO)}):
                    </span>
                    <span className="font-bold">+{formatBRL(debitoSetor)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-700 border-b border-stone-200 pb-2">
                    <span className="font-sans">Crédito Aproveitado:</span>
                    <span className="font-bold">-{formatBRL(creditoSetor)}</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-600 font-sans block">
                        Imposto Líquido a Recolher
                      </span>
                      <span className="font-mono text-2xl font-extrabold text-[#082852]">
                        {formatBRL(impostoLiquidoSetor)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-[#15803D] font-bold block">
                        Custo Efetivo
                      </span>
                      <span className="font-mono text-xl font-extrabold text-[#15803D] bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                        {formatPercent(aliquotaEfetivaSetor)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>

        {/* 5. SIMULADOR INTERATIVO EDUCATIVO (100% NO NAVEGADOR) */}
        <div className="bg-[#082852] text-white rounded-3xl p-6 sm:p-10 border border-[#0B3B7A] shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Cabeçalho do Simulador */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-700">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E] mb-1">
                <Calculator className="w-4 h-4 text-[#22C55E]" />
                <span>5. Simulador Interativo de Faturamento & Compras</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Simule o CBS e IBS do Seu Negócio
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                Digite suas projeções mensais de vendas e compras para calcular débitos, créditos e
                o imposto líquido.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-mono text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                100% Client-Side • Sem Gravação
              </span>
              <button
                type="button"
                onClick={() => handleApplyPreset(100000, 60000, 100)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
                title="Restaurar Exemplo Educativo Padrão"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid de Inputs do Simulador */}
          <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Coluna 1: Campos de Entrada */}
            <div className="lg:col-span-5 space-y-5 bg-[#0B3B7A]/60 p-6 rounded-2xl border border-slate-700">
              {/* Campo 1: Receita de Vendas */}
              <div className="space-y-1.5">
                <label
                  htmlFor={inputVendasId}
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200"
                >
                  Receita de Vendas (R$ / mês):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono font-bold text-slate-400">
                    R$
                  </span>
                  <input
                    id={inputVendasId}
                    type="text"
                    value={vendasInput}
                    onChange={handleVendasChange}
                    placeholder="Ex: 100.000,00"
                    className="w-full pl-11 pr-4 py-3 bg-[#082852] border-2 border-slate-600 rounded-xl font-mono text-xl font-bold text-white focus:outline-none focus:border-[#22C55E] focus:bg-[#0B3B7A] transition-all"
                  />
                  {vendasInput && (
                    <button
                      type="button"
                      onClick={() => setVendasInput('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono p-1"
                      title="Limpar campo"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </div>

              {/* Campo 2: Compras de Insumos/Mercadorias */}
              <div className="space-y-1.5">
                <label
                  htmlFor={inputComprasId}
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200"
                >
                  Compras de Insumos / Mercadorias (R$ / mês):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono font-bold text-slate-400">
                    R$
                  </span>
                  <input
                    id={inputComprasId}
                    type="text"
                    value={comprasInput}
                    onChange={handleComprasChange}
                    placeholder="Ex: 60.000,00"
                    className="w-full pl-11 pr-4 py-3 bg-[#082852] border-2 border-slate-600 rounded-xl font-mono text-xl font-bold text-white focus:outline-none focus:border-[#22C55E] focus:bg-[#0B3B7A] transition-all"
                  />
                  {comprasInput && (
                    <button
                      type="button"
                      onClick={() => setComprasInput('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono p-1"
                      title="Limpar campo"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </div>

              {/* Campo 3: Slider de Percentual de Aproveitamento de Crédito */}
              <div className="space-y-2 pt-2 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={inputAproveitamentoId}
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200"
                  >
                    Aproveitamento de Crédito:
                  </label>
                  <span className="font-mono text-sm font-extrabold text-[#22C55E] bg-[#082852] px-2.5 py-0.5 rounded border border-slate-700">
                    {aproveitamentoCredito}%
                  </span>
                </div>

                <input
                  id={inputAproveitamentoId}
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={aproveitamentoCredito}
                  onChange={(e) => setAproveitamentoCredito(Number(e.target.value))}
                  className="w-full accent-[#22C55E] cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>0% (Sem crédito)</span>
                  <span>50% (Fornecedores mistos)</span>
                  <span>100% (Crédito pleno)</span>
                </div>

                <p className="text-[11px] font-sans text-slate-300 leading-snug">
                  Seus fornecedores estão no regime regular? Caso compre de empresas do Simples sem
                  recolhimento por fora, o crédito aproveitado diminui proporcionalmente.
                </p>
              </div>

              {/* Atalhos Rápidos */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-700">
                <span className="text-[11px] font-mono text-slate-400 mr-1">Atalhos:</span>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(50000, 30000, 100)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                >
                  R$ 50k / R$ 30k
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(100000, 60000, 100)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                >
                  R$ 100k / R$ 60k
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(500000, 350000, 100)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                >
                  R$ 500k / R$ 350k
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(1000000, 750000, 100)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                >
                  R$ 1 Mi / R$ 750k
                </button>
              </div>
            </div>

            {/* Coluna 2: Painel de Resultados Detalhado */}
            <div className="lg:col-span-7 space-y-4">
              {/* Aviso quando campos vazios / usando fallback */}
              {isUsingFallback && (
                <div className="p-3 bg-amber-500/20 border border-amber-400/40 rounded-xl text-xs font-mono text-amber-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>
                    Exibindo exemplo pré-carregado educativo (Vendas: R$ 100.000,00 | Compras: R$
                    60.000,00 | Aproveitamento: 100%). Digite os valores da sua empresa para
                    recalcular.
                  </span>
                </div>
              )}

              {/* Grade de Débitos e Créditos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Bloco de Débitos (Vendas) */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono uppercase font-bold text-blue-300">
                    <span className="flex items-center gap-1.5">
                      <ArrowUpRight className="w-4 h-4 text-blue-300" />
                      Débitos sobre Vendas
                    </span>
                    <span className="text-[10px] bg-blue-500/30 px-2 py-0.5 rounded">
                      {formatBRL(effectiveVendas)}
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs pt-1">
                    <div className="flex justify-between text-slate-300">
                      <span>CBS ({formatPercent(ALIQUOTA_CBS_PADRAO)}):</span>
                      <span className="font-bold text-white">{formatBRL(cbsVendas)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>IBS ({formatPercent(ALIQUOTA_IBS_PADRAO)}):</span>
                      <span className="font-bold text-white">{formatBRL(ibsVendas)}</span>
                    </div>
                    <div className="pt-2 border-t border-white/20 flex justify-between text-sm font-bold text-white">
                      <span>Total de Débitos:</span>
                      <span className="text-blue-300">{formatBRL(debitoTotal)}</span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 pt-1">
                    Preço total com tributo: {formatBRL(precoTotalNota)}
                  </div>
                </div>

                {/* Bloco de Créditos (Compras) */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono uppercase font-bold text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <ArrowDownRight className="w-4 h-4 text-emerald-300" />
                      Créditos das Compras
                    </span>
                    <span className="text-[10px] bg-emerald-500/30 px-2 py-0.5 rounded">
                      {formatBRL(effectiveCompras)}
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs pt-1">
                    <div className="flex justify-between text-slate-300">
                      <span>CBS ({formatPercent(ALIQUOTA_CBS_PADRAO)}):</span>
                      <span className="font-bold text-white">{formatBRL(cbsCredito)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>IBS ({formatPercent(ALIQUOTA_IBS_PADRAO)}):</span>
                      <span className="font-bold text-white">{formatBRL(ibsCredito)}</span>
                    </div>
                    <div className="pt-2 border-t border-white/20 flex justify-between text-sm font-bold text-white">
                      <span>Total de Créditos:</span>
                      <span className="text-emerald-300">{formatBRL(creditoTotal)}</span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 pt-1">
                    Aproveitamento considerado: {effectiveAproveitamento}%
                  </div>
                </div>
              </div>

              {/* Card Destaque: Imposto Líquido a Pagar */}
              <div className="bg-gradient-to-r from-[#0B3B7A] to-[#082852] p-6 rounded-2xl border-2 border-[#22C55E]/50 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                    Resultado da Apuração Mensal
                  </span>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {saldoCredorAcumulado > 0
                      ? 'Saldo Credor Acumulado para o Próximo Mês'
                      : 'Imposto Líquido a Recolher (IBS + CBS)'}
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    Débitos ({formatBRL(debitoTotal)}) - Créditos ({formatBRL(creditoTotal)}) ={' '}
                    <strong className="text-white">
                      {saldoCredorAcumulado > 0
                        ? formatBRL(saldoCredorAcumulado)
                        : formatBRL(impostoLiquidoPagar)}
                    </strong>
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-2xl sm:text-4xl font-mono font-extrabold text-[#22C55E]">
                    {saldoCredorAcumulado > 0
                      ? `+ ${formatBRL(saldoCredorAcumulado)}`
                      : formatBRL(impostoLiquidoPagar)}
                  </div>
                  <div className="text-xs font-mono text-emerald-200 mt-1">
                    Custo Efetivo:{' '}
                    <strong className="text-white bg-[#16A34A] px-2 py-0.5 rounded">
                      {formatPercent(custoEfetivoPercent)}
                    </strong>{' '}
                    da receita
                  </div>
                </div>
              </div>

              {/* Aviso Educativo Obrigatório */}
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-[11px] font-sans text-slate-300 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <span>
                  <strong>Aviso de caráter educativo:</strong> Esta ferramenta destina-se
                  exclusivamente a fins de planejamento e orientação gerencial. Os cálculos utilizam
                  as alíquotas de referência estimadas de 8,8% para CBS e 17,7% para IBS (~26,5%
                  total). A carga real dependerá da legislação complementar do seu estado/município,
                  do regime dos seus fornecedores e de regimes diferenciados. Não constitui parecer
                  jurídico ou consultoria contábil vinculante.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. EFEITO NO PREÇO AO CONSUMIDOR */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-[#082852] font-mono text-xs font-bold uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5 text-[#0B3B7A]" />
                <span>6. Efeito no Preço ao Consumidor Final</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                Mudança de Percepção, Não Necessariamente Aumento de Carga
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                Hoje, o consumidor brasileiro compra um produto de R$ 100,00 sem ter a menor clareza
                de que cerca de
                <strong> 20% a 22% desse valor já são impostos &ldquo;embutidos&rdquo;</strong>{' '}
                (ICMS, PIS e Cofins). Com a Reforma Tributária, a nota e o cupom fiscal passarão a
                destacar o valor líquido da mercadoria e a fatia do IBS e da CBS em linhas
                separadas.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                Isso criará um <strong>choque de percepção pública</strong>: o consumidor verá o
                imposto explicitamente na nota (&ldquo;Produto R$ 100 + CBS R$ 8,80 + IBS R$ 17,70 =
                R$ 126,50&rdquo;), o que pode dar a falsa impressão de que a empresa aumentou a
                carga. O empresário precisa estar preparado para comunicar com clareza que o tributo
                sempre existiu, mas agora é cobrado de forma 100% transparente.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#F0F4F8] p-5 rounded-2xl border border-stone-200 space-y-3 text-xs font-mono">
              <span className="font-bold text-[#082852] uppercase text-[11px] block">
                Exemplo no Cupom Fiscal
              </span>
              <div className="bg-white p-3.5 rounded-xl border border-dashed border-stone-300 space-y-1.5 text-slate-700">
                <div className="flex justify-between font-bold text-[#082852]">
                  <span>Item Mercadoria:</span>
                  <span>R$ 100,00</span>
                </div>
                <div className="flex justify-between text-blue-900">
                  <span>CBS Federal (8,8%):</span>
                  <span>R$ 8,80</span>
                </div>
                <div className="flex justify-between text-purple-900">
                  <span>IBS Subnacional (17,7%):</span>
                  <span>R$ 17,70</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-extrabold text-[#082852] text-sm">
                  <span>Total do Cupom:</span>
                  <span>R$ 126,50</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 block leading-tight">
                *O valor do tributo é repassado automaticamente para os cofres públicos no pagamento
                (split payment).
              </span>
            </div>
          </div>
        </div>

        {/* 7. NOTA INSTITUCIONAL BORLIM (CONEXÃO COM FORMAÇÃO DE PREÇO E PLANEJAMENTO) */}
        <div className="bg-gradient-to-br from-white to-[#E5EDF5]/80 rounded-3xl border-2 border-emerald-300/70 p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-[#15803D]">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span className="text-xs font-mono uppercase font-bold tracking-wider">
                  7. Orientação Estratégica BORLIM
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852]">
                Recalcule o Markup e Proteja o Capital de Giro Antes de 2026
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                A matemática do lucro muda completamente sob o IVA Dual. No modelo antigo, erros na
                formação de preço eram amortecidos pela apuração cumulativa ou por prazos estendidos
                de recolhimento. Na Reforma, com o<strong> cálculo por fora</strong> e a retenção
                instantânea via <strong>split payment</strong>, qualquer falha no recálculo do
                markup drena o caixa da empresa no mesmo dia da venda.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5">
                  <strong className="font-mono text-xs uppercase text-[#0B3B7A] block">
                    Formação de Preço
                  </strong>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Ajuste o seu markup divisor para o modelo &ldquo;por fora&rdquo; e audite a
                    cesta de insumos para maximizar os créditos fiscais aproveitados.
                  </p>
                  <Link
                    to="/formacao-de-preco"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#15803D] hover:underline pt-1"
                  >
                    <span>Ver Formação de Preço</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5">
                  <strong className="font-mono text-xs uppercase text-[#0B3B7A] block">
                    Planejamento & NCG
                  </strong>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Simule a Necessidade de Capital de Giro (NCG) prevendo a retenção do imposto no
                    momento da liquidação bancária da venda a prazo.
                  </p>
                  <Link
                    to="/planejamento"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#15803D] hover:underline pt-1"
                  >
                    <span>Ver Planejamento</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* CTAs Oficiais Borlim */}
            <div className="lg:col-span-4 bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E] block">
                Fale com o Economista
              </span>

              <p className="font-serif text-lg font-bold text-white leading-snug">
                Precisa simular a apuração específica do seu CNPJ?
              </p>

              <p className="text-xs text-slate-300 font-sans">
                Nossos consultores auditam sua estrutura de faturamento, compras e margens com base
                nos 48 indicadores financeiros da Borlim.
              </p>

              <div className="space-y-2.5 pt-2">
                <a
                  href={balanceAnalysisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow border border-[#22C55E]"
                  title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
                >
                  <FileSpreadsheet className="w-4 h-4 text-white" />
                  <span>GESTÃO EMPRESARIAL</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                >
                  <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>(17) 99765-0672 (WhatsApp)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
