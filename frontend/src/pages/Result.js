import React, { useState, useContext } from 'react'
import SymbolInformation from '../components/SymbolInformation'
import { APIKeyContext } from '../context/APIKeyContext'

import { searchSymbols } from '../services/SymbolSearch'

export default function Result () {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const [result, setResult] = useState([])
  const [selected, setSelected] = useState('')

  const apiKeyContext = useContext(APIKeyContext)

  const submit = async () => {
    const symbols = await searchSymbols({ symbol: searchTerm, apiKey: apiKeyContext.apiKey, filterTerm, filterValue })
    setResult(symbols)
  }

  return (
    <div>
      <input placeholder='search' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
      <input placeholder='filter term' value={filterTerm} onChange={e => setFilterTerm(e.target.value)}></input>
      <input placeholder='filter value' value={filterValue} onChange={e => setFilterValue(e.target.value)}></input>
      <button onClick={() => submit()}>Search</button>

      <table>
        <tbody>
          {result.map((e, i) => <tr key={i}><td>{e['2. name']}: {e['1. symbol']}</td><td><button onClick={() => setSelected(e['1. symbol'])}>Show More</button></td></tr>)}
        </tbody>
      </table>
      <SymbolInformation symbol={selected} />
    </div>
  )
}
