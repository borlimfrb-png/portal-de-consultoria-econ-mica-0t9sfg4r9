// Scheduled job to fetch indicators from BCB SGS API and update PocketBase
// Runs every 6 hours (0 */6 * * *)
cronAdd('update_economic_indicators', '0 */6 * * *', () => {
  const seriesMap = [
    {
      code: 'selic',
      sgsCode: '432',
      name: 'Taxa Selic Meta',
      short_name: 'Selic',
      category: 'juros',
      unit: '% a.a.',
      freq: 'Decisão Copom',
      desc: 'Taxa básica de juros da economia brasileira definida pelo Copom.',
    },
    {
      code: 'cdi',
      sgsCode: '4389',
      name: 'Certificado de Depósito Interbancário',
      short_name: 'CDI',
      category: 'juros',
      unit: '% a.a.',
      freq: 'Diário',
      desc: 'Taxa média dos empréstimos interbancários de 1 dia.',
    },
    {
      code: 'ipca_12m',
      sgsCode: '13522',
      name: 'IPCA Acumulado 12 Meses',
      short_name: 'IPCA 12m',
      category: 'inflacao',
      unit: '%',
      freq: 'Mensal',
      desc: 'Índice Nacional de Preços ao Consumidor Amplo nos últimos 12 meses.',
    },
    {
      code: 'igpm_12m',
      sgsCode: '189',
      name: 'IGP-M Acumulado 12 Meses',
      short_name: 'IGP-M 12m',
      category: 'inflacao',
      unit: '%',
      freq: 'Mensal',
      desc: 'Índice Geral de Preços do Mercado calculado pela FGV.',
    },
    {
      code: 'dolar_comercial',
      sgsCode: '1',
      name: 'Dólar Comercial (PTAX Venda)',
      short_name: 'Dólar Comercial',
      category: 'cambio',
      unit: 'R$',
      freq: 'Diário',
      desc: 'Cotação oficial de fechamento da taxa de câmbio do Dólar Americano calculada pelo Banco Central (PTAX).',
    },
    {
      code: 'euro_comercial',
      sgsCode: '21619',
      name: 'Euro Comercial (PTAX Venda)',
      short_name: 'Euro',
      category: 'cambio',
      unit: 'R$',
      freq: 'Diário',
      desc: 'Taxa de câmbio oficial do Euro frente ao Real.',
    },
    {
      code: 'taxa_desemprego',
      sgsCode: '24369',
      name: 'Taxa de Desocupação (PNAD Contínua)',
      short_name: 'Desemprego',
      category: 'atividade',
      unit: '%',
      freq: 'Móvel Trimestral',
      desc: 'Percentual de pessoas desocupadas apurado pelo IBGE.',
    },
    {
      code: 'ibc_br',
      sgsCode: '24363',
      name: 'Índice de Atividade Econômica (IBC-Br)',
      short_name: 'IBC-Br',
      category: 'atividade',
      unit: 'pts',
      freq: 'Mensal',
      desc: 'Indicador de atividade econômica do Banco Central.',
    },
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

        if (res.statusCode === 200 && Array.isArray(res.json) && res.json.length > 0) {
          const rawData = res.json
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
                '[BORLIM Indicators] Updated indicator: ' +
                  item.code +
                  ' (ref: ' +
                  latest.date +
                  ', val: ' +
                  latest.value +
                  ')',
              )
              break
            }
          }
        } else {
          console.log(
            '[BORLIM Indicators] Attempt ' +
              attempt +
              ' for ' +
              item.code +
              ' returned status ' +
              res.statusCode +
              ' or empty payload',
          )
        }
      } catch (err) {
        console.log(
          '[BORLIM Indicators] Attempt ' +
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

    if (!success) {
      failedIndicators.push(item.code)
    }
  }

  // Atualizar Dólar Turismo e Dólar Cartão a partir de cotação pública AwesomeAPI / derivada da PTAX
  try {
    let comercialVal = 0
    let comercialDate = ''
    try {
      const rec = $app.findFirstRecordByData('economic_indicators', 'code', 'dolar_comercial')
      comercialVal = rec.getFloat('current_value')
      comercialDate = rec.getString('reference_date')
    } catch (_) {}

    // 1. Tentar buscar Dólar Turismo na AwesomeAPI (USD-BRLT)
    let turismoUpdated = false
    let turismoVal = 0
    let turismoVar = 0
    let turismoDate = comercialDate || new Date().toISOString().slice(0, 10)

    try {
      const awRes = $http.send({
        url: 'https://economia.awesomeapi.com.br/json/last/USD-BRLT',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'User-Agent': 'PortalConsultoriaEconomica/1.0',
        },
        timeout: 15,
      })

      if (awRes.statusCode === 200 && awRes.json && awRes.json.USDBRLT) {
        const itemT = awRes.json.USDBRLT
        const bid = parseFloat(itemT.bid)
        const ask = parseFloat(itemT.ask)
        turismoVal = ask > 0 ? ask : bid
        turismoVar = parseFloat(itemT.varBid || '0')
        if (itemT.create_date) {
          turismoDate = itemT.create_date.slice(0, 10)
        }
      }
    } catch (e) {
      console.log('[BORLIM Indicators] Erro ao buscar AwesomeAPI USD-BRLT: ' + e.message)
    }

    // Se a API não respondeu ou deu 0, derivar com spread padrão sobre o comercial
    if (turismoVal <= 0 && comercialVal > 0) {
      turismoVal = +(comercialVal * 1.035).toFixed(4)
      turismoVar = 0.01
    }

    if (turismoVal > 0) {
      try {
        const tRec = $app.findFirstRecordByData('economic_indicators', 'code', 'dolar_turismo')
        const currentHist = tRec.get('history') || []
        const historyArr = Array.isArray(currentHist) ? currentHist : []
        const lastHist = historyArr.length > 0 ? historyArr[historyArr.length - 1] : null
        if (!lastHist || lastHist.date !== turismoDate) {
          historyArr.push({ date: turismoDate, value: turismoVal })
          if (historyArr.length > 30) historyArr.shift()
        } else {
          lastHist.value = turismoVal
        }

        const prevVal = tRec.getFloat('current_value') || +(turismoVal - turismoVar).toFixed(4)
        tRec.set('previous_value', prevVal)
        tRec.set('current_value', turismoVal)
        tRec.set('variation', +turismoVar.toFixed(4))
        tRec.set('reference_date', turismoDate)
        tRec.set('history', historyArr)
        $app.save(tRec)
        turismoUpdated = true
        updatedCount++
      } catch (_) {}
    }

    // 2. Atualizar Dólar Cartão (Base PTAX + Spread Bancário 4.0% + IOF 4.38%)
    // Alíquota legal vigente para uso de cartão de crédito no exterior: 4,38%
    const refBase = comercialVal > 0 ? comercialVal : turismoVal > 0 ? turismoVal / 1.035 : 0
    if (refBase > 0) {
      const cartaoVal = +(refBase * 1.04 * 1.0438).toFixed(4)
      const cartaoDate = comercialDate || turismoDate || new Date().toISOString().slice(0, 10)
      try {
        const cRec = $app.findFirstRecordByData('economic_indicators', 'code', 'dolar_cartao')
        const currentHist = cRec.get('history') || []
        const historyArr = Array.isArray(currentHist) ? currentHist : []
        const lastHist = historyArr.length > 0 ? historyArr[historyArr.length - 1] : null
        if (!lastHist || lastHist.date !== cartaoDate) {
          historyArr.push({ date: cartaoDate, value: cartaoVal })
          if (historyArr.length > 30) historyArr.shift()
        } else {
          lastHist.value = cartaoVal
        }

        const prevVal = cRec.getFloat('current_value') || +(cartaoVal - 0.02).toFixed(4)
        const diff = +(cartaoVal - prevVal).toFixed(4)
        cRec.set('previous_value', prevVal)
        cRec.set('current_value', cartaoVal)
        cRec.set('variation', diff)
        cRec.set('reference_date', cartaoDate)
        cRec.set('history', historyArr)
        $app.save(cRec)
        updatedCount++
      } catch (_) {}
    }
  } catch (errCambio) {
    console.log(
      '[BORLIM Indicators] Erro ao sincronizar moedas complementares: ' + errCambio.message,
    )
  }

  console.log(
    '[BORLIM Indicators] 6-hour cron update completed. Total updated: ' +
      updatedCount +
      '/' +
      seriesMap.length +
      (failedIndicators.length > 0
        ? '. Failed: ' + failedIndicators.join(', ')
        : '. All succeeded.'),
  )
})
