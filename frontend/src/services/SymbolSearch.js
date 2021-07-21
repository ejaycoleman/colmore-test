import axios from 'axios'

export function searchSymbols ({ apiKey, symbol, type, region, timezone, currency, matchscore }) {
  axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'SYMBOL_SEARCH',
      apikey: apiKey,
      keywords: symbol
    }
  })
    .then(function (response) {
      // Response
      console.log(response)
    })
    .catch(function (error) {
      // Error
      console.log(error)
    })
}
