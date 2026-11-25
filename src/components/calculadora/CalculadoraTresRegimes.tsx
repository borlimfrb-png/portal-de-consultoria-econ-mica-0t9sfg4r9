// Calculadora Educativa "Simulação dos 3 Regimes" — Lucro Real × Lucro
// Presumido × Simples Nacional, lado a lado, na mesma tela.
// Usa o módulo tresRegimesCalc.ts (que reaproveita lucroPresumidoCalc.ts e
// simplesHibridoCalc.ts) e segue o padrão visual da CalculadoraSimplesHibrido.
// 100% no navegador, sem gravação de dados.

import { useMemo, useState } from 'react'
import {
  Briefcase,
  Calculator,
  Landmark,
  RefreshCw,
  Scale,
  TrendingDown,
  TrendingUp,
  Trophy,
  Info,
} from 'lucide-react'
import { formatarBRL, formatarPercentual } from './cbsIbsCalc'
import { ListaMemoria, AvisoEducativo } from './CalculadoraMemoria'
import { ANEXOS_SIMPLES } from './simplesHibridoCalc'
import { Checkbox } from '@/components/ui/checkbox'
import {
  entradaTresRegimesInicial,
  entradaTresRegimesCasoReal,
  FATOR_R_LIMITE,
  calcularLucroReal,
  calcularSimplesRegimes,
  calcularVereditoTresRegimes,
  calcularMemoriaLucroReal,
  calcularMemoriaSimplesRegimes,
  calcularMemoriaPresumidoRegimes,
} from './tresRegimesCalc'
import type { EntradaTresRegimes } from './tresRegimesCalc'
import { calcularPresumido, PCT_PIS_CUMULATIVO, PCT_COFINS_CUMULATIVO } from './lucroPresumidoCalc'
import type { EntradaPresumido } from './lucroPresumidoCalc'
import { BlocosCreditosDebitos } from './BlocosCreditosDebitos'
import type { BlocoComum, PctPisCofinsRegime } from './creditosDebitosCalc'

const INPUT_CLS =
  'w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A]'

const LABEL_CLS =
  'block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-600 mb-1.5'

const cardPapel = 'bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6'

/** Nome curto do anexo ("Anexo I" em vez de "Anexo I — Comércio"). */
function nomeCurtoAnexo(nome: string): string {
  return nome.split(' — ')[0] ?? nome
}

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

const ROTULO_REGIME: Record<string, string> = {
  'Simples Nacional': 'Simples NACIONAL',
  'Lucro Presumido': 'Lucro PRESUMIDO',
  'Lucro Real': 'Lucro REAL',
}

