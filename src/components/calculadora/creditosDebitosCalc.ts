// Módulo compartilhado dos blocos CRÉDITOS / DÉBITOS / CUSTOS E DESPESAS das
// calculadoras do Lucro Real e do Lucro Presumido (Portal Borlim):
//   • CRÉDITOS — compras de matéria-prima e % de PIS, Cofins, ICMS e IPI sobre
//     as compras, para apurar o crédito de cada imposto;
//   • DÉBITOS — % de PIS, Cofins, ICMS e IPI sobre as vendas;
//   • CUSTOS E DESPESAS — custo das matérias-primas, despesas fixas,
//     financeiras e outras, deduzidas do resultado no Lucro Real e exibidas
//     como "lucro efetivo estimado" no Presumido.
// Os percentuais de PIS/Cofins são POR REGIME (não cumulativo no Real; cumulativo
// no Presumido). ICMS e IPI usam percentuais compartilhados entre os regimes.
// 100% no navegador, sem persistência de dados.

import { formatarBRL, formatarPercentual, parseCurrency } from './cbsIbsCalc'
import type { LinhaMemoria } from './cbsIbsCalc'

export type { LinhaMemoria }

/* ================================ ENTRADAS =============================== */

/**
 * Campos compartilhados pelos dois regimes: compras (base de crédito de
 * ICMS/IPI), percentuais de ICMS/IPI e custos/despesas da empresa.
 */
export interface BlocoComum {
  /** Compras de matéria-prima no mês (base dos créditos de ICMS/IPI). */
  comprasMateriaPrima: string
  /** % de crédito de ICMS sobre as compras (ex.: 18%). */
  pctIcmsCompras: string
  /** % de crédito de IPI sobre as compras — só industrialização (ex.: 10%). */
  pctIpiCompras: string
  /** % de débito de ICMS sobre as vendas (ex.: 18%). */
  pctIcmsVendas: string
  /** % de débito de IPI sobre as vendas (0% para quem não é indústria). */
  pctIpiVendas: string
  /**
   * Base de cálculo do PIS/Cofins do LUCRO REAL, editável (string pt-BR).
   * Vazia = automático: faturamento − ICMS das vendas − IPI das vendas.
   */
  basePisCofinsManual: string
  /**
   * Base de cálculo do PIS/Cofins do LUCRO PRESUMIDO, editável (string pt-BR).
   * Vazia = automático: faturamento − ICMS das vendas − IPI das vendas.
   */
  basePisCofinsManualPresumido: string
  /** Custo das matérias-primas consumido no mês (dedutível no Lucro Real). */
  custoMateriaPrima: string
  /** Despesas fixas do mês (administrativas, aluguéis, folha administrativa…). */
  despesasFixas: string
  /** Despesas financeiras do mês (juros, tarifas). */
  despesasFinanceiras: string
  /** Outras despesas do mês. */
  outrasDespesas: string
}

/** Percentuais de PIS/Cofins (compras e vendas) — um conjunto POR regime. */
export interface PctPisCofinsRegime {
  /** % de crédito de PIS sobre as compras (0% no Presumido cumulativo). */
  pctPisCompras: string
  /** % de crédito de Cofins sobre as compras. */
  pctCofinsCompras: string
  /** % de débito de PIS sobre as vendas (0,65% cumulativo / 1,65% não cumulativo). */
  pctPisVendas: string
  /** % de débito de Cofins sobre as vendas (3% cumulativo / 7,6% não cumulativo). */
  pctCofinsVendas: string
}

/**
 * Padrão inicial: compras e custos zerados e ICMS/IPI zerados — assim os
 * resultados dos regimes permanecem EXATAMENTE os de antes até o usuário
 * preencher os campos novos. basePisCofinsManual vazio = automático.
 */
export const blocoComumInicial: BlocoComum = {
  comprasMateriaPrima: '0,00',
  pctIcmsCompras: '18,00',
  pctIpiCompras: '10,00',
  pctIcmsVendas: '0,00',
  pctIpiVendas: '0,00',
  basePisCofinsManual: '',
  basePisCofinsManualPresumido: '',
  custoMateriaPrima: '0,00',
  despesasFixas: '0,00',
  despesasFinanceiras: '0,00',
  outrasDespesas: '0,00',
}

