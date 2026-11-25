// Blocos CRÉDITOS / DÉBITOS / CUSTOS E DESPESAS compartilhados pelas
// calculadoras do Lucro Real e do Lucro Presumido (Portal Borlim) — tanto na
// calculadora dos 3 regimes (seção Tributação) quanto na do Simples Híbrido.
// Padrão visual e de digitação (pt-BR, com vírgula) dos demais campos.
// 100% no navegador, sem persistência.

import { Info, Package, Percent, Receipt } from 'lucide-react'
import type { BlocoComum, PctPisCofinsRegime } from './creditosDebitosCalc'

export const INPUT_CLS_BLOCOS =
  'w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A]'

export const LABEL_CLS_BLOCOS =
  'block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-600 mb-1.5'

function CampoMoedaB({
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
      <label className={LABEL_CLS_BLOCOS}>{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
          R$
        </span>
        <input
          inputMode="decimal"
          className={`${INPUT_CLS_BLOCOS} pl-9`}
          value={valor}
          placeholder="0,00"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {hint ? <p className="mt-1 text-[10px] text-slate-400 leading-snug">{hint}</p> : null}
    </div>
  )
}

function CampoPercentualB({
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
      <label className={LABEL_CLS_BLOCOS}>{label}</label>
      <div className="relative">
        <input
          inputMode="decimal"
          className={INPUT_CLS_BLOCOS}
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

interface Props {
  blocoComum: BlocoComum
  setBlocoComum: (campo: keyof BlocoComum, v: string) => void
  pctReal: PctPisCofinsRegime
  setPctReal: (campo: keyof PctPisCofinsRegime, v: string) => void
  pctPresumido: PctPisCofinsRegime
  setPctPresumido: (campo: keyof PctPisCofinsRegime, v: string) => void
}

export function BlocosCreditosDebitos({
  blocoComum,
  setBlocoComum,
  pctReal,
  setPctReal,
  pctPresumido,
  setPctPresumido,
}: Props) {
  return (
    <div className="mt-4 pt-4 border-t border-stone-200 space-y-5">
      {/* ------------------------- CRÉDITOS ------------------------- */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-emerald-600" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Créditos — compras de matéria-prima
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CampoMoedaB
            label="Compras de matéria-prima no mês"
            valor={blocoComum.comprasMateriaPrima}
            onChange={(v) => setBlocoComum('comprasMateriaPrima', v)}
            hint="Base dos créditos de PIS, Cofins, ICMS e IPI."
          />
          <div className="grid grid-cols-2 gap-3">
            <CampoPercentualB
              label="PIS s/ compras"
              valor={pctReal.pctPisCompras}
              onChange={(v) => setPctReal('pctPisCompras', v)}
              hint="Lucro Real: 1,65% (não cumulativo)."
            />
            <CampoPercentualB
              label="Cofins s/ compras"
              valor={pctReal.pctCofinsCompras}
              onChange={(v) => setPctReal('pctCofinsCompras', v)}
              hint="Lucro Real: 7,6% (não cumulativo)."
            />
            <CampoPercentualB
              label="ICMS s/ compras"
              valor={blocoComum.pctIcmsCompras}
              onChange={(v) => setBlocoComum('pctIcmsCompras', v)}
              hint="Alíquota interna do estado (ex.: 18%)."
            />
            <CampoPercentualB
              label="IPI s/ compras"
              valor={blocoComum.pctIpiCompras}
              onChange={(v) => setBlocoComum('pctIpiCompras', v)}
              hint="Somente industrialização; comércio puro: 0%."
            />
          </div>
        </div>
        <p className="mt-3 text-[10px] text-slate-500 leading-relaxed flex items-start gap-1.5">
          <Info className="w-3 h-3 shrink-0 mt-0.5" />
          <span>
            No Lucro Presumido (cumulativo) não há crédito de PIS/Cofins — os % acima de compras
            valem para o Lucro Real; ICMS e IPI seguem os % informados.
          </span>
        </p>
      </div>

      {/* -------------------------- DÉBITOS -------------------------- */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Receipt className="w-4 h-4 text-amber-600" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-800">
            Débitos — percentuais sobre as vendas
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <CampoPercentualB
            label="PIS s/ vendas (Real)"
            valor={pctReal.pctPisVendas}
            onChange={(v) => setPctReal('pctPisVendas', v)}
          />
          <CampoPercentualB
            label="Cofins s/ vendas (Real)"
            valor={pctReal.pctCofinsVendas}
            onChange={(v) => setPctReal('pctCofinsVendas', v)}
          />
          <CampoPercentualB
            label="ICMS s/ vendas"
            valor={blocoComum.pctIcmsVendas}
            onChange={(v) => setBlocoComum('pctIcmsVendas', v)}
          />
          <CampoPercentualB
            label="IPI s/ vendas"
            valor={blocoComum.pctIpiVendas}
            onChange={(v) => setBlocoComum('pctIpiVendas', v)}
          />
          <CampoPercentualB
            label="PIS s/ vendas (Presumido)"
            valor={pctPresumido.pctPisVendas}
            onChange={(v) => setPctPresumido('pctPisVendas', v)}
            hint="Cumulativo: 0,65%."
          />
          <CampoPercentualB
            label="Cofins s/ vendas (Presumido)"
            valor={pctPresumido.pctCofinsVendas}
            onChange={(v) => setPctPresumido('pctCofinsVendas', v)}
            hint="Cumulativo: 3%."
          />
        </div>
        <p className="mt-3 text-[10px] text-slate-500 leading-relaxed flex items-start gap-1.5">
          <Info className="w-3 h-3 shrink-0 mt-0.5" />
          <span>
            Débito = receita bruta × % informado; crédito = compras × % informado. O imposto pago é
            a diferença (nunca negativa).
          </span>
        </p>
      </div>

      {/* ---------------------- CUSTOS E DESPESAS ---------------------- */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Percent className="w-4 h-4 text-sky-600" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-800">
            Custos e despesas do mês
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CampoMoedaB
            label="Custo das matérias-primas"
            valor={blocoComum.custoMateriaPrima}
            onChange={(v) => setBlocoComum('custoMateriaPrima', v)}
            hint="Dedutível do lucro no Lucro Real; no Presumido é informativo."
          />
          <CampoMoedaB
            label="Despesas fixas"
            valor={blocoComum.despesasFixas}
            onChange={(v) => setBlocoComum('despesasFixas', v)}
            hint="Administrativas, aluguéis, folha administrativa…"
          />
          <CampoMoedaB
            label="Despesas financeiras"
            valor={blocoComum.despesasFinanceiras}
            onChange={(v) => setBlocoComum('despesasFinanceiras', v)}
            hint="Juros, tarifas bancárias."
          />
          <CampoMoedaB
            label="Outras despesas"
            valor={blocoComum.outrasDespesas}
            onChange={(v) => setBlocoComum('outrasDespesas', v)}
          />
        </div>
        <p className="mt-3 text-[10px] text-slate-500 leading-relaxed flex items-start gap-1.5">
          <Info className="w-3 h-3 shrink-0 mt-0.5" />
          <span>
            No Lucro Real entram na base do IRPJ/CSLL; no Presumido alimentam o lucro efetivo
            estimado (a presunção legal não muda).
          </span>
        </p>
      </div>
    </div>
  )
}
