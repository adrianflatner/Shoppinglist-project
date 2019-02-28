import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Route, withRouter} from 'react-router-dom';

//import components
import NavBar from './components/NavBar';
import userServices from './_services/userService';
import Shoppinglist from './components/Lister/Shoppinglist';
import Shoppinglists from './components/Lister/Shoppinglists';
import Login from './components/LoginPage/Login'
import Signup from './components/SignupPage/Signup';

const Auth = new userServices();
class App extends Component{
  
  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }

  componentWillMount(){
    if(!Auth.loggedIn()){
        this.props.history.replace('/login')
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <h2>Welcome</h2>
        <Route exact path='/' component={Shoppinglists}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/items/:id' component={Shoppinglist}/>
        <button type="button" className="submit-button" onClick={this.handleLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}


export default withRouter(App);
