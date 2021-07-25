import axios from 'axios'

import Papa from 'papaparse'

export async function searchSymbols ({ apiKey, symbol, filterTerm, filterValue }) {
  return await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'SYMBOL_SEARCH',
      apikey: apiKey,
      keywords: symbol
    }
  })
    .then(response => {
      let data = response.data.bestMatches

      if (filterTerm && filterValue) {
        data = data.filter(e => {
          const name = Object.keys(e).find(f => f.includes(filterTerm))
          return e[name] === filterValue
        })
      }

      return data
    })
    .catch(error => {
      console.log(error)
    })
}

export async function timeSeriesDaily ({ apiKey, symbol }) {
  return await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'TIME_SERIES_INTRADAY_EXTENDED',
      apikey: apiKey,
      symbol,
      interval: '60min',
      slice: 'year1month1'
    }
  })
    .then(response => {
      const csvParsed = Papa.parse(response.data)

      const newData = csvParsed.data.map((row, i) => {
        return {
          id: i,
          time: row[0],
          open: row[1],
          high: row[2],
          low: row[3],
          close: row[4],
          volume: row[5]
        }
      })

      return newData
    })
    .catch(error => {
      console.log(error)
    })
}

export async function timeSeriesWeekly ({ apiKey, symbol }) {
  return await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'TIME_SERIES_WEEKLY',
      apikey: apiKey,
      symbol
    }
  })
    .then(response => {
      const newData = Object.keys(response.data['Weekly Time Series']).map((row, i) => {
        return {
          id: i,
          time: row,
          ...response.data['Weekly Time Series'][row]
        }
      })

      return newData
    })
    .catch(error => {
      console.log(error)
    })
}

export async function currentQuote ({ apiKey, symbol }) {
  return await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'GLOBAL_QUOTE',
      apikey: apiKey,
      symbol
    }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}
