import React, { useState, useContext } from 'react'
import SymbolInformation from '../components/SymbolInformation'
import { APIKeyContext } from '../context/APIKeyContext'

import { searchSymbols } from '../services/SymbolSearch'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

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
    <div style={{ marginTop: '100px', width: '100%' }} >
      <h1 style={{ textAlign: 'center' }}>Search for a symbol</h1>
      <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }} >
        <TextField placeholder='search' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></TextField>
        <Select
          placeholder='filter'
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          displayEmpty
          value={filterTerm}
          onChange={e => setFilterTerm(e.target.value)}
        >
          <MenuItem value='' disabled>
            Filter
          </MenuItem>
          <MenuItem value='type'>Type</MenuItem>
          <MenuItem value='region'>Region</MenuItem>
          <MenuItem value='timezone'>Time Zone</MenuItem>
          <MenuItem value='currency'>Currency</MenuItem>
          <MenuItem value='matchscore'>Match Score</MenuItem>
        </Select>
        <TextField placeholder='filter value' value={filterValue} onChange={e => setFilterValue(e.target.value)}></TextField>
        <Button onClick={() => submit()}>Search</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <table>
          <tbody>
            {result && result.map((e, i) => <tr key={i}><td>{e['2. name']}: {e['1. symbol']}</td><td><Button onClick={() => setSelected(e)}>Show More</Button></td></tr>)}
          </tbody>
        </table>
        <div style={{ width: '100%' }}>
        {selected && <SymbolInformation symbol={selected} />}
        </div>
      </div>
    </div>
  )
}
