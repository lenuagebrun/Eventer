import React from 'react';
import {
  Button,
  Form,
  Input
} from 'semantic-ui-react';
import userService from '../../utils/userService'; 

class Register extends React.Component {
  constructor () {
    super()
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {...this.state}
      let data = await userService.signUp(newUser)
      console.log(data)
      console.log(newUser)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
          <Form.Field
            name='firstname'
            control={Input}
            label='First name'
            placeholder='First name'
            value={this.state.firstname}
            onChange={this.handleChange}
          />
          <Form.Field
            name='lastname'
            control={Input}
            label='Last name'
            placeholder='Last name'
            value={this.state.lastname}
            onChange={this.handleChange}
          />
           <Form.Field
            name = 'email'
            control={Input}
            label='Email'
            placeholder='Valid email address'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Form.Field
            name='username'
            control={Input}
            label='User name'
            placeholder='User name'
            value={this.state.username}
            onChange={this.handleChange}
          />
           <Form.Field
            name='password'
            control={Input}
            label='Password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        <Form.Field
        control={Button}
        >Submit</Form.Field>
      </Form>
    )
  }
}




export default Register;