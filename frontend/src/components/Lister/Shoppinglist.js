import React, { Component } from 'react';

class Shoppinglist extends Component{
    state = {
        list: []
      };

async componentDidMount(){
    try{
      const{match: { params }} = this.props;
      const res = (await fetch(`http://127.0.0.1:8000/api/${params.id}/`));
      const list = await res.json();
      this.setState({
        list,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render(){
      const {list} = this.state;
      return(
          <div className="container">
              <div className="body">
                  <h3>{list.title}</h3>
                  <p>{list.description}</p>
              </div>
          </div>
      )
  }
}
export default Shoppinglist;