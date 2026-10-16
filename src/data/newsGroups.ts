import { NewsArticle } from '@/types'

export type NewsGroupId =
  | 'economia-brasileira'
  | 'economia-mundial'
  | 'reforma-tributaria'
  | 'dolar-euro'
  | 'inflacao-brasileira'
  | 'pib-brasileiro'

export interface NewsGroupConfig {
  id: NewsGroupId
  anchorId: string
  title: string
  subtitle: string
  badgeLabel: string
  iconName: 'Building2' | 'Globe' | 'Scale' | 'Coins' | 'TrendingUp' | 'BarChart3'
}

export const NEWS_GROUPS: NewsGroupConfig[] = [
  {
    id: 'economia-brasileira',
    anchorId: 'grupo-economia-brasileira',
    title: 'Economia Brasileira',
    subtitle:
      'Cenário macroeconômico, mercado de trabalho, taxa Selic e finanças públicas nacionais.',
    badgeLabel: 'Macro & Brasil',
    iconName: 'Building2',
  },
  {
    id: 'economia-mundial',
    anchorId: 'grupo-economia-mundial',
    title: 'Economia Mundial',
    subtitle: 'Mercados globais, comércio exterior, Fed, Europa, China e geopolítica econômica.',
    badgeLabel: 'Global & Mercados',
    iconName: 'Globe',
  },
  {
    id: 'reforma-tributaria',
    anchorId: 'grupo-reforma-tributaria',
    title: 'Reforma Tributária',
    subtitle: 'Regulamentação do IBS, CBS, Imposto Seletivo, Split Payment e transição fiscal.',
    badgeLabel: 'IBS • CBS • IS',
    iconName: 'Scale',
  },
  {
    id: 'dolar-euro',
    anchorId: 'grupo-dolar-euro',
    title: 'Dólar e Euro',
    subtitle: 'Câmbio, volatilidade cambial, cotações de moedas fortes e balança de pagamentos.',
    badgeLabel: 'Câmbio & Moedas',
    iconName: 'Coins',
  },
  {
    id: 'inflacao-brasileira',
    anchorId: 'grupo-inflacao-brasileira',
    title: 'Inflação Brasileira',
    subtitle: 'IPCA, INPC, IGP-M, índice de preços de alimentos e decisões de política monetária.',
    badgeLabel: 'IPCA • IGP-M • Preços',
    iconName: 'TrendingUp',
  },
  {
    id: 'pib-brasileiro',
    anchorId: 'grupo-pib-brasileiro',
    title: 'PIB Brasileiro',
    subtitle: 'Contas nacionais apuradas pelo IBGE, atividade econômica e crescimento setorial.',
    badgeLabel: 'IBGE • Contas Nacionais',
    iconName: 'BarChart3',
  },
]

