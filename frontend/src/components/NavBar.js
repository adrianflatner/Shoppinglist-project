import React from 'react';
import {Link} from 'react-router-dom';
import Login from './LoginPage/Login.js';




function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand" to="/">
        Shopping List</Link>
       
        {console.log(Login.stateListener)}

        </nav>
    );
}

export default NavBar;