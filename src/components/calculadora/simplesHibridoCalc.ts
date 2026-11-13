// Módulo de cálculo da Calculadora Educativa "Simples Híbrido" do Portal Borlim.
// Simples Nacional (DAS) com exclusão de PIS/Cofins recolhidos por fora no regime
// não cumulativo (art. 52 da LC 123/2006 e art. 55 da Lei 11.196/2005).
// Tabelas dos anexos: LC 123/2006 com a redação da LC 155/2016 (vigente).
// Cálculo 100% no navegador, sem persistência de dados.

import { formatarBRL, formatarPercentual, parseCurrency } from './cbsIbsCalc'
import type { LinhaMemoria } from './cbsIbsCalc'

export type { LinhaMemoria }

/* ============================ TABELAS LC 123/2006 ========================== */

export interface FaixaSimples {
  limite: number
  aliquotaNominal: number
  parcelaDeduzir: number
  /** % da alíquota efetiva correspondente a PIS + Cofins nessa faixa. */
  pctPisCofins: number
}

export interface AnexoSimples {
  id: string
  nome: string
  descricao: string
  faixas: FaixaSimples[]
}

// Pct. de repartição de PIS/Pasep + Cofins da alíquota efetiva, por faixa,
// conforme o art. 18, § 1º-B, da LC 123/2006 (redação LC 155/2016).
const PIS_COFINS_ANEXO_I = [15.5, 15.5, 15.5, 15.5, 15.5, 34.4]
const PIS_COFINS_ANEXO_II = [14.0, 14.0, 14.0, 14.0, 14.0, 25.5]
const PIS_COFINS_ANEXO_III = [15.6, 17.1, 16.6, 16.6, 15.6, 19.5]
const PIS_COFINS_ANEXO_IV = [21.5, 25.0, 24.0, 23.0, 22.0, 25.0]
const PIS_COFINS_ANEXO_V = [17.15, 17.15, 18.15, 19.15, 17.15, 20.0]

