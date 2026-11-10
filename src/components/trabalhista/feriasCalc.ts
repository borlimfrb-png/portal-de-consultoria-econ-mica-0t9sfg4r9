/**
 * Módulo de cálculo da Calculadora de Férias — área Trabalhista do Portal Borlim.
 * Base educativa: férias proporcionais (art. 130 CLT), adicional de 1/3
 * constitucional (art. 7º, XVII, CF), abono pecuniário (arts. 143/144 CLT),
 * tabela progressiva de INSS (vigência 01/02/2025 — Portaria Interministerial
 * MPS/MF nº 6/2025), tabela IRRF a partir de maio/2025 (Lei 15.191/2025 —
 * desconto simplificado único de R$ 607,20) e redução do IRRF (Lei 15.270/2025 —
 * imposto zero até R$ 5.000,00 mensais, vigente desde 01/2026).
 * Cálculo 100% no navegador, sem persistência de dados.
 */

import { parseCurrency, formatarBRL, type LinhaMemoria } from '@/components/calculadora/cbsIbsCalc'

export { parseCurrency, formatarBRL }
export type { LinhaMemoria }

/** Tabela progressiva de INSS do empregado (vigência 01/02/2025 — Portaria 6/2025). */
export const TABELA_INSS_2025 = [
  { ate: 1518.0, aliquota: 0.075, faixa: 'até R$ 1.518,00' },
  { ate: 2793.88, aliquota: 0.09, faixa: 'de R$ 1.518,01 a R$ 2.793,88' },
  { ate: 4190.83, aliquota: 0.12, faixa: 'de R$ 2.793,89 a R$ 4.190,83' },
  { ate: 8157.41, aliquota: 0.14, faixa: 'de R$ 4.190,84 a R$ 8.157,41' },
]

/** Tabela progressiva mensal do IRRF (vigência a partir de maio/2025 — Lei 15.191/2025). */
export const TABELA_IRRF_2025 = [
  { ate: 2428.8, aliquota: 0, deducao: 0, faixa: 'até R$ 2.428,80' },
  { ate: 2826.65, aliquota: 0.075, deducao: 182.16, faixa: 'de R$ 2.428,81 a R$ 2.826,65' },
  { ate: 3751.05, aliquota: 0.15, deducao: 394.16, faixa: 'de R$ 2.826,66 a R$ 3.751,05' },
  { ate: 4664.68, aliquota: 0.225, deducao: 675.49, faixa: 'de R$ 3.751,06 a R$ 4.664,68' },
  { ate: Infinity, aliquota: 0.275, deducao: 908.73, faixa: 'acima de R$ 4.664,68' },
]

export const DEDUCAO_DEPENDENTE_IRRF = 189.59 // dedução mensal por dependente (tabela vigente)
export const DESCONTO_SIMPLIFICADO_IRRF = 607.2 // desconto simplificado mensal (Lei 15.191/2025)

/* Redução do IRRF — Lei 15.270/2025, vigente a partir de janeiro/2026 */
export const REDUCAO_IRRF_LIMITE_FAIXA1 = 5000.0
export const REDUCAO_IRRF_LIMITE_FAIXA2 = 7350.0
export const REDUCAO_IRRF_FAIXA2_FIXO = 978.62
export const REDUCAO_IRRF_FAIXA2_COEF = 0.133145

/** Redução mensal do IRRF (Lei 15.270/2025): zero até R$ 5.000 e parcial até R$ 7.350. */
export function calcularReducaoIrrf(rendimentoTributavel: number): number {
  if (rendimentoTributavel <= REDUCAO_IRRF_LIMITE_FAIXA1) return 312.89
  if (rendimentoTributavel <= REDUCAO_IRRF_LIMITE_FAIXA2) {
    return Math.max(0, REDUCAO_IRRF_FAIXA2_FIXO - REDUCAO_IRRF_FAIXA2_COEF * rendimentoTributavel)
  }
  return 0
}

