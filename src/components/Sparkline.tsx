import React from 'react'

interface SparklineProps {
  data: { date: string; value: number }[] | number[]
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
  className?: string
}

export default function Sparkline({
  data,
  width = 120,
  height = 36,
  color,
  strokeWidth = 2,
  className = '',
}: SparklineProps) {
  if (!data || data.length < 2) {
    return <div className={`w-[${width}px] h-[${height}px] bg-slate-100 rounded`} />
  }

  const values: number[] =
    typeof data[0] === 'number'
      ? (data as number[])
      : (data as { date: string; value: number }[]).map((d) => d.value)

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const padding = 4
  const usableHeight = height - padding * 2
  const usableWidth = width - padding * 2

  const points = values.map((val, index) => {
    const x = padding + (index / (values.length - 1)) * usableWidth
    const y = height - padding - ((val - min) / range) * usableHeight
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const pathD = `M ${points.join(' L ')}`

  // Default stroke color according to trend if not provided
  const isUp = values[values.length - 1] >= values[0]
  const strokeColor = color || (isUp ? '#16A34A' : '#DC2626')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible ${className}`}
    >
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 400,
          strokeDashoffset: 0,
          animation: 'drawLine 1.2s ease-out forwards',
        }}
      />
      {/* End point dot */}
      {points.length > 0 && (
        <circle
          cx={parseFloat(points[points.length - 1].split(',')[0])}
          cy={parseFloat(points[points.length - 1].split(',')[1])}
          r="3"
          fill={strokeColor}
        />
      )}
    </svg>
  )
}
