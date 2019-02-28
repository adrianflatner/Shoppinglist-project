import React, { Component } from 'react'
import userService from './userService'

export default function withAuth(AuthComponent){
    const Auth = new userService('http://localhost:3000');
    return class AuthWrapped extends Component{
        
        constructor(){
            super();
            this.state = {
                user: null
            }
        }

        render(){
            if(this.state.user){
                return(
                    <AuthComponent history={this.props.history} user={this.state.user}/>
                )
            }else{
                return null
            }
        }
    }
}
