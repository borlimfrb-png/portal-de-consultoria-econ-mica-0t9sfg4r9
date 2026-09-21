migrate(
  (app) => {
    const indicatorsCol = app.findCollectionByNameOrId('economic_indicators')

    // Helper date formatter
    const formatDate = (date) => {
      const pad = (n) => (n < 10 ? '0' + n : '' + n)
      return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
    }

    const generateHistory = (current, drift, noise, points, endDateStr) => {
      const hist = []
      const end = endDateStr ? new Date(endDateStr) : new Date()
      for (let i = points - 1; i >= 0; i--) {
        const d = new Date(end)
        d.setDate(d.getDate() - i * 3)
        const dateStr = formatDate(d)
        const progress = (points - 1 - i) / (points - 1)
        const base = current - drift * (1 - progress)
        const rand = (Math.sin(i * 1.5) + Math.cos(i * 0.7)) * noise
        const val = +(base + rand).toFixed(4)
        hist.push({ date: dateStr, value: Math.max(0.01, val) })
      }
      return hist
    }

    // 1. Atualizar rótulo do Dólar Comercial existente
    try {
      const dolarComercial = app.findFirstRecordByData(
        'economic_indicators',
        'code',
        'dolar_comercial',
      )
      dolarComercial.set('name', 'Dólar Comercial (PTAX Venda)')
      dolarComercial.set('short_name', 'Dólar Comercial')
      dolarComercial.set(
        'description',
        'Cotação oficial de fechamento da taxa de câmbio do Dólar Americano calculada pelo Banco Central (PTAX).',
      )
      app.save(dolarComercial)
    } catch (_) {}

    // Pegar valor base do dólar comercial ou fallback
    let baseValue = 5.75
    let baseDate = '2025-02-28'
    try {
      const dc = app.findFirstRecordByData('economic_indicators', 'code', 'dolar_comercial')
      const val = dc.getFloat('current_value')
      if (val && !isNaN(val) && val > 0) {
        baseValue = val
      }
      const rDate = dc.getString('reference_date')
      if (rDate) {
        baseDate = rDate
      }
    } catch (_) {}

    // 2. Dólar Turismo
    try {
      app.findFirstRecordByData('economic_indicators', 'code', 'dolar_turismo')
    } catch (_) {
      const turismoVal = +(baseValue * 1.035).toFixed(4) // ~3.5% acima do comercial
      const turismoPrev = +(turismoVal - 0.02).toFixed(4)
      const rec = new Record(indicatorsCol)
      rec.set('code', 'dolar_turismo')
      rec.set('name', 'Dólar Turismo (Venda)')
      rec.set('short_name', 'Dólar Turismo')
      rec.set('category', 'cambio')
      rec.set('current_value', turismoVal)
      rec.set('previous_value', turismoPrev)
      rec.set('variation', 0.02)
      rec.set('unit', 'R$')
      rec.set('frequency', 'Tempo Real / Diário')
      rec.set('reference_date', baseDate)
      rec.set('source', 'AwesomeAPI / Mercado de Câmbio')
      rec.set('source_code', 'USD-BRLT')
      rec.set(
        'description',
        'Cotação do Dólar Turismo para viagens internacionais, aquisição de papel-moeda em espécie e cartões pré-pagos.',
      )
      rec.set('display_order', 6)
      rec.set('is_featured', true)
      rec.set('history', generateHistory(turismoVal, -0.15, 0.04, 30, baseDate))
      app.save(rec)
    }

    // 3. Dólar Cartão
    try {
      app.findFirstRecordByData('economic_indicators', 'code', 'dolar_cartao')
    } catch (_) {
      // Dólar Cartão: PTAX comercial + spread bancário emissor (~4.0%) + IOF cartão crédito internacional (4.38%)
      // Efetivo total: comercial * (1 + 0.04) * (1 + 0.0438) ≈ comercial * 1.0855
      const cartaoVal = +(baseValue * 1.0855).toFixed(4)
      const cartaoPrev = +(cartaoVal - 0.03).toFixed(4)
      const rec = new Record(indicatorsCol)
      rec.set('code', 'dolar_cartao')
      rec.set('name', 'Dólar Cartão (Crédito Internacional)')
      rec.set('short_name', 'Dólar Cartão')
      rec.set('category', 'cambio')
      rec.set('current_value', cartaoVal)
      rec.set('previous_value', cartaoPrev)
      rec.set('variation', 0.03)
      rec.set('unit', 'R$')
      rec.set('frequency', 'Cálculo Regulatório / Diário')
      rec.set('reference_date', baseDate)
      rec.set('source', 'PTAX BCB + Spread Médio Bancário + IOF 4,38%')
      rec.set('source_code', 'USD-CARD')
      rec.set(
        'description',
        'Cotação efetiva estimada para transações em cartão de crédito no exterior, considerando a PTAX oficial do Banco Central acrescida do spread médio praticado pelos bancos (4,0%) e a alíquota vigente do IOF (4,38%).',
      )
      rec.set('display_order', 7)
      rec.set('is_featured', true)
      rec.set('history', generateHistory(cartaoVal, -0.18, 0.05, 30, baseDate))
      app.save(rec)
    }

    // 4. Reordenar outros indicadores para acomodar os novos
    const orderMap = [
      { code: 'selic', order: 1 },
      { code: 'cdi', order: 2 },
      { code: 'ipca_12m', order: 3 },
      { code: 'igpm_12m', order: 4 },
      { code: 'dolar_comercial', order: 5 },
      { code: 'dolar_turismo', order: 6 },
      { code: 'dolar_cartao', order: 7 },
      { code: 'euro_comercial', order: 8 },
      { code: 'taxa_desemprego', order: 9 },
      { code: 'ibc_br', order: 10 },
    ]

    for (let i = 0; i < orderMap.length; i++) {
      try {
        const rec = app.findFirstRecordByData('economic_indicators', 'code', orderMap[i].code)
        rec.set('display_order', orderMap[i].order)
        app.save(rec)
      } catch (_) {}
    }
  },
  (app) => {
    try {
      const t = app.findFirstRecordByData('economic_indicators', 'code', 'dolar_turismo')
      app.delete(t)
    } catch (_) {}
    try {
      const c = app.findFirstRecordByData('economic_indicators', 'code', 'dolar_cartao')
      app.delete(c)
    } catch (_) {}
  },
)
