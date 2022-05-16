import React from "react"
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"

import { store } from './provider/store'
import AppRouter from './router'

const App = () => {
  return(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default App
