import React from 'react'
import PropTypes from 'prop-types'

export const APIKeyContext = React.createContext()

export const APIkeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = React.useState('')

  return (
    <APIKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </APIKeyContext.Provider>
  )
}

APIkeyProvider.propTypes = {
  children: PropTypes.object
}