/** Caso real pré-carregável (comércio + serviços, R$ 180 mil/mês). */
export const blocoComumCasoReal: BlocoComum = {
  comprasMateriaPrima: '50.000,00',
  pctIcmsCompras: '18,00',
  pctIpiCompras: '10,00',
  pctIcmsVendas: '18,00',
  pctIpiVendas: '0,00',
  // Automático nos dois regimes: faturamento R$ 180 mil − ICMS de vendas
  // (18% = R$ 32.400) − IPI de vendas (0%) = R$ 147.600.
  basePisCofinsManual: '',
  basePisCofinsManualPresumido: '',
  custoMateriaPrima: '50.000,00',
  despesasFixas: '25.000,00',
  despesasFinanceiras: '5.000,00',
  outrasDespesas: '10.000,00',
}

/** true quando o usuário digitou uma base de PIS/Cofins manual (Lucro Real). */
export function basePisCofinsEditadaDe(bloco: BlocoComum): boolean {
  return bloco.basePisCofinsManual.trim() !== ''
}

/**
 * Base de cálculo do PIS/Cofins do LUCRO REAL (string pt-BR) a partir do estado
 * existente: quando o usuário digitou um valor manual, ele manda; quando não,
 * o padrão automático é FATURAMENTO (receita de comércio + serviços do mês)
 * menos o ICMS das vendas. Usada por tresRegimesCalc.ts e pelas duas telas.
 */
export function basePisCofinsRealDe(
  bloco: BlocoComum,
  receitaTotal: number,
  icmsDebito: number,
  ipiDebito: number,
): string {
  if (basePisCofinsEditadaDe(bloco)) return bloco.basePisCofinsManual
  const automatica = basePisCofinsAutomatica(receitaTotal, icmsDebito, ipiDebito)
  return formatarValorBase(automatica)
}

/** true quando o usuário digitou uma base de PIS/Cofins manual (Lucro Presumido). */
export function basePisCofinsPresumidoEditadaDe(bloco: BlocoComum): boolean {
  return bloco.basePisCofinsManualPresumido.trim() !== ''
}

/**
 * Base de cálculo do PIS/Cofins do LUCRO PRESUMIDO (string pt-BR): manual quando
 * digitada; senão FATURAMENTO − ICMS das vendas − IPI das vendas.
 */
export function basePisCofinsPresumidoDe(
  bloco: BlocoComum,
  receitaTotal: number,
  icmsDebito: number,
  ipiDebito: number,
): string {
  if (basePisCofinsPresumidoEditadaDe(bloco)) return bloco.basePisCofinsManualPresumido
  return formatarValorBase(basePisCofinsAutomatica(receitaTotal, icmsDebito, ipiDebito))
}

/** Base automática: faturamento − ICMS das vendas − IPI das vendas (nunca negativa). */
export function basePisCofinsAutomatica(
  receitaTotal: number,
  icmsDebito: number,
  ipiDebito: number,
): number {
  return Math.max(0, receitaTotal - icmsDebito - ipiDebito)
}

