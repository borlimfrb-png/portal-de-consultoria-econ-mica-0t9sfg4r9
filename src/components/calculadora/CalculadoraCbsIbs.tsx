// Seção da Calculadora Educativa CBS/IBS — página Reforma Tributária.
// Inspirada na Calculadora de Tributação sobre Consumo da Receita Federal
// (piloto-cbs.tributos.gov.br). Cálculo 100% no navegador, sem persistência.

import { useMemo, useState } from 'react'
import {
  Plus,
  Trash2,
  Copy,
  FileText,
  MapPin,
  CalendarDays,
  Info,
  Calculator,
  AlertTriangle,
  Split,
  GitCompareArrows,
} from 'lucide-react'
import {
  calcularTotalItens,
  calcularSimplesNacional,
  calcularMemoriaRegular,
  calcularMemoriaSimples,
  calcularMemoriaSplit,
  calcularResumoConsolidado,
  formatarBRL,
  formatarPercentual,
  parseCurrency,
  novoItem,
  CALCULADORA_OFICIAL_URL,
  ALIQUOTA_CBS_PADRAO,
  ALIQUOTA_IBS_PADRAO,
} from './cbsIbsCalc'
import type { ItemOperacao } from './cbsIbsCalc'
import { ListaMemoria, AvisoEducativo } from './CalculadoraMemoria'

type Modo = 'regular' | 'simples' | 'comparativo'

const UFS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

const TIPOS_DOC = ['NF-e', 'NFC-e', 'NFS-e', 'CT-e']

