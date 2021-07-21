import React from 'react'
import PropTypes from 'prop-types'

export default function SymbolInformation ({ symbol }) {
  return (
    <div>
      <table>
        <tbody>
          {Object.keys(symbol).map((key, i) => {
            const data = symbol[key]
            return (
              <tr key={i}>
                <td>{key}</td>
                <td>{data}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

SymbolInformation.propTypes = {
  symbol: PropTypes.object
}
