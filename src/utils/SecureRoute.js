import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import jwt from 'jwt-decode'
import { toast } from 'react-toastify'
import { makeSelectToken } from '../redux/selectors'
import { doLogoutRequest } from '../redux/thunks'

const SecureRoute = ({ onDoLogout, auth, component: Component, ...rest }) => {
    useEffect(() => {
        try {
            const token = jwt(auth.get('token'))
            const currentDate = Math.floor(new Date().getTime()/1000)
           
            if(token && currentDate > token.exp){
                toast.error('Sesi login anda telah berakhir. Silahkan login kembali')
                onDoLogout()
            }
        } catch(err){
            console.log(err)
        }
    },[])

    useEffect(() => {
        if(!auth.get('isAuthenticated')){
            toast.error('Anda harus login terlebih dahulu')
        }
    }, [])

    return (
        <Route 
            {...rest}
            render={props => (
                auth.get('isAuthenticated') ? (
                    <Component {...props} />
                ) : <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
            )}/>
    )
}

const mapStateToProps = createStructuredSelector({
    auth : makeSelectToken()
})

const mapDispatchToProps = dispatch => ({
    onDoLogout: () => dispatch(doLogoutRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(SecureRoute)