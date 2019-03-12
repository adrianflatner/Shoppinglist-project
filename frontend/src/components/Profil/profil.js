import React, {Component} from 'react';
import userService from '../../_services/userService';

class Profil extends Component{
 /*     constructor(){
    this.state = {
    };
     this.auth = new userService(); 
    }  */

      /*   async fetchUserInfo(){ // Skal hente username og oppdatere state. Nå tar den alle usernames
            try{
                const username = await this.auth.fetch('http://127.0.0.1:8000/api/users');
                console.log(username)
                this.setState({
                    username
                });
            }
            catch (e){
                console(e);
            }
        } */


    render(){
        return(
            <div className="container">
                <h1>
                    brukernavn:JA
                </h1>
                {/*{this.state.map(function(value, lable){
                    <h3>{lable}: {value}</h3>
                })}*/}
            </div>
        );
    }
}

export default Profil;