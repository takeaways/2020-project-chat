import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './components/GlobalStyles'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
