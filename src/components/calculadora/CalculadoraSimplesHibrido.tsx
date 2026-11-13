// Calculadora Educativa "Simples Híbrido" — Simples Nacional com PIS/Cofins
// por fora (art. 52 LC 123/2006 e art. 55 Lei 11.196/2005) comparada, na MESMA
// tela, com o Simples PURO e com o LUCRO PRESUMIDO (Lei 9.249/1995).
// 100% no navegador, sem gravação de dados.

import { useMemo, useState } from 'react'
import {
  Calculator,
  Info,
  RefreshCw,
  Scale,
  Landmark,
  TrendingDown,
  TrendingUp,
  Trophy,
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
import {
  calcularPresumido,
  calcularVereditoTresCenarios,
  calcularMemoriaPresumido,
  entradaPresumidoInicial,
  PCT_PIS_CUMULATIVO,
  PCT_COFINS_CUMULATIVO,
} from './lucroPresumidoCalc'
import type { EntradaPresumido } from './lucroPresumidoCalc'

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
  const [entradaPresumido, setEntradaPresumido] =
    useState<EntradaPresumido>(entradaPresumidoInicial)

  const anexoAtual = ANEXOS_SIMPLES.find((a) => a.id === entrada.anexoId) ?? ANEXOS_SIMPLES[0]

  // Recalcula sempre que qualquer campo muda — inclusive a % de PIS/Cofins,
  // que por padrão segue a repartição da faixa do anexo selecionado.
  const resultado = useMemo(
    () => calcularHibrido({ ...entrada, pctPisCofinsAliquota: pctPisCofinsEditado }),
    [entrada, pctPisCofinsEditado],
  )
  const memoria = useMemo(() => calcularMemoriaHibrido(resultado), [resultado])

  // Lucro Presumido — recalcula junto, na mesma tela.
  const resultadoPresumido = useMemo(() => {
    const r = calcularPresumido(entradaPresumido)
    const diferencaVsHibrido = r.totalTributos - resultado.totalHibrido
    return {
      ...r,
      diferencaVsHibrido,
      diferencaVsHibridoPct:
        resultado.totalHibrido > 0 ? (diferencaVsHibrido / resultado.totalHibrido) * 100 : 0,
      presumidoGanhaVsHibrido: diferencaVsHibrido < 0,
    }
  }, [entradaPresumido, resultado.totalHibrido])

  const memoriaPresumido = useMemo(
    () => calcularMemoriaPresumido(resultadoPresumido),
    [resultadoPresumido],
  )

  // Veredito do MENOR imposto entre os TRÊS cenários.
  const veredito = useMemo(
    () =>
      calcularVereditoTresCenarios(
        { dasPuro: resultado.dasPuro, totalHibrido: resultado.totalHibrido },
        { totalTributos: resultadoPresumido.totalTributos },
      ),
    [resultado.dasPuro, resultado.totalHibrido, resultadoPresumido.totalTributos],
  )

  const set = (campo: keyof EntradaHibrido) => (v: string) =>
    setEntrada((e) => ({ ...e, [campo]: v }))

  const setPresumido = (campo: keyof EntradaPresumido) => (v: string) =>
    setEntradaPresumido((e) => ({ ...e, [campo]: v }))

  const trocarAnexo = (anexoId: string) => {
    const anexo = ANEXOS_SIMPLES.find((a) => a.id === anexoId) ?? ANEXOS_SIMPLES[0]
    setEntrada((e) => ({ ...e, anexoId }))
    // Reseta a % de PIS/Cofins para o padrão do novo anexo (1ª faixa).
    setPctPisCofinsEditado(String(anexo.faixas[0].pctPisCofins).replace('.', ','))
  }

  const carregarExemplo = () => {
    setEntrada(entradaHibridoInicial)
    setPctPisCofinsEditado(entradaHibridoInicial.pctPisCofinsAliquota)
    setEntradaPresumido({
      ...entradaPresumidoInicial,
      receitaComercio: entradaHibridoInicial.receitaMes,
    })
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
        <div className="space-y-6">
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
                hint="Receita bruta auferida no mês de apuração (usada nos cenários Simples puro e híbrido)."
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
                <p className="mt-1 text-[10px] text-slate-400 leading-snug">
                  {anexoAtual.descricao}
                </p>
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
          </div>

          {/* Entradas do Lucro Presumido */}
          <div className={cardPapel}>
            <div className="flex items-center gap-2.5 mb-4">
              <Landmark className="w-5 h-5 text-[#082852]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852]">
                Dados do Lucro Presumido (Lei 9.249/1995)
              </span>
            </div>
            <div className="space-y-4">
              <CampoMoeda
                label="Receita de comércio/indústria no mês (presunção 8%)"
                valor={entradaPresumido.receitaComercio}
                onChange={setPresumido('receitaComercio')}
                hint="Revenda de mercadorias, industrialização — presunção de 8% para IRPJ (art. 15 da Lei 9.249/95)."
              />
              <CampoMoeda
                label="Receita de serviços no mês (presunção 32%)"
                valor={entradaPresumido.receitaServicos}
                onChange={setPresumido('receitaServicos')}
                hint="Serviços em geral, consultoria, administração de bens — presunção de 32% para IRPJ."
              />
              <CampoPercentual
                label="Alíquota de ISS do município (2% a 5%)"
                valor={entradaPresumido.pctIss}
                onChange={setPresumido('pctIss')}
                hint="LC 116/2003: cada município fixa a alíquota entre 2% e 5%. Padrão educativo: 3%."
              />
              <CampoMoeda
                label="Despesas dedutíveis do lucro presumido (opcional)"
                valor={entradaPresumido.despesasDedutiveis}
                onChange={setPresumido('despesasDedutiveis')}
                hint="Rateia proporcionalmente sobre a presunção (não deixa o lucro presumido negativo). Deixe R$ 0,00 para a regra geral."
              />
            </div>
            <p className="mt-4 text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
              <span>
                PIS 0,65% e Cofins 3% (cumulativos) sobre a receita bruta, ISS sobre a receita de
                serviços. Cálculo 100% no navegador: nada é gravado ou enviado para servidores.
                Valores educativos — não substituem a apuração contábil.
              </span>
            </p>
          </div>
        </div>

        {/* ------------------------ RESULTADOS ------------------------ */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Simples PURO */}
            <div className="rounded-2xl border border-stone-200 bg-[#F0F4F8]/70 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="w-4 h-4 text-[#082852]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
                  Simples PURO
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                DAS integral
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-[#082852] tabular-nums mt-1">
                {formatarBRL(resultado.dasPuro)}
              </p>
              <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                Alíquota efetiva: {formatarPercentual(resultado.aliquotaEfetiva)}
              </p>
            </div>

            {/* Simples HÍBRIDO */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 ${
                veredito.melhorRegime === 'Simples híbrido'
                  ? 'border-emerald-400 bg-emerald-50/70 ring-2 ring-emerald-400/30'
                  : 'border-stone-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-[#16A34A]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
                  Simples HÍBRIDO
                </span>
                {veredito.melhorRegime === 'Simples híbrido' ? (
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                ) : null}
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                DAS sem PIS/Cofins + PIS/Cofins por fora
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-[#082852] tabular-nums mt-1">
                {formatarBRL(resultado.totalHibrido)}
              </p>
              <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                DAS {formatarBRL(resultado.dasHibrido)} + PIS/Cofins líquido{' '}
                {formatarBRL(resultado.pisCofinsLiquido)}
              </p>
            </div>

            {/* Lucro PRESUMIDO */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 ${
                veredito.melhorRegime === 'Lucro presumido'
                  ? 'border-emerald-400 bg-emerald-50/70 ring-2 ring-emerald-400/30'
                  : 'border-stone-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="w-4 h-4 text-[#082852]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
                  Lucro PRESUMIDO
                </span>
                {veredito.melhorRegime === 'Lucro presumido' ? (
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                ) : null}
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                IRPJ + CSLL + PIS + Cofins + ISS
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-[#082852] tabular-nums mt-1">
                {formatarBRL(resultadoPresumido.totalTributos)}
              </p>
              <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                Alíquota efetiva: {formatarPercentual(resultadoPresumido.aliquotaEfetiva)} da
                receita bruta
              </p>
            </div>
          </div>

          {/* Veredito entre os TRÊS cenários */}
          <div
            className={`rounded-2xl border p-5 ${
              veredito.hibridoGanha
                ? 'border-emerald-300 bg-emerald-50/70'
                : 'border-amber-300 bg-amber-50/70'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {veredito.hibridoGanha ? (
                <TrendingDown className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-amber-600" />
              )}
              <span
                className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                  veredito.hibridoGanha ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                MENOR IMPOSTO NESTE MÊS: {veredito.melhorRegime.toUpperCase()}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {veredito.melhorRegime} paga{' '}
              <strong className="tabular-nums">{formatarBRL(veredito.melhorTotal)}</strong> contra{' '}
              {formatarBRL(veredito.piorTotal)} do {veredito.piorRegime} — diferença de{' '}
              <strong className="tabular-nums">{formatarBRL(veredito.diferencaTotal)}</strong> (
              {formatarPercentual(veredito.diferencaPct)} de economia em relação ao mais caro).
              Ranking:{' '}
              {veredito.ordenados.map((c, i) => (
                <span key={c.regime}>
                  {i > 0 ? ' · ' : ''}
                  <strong className="tabular-nums">{i + 1}º</strong> {c.regime} (
                  {formatarBRL(c.total)})
                </span>
              ))}
              .
            </p>
            <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
              <strong className="text-[#082852]">Quando cada regime tende a ganhar:</strong> o{' '}
              <strong>Simples puro</strong> favorece margens altas com poucos créditos; o{' '}
              <strong>híbrido</strong> favorece cadeias com alta carga de insumos e clientes B2B; o{' '}
              <strong>Lucro Presumido</strong> favorece margens de lucro acima da presunção legal
              (8%/32%) e clientes que exigem créditos de PIS/Cofins — mas carrega mais obrigações
              acessórias.
            </p>
          </div>

          {/* Memória de cálculo */}
          <div className={cardPapel}>
            <ListaMemoria linhas={memoria} titulo="Memória de cálculo — Simples puro × híbrido" />
          </div>
          <div className={cardPapel}>
            <ListaMemoria linhas={memoriaPresumido} titulo="Memória de cálculo — Lucro Presumido" />
            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
              PIS {formatarPercentual(PCT_PIS_CUMULATIVO)} e Cofins{' '}
              {formatarPercentual(PCT_COFINS_CUMULATIVO)} são cumulativos no Presumido — não há
              crédito sobre insumos, diferente do híbrido.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
