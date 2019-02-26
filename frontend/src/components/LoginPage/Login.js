import React from 'react'
import './login.css';
import login from '../../_services/userService'

function Login() {
    return (
        <div className="grid">
            <h1>Login</h1>
            <input className="grid-input"  placeholder="username"/>
            <input className="grid-input"  placeholder="password" type = "password"/>
            <button onClick="">Login</button>
        </div>
    )
}
export default Login
