// Módulo de cálculo "Lucro Presumido" da Calculadora Educativa do Simples Híbrido
// (Portal Borlim). Cálculo 100% no navegador, sem persistência de dados.
//
// Bases legais dos percentuais usados (nenhum valor inventado):
//   • Presunção de lucro IRPJ/CSLL: art. 15 da Lei 9.249/1995 — 8% (comércio e
//     indústria) ou 32% (serviços, administração de bens, consultoria) da
//     receita bruta mensal; receita de revenda de mercadorias de atividade
//     industrial também presunção de 8%.
//   • Adicional de IRPJ: 10% sobre a parcela do lucro presumido que exceder
//     R$ 20.000,00/mês (Lei 9.249/1995, art. 3º, § 3º, e Lei 9.318/1996, art. 1º).
//   • CSLL: 9% de presunção de 12% (comércio/indústria) ou 32% (serviços) sobre
//     a receita bruta — art. 18 da Lei 9.249/1995 e art. 28, II e III, do ADCT.
//   • PIS 0,65% e Cofins 3% (regime cumulativo, Lei 10.637/2002 e Lei 10.833/2003).
//   • ISS: 2% a 5% conforme o município (LC 116/2003, art. 8º-A) — default 3%,
//     editável pelo usuário.
//   • Receitas de comércio e de serviços são tributadas separadamente, cada uma
//     na sua presunção; o relatório mostra a composição.

import { formatarBRL, formatarPercentual, parseCurrency } from './cbsIbsCalc'
import type { LinhaMemoria } from './cbsIbsCalc'
import {
  calcularImpostoLiquido,
  comprasDe,
  temIcmsIpi,
  linhaImpostoLiquido,
  pctPisCofinsPresumidoPadrao,
} from './creditosDebitosCalc'
import type { BlocoComum, PctPisCofinsRegime, ResultadoImpostoLiquido } from './creditosDebitosCalc'

export type { LinhaMemoria }

/* ============================ ENTRADAS ================================== */

export type TipoAtividadePresumido = 'comercio-industria' | 'servicos'

export interface EntradaPresumido {
  /** Receita bruta de comércio/indústria (presunção 8%) em string pt-BR. */
  receitaComercio: string
  /** Receita bruta de serviços (presunção 32%) em string pt-BR. */
  receitaServicos: string
  /** Alíquota de ISS (2% a 5% conforme o município; LC 116/2003). */
  pctIss: string
  /** Despesas dedutíveis do IRPJ/CSLL (operação, folha, etc.) em string pt-BR. */
  despesasDedutiveis: string
  /**
   * Bloco CRÉDITOS / DÉBITOS / CUSTOS E DESPESAS — opcional para não quebrar
   * os usos existentes; quando ausente, o cálculo fica como antes.
   */
  blocoComum?: BlocoComum
  /** Percentuais de PIS/Cofins (compras e vendas) do PRESUMIDO — cumulativo. */
  pctPisCofinsPresumido?: PctPisCofinsRegime
}

export const entradaPresumidoInicial: EntradaPresumido = {
  receitaComercio: '150.000,00',
  receitaServicos: '0,00',
  pctIss: '3,00',
  despesasDedutiveis: '0,00',
}

/* ============================ PERCENTUAIS LEGAIS ========================= */

// Lei 9.249/1995, art. 15 (presunção de lucro da receita bruta):
export const PCT_PRESUNCAO_IRPJ_COMERCIO = 8 // comércio e indústria
export const PCT_PRESUNCAO_IRPJ_SERVICOS = 32 // serviços em geral
// Adicional de IRPJ sobre lucro presumido acima de R$ 20.000/mês:
export const ADICIONAL_IRPJ_PCT = 10
export const ADICIONAL_IRPJ_BASE_LIMITE = 20000
// CSLL: presunção de 12% (comércio/indústria) ou 32% (serviços) da receita bruta;
// alíquota 9% (Lei 7.689/1988, art. 3º, e Lei 9.249/1995, art. 18):
export const PCT_PRESUNCAO_CSLL_COMERCIO = 12
export const PCT_PRESUNCAO_CSLL_SERVICOS = 32
export const PCT_CSLL_ALIQUOTA = 9
// PIS 0,65% e Cofins 3% (regime cumulativo, Lei 10.637/2002 e Lei 10.833/2003):
export const PCT_PIS_CUMULATIVO = 0.65
export const PCT_COFINS_CUMULATIVO = 3
// Alíquota de IRPJ sobre o lucro presumido:
export const PCT_IRPJ_ALIQUOTA = 15

