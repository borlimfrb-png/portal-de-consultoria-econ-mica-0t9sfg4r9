/**
 * Borlim Consultoria Empresarial - Módulo de Cálculos e Modelos de Renda Fixa
 *
 * Utilidades para comparar investimentos e simular ganhos brutos e líquidos
 * com a tabela regressiva da Receita Federal e isenções legais (LCI/LCA, Poupança).
 *
 * Totalmente em memória (cliente) - sem gravação em banco de dados ou cookies.
 */

export interface EconomicRates {
  selic: number // % a.a. (ex: 13.75)
  cdi: number // % a.a. (ex: 13.90)
  ipca: number // % a.a. (ex: 4.22)
  isEstimateSelic?: boolean
  isEstimateCdi?: boolean
  isEstimateIpca?: boolean
}

export type InvestmentType =
  | 'lci_lca'
  | 'cdb_110'
  | 'tesouro_ipca'
  | 'tesouro_selic'
  | 'cdb_100'
  | 'poupanca'

export interface InvestmentOption {
  id: InvestmentType
  name: string
  category: 'Isento de IR' | 'Tributado Regressivo'
  description: string
  indexerDisplay: string // ex: "90% do CDI", "110% do CDI"
  liquidity: string // ex: "Carência 9 meses / Vencimento", "Diária"
  taxTreatment: string // ex: "Isento de IRPF", "Tabela Regressiva (15% a 22,5%)"
  isTaxExempt: boolean
  benchmarkType: 'cdi' | 'selic' | 'ipca_plus'
  getGrossAnnualRate: (rates: EconomicRates) => number // Retorna a taxa bruta anual estimada em %
}

// Tabela Regressiva do Imposto de Renda para Renda Fixa (Lei 11.033/2004)
// Recebe ou o número de meses OU a quantidade exata de dias corridos (via daysCount)
export function getRegressiveTaxRate(
  period: number,
  unit: 'months' | 'days' = 'months',
): {
  rate: number // ex: 0.225 para 22,5%
  ratePercent: number // ex: 22.5
  rangeLabel: string // ex: "Até 180 dias (22,5%)"
  daysApprox: number
} {
  const days =
    unit === 'days' ? Math.max(1, Math.round(period)) : Math.max(1, Math.round(period * 30.4167))

  if (days <= 180) {
    return { rate: 0.225, ratePercent: 22.5, rangeLabel: 'Até 180 dias (22,5%)', daysApprox: days }
  }
  if (days <= 360) {
    return { rate: 0.2, ratePercent: 20.0, rangeLabel: '181 a 360 dias (20,0%)', daysApprox: days }
  }
  if (days <= 720) {
    return {
      rate: 0.175,
      ratePercent: 17.5,
      rangeLabel: '361 a 720 dias (17,5%)',
      daysApprox: days,
    }
  }
  return {
    rate: 0.15,
    ratePercent: 15.0,
    rangeLabel: 'Acima de 720 dias (15,0%)',
    daysApprox: days,
  }
}

/**
 * Cálculo da Poupança Nova (Lei 12.703/2012):
 * - Se Selic > 8,5% a.a. => 0,5% a.m. + TR (equivale a ~6,17% a.a. + TR; TR estimada em ~1,2% a.a. no cenário de Selic de 2 dígitos => ~7,4% a.a., ou ~70% da Selic com teto)
 * - Se Selic <= 8,5% a.a. => 70% da taxa Selic Meta + TR
 */
export function calculatePoupancaAnnualRate(selicRate: number): number {
  if (selicRate > 8.5) {
    // 0.5% ao mês capitalizado = (1 + 0.005)^12 - 1 = 6.1678% a.a.
    // Mais TR estimada (~1.2% quando Selic em torno de 13%):
    const trEstimate = Math.max(0, (selicRate - 8.5) * 0.2) // ~1.05% a 1.25%
    const basePoupanca = 6.17
    return basePoupanca + trEstimate
  }
  return selicRate * 0.7
}

