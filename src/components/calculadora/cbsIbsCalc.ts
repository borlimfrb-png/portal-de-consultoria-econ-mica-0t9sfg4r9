// Módulo de cálculo da Calculadora Educativa CBS/IBS do Portal Borlim.
// Inspirado (com fidelidade educativa) na Calculadora de Tributação sobre Consumo
// da Receita Federal — piloto-cbs.tributos.gov.br (Simulador "Regime Regular e
// Simples Nacional" + "Split Payment" simplificado).
// Cálculo 100% no navegador, sem persistência de dados.

export const ALIQUOTA_CBS_PADRAO = '8,80' // % federal (referência)
export const ALIQUOTA_IBS_PADRAO = '17,70' // % estadual/municipal (referência)

export const CALCULADORA_OFICIAL_URL =
  'https://piloto-cbs.tributos.gov.br/servico/calculadora-consumo/calculadora'

export interface ItemOperacao {
  id: string
  descricao: string
  ncm: string
  vProd: string
  vFrete: string
  vSeg: string
  vOutro: string
  vDesc: string
  vIS: string
  usoIS: boolean
  pctCBS: string
  pctIBS: string
}

export const novoItem = (): ItemOperacao => ({
  id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  descricao: '',
  ncm: '',
  vProd: '',
  vFrete: '',
  vSeg: '',
  vOutro: '',
  vDesc: '',
  vIS: '',
  usoIS: false,
  pctCBS: ALIQUOTA_CBS_PADRAO,
  pctIBS: ALIQUOTA_IBS_PADRAO,
})

/** Converte texto com vírgula decimal e pontos de milhar em número. */
export function parseCurrency(input: string): number {
  if (!input) return 0
  let cleaned = String(input).replace(/[^\d.,-]/g, '')
  const hasComma = cleaned.includes(',')
  const hasDot = cleaned.includes('.')
  if (hasComma && hasDot) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.')
  } else if (hasComma) {
    cleaned = cleaned.replace(',', '.')
  } else if (hasDot) {
    const parts = cleaned.split('.')
    const last = parts[parts.length - 1]
    if (parts.length > 1 && last.length === 3) cleaned = cleaned.replace(/\./g, '')
  }
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) || parsed < 0 ? 0 : parsed
}

