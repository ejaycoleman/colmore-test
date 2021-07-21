import axios from 'axios'
import { useContext } from 'react'
import { APIKeyContext } from '../context/APIKeyContext'

export function searchSymbols () {
  const apiKeyContext = useContext(APIKeyContext)

  axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'SYMBOL_SEARCH',
      apikey: apiKeyContext.apikey
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
