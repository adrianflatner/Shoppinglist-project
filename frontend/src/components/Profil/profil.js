import React, {Component} from 'react'
import userService from '../../_services/userService';

class Profil extends Component{
    constructor(){
        super();
        this.state={
            username: "",
            userID: "",
            allergies: [],
            newAllergy: ""
        }
        this.auth = new userService();
    }

    // Gets the username from backend and updates the state.
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

    // Fetches allergies
    async updateAllergies(){
        try{
            const res = await fetch('http://127.0.0.1:8000/api/userprofiles', 
                {headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' }
            })
            const userprofile = res.json();
            this.setState({allergies : userprofile.allergies});
            console.log("Allergies: ", this.state.allergies)
        }
        catch (e){
            console.log(e);
        }
    }

    // Fetches the userID that are used for fetching information from backend.
    async updateUserID(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users', {
              headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
            });
            const users = await res.json();
            users.forEach(user => {
                if( user.username == this.state.username){
                    this.setState({userID: user.username})
                }
            });
          } catch (e) {
            console.log(e);
          }
    }

    // Function for handling changes in the allergy inputfield.
    handleChange(args){
        this.setState({
            newAllergy: args.target.value
        });
    }

    // Function for handling submition of allergies. Will be linked to userService, hence backend.
    async handleSubmission(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/groceries', {
              body: this.state.newAllergy,
              method: 'PUT',
              headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
            });
            if (res.ok) {
              await this.updateAllergies();
            }
            document.getElementById("newAllergy").value = "";
            this.setState({newAllergy : ""});
          } catch (e) {
            console.log(e);
          }
    }


    // Standard function running when component is run. Is used to initialize state.
    async componentDidMount(){
        await this.updateUsername();
        await this.updateUserID();
        await this.updateAllergies();
    }

    render(){

        return (
            <div className = "container">
                {/* Header shows username. */}
                <div>
                    <h1 className="header">Profilepage</h1>
                    <h2>Username:{this.state.username}</h2>
                </div>

                {/* Inputmodule for alergies. */}
                <div className = "new-allergy">
                    {/* Header for the module. */}
                    <h1 className = "login-text">
                    Add new allergy
                    </h1>
                    {/* Inputfield for specifying allergies. */}
                    <input className = "grid-input"
                    name = "allergy"
                    id = "newAllergy"
                    type = "text"
                    placeholder = "newAlergy"
                    onChange={(...a) => this.handleChange(...a)}/>
                    {/* Button for submitting text in above inputfield. */}
                    <button className = "submitButton"
                    onClick = {() => this.handleSubmission()}>
                    submit
                    </button>
                </div>

                {/* Grid showing an overview of current registered allergies. */}
                <div className = "allergy-list">
                    
                </div>
            </div>
        )
    }
}

export default Profil;
