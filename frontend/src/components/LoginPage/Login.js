import React from 'react'
import './login.css';
import login from '../../_services/userService'
import {Link} from 'react-router-dom';


function Login() {
    return (
        <div className="grid">
            <h1>Login</h1>
            <label for="uname"><b>Brukernavn*</b></label>
            <input className="grid-input"  placeholder="username" type="username"/>
            <label for="uname"><b>Passord*</b></label>
            <input className="grid-input"  placeholder="password" type = "password"/>
            <button onClick=""> Login</button>
            <Link to={"LoginPage/signup"}>Registrer deg her</Link>

        </div>
        
    )
}
export default Login