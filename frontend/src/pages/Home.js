import React, { useState } from 'react'

export default function Home () {
  const [apiKey, setApiKey] = useState('')

  return (
    <div>
      API Key:
      <input type="text" name="apikey" value={apiKey} onChange={e => setApiKey(e.target.value)}/>
      <button onClick={() => console.log('clicked')}>Set Key</button>
    </div>
  )
}
