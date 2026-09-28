migrate(
  (app) => {
    // 1. Obter a coleção library_documents e adicionar o campo category
    const col = app.findCollectionByNameOrId('library_documents')

    if (!col.fields.getByName('category')) {
      col.fields.add(
        new SelectField({
          name: 'category',
          required: false,
          values: [
            'reforma_tributaria',
            'valuation',
            'gestao_financeira',
            'planejamento',
            'precificacao',
            'outros',
          ],
          maxSelect: 1,
        }),
      )
      col.addIndex('idx_lib_category', false, 'category', '')
      app.save(col)
    }

    // 2. Atualizar os 4 documentos existentes com suas categorias temáticas correspondentes
    const updates = [
      {
        match: 'Reforma Tributária',
        category: 'reforma_tributaria',
      },
      {
        match: 'Valuation',
        category: 'valuation',
      },
      {
        match: 'Gestão Financeira',
        category: 'gestao_financeira',
      },
      {
        match: 'Formação de Preço',
        category: 'precificacao',
      },
    ]

    for (let i = 0; i < updates.length; i++) {
      const u = updates[i]
      try {
        const records = app.findRecordsByFilter(
          'library_documents',
          'title ~ "' + u.match + '"',
          '-created',
          10,
          0,
        )
        for (let j = 0; j < records.length; j++) {
          const rec = records[j]
          rec.set('category', u.category)
          app.save(rec)
        }
      } catch (e) {
        console.log('Aviso ao atualizar categoria:', e)
      }
    }
  },
  (app) => {
    try {
      const col = app.findCollectionByNameOrId('library_documents')
      col.removeIndex('idx_lib_category')
      const catField = col.fields.getByName('category')
      if (catField) {
        col.fields.remove(catField)
      }
      app.save(col)
    } catch (_) {}
  },
)