/* ============================ HELPERS =================================== */

function pctDe(str: string): number {
  const v = parseCurrency(str)
  return isFinite(v) && v >= 0 ? v : 0
}

/** Aplica uma presunção (%) sobre a receita, deduz despesas proporcionais e nunca fica negativa. */
function lucroPresumido(
  receita: number,
  pctPresuncao: number,
  pctDespesaProporcional: number,
): number {
  if (receita <= 0) return 0
  const presuncao = (receita * pctPresuncao) / 100
  const despesaRateada = (presuncao * pctDespesaProporcional) / 100
  return Math.max(0, presuncao - despesaRateada)
}

/* ============================ CÁLCULO =================================== */

export interface ResultadoPresumido {
  // Entradas normalizadas
  receitaComercio: number
  receitaServicos: number
  receitaTotal: number
  pctIss: number
  despesasDedutiveis: number

  // Presunção
  lucroPresumidoComercio: number
  lucroPresumidoServicos: number
  lucroPresumidoTotal: number

  // IRPJ
  irpj: number
  adicionalIrpj: number

  // CSLL
  csll: number

  // PIS/Cofins cumulativos (percentuais INFORMADOS, com crédito sobre compras)
  pis: number
  cofins: number
  pisDetalhe: ResultadoImpostoLiquido
  cofinsDetalhe: ResultadoImpostoLiquido

  // ICMS/IPI apurados com os % informados (são devidos mesmo no cumulativo)
  icms: ResultadoImpostoLiquido | null
  ipi: ResultadoImpostoLiquido | null

  // Bloco CUSTOS E DESPESAS (informativo — não altera a presunção legal)
  comprasMateriaPrima: number
  custoMateriaPrima: number
  despesasFixas: number
  despesasFinanceiras: number
  outrasDespesas: number

  // ISS
  iss: number

  // Totais
  totalTributos: number
  aliquotaEfetiva: number // % da receita bruta total

  // Comparação com o Simples
  diferencaVsHibrido: number // total presumido − total híbrido
  diferencaVsHibridoPct: number
  presumidoGanhaVsHibrido: boolean // presumido mais barato
}

