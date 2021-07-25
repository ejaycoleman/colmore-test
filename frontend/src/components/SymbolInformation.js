import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { timeSeriesDaily, currentQuote, timeSeriesWeekly } from '../services/SymbolSearch'

import { APIKeyContext } from '../context/APIKeyContext'

import { DataGrid } from '@material-ui/data-grid'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export default function SymbolInformation ({ symbol }) {
  const [dailyInfo, setDailyInfo] = useState([])
  const [weeklyInfo, setWeeklyInfo] = useState([])
  const [currentQuoteValue, setCurrentQuoteValue] = useState({})

  const apiKeyContext = useContext(APIKeyContext)

  useEffect(async () => {
    if (symbol) {
      const dailyInfoResult = await timeSeriesDaily({ apiKey: apiKeyContext.apiKey, symbol: symbol['1. symbol'] })
      dailyInfoResult && setDailyInfo(dailyInfoResult)

      const weeklyInfoResult = await timeSeriesWeekly({ apiKey: apiKeyContext.apiKey, symbol: symbol['1. symbol'] })
      weeklyInfoResult && setWeeklyInfo(weeklyInfoResult)

      const getCurrentQuote = await currentQuote({ apiKey: apiKeyContext.apiKey, symbol: symbol['1. symbol'] })
      setCurrentQuoteValue(getCurrentQuote['Global Quote'])
    }
  }, [symbol])

  const generateDataGridColumns = (labelArray) => {
    return Object.keys(labelArray).map(x => { return { field: x, width: 200 } })
  }

  const RenderInfoTable = ({ info }) => {
    return (
      <table style={{ margin: 20 }}>
        <tbody>
          {Object.keys(info).map((key, i) => {
            const data = info[key]
            return (
              <tr key={i}>
                <td>{key}</td>
                <td>{data}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  RenderInfoTable.propTypes = {
    info: PropTypes.object
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        {
          symbol && (
            <Card style={{ margin: '10px' }}>
              <CardContent>
                <h2>Symbol Info</h2>
                <RenderInfoTable info={symbol} />
              </CardContent>
            </Card>
          )
        }
        {
          currentQuoteValue && (
            <Card style={{ margin: '10px' }}>
              <CardContent>
                <h2>Current Quote</h2>
                <RenderInfoTable info={ currentQuoteValue } />
              </CardContent>
            </Card>
          )
        }
      </div>
      <h2>Historical prices (daily)</h2>
      <div style={{ height: 400, width: '100%' }}>
        {dailyInfo.length !== 0 && <DataGrid disableColumnResize={false} rows={[...dailyInfo].slice(1)} columns={generateDataGridColumns(dailyInfo[0])} pageSize={5} />}
      </div>
      <h2>Historical prices (weekly)</h2>
      <div style={{ height: 400, width: '100%' }}>
        {weeklyInfo.length !== 0 && <DataGrid disableColumnResize={false} rows={[...weeklyInfo].slice(1)} columns={generateDataGridColumns(weeklyInfo[0])} pageSize={5} />}
      </div>
    </div>
  )
}

SymbolInformation.propTypes = {
  symbol: PropTypes.object
}
