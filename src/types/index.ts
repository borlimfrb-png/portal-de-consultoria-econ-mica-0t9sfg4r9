import type { RecordModel } from 'pocketbase'

export type IndicatorCategory = 'juros' | 'inflacao' | 'cambio' | 'atividade'

export interface HistoryPoint {
  date: string
  value: number
}

export interface EconomicIndicator extends RecordModel {
  code: string
  name: string
  short_name: string
  category: IndicatorCategory
  current_value: number
  previous_value?: number
  variation?: number
  unit: string
  frequency?: string
  reference_date: string
  source: string
  source_code?: string
  description?: string
  history?: HistoryPoint[]
  display_order?: number
  is_featured?: boolean
}

export type NewsCategory = 'reforma_tributaria' | 'economia' | 'mercados' | 'politica_fiscal'

export interface NewsArticle extends RecordModel {
  title: string
  slug: string
  summary: string
  category: NewsCategory
  source: string
  source_url?: string
  image_url?: string
  read_time_minutes?: number
  published_at: string
  is_featured?: boolean
  ai_analysis?: string
}

export interface NewsletterSubscriber extends RecordModel {
  email: string
  name?: string
}
