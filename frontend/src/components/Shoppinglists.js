import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Shoppinglists.css';

class Shoppinglists extends Component{
    state = {
      lists: [],
      newItem: {title: "asdasda", description: ""}
    };
  
    async _fetchList() {
      try{
        const res = await fetch('http://127.0.0.1:8000/api/');
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

    delList = (id) => {
      this.setState({ lists: [...this.state.lists.filter(list => list.id !== id)]});
      this.handleDelete(id);
      
    }

    async handleDelete(id){
      try{
        const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
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
        const res = await fetch('http://127.0.0.1:8000/api/', {
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

    render(){
      return(
        <div className="container">

        {this.state.lists.map(items => (

          <div className="listetittel">
          <Link key={items.id} to={`/items/${items.id}`}>
            <h3 className="card-title">{items.title}</h3>
          </Link>
            <button className="xBtn" onClick={this.delList.bind(items,items.id)}>x</button>
            <p className="card-text">{items.description}</p>
          </div>

        
        ))}
        <div>
            <p>
              <input placeholder="Name of list" onChange={(v) => this.updateTitle(v.target.value)}/>
              <input placeholder="Description" onChange={(v) => this.updateDescription(v.target.value)}/>
              <button className="submit" onClick={() => this.handleSubmit()}>Add list</button>
            </p>
          </div>
        </div>
      )
    }
  
}
export default Shoppinglists;