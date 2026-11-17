// Módulo de cálculo da Calculadora "Simulação dos 3 Regimes" (Portal Borlim):
// Lucro Real × Lucro Presumido × Simples Nacional, lado a lado, na mesma tela.
//
// Bases legais (nenhum valor inventado):
//   • Lucro Real: IRPJ 15% sobre o lucro real + adicional de 10% sobre a parcela
//     que exceder R$ 20.000,00/mês (Lei 9.249/1995, art. 3º, § 3º); CSLL 9%
//     (Lei 7.689/1988, art. 3º); PIS 1,65% e Cofins 7,6% NÃO cumulativos, com
//     crédito sobre insumos/custos conforme o % de aproveitamento informado
//     (Leis 10.637/2002 e 10.833/2003).
//   • Lucro Presumido: módulo existente lucroPresumidoCalc.ts (presunções
//     8%/32% da Lei 9.249/1995, CSLL 9%, PIS 0,65% e Cofins 3% cumulativos).
//   • Simples Nacional: faixas vigentes da LC 123/2006 (redação LC 155/2016)
//     do módulo existente simplesHibridoCalc.ts (anexos I a V), resultado = DAS.
// Obrigatóriedade do Lucro Real: receita bruta acima de R$ 78 milhões/ano
// (Lei 9.718/1998, art. 14) ou vedações por atividade; quem ultrapassa o teto
// do Simples (R$ 4,8 mi/ano) escolhe entre Presumido e Real.
//
// Cálculo 100% no navegador, sem persistência de dados e sem chamadas de rede.

import { formatarBRL, formatarPercentual, parseCurrency } from './cbsIbsCalc'
import type { LinhaMemoria } from './cbsIbsCalc'
import { anexoPorId } from './simplesHibridoCalc'
import {
  calcularPresumido,
  ADICIONAL_IRPJ_PCT,
  ADICIONAL_IRPJ_BASE_LIMITE,
  PCT_IRPJ_ALIQUOTA,
  PCT_CSLL_ALIQUOTA,
} from './lucroPresumidoCalc'
import type { ResultadoPresumido } from './lucroPresumidoCalc'

export type { LinhaMemoria }

/* ============================ PERCENTUAIS LEGAIS ========================= */

export const PCT_IRPJ_REAL = PCT_IRPJ_ALIQUOTA // 15%
export const PCT_CSLL_REAL = PCT_CSLL_ALIQUOTA // 9%
export const PCT_PIS_NAO_CUMULATIVO = 1.65
export const PCT_COFINS_NAO_CUMULATIVO = 7.6
export const PCT_PIS_COFINS_CREDITO = PCT_PIS_NAO_CUMULATIVO + PCT_COFINS_NAO_CUMULATIVO // 9,25%
export const LIMITE_OBRIGATORIO_REAL = 'R$ 78 milhões/ano'
export const LIMITE_SIMPLES = 'R$ 4,8 milhões/ano'

/* ================================ ENTRADAS =============================== */

export interface EntradaTresRegimes {
  /** Receita bruta mensal de comércio/indústria (string pt-BR). */
  receitaComercio: string
  /** Receita bruta mensal de serviços (string pt-BR). */
  receitaServicos: string
  /** Custos/despesas dedutíveis do Lucro Real e base de crédito de PIS/Cofins. */
  custosDedutiveis: string
  /** Folha de pagamento (dedutível no Lucro Real; Fator R no Simples). */
  folhaPagamento: string
  /** % de aproveitamento de créditos de PIS/Cofins sobre os custos (Lucro Real). */
  pctCreditos: string
  /** RBT12 do Simples Nacional. */
  rbt12: string
  /** Anexo do Simples (I a V). */
  anexoId: string
  /** Alíquota de ISS do município para o Presumido (2% a 5%). */
  pctIss: string
}

export const entradaTresRegimesInicial: EntradaTresRegimes = {
  receitaComercio: '150.000,00',
  receitaServicos: '0,00',
  custosDedutiveis: '90.000,00',
  folhaPagamento: '25.000,00',
  pctCreditos: '80,00',
  rbt12: '1.500.000,00',
  anexoId: 'anexo-i',
  pctIss: '3,00',
}

/* ============================== LUCRO REAL =============================== */

export interface ResultadoLucroReal {
  receitaTotal: number
  custosDedutiveis: number
  folhaPagamento: number
  pctCreditos: number

  lucroReal: number
  tevePrejuizo: boolean
  irpj: number
  adicionalIrpj: number
  csll: number

  pisBruto: number
  cofinsBruto: number
  creditos: number
  pisCofinsLiquido: number

  iss: number
  pctIss: number

  totalTributos: number
  aliquotaEfetiva: number
}

