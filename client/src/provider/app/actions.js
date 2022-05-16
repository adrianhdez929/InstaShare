export const SET_LOGGED_IN = 'SET_LOGGED_IN'

const setIsLoggedIn = (isLoggedIn) => ({
    type: SET_LOGGED_IN,
    payload: {
        isLoggedIn
    }
})

export const logout = (dispatch) => {
    dispatch(setIsLoggedIn(false))

    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
};

export const login = (dispatch) => {
    dispatch(setIsLoggedIn(true))
}

export const checkIsLoggedIn = (dispatch) => {
    if (localStorage.getItem('token') && localStorage.getItem('refresh'))
        dispatch(setIsLoggedIn(true))
}
