import React, { Component } from 'react';
import './Shoppinglists.css';

class Shoppinglist extends Component{
    state = {
      lists: [],
      listView: [],
      groceries: [],
      users: [],
      user: [],
      isUserAuth: false,
      newItem: {title: "", description: "", completed: false}
    };
    
    
    async _fetchList() {
      try{
        const res = await fetch('http://127.0.0.1:8000/api/groceries', {
          headers: {'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type':'application/json'},
        });
        const lists = await res.json();
        this.setState({
          lists
        });
      } catch (e) {
        console.log(e);
      }
    }

    async _fetchList2(id) {
      try{
        const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
          headers: {'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type':'application/json'},
        });
        const listView = await res.json();
        this.setState({
          listView: listView
        });
      } catch (e) {
        console.log(e);
      }
    }

    async _fetchUsers() {
      try{
        const res = await fetch('http://127.0.0.1:8000/api/users', {
          headers: {'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type':'application/json'},
        });
        const users = await res.json();
        this.setState({
          users: users
        });
      } catch (e) {
        console.log(e);
      }
    }

    async componentDidMount(){
      await this._fetchList();
      await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
      await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
      this.groceryID();
      if(this.userNameFromId(this.state.listView.author) === "adrian"){
        this.state.isUserAuth = true;
        this.datalistfunction();
      }      
    }


    datalistfunction(){
      var ServerResponse = [];
      this.state.users.forEach(selectUser => {
        ServerResponse.push(selectUser.username)
      })
      var datalist = document.getElementById('names');

      document.getElementById('myInput').addEventListener('keyup', function () {
          if (this.value.length === 0) {
              return;
          }

          // Send Ajax request and loop of its result

          datalist.textContent = '';
          for (var i = 0; i < ServerResponse.length; i++) {
              if (ServerResponse[i].indexOf(this.value) !== 0) {
                  continue;
              }
              var option = document.createElement('option');
              option.value = ServerResponse[i];
              datalist.appendChild(option);
          }
      });
  }


    userChange(user){
      var result;
      this.state.users.forEach(selectUser => {
        if(selectUser.username === user){
          result = selectUser.id;
        }
      })
      this.state.user = result;
    }

    userNameFromId(user){
      var result;
      this.state.users.forEach(selectUser => {
        if(selectUser.id === user){
          result = selectUser.username;
        }
      })
      return result;
    }

    users(userlist){
      var result = [];
      this.state.users.forEach(selectUser => {
        userlist.forEach(user => {
          if(selectUser.id === user){
            result.push(selectUser.username);
          }
        })
      })
      return result;
    }

    updateTitle(title){
      this.setState({
        newItem: {title, description: this.state.newItem.description}
      });
    }

    updateDescription(description){
      this.setState({
        newItem: {description, title: this.state.newItem.title}
      });

    }

    foreignKey(id) {
      this.state.listView.groceries.push(id);
      this.handleForeignKey();
    }
    
    markComplete = (id) => {
        this.setState({ lists: this.state.lists.map(grocery => {
            if(grocery.id === id){
            grocery.completed = !grocery.completed;
            this.handleMarkings(grocery, id);
          }
          return grocery;
        }) })
      }
    
    delGrocery = (id) => {
      this.setState({ lists: [...this.state.lists.filter(grocery => grocery.id !== id)]});
      this.handleDelete(id);
      
    }
      

    groceryID(){
        var result = [];
        this.state.lists.forEach(grocery => {
          this.state.listView.groceries.forEach(Id => {
            if(grocery.id === Id){
              result.push(grocery)
            }
          }
        )})
        this.setState({
          groceries: result
        });
    }

    async handleDelete(id){
      try{
        const res = await fetch(`http://127.0.0.1:8000/api/groceries/${id}/`, {
          method: 'DELETE',
          headers: {'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type':'application/json'},
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
          await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
          this.groceryID();
        }
      } catch (e) {
        console.log(e);
      }
    }

    async handleSubmit(){
      try{
        const res = await fetch('http://127.0.0.1:8000/api/groceries', {
          body: JSON.stringify(this.state.newItem),
          method: 'POST',
          headers: {'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type':'application/json'},
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
          await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
          this.groceryID();
          this.foreignKey(this.state.lists.slice(-1)[0].id);
        }
        document.getElementById("NewGrocery").value=""
        document.getElementById("Description").value=""
      } catch (e) {
        console.log(e);
      }
    
    }

    async handleForeignKey(){
      try{
        var id = window.location.pathname.match(/\d+/)[0];
        const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
          body: JSON.stringify(this.state.listView),
          method: 'PUT',
          headers: {'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type':'application/json'},
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
          await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
          this.groceryID();
        }
      } catch (e) {
        console.log(e);
      }
    
    }

    async addUser(){
      this.state.listView.users.push(this.state.user);
      try{
        var id = window.location.pathname.match(/\d+/)[0];
        const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
          body: JSON.stringify(this.state.listView),
          method: 'PUT',
          headers: {'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type':'application/json'},
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
          await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        }
      } catch (e) {
        console.log(e);
      }
    
    }

    async handleMarkings(grocery, id){
      try{
        const res = await fetch(`http://127.0.0.1:8000/api/groceries/${id}/`, {
          body: JSON.stringify(grocery),
          method: 'PUT',
          headers: {'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type':'application/json'},
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
          await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
          this.groceryID();
        }
      } catch (e) {
        console.log(e);
      }
    
    }
    /*myFunction() {
      // Declare variables
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      li = ul.getElementsByTagName('li');
    
      // Loop through all list items, and hide those who don't match the search query
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }*/
    
    render(){
      return(
        <div className="container">
          <div>
            <h3>{this.state.listView.title}</h3>
          </div>
          <br/>
          <div>
            <p>
              <input placeholder="New grocery" id="NewGrocery" onChange={(v) => this.updateTitle(v.target.value)}/>
              <input placeholder="Description" id="Description"onChange={(v) => this.updateDescription(v.target.value)}/>
              <button className="submit"onClick={() => this.handleSubmit()}>Add Grocery</button>
            </p>
          </div>
          <br/>
          {this.state.groceries.map(items => (
            <div className="listetittel">
              <p style={{textDecoration: items.completed ? 'line-through' : 'none'}} className="cardtitle">
                <input name="checkbox" type="checkbox" onChange={this.markComplete.bind(items,items.id)} />{' '}
                {items.title}
                <button className="xBtn" onClick={this.delGrocery.bind(items,items.id)}>x</button>
              </p>
              <p className="card-text">{items.description}</p>
              
            </div>

          ))}
           <br/>
          {this.state.isUserAuth ? "" : (
            <div>
              <p>
                <input type="text" id="myInput" list="names" onChange={(v) => this.userChange(v.target.value)} placeholder="Search for users.."/>
                <datalist id="names"></datalist>
                <button className="submit" onClick={() => this.addUser()}>Add User</button>
                </p>
                <div id="members">
                  <h5>Members:</h5><br/>
                  {this.users(this.state.listView.users).map(user => (
                  <p>{user}</p>
                  ))}
                </div>
            </div>
            )}
            <br/>
            
          
        </div>
            
      )
    }
  
}
export default Shoppinglist;