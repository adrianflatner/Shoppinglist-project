import React, { Component } from 'react';

import axios from 'axios';

export class AddGrocery extends Component {
  state = {
    title: ''
  }

  onSubmit = (event, requestType, groceryID) => {
    event.preventDefault();
    this.props.addGrocery(this.state.title);
    this.setState({ title: '' });
    const title = event.target.elements.title.value;

    switch ( requestType ){
      case 'post':
          return axios.post(`http://123.0.0.1:8000/api/`, {
              title: title,
          })
          .then(res => console.log(res))
          .catch(error => console.error(error));
      case 'put': 
          return axios.put(`http://123.0.0.1:8000/api/${groceryID}/`, {
              title: title,
          })
          .then(res => console.log(res))
          .catch(error => console.error(error));
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  
  render() {
    return (
      <form onSubmit={(event) => this.onSubmit(event, this.props.requestType, this.props.groceryID)} style={{ display: 'flex' }}>
          <input 
          type='text' 
          name='title' 
          placeholder="Add grocery" 
          style={{flex: '10', padding: '5px'}} 
          value={this.state.title}
          onChange={this.onChange}
          />
          <input type='submit' value='submit' className='btn' style={{flex: '1'}}/>
      </form>
    )
  }
}

export default AddGrocery;