export const INVESTMENT_OPTIONS: InvestmentOption[] = [
  {
    id: 'lci_lca',
    name: 'LCI / LCA (90% do CDI)',
    category: 'Isento de IR',
    description:
      'Letras de Crédito Imobiliário e do Agronegócio emitidas por bancos com garantia do FGC até R$ 250 mil. Isentas de IRPF para pessoas físicas.',
    indexerDisplay: '90% do CDI',
    liquidity: 'Carência legal (9 a 12 meses) / no vencimento',
    taxTreatment: '0% (Isento de IR)',
    isTaxExempt: true,
    benchmarkType: 'cdi',
    getGrossAnnualRate: (rates) => rates.cdi * 0.9,
  },
  {
    id: 'cdb_110',
    name: 'CDB Prefixado / Pós (110% do CDI)',
    category: 'Tributado Regressivo',
    description:
      'Certificado de Depósito Bancário de bancos médios ou emissões promocionais com remuneração acima do CDI e garantia do FGC.',
    indexerDisplay: '110% do CDI',
    liquidity: 'Diária ou no vencimento (conforme emissão)',
    taxTreatment: 'Tabela Regressiva (15% a 22,5%)',
    isTaxExempt: false,
    benchmarkType: 'cdi',
    getGrossAnnualRate: (rates) => rates.cdi * 1.1,
  },
  {
    id: 'tesouro_ipca',
    name: 'Tesouro IPCA+ (IPCA + 6,2% a.a.)',
    category: 'Tributado Regressivo',
    description:
      'Título público federal que garante a reposição da inflação oficial (IPCA) acrescido de uma taxa de juros real prefixada.',
    indexerDisplay: 'IPCA + 6,20% a.a.',
    liquidity: 'Diária (com marcação a mercado se resgatar antes)',
    taxTreatment: 'Tabela Regressiva (15% a 22,5%)',
    isTaxExempt: false,
    benchmarkType: 'ipca_plus',
    getGrossAnnualRate: (rates) => {
      // (1 + IPCA) * (1 + juro real) - 1
      const ipcaFactor = 1 + rates.ipca / 100
      const realFactor = 1 + 0.062 // taxa média de juro real praticada pelo Tesouro IPCA
      return (ipcaFactor * realFactor - 1) * 100
    },
  },
  {
    id: 'tesouro_selic',
    name: 'Tesouro Selic (~100% Selic/CDI)',
    category: 'Tributado Regressivo',
    description:
      'Título emitido pelo Tesouro Nacional atrelado à taxa Selic. É a aplicação mais segura do país, ideal para reserva de emergência e caixa operacional corporativo.',
    indexerDisplay: '100% da Selic (~100% CDI)',
    liquidity: 'Diária (D+1 útil)',
    taxTreatment: 'Tabela Regressiva (15% a 22,5%)',
    isTaxExempt: false,
    benchmarkType: 'selic',
    getGrossAnnualRate: (rates) => rates.selic,
  },
  {
    id: 'cdb_100',
    name: 'CDB 100% do CDI (Liquidez Diária)',
    category: 'Tributado Regressivo',
    description:
      'CDB tradicional emitido pelos grandes bancos de varejo com liquidez diária e garantia do FGC. O benchmark básico dos investidores brasileiros.',
    indexerDisplay: '100% do CDI',
    liquidity: 'Liquidez Diária imediata',
    taxTreatment: 'Tabela Regressiva (15% a 22,5%)',
    isTaxExempt: false,
    benchmarkType: 'cdi',
    getGrossAnnualRate: (rates) => rates.cdi * 1.0,
  },
  {
    id: 'poupanca',
    name: 'Caderneta de Poupança',
    category: 'Isento de IR',
    description:
      'Aplicação tradicional regulamentada pelo governo. Rendimento mensal pela regra de 70% da Selic + TR (ou 0,5% a.m. + TR quando Selic > 8,5%).',
    indexerDisplay: '70% Selic + TR (ou 0,5% a.m. + TR)',
    liquidity: 'Aniversário mensal (perde rendimento se sacar antes)',
    taxTreatment: '0% (Isento de IR)',
    isTaxExempt: true,
    benchmarkType: 'selic',
    getGrossAnnualRate: (rates) => calculatePoupancaAnnualRate(rates.selic),
  },
]

