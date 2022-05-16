import * as actions from './actions'
import { STATE_NAME, initialState } from './state'

export { STATE_NAME }

export default function AppReducer (state = initialState, action) {
    switch(action.type) {
        case actions.SET_LOGGED_IN:
            const { isLoggedIn } = action.payload
            return {
                ...state, isLoggedIn
            }

        default:
            return state
    }
}