export function calcularPresumido(e: EntradaPresumido): ResultadoPresumido {
  const receitaComercio = parseCurrency(e.receitaComercio)
  const receitaServicos = parseCurrency(e.receitaServicos)
  const receitaTotal = receitaComercio + receitaServicos
  const pctIss = pctDe(e.pctIss)
  const despesasDedutiveis = parseCurrency(e.despesasDedutiveis)

  // A despesa dedutível é rateada entre as bases de presunção
  // proporcionalmente à receita de cada bloco (não pode dar lucro negativo).
  const pctDespesaComercio = receitaTotal > 0 ? (receitaComercio / receitaTotal) * 100 : 0
  const pctDespesaServicos = receitaTotal > 0 ? (receitaServicos / receitaTotal) * 100 : 0

  const lucroPresumidoComercio = lucroPresumido(
    receitaComercio,
    PCT_PRESUNCAO_IRPJ_COMERCIO,
    pctDespesaComercio,
  )
  const lucroPresumidoServicos = lucroPresumido(
    receitaServicos,
    PCT_PRESUNCAO_IRPJ_SERVICOS,
    pctDespesaServicos,
  )
  const lucroPresumidoTotal = lucroPresumidoComercio + lucroPresumidoServicos

  // Presunção da CSLL: 12% comércio/indústria, 32% serviços (Lei 9.249/1995, art. 18).
  const csllBaseComercio = lucroPresumido(
    receitaComercio,
    PCT_PRESUNCAO_CSLL_COMERCIO,
    pctDespesaComercio,
  )
  const csllBaseServicos = lucroPresumido(
    receitaServicos,
    PCT_PRESUNCAO_CSLL_SERVICOS,
    pctDespesaServicos,
  )

  const irpj = (lucroPresumidoTotal * PCT_IRPJ_ALIQUOTA) / 100

  // Adicional de 10% sobre a parcela do lucro presumido mensal que exceder R$ 20.000
  const baseAdicional = Math.max(0, lucroPresumidoTotal - ADICIONAL_IRPJ_BASE_LIMITE)
  const adicionalIrpj = (baseAdicional * ADICIONAL_IRPJ_PCT) / 100

  const csllBaseTotal = csllBaseComercio + csllBaseServicos
  const csll = (csllBaseTotal * PCT_CSLL_ALIQUOTA) / 100

  // PIS/Cofins: percentuais INFORMADOS pelo usuário (default cumulativo
  // 0,65%/3%, sem crédito; o usuário pode ajustar para o caso real).
  const pctP = e.pctPisCofinsPresumido ?? pctPisCofinsPresumidoPadrao
  const compras = e.blocoComum ? comprasDe(e.blocoComum) : 0
  const pisL = calcularImpostoLiquido(receitaTotal, compras, pctP.pctPisVendas, pctP.pctPisCompras)
  const cofinsL = calcularImpostoLiquido(
    receitaTotal,
    compras,
    pctP.pctCofinsVendas,
    pctP.pctCofinsCompras,
  )
  const icms = e.blocoComum
    ? calcularImpostoLiquido(
        receitaTotal,
        compras,
        e.blocoComum.pctIcmsVendas,
        e.blocoComum.pctIcmsCompras,
      )
    : null
  const ipi = e.blocoComum
    ? calcularImpostoLiquido(
        receitaTotal,
        compras,
        e.blocoComum.pctIpiVendas,
        e.blocoComum.pctIpiCompras,
      )
    : null

  // PIS/Cofins da base: débito (receita × % vendas) − crédito (compras × % compras).
  const pis = pisL.liquido
  const cofins = cofinsL.liquido

  // ICMS/IPI no Presumido: apurados com os % informados e SOMADOS ao total do
  // mês (o regime cumulativo não dá crédito, mas o ICMS/IPI são devidos igual).
  const icmsLiquido = icms ? icms.liquido : 0
  const ipiLiquido = ipi ? ipi.liquido : 0

  // ISS sobre a receita de serviços (default 3%, editável — LC 116/2003).
  const iss = (receitaServicos * pctIss) / 100

  const totalTributos = irpj + adicionalIrpj + csll + pis + cofins + iss + icmsLiquido + ipiLiquido
  const aliquotaEfetiva = receitaTotal > 0 ? (totalTributos / receitaTotal) * 100 : 0

  // Custo das matérias-primas e despesas do bloco novo — não mudam a presunção
  // legal, mas entram no "lucro efetivo estimado" exibido na memória.
  const custoMateriaPrima = e.blocoComum ? parseCurrency(e.blocoComum.custoMateriaPrima) : 0
  const despesasFixas = e.blocoComum ? parseCurrency(e.blocoComum.despesasFixas) : 0
  const despesasFinanceiras = e.blocoComum ? parseCurrency(e.blocoComum.despesasFinanceiras) : 0
  const outrasDespesas = e.blocoComum ? parseCurrency(e.blocoComum.outrasDespesas) : 0
  const comprasMateriaPrima = compras

  return {
    receitaComercio,
    receitaServicos,
    receitaTotal,
    pctIss,
    despesasDedutiveis,
    lucroPresumidoComercio,
    lucroPresumidoServicos,
    lucroPresumidoTotal,
    irpj,
    adicionalIrpj,
    csll,
    pis,
    cofins,
    iss,
    comprasMateriaPrima,
    pisDetalhe: pisL,
    cofinsDetalhe: cofinsL,
    icms,
    ipi,
    custoMateriaPrima,
    despesasFixas,
    despesasFinanceiras,
    outrasDespesas,
    totalTributos,
    aliquotaEfetiva,
    diferencaVsHibrido: 0,
    diferencaVsHibridoPct: 0,
    presumidoGanhaVsHibrido: false,
  }
}

