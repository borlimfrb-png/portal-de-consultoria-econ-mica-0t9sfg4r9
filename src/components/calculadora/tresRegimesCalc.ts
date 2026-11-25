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
import type { AnexoSimples } from './simplesHibridoCalc'
import {
  blocoComumInicial,
  blocoComumCasoReal,
  pctPisCofinsRealPadrao,
  pctPisCofinsPresumidoPadrao,
  calcularImpostoLiquido,
  comprasDe,
  totalCustosDespesas,
  temIcmsIpi,
  linhaImpostoLiquido,
} from './creditosDebitosCalc'
import type { BlocoComum, PctPisCofinsRegime } from './creditosDebitosCalc'
import type { ResultadoImpostoLiquido } from './creditosDebitosCalc'
import {
  calcularPresumido,
  ADICIONAL_IRPJ_PCT,
  ADICIONAL_IRPJ_BASE_LIMITE,
  PCT_IRPJ_ALIQUOTA,
  PCT_CSLL_ALIQUOTA,
} from './lucroPresumidoCalc'
import type { ResultadoPresumido } from './lucroPresumidoCalc'

export type { LinhaMemoria }

/* ===================== APURAÇÃO CONTÁBIL DO LUCRO REAL =================== */

/** Saldo de um tributo: débito (sobre vendas) − crédito (sobre compras), SEM
 * cortar em zero — saldo negativo = crédito a aproveitar no período. */
export interface SaldoTributo {
  pctDebito: number
  pctCredito: number
  debito: number
  credito: number
  /** débito − crédito (negativo = crédito a aproveitar). */
  saldo: number
  /** true quando o saldo é imposto a RECOLHER (saldo ≥ 0). */
  aRecolher: boolean
}

/** Demonstração completa da apuração do Lucro Real (tabela financeira). */
export interface ApuracaoLucroReal {
  /** Débito, crédito e saldo de PIS, Cofins, ICMS e IPI (nesta ordem). */
  tributos: Record<'pis' | 'cofins' | 'icms' | 'ipi', SaldoTributo>
  /** Total dos tributos líquidos (b) — inclui o crédito de custos/despesas. */
  totalTributosLiquidados: number

  /** Demonstração do resultado (c): lucro contábil APURADO. */
  receitaTotal: number
  custosDedutiveis: number
  folhaPagamento: number
  custoMateriaPrima: number
  despesasFixas: number
  despesasFinanceiras: number
  outrasDespesas: number
  totalCustosDespesas: number
  /** LUCRO APURADO = receita − custos/despesas − tributos líquidos. */
  lucroApurado: number
  tevePrejuizo: boolean

  /** Apuração do IRPJ e da CSLL sobre o lucro apurado (d). */
  baseIrpj: number
  pctIrpj: number
  irpj: number
  baseAdicional: number
  pctAdicionalIrpj: number
  adicionalIrpj: number
  pctCsll: number
  csll: number
  totalIrpjCsll: number

  /** Totais do período (e): impostos totais e lucro líquido final. */
  totalImpostos: number
  lucroLiquidoFinal: number
  iss: number
}

interface EntradaApuracao {
  receitaTotal: number
  receitaServicos: number
  custosDedutiveis: number
  folhaPagamento: number
  pctCreditos: number
  pctIss: number
  compras: number
  pis: ResultadoImpostoLiquido
  cofins: ResultadoImpostoLiquido
  icms: ResultadoImpostoLiquido
  ipi: ResultadoImpostoLiquido
  custoMateriaPrima: number
  despesasFixas: number
  despesasFinanceiras: number
  outrasDespesas: number
}

/**
 * Monta a apuração contábil completa do Lucro Real:
 *   1. PIS, Cofins, ICMS e IPI entre DÉBITO (receita × %) e CRÉDITO
 *      (compras × %), com o saldo de cada um (negativo = crédito);
 *   2. lucro contábil APURADO = receita − custos/despesas − tributos líquidos;
 *   3. IRPJ (15% + adicional de 10% acima de R$ 20.000/mês) e CSLL (9%)
 *      sobre o lucro APURADO — não sobre presunção; prejuízo ⇒ IRPJ/CSLL = 0.
 */