export function calcularLucroReal(e: EntradaTresRegimes): ResultadoLucroReal {
  const receitaComercio = parseCurrency(e.receitaComercio)
  const receitaServicos = parseCurrency(e.receitaServicos)
  const receitaTotal = receitaComercio + receitaServicos
  const custosDedutiveis = parseCurrency(e.custosDedutiveis)
  const folhaPagamento = parseCurrency(e.folhaPagamento)
  const pctCreditos = parseCurrency(e.pctCreditos)
  const pctIss = parseCurrency(e.pctIss)

  const resultadoContabil = receitaTotal - custosDedutiveis - folhaPagamento
  const lucroReal = Math.max(0, resultadoContabil)
  const tevePrejuizo = resultadoContabil <= 0

  const irpj = (lucroReal * PCT_IRPJ_REAL) / 100
  const baseAdicional = Math.max(0, lucroReal - ADICIONAL_IRPJ_BASE_LIMITE)
  const adicionalIrpj = (baseAdicional * ADICIONAL_IRPJ_PCT) / 100
  const csll = (lucroReal * PCT_CSLL_REAL) / 100

  const pisBruto = (receitaTotal * PCT_PIS_NAO_CUMULATIVO) / 100
  const cofinsBruto = (receitaTotal * PCT_COFINS_NAO_CUMULATIVO) / 100
  const creditos = (custosDedutiveis * PCT_PIS_COFINS_CREDITO * pctCreditos) / 100 / 100
  const pisCofinsLiquido = Math.max(0, pisBruto + cofinsBruto - creditos)

  const iss = (receitaServicos * pctIss) / 100

  const totalTributos = irpj + adicionalIrpj + csll + pisCofinsLiquido + iss
  const aliquotaEfetiva = receitaTotal > 0 ? (totalTributos / receitaTotal) * 100 : 0

  return {
    receitaTotal,
    custosDedutiveis,
    folhaPagamento,
    pctCreditos,
    lucroReal,
    tevePrejuizo,
    irpj,
    adicionalIrpj,
    csll,
    pisBruto,
    cofinsBruto,
    creditos,
    pisCofinsLiquido,
    iss,
    pctIss,
    totalTributos,
    aliquotaEfetiva,
  }
}

/* =========================== SIMPLES NACIONAL ============================ */

export interface ResultadoSimplesRegimes {
  receitaTotal: number
  rbt12: number
  anexoNome: string
  indiceFaixa: number
  aliquotaNominal: number
  parcelaDeduzir: number
  aliquotaEfetiva: number
  dasTotal: number
  pctPisCofinsFaixa: number
  parcelaPisCofinsEmbutida: number
  limiteUltrapassado: boolean
}

export function calcularSimplesRegimes(e: EntradaTresRegimes): ResultadoSimplesRegimes {
  const receitaTotal = parseCurrency(e.receitaComercio) + parseCurrency(e.receitaServicos)
  const rbt12 = parseCurrency(e.rbt12)
  const anexo = anexoPorId(e.anexoId)

  let indice = anexo.faixas.findIndex((f) => rbt12 <= f.limite)
  if (indice < 0) indice = anexo.faixas.length - 1
  const faixa = anexo.faixas[indice]

  const aliquotaEfetiva =
    rbt12 > 0 ? (rbt12 * faixa.aliquotaNominal - faixa.parcelaDeduzir) / rbt12 : 0
  const dasTotal = (receitaTotal * aliquotaEfetiva) / 100
  const parcelaPisCofinsEmbutida = (dasTotal * faixa.pctPisCofins) / 100

  return {
    receitaTotal,
    rbt12,
    anexoNome: anexo.nome,
    indiceFaixa: indice,
    aliquotaNominal: faixa.aliquotaNominal,
    parcelaDeduzir: faixa.parcelaDeduzir,
    aliquotaEfetiva,
    dasTotal,
    pctPisCofinsFaixa: faixa.pctPisCofins,
    parcelaPisCofinsEmbutida,
    limiteUltrapassado: rbt12 > anexo.faixas[anexo.faixas.length - 1].limite,
  }
}

/* ============================== VEREDITO ================================= */

export type RegimeComparado = 'Lucro Real' | 'Lucro Presumido' | 'Simples Nacional'

export interface ColocacaoRegime {
  regime: RegimeComparado
  total: number
  /** Diferença em R$ em relação ao 1º colocado (0 para o melhor). */
  diferenca: number
  /** Diferença em % em relação ao 1º colocado (0 para o melhor). */
  diferencaPct: number
}

export interface VereditoTresRegimes {
  ordenados: ColocacaoRegime[]
  melhor: RegimeComparado
  melhorTotal: number
  pior: RegimeComparado
  piorTotal: number
  diferencaTotal: number
  diferencaPct: number
}

