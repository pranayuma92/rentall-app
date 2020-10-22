export const getStuffRequset = () => ({
    type: 'GET_STUFF_REQUEST'
})

export const getStuffSuccess = data => ({
    type: 'GET_STUFF_SUCCESS',
    payload: { data }
})

export const getStuffError = () => ({
    type: 'GET_STUFF_ERROR'
})

export const doLogin = token => ({
    type: 'DO_LOGIN',
    payload: { token }
})

export const doLogout = () => ({
    type: 'DO_LOGOUT'
})

export const getUserData = data => ({
    type: 'GET_USER_DATA',
    payload: { data }
})