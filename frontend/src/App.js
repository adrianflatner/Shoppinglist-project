import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Groceries from './components/Groceries';
import AddGrocery from './components/AddGrocery';
import About from './components/pages/About';
import uuid from 'uuid';

import './App.css';


class App extends Component {
  state = {
    groceries: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const groceries = await res.json();
      this.setState({
        groceries
      });
    } catch (e) {
      console.log(e);
    }
  }

  //Toggle Complete
  markComplete = (id) => {
    this.setState({ groceries: this.state.groceries.map(grocery => {
      if(grocery.id === id){
        grocery.completed = !grocery.completed
      }
      return grocery;
    }) })
  }

  //Delete grocery
  delGrocery = (id) => {
    this.setState({ groceries: [...this.state.groceries.filter(grocery => grocery.id !== id)]});
  }

  //Add grocery
  addGrocery = (title) => {
    const newGrocery = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState({ groceries: [...this.state.groceries, newGrocery]})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={prop => (
              <React.Fragment>
                <AddGrocery requestType="post" groceryID={null} addGrocery={this.addGrocery} />
                <Groceries groceries={this.state.groceries} markComplete={this.markComplete}
                delGrocery={this.delGrocery} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
