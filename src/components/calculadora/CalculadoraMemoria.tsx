// Componentes de exibição da memória de cálculo e avisos da Calculadora CBS/IBS.

import { Landmark, ShieldCheck, Info } from 'lucide-react'
import { formatarBRL } from './cbsIbsCalc'
import type { LinhaMemoria } from './cbsIbsCalc'

const COR_DESTAQUE: Record<NonNullable<LinhaMemoria['destaque']>, string> = {
  base: 'text-[#0B3B7A] font-bold',
  cbs: 'text-blue-900 font-bold',
  ibs: 'text-purple-900 font-bold',
  is: 'text-amber-700 font-bold',
  total: 'text-[#082852] font-extrabold',
}

function LinhaMemoriaRow({ linha }: { linha: LinhaMemoria }) {
  const recuo = linha.rotulo.startsWith('   ')
  const isNota = linha.valor === '' && !linha.destaque
  const isResultado = linha.rotulo.startsWith('RESULTADO')

  if (isNota) {
    return (
      <li className="flex items-start gap-2 pt-2 text-[11px] text-slate-500 leading-relaxed">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>{linha.rotulo}</span>
      </li>
    )
  }

  return (
    <li
      className={`flex items-baseline justify-between gap-3 ${recuo ? 'pl-3' : ''} ${
        isResultado ? 'border-t border-stone-200 pt-2 mt-1' : ''
      }`}
    >
      <span
        className={`text-[11px] sm:text-xs leading-snug ${
          isResultado
            ? 'font-mono font-bold uppercase tracking-wide text-[#082852]'
            : 'font-mono text-slate-600'
        }`}
      >
        {linha.rotulo}
      </span>
      <span
        className={`text-xs sm:text-sm tabular-nums whitespace-nowrap ${
          linha.destaque ? COR_DESTAQUE[linha.destaque] : 'text-slate-700 font-semibold'
        }`}
      >
        {linha.valor}
      </span>
    </li>
  )
}

export function ListaMemoria({ linhas, titulo }: { linhas: LinhaMemoria[]; titulo: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Landmark className="w-4 h-4 text-[#16A34A]" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#15803D]">
          {titulo}
        </span>
      </div>
      <ul className="space-y-1.5">
        {linhas.map((l, i) => (
          <LinhaMemoriaRow key={i} linha={l} />
        ))}
      </ul>
    </div>
  )
}

export function AvisoEducativo() {
  return (
    <div className="bg-[#F0F4F8] rounded-2xl p-6 sm:p-7 border border-stone-200 space-y-3">
      <div className="flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852]">
          Aviso educativo — nada é gravado
        </span>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">
        Esta calculadora é <strong className="text-[#082852]">100% educativa</strong>: todos os
        cálculos acontecem no seu navegador e{' '}
        <strong className="text-[#082852]">nada é gravado ou enviado</strong> para servidores — não
        há cadastro, cookie de simulação ou persistência de valores. Feche ou recarregue a página e
        a simulação começa do zero.
      </p>
      <p className="text-xs text-slate-600 leading-relaxed">
        Os cálculos usam as alíquotas de referência (CBS 8,80% e IBS 17,70%) e{' '}
        <strong className="text-[#082852]">não substituem a apuração oficial</strong> nem a consulta
        à calculadora oficial da Receita Federal.
      </p>
    </div>
  )
}