export interface InvestmentRankItem {
  id: InvestmentType
  name: string
  category: string
  description: string
  indexerDisplay: string
  liquidity: string
  taxTreatment: string
  isTaxExempt: boolean
  grossAnnualRate: number // ex: 15.29 (%)
  effectiveTaxRate: number // ex: 17.5 (%) para prazo padrão de 12 meses
  netAnnualRate: number // ex: 12.61 (%)
  isBest: boolean
  rank: number
}

/**
 * Calcula o ranking das melhores aplicações para um prazo de referência (padrão: 12 meses = IR 17,5% para tributados).
 */
export function getInvestmentsRanking(
  rates: EconomicRates,
  referenceMonths: number = 12,
): InvestmentRankItem[] {
  const taxInfo = getRegressiveTaxRate(referenceMonths)

  const items = INVESTMENT_OPTIONS.map((opt) => {
    const grossAnnualRate = opt.getGrossAnnualRate(rates)
    const effectiveTaxRate = opt.isTaxExempt ? 0 : taxInfo.ratePercent
    // Rendimento líquido estimado anual:
    // Para aplicações tributadas: Bruto * (1 - aliquota)
    const netAnnualRate = opt.isTaxExempt
      ? grossAnnualRate
      : grossAnnualRate * (1 - effectiveTaxRate / 100)

    return {
      id: opt.id,
      name: opt.name,
      category: opt.category,
      description: opt.description,
      indexerDisplay: opt.indexerDisplay,
      liquidity: opt.liquidity,
      taxTreatment: opt.isTaxExempt
        ? 'Isento de IR'
        : `IR ${taxInfo.ratePercent}% (ref. ${referenceMonths}m)`,
      isTaxExempt: opt.isTaxExempt,
      grossAnnualRate,
      effectiveTaxRate,
      netAnnualRate,
      isBest: false,
      rank: 0,
    }
  })

  // Ordenar decrescente pelo retorno líquido anual estimado
  items.sort((a, b) => b.netAnnualRate - a.netAnnualRate)

  return items.map((item, index) => ({
    ...item,
    rank: index + 1,
    isBest: index === 0,
  }))
}

export type SimulationPeriodUnit = 'months' | 'days'

export interface SimulationResultRow {
  id: InvestmentType
  name: string
  indexerDisplay: string
  isTaxExempt: boolean
  initialAmount: number
  grossAmount: number
  grossYield: number
  taxAmount: number
  taxRatePercent: number
  netAmount: number
  netYield: number
  netReturnPercent: number
  grossAnnualRate: number
  isBest: boolean
  diffFromPoupanca: number // Quanto a mais que a poupança em R$
  note?: string // Observação contextual (ex: regra de aniversário da Poupança ou carência de LCI)
}

/**
 * Converte dias corridos para dias úteis estimados no padrão de mercado brasileiro
 * Proporção média de dias úteis em um ano comercial: ~252 úteis para ~365 corridos (fator ~0,69)
 * Para prazos pequenos (ex.: 10 dias corridos), equivalem tipicamente a 7 dias úteis.
 */
export function estimateBusinessDays(calendarDays: number): number {
  if (calendarDays <= 0) return 0
  if (calendarDays <= 7) return Math.min(calendarDays, 5)
  // Contagem pro-rata proporcional padrão de mercado: 252 / 365.25 ≈ 0.69
  return Math.max(1, Math.round((calendarDays * 252) / 365.25))
}

/**
 * Simula os ganhos para um valor e prazo específico (em meses ou dias).
 * Totalmente em memória - não grava nada.
 *
 * Metodologia:
 * - Para prazos em meses: capitalização composta anual M = P * (1 + taxa_aa)^(meses / 12).
 * - Para prazos em dias:
 *   - Ativos atrelados a CDI / Selic / IPCA+: padrão do mercado brasileiro é base 252 dias úteis:
 *     fator = (1 + taxa_aa)^(dias_úteis / 252).
 *   - Poupança: regulamentada com rendimento mensal creditado no aniversário. Em períodos
 *     diários (< 30 dias), por lei ela só rende no dia do aniversário (ou seja, saque antes de 30 dias renderia R$ 0).
 *     Para efeito comparativo de simulação econômica educativa, calculamos a rentabilidade pro-rata
 *     diária proporcional (base 30 dias corridos por mês / 365 no ano) e explicitamos a ressalva na linha/nota.
 * - Imposto de Renda:
 *   - Regressivo federal (Lei 11.033/2004):
 *     * Até 180 dias: 22,5%
 *     * 181 a 360 dias: 20,0%
 *     * 361 a 720 dias: 17,5%
 *     * Acima de 720 dias: 15,0%
 *   - Isenções legais: LCI/LCA e Poupança são 0% de IR para pessoas físicas.
 */
