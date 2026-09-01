// Scheduled job to fetch latest RSS feeds from verified Brazilian economic sources,
// summarize via Skip AI Gateway (alias: fast), categorize, and store in news_articles.
// Runs every 4 hours (0 */4 * * *).

cronAdd('update_news_feed', '0 */4 * * *', () => {
  // Curated list of verified Brazilian public RSS feeds for economics, taxation and markets
  const feeds = [
    {
      url: 'https://agenciabrasil.ebc.com.br/rss/economia/feed.xml',
      defaultCategory: 'economia',
      source: 'Agência Brasil (Economia)',
    },
    {
      url: 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml',
      defaultCategory: 'economia',
      source: 'Agência Brasil',
    },
    {
      url: 'https://www.camara.leg.br/noticias/rss/dinamico/ECONOMIA',
      defaultCategory: 'reforma_tributaria',
      source: 'Agência Câmara de Notícias',
    },
    {
      url: 'https://www.camara.leg.br/noticias/rss/ultimas-noticias',
      defaultCategory: 'politica_fiscal',
      source: 'Câmara dos Deputados',
    },
    {
      url: 'https://www.bcb.gov.br/api/feed/sitebcb/sitefeeds/noticias',
      defaultCategory: 'mercados',
      source: 'Banco Central do Brasil',
    },
    {
      url: 'https://g1.globo.com/rss/g1/economia/',
      defaultCategory: 'economia',
      source: 'G1 Economia',
    },
    {
      url: 'https://feeds.folha.uol.com.br/mercado/rss091.xml',
      defaultCategory: 'mercados',
      source: 'Folha de S.Paulo (Mercado)',
    },
  ]

  let totalIngested = 0

  for (let f = 0; f < feeds.length; f++) {
    const feed = feeds[f]
    try {
      const res = $http.send({
        url: feed.url,
        method: 'GET',
        headers: {
          'User-Agent': 'PortalConsultoriaEconomica/1.0 (BORLIM Consultoria Empresarial; bot)',
          Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
        },
        timeout: 12,
      })

      if (res.statusCode === 200 && res.raw) {
        const xml = res.raw

        // Support standard <item> (RSS 2.0 / RDF) or <entry> (Atom)
        const itemRegex = /<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/gi
        let match
        let count = 0

        while ((match = itemRegex.exec(xml)) !== null && count < 6) {
          const itemXml = match[1]

          // Extract title
          const titleMatch = /<title(?:[^>]*)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i.exec(
            itemXml,
          )

          // Extract link: handle RSS <link>...</link> and Atom <link href="..." />
          let rawLink = ''
          const linkTagMatch = /<link(?:[^>]*)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i.exec(
            itemXml,
          )
          if (linkTagMatch && linkTagMatch[1] && linkTagMatch[1].trim()) {
            rawLink = linkTagMatch[1].trim()
          } else {
            const linkHrefMatch = /<link[^>]+href=["']([^"']+)["']/i.exec(itemXml)
            if (linkHrefMatch && linkHrefMatch[1]) {
              rawLink = linkHrefMatch[1].trim()
            }
          }

          // Extract description / summary / content
          let rawDesc = ''
          const descMatch =
            /<(?:description|summary|content)(?:[^>]*)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/(?:description|summary|content)>/i.exec(
              itemXml,
            )
          if (descMatch && descMatch[1]) {
            rawDesc = descMatch[1]
              .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
              .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
              .replace(/<[^>]+>/g, ' ')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/\s+/g, ' ')
              .trim()
          }

          // Extract published date
          const pubDateMatch =
            /<(?:pubDate|published|updated)(?:[^>]*)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/(?:pubDate|published|updated)>/i.exec(
              itemXml,
            )
          let publishedAt = new Date().toISOString().replace('T', ' ').slice(0, 19)
          if (pubDateMatch && pubDateMatch[1]) {
            try {
              const parsedDate = new Date(pubDateMatch[1].trim())
              if (!isNaN(parsedDate.getTime())) {
                publishedAt = parsedDate.toISOString().replace('T', ' ').slice(0, 19)
              }
            } catch (_) {}
          }

          if (!titleMatch || !titleMatch[1]) continue

          let rawTitle = titleMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim()

          if (!rawTitle) continue

          // Normalized slug for deduplication and SEO routing
          const slug = rawTitle
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .slice(0, 80)
            .replace(/^-+|-+$/g, '')

          if (!slug) continue

          // Check if article already exists in news_articles
          let exists = false
          try {
            $app.findFirstRecordByData('news_articles', 'slug', slug)
            exists = true
          } catch (_) {}

          if (exists) continue

          // Advanced categorization based on title and content keywords
          const textForCat = (rawTitle + ' ' + rawDesc).toLowerCase()
          let category = feed.defaultCategory

          if (
            textForCat.includes('reforma tributaria') ||
            textForCat.includes('tributari') ||
            textForCat.includes('imposto seletivo') ||
            textForCat.includes('ibs') ||
            textForCat.includes('cbs') ||
            textForCat.includes('split payment') ||
            textForCat.includes('iva dual') ||
            textForCat.includes('icms') ||
            textForCat.includes('iss ') ||
            textForCat.includes('pis/cofins') ||
            textForCat.includes('imposto de renda') ||
            textForCat.includes('irpf') ||
            textForCat.includes('isencao') ||
            textForCat.includes('taxa das blusinhas')
          ) {
            category = 'reforma_tributaria'
          } else if (
            textForCat.includes('politica fiscal') ||
            textForCat.includes('arcabouco fiscal') ||
            textForCat.includes('meta fiscal') ||
            textForCat.includes('superavit') ||
            textForCat.includes('deficit') ||
            textForCat.includes('ploa') ||
            textForCat.includes('orcamento') ||
            textForCat.includes('divida publica') ||
            textForCat.includes('gastos publicos') ||
            textForCat.includes('arrecadacao') ||
            textForCat.includes('precatorios') ||
            textForCat.includes('emendas')
          ) {
            category = 'politica_fiscal'
          } else if (
            textForCat.includes('bolsa') ||
            textForCat.includes('ibovespa') ||
            textForCat.includes('dolar') ||
            textForCat.includes('cambio') ||
            textForCat.includes('mercado') ||
            textForCat.includes('renda fixa') ||
            textForCat.includes('juros') ||
            textForCat.includes('copom') ||
            textForCat.includes('selic') ||
            textForCat.includes('cdb') ||
            textForCat.includes('banco central') ||
            textForCat.includes('investidores')
          ) {
            category = 'mercados'
          } else {
            category = 'economia'
          }

          // Generate concise summary + strategic AI analysis via Skip AI Gateway (alias: fast)
          let aiSummary = rawDesc ? rawDesc.slice(0, 320) : rawTitle
          let aiAnalysis =
            'Análise executiva BORLIM: Acompanhe os impactos regulatórios e econômicos desta medida para calibrar margens e planejamento financeiro da empresa.'

          try {
            const aiRes = $ai.chat({
              model: 'fast',
              messages: [
                {
                  role: 'system',
                  content:
                    "Você é o Economista-Chefe da BORLIM Consultoria Empresarial, uma consultoria brasileira de inteligência macroeconômica e reforma tributária sediada em São Paulo. Elabore uma síntese executiva rigorosa para diretores financeiros (CFOs) e CEOs. Responda ESTRITAMENTE em formato JSON com duas chaves: 'summary' (resumo editorial objetivo e analítico do fato em 2 ou 3 frases em pt-BR) e 'ai_analysis' (1 a 2 frases com a perspectiva prática e impacto de decisão empresarial para negócios).",
                },
                {
                  role: 'user',
                  content:
                    'Fonte: ' +
                    feed.source +
                    '\nTítulo: ' +
                    rawTitle +
                    '\nTexto: ' +
                    (rawDesc || rawTitle),
                },
              ],
            })

            if (aiRes && aiRes.choices && aiRes.choices[0] && aiRes.choices[0].message) {
              const content = aiRes.choices[0].message.content.trim()
              try {
                const cleanJson = content
                  .replace(/^```json/i, '')
                  .replace(/^```/i, '')
                  .replace(/```$/i, '')
                  .trim()
                const parsed = JSON.parse(cleanJson)
                if (parsed.summary && typeof parsed.summary === 'string') {
                  aiSummary = parsed.summary.trim()
                }
                if (parsed.ai_analysis && typeof parsed.ai_analysis === 'string') {
                  aiAnalysis = parsed.ai_analysis.trim()
                }
              } catch (_) {
                if (content.length > 20) {
                  aiSummary = content.slice(0, 450)
                }
              }
            }
          } catch (aiErr) {
            console.log('AI summary generation warning for article ' + slug + ':', aiErr.message)
          }

          // Compute read time in minutes
          const fullWordCount = (rawTitle + ' ' + aiSummary + ' ' + aiAnalysis).split(/\s+/).length
          const readTime = Math.max(2, Math.ceil(fullWordCount / 120))

          // Save new record to PocketBase
          const newsCol = $app.findCollectionByNameOrId('news_articles')
          const record = new Record(newsCol)
          record.set('title', rawTitle)
          record.set('slug', slug)
          record.set('summary', aiSummary)
          record.set('category', category)
          record.set('source', feed.source)
          record.set('source_url', rawLink || feed.url)
          record.set('image_url', 'https://img.usecurling.com/p/800/450?q=economy+finance+brazil')
          record.set('read_time_minutes', readTime)
          record.set('published_at', publishedAt)
          record.set('is_featured', false)
          record.set('ai_analysis', aiAnalysis)

          $app.save(record)
          count++
          totalIngested++
          console.log('[BORLIM News Sync] Ingested:', rawTitle, '-> category:', category)
        }
      }
    } catch (feedErr) {
      // Individual feed failure handled safely without interrupting others
      console.log(
        'Error processing RSS feed (' + feed.source + ' - ' + feed.url + '):',
        feedErr.message,
      )
    }
  }

  console.log('[BORLIM News Sync] Completed. Ingested new articles:', totalIngested)
})