function hojeISO(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

function dataBR(iso: string): string {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

const inputCls =
  'w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm font-mono text-[#082852] tabular-nums placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A] transition-colors'
const labelCls =
  'block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5'

export default function CalculadoraCbsIbsSection() {
  const [dataFatoGerador, setDataFatoGerador] = useState(hojeISO())
  const [uf, setUf] = useState('SP')
  const [municipio, setMunicipio] = useState('')
  const [tipoDoc, setTipoDoc] = useState('NF-e')
  const [modo, setModo] = useState<Modo>('regular')
  const [itens, setItens] = useState<ItemOperacao[]>([novoItem()])
  const [rbsn, setRbsn] = useState('100.000,00')
  const [aliquotaSN, setAliquotaSN] = useState('4,5')
  const [cClassTrib, setCClassTrib] = useState('000001')
  const [splitAtivo, setSplitAtivo] = useState(false)

  const atualizarItem = (id: string, campo: keyof ItemOperacao, valor: string | boolean) =>
    setItens((prev) => prev.map((it) => (it.id === id ? { ...it, [campo]: valor } : it)))

  const adicionarItem = () => setItens((prev) => [...prev, novoItem()])
  const removerItem = (id: string) =>
    setItens((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev))
  const duplicarItem = (id: string) =>
    setItens((prev) => {
      const idx = prev.findIndex((it) => it.id === id)
      if (idx < 0) return prev
      const copia = { ...prev[idx], id: `${prev[idx].id}-c${Date.now()}` }
      const novo = [...prev]
      novo.splice(idx + 1, 0, copia)
      return novo
    })

  const resultadosItens = useMemo(() => calcularTotalItens(itens), [itens])
  const resumo = useMemo(() => calcularResumoConsolidado(itens), [itens])
  const simples = useMemo(
    () => calcularSimplesNacional(parseCurrency(rbsn), parseCurrency(aliquotaSN)),
    [rbsn, aliquotaSN],
  )
  const memRegular = useMemo(
    () => calcularMemoriaRegular(resultadosItens, resumo),
    [resultadosItens, resumo],
  )
  const memSimples = useMemo(
    () =>
      calcularMemoriaSimples(parseCurrency(rbsn), parseCurrency(aliquotaSN), simples, cClassTrib),
    [rbsn, aliquotaSN, simples, cClassTrib],
  )
  const memSplit = useMemo(() => calcularMemoriaSplit(resumo), [resumo])
  const liquidoFornecedor = resumo.totalNota - resumo.totalTributos

  const resumoRegular = (
    <div className="p-5 sm:p-6 space-y-5">
      <ListaMemoria linhas={memRegular} titulo="Memória de cálculo — passo a passo" />
      <div className="bg-[#082852] rounded-xl p-4 sm:p-5 text-white">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#22C55E] block mb-3">
          Resultado Total
        </span>
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Base IBS/CBS', formatarBRL(resumo.totalBase), 'text-white'],
            ['CBS', formatarBRL(resumo.totalCBS), 'text-sky-300'],
            ['IBS', formatarBRL(resumo.totalIBS), 'text-violet-300'],
            ['IS', formatarBRL(resumo.totalIS), 'text-amber-300'],
          ].map(([rotulo, valor, cor]) => (
            <div key={rotulo} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                {rotulo}
              </span>
              <span className={`text-sm font-bold tabular-nums font-mono ${cor}`}>{valor}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-[#16A34A] rounded-lg p-3 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-100">
            Total de tributos
          </span>
          <span className="text-lg font-extrabold tabular-nums font-mono">
            {formatarBRL(resumo.totalTributos)}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs font-mono tabular-nums">
          <div className="flex justify-between bg-white/5 rounded-lg p-2.5 border border-white/10">
            <span className="text-slate-400">Alíquota efetiva:</span>
            <span className="font-bold text-[#22C55E]">
              {formatarPercentual(resumo.aliquotaEfetiva)}
            </span>
          </div>
          <div className="flex justify-between bg-white/5 rounded-lg p-2.5 border border-white/10">
            <span className="text-slate-400">Bruto da nota:</span>
            <span className="font-bold">{formatarBRL(resumo.totalNota)}</span>
          </div>
        </div>
      </div>
    </div>
  )

  const formSimples = (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label className={labelCls}>RBSN (receita bruta)</label>
        <input
          type="text"
          inputMode="decimal"
          value={rbsn}
          onChange={(e) => setRbsn(e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Alíquota efetiva DAS (%)</label>
        <input
          type="text"
          inputMode="decimal"
          value={aliquotaSN}
          onChange={(e) => setAliquotaSN(e.target.value)}
          placeholder="Ex.: 4,5"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>cClassTrib (educativo)</label>
        <input
          type="text"
          value={cClassTrib}
          onChange={(e) => setCClassTrib(e.target.value)}
          className={inputCls}
        />
      </div>
    </div>
  )

  return (
    <section
      id="calculadora-cbs-ibs"
      className="bg-[#F0F4F8] py-16 sm:py-24 border-b border-stone-200 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-[#15803D]">
            <Calculator className="w-3.5 h-3.5 text-[#16A34A]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">
              Calculadora Educativa CBS/IBS — Inspirada na Receita Federal
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#082852] leading-tight">
            Calculadora de Tributação sobre o Consumo
          </h2>
          <p className="font-serif text-base sm:text-xl text-slate-700 mt-3 leading-relaxed">
            Simule a CBS e o IBS na prática — Regime Regular, Simples Nacional, comparação lado a
            lado e Split Payment — com{' '}
            <strong className="text-[#082852]">memória de cálculo</strong> passo a passo.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans max-w-2xl mx-auto">
            Versão educativa e simplificada da Calculadora de Consumo do piloto CBS/IBS da Receita
            Federal. Cálculo 100% no navegador: <strong>nada é gravado ou enviado</strong>.
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. DADOS DA OPERAÇÃO */}
          <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#082852]">Dados da Operação</h3>
                <p className="text-xs text-slate-500">
                  Contexto do documento fiscal simulado (apenas informativo/educativo).
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Data do fato gerador</label>
                <div className="relative">
                  <CalendarDays className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={dataFatoGerador}
                    onChange={(e) => setDataFatoGerador(e.target.value)}
                    className={`${inputCls} pl-9`}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  Formato oficial: {dataBR(dataFatoGerador)}
                </p>
              </div>
              <div>
                <label className={labelCls}>Local da operação (UF)</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                    className={`${inputCls} pl-9 appearance-none`}
                  >
                    {UFS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  27 UFs — destino do consumo
                </p>
              </div>
              <div>
                <label className={labelCls}>Município (opcional)</label>
                <input
                  type="text"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  placeholder="Ex.: São Paulo"
                  className={inputCls}
                />
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  Texto livre — IBS municipal
                </p>
              </div>
              <div>
                <label className={labelCls}>Tipo de documento fiscal</label>
                <select
                  value={tipoDoc}
                  onChange={(e) => setTipoDoc(e.target.value)}
                  className={inputCls}
                >
                  {TIPOS_DOC.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  Apenas informativo/educativo
                </p>
              </div>
            </div>
          </section>

          {/* 2. REGIME TRIBUTÁRIO */}
          <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#082852]">Regime Tributário</h3>
                <p className="text-xs text-slate-500">
                  Regime Regular, Simples Nacional — ou os dois lado a lado.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {(['regular', 'simples'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModo(m)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    modo === m || (m === 'regular' && modo === 'comparativo')
                      ? 'border-[#16A34A] bg-emerald-50 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold uppercase tracking-wider text-[#082852]">
                      {m === 'regular' ? 'Regime Regular' : 'Simples Nacional'}
                    </span>
                    {((m === 'regular' && modo !== 'simples') ||
                      (m === 'simples' && modo === 'simples')) && (
                      <span className="w-3 h-3 rounded-full bg-[#16A34A]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {m === 'regular'
                      ? 'Apuração por fora com base IBS/CBS = (vProd + vFrete + vSeg + vOutro) − (vDesc + vIS).'
                      : 'Cálculo sobre a RBSN com a alíquota efetiva da sua faixa do DAS.'}
                  </p>
                </button>
              ))}
            </div>
            <label className="flex items-start gap-3 p-4 rounded-xl bg-[#F0F4F8]/60 border border-stone-200 cursor-pointer hover:bg-[#F0F4F8] transition-colors">
              <input
                type="checkbox"
                checked={modo === 'comparativo'}
                onChange={(e) => setModo(e.target.checked ? 'comparativo' : 'regular')}
                className="w-4 h-4 accent-[#16A34A] cursor-pointer mt-0.5 shrink-0"
              />
              <div>
                <span className="text-sm font-bold text-[#082852] flex items-center gap-1.5">
                  <GitCompareArrows className="w-4 h-4 text-[#16A34A]" />
                  Comparar com outro regime
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  A mesma operação calculada nos dois regimes, com resultados lado a lado (como na
                  calculadora oficial da Receita).
                </p>
              </div>
            </label>
          </section>

          {/* 3. ITENS DA OPERAÇÃO */}
          <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#082852]">
                    Itens da Operação ({itens.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Base de cálculo detalhada por item, como nos campos da NF-e.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={adicionarItem}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" />
                Incluir item
              </button>
            </div>

            <div className="space-y-5">
              {itens.map((item, idx) => {
                const calc = resultadosItens[idx]
                const soma = calc.vProd + calc.vFrete + calc.vSeg + calc.vOutro
                return (
                  <div
                    key={item.id}
                    className="border border-stone-200 rounded-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-[#082852]">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#22C55E] truncate">
                        Item {idx + 1}
                        {item.descricao ? ` — ${item.descricao}` : ''}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => duplicarItem(item.id)}
                          title="Duplicar item"
                          className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removerItem(item.id)}
                          disabled={itens.length <= 1}
                          title={itens.length <= 1 ? 'Mantenha ao menos 1 item' : 'Remover item'}
                          className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-4 bg-[#FCFDFE]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                          <label className={labelCls}>Descrição do item</label>
                          <input
                            type="text"
                            value={item.descricao}
                            onChange={(e) => atualizarItem(item.id, 'descricao', e.target.value)}
                            placeholder="Ex.: Venda de mercadorias"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>NCM (opcional)</label>
                          <input
                            type="text"
                            value={item.ncm}
                            onChange={(e) => atualizarItem(item.id, 'ncm', e.target.value)}
                            placeholder="Ex.: 10063011 (arroz)"
                            className={inputCls}
                          />
                          <p className="text-[10px] text-slate-500 font-mono mt-1">
                            Ex. oficiais: 09024000 (chá), 87032100 (veículo)
                          </p>
                        </div>
                        <div>
                          <label className={labelCls}>Imposto Seletivo (vIS)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.usoIS}
                              onChange={(e) => atualizarItem(item.id, 'usoIS', e.target.checked)}
                              className="w-4 h-4 accent-[#16A34A] cursor-pointer shrink-0"
                              title="Aplicar Imposto Seletivo neste item"
                            />
                            <input
                              type="text"
                              inputMode="decimal"
                              value={item.vIS}
                              onChange={(e) => atualizarItem(item.id, 'vIS', e.target.value)}
                              disabled={!item.usoIS}
                              placeholder="R$ 0,00"
                              className={`${inputCls} disabled:bg-stone-100 disabled:text-slate-400`}
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono mt-1">
                            Opcional — reduz a base IBS/CBS
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] block mb-2">
                          Base de cálculo detalhada (componentes da NF)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                          {(
                            [
                              ['vProd', 'vProd (produto)'],
                              ['vFrete', 'vFrete (frete)'],
                              ['vSeg', 'vSeg (seguro)'],
                              ['vOutro', 'vOutro (outras despesas)'],
                              ['vDesc', 'vDesc (descontos)'],
                            ] as [keyof ItemOperacao, string][]
                          ).map(([campo, label]) => (
                            <div key={campo}>
                              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                {label}
                              </label>
                              <input
                                type="text"
                                inputMode="decimal"
                                value={item[campo] as string}
                                onChange={(e) => atualizarItem(item.id, campo, e.target.value)}
                                placeholder="R$ 0,00"
                                className={inputCls}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Alíquota CBS (%) — referência 8,80%</label>
                          <input
                            type="text"
                            inputMode="decimal"
                            value={item.pctCBS}
                            onChange={(e) => atualizarItem(item.id, 'pctCBS', e.target.value)}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Alíquota IBS (%) — referência 17,70%</label>
                          <input
                            type="text"
                            inputMode="decimal"
                            value={item.pctIBS}
                            onChange={(e) => atualizarItem(item.id, 'pctIBS', e.target.value)}
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#F0F4F8] rounded-xl border border-stone-300 font-mono text-xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] block mb-1.5">
                            Bases de cálculo apuradas (fórmula oficial)
                          </span>
                          <div className="text-[#082852] font-bold leading-relaxed">
                            Base IBS/CBS = (vProd + vFrete + vSeg + vOutro) − (vDesc + vIS)
                          </div>
                          <div className="text-slate-600 mt-1.5 leading-relaxed tabular-nums">
                            = ({formatarBRL(calc.vProd)} + {formatarBRL(calc.vFrete)} +{' '}
                            {formatarBRL(calc.vSeg)} + {formatarBRL(calc.vOutro)}) − (
                            {formatarBRL(calc.vDesc)} + {formatarBRL(calc.vIS)}) ={' '}
                            <strong className="text-[#082852]">{formatarBRL(calc.base)}</strong>
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-stone-200 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs tabular-nums content-start">
                          <span className="text-slate-500">Base IBS/CBS:</span>
                          <span className="text-right font-bold text-[#082852]">
                            {formatarBRL(calc.base)}
                          </span>
                          <span className="text-slate-500">
                            CBS ({formatarPercentual(calc.pctCBS)}):
                          </span>
                          <span className="text-right font-bold text-blue-900">
                            {formatarBRL(calc.cbs)}
                          </span>
                          <span className="text-slate-500">
                            IBS ({formatarPercentual(calc.pctIBS)}):
                          </span>
                          <span className="text-right font-bold text-purple-900">
                            {formatarBRL(calc.ibs)}
                          </span>
                          <span className="text-slate-500">IS:</span>
                          <span className="text-right font-bold text-amber-700">
                            {formatarBRL(calc.is)}
                          </span>
                          <span className="text-slate-500 border-t border-stone-200 pt-1.5">
                            Total de tributos:
                          </span>
                          <span className="text-right font-extrabold text-[#082852] border-t border-stone-200 pt-1.5">
                            {formatarBRL(calc.total)}
                          </span>
                          <span className="text-slate-500">Alíquota efetiva:</span>
                          <span className="text-right font-bold text-[#15803D]">
                            {calc.base > 0
                              ? formatarPercentual((calc.total / calc.base) * 100)
                              : '—'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Alíquotas de referência:</strong> CBS{' '}
                {ALIQUOTA_CBS_PADRAO.replace('.', ',')}% e IBS{' '}
                {ALIQUOTA_IBS_PADRAO.replace('.', ',')}% (total ~26,5%) são estimativas de
                neutralidade do Ministério da Fazenda, ainda em regulamentação. Os campos são
                editáveis para simular alíquotas setoriais ou de teste (2026: CBS 0,9% e IBS 0,1%).
              </span>
            </div>
          </section>

          {/* 4. RESULTADOS */}
          <div className="space-y-6">
            {modo === 'comparativo' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border-2 border-[#16A34A] shadow-lg overflow-hidden flex flex-col">
                  <div className="px-5 py-3.5 bg-[#082852]">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                      Regime Regular
                    </span>
                  </div>
                  {resumoRegular}
                </div>
                <div className="bg-white rounded-2xl border-2 border-[#16A34A] shadow-lg overflow-hidden flex flex-col">
                  <div className="px-5 py-3.5 bg-[#082852]">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                      Simples Nacional
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 space-y-5 flex-1">
                    {formSimples}
                    <ListaMemoria
                      linhas={memSimples}
                      titulo="Memória de cálculo — Simples Nacional"
                    />
                  </div>
                </div>
              </div>
            )}

            {modo === 'simples' && (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-lg overflow-hidden">
                <div className="px-5 py-3.5 bg-[#082852]">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                    Resultado — Simples Nacional (LC 214/25)
                  </span>
                </div>
                <div className="p-5 sm:p-6 space-y-5">
                  {formSimples}
                  <ListaMemoria
                    linhas={memSimples}
                    titulo="Memória de cálculo — Simples Nacional"
                  />
                </div>
              </div>
            )}

            {modo === 'regular' && (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-lg overflow-hidden">
                <div className="px-5 py-3.5 bg-[#082852] flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                    Resultado — Regime Regular
                  </span>
                  <span className="text-[10px] font-mono text-slate-300">
                    {tipoDoc} • {dataBR(dataFatoGerador)} • {uf}
                    {municipio ? ` — ${municipio}` : ''}
                  </span>
                </div>
                {resumoRegular}
              </div>
            )}

            {modo !== 'simples' && (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={splitAtivo}
                    onChange={(e) => setSplitAtivo(e.target.checked)}
                    className="w-4 h-4 accent-[#16A34A] cursor-pointer mt-1 shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Split className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-sm font-bold text-[#082852]">
                        Simular Split Payment (retenção na fonte)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Mostra quanto o adquirente retém na liquidação financeira e o valor líquido
                      que o fornecedor recebe.
                    </p>
                  </div>
                </label>
                {splitAtivo && (
                  <div className="mt-4 pt-4 border-t border-stone-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-[#F0F4F8] rounded-xl p-3.5 border border-stone-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                          Valor bruto da nota
                        </span>
                        <span className="text-base font-bold tabular-nums font-mono text-[#082852]">
                          {formatarBRL(resumo.totalNota)}
                        </span>
                      </div>
                      <div className="bg-red-50 rounded-xl p-3.5 border border-red-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-red-700 block mb-1">
                          (−) Retido na fonte (CBS+IBS+IS)
                        </span>
                        <span className="text-base font-bold tabular-nums font-mono text-red-700">
                          {formatarBRL(resumo.totalTributos)}
                        </span>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 block mb-1">
                          = Líquido do fornecedor
                        </span>
                        <span className="text-base font-bold tabular-nums font-mono text-emerald-700">
                          {formatarBRL(liquidoFornecedor)}
                        </span>
                      </div>
                    </div>
                    <ListaMemoria linhas={memSplit} titulo="Split Payment — memória de cálculo" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 5. NOTA OFICIAL + AVISO EDUCATIVO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <a
              href={CALCULADORA_OFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-br from-[#082852] to-[#0B3B7A] text-white rounded-2xl p-6 sm:p-7 border border-[#0B3B7A] shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-[#22C55E]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                  Referência legal
                </span>
              </div>
              <h4 className="font-serif text-xl font-bold leading-snug mb-2">
                Calculadora oficial da Receita Federal
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Esta versão do portal Borlim é{' '}
                <strong className="text-white">educativa e simplificada</strong>. A calculadora
                oficial do piloto CBS/IBS é a referência legal para valores exatos — consulte-a
                antes de decisões reais de precificação.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#22C55E] group-hover:translate-x-1 transition-transform">
                <span>Abrir calculadora oficial (piloto-cbs.tributos.gov.br)</span>
                <Info className="w-3.5 h-3.5" />
              </span>
            </a>
            <AvisoEducativo />
          </div>
        </div>
      </div>
    </section>
  )
}
