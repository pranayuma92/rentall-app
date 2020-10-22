import { request } from '../utils/API'
import { notification } from '../utils/helpers'
import jwt from 'jwt-decode'
import { 
    getStuffRequset, 
    getStuffSuccess, 
    getStuffError,
    doLogin,
    doLogout,
    getUserData
} from './actions'

export const loadStuff = (flag = 'stuff') => async dispatch => {
    try {
        dispatch(getStuffRequset())
        const response = await request('get', flag)
        dispatch(getStuffSuccess(response))
    } catch(error){
        dispatch(getStuffError())
    }
}

export const doLoginRequest = data => async dispatch => {
    try {
        notification('Mengubungi server...')
        const response = await request('post', 'login', data)
        if(response){
            const token = jwt(response.accessToken)
            dispatch(doLogin(response.accessToken))
            dispatch(getUserDataRequest(token.sub))
            notification('Login berhasil')
        } else {
            notification('Terjadi kesalahan. Silahkan coba lagi')
        }
    } catch(error){
        notification(error)
    }
}

export const getUserDataRequest = id => async dispatch => {
    try {
        const response = await request('get', `users/${id}`)
        if(response){
            dispatch(getUserData(response))
        }
    } catch(error){
        console.log(error)
    }
}

export const doLogoutRequest = () => dispatch => {
    dispatch(doLogout())
}