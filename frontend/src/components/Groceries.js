import React, { Component } from 'react';
import GroceryItem from './GroceryItem';
import PropTypes from 'prop-types';
import CustomForm from './Form';

class Groceries extends Component {
  render() {
    return this.props.groceries.map((grocery) => (
          <GroceryItem key={grocery.id} grocery={grocery} markComplete={this.props.markComplete}
          delGrocery={this.props.delGrocery} />
          
    ));
  }
}

//PropTypes
Groceries.propTypes = {
    groceries: PropTypes.array.isRequired
}

export default Groceries;
