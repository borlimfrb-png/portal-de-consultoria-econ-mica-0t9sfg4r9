import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EconomicIndicator } from '@/types'
import { getEconomicIndicators } from '@/services/indicators'
import { useRealtime } from '@/hooks/use-realtime'

export default function TopTicker() {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([])

  const loadIndicators = async () => {
    const data = await getEconomicIndicators()
    if (data.length > 0) {
      setIndicators(data)
    }
  }

  useEffect(() => {
    loadIndicators()
  }, [])

  // Subscribe to real-time changes
  useRealtime<EconomicIndicator>('economic_indicators', () => {
    loadIndicators()
  })

  // Duplicate items to ensure seamless loop
  const tickerItems =
    indicators.length > 0
      ? indicators
      : ([
          { id: '1', short_name: 'Selic', current_value: 13.25, unit: '% a.a.', variation: 1.0 },
          { id: '2', short_name: 'CDI', current_value: 13.15, unit: '% a.a.', variation: 1.0 },
          { id: '3', short_name: 'IPCA 12m', current_value: 4.56, unit: '%', variation: -0.27 },
          { id: '4', short_name: 'IGP-M', current_value: 6.22, unit: '%', variation: 0.27 },
          { id: '5', short_name: 'Dólar', current_value: 5.76, unit: 'R$', variation: -0.06 },
          { id: '6', short_name: 'Euro', current_value: 6.03, unit: 'R$', variation: -0.05 },
          { id: '7', short_name: 'Desemprego', current_value: 6.2, unit: '%', variation: -0.2 },
        ] as EconomicIndicator[])

  const displayList = [...tickerItems, ...tickerItems]

  return (
    <div className="w-full bg-[#0B1F3A] text-slate-200 border-b border-[#1A365D] overflow-hidden py-2 select-none relative z-50 text-xs font-mono">
      <div className="flex items-center">
        {/* Market status badge fixed on the left */}
        <div className="hidden md:flex items-center gap-2 pl-4 pr-3 border-r border-slate-700/60 bg-[#0B1F3A] shrink-0 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
            Mercados
          </span>
        </div>

        {/* Scrolling tape */}
        <div className="overflow-hidden whitespace-nowrap flex-1 flex">
          <div className="animate-marquee flex items-center">
            {displayList.map((item, index) => {
              const variation = item.variation ?? 0
              const isPositive = variation > 0
              const isZero = variation === 0

              return (
                <Link
                  key={`${item.id}-${index}`}
                  to="/indicadores"
                  className="inline-flex items-center gap-2 px-4 hover:text-[#D4A853] transition-colors"
                >
                  <span className="font-semibold text-slate-100 uppercase tracking-wider">
                    {item.short_name}
                  </span>
                  <span className="text-slate-300 tabular-nums font-bold">
                    {item.current_value.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    {item.unit}
                  </span>

                  {!isZero && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1 py-0.2 rounded ${
                        isPositive
                          ? 'text-[#1F7A4D] bg-[#1F7A4D]/15'
                          : 'text-[#C0392B] bg-[#C0392B]/15'
                      }`}
                    >
                      {isPositive ? '▲ +' : '▼ '}
                      {Math.abs(variation).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  )}

                  <span className="text-[#B8892F] opacity-70 ml-2">◆</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
