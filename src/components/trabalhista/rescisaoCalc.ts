/**
 * Módulo de cálculo da Calculadora de Rescisão — área Trabalhista do Portal Borlim.
 * Base educativa: CLT (arts. 477, 487, 130, 146, 484-A), Lei 12.506/2011 (aviso
 * prévio proporcional), Lei 13.467/2017 (acordo mútuo — art. 484-A), Lei
 * 8.036/1990 (FGTS: multa 40% art. 18 §1º, 20% acordo art. 18 §3º) e as tabelas
 * de INSS/IRRF 2025 da Calculadora de Férias.
 * Cálculo 100% no navegador, sem persistência de dados.
 */

import type { LinhaMemoria } from '@/components/calculadora/cbsIbsCalc'
import { parseCurrency, formatarBRL, calcularInss, calcularIrrfVigente } from './feriasCalc'

export type { LinhaMemoria }
export { parseCurrency, formatarBRL }

export type MotivoRescisao =
  | 'sem_justa_causa'
  | 'justa_causa'
  | 'pedido_demissao'
  | 'acordo_mutuo'
  | 'termino_contrato'
  | 'estagio_90_dias'

export const MOTIVOS_RESCISAO: { id: MotivoRescisao; label: string }[] = [
  { id: 'sem_justa_causa', label: 'Demissão sem justa causa' },
  { id: 'justa_causa', label: 'Demissão por justa causa' },
  { id: 'pedido_demissao', label: 'Pedido de demissão' },
  { id: 'acordo_mutuo', label: 'Acordo mútuo (Lei 13.467/2017 — art. 484-A)' },
  { id: 'termino_contrato', label: 'Término de contrato de experiência / prazo' },
  { id: 'estagio_90_dias', label: 'Demissão voluntária no estágio de 90 dias' },
]

export interface EntradaRescisao {
  salarioBruto: string
  motivo: MotivoRescisao
  diasTrabalhadosNoMes: number
  mesesTrabalhadosAno: number
  diasAvisoPrevio: number
  avisoPrevioIndenizado: boolean
  saldoFgts: string
  dependentes: number
  feriasVencidas: boolean
  mediaHorasExtras: string
}

export const entradaRescisaoInicial: EntradaRescisao = {
  salarioBruto: '3.000,00',
  motivo: 'sem_justa_causa',
  diasTrabalhadosNoMes: 15,
  mesesTrabalhadosAno: 6,
  diasAvisoPrevio: 30,
  avisoPrevioIndenizado: true,
  saldoFgts: '2.000,00',
  dependentes: 0,
  feriasVencidas: false,
  mediaHorasExtras: '',
}

export interface VerbaRescisoria {
  id: string
  rotulo: string
  valor: number
  /** true = entra no cálculo; false = exibida como "não recebe" */
  aplica: boolean
  obrigacao: 'recebe' | 'nao_recebe'
  detalhe: string
}

export interface ResultadoRescisao {
  motivo: MotivoRescisao
  salarioBruto: number
  valorDia: number
  diasTrabalhadosNoMes: number
  mesesTrabalhadosAno: number
  diasAvisoPrevio: number
  avisoPrevioIndenizado: boolean
  saldoFgts: number
  verbas: VerbaRescisoria[]
  saldoSalario: number
  feriasProporcionais: number
  tercoFeriasProporcionais: number
  feriasVencidas: number
  tercoFeriasVencidas: number
  avisoPrevioValor: number
  tercoAvisoPrevio: number
  decimoTerceiro: number
  multaFgtsPct: number
  multaFgts: number
  baseFgtsMulta: number
  saqueFgts: number
  fgtsPermitido: boolean
  baseInss: number
  inss: number
  baseIrrf: number
  deducaoAplicada: number
  usaDescontoSimplificado: boolean
  aliquotaIrrf: number
  irrf: number
  totalBrutoRecebe: number
  totalDescontos: number
  totalLiquido: number
  seguroDesempregoAplica: boolean
  mensagemSeguroDesemprego: string
}

