import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './commons/components/GlobalStyles'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducer'

const createStoreWidthMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore)

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Provider
      store={createStoreWidthMiddleware(
        rootReducer, //
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
