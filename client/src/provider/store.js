import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logRocketMiddleware),
})

export const useAppDispatch = () => useDispatch()
