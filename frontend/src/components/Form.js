import React from 'react';
import { Form, Input, Button, } from 'antd';

import axios from 'axios';
  
  class CustomForm extends React.Component {
 
    handleFormSubmit = (event, requestType, groceryID) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;

        switch ( requestType ){
            case 'post':
                return axios.post('http://123.0.0.1:8000/api/', {
                    title: title,
                    description: description
                })
                .then(res => console.log(res))
                .catch(error => console.error(error));
            case 'put': 
                return axios.put(`http://123.0.0.1:8000/api/${groceryID}/`, {
                    title: title,
                    description: description
                })
                .then(res => console.log(res))
                .catch(error => console.error(error));
        }
    }

        render() {
        return (
            <div>
            <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.requestType, this.props.groceryID)}>
                <Form.Item label="Grocery">
                <Input name="title" placeholder="Grocery" />
                </Form.Item>
                <Form.Item label="Description">
                <Input name="description" placeholder="Description" />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            </div>
        );
    }
  }
  
  //ReactDOM.render(<FormLayoutDemo />, mountNode);
  export default CustomForm;