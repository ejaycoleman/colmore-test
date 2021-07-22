import React, { useContext, useState } from 'react'
import { APIKeyContext } from '../context/APIKeyContext'

import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Home () {
  const [apiKey, setApiKey] = useState('')
  const history = useHistory()

  const apiKeyContext = useContext(APIKeyContext)

  const submitApiKey = () => {
    apiKeyContext.setApiKey(apiKey)
    history.push('/result')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Enter your API key below:</h1>
        <TextField placeholder='API Key' type="text" name='apikey' value={apiKey} onChange={e => setApiKey(e.target.value)} style={{ marginBottom: '50px' }}/>
        <Button variant='contained' color='primary' onClick={() => submitApiKey()}>Set Key</Button>
      </div>
    </div>
  )
}