export function calcularRescisao(e: EntradaRescisao): ResultadoRescisao {
  const salarioBruto = parseCurrency(e.salarioBruto)
  const mediaHE = parseCurrency(e.mediaHorasExtras)
  const valorDia = (salarioBruto + mediaHE) / 30
  const diasMes = Math.max(0, Math.min(30, Math.round(e.diasTrabalhadosNoMes)))
  const mesesAno = Math.max(0, Math.min(12, Math.round(e.mesesTrabalhadosAno)))
  const diasAviso = Math.max(0, Math.min(90, Math.round(e.diasAvisoPrevio)))
  const saldoFgts = parseCurrency(e.saldoFgts)
  const dependentes = Math.max(0, Math.floor(e.dependentes || 0))

  const temJustaCausa = e.motivo === 'justa_causa'
  const ehAcordo = e.motivo === 'acordo_mutuo'
  const ehSemJustaCausa = e.motivo === 'sem_justa_causa' || e.motivo === 'termino_contrato'
  const ehPedidoOuEstagio = e.motivo === 'pedido_demissao' || e.motivo === 'estagio_90_dias'

  const temVerbasProporcionais = !temJustaCausa
  const temAvisoIndenizado =
    (ehSemJustaCausa || ehAcordo) && e.avisoPrevioIndenizado && diasAviso > 0
  const multaFgtsPct = ehSemJustaCausa ? 40 : ehAcordo ? 20 : 0
  const temSaqueFgts = ehSemJustaCausa || ehAcordo
  const seguroDesempregoAplica = e.motivo === 'sem_justa_causa'

  // --- Verbas ---
  const saldoSalario = valorDia * diasMes
  const feriasProporcionais = temVerbasProporcionais ? valorDia * diasMes : 0
  const tercoFeriasProporcionais = feriasProporcionais / 3
  const feriasVencidas = temVerbasProporcionais && e.feriasVencidas ? valorDia * 30 : 0
  const tercoFeriasVencidas = feriasVencidas / 3
  const avisoPrevioValor = temAvisoIndenizado ? valorDia * diasAviso : 0
  const tercoAvisoPrevio = avisoPrevioValor / 3
  const decimoTerceiro = temVerbasProporcionais ? ((salarioBruto + mediaHE) / 12) * mesesAno : 0
  const baseFgtsMulta = saldoFgts + avisoPrevioValor / 2
  const multaFgts = (baseFgtsMulta * multaFgtsPct) / 100
  const saqueFgts = temSaqueFgts ? saldoFgts + avisoPrevioValor / 2 : 0

  // --- Descontos (INSS/IRRF incidem apenas sobre verbas de natureza salarial) ---
  const baseInss = saldoSalario + avisoPrevioValor + tercoAvisoPrevio + decimoTerceiro
  const inss = calcularInss(baseInss)
  const baseIrrf = Math.max(0, baseInss - inss)
  const irrfInfo = calcularIrrfVigente(baseIrrf, dependentes)
  const { deducaoAplicada, usaDescontoSimplificado, aliquotaIrrf, irrf } = irrfInfo

  // --- Lista de verbas (inclui as que NÃO são devidas, para o usuário ver) ---
  const verbas: VerbaRescisoria[] = []
  const addRecebe = (id: string, rotulo: string, valor: number, detalhe: string) =>
    verbas.push({ id, rotulo, valor, aplica: true, obrigacao: 'recebe', detalhe })
  const addNaoRecebe = (id: string, rotulo: string, detalhe: string) =>
    verbas.push({ id, rotulo, valor: 0, aplica: false, obrigacao: 'nao_recebe', detalhe })

  addRecebe(
    'saldoSalario',
    'Saldo de salário (dias trabalhados no mês)',
    saldoSalario,
    `${diasMes} dias × ${formatarBRL(valorDia)}/dia`,
  )
  if (feriasVencidas > 0) {
    addRecebe(
      'feriasVencidas',
      'Férias vencidas + 1/3 (período aquisitivo anterior)',
      feriasVencidas + tercoFeriasVencidas,
      'férias não gozadas do período aquisitivo anterior (art. 146 CLT)',
    )
  }
  if (temVerbasProporcionais) {
    addRecebe(
      'feriasProp',
      `Férias proporcionais + 1/3 (${mesesAno}/12)`,
      feriasProporcionais + tercoFeriasProporcionais,
      `(${mesesAno}/12) × ${formatarBRL(salarioBruto + mediaHE)} × 1,3333`,
    )
  } else {
    addNaoRecebe(
      'feriasProp',
      'Férias proporcionais + 1/3',
      'não há direito a férias proporcionais na justa causa (art. 146 CLT)',
    )
  }
  if (temVerbasProporcionais) {
    addRecebe(
      'decimo',
      `13º salário proporcional (${mesesAno}/12)`,
      decimoTerceiro,
      `(${mesesAno}/12) × ${formatarBRL(salarioBruto + mediaHE)}`,
    )
  } else {
    addNaoRecebe('decimo', '13º salário proporcional', 'sem direito na justa causa (art. 146 CLT)')
  }
  if (temAvisoIndenizado) {
    addRecebe(
      'aviso',
      `Aviso prévio indenizado (${diasAviso} dias) + 1/3`,
      avisoPrevioValor + tercoAvisoPrevio,
      `${diasAviso} dias × ${formatarBRL(valorDia)} + 1/3 reflexo`,
    )
  } else if (ehSemJustaCausa || ehAcordo) {
    addNaoRecebe(
      'aviso',
      'Aviso prévio indenizado',
      'aviso prévio trabalhado (cumprido) — não há verba indenizatória',
    )
  }
  if (multaFgtsPct > 0) {
    addRecebe(
      'multaFgts',
      `Multa de FGTS de ${multaFgtsPct}%`,
      multaFgts,
      `${multaFgtsPct}% × ${formatarBRL(baseFgtsMulta)} (saldo + aviso indenizado ÷ 2)`,
    )
  } else {
    addNaoRecebe(
      'multaFgts',
      'Multa de FGTS',
      ehPedidoOuEstagio
        ? 'sem multa de FGTS no pedido de demissão / estágio de 90 dias (Lei 8.036/90, art. 18)'
        : 'sem multa de FGTS na justa causa (Lei 8.036/90, art. 18)',
    )
  }
  if (temSaqueFgts) {
    addRecebe(
      'saqueFgts',
      'Saque do FGTS (depósitos + aviso/2)',
      saqueFgts,
      'liberação dos depósitos + 50% do aviso indenizado (Lei 8.036/90, art. 18)',
    )
  } else {
    addNaoRecebe(
      'saqueFgts',
      'Saque do FGTS',
      ehPedidoOuEstagio
        ? 'sem saque do FGTS — o saldo permanece retido na conta vinculada (Lei 8.036/90, art. 20)'
        : 'sem saque do FGTS na justa causa — saldo permanece retido (Lei 8.036/90, art. 20)',
    )
  }

  const totalBrutoRecebe = verbas
    .filter((v) => v.obrigacao === 'recebe')
    .reduce((a, v) => a + v.valor, 0)
  const totalDescontos = inss + irrf
  const totalLiquido = totalBrutoRecebe - totalDescontos

  return {
    motivo: e.motivo,
    salarioBruto,
    valorDia,
    diasTrabalhadosNoMes: diasMes,
    mesesTrabalhadosAno: mesesAno,
    diasAvisoPrevio: diasAviso,
    avisoPrevioIndenizado: e.avisoPrevioIndenizado,
    saldoFgts,
    verbas,
    saldoSalario,
    feriasProporcionais,
    tercoFeriasProporcionais,
    feriasVencidas,
    tercoFeriasVencidas,
    avisoPrevioValor,
    tercoAvisoPrevio,
    decimoTerceiro,
    multaFgtsPct,
    multaFgts,
    baseFgtsMulta,
    saqueFgts,
    fgtsPermitido: temSaqueFgts,
    baseInss,
    inss,
    baseIrrf,
    deducaoAplicada,
    usaDescontoSimplificado,
    aliquotaIrrf,
    irrf,
    totalBrutoRecebe,
    totalDescontos,
    totalLiquido,
    seguroDesempregoAplica,
    mensagemSeguroDesemprego: seguroDesempregoAplica
      ? 'Com a demissão sem justa causa, o empregado pode ter direito ao seguro-desemprego (requisitos da Lei 7.998/1990).'
      : e.motivo === 'acordo_mutuo'
        ? 'No acordo mútuo (art. 484-A) o empregado saca 80% do FGTS e recebe metade da multa de 40%; o seguro-desemprego NÃO é devido.'
        : 'O seguro-desemprego NÃO é devido neste motivo — apenas na demissão sem justa causa.',
  }
}

