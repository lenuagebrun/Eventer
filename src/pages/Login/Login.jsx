// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// // import './LoginPage.css';
// import userService from '../../utils/userService';
//
// class Login extends Component {
//
//   state = {
//     email: '',
//     password: ''
//   };
//
//   handleChange = (e) => {
//     this.setState({
//       // Using ES2015 Computed Property Names
//       [e.target.name]: e.target.value
//     });
//   }
//
//   handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await userService.login(this.state);
//       // Let <App> know a user has signed up!
//       this.props.handleSignupOrLogin();
//       // Successfully signed up - show GamePage
//       this.props.history.push('/');
//     } catch (err) {
//       // Use a modal or toast in your apps instead of alert
//       alert('Invalid Credentials!');
//     }
//   }
//
//   render() {
//     return (
//       <div className="LoginPage">
//         <header className="header-footer">Log In</header>
//         <form className="form-horizontal" onSubmit={this.handleSubmit} >
//           <div className="form-group">
//             <div className="col-sm-12">
//               <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
//             </div>
//           </div>
//           <div className="form-group">
//             <div className="col-sm-12">
//               <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
//             </div>
//           </div>
//           <div className="form-group">
//             <div className="col-sm-12 text-center">
//               <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
//               <Link to='/'>Cancel</Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
//
// export default Login;

import React, { Component } from 'react';
import userService from '../../utils/userService';
import axios from 'axios';

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

  axios.get('http://localhost:4000/users/id'+this.props.match.params.id, e)
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