export const ANEXOS_SIMPLES: AnexoSimples[] = [
  {
    id: 'anexo-i',
    nome: 'Anexo I — Comércio',
    descricao: 'Revenda de mercadorias (lojas, atacadistas, e-commerce).',
    faixas: [
      {
        limite: 180000,
        aliquotaNominal: 4.0,
        parcelaDeduzir: 0,
        pctPisCofins: PIS_COFINS_ANEXO_I[0],
      },
      {
        limite: 360000,
        aliquotaNominal: 7.3,
        parcelaDeduzir: 5940,
        pctPisCofins: PIS_COFINS_ANEXO_I[1],
      },
      {
        limite: 720000,
        aliquotaNominal: 9.5,
        parcelaDeduzir: 13860,
        pctPisCofins: PIS_COFINS_ANEXO_I[2],
      },
      {
        limite: 1800000,
        aliquotaNominal: 10.7,
        parcelaDeduzir: 22500,
        pctPisCofins: PIS_COFINS_ANEXO_I[3],
      },
      {
        limite: 3600000,
        aliquotaNominal: 14.3,
        parcelaDeduzir: 87300,
        pctPisCofins: PIS_COFINS_ANEXO_I[4],
      },
      {
        limite: 4800000,
        aliquotaNominal: 19.0,
        parcelaDeduzir: 378000,
        pctPisCofins: PIS_COFINS_ANEXO_I[5],
      },
    ],
  },
  {
    id: 'anexo-ii',
    nome: 'Anexo II — Indústria',
    descricao: 'Venda de mercadorias industrializadas pelo próprio contribuinte.',
    faixas: [
      {
        limite: 180000,
        aliquotaNominal: 4.5,
        parcelaDeduzir: 0,
        pctPisCofins: PIS_COFINS_ANEXO_II[0],
      },
      {
        limite: 360000,
        aliquotaNominal: 7.8,
        parcelaDeduzir: 5940,
        pctPisCofins: PIS_COFINS_ANEXO_II[1],
      },
      {
        limite: 720000,
        aliquotaNominal: 10.0,
        parcelaDeduzir: 13860,
        pctPisCofins: PIS_COFINS_ANEXO_II[2],
      },
      {
        limite: 1800000,
        aliquotaNominal: 11.2,
        parcelaDeduzir: 22500,
        pctPisCofins: PIS_COFINS_ANEXO_II[3],
      },
      {
        limite: 3600000,
        aliquotaNominal: 14.7,
        parcelaDeduzir: 85500,
        pctPisCofins: PIS_COFINS_ANEXO_II[4],
      },
      {
        limite: 4800000,
        aliquotaNominal: 30.0,
        parcelaDeduzir: 720000,
        pctPisCofins: PIS_COFINS_ANEXO_II[5],
      },
    ],
  },
  {
    id: 'anexo-iii',
    nome: 'Anexo III — Serviços',
    descricao:
      'Locação de bens móveis e prestação de serviços não relacionados no § 5º-C (com Fator R).',
    faixas: [
      {
        limite: 180000,
        aliquotaNominal: 6.0,
        parcelaDeduzir: 0,
        pctPisCofins: PIS_COFINS_ANEXO_III[0],
      },
      {
        limite: 360000,
        aliquotaNominal: 11.2,
        parcelaDeduzir: 9360,
        pctPisCofins: PIS_COFINS_ANEXO_III[1],
      },
      {
        limite: 720000,
        aliquotaNominal: 13.5,
        parcelaDeduzir: 17640,
        pctPisCofins: PIS_COFINS_ANEXO_III[2],
      },
      {
        limite: 1800000,
        aliquotaNominal: 16.0,
        parcelaDeduzir: 35640,
        pctPisCofins: PIS_COFINS_ANEXO_III[3],
      },
      {
        limite: 3600000,
        aliquotaNominal: 21.0,
        parcelaDeduzir: 125640,
        pctPisCofins: PIS_COFINS_ANEXO_III[4],
      },
      {
        limite: 4800000,
        aliquotaNominal: 33.0,
        parcelaDeduzir: 648000,
        pctPisCofins: PIS_COFINS_ANEXO_III[5],
      },
    ],
  },
  {
    id: 'anexo-iv',
    nome: 'Anexo IV — Serviços',
    descricao:
      'Serviços do § 5º-C: administração e locação de imóveis, academias, elaboração de produtos não destinados à venda, vigilância, limpeza, obras (até 30% material).',
    faixas: [
      {
        limite: 180000,
        aliquotaNominal: 4.5,
        parcelaDeduzir: 0,
        pctPisCofins: PIS_COFINS_ANEXO_IV[0],
      },
      {
        limite: 360000,
        aliquotaNominal: 9.0,
        parcelaDeduzir: 8100,
        pctPisCofins: PIS_COFINS_ANEXO_IV[1],
      },
      {
        limite: 720000,
        aliquotaNominal: 10.2,
        parcelaDeduzir: 12420,
        pctPisCofins: PIS_COFINS_ANEXO_IV[2],
      },
      {
        limite: 1800000,
        aliquotaNominal: 14.0,
        parcelaDeduzir: 39780,
        pctPisCofins: PIS_COFINS_ANEXO_IV[3],
      },
      {
        limite: 3600000,
        aliquotaNominal: 22.0,
        parcelaDeduzir: 183780,
        pctPisCofins: PIS_COFINS_ANEXO_IV[4],
      },
      {
        limite: 4800000,
        aliquotaNominal: 33.0,
        parcelaDeduzir: 828000,
        pctPisCofins: PIS_COFINS_ANEXO_IV[5],
      },
    ],
  },
  {
    id: 'anexo-v',
    nome: 'Anexo V — Serviços',
    descricao:
      'Serviços intelectuais do § 5º-I (jornalismo, publicidade, engenharia, auditoria) quando o Fator R ficar abaixo de 28%.',
    faixas: [
      {
        limite: 180000,
        aliquotaNominal: 15.5,
        parcelaDeduzir: 0,
        pctPisCofins: PIS_COFINS_ANEXO_V[0],
      },
      {
        limite: 360000,
        aliquotaNominal: 18.0,
        parcelaDeduzir: 4500,
        pctPisCofins: PIS_COFINS_ANEXO_V[1],
      },
      {
        limite: 720000,
        aliquotaNominal: 19.5,
        parcelaDeduzir: 9900,
        pctPisCofins: PIS_COFINS_ANEXO_V[2],
      },
      {
        limite: 1800000,
        aliquotaNominal: 20.5,
        parcelaDeduzir: 17100,
        pctPisCofins: PIS_COFINS_ANEXO_V[3],
      },
      {
        limite: 3600000,
        aliquotaNominal: 23.0,
        parcelaDeduzir: 62100,
        pctPisCofins: PIS_COFINS_ANEXO_V[4],
      },
      {
        limite: 4800000,
        aliquotaNominal: 30.5,
        parcelaDeduzir: 540000,
        pctPisCofins: PIS_COFINS_ANEXO_V[5],
      },
    ],
  },
]

