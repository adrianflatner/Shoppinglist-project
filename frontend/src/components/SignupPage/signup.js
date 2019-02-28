import React from 'react';
import './signup.css';

function Signup() {
  return (
      <div className="grid">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <label for="mail"><b>Email</b></label>
          <input className="grid-input"  placeholder="email" type="username"/>


          <label for="uname"><b>Username</b></label>
          <div classname="name">
          <input className="grid-input" id="firstname" placeholder="firstname" type="username"/>
          <input className="grid-input" id="lastname" placeholder="lastname" type="username"/>
          </div>

          <label for="pword"><b>Password</b></label>
          <input className="grid-input"  placeholder="password" type = "password"/>

          <label for="rpword"><b>Repeat password</b></label>
          <input className="grid-input"  placeholder="repeat password" type = "rpassword"/>
          
          <div classname="button">
          <button onClick="" class="cancelbtn"> Cancel</button>
          <button onClick="" class="signupbtn"> Signup</button>
            </div>
          
      </div>
  )
}
export default Signup