export function lucroRealApuracao(x: EntradaApuracao): ApuracaoLucroReal {
  const creditosCustos = (x.custosDedutiveis * PCT_PIS_COFINS_CREDITO * x.pctCreditos) / 100 / 100

  const tributos = {
    pis: saldoDe(x.pis),
    cofins: saldoDe(x.cofins),
    icms: saldoDe(x.icms),
    ipi: saldoDe(x.ipi),
  }

  // ISS sobre a receita de serviços (entra nos tributos líquidos e no total).
  const iss = (x.receitaServicos * x.pctIss) / 100
  // Tributos líquidos do mês: soma dos saldos (crédito excedente NÃO compensa
  // outros impostos — simplificação educativa), mais o ISS sobre serviços.
  const tributosLiquidos = Math.max(
    0,
    tributos.pis.debito +
      tributos.cofins.debito +
      tributos.icms.debito +
      tributos.ipi.debito -
      tributos.pis.credito -
      tributos.cofins.credito -
      tributos.icms.credito -
      tributos.ipi.credito -
      creditosCustos,
  )
  const totalTributosLiquidados = tributosLiquidos + iss

  const totalCustosDespesas =
    x.custoMateriaPrima + x.despesasFixas + x.despesasFinanceiras + x.outrasDespesas

  const lucroApurado =
    x.receitaTotal -
    x.custosDedutiveis -
    x.folhaPagamento -
    totalCustosDespesas -
    totalTributosLiquidados
  const tevePrejuizo = lucroApurado < 0
  const baseIrpj = Math.max(0, lucroApurado)

  const irpj = (baseIrpj * PCT_IRPJ_REAL) / 100
  const baseAdicional = Math.max(0, baseIrpj - ADICIONAL_IRPJ_BASE_LIMITE)
  const adicionalIrpj = (baseAdicional * ADICIONAL_IRPJ_PCT) / 100
  const csll = (baseIrpj * PCT_CSLL_REAL) / 100
  const totalIrpjCsll = irpj + adicionalIrpj + csll

  const totalImpostos = totalTributosLiquidados + totalIrpjCsll

  return {
    tributos,
    totalTributosLiquidados,
    receitaTotal: x.receitaTotal,
    custosDedutiveis: x.custosDedutiveis,
    folhaPagamento: x.folhaPagamento,
    custoMateriaPrima: x.custoMateriaPrima,
    despesasFixas: x.despesasFixas,
    despesasFinanceiras: x.despesasFinanceiras,
    outrasDespesas: x.outrasDespesas,
    totalCustosDespesas,
    lucroApurado,
    tevePrejuizo,
    baseIrpj,
    pctIrpj: PCT_IRPJ_REAL,
    irpj,
    baseAdicional,
    pctAdicionalIrpj: ADICIONAL_IRPJ_PCT,
    adicionalIrpj,
    pctCsll: PCT_CSLL_REAL,
    csll,
    totalIrpjCsll,
    totalImpostos,
    lucroLiquidoFinal: x.receitaTotal - totalCustosDespesas - totalImpostos,
    iss,
  }
}

/** Débito, crédito e saldo (débito − crédito, sem cortar em zero). */
function saldoDe(r: ResultadoImpostoLiquido): SaldoTributo {
  return {
    pctDebito: r.pctDebito,
    pctCredito: r.pctCredito,
    debito: r.debito,
    credito: r.credito,
    saldo: r.debito - r.credito,
    aRecolher: r.debito - r.credito >= 0,
  }
}

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
  /** Anexo do Simples (I a V) ou "auto" (Fator R decide o anexo dos serviços). */
  anexoId: string
  /**
   * Folha bruta de salários/pró-labore dos 12 meses (escala do Fator R, que é
   * sempre 12 meses ÷ 12 meses). Alimentada junto com a folha mensal.
   */
  folha12Simples: string
  /** Atividade de serviços com retenção de ISS / do § 5º-C (Anexo IV do Simples). */
  anexoIvRetencaoIss: boolean
  /** Alíquota de ISS do município para o Presumido (2% a 5%). */
  pctIss: string
  /** Bloco CRÉDITOS / DÉBITOS / CUSTOS E DESPESAS (compras, % ICMS/IPI, despesas). */
  blocoComum: BlocoComum
  /** Percentuais de PIS/Cofins (compras e vendas) do LUCRO REAL — não cumulativo. */
  pctPisCofinsReal: PctPisCofinsRegime
  /** Percentuais de PIS/Cofins (compras e vendas) do LUCRO PRESUMIDO — cumulativo. */
  pctPisCofinsPresumido: PctPisCofinsRegime
}

