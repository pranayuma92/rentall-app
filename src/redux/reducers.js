import { fromJS } from 'immutable'

const initState = fromJS({
    stuff: [],
    loading: false,
    error: false,
    success: false,
    message: null,
    isAuthenticated: false,
    token: null,
    userData: {}
})

const rentReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case 'GET_STUFF_REQUEST': {
            return state
                .set('loading', true)
                .set('error', false)
        }

        case 'GET_STUFF_SUCCESS': {
            const { data } = payload
            return state
                .set('loading', false)
                .set('success', true)
                .set('stuff', fromJS(data))
        }

        case 'GET_STUFF_ERROR': {
            return state
                .set('loading', false)
                .set('error', false)
        }

        case 'DO_LOGIN' : {
            const { token } = payload
            return state
                .set('token', token)
                .set('isAuthenticated', true)
        }
        
        case 'GET_USER_DATA': {
            const { data } = payload
            return state
                .set('userData', fromJS(data))
        }

        case 'DO_LOGOUT' : {
            return state
                .set('token', null)
                .set('isAuthenticated', false)
                .set('userData', fromJS({}))
        }

        default:
            return state
    }
}

export default rentReducer