migrate(
  (app) => {
    // 1. Criar collection library_documents
    const libraryDocuments = new Collection({
      name: 'library_documents',
      type: 'base',
      // Leitura pública de documentos publicados
      listRule: 'published = true || @request.auth.id != ""',
      viewRule: 'published = true || @request.auth.id != ""',
      // Escrita restrita a usuário autenticado
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        {
          name: 'type',
          type: 'select',
          required: true,
          values: ['livro', 'artigo'],
          maxSelect: 1,
        },
        {
          name: 'file',
          type: 'file',
          maxSelect: 1,
          maxSize: 52428800, // 50MB
          mimeTypes: ['application/pdf', 'application/x-pdf'],
        },
        { name: 'file_size', type: 'number' }, // tamanho em bytes (opcional)
        { name: 'content_text', type: 'text' }, // texto extraído ou síntese para permitir 'copiar conteúdo'
        { name: 'published', type: 'bool' }, // bool flag não required
        { name: 'published_at', type: 'text' }, // data formatada YYYY-MM-DD
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_lib_pub_date ON library_documents (published, published_at DESC)',
        'CREATE INDEX idx_lib_type ON library_documents (type)',
      ],
    })
    app.save(libraryDocuments)

    // 2. Garantir usuário admin no PocketBase
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    const adminEmail = 'flavio@borlim.com.br'

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', adminEmail)
      // Usuário já existe, não precisa recriar
    } catch (_) {
      const record = new Record(users)
      record.setEmail(adminEmail)
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Flávio Bordignon - Borlim Consultoria')
      app.save(record)
    }

    // 3. Documentos iniciais para a biblioteca (amostra inicial do acervo)
    const seedDocs = [
      {
        title:
          'Guia Prático da Reforma Tributária: Impactos do IBS e CBS no Planejamento Empresarial',
        description:
          'Análise técnica e estratégica sobre a transição do sistema tributário brasileiro, operacionalização do Split Payment, extinção de PIS/Cofins/ICMS/ISS e os reflexos imediatos no capital de giro.',
        type: 'livro',
        content_text:
          'GUIA PRÁTICO DA REFORMA TRIBUTÁRIA — BORLIM CONSULTORIA ECONÔMICA\n\nResumo Executivo:\n1. O Modelo do IVA Dual (CBS federal e IBS subnacional) elimina a cumulatividade clássica e adota o princípio do destino.\n2. O Split Payment bancário altera o fluxo de recebimentos, debitando o imposto no instante da liquidação da fatura.\n3. A gestão de créditos financeiros exige conciliação automatizada de notas e pagamentos para preservar a liquidez corporativa.\n\nAutoria: Borlim Consultoria Econômica\nContato: flavio@borlim.com.br',
        published: true,
        published_at: '2025-01-15',
      },
      {
        title:
          'Manual de Avaliação de Empresas (Valuation): Do Fluxo de Caixa Descontado aos Múltiplos Setoriais',
        description:
          'Fundamentos de mensuração de valor patrimonial e econômico com metodologia de projeção de Fluxo de Caixa Livre (FCFF), custo de capital (WACC) e métricas comparativas para M&A.',
        type: 'livro',
        content_text:
          'MANUAL DE AVALIAÇÃO DE EMPRESAS (VALUATION) — BORLIM CONSULTORIA\n\nMetodologia Central:\n- Projeção de receitas operacionais com premissas macroeconômicas (PIB, inflação, câmbio);\n- Apuração do NOPAT (Lucro Operacional Líquido pós-impostos);\n- Determinação da taxa de desconto via WACC (Weighted Average Cost of Capital);\n- Análise de sensibilidade em cenários otimista, base e conservador.\n\nContato Especialista: (17) 99765-0672 / flavio@borlim.com.br',
        published: true,
        published_at: '2025-01-28',
      },
      {
        title: 'Gestão Financeira & Análise de Solvência: O Modelo Termômetro de Kanitz Aplicado',
        description:
          'Estudo aplicado dos 48 indicadores financeiros indispensáveis para a continuidade corporativa, cálculo do capital de giro líquido e prevenção de insolvência empresarial.',
        type: 'artigo',
        content_text:
          'ANÁLISE DE SOLVÊNCIA E BALANÇO PATRIMONIAL\n\nFatores Críticos:\n- Índice de Liquidez Geral e Seca;\n- Prazos médios de estocagem, recebimento e pagamento (Ciclo Financeiro);\n- Aplicação da pontuação Z de Kanitz para antecipação de riscos de insolvência com até 24 meses de antecedência.\n\nBorlim Consultoria Empresarial.',
        published: true,
        published_at: '2025-02-10',
      },
      {
        title:
          'Formação de Preço de Venda Estruturada: Markup, Margem de Contribuição e Ponto de Equilíbrio',
        description:
          'Artigo técnico sobre engenharia de precificação em cenários inflacionários e de juros altos, separação rigorosa de custos variáveis e fixos, e cálculo do ponto de equilíbrio econômico.',
        type: 'artigo',
        content_text:
          'ENGENHARIA DE PRECIFICAÇÃO E MARKUP EFETIVO\n\nFórmula Fundamental:\nMarkup Divisor = [1 - (Tributos Incidentes + Comissões + Margem de Lucro Desejada)]\nPreço de Venda = Custo Direto Unitário / Markup Divisor\n\nPonto de Equilíbrio Contábil = Custos Fixos Totais / Índice de Margem de Contribuição.\n\nBorlim Consultoria — São Paulo/SP.',
        published: true,
        published_at: '2025-02-22',
      },
    ]

    for (let i = 0; i < seedDocs.length; i++) {
      const doc = seedDocs[i]
      try {
        app.findFirstRecordByData('library_documents', 'title', doc.title)
      } catch (_) {
        const rec = new Record(libraryDocuments)
        rec.set('title', doc.title)
        rec.set('description', doc.description)
        rec.set('type', doc.type)
        rec.set('content_text', doc.content_text)
        rec.set('published', doc.published)
        rec.set('published_at', doc.published_at)
        rec.set('file_size', 1024 * (doc.type === 'livro' ? 2450 : 850)) // simulação de ~2.4MB / 850KB
        app.save(rec)
      }
    }
  },
  (app) => {
    try {
      const col = app.findCollectionByNameOrId('library_documents')
      app.delete(col)
    } catch (_) {}
  },
)
