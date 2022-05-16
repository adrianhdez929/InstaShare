import { combineReducers } from '@reduxjs/toolkit'

import AppReducer, { STATE_NAME as APP_STATE_NAME } from './app/reducer'

const rootReducer = combineReducers({
    [APP_STATE_NAME]: AppReducer
})

export default rootReducer
