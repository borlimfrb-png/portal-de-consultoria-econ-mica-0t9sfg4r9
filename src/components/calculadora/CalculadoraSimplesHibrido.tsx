// Calculadora Educativa "Simples Híbrido" — Simples Nacional com PIS/Cofins
// por fora (art. 52 LC 123/2006 e art. 55 Lei 11.196/2005). 100% no navegador,
// sem gravação de dados. Compara Simples PURO × Simples HÍBRIDO.

import { useMemo, useState } from 'react'
import {
  Calculator,
  Info,
  RefreshCw,
  Scale,
  Landmark,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { formatarBRL, formatarPercentual } from './cbsIbsCalc'
import { ListaMemoria } from './CalculadoraMemoria'
import {
  ANEXOS_SIMPLES,
  entradaHibridoInicial,
  calcularHibrido,
  calcularMemoriaHibrido,
  PCT_PIS_COFINS_NAO_CUMULATIVO,
} from './simplesHibridoCalc'
import type { EntradaHibrido } from './simplesHibridoCalc'

const INPUT_CLS =
  'w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A]'

const LABEL_CLS =
  'block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-600 mb-1.5'

const cardPapel = 'bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6'

function CampoMoeda({
  label,
  valor,
  onChange,
  hint,
}: {
  label: string
  valor: string
  onChange: (v: string) => void
  hint?: string
}) {
  return (
    <div>
      <label className={LABEL_CLS}>{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
          R$
        </span>
        <input
          inputMode="decimal"
          className={`${INPUT_CLS} pl-9`}
          value={valor}
          placeholder="0,00"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {hint ? <p className="mt-1 text-[10px] text-slate-400 leading-snug">{hint}</p> : null}
    </div>
  )
}

function CampoPercentual({
  label,
  valor,
  onChange,
  hint,
}: {
  label: string
  valor: string
  onChange: (v: string) => void
  hint?: string
}) {
  return (
    <div>
      <label className={LABEL_CLS}>{label}</label>
      <div className="relative">
        <input
          inputMode="decimal"
          className={INPUT_CLS}
          value={valor}
          placeholder="0,00"
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
          %
        </span>
      </div>
      {hint ? <p className="mt-1 text-[10px] text-slate-400 leading-snug">{hint}</p> : null}
    </div>
  )
}

export default function CalculadoraSimplesHibrido() {
  const [entrada, setEntrada] = useState<EntradaHibrido>(entradaHibridoInicial)
  const [pctPisCofinsEditado, setPctPisCofinsEditado] = useState<string>(
    entradaHibridoInicial.pctPisCofinsAliquota,
  )

  const anexoAtual = ANEXOS_SIMPLES.find((a) => a.id === entrada.anexoId) ?? ANEXOS_SIMPLES[0]

  // Recalcula sempre que qualquer campo muda — inclusive a % de PIS/Cofins,
  // que por padrão segue a repartição da faixa do anexo selecionado.
  const resultado = useMemo(
    () => calcularHibrido({ ...entrada, pctPisCofinsAliquota: pctPisCofinsEditado }),
    [entrada, pctPisCofinsEditado],
  )
  const memoria = useMemo(() => calcularMemoriaHibrido(resultado), [resultado])

  const set = (campo: keyof EntradaHibrido) => (v: string) =>
    setEntrada((e) => ({ ...e, [campo]: v }))

  const trocarAnexo = (anexoId: string) => {
    const anexo = ANEXOS_SIMPLES.find((a) => a.id === anexoId) ?? ANEXOS_SIMPLES[0]
    setEntrada((e) => ({ ...e, anexoId }))
    // Reseta a % de PIS/Cofins para o padrão do novo anexo (1ª faixa).
    setPctPisCofinsEditado(String(anexo.faixas[0].pctPisCofins).replace('.', ','))
  }

  const carregarExemplo = () => {
    setEntrada(entradaHibridoInicial)
    setPctPisCofinsEditado(entradaHibridoInicial.pctPisCofinsAliquota)
  }

  return (
    <div className="space-y-6">
      {/* Atalhos de exemplo */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500">
          Exemplo rápido:
        </span>
        <button
          type="button"
          onClick={carregarExemplo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#082852] text-white text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-[#0B3B7A] transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Comércio/Indústria R$ 150 mil (pré-carregado)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ------------------------- ENTRADAS ------------------------- */}
        <div className={cardPapel}>
          <div className="flex items-center gap-2.5 mb-4">
            <Calculator className="w-5 h-5 text-[#16A34A]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852]">
              Dados da empresa do Simples Nacional
            </span>
          </div>
          <div className="space-y-4">
            <CampoMoeda
              label="Receita de faturamento do mês"
              valor={entrada.receitaMes}
              onChange={set('receitaMes')}
              hint="Receita bruta auferida no mês de apuração."
            />
            <CampoMoeda
              label="RBT12 (receita bruta acumulada em 12 meses)"
              valor={entrada.rbt12}
              onChange={set('rbt12')}
              hint="Define a faixa do anexo e a alíquota efetiva do DAS."
            />
            <div>
              <label className={LABEL_CLS}>Anexo do Simples Nacional (LC 123/2006)</label>
              <select
                className={INPUT_CLS}
                value={entrada.anexoId}
                onChange={(e) => trocarAnexo(e.target.value)}
              >
                {ANEXOS_SIMPLES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nome}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[10px] text-slate-400 leading-snug">{anexoAtual.descricao}</p>
            </div>
            <CampoPercentual
              label="% de PIS/Cofins dentro da alíquota efetiva"
              valor={pctPisCofinsEditado}
              onChange={setPctPisCofinsEditado}
              hint="Padrão: repartição de PIS/Pasep + Cofins da faixa do anexo selecionado (editável)."
            />
            <CampoMoeda
              label="Receita de insumos/compras geradoras de crédito"
              valor={entrada.receitaInsumos}
              onChange={set('receitaInsumos')}
              hint="Compras com direito a crédito no regime não cumulativo (insumos, revenda, energia, aluguéis)."
            />
            <CampoPercentual
              label="% de aproveitamento de crédito"
              valor={entrada.pctAproveitamento}
              onChange={set('pctAproveitamento')}
              hint={`Padrão: ${formatarPercentual(PCT_PIS_COFINS_NAO_CUMULATIVO)} (PIS 1,65% + Cofins 7,6%).`}
            />
          </div>
          <p className="mt-4 text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
            <span>
              Cálculo 100% no navegador: nada é gravado ou enviado para servidores. Valores
              educativos de referência — não substituem a apuração contábil.
            </span>
          </p>
        </div>

        {/* ------------------------ RESULTADOS ------------------------ */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Simples PURO */}
            <div className="rounded-2xl border border-stone-200 bg-[#F0F4F8]/70 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="w-4 h-4 text-[#082852]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
                  Simples PURO
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                DAS integral
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#082852] tabular-nums mt-1">
                {formatarBRL(resultado.dasPuro)}
              </p>
              <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                Alíquota efetiva: {formatarPercentual(resultado.aliquotaEfetiva)}
              </p>
            </div>

            {/* Simples HÍBRIDO */}
            <div
              className={`rounded-2xl border p-5 ${
                resultado.hibridoCompensa
                  ? 'border-emerald-300 bg-emerald-50/70'
                  : 'border-amber-300 bg-amber-50/70'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-[#16A34A]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
                  Simples HÍBRIDO
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                DAS sem PIS/Cofins + PIS/Cofins por fora
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#082852] tabular-nums mt-1">
                {formatarBRL(resultado.totalHibrido)}
              </p>
              <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                DAS {formatarBRL(resultado.dasHibrido)} + PIS/Cofins líquido{' '}
                {formatarBRL(resultado.pisCofinsLiquido)}
              </p>
            </div>
          </div>

          {/* Comparação */}
          <div
            className={`rounded-2xl border p-5 ${
              resultado.hibridoCompensa
                ? 'border-emerald-300 bg-emerald-50/70'
                : 'border-amber-300 bg-amber-50/70'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {resultado.hibridoCompensa ? (
                <TrendingDown className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-amber-600" />
              )}
              <span
                className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                  resultado.hibridoCompensa ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {resultado.hibridoCompensa
                  ? 'O HÍBRIDO paga menos neste mês'
                  : 'O HÍBRIDO não compensa neste mês'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Diferença de{' '}
              <strong className="tabular-nums">{formatarBRL(resultado.diferenca)}</strong> (
              {formatarPercentual(Math.abs(resultado.diferencaPct))}{' '}
              {resultado.hibridoCompensa ? 'de economia' : 'de custo adicional'}) em relação ao
              Simples puro.
            </p>
          </div>

          {/* Memória de cálculo */}
          <div className={cardPapel}>
            <ListaMemoria linhas={memoria} titulo="Memória de cálculo passo a passo" />
          </div>
        </div>
      </div>
    </div>
  )
}
