import pb from '@/lib/pocketbase/client'
import { EconomicIndicator, IndicatorCategory } from '@/types'

export async function getEconomicIndicators(): Promise<EconomicIndicator[]> {
  try {
    const records = await pb.collection('economic_indicators').getFullList<EconomicIndicator>({
      sort: 'display_order',
      requestKey: null,
    })
    return records
  } catch (error) {
    console.error('Erro ao buscar indicadores econômicos:', error)
    return []
  }
}

export async function getIndicatorsByCategory(
  category: IndicatorCategory,
): Promise<EconomicIndicator[]> {
  try {
    const records = await pb.collection('economic_indicators').getFullList<EconomicIndicator>({
      filter: `category = "${category}"`,
      sort: 'display_order',
      requestKey: null,
    })
    return records
  } catch (error) {
    console.error(`Erro ao buscar indicadores para a categoria ${category}:`, error)
    return []
  }
}

export async function getIndicatorByCode(code: string): Promise<EconomicIndicator | null> {
  try {
    const record = await pb
      .collection('economic_indicators')
      .getFirstListItem<EconomicIndicator>(`code = "${code}"`, { requestKey: null })
    return record
  } catch (error) {
    console.error(`Erro ao buscar indicador pelo código ${code}:`, error)
    return null
  }
}

export async function syncIndicatorsNow(): Promise<boolean> {
  try {
    await pb.send('/backend/v1/sync/indicators', { method: 'POST' })
    return true
  } catch (error) {
    console.error('Erro ao acionar sincronização manual de indicadores:', error)
    return false
  }
}
