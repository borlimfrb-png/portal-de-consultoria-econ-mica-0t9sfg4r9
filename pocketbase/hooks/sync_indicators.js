// Public endpoint to trigger manual refresh of indicators
routerAdd('GET', '/backend/v1/sync/indicators', (e) => {
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

  // Calculate 12-month date range: dataInicial = today - 12 months, dataFinal = today (formatted dd/MM/yyyy)
  const now = new Date()
  const past = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

  const pad = (n) => (n < 10 ? '0' + n : '' + n)
  const dataInicial =
    pad(past.getDate()) + '/' + pad(past.getMonth() + 1) + '/' + past.getFullYear()
  const dataFinal = pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear()

  let updatedCount = 0
  const failedIndicators = []
  const debugDetails = []

  for (let i = 0; i < seriesMap.length; i++) {
    const item = seriesMap[i]
    let success = false
    const maxRetries = 3
    const url =
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.' +
      item.sgsCode +
      '/dados?formato=json&dataInicial=' +
      dataInicial +
      '&dataFinal=' +
      dataFinal

    let lastStatus = 0
    let lastError = ''
    let pointsReceived = 0

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const res = $http.send({
          url: url,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'User-Agent': 'PortalConsultoriaEconomica/1.0',
          },
          timeout: 35,
        })

        lastStatus = res.statusCode

        if (res.statusCode === 200 && Array.isArray(res.json) && res.json.length > 0) {
          const rawData = res.json
          pointsReceived = rawData.length
          const history = []

          for (let j = 0; j < rawData.length; j++) {
            const pt = rawData[j]
            // date comes as dd/MM/yyyy
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
              success = true
              console.log(
                '[BORLIM Indicators Sync] Updated indicator: ' +
                  item.code +
                  ' (ref: ' +
                  latest.date +
                  ', val: ' +
                  latest.value +
                  ', count: ' +
                  history.length +
                  ')',
              )
              break
            }
          }
        } else {
          console.log(
            '[BORLIM Indicators Sync] Attempt ' +
              attempt +
              ' for ' +
              item.code +
              ' returned status ' +
              res.statusCode +
              ' or empty payload',
          )
        }
      } catch (err) {
        lastError = err.message
        console.log(
          '[BORLIM Indicators Sync] Attempt ' +
            attempt +
            ' failed for ' +
            item.code +
            ': ' +
            err.message,
        )
      }

      if (attempt < maxRetries) {
        sleep(2000)
      }
    }

    debugDetails.push({
      code: item.code,
      sgsCode: item.sgsCode,
      success: success,
      status: lastStatus,
      points: pointsReceived,
      error: lastError,
    })

    if (!success) {
      failedIndicators.push(item.code)
    }
  }

  console.log(
    '[BORLIM Indicators Sync] Sync completed. Total updated: ' +
      updatedCount +
      '/' +
      seriesMap.length +
      (failedIndicators.length > 0
        ? '. Failed: ' + failedIndicators.join(', ')
        : '. All succeeded.'),
  )

  return e.json(200, {
    success: true,
    message: 'Indicadores sincronizados com sucesso.',
    updated: updatedCount,
    total: seriesMap.length,
    failed: failedIndicators,
    debug: debugDetails,
  })
})

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

  // Calculate 12-month date range: dataInicial = today - 12 months, dataFinal = today (formatted dd/MM/yyyy)
  const now = new Date()
  const past = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

  const pad = (n) => (n < 10 ? '0' + n : '' + n)
  const dataInicial =
    pad(past.getDate()) + '/' + pad(past.getMonth() + 1) + '/' + past.getFullYear()
  const dataFinal = pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear()

  let updatedCount = 0
  const failedIndicators = []
  const debugDetails = []

  for (let i = 0; i < seriesMap.length; i++) {
    const item = seriesMap[i]
    let success = false
    const maxRetries = 3
    const url =
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.' +
      item.sgsCode +
      '/dados?formato=json&dataInicial=' +
      dataInicial +
      '&dataFinal=' +
      dataFinal

    let lastStatus = 0
    let lastError = ''
    let pointsReceived = 0

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const res = $http.send({
          url: url,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'User-Agent': 'PortalConsultoriaEconomica/1.0',
          },
          timeout: 35,
        })

        lastStatus = res.statusCode

        if (res.statusCode === 200 && Array.isArray(res.json) && res.json.length > 0) {
          const rawData = res.json
          pointsReceived = rawData.length
          const history = []

          for (let j = 0; j < rawData.length; j++) {
            const pt = rawData[j]
            // date comes as dd/MM/yyyy
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
              success = true
              console.log(
                '[BORLIM Indicators Sync] Updated indicator: ' +
                  item.code +
                  ' (ref: ' +
                  latest.date +
                  ', val: ' +
                  latest.value +
                  ', count: ' +
                  history.length +
                  ')',
              )
              break
            }
          }
        } else {
          console.log(
            '[BORLIM Indicators Sync] Attempt ' +
              attempt +
              ' for ' +
              item.code +
              ' returned status ' +
              res.statusCode +
              ' or empty payload',
          )
        }
      } catch (err) {
        lastError = err.message
        console.log(
          '[BORLIM Indicators Sync] Attempt ' +
            attempt +
            ' failed for ' +
            item.code +
            ': ' +
            err.message,
        )
      }

      if (attempt < maxRetries) {
        sleep(2000)
      }
    }

    debugDetails.push({
      code: item.code,
      sgsCode: item.sgsCode,
      success: success,
      status: lastStatus,
      points: pointsReceived,
      error: lastError,
    })

    if (!success) {
      failedIndicators.push(item.code)
    }
  }

  console.log(
    '[BORLIM Indicators Sync] Manual sync completed. Total updated: ' +
      updatedCount +
      '/' +
      seriesMap.length +
      (failedIndicators.length > 0
        ? '. Failed: ' + failedIndicators.join(', ')
        : '. All succeeded.'),
  )

  return e.json(200, {
    success: true,
    message: 'Indicadores sincronizados com sucesso.',
    updated: updatedCount,
    total: seriesMap.length,
    failed: failedIndicators,
    debug: debugDetails,
  })
})
