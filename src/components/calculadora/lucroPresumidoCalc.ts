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

  // PIS/Cofins cumulativos
  pis: number
  cofins: number

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

  // PIS/Cofins cumulativos sobre a RECEITA BRUTA (não sobre o lucro):
  const pis = (receitaTotal * PCT_PIS_CUMULATIVO) / 100
  const cofins = (receitaTotal * PCT_COFINS_CUMULATIVO) / 100

  // ISS sobre a receita de serviços (default 3%, editável — LC 116/2003).
  const iss = (receitaServicos * pctIss) / 100

  const totalTributos = irpj + adicionalIrpj + csll + pis + cofins + iss
  const aliquotaEfetiva = receitaTotal > 0 ? (totalTributos / receitaTotal) * 100 : 0

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
    totalTributos,
    aliquotaEfetiva,
    diferencaVsHibrido: 0,
    diferencaVsHibridoPct: 0,
    presumidoGanhaVsHibrido: false,
  }
}

/* ==================== COMPARAÇÃO TRIPLO (Simples × Híbrido × Presumido) === */

export interface VereditoTresCenarios {
  /** IDs dos regimes ordenados do menor para o maior imposto do mês. */
  ordenados: Array<{
    regime: 'Simples puro' | 'Simples híbrido' | 'Lucro presumido'
    total: number
  }>
  melhorRegime: 'Simples puro' | 'Simples híbrido' | 'Lucro presumido'
  melhorTotal: number
  piorRegime: 'Simples puro' | 'Simples híbrido' | 'Lucro presumido'
  piorTotal: number
  /** Diferença do pior em relação ao melhor. */
  diferencaTotal: number
  diferencaPct: number
  /** true se o híbrido é o mais barato (relevante para a mensagem educativa). */
  hibridoGanha: boolean
}

export function calcularVereditoTresCenarios(
  rHibrido: { dasPuro: number; totalHibrido: number },
  rPresumido: { totalTributos: number },
): VereditoTresCenarios {
  const cenarios = [
    { regime: 'Simples puro' as const, total: rHibrido.dasPuro },
    { regime: 'Simples híbrido' as const, total: rHibrido.totalHibrido },
    { regime: 'Lucro presumido' as const, total: rPresumido.totalTributos },
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
  linhas.push({
    rotulo: `5. PIS = receita bruta total × 0,65% (cumulativo)`,
    valor: formatarBRL(r.pis),
  })
  linhas.push({
    rotulo: `6. Cofins = receita bruta total × 3% (cumulativo)`,
    valor: formatarBRL(r.cofins),
  })
  if (r.receitaServicos > 0) {
    linhas.push({
      rotulo: `7. ISS = receita de serviços × ${formatarPercentual(r.pctIss)} (alíquota do município, LC 116/2003)`,
      valor: formatarBRL(r.iss),
    })
  }

  linhas.push({
    rotulo:
      'RESULTADO — Total de tributos do LUCRO PRESUMIDO (IRPJ + adicion. + CSLL + PIS + Cofins + ISS)',
    valor: formatarBRL(r.totalTributos),
    destaque: 'total',
  })
  linhas.push({
    rotulo: `Alíquota efetiva sobre a receita bruta total`,
    valor: formatarPercentual(r.aliquotaEfetiva),
  })
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
