// Card de resultado e memória de cálculo do LUCRO REAL na Calculadora do
// Simples Híbrido. O cálculo em si vive em tresRegimesCalc.ts (o MESMO módulo
// usado pela calculadora dos 3 regimes, na seção Tributação) — nada duplicado.

import { Building2, Trophy } from 'lucide-react'
import { formatarBRL, formatarPercentual } from './cbsIbsCalc'
import type { LinhaMemoria } from './cbsIbsCalc'
import { ListaMemoria } from './CalculadoraMemoria'
import { ApuracaoLucroRealTabela } from './ApuracaoLucroRealTabela'
import { PCT_PIS_NAO_CUMULATIVO, PCT_COFINS_NAO_CUMULATIVO } from './tresRegimesCalc'
import type { ResultadoLucroReal } from './tresRegimesCalc'

const CARD_CLS = 'rounded-2xl border p-4 sm:p-5'

export function CardLucroReal({
  resultado,
  melhor,
}: {
  resultado: ResultadoLucroReal
  melhor: boolean
}) {
  return (
    <div
      className={`${CARD_CLS} ${
        melhor
          ? 'border-emerald-400 bg-emerald-50/70 ring-2 ring-emerald-400/30'
          : 'border-stone-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="w-4 h-4 text-[#082852]" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
          Lucro REAL
        </span>
        {melhor ? <Trophy className="w-3.5 h-3.5 text-emerald-600" /> : null}
      </div>
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
        IRPJ + adicional + CSLL + PIS/Cofins líq. + ISS
      </p>
      <p className="text-lg sm:text-xl font-extrabold text-[#082852] tabular-nums mt-1">
        {formatarBRL(resultado.totalTributos)}
      </p>
      <p className="mt-2 text-[11px] text-slate-600 leading-snug">
        Alíquota efetiva: {formatarPercentual(resultado.aliquotaEfetiva)} da receita bruta
      </p>
      <ApuracaoLucroRealTabela apuracao={resultado.apuracao} />
    </div>
  )
}

export function MemoriaLucroReal({ linhas }: { linhas: LinhaMemoria[] }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6">
      <ListaMemoria linhas={linhas} titulo="Memória de cálculo — Lucro Real" />
      <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
        PIS {formatarPercentual(PCT_PIS_NAO_CUMULATIVO)} e Cofins{' '}
        {formatarPercentual(PCT_COFINS_NAO_CUMULATIVO)} não cumulativos, com crédito sobre insumos e
        despesas dedutíveis — o <strong>% de aproveitamento</strong> é o mesmo campo do bloco do
        Simples. Como esta tela não pede folha de pagamento, o Lucro Real aqui considera folha R$
        0,00; para incluí-la, use a calculadora completa dos três regimes (seção Tributação).
      </p>
    </div>
  )
}
