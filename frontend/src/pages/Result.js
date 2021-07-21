import React, { useState, useContext } from 'react'
import { APIKeyContext } from '../context/APIKeyContext'

import { searchSymbols } from '../services/SymbolSearch'

export default function Result () {
  const [searchTerm, setSearchTerm] = useState('')
  const apiKeyContext = useContext(APIKeyContext)

  const submit = () => {
    searchSymbols({ symbol: searchTerm, apiKey: apiKeyContext.apiKey })
  }

  return (
    <div>
      <input placeholder='search' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
      <button onClick={() => submit()}>Search</button>
    </div>
  )
}