export interface EntradaFerias {
  salarioBruto: string
  diasFerias: number // 30/20/15/10/5 + campo livre (1 a 30)
  dependentes: number
  abonoPecuniario: boolean // vender até 1/3 do período (art. 143 CLT)
  mediaHorasExtras: string
  mediaAdicionalNoturno: string
  mediaComissoes: string
}

export const entradaFeriasInicial: EntradaFerias = {
  salarioBruto: '3.000,00',
  diasFerias: 30,
  dependentes: 0,
  abonoPecuniario: false,
  mediaHorasExtras: '',
  mediaAdicionalNoturno: '',
  mediaComissoes: '',
}

/** Opções de dias de férias oferecidas como atalho. */
export const OPCOES_DIAS_FERIAS = [30, 20, 15, 10, 5]

export interface ResultadoFerias {
  diasFerias: number
  proporcao: number
  salarioBruto: number
  mediaHabituais: number
  baseRemuneracao: number // salário + médias habituais
  valorDia: number
  feriasProporcionais: number
  tercoConstitucional: number
  abonoPecuniario: boolean
  diasAbono: number
  valorAbono: number
  tercoAbono: number
  brutoTotal: number
  baseInss: number
  inss: number
  aliquotaEfetivaInss: number
  baseIrrf: number
  deducaoDependentes: number
  deducaoAplicada: number
  usaDescontoSimplificado: boolean
  aliquotaIrrf: number // %
  parcelaDeduzir: number
  irrfAntesReducao: number
  reducaoIrrf: number
  irrf: number
  liquidoTotal: number
}

/** INSS progressivo por faixas (escalonamento, como na tabela vigente). */
export function calcularInss(base: number): number {
  if (base <= 0) return 0
  let anterior = 0
  let inss = 0
  for (const faixa of TABELA_INSS_2025) {
    const topo = Math.min(base, faixa.ate)
    const fatia = topo - anterior
    if (fatia > 0) inss += fatia * faixa.aliquota
    anterior = faixa.ate
    if (base <= faixa.ate) break
  }
  return inss
}

function faixaIrrf(base: number) {
  return TABELA_IRRF_2025.find((f) => base <= f.ate) ?? TABELA_IRRF_2025[4]
}

/**
 * IRRF vigente (2026): aplica a tabela progressiva por dois caminhos — deduções
 * legais (dependentes + parcela a deduzir) ou desconto simplificado (Lei
 * 15.191/2025), valendo o mais vantajoso — e depois aplica a redução da Lei
 * 15.270/2025 (imposto zero até R$ 5.000 mensais).
 */
export function calcularIrrfVigente(baseIrrf: number, dependentes: number) {
  const deducaoDependentes = Math.max(0, Math.floor(dependentes || 0)) * DEDUCAO_DEPENDENTE_IRRF

  // Caminho 1 — deduções legais (dependentes + parcela a deduzir da tabela)
  const baseLegal = Math.max(0, baseIrrf - deducaoDependentes)
  const fxLegal = faixaIrrf(baseLegal)
  const irrfLegal = Math.max(0, baseLegal * fxLegal.aliquota - fxLegal.deducao)

  // Caminho 2 — desconto simplificado único (substitui todas as deduções legais)
  const baseSimpl = Math.max(0, baseIrrf - DESCONTO_SIMPLIFICADO_IRRF)
  const fxSimpl = faixaIrrf(baseSimpl)
  const irrfSimpl = Math.max(0, baseSimpl * fxSimpl.aliquota - fxSimpl.deducao)

  const usaSimplificado = irrfSimpl <= irrfLegal
  const fx = usaSimplificado ? fxSimpl : fxLegal
  const deducaoAplicada = usaSimplificado ? DESCONTO_SIMPLIFICADO_IRRF : deducaoDependentes
  const irrfAntesReducao = usaSimplificado ? irrfSimpl : irrfLegal
  const reducaoIrrf = Math.min(irrfAntesReducao, calcularReducaoIrrf(baseIrrf))
  const irrf = Math.max(0, irrfAntesReducao - reducaoIrrf)

  return {
    deducaoDependentes,
    deducaoAplicada,
    usaDescontoSimplificado: usaSimplificado,
    aliquotaIrrf: fx.aliquota * 100,
    parcelaDeduzir: fx.deducao,
    irrfAntesReducao,
    reducaoIrrf,
    irrf,
  }
}