/** Bloco de créditos/débitos/custos zerado + percentuais default de cada regime. */
export const blocosComplementaresInicial = {
  blocoComum: blocoComumInicial,
  pctPisCofinsReal: pctPisCofinsRealPadrao,
  pctPisCofinsPresumido: pctPisCofinsPresumidoPadrao,
}

/** Valores default da calculadora (comércio puro, sem serviços). */
export const entradaTresRegimesInicial: EntradaTresRegimes = {
  receitaComercio: '150.000,00',
  receitaServicos: '0,00',
  custosDedutiveis: '90.000,00',
  folhaPagamento: '25.000,00',
  folha12Simples: '300.000,00',
  pctCreditos: '80,00',
  rbt12: '1.500.000,00',
  anexoId: 'auto',
  anexoIvRetencaoIss: false,
  pctIss: '3,00',
  ...blocosComplementaresInicial,
}

/**
 * Entrada "base" (campos fora dos blocos zerados) usada pela calculadora do
 * Simples Híbrido, que sobrescreve cada campo com o valor da sua tela.
 */
export function entradaTresRegimesBase(): EntradaTresRegimes {
  return {
    receitaComercio: '0,00',
    receitaServicos: '0,00',
    custosDedutiveis: '0,00',
    folhaPagamento: '0,00',
    folha12Simples: '0,00',
    pctCreditos: '80,00',
    rbt12: '0,00',
    anexoId: 'auto',
    anexoIvRetencaoIss: false,
    pctIss: '3,00',
    ...blocosComplementaresInicial,
  }
}

/** Caso real pré-carregável: cliente típica com comércio + serviços (Fator R). */
export const entradaTresRegimesCasoReal: EntradaTresRegimes = {
  receitaComercio: '120.000,00',
  receitaServicos: '60.000,00',
  custosDedutiveis: '40.000,00',
  folhaPagamento: '35.000,00',
  folha12Simples: '420.000,00',
  pctCreditos: '80,00',
  rbt12: '2.160.000,00',
  anexoId: 'auto',
  anexoIvRetencaoIss: false,
  pctIss: '3,00',
  ...blocosComplementaresInicial,
  blocoComum: blocoComumCasoReal,
}

/* ============================== LUCRO REAL =============================== */

export interface ResultadoLucroReal {
  receitaTotal: number
  custosDedutiveis: number
  folhaPagamento: number
  pctCreditos: number
  /** Lucro contábil APURADO (receita − custos/despesas − tributos líquidos). */
  lucroReal: number
  tevePrejuizo: boolean
  irpj: number
  adicionalIrpj: number
  csll: number

  iss: number
  pctIss: number

  // Bloco CRÉDITOS / DÉBITOS — PIS, Cofins, ICMS e IPI apurados com os
  // percentuais INFORMADOS pelo usuário (débito sobre vendas − crédito sobre compras).
  comprasMateriaPrima: number
  pis: ResultadoImpostoLiquido
  cofins: ResultadoImpostoLiquido
  icms: ResultadoImpostoLiquido
  ipi: ResultadoImpostoLiquido

  // Bloco CUSTOS E DESPESAS (custo da matéria-prima + fixas + financeiras + outras)
  custoMateriaPrima: number
  despesasFixas: number
  despesasFinanceiras: number
  outrasDespesas: number
  totalCustosDespesas: number

  /** Demonstração completa da apuração (tabela "Apuração do Lucro Real"). */
  apuracao: ApuracaoLucroReal

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

  // Bloco CRÉDITOS / DÉBITOS — percentuais informados pelo usuário.
  const compras = comprasDe(e.blocoComum)
  const pctReal = e.pctPisCofinsReal
  const pis = calcularImpostoLiquido(
    receitaTotal,
    compras,
    pctReal.pctPisVendas,
    pctReal.pctPisCompras,
  )
  const cofins = calcularImpostoLiquido(
    receitaTotal,
    compras,
    pctReal.pctCofinsVendas,
    pctReal.pctCofinsCompras,
  )
  const icms = calcularImpostoLiquido(
    receitaTotal,
    compras,
    e.blocoComum.pctIcmsVendas,
    e.blocoComum.pctIcmsCompras,
  )
  const ipi = calcularImpostoLiquido(
    receitaTotal,
    compras,
    e.blocoComum.pctIpiVendas,
    e.blocoComum.pctIpiCompras,
  )

