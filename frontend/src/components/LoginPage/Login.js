import React, {Component} from 'react'
import './login.css';
import userService from '../../_services/userService';
import { Link } from 'react-router-dom';
import Signup from '../SignupPage/Signup';
class Login extends Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new userService();
        this.state = {
            username: "",
            password: ""
        }
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
         //   this.Auth.props.history.replace('/');
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit(e){
        
        this.Auth.login(this.state.username, this.state.password)
        .then(res =>{
            console.log(res);
            //    this.props.history.replace('/');
        })
        .catch(err =>{
            console.error(err);
        })
    }

    render(){
        return (
            <div className="grid">
                <h1>Login</h1>
                <div>
                    <label htmlFor="uname"><b>Username</b></label>
                    <input 
                    className="grid-input" 
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(...a) => this.handleChange(...a)}/>
                    
                    <label htmlFor="pword"><b>Password</b></label>
                    <input
                    className="grid-input" 
                    name="password" 
                    type = "password"
                    placeholder="password"
                    onChange={(...a) => this.handleChange(...a)}/>
                    
                    <button
                    className="submit-button"
                    onClick={() => this.handleFormSubmit()}
                    >
                        Login
                    </button>
                </div>
                <Link to={'/signup'} onClick={()=> Signup}>Signup here</Link>
            </div>

        )
    }
}

export default Login;
