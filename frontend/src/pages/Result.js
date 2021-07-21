import React, { useState, useContext } from 'react'
import { APIKeyContext } from '../context/APIKeyContext'

import { searchSymbols } from '../services/SymbolSearch'

export default function Result () {
  const [searchTerm, setSearchTerm] = useState('')

  const [result, setResult] = useState([])

  const apiKeyContext = useContext(APIKeyContext)

  const submit = async () => {
    const symbols = await searchSymbols({ symbol: searchTerm, apiKey: apiKeyContext.apiKey })
    setResult(symbols.data.bestMatches)
  }

  return (
    <div>
      <input placeholder='search' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
      <button onClick={() => submit()}>Search</button>
      {result.map(e => JSON.stringify(e))}
    </div>
  )
}