export function calcularVereditoTresRegimes(
  real: { totalTributos: number },
  presumido: { totalTributos: number },
  simples: { dasTotal: number },
): VereditoTresRegimes {
  const bruto: Omit<ColocacaoRegime, 'diferenca' | 'diferencaPct'>[] = [
    { regime: 'Lucro Real' as const, total: real.totalTributos },
    { regime: 'Lucro Presumido' as const, total: presumido.totalTributos },
    { regime: 'Simples Nacional' as const, total: simples.dasTotal },
  ].sort((a, b) => a.total - b.total)

  const melhorTotal = bruto[0].total
  const ordenados: ColocacaoRegime[] = bruto.map((c) => ({
    ...c,
    diferenca: c.total - melhorTotal,
    diferencaPct: melhorTotal > 0 ? ((c.total - melhorTotal) / melhorTotal) * 100 : 0,
  }))

  const pior = ordenados[ordenados.length - 1]
  const diferencaTotal = pior.total - melhorTotal
  return {
    ordenados,
    melhor: ordenados[0].regime,
    melhorTotal,
    pior: pior.regime,
    piorTotal: pior.total,
    diferencaTotal,
    // Diferença % do PIOR em relação ao MELHOR (base coerente com o box
    // "MENOR IMPOSTO NESTE MÊS"): (pior − melhor) ÷ melhor × 100.
    diferencaPct: melhorTotal > 0 ? (diferencaTotal / melhorTotal) * 100 : 0,
  }
}

/* ============================ MEMÓRIA DE CÁLCULO ========================= */

export function calcularMemoriaLucroReal(r: ResultadoLucroReal): LinhaMemoria[] {
  const linhas: LinhaMemoria[] = [
    {
      rotulo: '1. Receita bruta total do mês = comércio + serviços',
      valor: formatarBRL(r.receitaTotal),
      destaque: 'base',
    },
    {
      rotulo: '(−) Custos/despesas dedutíveis (compram crédito de PIS/Cofins)',
      valor: formatarBRL(r.custosDedutiveis),
    },
    {
      rotulo: '(−) Folha de pagamento (dedutível no Lucro Real)',
      valor: formatarBRL(r.folhaPagamento),
    },
  ]

  if (r.tevePrejuizo) {
    linhas.push({
      rotulo:
        '= Resultado NEGATIVO (prejuízo): IRPJ e CSLL = R$ 0,00 neste mês — vantagem do Lucro Real',
      valor: formatarBRL(0),
      destaque: 'total',
    })
  } else {
    linhas.push({
      rotulo: '= Lucro real do mês (base do IRPJ e da CSLL)',
      valor: formatarBRL(r.lucroReal),
      destaque: 'base',
    })
    linhas.push({
      rotulo: `2. IRPJ = lucro real × ${formatarPercentual(PCT_IRPJ_REAL)}`,
      valor: formatarBRL(r.irpj),
    })
    if (r.adicionalIrpj > 0) {
      linhas.push({
        rotulo: `   (+) Adicional IRPJ = 10% sobre o lucro que excede R$ 20.000/mês`,
        valor: formatarBRL(r.adicionalIrpj),
      })
    }
    linhas.push({
      rotulo: `3. CSLL = lucro real × ${formatarPercentual(PCT_CSLL_REAL)}`,
      valor: formatarBRL(r.csll),
    })
  }

  linhas.push({
    rotulo: `4. PIS = receita bruta × ${formatarPercentual(PCT_PIS_NAO_CUMULATIVO)} (não cumulativo)`,
    valor: formatarBRL(r.pisBruto),
  })
  linhas.push({
    rotulo: `5. Cofins = receita bruta × ${formatarPercentual(PCT_COFINS_NAO_CUMULATIVO)} (não cumulativo)`,
    valor: formatarBRL(r.cofinsBruto),
  })
  linhas.push({
    rotulo: `   (−) Créditos = custos × ${formatarPercentual(
      PCT_PIS_COFINS_CREDITO,
    )} × aproveitamento de ${formatarPercentual(r.pctCreditos)}`,
    valor: formatarBRL(r.creditos),
  })
  linhas.push({
    rotulo: '= PIS/Cofins líquido (depois dos créditos)',
    valor: formatarBRL(r.pisCofinsLiquido),
    destaque: 'cbs',
  })
  if (r.iss > 0) {
    linhas.push({
      rotulo: `6. ISS = receita de serviços × ${formatarPercentual(r.pctIss)} (alíquota do município)`,
      valor: formatarBRL(r.iss),
    })
  }
  linhas.push({
    rotulo:
      'RESULTADO — Total de tributos do LUCRO REAL (IRPJ + adicion. + CSLL + PIS/Cofins líq. + ISS)',
    valor: formatarBRL(r.totalTributos),
    destaque: 'total',
  })
  linhas.push({
    rotulo: 'Alíquota efetiva sobre a receita bruta total',
    valor: formatarPercentual(r.aliquotaEfetiva),
  })
  linhas.push({
    rotulo:
      'Nota: o Lucro Real é OBRIGATÓRIO acima de R$ 78 milhões/ano (ou por atividade) e tende a vencer com margens apertadas ou muitas despesas geradoras de crédito',
    valor: '',
  })
  return linhas
}

