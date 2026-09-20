import { Link } from 'react-router-dom'
import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { EconomicIndicator } from '@/types'
import Sparkline from './Sparkline'

interface IndicatorCardProps {
  indicator: EconomicIndicator
  showSparkline?: boolean
  className?: string
}

export default function IndicatorCard({
  indicator,
  showSparkline = true,
  className = '',
}: IndicatorCardProps) {
  const variation = indicator.variation ?? 0
  const isPositive = variation > 0
  const isNegative = variation < 0
  const isNeutral = variation === 0

  const categoryLabels: Record<string, string> = {
    juros: 'Juros & Benchmark',
    inflacao: 'Índice de Preços',
    cambio: 'Câmbio Oficial',
    atividade: 'Atividade Econômica',
  }

  const categoryEyebrow = categoryLabels[indicator.category] || indicator.category

  // Formatter for date
  let formattedDate = indicator.reference_date
  if (indicator.reference_date && indicator.reference_date.includes('-')) {
    const [y, m, d] = indicator.reference_date.split('-')
    formattedDate = `${d}/${m}/${y}`
  }

  return (
    <Link
      to="/indicadores"
      className={`group block bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 card-subtle-shadow card-hover-lift hover:border-[#16A34A] relative transition-all overflow-hidden ${className}`}
    >
      {/* Subtle modern top hairline indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Category Eyebrow & Link Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest text-[#15803D] uppercase bg-emerald-50/80 border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
          {categoryEyebrow}
        </span>
        <div className="w-7 h-7 rounded-lg bg-stone-100 group-hover:bg-[#082852] flex items-center justify-center transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#22C55E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>

      {/* Indicator Name */}
      <h3 className="font-serif text-lg font-bold text-[#082852] mb-3 leading-snug group-hover:text-[#0B3B7A] transition-colors">
        {indicator.name}
      </h3>

      {/* Main Value & Unit Terminal Box */}
      <div className="p-3 bg-[#F0F4F8]/80 rounded-xl border border-stone-200/70 mb-3 group-hover:bg-[#F0F4F8] transition-colors">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-3xl font-extrabold text-[#082852] tracking-tight tabular-nums">
            {indicator.unit === 'R$'
              ? indicator.current_value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              : indicator.current_value.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </span>
          {indicator.unit !== 'R$' && (
            <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">
              {indicator.unit}
            </span>
          )}
        </div>
      </div>

      {/* Variation & Sparkline Row */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
        {/* Variation Badge */}
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded border ${
              isPositive
                ? 'text-[#15803D] bg-emerald-50 border-emerald-200/80'
                : isNegative
                  ? 'text-[#DC2626] bg-red-50 border-red-200/80'
                  : 'text-slate-600 bg-slate-100 border-slate-200'
            }`}
          >
            {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
            {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
            {isNeutral && <Minus className="w-3.5 h-3.5" />}
            <span>
              {isPositive ? '+' : ''}
              {variation.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
            var.
          </span>
        </div>

        {/* Sparkline */}
        {showSparkline && indicator.history && indicator.history.length > 2 && (
          <div className="shrink-0 p-1 rounded bg-stone-50/70 border border-stone-100">
            <Sparkline
              data={indicator.history}
              width={90}
              height={26}
              color={isPositive ? '#16A34A' : isNegative ? '#DC2626' : '#0B3B7A'}
            />
          </div>
        )}
      </div>

      {/* Caption footer */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>Ref: {formattedDate}</span>
        <span className="text-[10px] text-slate-500 font-semibold truncate max-w-[140px]">
          {indicator.frequency || 'BCB/SGS'}
        </span>
      </div>
    </Link>
  )
}