function formatarValorBase(v: number): string {
  return v.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Linha da memória de cálculo da base do PIS/Cofins do Lucro Real. */
export function linhaBasePisCofinsReal(
  base: number,
  automatica: boolean,
  receitaTotal: number,
  icmsDebito: number,
  ipiDebito: number,
): LinhaMemoria {
  return {
    rotulo: automatica
      ? `Base PIS/Cofins = faturamento ${formatarBRL(receitaTotal)} − ICMS das vendas ${formatarBRL(icmsDebito)} − IPI das vendas ${formatarBRL(ipiDebito)}`
      : 'Base PIS/Cofins = valor informado manualmente (editável no bloco Débitos)',
    valor: formatarBRL(base),
    destaque: 'base',
  }
}

/** Linha da memória de cálculo da base do PIS/Cofins do Lucro Presumido. */
export function linhaBasePisCofinsPresumido(
  base: number,
  automatica: boolean,
  receitaTotal: number,
  icmsDebito: number,
  ipiDebito: number,
): LinhaMemoria {
  return {
    rotulo: automatica
      ? `Base PIS/Cofins = faturamento ${formatarBRL(receitaTotal)} − ICMS das vendas ${formatarBRL(icmsDebito)} − IPI das vendas ${formatarBRL(ipiDebito)}`
      : 'Base PIS/Cofins = valor informado manualmente (editável no bloco Débitos)',
    valor: formatarBRL(base),
    destaque: 'base',
  }
}

/** Lucro Real: PIS 1,65% e Cofins 7,6% não cumulativos, com crédito sobre compras. */
export const pctPisCofinsRealPadrao: PctPisCofinsRegime = {
  pctPisCompras: '1,65',
  pctCofinsCompras: '7,60',
  pctPisVendas: '1,65',
  pctCofinsVendas: '7,60',
}

/** Lucro Presumido: cumulativo — crédito 0%, PIS 0,65% e Cofins 3% sobre vendas. */
export const pctPisCofinsPresumidoPadrao: PctPisCofinsRegime = {
  pctPisCompras: '0,00',
  pctCofinsCompras: '0,00',
  pctPisVendas: '0,65',
  pctCofinsVendas: '3,00',
}

/* ================================ CÁLCULO ================================ */

export interface ResultadoImpostoLiquido {
  pctDebito: number
  pctCredito: number
  /** Débito = receita bruta × % sobre vendas. */
  debito: number
  /** Crédito = compras de matéria-prima × % sobre compras. */
  credito: number
  /** Líquido do mês (crédito excedente NÃO compensa outros impostos). */
  liquido: number
}

/** Débito (sobre a receita OU sobre a base informada) − crédito (sobre as compras). */
export function calcularImpostoLiquido(
  receitaTotal: number,
  compras: number,
  pctDebitoStr: string,
  pctCreditoStr: string,
): ResultadoImpostoLiquido {
  const pctDebito = parseCurrency(pctDebitoStr)
  const pctCredito = parseCurrency(pctCreditoStr)
  const debito = (receitaTotal * pctDebito) / 100
  const credito = (compras * pctCredito) / 100
  return {
    pctDebito,
    pctCredito,
    debito,
    credito,
    liquido: Math.max(0, debito - credito),
  }
}

/** Compras de matéria-prima informadas (base dos créditos). */
export function comprasDe(comum: BlocoComum): number {
  return parseCurrency(comum.comprasMateriaPrima)
}

/** Custo das matérias-primas + despesas fixas + financeiras + outras. */
export function totalCustosDespesas(comum: BlocoComum): number {
  return (
    parseCurrency(comum.custoMateriaPrima) +
    parseCurrency(comum.despesasFixas) +
    parseCurrency(comum.despesasFinanceiras) +
    parseCurrency(comum.outrasDespesas)
  )
}

/** true quando há algum percentual de ICMS/IPI preenchido (linha na memória). */
export function temIcmsIpi(icms: ResultadoImpostoLiquido, ipi: ResultadoImpostoLiquido): boolean {
  return icms.pctDebito > 0 || icms.pctCredito > 0 || ipi.pctDebito > 0 || ipi.pctCredito > 0
}

/* =========================== MEMÓRIA DE CÁLCULO ========================== */

/** Linha da memória com o resultado líquido (débito − crédito) de um imposto. */
export function linhaImpostoLiquido(
  numero: string,
  nome: string,
  r: ResultadoImpostoLiquido,
  informativo = false,
  nomeBase = 'receita',
): LinhaMemoria {
  const sufixo = informativo ? ' (informativo — no Presumido não altera o total do mês)' : ''
  return {
    rotulo: `${numero} ${nome} = débito ${formatarBRL(r.debito)} (${nomeBase} × ${formatarPercentual(r.pctDebito)}) − crédito ${formatarBRL(r.credito)} (compras × ${formatarPercentual(r.pctCredito)})${sufixo}`,
    valor: formatarBRL(r.liquido),
  }
}