// Normaliza texto para facilitar regex e busca sem acento
function normalize(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Classifica um artigo individual no grupo mais adequado,
 * com suporte a múltiplos grupos secundários se relevante.
 */
export function matchArticleGroups(article: NewsArticle): NewsGroupId[] {
  const fullText = normalize(
    `${article.title} ${article.summary} ${article.ai_analysis || ''} ${article.category || ''}`,
  )

  const matched: NewsGroupId[] = []

  // 1. REFORMA TRIBUTÁRIA
  const isReforma =
    article.category === 'reforma_tributaria' ||
    fullText.includes('reforma tributaria') ||
    fullText.includes('tributari') ||
    fullText.includes('imposto seletivo') ||
    fullText.includes('ibs') ||
    fullText.includes('cbs') ||
    fullText.includes('split payment') ||
    fullText.includes('iva dual') ||
    fullText.includes('icms') ||
    fullText.includes('iss ') ||
    fullText.includes('pis/cofins') ||
    fullText.includes('simples nacional') ||
    fullText.includes('receita federal') ||
    fullText.includes('imposto de renda') ||
    fullText.includes('irpf') ||
    fullText.includes('taxa das blusinhas') ||
    fullText.includes('ipi ') ||
    fullText.includes('beneficios fiscais') ||
    fullText.includes('carga tributaria')

  if (isReforma) {
    matched.push('reforma-tributaria')
  }

  // 2. DÓLAR E EURO
  const isDolarEuro =
    fullText.includes('dolar') ||
    fullText.includes('euro') ||
    fullText.includes('cambio') ||
    fullText.includes('cambial') ||
    fullText.includes('moeda estrangeira') ||
    fullText.includes('moedas fortes') ||
    fullText.includes('desvalorizacao do real') ||
    fullText.includes('valorizacao do real') ||
    fullText.includes('cotacao da moeda') ||
    fullText.includes('r$ 5,') ||
    fullText.includes('r$ 6,') ||
    fullText.includes('paridade cambial')

  if (isDolarEuro) {
    matched.push('dolar-euro')
  }

  // 3. INFLAÇÃO BRASILEIRA
  const isInflacao =
    fullText.includes('inflacao') ||
    fullText.includes('ipca') ||
    fullText.includes('inpc') ||
    fullText.includes('igp-m') ||
    fullText.includes('igpm') ||
    fullText.includes('indice de precos') ||
    fullText.includes('alta de precos') ||
    fullText.includes('precos dos alimentos') ||
    fullText.includes('carestia') ||
    fullText.includes('pressao inflacionaria') ||
    fullText.includes('ancoragem da inflacao') ||
    fullText.includes('desinflacao')

  if (isInflacao) {
    matched.push('inflacao-brasileira')
  }

  // 4. PIB BRASILEIRO
  const isPib =
    fullText.includes('pib') ||
    fullText.includes('produto interno bruto') ||
    fullText.includes('crescimento da economia') ||
    fullText.includes('crescimento do brasil') ||
    fullText.includes('contas nacionais') ||
    fullText.includes('atividade economica') ||
    (fullText.includes('trimestre') &&
      (fullText.includes('cresceu') ||
        fullText.includes('avanco') ||
        fullText.includes('desaceler')))

  if (isPib) {
    matched.push('pib-brasileiro')
  }

  // 5. ECONOMIA MUNDIAL
  const isMundial =
    fullText.includes('global') ||
    fullText.includes('mundial') ||
    fullText.includes('internacional') ||
    fullText.includes('exterior') ||
    fullText.includes('uniao europeia') ||
    fullText.includes('europa') ||
    fullText.includes('estados unidos') ||
    fullText.includes('eua') ||
    fullText.includes('china') ||
    fullText.includes('fed ') ||
    fullText.includes('federal reserve') ||
    fullText.includes('bce ') ||
    fullText.includes('fmi') ||
    fullText.includes('banco mundial') ||
    fullText.includes('wall street') ||
    fullText.includes('paris') ||
    fullText.includes('venezuela') ||
    fullText.includes('comercio exterior') ||
    fullText.includes('exportacoes')

  if (isMundial) {
    matched.push('economia-mundial')
  }

  // 6. ECONOMIA BRASILEIRA
  // Qualquer artigo que mencione Brasil, governo, empresas brasileiras, ou como fallback primário
  const isBrasil =
    fullText.includes('brasil') ||
    fullText.includes('brasileir') ||
    fullText.includes('lula') ||
    fullText.includes('fazenda') ||
    fullText.includes('banco central') ||
    fullText.includes('selic') ||
    fullText.includes('copom') ||
    fullText.includes('ibovespa') ||
    fullText.includes('b3') ||
    fullText.includes('orcamento') ||
    fullText.includes('meta fiscal') ||
    fullText.includes('arcabouco') ||
    fullText.includes('salario minimo') ||
    fullText.includes('mei') ||
    fullText.includes('trabalho') ||
    fullText.includes('6x1') ||
    fullText.includes('governo') ||
    fullText.includes('senado') ||
    fullText.includes('camara') ||
    article.category === 'economia' ||
    article.category === 'politica_fiscal' ||
    article.category === 'mercados'

  if (isBrasil || matched.length === 0) {
    matched.push('economia-brasileira')
  }

  return matched
}

export interface GroupedNewsResult {
  group: NewsGroupConfig
  articles: NewsArticle[]
  totalCount: number
}

/**
 * Agrupa uma lista de artigos nos 6 grupos temáticos.
 * Mantém ordem e permite limitar a quantidade máxima de destaques por grupo.
 */
export function groupArticles(
  articles: NewsArticle[],
  maxPerGroup: number = 6,
): GroupedNewsResult[] {
  const map: Record<NewsGroupId, NewsArticle[]> = {
    'economia-brasileira': [],
    'economia-mundial': [],
    'reforma-tributaria': [],
    'dolar-euro': [],
    'inflacao-brasileira': [],
    'pib-brasileiro': [],
  }

  const seenPerGroup: Record<NewsGroupId, Set<string>> = {
    'economia-brasileira': new Set(),
    'economia-mundial': new Set(),
    'reforma-tributaria': new Set(),
    'dolar-euro': new Set(),
    'inflacao-brasileira': new Set(),
    'pib-brasileiro': new Set(),
  }

  for (const article of articles) {
    const matched = matchArticleGroups(article)
    for (const gId of matched) {
      if (!seenPerGroup[gId].has(article.id)) {
        seenPerGroup[gId].add(article.id)
        map[gId].push(article)
      }
    }
  }

  return NEWS_GROUPS.map((config) => {
    const list = map[config.id] || []
    return {
      group: config,
      articles: maxPerGroup > 0 ? list.slice(0, maxPerGroup) : list,
      totalCount: list.length,
    }
  })
}
