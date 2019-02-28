import React, { Component } from 'react';
import './Signup.css';
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
            <label htmlFor="mail"><b>Email</b></label>
            <input 
            className="text-input"  
            placeholder="email" 
            type="text"/>


            <label htmlFor="uname"><b>Username</b></label>
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

            <label htmlFor="pword">
              <b>Password</b>
            </label>
            <input 
            className="text-input"  
            placeholder="password" 
            type = "password"/>

            <label htmlFor="rpword"><b>Repeat password</b></label>
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