  // Bloco CUSTOS E DESPESAS — deduzido do lucro real (base do IRPJ/CSLL).
  const custoMateriaPrima = parseCurrency(e.blocoComum.custoMateriaPrima)
  const despesasFixas = parseCurrency(e.blocoComum.despesasFixas)
  const despesasFinanceiras = parseCurrency(e.blocoComum.despesasFinanceiras)
  const outrasDespesas = parseCurrency(e.blocoComum.outrasDespesas)
  const totalCustosDespesasBloco =
    custoMateriaPrima + despesasFixas + despesasFinanceiras + outrasDespesas

  // Apuração contábil completa: IRPJ (15% + adicional 10%) e CSLL (9%) sobre o
  // LUCRO APURADO (receita − custos/despesas − tributos líquidos), não sobre
  // presunção. Prejuízo fiscal ⇒ IRPJ e CSLL = R$ 0,00 no período.
  const apuracao = lucroRealApuracao({
    receitaTotal,
    receitaServicos,
    custosDedutiveis,
    folhaPagamento,
    pctCreditos,
    pctIss,
    compras,
    pis,
    cofins,
    icms,
    ipi,
    custoMateriaPrima,
    despesasFixas,
    despesasFinanceiras,
    outrasDespesas,
  })

  const totalTributos = apuracao.totalImpostos
  const aliquotaEfetiva = receitaTotal > 0 ? (totalTributos / receitaTotal) * 100 : 0

  return {
    receitaTotal,
    custosDedutiveis,
    folhaPagamento,
    pctCreditos,
    lucroReal: apuracao.lucroApurado,
    tevePrejuizo: apuracao.tevePrejuizo,
    irpj: apuracao.irpj,
    adicionalIrpj: apuracao.adicionalIrpj,
    csll: apuracao.csll,
    iss: apuracao.iss,
    pctIss,
    comprasMateriaPrima: compras,
    pis,
    cofins,
    icms,
    ipi,
    custoMateriaPrima,
    despesasFixas,
    despesasFinanceiras,
    outrasDespesas,
    totalCustosDespesas: totalCustosDespesasBloco,
    apuracao,
    totalTributos,
    aliquotaEfetiva,
  }
}

/* =========================== SIMPLES NACIONAL ============================ */

export interface FatiaSimples {
  anexoNome: string
  indiceFaixa: number
  /** Base tributada nesta fatia (comércio ou serviços). */
  base: number
  aliquotaNominal: number
  parcelaDeduzir: number
  aliquotaEfetiva: number
  das: number
  pctPisCofins: number
}

export interface ResultadoSimplesRegimes {
  receitaComercio: number
  receitaServicos: number
  receitaTotal: number
  rbt12: number
  folha12: number
  /** Fator R em % (folha 12m ÷ RBT12 × 100) — informativo mesmo sem serviços. */
  fatorR: number
  /** true quando o Fator R determinou o anexo dos serviços (modo automático). */
  fatorRAplica: boolean
  /** Motivo da escolha do(s) anexo(s), exibido na memória de cálculo. */
  motivoAnexo: string
  /** Nome(s) do(s) anexo(s) usados, para o card (ex.: "Anexo I + Anexo V (Fator R)"). */
  anexoNome: string
  /** Texto de faixa(s) para o card (ex.: "4ª faixa + 3ª faixa"). */
  faixaTexto: string
  /** Fatias de DAS por anexo utilizado (1 no modo manual; até 2 no automático). */
  fatias: FatiaSimples[]
  dasTotal: number
  aliquotaEfetiva: number
  pctPisCofinsMedio: number
  parcelaPisCofinsEmbutida: number
  limiteUltrapassado: boolean
}

/** Limite do Fator R (LC 123/2006, art. 18, §§ 5º-A a 5º-J): 28% da receita bruta. */
export const FATOR_R_LIMITE = 28

function nomeCurtoAnexo(nome: string): string {
  return nome.split(' — ')[0] ?? nome
}

