import axios from 'axios'

export async function searchSymbols ({ apiKey, symbol, type, region, timezone, currency, matchscore }) {
  return await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'SYMBOL_SEARCH',
      apikey: apiKey,
      keywords: symbol
    }
  })
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(error)
    })
}
