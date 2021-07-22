import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { timeSeriesDaily } from '../services/SymbolSearch'

import { APIKeyContext } from '../context/APIKeyContext'

export default function SymbolInformation ({ symbol }) {
  const [dailyInfo, setDailyInfo] = useState([])

  useEffect(async () => {
    if (symbol) {
      console.log(symbol['1. symbol'])
      const dailyInfoResult = await timeSeriesDaily({ apiKey: APIKeyContext.apiKey, symbol: symbol['1. symbol'] })
      dailyInfoResult && setDailyInfo(dailyInfoResult.data)
    }
  }, [symbol])

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
      {dailyInfo && (
        <table>
          <tbody>
            {
              dailyInfo.map((row, i) => <tr key={i}>{row.map((col, j) => <td key={j}>{col}</td>)}</tr>)
            }
          </tbody>
        </table>
      )}
    </div>
  )
}

SymbolInformation.propTypes = {
  symbol: PropTypes.object
}