/* ============================ PIS/COFINS POR FORA ========================== */

export const PCT_PIS_NAO_CUMULATIVO = 1.65
export const PCT_COFINS_NAO_CUMULATIVO = 7.6
export const PCT_PIS_COFINS_NAO_CUMULATIVO = PCT_PIS_NAO_CUMULATIVO + PCT_COFINS_NAO_CUMULATIVO // 9,25%

export function anexoPorId(id: string): AnexoSimples {
  return ANEXOS_SIMPLES.find((a) => a.id === id) ?? ANEXOS_SIMPLES[0]
}

/* ================================ CÁLCULO ================================= */

export interface EntradaHibrido {
  receitaMes: string
  rbt12: string
  anexoId: string
  pctPisCofinsAliquota: string
  receitaInsumos: string
  pctAproveitamento: string
}

export const entradaHibridoInicial: EntradaHibrido = {
  receitaMes: '150.000,00',
  rbt12: '1.500.000,00',
  anexoId: 'anexo-ii',
  pctPisCofinsAliquota: '14,00',
  receitaInsumos: '60.000,00',
  pctAproveitamento: '9,25',
}

export interface ResultadoHibrido {
  receitaMes: number
  rbt12: number
  anexo: AnexoSimples
  indiceFaixa: number
  pctPisCofinsAliquota: number
  receitaInsumos: number
  pctAproveitamento: number

  // Simples PURO
  aliquotaEfetiva: number
  parcelaPisCofinsNoDas: number
  dasPuro: number

  // Simples HÍBRIDO
  aliquotaSemPisCofins: number
  dasHibrido: number
  pisCofinsBruto: number
  creditos: number
  pisCofinsLiquido: number
  totalHibrido: number

  // Comparação
  diferenca: number // negativo = híbrido paga menos
  diferencaPct: number // variação % em relação ao Simples puro
  hibridoCompensa: boolean
}

function faixaPorRbt12(
  anexo: AnexoSimples,
  rbt12: number,
): { faixa: FaixaSimples; indice: number } {
  for (let i = 0; i < anexo.faixas.length; i++) {
    if (rbt12 <= anexo.faixas[i].limite) return { faixa: anexo.faixas[i], indice: i }
  }
  const ultima = anexo.faixas[anexo.faixas.length - 1]
  return { faixa: ultima, indice: anexo.faixas.length - 1 }
}

export function calcularHibrido(entrada: EntradaHibrido): ResultadoHibrido {
  const receitaMes = parseCurrency(entrada.receitaMes)
  const rbt12 = parseCurrency(entrada.rbt12)
  const anexo = anexoPorId(entrada.anexoId)
  const { faixa, indice } = faixaPorRbt12(anexo, rbt12)

  // % de PIS/Cofins na alíquota efetiva: usa a repartição da faixa encontrada
  // como padrão; o usuário pode sobrescrever no campo editável.
  const pctInformado = parseCurrency(entrada.pctPisCofinsAliquota)
  const pctPisCofins = pctInformado > 0 ? pctInformado : faixa.pctPisCofins

  const receitaInsumos = parseCurrency(entrada.receitaInsumos)
  const pctAproveitamento = parseCurrency(entrada.pctAproveitamento)

  // Fórmula oficial (LC 123, art. 18, § 1º-A):
  // Efetiva = (RBT12 × nominal − dedução) / RBT12
  const aliquotaEfetiva =
    rbt12 > 0 ? (rbt12 * faixa.aliquotaNominal - faixa.parcelaDeduzir) / rbt12 : 0

  const dasPuro = (receitaMes * aliquotaEfetiva) / 100
  const parcelaPisCofinsNoDas = (dasPuro * pctPisCofins) / 100

  const aliquotaSemPisCofins = aliquotaEfetiva * (1 - pctPisCofins / 100)
  const dasHibrido = (receitaMes * aliquotaSemPisCofins) / 100

  const pisCofinsBruto = (receitaMes * PCT_PIS_COFINS_NAO_CUMULATIVO) / 100
  const creditos = (receitaInsumos * pctAproveitamento) / 100
  const pisCofinsLiquido = Math.max(0, pisCofinsBruto - creditos)
  const totalHibrido = dasHibrido + pisCofinsLiquido

  const diferenca = totalHibrido - dasPuro // negativo = híbrido paga menos
  const diferencaPct = dasPuro > 0 ? (diferenca / dasPuro) * 100 : 0

  return {
    receitaMes,
    rbt12,
    anexo,
    indiceFaixa: indice,
    pctPisCofinsAliquota: pctPisCofins,
    receitaInsumos,
    pctAproveitamento,
    aliquotaEfetiva,
    parcelaPisCofinsNoDas,
    dasPuro,
    aliquotaSemPisCofins,
    dasHibrido,
    pisCofinsBruto,
    creditos,
    pisCofinsLiquido,
    totalHibrido,
    diferenca,
    diferencaPct,
    hibridoCompensa: diferenca < 0,
  }
}