function fatiaDoAnexo(anexo: AnexoSimples, base: number, rbt12: number): FatiaSimples {
  let indice = anexo.faixas.findIndex((f) => rbt12 <= f.limite)
  if (indice < 0) indice = anexo.faixas.length - 1
  const faixa = anexo.faixas[indice]
  const aliquotaEfetiva =
    rbt12 > 0 ? (rbt12 * faixa.aliquotaNominal - faixa.parcelaDeduzir) / rbt12 : 0
  return {
    anexoNome: anexo.nome,
    indiceFaixa: indice,
    base,
    aliquotaNominal: faixa.aliquotaNominal,
    parcelaDeduzir: faixa.parcelaDeduzir,
    aliquotaEfetiva,
    das: (base * aliquotaEfetiva) / 100,
    pctPisCofins: faixa.pctPisCofins,
  }
}

export function calcularSimplesRegimes(e: EntradaTresRegimes): ResultadoSimplesRegimes {
  const receitaComercio = parseCurrency(e.receitaComercio)
  const receitaServicos = parseCurrency(e.receitaServicos)
  const receitaTotal = receitaComercio + receitaServicos
  const rbt12 = parseCurrency(e.rbt12)
  const folha12 = parseCurrency(e.folha12Simples)
  const fatorR = rbt12 > 0 ? (folha12 / rbt12) * 100 : 0

  const fatias: FatiaSimples[] = []
  let motivoAnexo = ''
  let fatorRAplica = false

  if (e.anexoId !== 'auto') {
    const anexo = anexoPorId(e.anexoId)
    fatias.push(fatiaDoAnexo(anexo, receitaTotal, rbt12))
    motivoAnexo = `Anexo escolhido manualmente: ${anexo.nome} para toda a receita do mês`
  } else if (receitaServicos <= 0) {
    const anexo = anexoPorId('anexo-i')
    fatias.push(fatiaDoAnexo(anexo, receitaTotal, rbt12))
    motivoAnexo = `Automático: sem receita de serviços no mês — Anexo I (Comércio) para toda a receita. Fator R informativo: ${formatarPercentual(
      fatorR,
    )}`
  } else {
    // Modo automático COM serviços: comércio/indústria fica no Anexo I e os
    // serviços seguem o Fator R (folha 12m ÷ RBT12): ≥ 28% → Anexo III;
    // < 28% → Anexo V (LC 123/2006, art. 18, §§ 5º-A e 5º-I).
    fatorRAplica = true
    const anexoComercio = anexoPorId('anexo-i')
    const anexoServicos = anexoPorId(fatorR >= FATOR_R_LIMITE ? 'anexo-iii' : 'anexo-v')
    if (receitaComercio > 0) fatias.push(fatiaDoAnexo(anexoComercio, receitaComercio, rbt12))
    fatias.push(fatiaDoAnexo(anexoServicos, receitaServicos, rbt12))
    motivoAnexo =
      fatorR >= FATOR_R_LIMITE
        ? `Automático: Fator R (folha 12m ÷ RBT12) = ${formatarPercentual(
            fatorR,
          )} ≥ ${formatarPercentual(FATOR_R_LIMITE)} — serviços no Anexo III (LC 123/2006, art. 18, § 5º-A) e comércio/indústria no Anexo I`
        : `Automático: Fator R (folha 12m ÷ RBT12) = ${formatarPercentual(
            fatorR,
          )} < ${formatarPercentual(FATOR_R_LIMITE)} — serviços no Anexo V (LC 123/2006, art. 18, § 5º-I) e comércio/indústria no Anexo I`
  }

  const dasTotal = fatias.reduce((acc, f) => acc + f.das, 0)
  const aliquotaEfetiva = receitaTotal > 0 ? (dasTotal / receitaTotal) * 100 : 0
  const pctPisCofinsMedio =
    dasTotal > 0 ? fatias.reduce((acc, f) => acc + f.das * f.pctPisCofins, 0) / dasTotal : 0
  const parcelaPisCofinsEmbutida = (dasTotal * pctPisCofinsMedio) / 100

  const anexoNome =
    fatias.length === 1
      ? fatias[0].anexoNome
      : `${fatias.map((f) => nomeCurtoAnexo(f.anexoNome)).join(' + ')} (Fator R)`
  const faixaTexto =
    fatias.length === 1
      ? `${fatias[0].indiceFaixa + 1}ª faixa`
      : fatias.map((f) => `${f.indiceFaixa + 1}ª faixa`).join(' + ')

  const anexoTeto = anexoPorId('anexo-i')
  const tetoSimples = anexoTeto.faixas[anexoTeto.faixas.length - 1].limite

  return {
    receitaComercio,
    receitaServicos,
    receitaTotal,
    rbt12,
    folha12,
    fatorR,
    fatorRAplica,
    motivoAnexo,
    anexoNome,
    faixaTexto,
    fatias,
    dasTotal,
    aliquotaEfetiva,
    pctPisCofinsMedio,
    parcelaPisCofinsEmbutida,
    limiteUltrapassado: rbt12 > tetoSimples,
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
  const a = r.apuracao
  const linhas: LinhaMemoria[] = [
    {
      rotulo: 'APURAÇÃO DOS TRIBUTOS SOBRE VENDAS E COMPRAS — débito (vendas) − crédito (compras)',
      valor: '',
    },
  ]

  const linhaSaldo = (numero: string, nome: string, s: SaldoTributo, creditoExtra?: string) => {
    linhas.push({
      rotulo: `${numero} ${nome} — DÉBITO = receita × ${formatarPercentual(s.pctDebito)}`,
      valor: formatarBRL(s.debito),
    })
    linhas.push({
      rotulo: `   (−) CRÉDITO = compras de matéria-prima × ${formatarPercentual(s.pctCredito)}${creditoExtra ? ` ${creditoExtra}` : ''}`,
      valor: formatarBRL(s.credito),
    })
    linhas.push({
      rotulo: `   = SALDO ${s.aRecolher ? 'a RECOLHER' : 'NEGATIVO — crédito a aproveitar'}`,
      valor: formatarBRL(s.saldo),
      destaque: 'cbs',
    })
  }

  linhaSaldo('1.', 'PIS', a.tributos.pis)
  linhaSaldo('2.', 'Cofins', a.tributos.cofins)
  linhaSaldo('3.', 'ICMS', a.tributos.icms)
  linhaSaldo('4.', 'IPI', a.tributos.ipi)

  if (
    a.totalTributosLiquidados >
    a.tributos.pis.saldo + a.tributos.cofins.saldo + a.tributos.icms.saldo + a.tributos.ipi.saldo
  ) {
    linhas.push({
      rotulo: `   (−) Créditos de PIS/Cofins = custos × ${formatarPercentual(
        PCT_PIS_COFINS_CREDITO,
      )} × aproveitamento de ${formatarPercentual(r.pctCreditos)}`,
      valor: formatarBRL((a.custosDedutiveis * PCT_PIS_COFINS_CREDITO * r.pctCreditos) / 100 / 100),
    })
  }
  linhas.push({
    rotulo: 'RESULTADO — Total dos tributos líquidos do mês (PIS + Cofins + ICMS + IPI + ISS)',
    valor: formatarBRL(a.totalTributosLiquidados),
    destaque: 'total',
  })

  // DEMONSTRAÇÃO DO RESULTADO — lucro contábil APURADO:
  linhas.push({
    rotulo: 'DEMONSTRAÇÃO DO RESULTADO — lucro contábil do mês',
    valor: '',
  })
  linhas.push({
    rotulo: '5. Receita bruta total (comércio + serviços)',
    valor: formatarBRL(a.receitaTotal),
    destaque: 'base',
  })
  if (a.custosDedutiveis > 0) {
    linhas.push({
      rotulo: '   (−) Custos/despesas dedutíveis (compram crédito de PIS/Cofins)',
      valor: formatarBRL(a.custosDedutiveis),
    })
  }
  if (a.folhaPagamento > 0) {
    linhas.push({
      rotulo: '   (−) Folha de pagamento (dedutível no Lucro Real)',
      valor: formatarBRL(a.folhaPagamento),
    })
  }
  if (a.custoMateriaPrima > 0) {
    linhas.push({
      rotulo: '   (−) Custo das matérias-primas',
      valor: formatarBRL(a.custoMateriaPrima),
    })
  }
  if (a.despesasFixas > 0) {
    linhas.push({
      rotulo: '   (−) Despesas fixas',
      valor: formatarBRL(a.despesasFixas),
    })
  }
  if (a.despesasFinanceiras > 0) {
    linhas.push({
      rotulo: '   (−) Despesas financeiras',
      valor: formatarBRL(a.despesasFinanceiras),
    })
  }
  if (a.outrasDespesas > 0) {
    linhas.push({
      rotulo: '   (−) Outras despesas',
      valor: formatarBRL(a.outrasDespesas),
    })
  }
  linhas.push({
    rotulo: '   (−) Tributos líquidos apurados acima (PIS/Cofins/ICMS/IPI + ISS)',
    valor: formatarBRL(a.totalTributosLiquidados),
  })
  linhas.push({
    rotulo: a.tevePrejuizo
      ? '= LUCRO APURADO NEGATIVO — prejuízo fiscal: IRPJ e CSLL = R$ 0,00 neste mês'
      : '= LUCRO APURADO (lucro contábil do mês — base do IRPJ e da CSLL)',
    valor: formatarBRL(a.lucroApurado),
    destaque: 'base',
  })

  // APURAÇÃO DO IRPJ E DA CSLL sobre o lucro APURADO:
  linhas.push({
    rotulo: 'APURAÇÃO DO IRPJ E DA CSLL — sobre o lucro apurado (não sobre presunção)',
    valor: '',
  })
  if (a.tevePrejuizo) {
    linhas.push({
      rotulo:
        '6. Prejuízo fiscal — sem IRPJ/CSLL no período (prejuízo pode ser compensado nos períodos seguintes, dentro dos limites legais)',
      valor: formatarBRL(0),
      destaque: 'total',
    })
  } else {
    linhas.push({
      rotulo: `6. IRPJ = lucro apurado ${formatarBRL(a.baseIrpj)} × ${formatarPercentual(a.pctIrpj)}`,
      valor: formatarBRL(a.irpj),
    })
    if (a.adicionalIrpj > 0) {
      linhas.push({
        rotulo: `   (+) Adicional IRPJ = ${formatarPercentual(a.pctAdicionalIrpj)} sobre o lucro que excede R$ 20.000,00/mês (excedente de ${formatarBRL(a.baseAdicional)})`,
        valor: formatarBRL(a.adicionalIrpj),
      })
    }
    linhas.push({
      rotulo: `7. CSLL = lucro apurado × ${formatarPercentual(a.pctCsll)}`,
      valor: formatarBRL(a.csll),
    })
    linhas.push({
      rotulo: '= TOTAL IRPJ + CSLL do mês',
      valor: formatarBRL(a.totalIrpjCsll),
      destaque: 'total',
    })
  }

  // TOTAIS DO PERÍODO (e):
  linhas.push({
    rotulo: 'RESULTADO — IMPOSTOS TOTAIS DO PERÍODO (tributos líquidos + IRPJ + adicional + CSLL)',
    valor: formatarBRL(a.totalImpostos),
    destaque: 'total',
  })
  linhas.push({
    rotulo: 'LUCRO LÍQUIDO FINAL após todos os impostos',
    valor: formatarBRL(a.lucroLiquidoFinal),
    destaque: 'base',
  })
  if (a.iss > 0) {
    linhas.push({
      rotulo: `Nota: ISS de ${formatarBRL(a.iss)} (receita de serviços × ${formatarPercentual(r.pctIss)}) integra os tributos líquidos do mês`,
      valor: '',
    })
  }
  linhas.push({
    rotulo:
      'Nota: no Lucro Real o IRPJ e a CSLL incidem sobre o LUCRO CONTÁBIL apurado — despesas e créditos reduzem o imposto; obrigatório acima de R$ 78 milhões/ano',
    valor: '',
  })
  return linhas
}

export function calcularMemoriaSimplesRegimes(r: ResultadoSimplesRegimes): LinhaMemoria[] {
  const linhas: LinhaMemoria[] = [
    {
      rotulo: `Cenário do mês: comércio/indústria ${formatarBRL(
        r.receitaComercio,
      )} + serviços ${formatarBRL(r.receitaServicos)} · RBT12 ${formatarBRL(r.rbt12)}`,
      valor: '',
    },
    {
      rotulo: `Fator R = folha bruta dos 12 meses (${formatarBRL(
        r.folha12,
      )}) ÷ receita bruta dos 12 meses (${formatarBRL(r.rbt12)})`,
      valor: formatarPercentual(r.fatorR),
      destaque: 'base',
    },
    {
      rotulo: `Anexo aplicado e por quê: ${r.motivoAnexo}`,
      valor: '',
    },
  ]

  r.fatias.forEach((f, i) => {
    const prefixo = r.fatias.length > 1 ? `${i + 1}. ` : ''
    linhas.push({
      rotulo: `${prefixo}${f.anexoNome} — base tributada de ${formatarBRL(
        f.base,
      )} na ${f.indiceFaixa + 1}ª faixa`,
      valor: '',
    })
    linhas.push({
      rotulo: '   Alíquota nominal da faixa',
      valor: formatarPercentual(f.aliquotaNominal),
    })
    linhas.push({
      rotulo: '   (−) Parcela a deduzir da faixa',
      valor: formatarBRL(f.parcelaDeduzir),
    })
    linhas.push({
      rotulo: '   Alíquota efetiva = (RBT12 × nominal − dedução) ÷ RBT12',
      valor: formatarPercentual(f.aliquotaEfetiva),
      destaque: 'base',
    })
    linhas.push({
      rotulo: `   DAS parcial = ${formatarBRL(f.base)} × alíquota efetiva`,
      valor: formatarBRL(f.das),
    })
  })

  linhas.push({
    rotulo: 'RESULTADO — DAS total do mês (soma das fatias por anexo)',
    valor: formatarBRL(r.dasTotal),
    destaque: 'total',
  })
  linhas.push({
    rotulo: 'Alíquota efetiva global sobre a receita bruta do mês',
    valor: formatarPercentual(r.aliquotaEfetiva),
  })
  linhas.push({
    rotulo: `PIS/Cofins embutido no DAS (repartição média das faixas usadas): ${formatarPercentual(
      r.pctPisCofinsMedio,
    )} ≈ ${formatarBRL(r.parcelaPisCofinsEmbutida)} (para comparação honesta)`,
    valor: '',
  })
  linhas.push({
    rotulo: `Nota: disponível até R$ 4,8 milhões/ano; tributa o FATURAMENTO (mesmo com prejuízo). No Simples a folha só influencia o anexo pelo Fator R — não deduz do DAS${
      r.limiteUltrapassado ? ' — ATENÇÃO: RBT12 acima do teto do anexo' : ''
    }`,
    valor: '',
  })
  return linhas
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
  if (r.despesasDedutiveis > 0) {
    linhas.push({
      rotulo: `   (−) Despesas dedutíveis de ${formatarBRL(
        r.despesasDedutiveis,
      )} rateadas proporcionalmente às receitas de cada bloco (simplificação educativa)`,
      valor: '',
    })
  }
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
  linhas.push(
    linhaImpostoLiquido('5.', 'PIS (débito sobre vendas − crédito sobre compras)', r.pisDetalhe),
  )
  linhas.push(
    linhaImpostoLiquido(
      '6.',
      'Cofins (débito sobre vendas − crédito sobre compras)',
      r.cofinsDetalhe,
    ),
  )
  let passo = 7
  if (r.icms && temIcmsIpi(r.icms, r.ipi ?? r.icms)) {
    linhas.push(
      linhaImpostoLiquido(
        `${passo}.`,
        'ICMS (débito sobre vendas − crédito sobre compras)',
        r.icms,
      ),
    )
    passo++
    if (r.ipi) {
      linhas.push(
        linhaImpostoLiquido(
          `${passo}.`,
          'IPI (débito sobre vendas − crédito sobre compras)',
          r.ipi,
        ),
      )
      passo++
    }
  }
  if (r.iss > 0) {
    linhas.push({
      rotulo: `${passo}. ISS = receita de serviços × ${formatarPercentual(r.pctIss)} (LC 116/2003)`,
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
    rotulo: `Nota: no Presumido a folha NÃO reduz o imposto — a base é a presunção legal da receita (Lei 9.249/1995)${
      r.despesasDedutiveis > 0
        ? '; as despesas dedutíveis entram apenas pelo rateio educativo da presunção'
        : '; custos e despesas não reduzem o imposto'
    }`,
    valor: '',
  })
  return linhas
}
