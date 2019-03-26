import React, {Component} from 'react'
import userService from '../../_services/userService';

class Profil extends Component{
    constructor(){
        super();
        this.state={
            username: ""
        }
        this.auth = new userService();
    }

    async updateUsername(){
        try{
            const username = this.auth.getUsername()
            this.setState({username : username});
            console.log('username: ',{username});
            }
        catch (e){
            console.log(e);
        }
    }

    async componentDidMount(){
        await this.updateUsername();
    }

    render(){

        return (
            <div className="container">
                <h1>{this.state.username}</h1>
            </div>);
    }
}

export default Profil;
