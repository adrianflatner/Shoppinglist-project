import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';

//import components
import NavBar from './components/NavBar';
import userServices from './_services/userService';
import withAuth from './_services/withAuth';
import Shoppinglist from './components/Lister/Shoppinglist';
import Shoppinglists from './components/Lister/Shoppinglists';
import Signup from './components/SignupPage/signup';

const Auth = new userServices();
class App extends Component{
  
  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }
  render() {
    return (
      <div>
        <NavBar/>
        <h2>Welcome {this.props.username}</h2>
          <Route exact path='/' component={Shoppinglists}/>
          <Route exact path='/items/:id' component={Shoppinglist}/>
          <button type="button" className="submit-button" onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>
    );
  }
}


export default withAuth(App);