/* ============================ MEMÓRIA DE CÁLCULO =========================== */

export function calcularMemoriaHibrido(r: ResultadoHibrido): LinhaMemoria[] {
  const faixa = r.anexo.faixas[r.indiceFaixa]
  return [
    {
      rotulo: `Faixa localizada: RBT12 de ${formatarBRL(r.rbt12)} na ${r.indiceFaixa + 1}ª faixa do ${r.anexo.nome}`,
      valor: '',
    },
    {
      rotulo: `Alíquota nominal da faixa`,
      valor: formatarPercentual(faixa.aliquotaNominal),
    },
    {
      rotulo: `(−) Parcela a deduzir da faixa`,
      valor: formatarBRL(faixa.parcelaDeduzir),
    },
    {
      rotulo: '1. Alíquota efetiva = (RBT12 × nominal − dedução) ÷ RBT12',
      valor: formatarPercentual(r.aliquotaEfetiva),
      destaque: 'base',
    },
    {
      rotulo: '2. DAS Simples PURO = receita do mês × alíquota efetiva',
      valor: formatarBRL(r.dasPuro),
      destaque: 'total',
    },
    {
      rotulo: `3. PIS/Cofins embutido no DAS = DAS × ${formatarPercentual(r.pctPisCofinsAliquota)}`,
      valor: formatarBRL(r.parcelaPisCofinsNoDas),
    },
    {
      rotulo: `4. Alíquota sem PIS/Cofins = efetiva × (1 − ${formatarPercentual(r.pctPisCofinsAliquota)})`,
      valor: formatarPercentual(r.aliquotaSemPisCofins),
    },
    {
      rotulo: '5. DAS do HÍBRIDO = receita do mês × alíquota sem PIS/Cofins',
      valor: formatarBRL(r.dasHibrido),
      destaque: 'base',
    },
    {
      rotulo: '6. PIS/Cofins por FORA = receita do mês × 1,65% + 7,6%',
      valor: formatarBRL(r.pisCofinsBruto),
    },
    {
      rotulo: '(−) Créditos = insumos × aproveitamento',
      valor: formatarBRL(r.creditos),
    },
    {
      rotulo: '= PIS/Cofins líquido por fora (não cumulativo)',
      valor: formatarBRL(r.pisCofinsLiquido),
      destaque: 'cbs',
    },
    {
      rotulo: 'RESULTADO — Total HÍBRIDO (DAS sem PIS/Cofins + PIS/Cofins por fora)',
      valor: formatarBRL(r.totalHibrido),
      destaque: 'total',
    },
    {
      rotulo: `Diferença HÍBRIDO vs PURO: ${formatarBRL(r.diferenca)} (${r.hibridoCompensa ? 'híbrido paga menos' : 'não compensa'})`,
      valor: formatarPercentual(r.diferencaPct),
      destaque: 'total',
    },
    {
      rotulo:
        'Nota: valores educativos de referência — não substituem a apuração oficial no PGDAS-D nem a apuração contábil do PIS/Cofins',
      valor: '',
    },
  ]
}
