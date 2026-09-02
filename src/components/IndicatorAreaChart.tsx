import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { HistoryPoint } from '@/types'

interface IndicatorChartProps {
  history?: HistoryPoint[]
  unit: string
  color?: string
  height?: number
  name?: string
}

export default function IndicatorAreaChart({
  history = [],
  unit,
  color = '#16A34A',
  height = 240,
  name,
}: IndicatorChartProps) {
  const [range, setRange] = useState<'30' | '90' | '12m'>('90')

  if (!history || history.length === 0) {
    return (
      <div className="w-full flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded p-6 text-xs text-slate-400">
        Histórico não disponível para o período selecionado
      </div>
    )
  }

  // Filter history based on selected range
  let pointsCount = 30
  if (range === '30') pointsCount = 10
  if (range === '90') pointsCount = 30
  if (range === '12m') pointsCount = 120

  const chartData = history.slice(-pointsCount).map((pt) => {
    let label = pt.date
    if (pt.date && pt.date.includes('-')) {
      const parts = pt.date.split('-')
      if (parts.length === 3) {
        label = `${parts[2]}/${parts[1]}`
      }
    }
    return {
      date: pt.date,
      displayDate: label,
      value: pt.value,
    }
  })

  // Format custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      let formattedFullDate = data.date
      if (data.date && data.date.includes('-')) {
        const [y, m, d] = data.date.split('-')
        formattedFullDate = `${d}/${m}/${y}`
      }
      return (
        <div className="bg-[#082852] text-white p-3 rounded shadow-xl border border-[#16A34A]/50 text-xs font-mono">
          <p className="text-slate-300 mb-1">{formattedFullDate}</p>
          <p className="font-bold text-[#22C55E] text-sm">
            {payload[0].value.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            {unit}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Range Switcher */}
      <div className="flex items-center justify-between">
        {name && <span className="text-xs font-mono font-semibold text-slate-600">{name}</span>}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200 ml-auto">
          <button
            type="button"
            onClick={() => setRange('30')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              range === '30'
                ? 'bg-[#0B3B7A] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-[#0B3B7A]'
            }`}
          >
            30 dias
          </button>
          <button
            type="button"
            onClick={() => setRange('90')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              range === '90'
                ? 'bg-[#0B3B7A] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-[#0B3B7A]'
            }`}
          >
            90 dias
          </button>
          <button
            type="button"
            onClick={() => setRange('12m')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              range === '12m'
                ? 'bg-[#0B3B7A] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-[#0B3B7A]'
            }`}
          >
            12 meses
          </button>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div style={{ width: '100%', height }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="displayDate"
              tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={false}
              minTickGap={20}
            />
            <YAxis
              tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(val) => val.toFixed(1)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#gradient-${color})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
