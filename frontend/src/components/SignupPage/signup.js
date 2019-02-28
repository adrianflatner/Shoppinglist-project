import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

class Signup extends Component{


  constructor(){
    super();
  }

  render(){
    return (
        <div className="grid">
            <h1>Register</h1>
            <p> Please fill in this form to create an account.</p>
            <b>Email</b>
            <input 
            className="text-input"  
            placeholder="email" 
            type="text"/>


            <b>Username</b>
            <div classname="name">
              <input 
              className="text-input" 
              id="firstname" 
              placeholder="firstname" 
              type="username"/>
              
              <input 
              className="text-input" 
              id="lastname" 
              placeholder="lastname" 
              type="username"/>
            </div>

            
            <b>Password</b>
            
            <input 
            className="text-input"  
            placeholder="password" 
            type = "password"/>

            <b>Repeat password</b>
            <input 
            className="text-input"  
            placeholder="repeat password" 
            type = "rpassword"/>
            
            <div classname="button">
            <Link to={'/login'} onClick={()=> this.Login}>
              <button 
              onClick="" 
              class="cancelbtn"> 
                  Cancel
              </button>
              </Link>
              
              <button 
              onClick="" 
              class="signupbtn"> 
                  Signup
              </button>
             
            </div>  
      
        
        </div>
    );
  }
}
export default Signup

