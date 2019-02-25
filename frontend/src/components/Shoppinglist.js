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


    /*markComplete(description){
        this.setState({
          newItem: {description, title: this.state.newItem.completed}
        });

    }*/

    
    markComplete = (id) => {
        console.log(this.state.lists);
        this.setState({ lists: this.state.lists.map(grocery => {
            if(grocery.id === id){
            grocery.completed = !grocery.completed
          }
          return grocery;
        }) })
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

    render(){
      return(
        <div className="container">

        {this.state.lists.map(items => (

          <Link key={items.id} to={`/items/${items.id}`}>

          <div className="listetittel">
            <h3 className="card-title">{items.title}</h3>
            <p className="card-text">{items.description}</p>
            <input type="checkbox" onChange={this.markComplete.bind(items,items.id)} />
            {/*<input type="checkbox" onChange={(v) => this.markComplete(v.target.value)} />*/}
          </div>

          </Link>
        ))}
        <div>
          <input onChange={(v) => this.updateTitle(v.target.value)}/>
          <input onChange={(v) => this.updateDescription(v.target.value)}/>
          <p>{this.state.newItem.title}</p>
          <button onClick={() => this.handleSubmit()}>+</button>

        </div>
        </div>
      )
    }
  
}
export default Shoppinglist;