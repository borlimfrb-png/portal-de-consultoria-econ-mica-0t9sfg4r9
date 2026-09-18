import pb from '@/lib/pocketbase/client'

export interface StockIndexItem {
  symbol: string
  name: string
  shortName: string
  country: string
  currency: string
  flag: string
  description: string
  currentValue: number
  change: number
  variationPercent: number
  sparkline: number[]
  updatedAt: string
}

export interface StockIndicesResponse {
  success: boolean
  count: number
  updatedAt: string
  indices: StockIndexItem[]
}

// Fallback estático caso a rede falhe completamente
export const FALLBACK_STOCK_INDICES: StockIndexItem[] = [
  {
    symbol: '^BVSP',
    name: 'Ibovespa',
    shortName: 'B3 (Brasil)',
    country: 'Brasil',
    currency: 'BRL',
    flag: '🇧🇷',
    description: 'Principal índice da bolsa brasileira (B3, São Paulo)',
    currentValue: 185992.03,
    change: 444.38,
    variationPercent: 0.24,
    sparkline: [187207, 185501, 186503, 185548, 185992],
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: '^GSPC',
    name: 'S&P 500',
    shortName: 'S&P 500',
    country: 'Estados Unidos',
    currency: 'USD',
    flag: '🇺🇸',
    description: 'As 500 maiores empresas de capital aberto dos EUA',
    currentValue: 7637.76,
    change: 85.95,
    variationPercent: 1.14,
    sparkline: [7656.98, 7619.98, 7585.73, 7551.81, 7637.76],
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: '^DJI',
    name: 'Dow Jones',
    shortName: 'Dow Jones',
    country: 'Estados Unidos',
    currency: 'USD',
    flag: '🇺🇸',
    description: '30 das maiores empresas industriais e comerciais americanas',
    currentValue: 51778.04,
    change: 316.14,
    variationPercent: 0.61,
    sparkline: [51650, 51420, 51580, 51462, 51778],
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: '^IXIC',
    name: 'Nasdaq',
    shortName: 'Nasdaq Composite',
    country: 'Estados Unidos',
    currency: 'USD',
    flag: '🇺🇸',
    description: 'Forte concentração em empresas de tecnologia e biotecnologia',
    currentValue: 26418.3,
    change: 439.88,
    variationPercent: 1.69,
    sparkline: [26100, 25980, 26050, 25978, 26418],
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: '^FTSE',
    name: 'FTSE 100',
    shortName: 'FTSE 100 (Londres)',
    country: 'Reino Unido',
    currency: 'GBP',
    flag: '🇬🇧',
    description: '100 principais empresas da London Stock Exchange',
    currentValue: 10816.14,
    change: 127.67,
    variationPercent: 1.19,
    sparkline: [10680, 10710, 10695, 10720, 10816],
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: '^GDAXI',
    name: 'DAX',
    shortName: 'DAX 40 (Frankfurt)',
    country: 'Alemanha',
    currency: 'EUR',
    flag: '🇩🇪',
    description: 'As 40 maiores empresas industriais da Bolsa de Frankfurt',
    currentValue: 25716.71,
    change: 178.96,
    variationPercent: 0.7,
    sparkline: [25500, 25620, 25580, 25538, 25716],
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: '^N225',
    name: 'Nikkei 225',
    shortName: 'Nikkei 225 (Tóquio)',
    country: 'Japão',
    currency: 'JPY',
    flag: '🇯🇵',
    description: 'Principal índice da Tokyo Stock Exchange',
    currentValue: 65018.95,
    change: 885.2,
    variationPercent: 1.38,
    sparkline: [63800, 64200, 64136, 64500, 65018],
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: '^HSI',
    name: 'Hang Seng',
    shortName: 'Hang Seng (Hong Kong)',
    country: 'Hong Kong',
    currency: 'HKD',
    flag: '🇭🇰',
    description: 'Termômetro do mercado acionário de Hong Kong e da Ásia',
    currentValue: 24604.29,
    change: -109.49,
    variationPercent: -0.44,
    sparkline: [24850, 24780, 24810, 24713, 24604],
    updatedAt: new Date().toISOString(),
  },
]

/**
 * Busca as cotações dos índices das bolsas mundiais via backend hook PocketBase
 */
export async function getStockIndices(): Promise<StockIndexItem[]> {
  try {
    const res = await pb.send<StockIndicesResponse>('/backend/v1/stock-indices', {
      method: 'GET',
    })
    if (res && res.indices && Array.isArray(res.indices) && res.indices.length > 0) {
      return res.indices
    }
    return FALLBACK_STOCK_INDICES
  } catch (err) {
    console.warn('[BORLIM stock-indices] Fallback local ativado:', err)
    return FALLBACK_STOCK_INDICES
  }
}
