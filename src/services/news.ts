import pb from '@/lib/pocketbase/client'
import { NewsArticle, NewsCategory } from '@/types'

export interface NewsListParams {
  page?: number
  perPage?: number
  category?: NewsCategory | 'all'
  search?: string
  isFeatured?: boolean
}

export interface NewsListResult {
  items: NewsArticle[]
  page: number
  perPage: number
  totalItems: number
  totalPages: number
}

export async function getNewsArticles(params: NewsListParams = {}): Promise<NewsListResult> {
  const { page = 1, perPage = 12, category = 'all', search = '', isFeatured } = params

  const filters: string[] = []

  if (category && category !== 'all') {
    filters.push(`category = "${category}"`)
  }

  if (isFeatured !== undefined) {
    filters.push(`is_featured = ${isFeatured}`)
  }

  if (search.trim()) {
    const cleanSearch = search.trim().replace(/["\\]/g, '')
    filters.push(`(title ~ "${cleanSearch}" || summary ~ "${cleanSearch}")`)
  }

  const filterString = filters.join(' && ')

  try {
    const resultList = await pb.collection('news_articles').getList<NewsArticle>(page, perPage, {
      filter: filterString,
      sort: '-published_at',
      requestKey: null,
    })

    return {
      items: resultList.items,
      page: resultList.page,
      perPage: resultList.perPage,
      totalItems: resultList.totalItems,
      totalPages: resultList.totalPages,
    }
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)
    return {
      items: [],
      page: 1,
      perPage,
      totalItems: 0,
      totalPages: 0,
    }
  }
}

export async function getRecentNews(limit: number = 6): Promise<NewsArticle[]> {
  try {
    const records = await pb.collection('news_articles').getList<NewsArticle>(1, limit, {
      sort: '-published_at',
      requestKey: null,
    })
    return records.items
  } catch (error) {
    console.error('Erro ao buscar notícias recentes:', error)
    return []
  }
}

export async function getNewsByCategory(
  category: NewsCategory,
  limit: number = 4,
): Promise<NewsArticle[]> {
  try {
    const records = await pb.collection('news_articles').getList<NewsArticle>(1, limit, {
      filter: `category = "${category}"`,
      sort: '-published_at',
      requestKey: null,
    })
    return records.items
  } catch (error) {
    console.error(`Erro ao buscar notícias da categoria ${category}:`, error)
    return []
  }
}

export async function getNewsArticleByIdOrSlug(idOrSlug: string): Promise<NewsArticle | null> {
  try {
    // Try by ID first
    try {
      const record = await pb.collection('news_articles').getOne<NewsArticle>(idOrSlug, {
        requestKey: null,
      })
      if (record) return record
    } catch (_) {
      // If not found by ID, try slug
    }

    const recordBySlug = await pb
      .collection('news_articles')
      .getFirstListItem<NewsArticle>(`slug = "${idOrSlug}"`, { requestKey: null })
    return recordBySlug
  } catch (error) {
    console.error(`Erro ao buscar notícia com id/slug ${idOrSlug}:`, error)
    return null
  }
}

export async function getRelatedNews(
  currentId: string,
  category: NewsCategory,
  limit: number = 3,
): Promise<NewsArticle[]> {
  try {
    const records = await pb.collection('news_articles').getList<NewsArticle>(1, limit, {
      filter: `id != "${currentId}" && category = "${category}"`,
      sort: '-published_at',
      requestKey: null,
    })
    return records.items
  } catch (error) {
    console.error('Erro ao buscar notícias relacionadas:', error)
    return []
  }
}

export async function subscribeNewsletter(email: string, name?: string): Promise<boolean> {
  try {
    await pb.collection('newsletter_subscribers').create({
      email,
      name: name || '',
    })
    return true
  } catch (error: any) {
    // If already subscribed, treat as success
    if (error?.status === 400 || error?.data?.email?.code === 'validation_not_unique') {
      return true
    }
    console.error('Erro ao cadastrar newsletter:', error)
    return false
  }
}