export function formatarBRL(val: number): string {
  return val.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatarPercentual(val: number): string {
  return `${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
}

/* ============================= REGIME REGULAR ============================= */

export interface ResultadoItem {
  id: string
  descricao: string
  ncm: string
  vProd: number
  vFrete: number
  vSeg: number
  vOutro: number
  vDesc: number
  vIS: number
  base: number
  pctCBS: number
  pctIBS: number
  cbs: number
  ibs: number
  is: number
  total: number
}

/** Fórmula oficial: Base IBS/CBS = (vProd + vFrete + vSeg + vOutro) − (vDesc + vIS) */
export function calcularItemCbsIbs(item: ItemOperacao): ResultadoItem {
  const vProd = parseCurrency(item.vProd)
  const vFrete = parseCurrency(item.vFrete)
  const vSeg = parseCurrency(item.vSeg)
  const vOutro = parseCurrency(item.vOutro)
  const vDesc = parseCurrency(item.vDesc)
  const vIS = item.usoIS ? parseCurrency(item.vIS) : 0
  const pctCBS = parseCurrency(item.pctCBS)
  const pctIBS = parseCurrency(item.pctIBS)

  const base = Math.max(0, vProd + vFrete + vSeg + vOutro - vDesc - vIS)
  const cbs = (base * pctCBS) / 100
  const ibs = (base * pctIBS) / 100
  const total = cbs + ibs + vIS

  return {
    id: item.id,
    descricao: item.descricao,
    ncm: item.ncm,
    vProd,
    vFrete,
    vSeg,
    vOutro,
    vDesc,
    vIS,
    base,
    pctCBS,
    pctIBS,
    cbs,
    ibs,
    is: vIS,
    total,
  }
}

export function calcularTotalItens(itens: ItemOperacao[]): ResultadoItem[] {
  return itens.map(calcularItemCbsIbs)
}

export interface ResumoConsolidado {
  totalBase: number
  totalCBS: number
  totalIBS: number
  totalIS: number
  totalTributos: number
  totalNota: number
  aliquotaEfetiva: number
}

export function calcularResumoConsolidado(itens: ItemOperacao[]): ResumoConsolidado {
  const rs = calcularTotalItens(itens)
  const totalBase = rs.reduce((a, r) => a + r.base, 0)
  const totalCBS = rs.reduce((a, r) => a + r.cbs, 0)
  const totalIBS = rs.reduce((a, r) => a + r.ibs, 0)
  const totalIS = rs.reduce((a, r) => a + r.is, 0)
  const totalTributos = totalCBS + totalIBS + totalIS
  return {
    totalBase,
    totalCBS,
    totalIBS,
    totalIS,
    totalTributos,
    totalNota: totalBase + totalIS + totalTributos,
    aliquotaEfetiva: totalBase > 0 ? (totalTributos / totalBase) * 100 : 0,
  }
}

/* ============================ SIMPLES NACIONAL ============================ */

export interface ResultadoSimples {
  rbsn: number
  aliquotaDAS: number
  dasTotal: number
  cbsEstimada: number
  ibsEstimada: number
}

/**
 * No Simples Nacional, a LC 214/25 separa a parcela de IBS/CBS da guia única
 * (DAS): esses valores passam a ser recolhidos à parte a partir de 2026.
 * A partilha aqui é didática, na proporção das alíquotas de referência
 * (8,8% CBS e 17,7% IBS dentro dos ~26,5% totais).
 */
export function calcularSimplesNacional(rbsn: number, aliquotaDAS: number): ResultadoSimples {
  const dasTotal = (rbsn * aliquotaDAS) / 100
  const cbsEstimada = dasTotal * (8.8 / 26.5)
  const ibsEstimada = dasTotal * (17.7 / 26.5)
  return { rbsn, aliquotaDAS, dasTotal, cbsEstimada, ibsEstimada }
}

/* =========================== MEMÓRIA DE CÁLCULO =========================== */

export interface LinhaMemoria {
  rotulo: string
  valor: string
  destaque?: 'base' | 'cbs' | 'ibs' | 'is' | 'total'
}

export function calcularMemoriaRegular(
  resultados: ResultadoItem[],
  resumo: ResumoConsolidado,
): LinhaMemoria[] {
  const linhas: LinhaMemoria[] = []

  resultados.forEach((r, i) => {
    const rotuloItem = r.descricao || `Item ${i + 1}`
    const ncmTxt = r.ncm ? ` (NCM ${r.ncm})` : ''
    const soma = r.vProd + r.vFrete + r.vSeg + r.vOutro
    linhas.push({
      rotulo: `${i + 1}. ${rotuloItem}${ncmTxt} — soma (vProd + vFrete + vSeg + vOutro)`,
      valor: formatarBRL(soma),
    })
    if (r.vDesc > 0) {
      linhas.push({ rotulo: '   (−) vDesc (descontos)', valor: formatarBRL(r.vDesc) })
    }
    if (r.vIS > 0) {
      linhas.push({ rotulo: '   (−) vIS (Imposto Seletivo)', valor: formatarBRL(r.vIS) })
    }
    linhas.push({
      rotulo: `   = Base IBS/CBS do item → CBS ${formatarPercentual(r.pctCBS)} + IBS ${formatarPercentual(r.pctIBS)}`,
      valor: formatarBRL(r.base),
      destaque: 'base',
    })
    linhas.push({
      rotulo: `      CBS = base × ${formatarPercentual(r.pctCBS)}`,
      valor: formatarBRL(r.cbs),
      destaque: 'cbs',
    })
    linhas.push({
      rotulo: `      IBS = base × ${formatarPercentual(r.pctIBS)}`,
      valor: formatarBRL(r.ibs),
      destaque: 'ibs',
    })
    if (r.is > 0) {
      linhas.push({ rotulo: '      IS (vIS informado)', valor: formatarBRL(r.is), destaque: 'is' })
    }
    linhas.push({
      rotulo: '      Total de tributos do item',
      valor: formatarBRL(r.total),
      destaque: 'total',
    })
  })

  linhas.push({
    rotulo: `RESULTADO TOTAL — Base IBS/CBS (soma de ${resultados.length} ${resultados.length === 1 ? 'item' : 'itens'})`,
    valor: formatarBRL(resumo.totalBase),
    destaque: 'base',
  })
  linhas.push({
    rotulo: 'RESULTADO TOTAL — CBS',
    valor: formatarBRL(resumo.totalCBS),
    destaque: 'cbs',
  })
  linhas.push({
    rotulo: 'RESULTADO TOTAL — IBS',
    valor: formatarBRL(resumo.totalIBS),
    destaque: 'ibs',
  })
  if (resumo.totalIS > 0) {
    linhas.push({
      rotulo: 'RESULTADO TOTAL — Imposto Seletivo',
      valor: formatarBRL(resumo.totalIS),
      destaque: 'is',
    })
  }
  linhas.push({
    rotulo: 'RESULTADO TOTAL — Total de tributos',
    valor: formatarBRL(resumo.totalTributos),
    destaque: 'total',
  })
  linhas.push({
    rotulo: 'RESULTADO TOTAL — Alíquota efetiva',
    valor: formatarPercentual(resumo.aliquotaEfetiva),
  })
  linhas.push({
    rotulo: 'RESULTADO TOTAL — Valor bruto da nota (base + IS + tributos)',
    valor: formatarBRL(resumo.totalNota),
  })

  return linhas
}

export function calcularMemoriaSimples(
  rbsn: number,
  aliquotaDAS: number,
  calc: ResultadoSimples,
  cClassTrib: string,
): LinhaMemoria[] {
  return [
    {
      rotulo: 'RBSN (receita bruta — base do Simples Nacional)',
      valor: formatarBRL(rbsn),
      destaque: 'base',
    },
    {
      rotulo: 'Alíquota efetiva informada (faixa do DAS)',
      valor: formatarPercentual(aliquotaDAS),
    },
    {
      rotulo: 'DAS total = RBSN × alíquota efetiva',
      valor: formatarBRL(calc.dasTotal),
      destaque: 'total',
    },
    {
      rotulo: 'Parcela CBS estimada (partilha didática 8,8/26,5)',
      valor: formatarBRL(calc.cbsEstimada),
      destaque: 'cbs',
    },
    {
      rotulo: 'Parcela IBS estimada (partilha didática 17,7/26,5)',
      valor: formatarBRL(calc.ibsEstimada),
      destaque: 'ibs',
    },
    {
      rotulo: `cClassTrib informado: ${cClassTrib || '—'} (classificação tributária do contribuinte)`,
      valor: '—',
    },
    {
      rotulo:
        'Nota LC 214/25: no Simples, IBS/CBS saem da guia única (DAS) e passam a ser recolhidos à parte a partir de 2026',
      valor: '',
    },
  ]
}

export function calcularMemoriaSplit(resumo: ResumoConsolidado): LinhaMemoria[] {
  // eslint-disable-line
  const bruto = resumo.totalNota
  const retido = resumo.totalTributos
  const liquido = bruto - retido
  return [
    {
      rotulo: 'Valor bruto da nota (base + IS + CBS + IBS)',
      valor: formatarBRL(bruto),
      destaque: 'base',
    },
    {
      rotulo: '(−) CBS+IBS+IS retidos na fonte pelo adquirente (split payment)',
      valor: formatarBRL(retido),
      destaque: 'total',
    },
    {
      rotulo: '= Valor líquido recebido pelo fornecedor',
      valor: formatarBRL(liquido),
      destaque: 'total',
    },
    {
      rotulo:
        'No split payment o tributo é apurado e recolhido automaticamente no momento da liquidação financeira',
      valor: '',
    },
  ]
}
