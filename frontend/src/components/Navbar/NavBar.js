import React, {Component} from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import Login from '../LoginPage/Login.js';
import userServices from '../../_services/userService';

const Auth = new userServices();
class NavBar extends Component{

    handleLogout() {
        Auth.logout()
        this.props.history.replace('/login');
      }

    render(){
        return (
            <div className="navbar-container">
        {(Auth.loggedIn()) ? 
            <nav className="nav">
                <Link className="navbar-brand" to="">
                Shopping List</Link>
                <Link className="navbar-brand" to=''>Profil</Link>
                <Link className="navbar-brand" to=''>Lister</Link>
                <div onClick={this.handleLogout.bind(this)}>Logout</div>
                
            </nav> :
                <nav className="nav">
                <Link className="navbar-brand" to="">
                LoggedIn</Link>
        
                {console.log(Login.stateListener)}
                
            </nav>
        }
            </div>
        )
    }
}


export default withRouter(NavBar);