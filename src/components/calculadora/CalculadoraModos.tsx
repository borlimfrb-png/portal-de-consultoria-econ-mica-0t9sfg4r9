// Modos "Pedágio" e "Bases de Cálculo" da Calculadora CBS/IBS — reproduzidos
// da Calculadora de Tributação sobre Consumo da Receita Federal (piloto-cbs).

import { useMemo, useState } from 'react'
import { Truck, Calculator, Layers, ExternalLink, Info, Landmark } from 'lucide-react'
import {
  formatarBRL,
  formatarPercentual,
  parseCurrency,
  CALCULADORA_OFICIAL_URL,
} from './cbsIbsCalc'
import {
  calcularPedagio,
  calcularMemoriaPedagio,
  calcularBases,
  calcularMemoriaBases,
  componentesBaseVazios,
  PEDAGIO_PCT_CBS_PADRAO,
} from './cbsIbsCalcModos'
import type { ComponentesBase } from './cbsIbsCalcModos'
import { ListaMemoria } from './CalculadoraMemoria'

const INPUT_CLS =
  'w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A]'

const LABEL_CLS =
  'block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-600 mb-1.5'

const cardPapel = 'bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6'

function CampoMoeda({
  label,
  valor,
  onChange,
  placeholder = '0,00',
  sinal,
  hint,
}: {
  label: string
  valor: string
  onChange: (v: string) => void
  placeholder?: string
  sinal?: '+' | '−'
  hint?: string
}) {
  return (
    <div>
      <label className={LABEL_CLS}>
        {sinal ? (
          <span
            className={`inline-flex items-center justify-center w-4 h-4 mr-1 rounded-full text-[10px] font-bold text-white ${
              sinal === '+' ? 'bg-[#16A34A]' : 'bg-amber-600'
            }`}
          >
            {sinal}
          </span>
        ) : null}
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
          R$
        </span>
        <input
          inputMode="decimal"
          className={`${INPUT_CLS} pl-9`}
          value={valor}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {hint ? <p className="mt-1 text-[10px] text-slate-400 leading-snug">{hint}</p> : null}
    </div>
  )
}

/* --------------------------------- PEDÁGIO -------------------------------- */

