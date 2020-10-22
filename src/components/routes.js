import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SecureRoute from '../utils/SecureRoute'

import Home from '../pages/Home'
import StuffDetail from '../pages/StuffDetail'
import Error from '../pages/Error'
import Search from '../pages/Search'
import Stuff from '../pages/Stuff'
import AddStuff from '../pages/AddStuff'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'

const Routes = () => {
    return (
        <main style={{paddingBottom: 150}}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/detail/:title" component={StuffDetail} />
                <Route path="/search/:query" component={Search} />
                <Route path="/stuff" component={Stuff} />
                <Route path="/login" component={Login} />
                <SecureRoute path="/post" component={AddStuff} />
                <SecureRoute path="/profile/" component={Profile} />
                <SecureRoute path="/user/:id" component={EditProfile} />
                <Route component={Error} />
            </Switch>
        </main>
    )
}

export default Routes