import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Shoppinglists.css';

class Shoppinglist extends Component{
    state = {
      lists: [],
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

    async componentDidMount(){
      await this._fetchList();
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
      

    async handleDelete(id){
      try{
        const res = await fetch(`http://127.0.0.1:8000/api/groceries/${id}/`, {
          method: 'DELETE',
          headers: {"Content-Type": "application/json"}
        });
        if(res.ok){
          await this._fetchList(); 
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
        }
      } catch (e) {
        console.log(e);
      }
    
    }

    
    render(){
      return(
        <div className="container">
          <div>
            <p>
              <input placeholder="New grocery" onChange={(v) => this.updateTitle(v.target.value)}/>
              <input placeholder="Description" onChange={(v) => this.updateDescription(v.target.value)}/>
              <button className="submit"onClick={() => this.handleSubmit()}>Add Grocery</button>
            </p>
          </div>
          <br/>
          {this.state.lists.map(items => (
            <div className="listetittel">
              <p style={{textDecoration: items.completed ? 'line-through' : 'none'}} className="cardtitle">
                <input type="checkbox" onChange={this.markComplete.bind(items,items.id)} />{' '}
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