function ModoPedagio() {
  const [valor, setValor] = useState('100,00')
  const [pctCBS, setPctCBS] = useState(PEDAGIO_PCT_CBS_PADRAO)

  const resultado = useMemo(() => calcularPedagio(valor, pctCBS), [valor, pctCBS])
  const memoria = useMemo(() => calcularMemoriaPedagio(resultado), [resultado])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className={cardPapel}>
        <div className="flex items-center gap-2.5 mb-4">
          <Truck className="w-5 h-5 text-[#16A34A]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852]">
            Dados do pedágio destacado no frete (CT-e)
          </span>
        </div>
        <div className="space-y-4">
          <CampoMoeda
            label="Valor do pedágio na nota do frete"
            valor={valor}
            onChange={setValor}
            hint="Informe o valor do serviço de pedágio destacado no CT-e."
          />
          <CampoMoeda
            label="Alíquota CBS (%)"
            valor={pctCBS}
            onChange={setPctCBS}
            hint="Alíquota de referência do piloto da CBS (8,80%)."
          />
          <a
            href={CALCULADORA_OFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B3B7A] hover:text-[#16A34A] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Conferir na calculadora oficial do piloto CBS</span>
          </a>
        </div>
      </div>

      <div className={cardPapel}>
        <div className="flex items-center gap-2.5 mb-4">
          <Landmark className="w-5 h-5 text-[#16A34A]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852]">
            Resultado
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-xl bg-[#F0F4F8] border border-stone-200 p-3.5">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              CBS sobre o pedágio
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-blue-900 tabular-nums mt-1">
              {formatarBRL(resultado.cbs)}
            </p>
          </div>
          <div className="rounded-xl bg-[#F0F4F8] border border-stone-200 p-3.5">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              Total (pedágio + CBS)
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-[#082852] tabular-nums mt-1">
              {formatarBRL(resultado.totalComCbs)}
            </p>
          </div>
        </div>
        <ListaMemoria linhas={memoria} titulo="Memória de cálculo — Pedágio" />
        <p className="mt-4 text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
          <span>
            Como o pedágio integra o frete, a CBS cobrada sobre ele gera crédito aproveitável pelo
            contratante do transporte (transportadora ou embarcador), desde que destacado no
            documento fiscal.
          </span>
        </p>
      </div>
    </div>
  )
}

/* ---------------------------- BASES DE CÁLCULO ---------------------------- */

function ModoBases() {
  const [componentes, setComponentes] = useState<ComponentesBase>(componentesBaseVazios)
  const [pctCBS, setPctCBS] = useState('8,80')
  const [pctIBS, setPctIBS] = useState('17,70')

  const set = (campo: keyof ComponentesBase) => (v: string) =>
    setComponentes((c) => ({ ...c, [campo]: v }))

  const r = useMemo(() => calcularBases(componentes, pctCBS, pctIBS), [componentes, pctCBS, pctIBS])
  const memoria = useMemo(() => calcularMemoriaBases(r), [r])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className={cardPapel}>
        <div className="flex items-center gap-2.5 mb-4">
          <Layers className="w-5 h-5 text-[#16A34A]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852]">
            Componentes da base de cálculo do IVA
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CampoMoeda
            label="Valor do produto"
            valor={componentes.vProd}
            onChange={set('vProd')}
            sinal="+"
          />
          <CampoMoeda label="Frete" valor={componentes.vFrete} onChange={set('vFrete')} sinal="+" />
          <CampoMoeda label="Seguro" valor={componentes.vSeg} onChange={set('vSeg')} sinal="+" />
          <CampoMoeda
            label="Outras despesas acessórias"
            valor={componentes.vOutro}
            onChange={set('vOutro')}
            sinal="+"
          />
          <CampoMoeda
            label="Descontos"
            valor={componentes.vDesc}
            onChange={set('vDesc')}
            sinal="−"
          />
          <CampoMoeda
            label="Imposto Seletivo"
            valor={componentes.vIS}
            onChange={set('vIS')}
            sinal="−"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-stone-100">
          <CampoMoeda label="Alíquota CBS (%)" valor={pctCBS} onChange={setPctCBS} />
          <CampoMoeda label="Alíquota IBS (%)" valor={pctIBS} onChange={setPctIBS} />
        </div>
      </div>

      <div className={cardPapel}>
        <div className="flex items-center gap-2.5 mb-4">
          <Calculator className="w-5 h-5 text-[#16A34A]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852]">
            Montagem da base e apuração
          </span>
        </div>

        {/* Passo a passo da montagem da base */}
        <ol className="space-y-1.5 mb-5">
          <li className="flex justify-between text-xs font-mono text-slate-600">
            <span>(+) Produto</span>
            <span className="tabular-nums">{formatarBRL(r.vProd)}</span>
          </li>
          {r.vFrete > 0 && (
            <li className="flex justify-between text-xs font-mono text-slate-600">
              <span>(+) Frete</span>
              <span className="tabular-nums">{formatarBRL(r.vFrete)}</span>
            </li>
          )}
          {r.vSeg > 0 && (
            <li className="flex justify-between text-xs font-mono text-slate-600">
              <span>(+) Seguro</span>
              <span className="tabular-nums">{formatarBRL(r.vSeg)}</span>
            </li>
          )}
          {r.vOutro > 0 && (
            <li className="flex justify-between text-xs font-mono text-slate-600">
              <span>(+) Outras despesas acessórias</span>
              <span className="tabular-nums">{formatarBRL(r.vOutro)}</span>
            </li>
          )}
          {r.vDesc > 0 && (
            <li className="flex justify-between text-xs font-mono text-amber-700">
              <span>(−) Descontos</span>
              <span className="tabular-nums">{formatarBRL(r.vDesc)}</span>
            </li>
          )}
          {r.vIS > 0 && (
            <li className="flex justify-between text-xs font-mono text-amber-700">
              <span>(−) Imposto Seletivo</span>
              <span className="tabular-nums">{formatarBRL(r.vIS)}</span>
            </li>
          )}
          <li className="flex justify-between text-sm font-bold text-[#082852] border-t border-stone-200 pt-2 mt-1">
            <span className="font-mono uppercase text-xs">= Base de cálculo do IVA</span>
            <span className="tabular-nums">{formatarBRL(r.base)}</span>
          </li>
        </ol>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="rounded-xl bg-blue-50 border border-blue-100 p-3">
            <p className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold">
              CBS {formatarPercentual(r.pctCBS)}
            </p>
            <p className="text-sm sm:text-base font-extrabold text-blue-900 tabular-nums mt-1">
              {formatarBRL(r.cbs)}
            </p>
          </div>
          <div className="rounded-xl bg-purple-50 border border-purple-100 p-3">
            <p className="text-[10px] font-mono uppercase tracking-wider text-purple-700 font-bold">
              IBS {formatarPercentual(r.pctIBS)}
            </p>
            <p className="text-sm sm:text-base font-extrabold text-purple-900 tabular-nums mt-1">
              {formatarBRL(r.ibs)}
            </p>
          </div>
          <div className="rounded-xl bg-[#F0F4F8] border border-stone-200 p-3">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              Total IVA
            </p>
            <p className="text-sm sm:text-base font-extrabold text-[#082852] tabular-nums mt-1">
              {formatarBRL(r.ivaTotal)}
            </p>
          </div>
        </div>

        <ListaMemoria linhas={memoria} titulo="Memória de cálculo completa" />
      </div>
    </div>
  )
}

export default function CalculadoraModos({ modo }: { modo: 'pedagio' | 'bases' }) {
  return <div className="space-y-5">{modo === 'pedagio' ? <ModoPedagio /> : <ModoBases />}</div>
}
