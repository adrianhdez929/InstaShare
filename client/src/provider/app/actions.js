import axios from "axios"

export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const SET_FILE_LIST = 'SET_FILE_LIST'

const setIsLoggedIn = (isLoggedIn) => ({
    type: SET_LOGGED_IN,
    payload: {
        isLoggedIn
    }
})

const setFileList = (fileList) => ({
    type: SET_FILE_LIST,
    payload: {
        fileList
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

export const fetchFileList = (dispatch) => {
    axios.get('http://localhost:8000/files/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => {
        console.log(res.data)
        dispatch(setFileList(res.data))
    })
    .catch(err => {
        console.log(err)
    })
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