export function calcularMemoriaSimplesRegimes(r: ResultadoSimplesRegimes): LinhaMemoria[] {
  return [
    {
      rotulo: `Faixa localizada: RBT12 de ${formatarBRL(r.rbt12)} na ${
        r.indiceFaixa + 1
      }ª faixa do ${r.anexoNome}`,
      valor: '',
    },
    {
      rotulo: 'Alíquota nominal da faixa',
      valor: formatarPercentual(r.aliquotaNominal),
    },
    {
      rotulo: '(−) Parcela a deduzir da faixa',
      valor: formatarBRL(r.parcelaDeduzir),
    },
    {
      rotulo: '1. Alíquota efetiva = (RBT12 × nominal − dedução) ÷ RBT12',
      valor: formatarPercentual(r.aliquotaEfetiva),
      destaque: 'base',
    },
    {
      rotulo: '2. DAS = receita bruta do mês × alíquota efetiva',
      valor: formatarBRL(r.dasTotal),
      destaque: 'total',
    },
    {
      rotulo: `PIS/Cofins embutido na alíquota efetiva desta faixa: ${formatarPercentual(
        r.pctPisCofinsFaixa,
      )} ≈ ${formatarBRL(r.parcelaPisCofinsEmbutida)} (para comparação honesta)`,
      valor: '',
    },
    {
      rotulo: 'Alíquota efetiva sobre a receita bruta total',
      valor: formatarPercentual(r.aliquotaEfetiva),
    },
    {
      rotulo: `Nota: disponível até R$ 4,8 milhões/ano; tributa o FATURAMENTO (mesmo com prejuízo). Custos e folha não reduzem o DAS${
        r.limiteUltrapassado ? ' — ATENÇÃO: RBT12 acima do teto do anexo' : ''
      }`,
      valor: '',
    },
  ]
}

export function calcularMemoriaPresumidoRegimes(r: ResultadoPresumido): LinhaMemoria[] {
  const linhas: LinhaMemoria[] = []
  if (r.receitaComercio > 0) {
    linhas.push({
      rotulo: `1. Lucro presumido comércio/indústria = ${formatarBRL(r.receitaComercio)} × 8%`,
      valor: formatarBRL(r.lucroPresumidoComercio),
    })
  }
  if (r.receitaServicos > 0) {
    linhas.push({
      rotulo: `2. Lucro presumido serviços = ${formatarBRL(r.receitaServicos)} × 32%`,
      valor: formatarBRL(r.lucroPresumidoServicos),
    })
  }
  linhas.push({
    rotulo: '= Lucro presumido total do mês (base do IRPJ e da CSLL)',
    valor: formatarBRL(r.lucroPresumidoTotal),
    destaque: 'base',
  })
  linhas.push({
    rotulo: `3. IRPJ = lucro presumido × ${formatarPercentual(PCT_IRPJ_ALIQUOTA)}`,
    valor: formatarBRL(r.irpj),
  })
  if (r.adicionalIrpj > 0) {
    linhas.push({
      rotulo: '   (+) Adicional IRPJ = 10% sobre o lucro presumido que excede R$ 20.000/mês',
      valor: formatarBRL(r.adicionalIrpj),
    })
  }
  linhas.push({
    rotulo: `4. CSLL = (receita comércio × 12% + receita serviços × 32%) × ${formatarPercentual(
      PCT_CSLL_ALIQUOTA,
    )}`,
    valor: formatarBRL(r.csll),
  })
  linhas.push({
    rotulo: '5. PIS = receita bruta total × 0,65% (cumulativo, sem crédito)',
    valor: formatarBRL(r.pis),
  })
  linhas.push({
    rotulo: '6. Cofins = receita bruta total × 3% (cumulativo, sem crédito)',
    valor: formatarBRL(r.cofins),
  })
  if (r.iss > 0) {
    linhas.push({
      rotulo: `7. ISS = receita de serviços × ${formatarPercentual(r.pctIss)} (LC 116/2003)`,
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
    rotulo: 'Alíquota efetiva sobre a receita bruta total',
    valor: formatarPercentual(r.aliquotaEfetiva),
  })
  linhas.push({
    rotulo:
      'Nota: no Presumido os custos e a folha NÃO reduzem o imposto — a base é a presunção legal da receita (Lei 9.249/1995)',
    valor: '',
  })
  return linhas
}
