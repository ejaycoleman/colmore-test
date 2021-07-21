import React from 'react'
import PropTypes from 'prop-types'

export default function SymbolInformation ({ symbol }) {
  return (
    <div>
      {symbol}
    </div>
  )
}

SymbolInformation.propTypes = {
  symbol: PropTypes.string
}
