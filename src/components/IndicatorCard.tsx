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
      className={`group block bg-white rounded-xl p-5 border border-slate-200 card-subtle-shadow card-hover-lift hover:border-[#16A34A] relative transition-all ${className}`}
    >
      {/* Category Eyebrow & Link Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#15803D] uppercase">
          {categoryEyebrow}
        </span>
        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#16A34A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>

      {/* Indicator Name */}
      <h3 className="font-serif text-lg font-bold text-[#082852] mb-2 leading-snug group-hover:text-[#0B3B7A] transition-colors">
        {indicator.name}
      </h3>

      {/* Main Value & Unit */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-mono text-3xl font-extrabold text-[#082852] tracking-tight">
          {indicator.current_value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="text-sm font-semibold text-slate-500 font-mono">{indicator.unit}</span>
      </div>

      {/* Variation & Sparkline Row */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
        {/* Variation Badge */}
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded ${
              isPositive
                ? 'text-[#15803D] bg-emerald-50'
                : isNegative
                  ? 'text-[#DC2626] bg-red-50'
                  : 'text-slate-600 bg-slate-100'
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
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">var.</span>
        </div>

        {/* Sparkline */}
        {showSparkline && indicator.history && indicator.history.length > 2 && (
          <div className="shrink-0">
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
        <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
          {indicator.frequency || 'BCB'}
        </span>
      </div>
    </Link>
  )
}