export default function CalculadoraTresRegimes() {
  const [entrada, setEntrada] = useState<EntradaTresRegimes>(entradaTresRegimesInicial)

  // Recalcula a cada tecla: todos os cenários derivam do mesmo estado.
  const real = useMemo(() => calcularLucroReal(entrada), [entrada])
  const simples = useMemo(() => calcularSimplesRegimes(entrada), [entrada])

  const entradaPresumido: EntradaPresumido = useMemo(
    () => ({
      receitaComercio: entrada.receitaComercio,
      receitaServicos: entrada.receitaServicos,
      pctIss: entrada.pctIss,
      despesasDedutiveis: entrada.custosDedutiveis,
      // Blocos CRÉDITOS / DÉBITOS / CUSTOS E DESPESAS informados na tela:
      blocoComum: entrada.blocoComum,
      pctPisCofinsPresumido: entrada.pctPisCofinsPresumido,
    }),
    [
      entrada.receitaComercio,
      entrada.receitaServicos,
      entrada.pctIss,
      entrada.custosDedutiveis,
      entrada.blocoComum,
      entrada.pctPisCofinsPresumido,
    ],
  )
  const presumido = useMemo(() => calcularPresumido(entradaPresumido), [entradaPresumido])

  const memoriaReal = useMemo(() => calcularMemoriaLucroReal(real), [real])
  const memoriaSimples = useMemo(() => calcularMemoriaSimplesRegimes(simples), [simples])
  const memoriaPresumido = useMemo(() => calcularMemoriaPresumidoRegimes(presumido), [presumido])

  // Veredito do MENOR imposto entre os TRÊS regimes (diferença em R$ e %).
  const veredito = useMemo(
    () =>
      calcularVereditoTresRegimes(
        { totalTributos: real.totalTributos },
        { totalTributos: presumido.totalTributos },
        { dasTotal: simples.dasTotal },
      ),
    [real.totalTributos, presumido.totalTributos, simples.dasTotal],
  )

  const set = (campo: keyof EntradaTresRegimes) => (v: string) =>
    setEntrada((e) => ({ ...e, [campo]: v }))

  const setFlag = (campo: keyof EntradaTresRegimes) => (v: boolean) =>
    setEntrada((e) => ({ ...e, [campo]: v }))

  // Blocos CRÉDITOS / DÉBITOS / CUSTOS E DESPESAS (aninhados na entrada):
  const setBlocoComum = (campo: keyof BlocoComum, v: string) =>
    setEntrada((e) => ({ ...e, blocoComum: { ...e.blocoComum, [campo]: v } }))
  const setPctReal = (campo: keyof PctPisCofinsRegime, v: string) =>
    setEntrada((e) => ({ ...e, pctPisCofinsReal: { ...e.pctPisCofinsReal, [campo]: v } }))
  const setPctPresumido = (campo: keyof PctPisCofinsRegime, v: string) =>
    setEntrada((e) => ({ ...e, pctPisCofinsPresumido: { ...e.pctPisCofinsPresumido, [campo]: v } }))

  const carregarExemplo = () => setEntrada(entradaTresRegimesInicial)
  const carregarCasoReal = () => setEntrada(entradaTresRegimesCasoReal)

  return (
    <div className="space-y-6">
      {/* Atalhos de exemplo */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500">
          Exemplo rápido:
        </span>
        <button
          type="button"
          onClick={carregarCasoReal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16A34A] text-white text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-[#1F7A4D] transition-colors"
        >
          <Briefcase className="w-3 h-3" />
          <span>Carregar caso real (comércio + serviços, R$ 180 mil/mês)</span>
        </button>
        <button
          type="button"
          onClick={carregarExemplo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#082852] text-white text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-[#0B3B7A] transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Voltar ao padrão (comércio R$ 150 mil/mês)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ------------------------- ENTRADAS ------------------------- */}
        <div className={cardPapel}>
          <div className="flex items-center gap-2.5 mb-4">
            <Calculator className="w-5 h-5 text-[#16A34A]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852]">
              Dados da empresa (mesmos dados para os 3 regimes)
            </span>
          </div>
          <div className="space-y-4">
            <CampoMoeda
              label="Receita de comércio/indústria no mês"
              valor={entrada.receitaComercio}
              onChange={set('receitaComercio')}
              hint="Revenda de mercadorias e industrialização — presunção de 8% no Presumido; tributada pelo Anexo do Simples."
            />
            <CampoMoeda
              label="Receita de serviços no mês"
              valor={entrada.receitaServicos}
              onChange={set('receitaServicos')}
              hint="Serviços em geral — presunção de 32% no Presumido e ISS do município."
            />
            <CampoMoeda
              label="RBT12 (receita bruta acumulada em 12 meses)"
              valor={entrada.rbt12}
              onChange={set('rbt12')}
              hint="Define a faixa e a alíquota efetiva do DAS no Simples Nacional — e é o denominador do Fator R."
            />
            <div>
              <label className={LABEL_CLS}>Anexo do Simples Nacional (LC 123/2006)</label>
              <select
                className={INPUT_CLS}
                value={entrada.anexoId}
                onChange={(e) => set('anexoId')(e.target.value)}
              >
                <option value="auto">Automático — Fator R decide o anexo dos serviços</option>
                {ANEXOS_SIMPLES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nome} (fixo)
                  </option>
                ))}
              </select>
            </div>
            <CampoMoeda
              label="Folha de salários dos 12 meses (Fator R do Simples)"
              valor={entrada.folha12Simples}
              onChange={set('folha12Simples')}
              hint="Salários, pró-labore e encargos dos últimos 12 meses. Fator R = folha 12m ÷ RBT12: ≥ 28% → serviços no Anexo III; < 28% → Anexo V. Só vale para receita de serviços."
            />
            <label className="flex items-start gap-2 cursor-pointer group">
              <Checkbox
                checked={entrada.anexoIvRetencaoIss}
                onCheckedChange={(v) => setFlag('anexoIvRetencaoIss')(v === true)}
                className="mt-0.5"
              />
              <span className="text-[11px] text-slate-600 leading-snug group-hover:text-slate-800">
                <strong className="text-slate-800">
                  Serviços com retenção de ISS / do § 5º-C (Anexo IV)
                </strong>{' '}
                — administração e locação de imóveis, academias, vigilância, limpeza e obras. No
                modo automático, a receita de serviços vai para o Anexo IV em vez do Fator R.
              </span>
            </label>
            <CampoMoeda
              label="Custos e despesas dedutíveis no mês"
              valor={entrada.custosDedutiveis}
              onChange={set('custosDedutiveis')}
              hint="Reduzem o lucro no Lucro Real (e geram crédito de PIS/Cofins); no Presumido entram pelo rateio educativo. No Simples não reduzem o DAS."
            />
            <CampoMoeda
              label="Folha de pagamento no mês"
              valor={entrada.folhaPagamento}
              onChange={set('folhaPagamento')}
              hint="Dedutível no Lucro Real; no Presumido e no Simples não reduz o imposto do mês."
            />
            <CampoPercentual
              label="% de aproveitamento de crédito de PIS/Cofins (Lucro Real)"
              valor={entrada.pctCreditos}
              onChange={set('pctCreditos')}
              hint="Percentual dos créditos (9,25% sobre os custos) efetivamente aproveitável no Lucro Real."
            />
            <CampoPercentual
              label="Alíquota de ISS do município (2% a 5%)"
              valor={entrada.pctIss}
              onChange={set('pctIss')}
              hint="LC 116/2003: cada município fixa a alíquota entre 2% e 5%. Padrão educativo: 3%."
            />
          </div>
          <BlocosCreditosDebitos
            blocoComum={entrada.blocoComum}
            setBlocoComum={setBlocoComum}
            pctReal={entrada.pctPisCofinsReal}
            setPctReal={setPctReal}
            pctPresumido={entrada.pctPisCofinsPresumido}
            setPctPresumido={setPctPresumido}
          />
          <p className="mt-4 text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
            <span>
              Aceita valores com vírgula (ex.: 150.000,00). Cálculo 100% no navegador: nada é
              gravado ou enviado para servidores. Valores educativos — não substituem a apuração
              contábil nem a oficial (PGDAS-D, PER/DCOMP).
            </span>
          </p>
        </div>

        {/* ------------------------ RESULTADOS ------------------------ */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Simples Nacional */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 ${
                veredito.melhor === 'Simples Nacional'
                  ? 'border-emerald-400 bg-emerald-50/70 ring-2 ring-emerald-400/30'
                  : 'border-stone-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="w-4 h-4 text-[#082852]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
                  Simples NACIONAL
                </span>
                {veredito.melhor === 'Simples Nacional' ? (
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                ) : null}
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                DAS (guia única)
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-[#082852] tabular-nums mt-1">
                {formatarBRL(simples.dasTotal)}
              </p>
              <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                {simples.anexoNome} · {simples.faixaTexto} — alíquota efetiva{' '}
                {formatarPercentual(simples.aliquotaEfetiva)}
              </p>
              {simples.fatias.length > 1 ? (
                <p className="mt-1 text-[10px] text-slate-500 leading-snug">
                  {simples.fatias
                    .map((f) => `${nomeCurtoAnexo(f.anexoNome)}: ${formatarBRL(f.das)}`)
                    .join(' · ')}
                </p>
              ) : null}
              <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Fator R: {formatarPercentual(simples.fatorR)}{' '}
                {simples.fatorR >= FATOR_R_LIMITE ? '(≥ 28% — Anexo III)' : '(< 28% — Anexo V)'}
              </p>
            </div>

            {/* Lucro Presumido */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 ${
                veredito.melhor === 'Lucro Presumido'
                  ? 'border-emerald-400 bg-emerald-50/70 ring-2 ring-emerald-400/30'
                  : 'border-stone-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-[#082852]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
                  Lucro PRESUMIDO
                </span>
                {veredito.melhor === 'Lucro Presumido' ? (
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                ) : null}
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                IRPJ + CSLL + PIS + Cofins + ISS
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-[#082852] tabular-nums mt-1">
                {formatarBRL(presumido.totalTributos)}
              </p>
              <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                Alíquota efetiva: {formatarPercentual(presumido.aliquotaEfetiva)} da receita bruta
              </p>
            </div>

            {/* Lucro Real */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 ${
                veredito.melhor === 'Lucro Real'
                  ? 'border-emerald-400 bg-emerald-50/70 ring-2 ring-emerald-400/30'
                  : 'border-stone-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="w-4 h-4 text-[#082852]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#082852]">
                  Lucro REAL
                </span>
                {veredito.melhor === 'Lucro Real' ? (
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                ) : null}
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                IRPJ + CSLL + PIS/Cofins líq. + ISS
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-[#082852] tabular-nums mt-1">
                {formatarBRL(real.totalTributos)}
              </p>
              <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                {real.tevePrejuizo
                  ? 'Prejuízo no mês: IRPJ e CSLL zerados'
                  : `Alíquota efetiva: ${formatarPercentual(real.aliquotaEfetiva)} da receita bruta`}
              </p>
            </div>
          </div>

          {/* Veredito entre os TRÊS regimes */}
          <div
            className={`rounded-2xl border p-5 ${
              veredito.melhor === 'Simples Nacional'
                ? 'border-emerald-300 bg-emerald-50/70'
                : 'border-amber-300 bg-amber-50/70'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {veredito.melhor === 'Simples Nacional' ? (
                <TrendingDown className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-amber-600" />
              )}
              <span
                className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                  veredito.melhor === 'Simples Nacional' ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                MENOR IMPOSTO NESTE MÊS: {veredito.melhor.toUpperCase()}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {veredito.melhor} paga{' '}
              <strong className="tabular-nums">{formatarBRL(veredito.melhorTotal)}</strong> contra{' '}
              {formatarBRL(veredito.piorTotal)} do {veredito.pior} — diferença de{' '}
              <strong className="tabular-nums">{formatarBRL(veredito.diferencaTotal)}</strong> (
              {formatarPercentual(veredito.diferencaPct)} acima do menor imposto). Ranking:{' '}
              {veredito.ordenados.map((c, i) => (
                <span key={c.regime}>
                  {i > 0 ? ' · ' : ''}
                  <strong className="tabular-nums">{i + 1}º</strong> {c.regime} (
                  {formatarBRL(c.total)}
                  {c.diferenca > 0
                    ? ` · +${formatarBRL(c.diferenca)} / +${formatarPercentual(c.diferencaPct)}`
                    : ''}
                  )
                </span>
              ))}
              .
            </p>
            <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
              <strong className="text-[#082852]">Quando cada regime tende a ganhar:</strong> o{' '}
              <strong>Simples Nacional</strong> favorece margens altas com poucos custos
              creditáveis; o <strong>Lucro Presumido</strong> favorece margens reais acima da
              presunção legal (8%/32%); o <strong>Lucro Real</strong> favorece margens apertadas,
              muitas despesas geradoras de crédito (ou prejuízo no mês) — mas exige contabilidade
              plena.
            </p>
          </div>

          {/* Memórias de cálculo */}
          <div className={cardPapel}>
            <ListaMemoria linhas={memoriaSimples} titulo="Memória de cálculo — Simples Nacional" />
          </div>
          <div className={cardPapel}>
            <ListaMemoria linhas={memoriaPresumido} titulo="Memória de cálculo — Lucro Presumido" />
            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
              PIS {formatarPercentual(PCT_PIS_CUMULATIVO)} e Cofins{' '}
              {formatarPercentual(PCT_COFINS_CUMULATIVO)} são cumulativos no Presumido — custos e
              folha não reduzem o imposto.
            </p>
          </div>
          <div className={cardPapel}>
            <ListaMemoria linhas={memoriaReal} titulo="Memória de cálculo — Lucro Real" />
          </div>
          <AvisoEducativo />
        </div>
      </div>
    </div>
  )
}

/* Rótulo auxiliar usado na documentação interna dos cards. */
export const ROTULOS_REGIME_COMPARADOS = ROTULO_REGIME
