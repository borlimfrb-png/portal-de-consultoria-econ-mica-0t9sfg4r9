migrate(
  (app) => {
    // 1. economic_indicators collection
    const economicIndicators = new Collection({
      name: 'economic_indicators',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'code', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'short_name', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          values: ['juros', 'inflacao', 'cambio', 'atividade'],
          maxSelect: 1,
        },
        { name: 'current_value', type: 'number', required: true },
        { name: 'previous_value', type: 'number' },
        { name: 'variation', type: 'number' },
        { name: 'unit', type: 'text', required: true },
        { name: 'frequency', type: 'text' },
        { name: 'reference_date', type: 'text', required: true },
        { name: 'source', type: 'text', required: true },
        { name: 'source_code', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'history', type: 'json' },
        { name: 'display_order', type: 'number' },
        { name: 'is_featured', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_econ_code ON economic_indicators (code)',
        'CREATE INDEX idx_econ_category ON economic_indicators (category)',
        'CREATE INDEX idx_econ_order ON economic_indicators (display_order)',
      ],
    })
    app.save(economicIndicators)

    // 2. news_articles collection
    const newsArticles = new Collection({
      name: 'news_articles',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'summary', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          values: ['reforma_tributaria', 'economia', 'mercados', 'politica_fiscal'],
          maxSelect: 1,
        },
        { name: 'source', type: 'text', required: true },
        { name: 'source_url', type: 'text' },
        { name: 'image_url', type: 'text' },
        { name: 'read_time_minutes', type: 'number' },
        { name: 'published_at', type: 'text', required: true },
        { name: 'is_featured', type: 'bool' },
        { name: 'ai_analysis', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_news_slug ON news_articles (slug)',
        'CREATE INDEX idx_news_cat_pub ON news_articles (category, published_at DESC)',
        'CREATE INDEX idx_news_pub ON news_articles (published_at DESC)',
      ],
    })
    app.save(newsArticles)

    // 3. newsletter_subscribers collection
    const subscribers = new Collection({
      name: 'newsletter_subscribers',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'name', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_sub_email ON newsletter_subscribers (email)'],
    })
    app.save(subscribers)
  },
  (app) => {
    try {
      const sub = app.findCollectionByNameOrId('newsletter_subscribers')
      app.delete(sub)
    } catch (_) {}
    try {
      const news = app.findCollectionByNameOrId('news_articles')
      app.delete(news)
    } catch (_) {}
    try {
      const econ = app.findCollectionByNameOrId('economic_indicators')
      app.delete(econ)
    } catch (_) {}
  },
)
