import React, { useContext, useState } from 'react'
import { APIKeyContext } from '../context/APIKeyContext'

import { useHistory } from 'react-router-dom'

export default function Home () {
  const [apiKey, setApiKey] = useState('')
  const history = useHistory()

  const apiKeyContext = useContext(APIKeyContext)

  const submitApiKey = () => {
    apiKeyContext.setApiKey(apiKey)
    history.push('/result')
  }

  return (
    <div>
      API Key:
      <input type="text" name="apikey" value={apiKey} onChange={e => setApiKey(e.target.value)}/>
      <button onClick={() => submitApiKey()}>Set Key</button>
    </div>
  )
}
