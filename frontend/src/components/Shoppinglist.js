import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Shoppinglists.css';

class Shoppinglist extends Component{
    state = {
      lists: [],
      listView: [],
      groceries: [],
      newItem: {title: "", description: "", completed: false}
    };
    
    
    async _fetchList() {
      try{
        const res = await fetch('http://127.0.0.1:8000/api/groceries');
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
        const res = await fetch(`http://127.0.0.1:8000/api/${id}/`);
        const listView = await res.json();
        this.setState({
          listView: listView
        });
      } catch (e) {
        console.log(e);
      }
    }

    async componentDidMount(){
      await this._fetchList();
      await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
      this.groceryID();
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
          console.log(grocery);
          this.state.listView.groceries.forEach(Id => {
            console.log(Id);
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
          headers: {"Content-Type": "application/json"}
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
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
          headers: {"Content-Type": "application/json"}
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
          this.groceryID();
          this.foreignKey(this.state.lists.slice(-1)[0].id);
          document.getElementById("NewGrocery").value=""
          document.getElementById("Description").value=""
        }
        
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
          headers: {"Content-Type": "application/json"}
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
          this.groceryID();
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
          headers: {"Content-Type": "application/json"}
        });
        if(res.ok){
          await this._fetchList(); 
          await this._fetchList2(window.location.pathname.match(/\d+/)[0]);
          this.groceryID();
        }
      } catch (e) {
        console.log(e);
      }
    
    }

    
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
              <input placeholder="Description" id="Description" onChange={(v) => this.updateDescription(v.target.value)}/>
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
        
        </div>
      )
    }
  
}
export default Shoppinglist;