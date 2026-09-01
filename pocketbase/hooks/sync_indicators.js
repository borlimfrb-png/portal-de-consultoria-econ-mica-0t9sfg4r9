// Public endpoint to trigger manual refresh of indicators and news if needed
routerAdd('POST', '/backend/v1/sync/indicators', (e) => {
  const seriesMap = [
    { code: 'selic', sgsCode: '432' },
    { code: 'cdi', sgsCode: '4389' },
    { code: 'ipca_12m', sgsCode: '13522' },
    { code: 'igpm_12m', sgsCode: '189' },
    { code: 'dolar_comercial', sgsCode: '1' },
    { code: 'euro_comercial', sgsCode: '21619' },
    { code: 'taxa_desemprego', sgsCode: '24369' },
    { code: 'ibc_br', sgsCode: '24363' },
  ]

  let updatedCount = 0
  for (let i = 0; i < seriesMap.length; i++) {
    const item = seriesMap[i]
    try {
      const url =
        'https://api.bcb.gov.br/dados/serie/bcdata.sgs.' +
        item.sgsCode +
        '/dados/ultimos/30?formato=json'
      const res = $http.send({
        url: url,
        method: 'GET',
        headers: { Accept: 'application/json', 'User-Agent': 'PortalConsultoriaEconomica/1.0' },
        timeout: 10,
      })

      if (res.statusCode === 200 && Array.isArray(res.json) && res.json.length > 0) {
        const rawData = res.json
        const history = []
        for (let j = 0; j < rawData.length; j++) {
          const pt = rawData[j]
          let dateStr = pt.data
          if (dateStr && dateStr.includes('/')) {
            const parts = dateStr.split('/')
            if (parts.length === 3) {
              dateStr = parts[2] + '-' + parts[1] + '-' + parts[0]
            }
          }
          const val = parseFloat(String(pt.valor).replace(',', '.'))
          if (!isNaN(val)) {
            history.push({ date: dateStr, value: val })
          }
        }

        if (history.length > 0) {
          const latest = history[history.length - 1]
          const previous = history.length > 1 ? history[history.length - 2] : latest
          const variation = +(latest.value - previous.value).toFixed(2)

          let record = null
          try {
            record = $app.findFirstRecordByData('economic_indicators', 'code', item.code)
          } catch (_) {}

          if (record) {
            record.set('current_value', latest.value)
            record.set('previous_value', previous.value)
            record.set('variation', variation)
            record.set('reference_date', latest.date)
            record.set('history', history)
            $app.save(record)
            updatedCount++
          }
        }
      }
    } catch (err) {
      console.log('Manual sync error for ' + item.code + ':', err.message)
    }
  }

  return e.json(200, {
    success: true,
    message: 'Indicadores sincronizados com sucesso.',
    updated: updatedCount,
  })
})
