// Scheduled job to fetch indicators from BCB SGS API and update PocketBase
// Runs daily at 08:00 UTC and 18:00 UTC (0 8,18 * * *)
cronAdd('update_economic_indicators', '0 8,18 * * *', () => {
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
      short_name: 'Dólar',
      category: 'cambio',
      unit: 'R$',
      freq: 'Diário',
      desc: 'Cotação de fechamento da taxa de câmbio do Dólar Americano.',
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

  for (let i = 0; i < seriesMap.length; i++) {
    const item = seriesMap[i]
    try {
      // BCB SGS API endpoint for last 30 observations
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
            console.log('Updated indicator:', item.code, 'value:', latest.value)
          }
        }
      }
    } catch (err) {
      console.log('Failed to update indicator ' + item.code + ':', err.message)
    }
  }
})
