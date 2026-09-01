// Scheduled job to fetch latest RSS feeds, summarize via Skip AI Gateway (alias: fast), and store in news_articles
// Runs every 4 hours (0 */4 * * *)
cronAdd('update_news_feed', '0 */4 * * *', () => {
  const feeds = [
    {
      url: 'https://agenciabrasil.ebc.com.br/rss/economia/feed.xml',
      category: 'reforma_tributaria',
      source: 'Agência Brasil',
    },
    {
      url: 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml',
      category: 'economia',
      source: 'Agência Brasil',
    },
  ]

  for (let f = 0; f < feeds.length; f++) {
    const feed = feeds[f]
    try {
      const res = $http.send({
        url: feed.url,
        method: 'GET',
        headers: { 'User-Agent': 'PortalConsultoriaEconomica/1.0' },
        timeout: 10,
      })

      if (res.statusCode === 200 && res.raw) {
        const xml = res.raw
        // Simple regex-based RSS item extraction safe in JSVM
        const itemRegex = /<item>([\s\S]*?)<\/item>/gi
        let match
        let count = 0

        while ((match = itemRegex.exec(xml)) !== null && count < 5) {
          const itemXml = match[1]
          const titleMatch = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i.exec(itemXml)
          const linkMatch = /<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i.exec(itemXml)
          const descMatch =
            /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i.exec(itemXml)
          const pubDateMatch = /<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i.exec(
            itemXml,
          )

          if (!titleMatch || !titleMatch[1]) continue

          let rawTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim()
          let rawLink = linkMatch && linkMatch[1] ? linkMatch[1].trim() : ''
          let rawDesc = descMatch && descMatch[1] ? descMatch[1].replace(/<[^>]+>/g, '').trim() : ''
          let rawPubDate =
            pubDateMatch && pubDateMatch[1] ? pubDateMatch[1].trim() : new Date().toISOString()

          // Simple slug generator
          const slug = rawTitle
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .slice(0, 80)
            .replace(/^-+|-+$/g, '')

          if (!slug) continue

          // Check if article exists
          let exists = false
          try {
            $app.findFirstRecordByData('news_articles', 'slug', slug)
            exists = true
          } catch (_) {}

          if (exists) continue

          // Determine specific category
          let category = feed.category
          const lowerText = (rawTitle + ' ' + rawDesc).toLowerCase()
          if (
            lowerText.includes('reforma tributaria') ||
            lowerText.includes('ibs') ||
            lowerText.includes('cbs') ||
            lowerText.includes('imposto seletivo') ||
            lowerText.includes('tribut')
          ) {
            category = 'reforma_tributaria'
          } else if (
            lowerText.includes('fiscal') ||
            lowerText.includes('orcamento') ||
            lowerText.includes('arrecadacao') ||
            lowerText.includes('gastos publicos')
          ) {
            category = 'politica_fiscal'
          } else if (
            lowerText.includes('bolsa') ||
            lowerText.includes('dolar') ||
            lowerText.includes('cambio') ||
            lowerText.includes('mercado')
          ) {
            category = 'mercados'
          } else {
            category = 'economia'
          }

          // Generate concise summary + analytical perspective via Skip AI Gateway fast alias
          let aiSummary = rawDesc ? rawDesc.slice(0, 300) : rawTitle
          let aiAnalysis = ''

          try {
            const aiRes = $ai.chat({
              model: 'fast',
              messages: [
                {
                  role: 'system',
                  content:
                    "Você é um economista sênior de consultoria empresarial. Gere um resumo editorial objetivo em 2 a 3 frases em Português (pt-BR) e uma breve frase de impacto para tomada de decisão empresarial. Responda em formato JSON com chaves: 'summary' e 'ai_analysis'.",
                },
                {
                  role: 'user',
                  content: 'Título: ' + rawTitle + '\nTexto bruto: ' + rawDesc,
                },
              ],
            })

            if (aiRes && aiRes.choices && aiRes.choices[0] && aiRes.choices[0].message) {
              const content = aiRes.choices[0].message.content.trim()
              try {
                // strip json code block if wrapped
                const cleanJson = content
                  .replace(/^```json/i, '')
                  .replace(/^```/i, '')
                  .replace(/```$/i, '')
                  .trim()
                const parsed = JSON.parse(cleanJson)
                if (parsed.summary) aiSummary = parsed.summary
                if (parsed.ai_analysis) aiAnalysis = parsed.ai_analysis
              } catch (_) {
                aiSummary = content.slice(0, 400)
              }
            }
          } catch (aiErr) {
            console.log('AI summary generation error:', aiErr.message)
          }

          const newsCol = $app.findCollectionByNameOrId('news_articles')
          const record = new Record(newsCol)
          record.set('title', rawTitle)
          record.set('slug', slug)
          record.set('summary', aiSummary)
          record.set('category', category)
          record.set('source', feed.source)
          record.set('source_url', rawLink)
          record.set('image_url', 'https://img.usecurling.com/p/800/450?q=economy+finance+brazil')
          record.set('read_time_minutes', Math.max(2, Math.ceil(aiSummary.length / 300)))
          record.set('published_at', new Date().toISOString().replace('T', ' ').slice(0, 19))
          record.set('is_featured', false)
          record.set('ai_analysis', aiAnalysis)
          $app.save(record)
          count++
          console.log('Ingested new article:', rawTitle)
        }
      }
    } catch (feedErr) {
      console.log('Failed to process feed ' + feed.url + ':', feedErr.message)
    }
  }
})
