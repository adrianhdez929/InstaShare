import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { STATE_NAME } from './state'


export const getIsLoggedIn = (state) => state[STATE_NAME].isLoggedIn
