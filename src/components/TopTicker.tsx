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
    <div className="w-full bg-[#082852]/95 backdrop-blur-md text-slate-200 border-b border-[#0B3B7A]/80 overflow-hidden py-2 select-none relative z-50 text-xs font-mono shadow-xs">
      <div className="flex items-center">
        {/* Market status badge fixed on the left */}
        <div className="hidden md:flex items-center gap-2 pl-4 pr-3.5 border-r border-[#0B3B7A] bg-[#082852]/90 backdrop-blur-sm shrink-0 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E] shadow-[0_0_8px_#22C55E]"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-slate-300 font-bold">
            MERCADOS AO VIVO
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-[#22C55E] border border-emerald-500/30 font-semibold">
            BCB / SGS
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
                  className="inline-flex items-center gap-2 px-4 hover:text-[#22C55E] transition-colors"
                >
                  <span className="font-bold text-white uppercase tracking-wider text-[11px] group-hover:text-[#22C55E]">
                    {item.short_name}
                  </span>
                  <span className="text-slate-100 tabular-nums font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">
                    {item.unit === 'R$'
                      ? item.current_value.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      : `${item.current_value.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} ${item.unit}`}
                  </span>

                  {!isZero && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        isPositive
                          ? 'text-[#22C55E] bg-emerald-950/50 border-emerald-500/30'
                          : 'text-red-400 bg-red-950/50 border-red-500/30'
                      }`}
                    >
                      {isPositive ? '▲ +' : '▼ '}
                      {Math.abs(variation).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  )}

                  <span className="text-[#16A34A] opacity-60 ml-2 text-[10px]">◆</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
