import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import ShoppingLists from './components/Shoppinglists';
import Shoppinglist from './components/Shoppinglist';
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
        <Route exact path='/' component={ShoppingLists}/>
        <Route exact path='/items/:id' component={Shoppinglist}/>
      </div>
    );
  }
}


export default App;
