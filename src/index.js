import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { configureStore } from './redux/store'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

const store = configureStore()
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate 
        loading={<div>Loading...</div>}
        persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
