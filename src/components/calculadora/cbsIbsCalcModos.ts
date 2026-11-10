// Módulo de cálculo dos modos "Pedágio" e "Bases de Cálculo" da Calculadora
// Educativa CBS/IBS — reproduzidos da Calculadora de Tributação sobre Consumo
// da Receita Federal (piloto-cbs.tributos.gov.br). Cálculo 100% no navegador.

import { formatarBRL, formatarPercentual, parseCurrency } from './cbsIbsCalc'
import type { LinhaMemoria } from './cbsIbsCalc'

export type { LinhaMemoria }

/* ================================ PEDÁGIO ================================ */

/**
 * Modo Pedágio (ferramenta oficial): calcula a CBS sobre o serviço de pedágio
 * destacado no documento de frete (CT-e). O pedágio integra o frete e o
 * contratante pode aproveitar o crédito correspondente.
 */
export interface ResultadoPedagio {
  valorPedagio: number
  pctCBS: number
  cbs: number
  totalComCbs: number
}

export const PEDAGIO_PCT_CBS_PADRAO = '8,80'

export function calcularPedagio(valorPedagio: string, pctCBS: string): ResultadoPedagio {
  const pedagio = parseCurrency(valorPedagio)
  const pct = parseCurrency(pctCBS)
  const cbs = (pedagio * pct) / 100
  return { valorPedagio: pedagio, pctCBS: pct, cbs, totalComCbs: pedagio + cbs }
}

export function calcularMemoriaPedagio(r: ResultadoPedagio): LinhaMemoria[] {
  return [
    {
      rotulo: 'Valor do serviço de pedágio destacado no CT-e',
      valor: formatarBRL(r.valorPedagio),
      destaque: 'base',
    },
    {
      rotulo: `CBS = pedágio × ${formatarPercentual(r.pctCBS)}`,
      valor: formatarBRL(r.cbs),
      destaque: 'cbs',
    },
    {
      rotulo: 'Total do pedágio com CBS (pedágio + CBS)',
      valor: formatarBRL(r.totalComCbs),
      destaque: 'total',
    },
    {
      rotulo:
        'O pedágio integra o frete e a CBS cobrada sobre ele é crédito aproveitável pelo contratante do transporte',
      valor: '',
    },
  ]
}

/* ============================ BASES DE CÁLCULO ============================ */

export interface ComponentesBase {
  vProd: string
  vFrete: string
  vSeg: string
  vOutro: string
  vDesc: string
  vIS: string
}

export const componentesBaseVazios: ComponentesBase = {
  vProd: '1.000,00',
  vFrete: '',
  vSeg: '',
  vOutro: '',
  vDesc: '',
  vIS: '',
}

export interface ResultadoBases {
  vProd: number
  vFrete: number
  vSeg: number
  vOutro: number
  vDesc: number
  vIS: number
  somaSomaveis: number
  subtracoes: number
  base: number
  pctCBS: number
  pctIBS: number
  cbs: number
  ibs: number
  ivaTotal: number
}

/** Monta a base de cálculo do IVA a partir dos componentes da nota. */
export function calcularBases(c: ComponentesBase, pctCBS: string, pctIBS: string): ResultadoBases {
  const vProd = parseCurrency(c.vProd)
  const vFrete = parseCurrency(c.vFrete)
  const vSeg = parseCurrency(c.vSeg)
  const vOutro = parseCurrency(c.vOutro)
  const vDesc = parseCurrency(c.vDesc)
  const vIS = parseCurrency(c.vIS)
  const pctC = parseCurrency(pctCBS)
  const pctI = parseCurrency(pctIBS)

  const somaSomaveis = vProd + vFrete + vSeg + vOutro
  const subtracoes = vDesc + vIS
  const base = Math.max(0, somaSomaveis - subtracoes)
  const cbs = (base * pctC) / 100
  const ibs = (base * pctI) / 100

  return {
    vProd,
    vFrete,
    vSeg,
    vOutro,
    vDesc,
    vIS,
    somaSomaveis,
    subtracoes,
    base,
    pctCBS: pctC,
    pctIBS: pctI,
    cbs,
    ibs,
    ivaTotal: cbs + ibs,
  }
}

export function calcularMemoriaBases(r: ResultadoBases): LinhaMemoria[] {
  const linhas: LinhaMemoria[] = [
    {
      rotulo: '1. (+) Valor do produto (vProd)',
      valor: formatarBRL(r.vProd),
      destaque: 'base',
    },
  ]
  if (r.vFrete > 0)
    linhas.push({ rotulo: '2. (+) Frete (vFrete)', valor: formatarBRL(r.vFrete), destaque: 'base' })
  if (r.vSeg > 0)
    linhas.push({ rotulo: '3. (+) Seguro (vSeg)', valor: formatarBRL(r.vSeg), destaque: 'base' })
  if (r.vOutro > 0)
    linhas.push({
      rotulo: '4. (+) Outras despesas acessórias (vOutro)',
      valor: formatarBRL(r.vOutro),
      destaque: 'base',
    })
  if (r.vDesc > 0) linhas.push({ rotulo: '(−) Descontos (vDesc)', valor: formatarBRL(r.vDesc) })
  if (r.vIS > 0) linhas.push({ rotulo: '(−) Imposto Seletivo (vIS)', valor: formatarBRL(r.vIS) })

  linhas.push(
    {
      rotulo: `= Base de cálculo do IVA — CBS ${formatarPercentual(r.pctCBS)} + IBS ${formatarPercentual(r.pctIBS)}`,
      valor: formatarBRL(r.base),
      destaque: 'base',
    },
    {
      rotulo: `CBS = base × ${formatarPercentual(r.pctCBS)}`,
      valor: formatarBRL(r.cbs),
      destaque: 'cbs',
    },
    {
      rotulo: `IBS = base × ${formatarPercentual(r.pctIBS)}`,
      valor: formatarBRL(r.ibs),
      destaque: 'ibs',
    },
    {
      rotulo: 'Total IBS + CBS (IVA dual)',
      valor: formatarBRL(r.ivaTotal),
      destaque: 'total',
    },
  )
  return linhas
}
