migrate(
  (app) => {
    const indicatorsCol = app.findCollectionByNameOrId('economic_indicators')

    // Helper to build 30 to 90 historical points with minor deterministic fluctuations
    function generateHistory(baseValue, trend, volatility, pointsCount, finalDateStr) {
      const history = []
      const now = new Date(finalDateStr || '2025-02-28')
      for (let i = pointsCount - 1; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 3600 * 1000 * 3) // every ~3 days
        const dateStr = d.toISOString().split('T')[0]
        const progress = (pointsCount - 1 - i) / pointsCount
        const wave = Math.sin(i * 0.4) * volatility
        const val = +(baseValue - trend * (1 - progress) + wave).toFixed(2)
        history.push({ date: dateStr, value: val })
      }
      return history
    }

    const seedIndicators = [
      {
        code: 'selic',
        name: 'Taxa Selic Meta',
        short_name: 'Selic',
        category: 'juros',
        current_value: 13.25,
        previous_value: 12.25,
        variation: 1.0,
        unit: '% a.a.',
        frequency: 'Decisão Copom',
        reference_date: '2025-02-20',
        source: 'Banco Central do Brasil — SGS',
        source_code: '432',
        description:
          'Taxa básica de juros da economia brasileira definida pelo Comitê de Política Monetária (Copom).',
        display_order: 1,
        is_featured: true,
        history: generateHistory(13.25, 1.0, 0.05, 30, '2025-02-28'),
      },
      {
        code: 'cdi',
        name: 'Certificado de Depósito Interbancário',
        short_name: 'CDI',
        category: 'juros',
        current_value: 13.15,
        previous_value: 12.15,
        variation: 1.0,
        unit: '% a.a.',
        frequency: 'Diário',
        reference_date: '2025-02-27',
        source: 'Banco Central do Brasil — SGS / B3',
        source_code: '4389',
        description:
          'Taxa média dos empréstimos interbancários de 1 dia, principal benchmark de renda fixa no Brasil.',
        display_order: 2,
        is_featured: true,
        history: generateHistory(13.15, 0.9, 0.03, 30, '2025-02-28'),
      },
      {
        code: 'ipca_12m',
        name: 'IPCA Acumulado 12 Meses',
        short_name: 'IPCA 12m',
        category: 'inflacao',
        current_value: 4.56,
        previous_value: 4.83,
        variation: -0.27,
        unit: '%',
        frequency: 'Mensal',
        reference_date: '2025-01-31',
        source: 'IBGE / Banco Central do Brasil — SGS',
        source_code: '13522',
        description:
          'Índice Nacional de Preços ao Consumidor Amplo acumulado nos últimos 12 meses, meta oficial de inflação.',
        display_order: 3,
        is_featured: true,
        history: generateHistory(4.56, -0.4, 0.1, 30, '2025-02-28'),
      },
      {
        code: 'igpm_12m',
        name: 'IGP-M Acumulado 12 Meses',
        short_name: 'IGP-M 12m',
        category: 'inflacao',
        current_value: 6.22,
        previous_value: 5.95,
        variation: 0.27,
        unit: '%',
        frequency: 'Mensal',
        reference_date: '2025-01-31',
        source: 'FGV / Banco Central do Brasil — SGS',
        source_code: '189',
        description:
          'Índice Geral de Preços do Mercado calculado pelo IBRE/FGV, tradicional indexador de contratos de aluguel e energia.',
        display_order: 4,
        is_featured: true,
        history: generateHistory(6.22, 0.8, 0.15, 30, '2025-02-28'),
      },
      {
        code: 'dolar_comercial',
        name: 'Dólar Comercial (PTAX Venda)',
        short_name: 'Dólar',
        category: 'cambio',
        current_value: 5.76,
        previous_value: 5.82,
        variation: -0.06,
        unit: 'R$',
        frequency: 'Diário',
        reference_date: '2025-02-27',
        source: 'Banco Central do Brasil — SGS',
        source_code: '1',
        description:
          'Cotação de fechamento da taxa de câmbio do Dólar Americano calculada pelo Banco Central.',
        display_order: 5,
        is_featured: true,
        history: generateHistory(5.76, -0.15, 0.04, 30, '2025-02-28'),
      },
      {
        code: 'euro_comercial',
        name: 'Euro Comercial (PTAX Venda)',
        short_name: 'Euro',
        category: 'cambio',
        current_value: 6.03,
        previous_value: 6.08,
        variation: -0.05,
        unit: 'R$',
        frequency: 'Diário',
        reference_date: '2025-02-27',
        source: 'Banco Central do Brasil — SGS',
        source_code: '21619',
        description:
          'Taxa de câmbio oficial do Euro frente ao Real calculada pela autoridade monetária.',
        display_order: 6,
        is_featured: false,
        history: generateHistory(6.03, -0.12, 0.05, 30, '2025-02-28'),
      },
      {
        code: 'taxa_desemprego',
        name: 'Taxa de Desocupação (PNAD Contínua)',
        short_name: 'Desemprego',
        category: 'atividade',
        current_value: 6.2,
        previous_value: 6.4,
        variation: -0.2,
        unit: '%',
        frequency: 'Móvel Trimestral',
        reference_date: '2024-12-31',
        source: 'IBGE / Banco Central do Brasil — SGS',
        source_code: '24369',
        description:
          'Percentual de pessoas desocupadas na força de trabalho medido pela PNAD Contínua do IBGE.',
        display_order: 7,
        is_featured: false,
        history: generateHistory(6.2, -0.5, 0.08, 30, '2025-02-28'),
      },
      {
        code: 'ibc_br',
        name: 'Índice de Atividade Econômica do BCB (IBC-Br)',
        short_name: 'IBC-Br',
        category: 'atividade',
        current_value: 152.4,
        previous_value: 151.8,
        variation: 0.6,
        unit: 'pts',
        frequency: 'Mensal',
        reference_date: '2024-12-31',
        source: 'Banco Central do Brasil — SGS',
        source_code: '24363',
        description:
          'Indicador mensal que antecipa o comportamento do Produto Interno Bruto (PIB) brasileiro.',
        display_order: 8,
        is_featured: false,
        history: generateHistory(152.4, 1.2, 0.3, 30, '2025-02-28'),
      },
    ]

    for (let i = 0; i < seedIndicators.length; i++) {
      const ind = seedIndicators[i]
      try {
        app.findFirstRecordByData('economic_indicators', 'code', ind.code)
      } catch (_) {
        const rec = new Record(indicatorsCol)
        rec.set('code', ind.code)
        rec.set('name', ind.name)
        rec.set('short_name', ind.short_name)
        rec.set('category', ind.category)
        rec.set('current_value', ind.current_value)
        rec.set('previous_value', ind.previous_value)
        rec.set('variation', ind.variation)
        rec.set('unit', ind.unit)
        rec.set('frequency', ind.frequency)
        rec.set('reference_date', ind.reference_date)
        rec.set('source', ind.source)
        rec.set('source_code', ind.source_code)
        rec.set('description', ind.description)
        rec.set('history', ind.history)
        rec.set('display_order', ind.display_order)
        rec.set('is_featured', ind.is_featured)
        app.save(rec)
      }
    }

    // 2. Seed News Articles
    const newsCol = app.findCollectionByNameOrId('news_articles')

    const seedNews = [
      {
        title:
          'Reforma Tributária: Regulamentação do IBS e CBS avança com foco no Split Payment e alíquota de referência',
        slug: 'reforma-tributaria-regulamentacao-ibs-cbs-split-payment',
        summary:
          'O Congresso Nacional e o Ministério da Fazenda consolidam as diretrizes do Comitê Gestor do IBS e definem regras de implementação do sistema de Split Payment inteligente, com impacto direto no fluxo de caixa corporativo a partir de 2026.',
        category: 'reforma_tributaria',
        source: 'Agência Brasil / Consultoria Econômica',
        source_url: 'https://agenciabrasil.ebc.com.br/economia',
        image_url: 'https://img.usecurling.com/p/800/450?q=taxes+financial+charts',
        read_time_minutes: 4,
        published_at: '2025-02-28 09:30:00',
        is_featured: true,
        ai_analysis:
          'A implementação do Split Payment exigirá adaptação imediata dos sistemas ERP corporativos. Empresas com alto volume de transações B2B precisam recalcular seu ciclo financeiro para mitigar pressões de liquidez de curto prazo.',
      },
      {
        title:
          'Impacto da Transição Tributária no Setor de Serviços: Estratégias de Crédito Financeiro e Não Cumulatividade Plena',
        slug: 'impacto-transicao-tributaria-setor-servicos-creditos',
        summary:
          'Com a unificação dos tributos federais e subnacionais, prestadores de serviços avaliam os impactos da não cumulatividade plena e o aproveitamento de créditos em toda a cadeia de insumos e tecnologia.',
        category: 'reforma_tributaria',
        source: 'Valor Econômico / Análise Setorial',
        source_url: 'https://valor.globo.com/brasil/noticia/reforma-tributaria',
        image_url: 'https://img.usecurling.com/p/800/450?q=office+corporate+strategy',
        read_time_minutes: 5,
        published_at: '2025-02-27 15:45:00',
        is_featured: true,
        ai_analysis:
          'Apesar do aumento da alíquota nominal em serviços puros, empresas intensivas em insumos e tecnologia poderão compensar parte do custo através da apropriação ampla de créditos que antes geravam cumulatividade oculta.',
      },
      {
        title:
          'Imposto Seletivo e Cesta Básica Nacional: O Que Muda para a Indústria e o Varejo de Bens Essenciais',
        slug: 'imposto-seletivo-cesta-basica-nacional-industria-varejo',
        summary:
          "Detalhamento da lista de produtos com isenção total e a incidência do 'imposto do pecado' sobre bebidas açucaradas, veículos poluentes e minerais, redefinindo preços relativos no mercado interno.",
        category: 'reforma_tributaria',
        source: 'InfoMoney / Macroeconomia',
        source_url: 'https://www.infomoney.com.br/mercados',
        image_url: 'https://img.usecurling.com/p/800/450?q=supermarket+consumer+goods',
        read_time_minutes: 3,
        published_at: '2025-02-26 11:20:00',
        is_featured: false,
        ai_analysis:
          'A cesta básica nacional com alíquota zero reduzirá a regressividade tributária, enquanto o Imposto Seletivo alterará a matriz de margem de produtos com externalidades negativas.',
      },
      {
        title:
          'Copom sinaliza cautela com pressões fiscais e mantém política monetária restritiva para ancoragem da inflação',
        slug: 'copom-cautela-pressao-fiscal-politica-monetaria-selic',
        summary:
          'Na ata mais recente, o Banco Central reiterou a necessidade de horizonte prolongado de juros elevados para convergir as expectativas de IPCA à meta contínua de 3%, destacando a dinâmica do mercado de trabalho aquecido.',
        category: 'economia',
        source: 'Banco Central do Brasil / Relatórios',
        source_url: 'https://www.bcb.gov.br',
        image_url: 'https://img.usecurling.com/p/800/450?q=central+bank+building+architecture',
        read_time_minutes: 4,
        published_at: '2025-02-28 08:15:00',
        is_featured: true,
        ai_analysis:
          'O diferencial de juros real no Brasil segue entre os mais atrativos globalmente, mas encarece o custo da dívida soberana e impõe despesas financeiras severas sobre empresas alavancadas.',
      },
      {
        title:
          'Comércio Exterior e Balança Comercial batem novo recorde de superávit com exportações do agronegócio e petróleo',
        slug: 'balanca-comercial-recorde-superavit-agro-petroleo',
        summary:
          'O saldo comercial brasileiro manteve trajetória robusta impulsionado pelos embarques recordes de soja, minério de ferro e óleo bruto, fortalecendo as reservas cambiais e amortecendo a volatilidade do Dólar.',
        category: 'mercados',
        source: 'Ministério do Desenvolvimento, Indústria e Comércio',
        source_url: 'https://www.gov.br/mdic',
        image_url: 'https://img.usecurling.com/p/800/450?q=cargo+ship+shipping+container',
        read_time_minutes: 3,
        published_at: '2025-02-27 18:00:00',
        is_featured: false,
        ai_analysis:
          'O superávit comercial atua como âncora externa indispensável para a solvência do balanço de pagamentos, contendo picos de desvalorização do Real em períodos de aversão a risco no exterior.',
      },
      {
        title:
          'Arcabouço Fiscal e Meta de Resultado Primário: Desafios na Arrecadação e no Controle de Despesas Obrigatórias',
        slug: 'arcabouco-fiscal-meta-resultado-primario-despesas',
        summary:
          'Análise técnica sobre o cumprimento das metas fiscais fixadas para o exercício corrente, diante do crescimento indexado dos benefícios previdenciários e pisos constitucionais de saúde e educação.',
        category: 'politica_fiscal',
        source: 'Tesouro Nacional / IFI Senado',
        source_url: 'https://www.tesourotransparente.gov.br',
        image_url: 'https://img.usecurling.com/p/800/450?q=financial+documents+calculator',
        read_time_minutes: 6,
        published_at: '2025-02-25 14:10:00',
        is_featured: false,
        ai_analysis:
          'A sustentabilidade da dívida pública bruta em relação ao PIB depende de medidas estruturais de contenção de gastos, sem as quais a confiança dos agentes econômicos continuará volátil.',
      },
      {
        title:
          'Mercado de Trabalho e Desemprego em Mínimas Históricas: Efeitos sobre a Massa Salarial e a Inflação de Serviços',
        slug: 'mercado-trabalho-pnad-massa-salarial-inflacao-servicos',
        summary:
          'A taxa de desocupação apurada pelo IBGE atinge níveis não vistos há mais de uma década, impulsionando o consumo das famílias enquanto adiciona pressões de custos para o setor terciário.',
        category: 'economia',
        source: 'IBGE / PNAD Contínua',
        source_url: 'https://www.ibge.gov.br',
        image_url: 'https://img.usecurling.com/p/800/450?q=modern+workplace+team+city',
        read_time_minutes: 4,
        published_at: '2025-02-24 10:00:00',
        is_featured: false,
        ai_analysis:
          'O aquecimento do mercado de trabalho fortalece as receitas varejistas, mas exige atenção especial do Banco Central quanto ao repasse dos ganhos salariais reais aos preços de serviços ao consumidor.',
      },
      {
        title:
          'Transição do ICMS e ISS para o IVA Dual: Cronograma Detalhado até 2033 e Regras para Benefícios Fiscais Vigentes',
        slug: 'transicao-icms-iss-iva-dual-cronograma-2033',
        summary:
          'Guia completo de fases da transição tributária: período de testes a partir de 2026, convivência gradual de alíquotas de 2029 a 2032 e extinção total dos tributos antigos em 2033.',
        category: 'reforma_tributaria',
        source: 'Consultoria Econômica / Publicações',
        source_url: 'https://agenciabrasil.ebc.com.br',
        image_url: 'https://img.usecurling.com/p/800/450?q=architectural+blueprint+contract',
        read_time_minutes: 5,
        published_at: '2025-02-23 16:30:00',
        is_featured: false,
        ai_analysis:
          'A coexistência de dois regimes tributários por quatro anos imporá um custo de conformidade transitório às empresas, tornando mandatório o planejamento tributário preventivo.',
      },
    ]

    for (let i = 0; i < seedNews.length; i++) {
      const item = seedNews[i]
      try {
        app.findFirstRecordByData('news_articles', 'slug', item.slug)
      } catch (_) {
        const rec = new Record(newsCol)
        rec.set('title', item.title)
        rec.set('slug', item.slug)
        rec.set('summary', item.summary)
        rec.set('category', item.category)
        rec.set('source', item.source)
        rec.set('source_url', item.source_url)
        rec.set('image_url', item.image_url)
        rec.set('read_time_minutes', item.read_time_minutes)
        rec.set('published_at', item.published_at)
        rec.set('is_featured', item.is_featured)
        rec.set('ai_analysis', item.ai_analysis)
        app.save(rec)
      }
    }
  },
  (app) => {
    try {
      app.truncateCollection(app.findCollectionByNameOrId('economic_indicators'))
    } catch (_) {}
    try {
      app.truncateCollection(app.findCollectionByNameOrId('news_articles'))
    } catch (_) {}
  },
)
