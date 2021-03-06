import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'

export default function App () {
  return (
    <Router>
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Switch>
          <Route path="/result">
            <Result />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
