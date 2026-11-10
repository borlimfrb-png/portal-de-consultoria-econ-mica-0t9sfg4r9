// Calculadoras de Férias e Rescisão — área Trabalhista do Portal Borlim.

import { useMemo, useState } from 'react'
import { Calculator, Calendar, Briefcase, Users, Clock, Plus, Minus } from 'lucide-react'
import {
  calcularFerias,
  memoriaFerias,
  OPCOES_DIAS_FERIAS,
  entradaFeriasInicial,
  faixasInssTabela,
  faixasIrrfTabela,
  type EntradaFerias,
} from './feriasCalc'
import {
  calcularRescisao,
  memoriaRescisao,
  MOTIVOS_RESCISAO,
  entradaRescisaoInicial,
  type EntradaRescisao,
  type MotivoRescisao,
} from './rescisaoCalc'
import { parseCurrency, formatarBRL } from '@/components/calculadora/cbsIbsCalc'
import { ListaMemoriaTrabalhista, AvisoEducativoTrabalhista } from './CalculadoraMemoriaTrabalhista'

const inputClass =
  'w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F7A4D]/40 focus:border-[#1F7A4D] transition'

const labelClass =
  'block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5'

function CampoMoeda({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  icon?: React.ElementType
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
        <input
          type="text"
          inputMode="decimal"
          className={`${inputClass} ${Icon ? 'pl-9' : ''}`}
          value={value}
          placeholder={placeholder ?? '0,00'}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

/* ============================== CALCULADORA DE FÉRIAS ============================== */

export function CalculadoraFerias() {
  const [entrada, setEntrada] = useState<EntradaFerias>(entradaFeriasInicial)
  const resultado = useMemo(() => calcularFerias(entrada), [entrada])
  const memoria = useMemo(() => memoriaFerias(resultado), [resultado])
  const set = (patch: Partial<EntradaFerias>) => setEntrada((prev) => ({ ...prev, ...patch }))

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Formulário */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-2.5">
          <Calculator className="w-5 h-5 text-[#1F7A4D]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
            Dados das férias
          </span>
        </div>

        <CampoMoeda
          label="Salário bruto mensal (R$)"
          value={entrada.salarioBruto}
          onChange={(v) => set({ salarioBruto: v })}
          icon={Briefcase}
        />

        <div>
          <label className={labelClass}>Dias de férias</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {OPCOES_DIAS_FERIAS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => set({ diasFerias: d })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  entrada.diasFerias === d
                    ? 'bg-[#1F7A4D] text-white'
                    : 'bg-[#F0F4F8] text-[#0B1F3A] hover:bg-stone-100'
                }`}
              >
                {d} dias
              </button>
            ))}
          </div>
          <input
            type="number"
            min={1}
            max={30}
            className={inputClass}
            value={entrada.diasFerias}
            onChange={(e) => set({ diasFerias: Number(e.target.value) })}
            placeholder="Digite de 1 a 30"
          />
        </div>

        <div>
          <label className={labelClass}>Dependentes (IRRF)</label>
          <div className="relative">
            <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="number"
              min={0}
              max={20}
              className={`${inputClass} pl-9`}
              value={entrada.dependentes}
              onChange={(e) => set({ dependentes: Number(e.target.value) })}
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#F0F4F8] px-4 py-3">
          <input
            type="checkbox"
            id="abono-pecuniario"
            checked={entrada.abonoPecuniario}
            onChange={(e) => set({ abonoPecuniario: e.target.checked })}
            className="w-4 h-4 accent-[#1F7A4D]"
          />
          <label htmlFor="abono-pecuniario" className="text-xs text-[#0B1F3A] leading-snug">
            <strong>Vender 1/3 das férias</strong> (abono pecuniário, art. 143 CLT) — em 30 dias,
            converte 10 dias em dinheiro
          </label>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <CampoMoeda
            label="Média horas extras"
            value={entrada.mediaHorasExtras}
            onChange={(v) => set({ mediaHorasExtras: v })}
          />
          <CampoMoeda
            label="Média adicional noturno"
            value={entrada.mediaAdicionalNoturno}
            onChange={(v) => set({ mediaAdicionalNoturno: v })}
          />
          <CampoMoeda
            label="Média comissões"
            value={entrada.mediaComissoes}
            onChange={(v) => set({ mediaComissoes: v })}
          />
        </div>
      </div>

      {/* Resultado */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7">
        <ListaMemoriaTrabalhista linhas={memoria} titulo="Memória de cálculo — férias" />
        <div className="mt-6 pt-5 border-t border-stone-200 grid grid-cols-2 gap-4">
          <div>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Bruto das férias
            </span>
            <span className="text-lg font-bold text-[#0B1F3A] tabular-nums">
              {formatarBRL(resultado.brutoTotal)}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#1F7A4D]">
              Líquido a receber
            </span>
            <span className="text-2xl font-extrabold text-[#1F7A4D] tabular-nums">
              {formatarBRL(resultado.liquidoTotal)}
            </span>
          </div>
        </div>
        <details className="mt-5 group">
          <summary className="cursor-pointer font-mono text-[11px] font-bold uppercase tracking-wider text-[#0B1F3A] hover:text-[#1F7A4D] transition">
            Tabelas vigentes (referência)
          </summary>
          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <TabelaFaixas
              titulo="INSS (Port. 6/2025)"
              colunas={['Faixa', 'Alíquota']}
              linhas={faixasInssTabela().map((f) => [f.faixa, f.aliquota])}
            />
            <TabelaFaixas
              titulo="IRRF (Leis 15.191/25 e 15.270/25)"
              colunas={['Faixa', 'Alíq.', 'Parcela']}
              linhas={faixasIrrfTabela().map((f) => [f.faixa, f.aliquota, f.parcela])}
            />
          </div>
        </details>
      </div>
    </div>
  )
}

function TabelaFaixas({
  titulo,
  colunas,
  linhas,
}: {
  titulo: string
  colunas: string[]
  linhas: string[][]
}) {
  return (
    <div>
      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#1F7A4D] mb-1.5">
        {titulo}
      </span>
      <table className="w-full text-[11px] text-slate-600">
        <thead>
          <tr className="border-b border-stone-200">
            {colunas.map((c) => (
              <th key={c} className="text-left font-bold text-[#0B1F3A] py-1 pr-2">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => (
            <tr key={i} className="border-b border-stone-100 last:border-0">
              {l.map((c, j) => (
                <td key={j} className="py-1 pr-2 tabular-nums">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ============================== CALCULADORA DE RESCISÃO ============================== */

export function CalculadoraRescisao() {
  const [entrada, setEntrada] = useState<EntradaRescisao>(entradaRescisaoInicial)
  const resultado = useMemo(() => calcularRescisao(entrada), [entrada])
  const memoria = useMemo(() => memoriaRescisao(resultado), [resultado])
  const set = (patch: Partial<EntradaRescisao>) => setEntrada((prev) => ({ ...prev, ...patch }))

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Formulário */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-2.5">
          <Calculator className="w-5 h-5 text-[#1F7A4D]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
            Dados da rescisão
          </span>
        </div>

        <CampoMoeda
          label="Salário bruto mensal (R$)"
          value={entrada.salarioBruto}
          onChange={(v) => set({ salarioBruto: v })}
          icon={Briefcase}
        />

        <div>
          <label className={labelClass}>Motivo da rescisão</label>
          <select
            className={inputClass}
            value={entrada.motivo}
            onChange={(e) => set({ motivo: e.target.value as MotivoRescisao })}
          >
            {MOTIVOS_RESCISAO.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Dias trabalhados no mês</label>
            <input
              type="number"
              min={0}
              max={30}
              className={inputClass}
              value={entrada.diasTrabalhadosNoMes}
              onChange={(e) => set({ diasTrabalhadosNoMes: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className={labelClass}>Meses trabalhados no ano (13º/férias)</label>
            <input
              type="number"
              min={0}
              max={12}
              className={inputClass}
              value={entrada.mesesTrabalhadosAno}
              onChange={(e) => set({ mesesTrabalhadosAno: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Aviso prévio (dias)</label>
            <input
              type="number"
              min={0}
              max={90}
              className={inputClass}
              value={entrada.diasAvisoPrevio}
              onChange={(e) => set({ diasAvisoPrevio: Number(e.target.value) })}
            />
          </div>
          <div className="flex items-center gap-2 self-end rounded-xl bg-[#F0F4F8] px-3 py-2.5">
            <input
              type="checkbox"
              id="aviso-indenizado"
              checked={entrada.avisoPrevioIndenizado}
              onChange={(e) => set({ avisoPrevioIndenizado: e.target.checked })}
              className="w-4 h-4 accent-[#1F7A4D]"
            />
            <label htmlFor="aviso-indenizado" className="text-xs text-[#0B1F3A]">
              Indenizado (não cumprido)
            </label>
          </div>
        </div>

        <CampoMoeda
          label="Saldo do FGTS (R$)"
          value={entrada.saldoFgts}
          onChange={(v) => set({ saldoFgts: v })}
          icon={Calendar}
        />

        <div className="flex items-center gap-3 rounded-xl bg-[#F0F4F8] px-4 py-3">
          <input
            type="checkbox"
            id="ferias-vencidas"
            checked={entrada.feriasVencidas}
            onChange={(e) => set({ feriasVencidas: e.target.checked })}
            className="w-4 h-4 accent-[#1F7A4D]"
          />
          <label htmlFor="ferias-vencidas" className="text-xs text-[#0B1F3A]">
            Possui <strong>férias vencidas</strong> (período aquisitivo anterior não gozado)
          </label>
        </div>

        <CampoMoeda
          label="Média de horas extras (R$)"
          value={entrada.mediaHorasExtras}
          onChange={(v) => set({ mediaHorasExtras: v })}
          icon={Clock}
        />
      </div>

      {/* Resultado */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7">
        <ListaMemoriaTrabalhista linhas={memoria} titulo="Memória de cálculo — rescisão" />
        <div className="mt-6 pt-5 border-t border-stone-200 grid grid-cols-2 gap-4">
          <div>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Bruto das verbas
            </span>
            <span className="text-lg font-bold text-[#0B1F3A] tabular-nums">
              {formatarBRL(resultado.totalBrutoRecebe)}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#1F7A4D]">
              Líquido da rescisão
            </span>
            <span className="text-2xl font-extrabold text-[#1F7A4D] tabular-nums">
              {formatarBRL(resultado.totalLiquido)}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-600">
          <Plus className="w-3.5 h-3.5 text-[#1F7A4D]" />
          <span>
            Multa do FGTS: {formatarBRL(resultado.multaFgts)} ({resultado.multaFgtsPct}%)
          </span>
          <Minus className="w-3.5 h-3.5 text-amber-700 ml-3" />
          <span>Descontos: {formatarBRL(resultado.totalDescontos)}</span>
        </div>
      </div>
    </div>
  )
}
