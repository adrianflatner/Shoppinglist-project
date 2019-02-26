import React, { Component } from 'react'
import {BrowserRouter as Route, Redirect} from 'react-router-dom'

export const PrivateRoute = ({component: Comment, ...rest})=> (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: {from:props.location}}} />
    )}/>
)