export function calcularFerias(e: EntradaFerias): ResultadoFerias {
  const salarioBruto = parseCurrency(e.salarioBruto)
  const he = parseCurrency(e.mediaHorasExtras)
  const noturno = parseCurrency(e.mediaAdicionalNoturno)
  const comissoes = parseCurrency(e.mediaComissoes)
  const dias = Math.min(30, Math.max(1, Math.round(e.diasFerias || 30)))
  const dependentes = Math.max(0, Math.floor(e.dependentes || 0))
  const mediaHabituais = he + noturno + comissoes
  const baseRemuneracao = salarioBruto + mediaHabituais
  const valorDia = baseRemuneracao / 30

  const feriasProporcionais = valorDia * dias
  const tercoConstitucional = feriasProporcionais / 3

  // Abono pecuniário: até 1/3 do período (10 dias em férias de 30) — art. 143/144 CLT
  const abonoPecuniario = e.abonoPecuniario && dias >= 3
  const diasAbono = abonoPecuniario ? Math.floor(dias / 3) : 0
  const valorAbono = valorDia * diasAbono
  const tercoAbono = valorAbono / 3

  const brutoTotal = feriasProporcionais + tercoConstitucional + valorAbono + tercoAbono

  // INSS: incide sobre férias + 1/3 (o abono pecuniário não sofre incidência)
  const baseInss = feriasProporcionais + tercoConstitucional
  const inss = calcularInss(baseInss)
  const aliquotaEfetivaInss = baseInss > 0 ? (inss / baseInss) * 100 : 0

  // IRRF: base = bruto − INSS (tabela vigente)
  const baseIrrf = Math.max(0, brutoTotal - inss)
  const irrfInfo = calcularIrrfVigente(baseIrrf, dependentes)

  return {
    diasFerias: dias,
    proporcao: dias / 30,
    salarioBruto,
    mediaHabituais,
    baseRemuneracao,
    valorDia,
    feriasProporcionais,
    tercoConstitucional,
    abonoPecuniario,
    diasAbono,
    valorAbono,
    tercoAbono,
    brutoTotal,
    baseInss,
    inss,
    aliquotaEfetivaInss,
    baseIrrf,
    ...irrfInfo,
    liquidoTotal: brutoTotal - inss - irrfInfo.irrf,
  }
}