/* =========================== MEMÓRIA DE CÁLCULO =========================== */

export function memoriaRescisao(r: ResultadoRescisao): LinhaMemoria[] {
  const linhas: LinhaMemoria[] = []
  const motivoLabel = MOTIVOS_RESCISAO.find((m) => m.id === r.motivo)?.label ?? ''

  linhas.push({
    rotulo: `Motivo: ${motivoLabel}`,
    valor: '',
  })

  for (const verba of r.verbas) {
    const rotulo = verba.detalhe ? `${verba.rotulo} — ${verba.detalhe}` : verba.rotulo
    if (!verba.aplica) {
      linhas.push({ rotulo: `× ${rotulo} — não recebe`, valor: '' })
    } else {
      linhas.push({
        rotulo: `+ ${rotulo}`,
        valor: formatarBRL(verba.valor),
      })
    }
  }

  linhas.push({
    rotulo: 'BRUTO DAS VERBAS RESCISÓRIAS',
    valor: formatarBRL(r.totalBrutoRecebe),
    destaque: 'total',
  })
  linhas.push({
    rotulo: 'Base INSS/IRRF (verbas salariais — exclui multa e saque do FGTS)',
    valor: formatarBRL(r.baseInss),
    destaque: 'base',
  })
  linhas.push({
    rotulo: '− INSS (tabela progressiva 2025)',
    valor: formatarBRL(r.inss),
    destaque: 'is',
  })
  linhas.push({
    rotulo: `− IRRF (tabela vigente, alíquota ${r.aliquotaIrrf.toLocaleString('pt-BR')}%, com redução da Lei 15.270/2025 quando aplicável)`,
    valor: formatarBRL(r.irrf),
    destaque: 'is',
  })
  linhas.push({
    rotulo: 'TOTAL LÍQUIDO DA RESCISÃO',
    valor: formatarBRL(r.totalLiquido),
    destaque: 'total',
  })
  linhas.push({
    rotulo: r.mensagemSeguroDesemprego,
    valor: '',
  })

  return linhas
}