/* ============ COMPARAÇÃO QUÁDRUPLA (Simples × Híbrido × Pres. × Real) ===== */

export type RegimeCenarioHibrido =
  | 'Simples puro'
  | 'Simples híbrido'
  | 'Lucro presumido'
  | 'Lucro real'

export interface VereditoQuatroCenarios {
  /** IDs dos regimes ordenados do menor para o maior imposto do mês. */
  ordenados: Array<{
    regime: RegimeCenarioHibrido
    total: number
  }>
  melhorRegime: RegimeCenarioHibrido
  melhorTotal: number
  piorRegime: RegimeCenarioHibrido
  piorTotal: number
  /** Diferença do pior em relação ao melhor. */
  diferencaTotal: number
  diferencaPct: number
  /** true se o híbrido é o mais barato (relevante para a mensagem educativa). */
  hibridoGanha: boolean
}

export function calcularVereditoQuatroCenarios(
  rHibrido: { dasPuro: number; totalHibrido: number },
  rPresumido: { totalTributos: number },
  rReal: { totalTributos: number },
): VereditoQuatroCenarios {
  const cenarios = [
    { regime: 'Simples puro' as const, total: rHibrido.dasPuro },
    { regime: 'Simples híbrido' as const, total: rHibrido.totalHibrido },
    { regime: 'Lucro presumido' as const, total: rPresumido.totalTributos },
    { regime: 'Lucro real' as const, total: rReal.totalTributos },
  ].sort((a, b) => a.total - b.total)

  const melhor = cenarios[0]
  const pior = cenarios[cenarios.length - 1]
  const diferencaTotal = pior.total - melhor.total
  const diferencaPct = melhor.total > 0 ? (diferencaTotal / melhor.total) * 100 : 0

  return {
    ordenados: cenarios,
    melhorRegime: melhor.regime,
    melhorTotal: melhor.total,
    piorRegime: pior.regime,
    piorTotal: pior.total,
    diferencaTotal,
    diferencaPct,
    hibridoGanha: melhor.regime === 'Simples híbrido',
  }
}

/* ============================ MEMÓRIA DE CÁLCULO ======================== */

