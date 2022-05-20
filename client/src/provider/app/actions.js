import axios from "axios"

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
    if (localStorage.getItem('token') && localStorage.getItem('refresh')) {
        axios.post('http://localhost:8000/users/token/verify/', {
            token: localStorage.getItem('token')
        }).then(res => {
            dispatch(setIsLoggedIn(true))            
        }).catch(err => {
            axios.post('http://localhost:8000/users/token/refresh/', {
                refresh: localStorage.getItem('refresh')
            }).then(res => {
                localStorage.setItem('token', res.data.access)
                dispatch(setIsLoggedIn(true)) 
            }).catch(err => {
                dispatch(logout)
            })
        })
    } else {
        dispatch(setIsLoggedIn(false))
    }
}
