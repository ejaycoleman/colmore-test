import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { timeSeriesDaily, currentQuote } from '../services/SymbolSearch'

import { APIKeyContext } from '../context/APIKeyContext'

export default function SymbolInformation ({ symbol }) {
  const [dailyInfo, setDailyInfo] = useState([])
  const [currentQuoteValue, setCurrentQuoteValue] = useState({})

  const apiKeyContext = useContext(APIKeyContext)

  useEffect(async () => {
    if (symbol) {
      console.log(symbol['1. symbol'])
      const dailyInfoResult = await timeSeriesDaily({ apiKey: apiKeyContext.apiKey, symbol: symbol['1. symbol'] })
      dailyInfoResult && setDailyInfo(dailyInfoResult.data)

      const getCurrentQuote = await currentQuote({ apiKey: apiKeyContext.apiKey, symbol: symbol['1. symbol'] })
      setCurrentQuoteValue(getCurrentQuote['Global Quote'])
    }
  }, [symbol])

  return (
    <div>
      <h2>Symbol Info</h2>
      <table style={{ margin: 20 }}>
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
      <h2>Current Quote</h2>
      <table style={{ margin: 20 }}>
        <tbody>
          {Object.keys(currentQuoteValue).map((key, i) => {
            const data = currentQuoteValue[key]
            return (
              <tr key={i}>
                <td>{key}</td>
                <td>{data}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <h2>Historical prices (daily)</h2>
      {dailyInfo && (
        <table>
          <tbody>
            {
              dailyInfo.map((row, i) => <tr key={i} style={{ fontWeight: i === 0 ? 'bold' : 'normal' }}>{row.map((col, j) => <td key={j}>{col}</td>)}</tr>)
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