export function calcularMemoriaPresumido(r: ResultadoPresumido): LinhaMemoria[] {
  const linhas: LinhaMemoria[] = []

  linhas.push({
    rotulo: `Presunção de lucro (Lei 9.249/95, art. 15): comércio/indústria ${formatarPercentual(PCT_PRESUNCAO_IRPJ_COMERCIO)} · serviços ${formatarPercentual(PCT_PRESUNCAO_IRPJ_SERVICOS)}`,
    valor: '',
  })

  if (r.receitaComercio > 0) {
    linhas.push({
      rotulo: `1. Lucro presumido comércio/indústria = receita ${formatarBRL(r.receitaComercio)} × 8%`,
      valor: formatarBRL(r.lucroPresumidoComercio),
    })
  }
  if (r.receitaServicos > 0) {
    linhas.push({
      rotulo: `2. Lucro presumido serviços = receita ${formatarBRL(r.receitaServicos)} × 32%`,
      valor: formatarBRL(r.lucroPresumidoServicos),
    })
  }
  linhas.push({
    rotulo: '= Lucro presumido total do mês (base do IRPJ e CSLL)',
    valor: formatarBRL(r.lucroPresumidoTotal),
    destaque: 'base',
  })

  linhas.push({
    rotulo: `3. IRPJ = lucro presumido × 15%`,
    valor: formatarBRL(r.irpj),
  })
  if (r.adicionalIrpj > 0) {
    linhas.push({
      rotulo: `   (+) Adicional IRPJ = 10% sobre o lucro presumido que excede R$ 20.000/mês`,
      valor: formatarBRL(r.adicionalIrpj),
    })
  } else {
    linhas.push({
      rotulo: `   Adicional IRPJ = 0 (lucro presumido até R$ 20.000/mês)`,
      valor: formatarBRL(0),
    })
  }

  linhas.push({
    rotulo: `4. CSLL = (receita comércio × 12% + receita serviços × 32%) × 9%`,
    valor: formatarBRL(r.csll),
  })
  linhas.push(linhaImpostoLiquido('5.', 'PIS = débito − crédito das compras', r.pisDetalhe))
  linhas.push(linhaImpostoLiquido('6.', 'Cofins = débito − crédito das compras', r.cofinsDetalhe))
  if (r.icms && temIcmsIpi(r.icms, r.ipi ?? r.icms)) {
    linhas.push(linhaImpostoLiquido('7.', 'ICMS = débito − crédito das compras', r.icms))
    if (r.ipi) {
      linhas.push(linhaImpostoLiquido('8.', 'IPI = débito − crédito das compras', r.ipi))
    }
  }
  if (r.receitaServicos > 0) {
    linhas.push({
      rotulo: `9. ISS = receita de serviços × ${formatarPercentual(r.pctIss)} (alíquota do município, LC 116/2003)`,
      valor: formatarBRL(r.iss),
    })
  }
  if (
    r.custoMateriaPrima > 0 ||
    r.despesasFixas > 0 ||
    r.despesasFinanceiras > 0 ||
    r.outrasDespesas > 0
  ) {
    linhas.push({
      rotulo: '(−) Custo das matérias-primas e despesas do mês (não reduzem a presunção legal)',
      valor: formatarBRL(
        r.custoMateriaPrima + r.despesasFixas + r.despesasFinanceiras + r.outrasDespesas,
      ),
    })
  }

  linhas.push({
    rotulo:
      'RESULTADO — Total de tributos do LUCRO PRESUMIDO (IRPJ + adicion. + CSLL + PIS + Cofins + ISS + ICMS/IPI)',
    valor: formatarBRL(r.totalTributos),
    destaque: 'total',
  })
  linhas.push({
    rotulo: `Alíquota efetiva sobre a receita bruta total`,
    valor: formatarPercentual(r.aliquotaEfetiva),
  })
  // Lucro efetivo estimado: receita − custos/despesas informados − tributos.
  const totalDespesas =
    r.custoMateriaPrima + r.despesasFixas + r.despesasFinanceiras + r.outrasDespesas
  if (r.receitaTotal > 0 && (totalDespesas > 0 || r.despesasDedutiveis > 0)) {
    const lucroEfetivo = r.receitaTotal - totalDespesas - r.totalTributos
    linhas.push({
      rotulo: 'Lucro efetivo estimado = receita − custos/despesas − tributos do mês',
      valor: formatarBRL(lucroEfetivo),
      destaque: 'total',
    })
  }
  linhas.push({
    rotulo: `Diferença vs Simples híbrido: ${formatarBRL(r.diferencaVsHibrido)} (${r.presumidoGanhaVsHibrido ? 'presumido paga menos' : 'híbrido paga menos'})`,
    valor: formatarPercentual(r.diferencaVsHibridoPct),
    destaque: 'total',
  })
  linhas.push({
    rotulo:
      'Nota: valores educativos de referência — não substituem a apuração oficial (PER/DCOMP) nem a apuração contábil',
    valor: '',
  })

  return linhas
}
