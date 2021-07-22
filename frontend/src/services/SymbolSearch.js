import axios from 'axios'

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
      // let data = response.data.bestMatches
      console.log(response)
      return response
    })
    .catch(error => {
      console.log(error)
    })
}
