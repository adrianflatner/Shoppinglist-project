import React from 'react';
import {Link} from 'react-router-dom';
import Login from './LoginPage/Login.js';
import userService from '../_services/userService.js';
import './NavBar.css';


const auth = new userService()

function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand" to="/">
        Shopping List</Link>
       
        <div className="profileName">{auth.getUsername()}</div>

        </nav>
    );
}

export default NavBar;