/** Memória de cálculo passo a passo (renderizada com ListaMemoria). */
export function memoriaFerias(r: ResultadoFerias): LinhaMemoria[] {
  const linhas: LinhaMemoria[] = []

  linhas.push({
    rotulo: '1. Remuneração base (salário bruto + médias habituais)',
    valor: formatarBRL(r.baseRemuneracao),
    destaque: 'base',
  })
  if (r.mediaHabituais > 0) {
    linhas.push({
      rotulo: '     médias incluídas (horas extras, adicional noturno, comissões)',
      valor: formatarBRL(r.mediaHabituais),
    })
  }
  linhas.push({
    rotulo: `2. Férias = (base ÷ 30) × ${r.diasFerias} dias`,
    valor: formatarBRL(r.feriasProporcionais),
    destaque: 'base',
  })
  linhas.push({
    rotulo: '3. (+) Adicional de 1/3 constitucional (art. 7º, XVII, CF)',
    valor: formatarBRL(r.tercoConstitucional),
    destaque: 'base',
  })
  if (r.abonoPecuniario) {
    linhas.push({
      rotulo: `4. (+) Abono pecuniário — venda de ${r.diasAbono} dias (art. 143 CLT)`,
      valor: formatarBRL(r.valorAbono),
      destaque: 'base',
    })
    linhas.push({
      rotulo: '5. (+) 1/3 sobre o abono pecuniário (art. 144 CLT)',
      valor: formatarBRL(r.tercoAbono),
      destaque: 'base',
    })
  }
  linhas.push({
    rotulo: 'Bruto das férias',
    valor: formatarBRL(r.brutoTotal),
    destaque: 'total',
  })
  linhas.push({
    rotulo: '6. (−) INSS — tabela progressiva 2025, escalonado por faixas',
    valor: formatarBRL(r.inss),
    destaque: 'is',
  })
  if (r.baseInss > 0) {
    linhas.push({
      rotulo: `     base do INSS ${formatarBRL(r.baseInss)} → alíquota efetiva`,
      valor: `${r.aliquotaEfetivaInss.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`,
    })
  }
  linhas.push({
    rotulo: '7. Base do IRRF = bruto − INSS',
    valor: formatarBRL(r.baseIrrf),
    destaque: 'base',
  })
  if (r.usaDescontoSimplificado) {
    linhas.push({
      rotulo: '8. (−) Desconto simplificado (Lei 15.191/2025) — substitui as deduções legais',
      valor: formatarBRL(r.deducaoAplicada),
      destaque: 'is',
    })
  } else {
    if (r.deducaoDependentes > 0) {
      linhas.push({
        rotulo: '8a. (−) Dedução por dependentes (R$ 189,59 por dependente)',
        valor: formatarBRL(r.deducaoDependentes),
        destaque: 'is',
      })
    }
    linhas.push({
      rotulo: '8b. (−) Parcela a deduzir da tabela progressiva',
      valor: formatarBRL(r.parcelaDeduzir),
      destaque: 'is',
    })
  }
  linhas.push({
    rotulo: `9. IRRF da tabela = base × ${r.aliquotaIrrf.toLocaleString('pt-BR')}% − parcela a deduzir`,
    valor: formatarBRL(r.irrfAntesReducao),
    destaque: 'is',
  })
  if (r.reducaoIrrf > 0) {
    linhas.push({
      rotulo: '10. (−) Redução do IRRF (Lei 15.270/2025 — imposto zero até R$ 5.000)',
      valor: formatarBRL(r.reducaoIrrf),
      destaque: 'is',
    })
  }
  linhas.push({
    rotulo: 'IRRF a reter',
    valor: formatarBRL(r.irrf),
    destaque: 'is',
  })
  linhas.push({
    rotulo: 'Líquido a receber de férias',
    valor: formatarBRL(r.liquidoTotal),
    destaque: 'total',
  })
  linhas.push({
    rotulo:
      'Aviso educativo: valores estimados, não substituem o holerite; não considera férias em dobro (art. 137 CLT)',
    valor: '',
  })

  return linhas
}

/** Faixas do INSS em formato de exibição (referência educativa na UI). */
export function faixasInssTabela(): { faixa: string; aliquota: string }[] {
  return TABELA_INSS_2025.map((f) => ({
    faixa: f.faixa,
    aliquota: `${(f.aliquota * 100).toLocaleString('pt-BR')}%`,
  }))
}

/** Faixas do IRRF em formato de exibição (referência educativa na UI). */
export function faixasIrrfTabela(): { faixa: string; aliquota: string; parcela: string }[] {
  return TABELA_IRRF_2025.map((f) => ({
    faixa: f.faixa,
    aliquota: `${(f.aliquota * 100).toLocaleString('pt-BR')}%`,
    parcela: f.deducao > 0 ? formatarBRL(f.deducao) : '—',
  }))
}
