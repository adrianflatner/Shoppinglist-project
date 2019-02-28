import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

//import components
import NavBar from './components/NavBar';
import Login from './components/LoginPage/Login';
import Shoppinglist from './components/Lister/Shoppinglist';
import {PrivateRoute} from './components/PrivateRoute';
import Shoppinglists from './components/Lister/Shoppinglists';
import Signup from './components/SignupPage/signup';


class App extends Component{
  handleLogin(username, password) {
    fetch('http://127.0.0.1:8000/api/', {
      method: "POST", 
      headers: {"www-Authenticate": `Basic ${username}:${password}`}
    })
  }
  render() {
    return (
      <div>
      <NavBar/>
      <BrowserRouter>
        <div>
          <PrivateRoute exact path='/' component={Shoppinglists}/>
          <PrivateRoute exact path='/items/:id' component={Shoppinglist}/>
          <Route path="/login" component={Login}/>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}


export default App;
