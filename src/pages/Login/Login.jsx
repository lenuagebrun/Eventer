import React, { Component } from 'react';
import userService from '../../utils/userService';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
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
    const {email, password} = this.state
    let data = await userService.logIn(email, password)
    this.props.updateUser(data)
  } catch (error) {
    console.error(error)
  }
}

render() {

  return (
    <div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="ui primary button" value="Login" />
      </form>
    </div>
  )
}
}




export default Login;