export function simulateInvestments(
  initialAmount: number,
  periodValue: number,
  rates: EconomicRates,
  unit: SimulationPeriodUnit = 'months',
): SimulationResultRow[] {
  if (initialAmount <= 0 || periodValue <= 0) {
    return []
  }

  const taxInfo = getRegressiveTaxRate(periodValue, unit)

  // Tempo decorrido em frações de ano
  const calendarDays = unit === 'days' ? Math.round(periodValue) : Math.round(periodValue * 30.4167)
  const businessDays =
    unit === 'days' ? estimateBusinessDays(calendarDays) : Math.round((periodValue * 252) / 12)
  const yearsEquivalent = unit === 'days' ? businessDays / 252 : periodValue / 12

  const rows: SimulationResultRow[] = INVESTMENT_OPTIONS.map((opt) => {
    const grossAnnualRate = opt.getGrossAnnualRate(rates)
    const annualMultiplier = 1 + grossAnnualRate / 100

    let grossAmount: number
    let note: string | undefined

    if (unit === 'days') {
      if (opt.id === 'poupanca') {
        // Poupança: regra legal é aniversário a cada 30 dias.
        // Pro-rata diário composto para análise comparativa
        const poupancaDailyMultiplier = Math.pow(annualMultiplier, calendarDays / 365)
        grossAmount = initialAmount * poupancaDailyMultiplier
        if (calendarDays < 30) {
          note = 'Atenção: na regra real, resgate antes de 30 dias perde todo o rendimento do mês.'
        }
      } else {
        // Títulos de renda fixa privada e pública de liquidez (CDB, Tesouro Selic/IPCA, LCI/LCA)
        // Convenção brasileira do mercado financeiro: base 252 dias úteis
        const factor = Math.pow(annualMultiplier, businessDays / 252)
        grossAmount = initialAmount * factor

        if (opt.id === 'lci_lca' && calendarDays < 270) {
          note = 'Carência legal de 9 meses (270 dias) para resgate.'
        }
      }
    } else {
      // Prazos em meses
      grossAmount = initialAmount * Math.pow(annualMultiplier, yearsEquivalent)
      if (opt.id === 'lci_lca' && periodValue < 9) {
        note = 'Carência legal mínima de 9 meses.'
      }
    }

    const grossYield = Math.max(0, grossAmount - initialAmount)
    const taxRatePercent = opt.isTaxExempt ? 0 : taxInfo.ratePercent
    const taxAmount = opt.isTaxExempt ? 0 : grossYield * (taxRatePercent / 100)
    const netYield = grossYield - taxAmount
    const netAmount = initialAmount + netYield
    const netReturnPercent = (netYield / initialAmount) * 100

    return {
      id: opt.id,
      name: opt.name,
      indexerDisplay: opt.indexerDisplay,
      isTaxExempt: opt.isTaxExempt,
      initialAmount,
      grossAmount,
      grossYield,
      taxAmount,
      taxRatePercent,
      netAmount,
      netYield,
      netReturnPercent,
      grossAnnualRate,
      isBest: false,
      diffFromPoupanca: 0,
      note,
    }
  })

  // Ordenar decrescente pelo montante líquido final
  rows.sort((a, b) => b.netAmount - a.netAmount)

  // Encontrar o rendimento da Poupança para calcular o ganho excedente
  const poupancaRow = rows.find((r) => r.id === 'poupanca')
  const poupancaNetYield = poupancaRow ? poupancaRow.netYield : 0

  return rows.map((r, index) => ({
    ...r,
    isBest: index === 0,
    diffFromPoupanca: Math.max(0, r.netYield - poupancaNetYield),
  }))
}
