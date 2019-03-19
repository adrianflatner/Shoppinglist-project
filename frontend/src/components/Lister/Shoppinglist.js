import React, { Component } from 'react';
import './Shoppinglists.css';
import userService from '../../_services/userService';

class Shoppinglist extends Component {

  // First thing that happens when "this" is defined. State keeps info for the object.
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      listView: [],
      groceries: [],
      users: [],
      user: [],
      isUserAuth: false,
      newItem: { title: "", description: "", completed: false, author: "" }
    };
    this.auth = new userService();
  }

  // Fetches groceries and adds them to state 
  async _fetchGroceries() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/groceries', {
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      const lists = await res.json();
      this.setState({
        lists
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Fetches lists and adds them to state
  async _fetchList(id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      const listView = await res.json();
      this.setState({
        listView: listView
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Fetches users and adds them to state
  async _fetchUsers() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/users', {
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      const users = await res.json();
      this.setState({
        users: users
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Functions that executes when page is rendered
  async componentDidMount() {
    await this._fetchGroceries();
    await this._fetchList(window.location.pathname.match(/\d+/)[0]);
    await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
    this.groceryID();
    this.authenticateUser();
    this.setAuthor();
  }

  //Sets author to grocery when new grocery is made
  setAuthor(){
    this.state.newItem.author = this.idFromUsername(this.auth.getUsername());
  }

  // Checks if user is author of list
  authenticateUser(){
    if (this.userNameFromId(this.state.listView.author) === this.auth.getUsername()) {
      this.setState({
        isUserAuth: true
      });
      this.datalistfunction();
    }
  }

  // Checks if user is author of grocery
  authenticateUserGrocery(grocery){
    if (this.userNameFromId(grocery.author) === this.auth.getUsername()) {
      return true;
    }
  }

  // Makes the search field show the users that exist when a user start writing
  datalistfunction() {
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

  // Sets user to add to list
  setUser(user) {
    this.setState({
      user: this.idFromUsername(user)
    })
  }

  // Takes in user and returns the users id
  idFromUsername(user) {
    var result;
    this.state.users.forEach(selectUser => {
      if (selectUser.username === user) {
        result = selectUser.id;
      }
    })
    return result;
  }

  // Takes in id and returns the users username
  userNameFromId(user) {
    var result;
    this.state.users.forEach(selectUser => {
      if (selectUser.id === user) {
        result = selectUser.username;
      }
    })
    return result;
  }

  // Gives users apart of this list
  users(userlist) {
    var result = [];
    this.state.users.forEach(selectUser => {
      userlist.forEach(user => {
        if (selectUser.id === user) {
          result.push(selectUser.username);
        }
      })
    })
    return result;
  }

  // Updates the state when something is written in input field
  updateTitle(title) {
    this.setState({
      newItem: { title, description: this.state.newItem.description, author: this.state.newItem.author }
    });
  }

  // Same as over
  updateDescription(description) {
    this.setState({
      newItem: { description, title: this.state.newItem.title, author: this.state.newItem.author }
    });

  }

  // Updates the state of which groceries exist in the list
  foreignKey(id) {
    this.state.listView.groceries.push(id);
    this.handleForeignKey();
  }

  // Updates state of completed groceries and executes handlemarkings 
  markComplete = (id) => {
    this.setState({
      lists: this.state.lists.map(grocery => {
        if (grocery.id === id) {
          grocery.completed = !grocery.completed;
          this.handleMarkings(grocery, id);
        }
        return grocery;
      })
    })
  }

  // Deletes groceries and executes handleDelete
  delGrocery = (id) => {
    this.setState({ lists: [...this.state.lists.filter(grocery => grocery.id !== id)] });
    this.handleDelete(id);

  }

  // Function to get the correct Ids to the list
  groceryID() {
    var result = [];
    this.state.lists.forEach(grocery => {
      this.state.listView.groceries.forEach(Id => {
        if (grocery.id === Id) {
          result.push(grocery)
        }
      }
      )
    })
    this.setState({
      groceries: result
    });
  }

  // Calls api and deletes grocery in backend
  async handleDelete(id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/groceries/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.groceryID();
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Calls api and adds grocery to backend
  async handleSubmit() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/groceries', {
        body: JSON.stringify(this.state.newItem),
        method: 'POST',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.groceryID();
        this.foreignKey(this.state.lists.slice(-1)[0].id);
      }
      document.getElementById("NewGrocery").value = ""
      document.getElementById("Description").value = ""
    } catch (e) {
      console.log(e);
    }

  }

  // Makes sure the correct groceries get handled
  async handleForeignKey() {
    try {
      var id = window.location.pathname.match(/\d+/)[0];
      const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
        body: JSON.stringify(this.state.listView),
        method: 'PUT',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.groceryID();
      }
    } catch (e) {
      console.log(e);
    }

  }

  // Calls api and adds user to list
  async addUser() {
    this.state.listView.users.push(this.state.user);
    try {
      var id = window.location.pathname.match(/\d+/)[0];
      const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
        body: JSON.stringify(this.state.listView),
        method: 'PUT',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
      }
    } catch (e) {
      console.log(e);
    }

  }

    //Calls api and deletes user from list
 async deleteUser(user){
   console.log(user)
   var userid=this.idFromUsername(user)

  for( var i = 0; i < this.state.listView.users.length; i++){ 
    if ( this.state.listView.users[i] === userid) {
      this.state.listView.users.splice(i, 1); 
    }
  }
   console.log(this.state.listView)
   console.log(this.state.newItem.author)
   
  
   try {
    var id = window.location.pathname.match(/\d+/)[0];
    console.log(id)
    const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
      body: JSON.stringify(this.state.listView),
      method: 'PUT',
      headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      await this._fetchGroceries();
      await this._fetchList(window.location.pathname.match(/\d+/)[0]);
      await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
    }
  } catch (e) {
    console.log(e);
  }
  if(user===this.auth.getUsername()){
    this.props.history.replace('/');
  }
  
 }
  // Calls api and marks a grocery
  async handleMarkings(grocery, id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/groceries/${id}/`, {
        body: JSON.stringify(grocery),
        method: 'PUT',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
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

  render() {
    return (
      <div className="container">
        <div>
          <h3>{this.state.listView.title}</h3>
        </div>
        <br />
        <div>
          <p>
            <input placeholder="New grocery" id="NewGrocery" onChange={(v) => this.updateTitle(v.target.value)} />
            <input placeholder="Description" id="Description" onChange={(v) => this.updateDescription(v.target.value)} />
            <button className="submit" onClick={() => this.handleSubmit()}>Add Grocery</button>
          </p>
        </div>
        <br />
        {this.state.groceries.map(items => (
          <div className="listetittel">
            <h5 style={{ textDecoration: items.completed ? 'line-through' : 'none' }} className="listetittel">
              <input name="checkbox" type="checkbox" onChange={this.markComplete.bind(items, items.id)} />{' '}
              {items.title}
              {!(this.state.isUserAuth || this.authenticateUserGrocery(items)) ? "" : (
                <button className="xBtn" onClick={this.delGrocery.bind(items, items.id)}>x</button>
              )}
            </h5>
            <p className="comment">{items.description}</p>

          </div>

        ))}
        <br />
        {!(this.state.isUserAuth) ? "" : (
          <div>
            <p>
              <input type="text" id="myInput" list="names" onChange={(v) => this.setUser(v.target.value)} placeholder="Search for users.." />
              <datalist id="names"></datalist>
              <button className="submit" onClick={() => this.addUser()}>Add User</button>
            </p>
          </div>
        )}
        <div id="members">
          <h5>Author:</h5><br />
          <p>{this.userNameFromId(this.state.listView.author)}</p><br/>
          <h5>Members:</h5><br />
          {this.users(this.state.listView.users).map(user => (
            <p>{user}
              {!((this.state.isUserAuth || this.auth.getUsername()===user) && this.idFromUsername(user)!==this.state.newItem.author ) ? "" : (
              <button className="xBtn" onClick={()=>this.deleteUser(user)}>x</button>)}</p>
          ))}

        </div>
      </div>

    )
  }

}
export default Shoppinglist;