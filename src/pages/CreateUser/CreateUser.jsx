// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import userService from '../../utils/userService';
//
// class CreateUser extends Component {
//
//   state = {
//     username: '',
//     firstname:'',
//     lastname:'',
//     email: '',
//     password: '',
//     passwordConf: ''
//   };
//
//   handleChange = (e) => {
//     this.props.updateMessage('');
//     this.setState({
//       // Using ES2015 Computed Property Names
//       [e.target.name]: e.target.value
//     });
//   }
//
//   handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await userService.signup(this.state);
//       // Let <App> know a user has signed up!
//       this.props.handleSignupOrLogin();
//       // Successfully signed up - show GamePage
//       this.props.history.push('/');
//     } catch (err) {
//       // Invalid user data (probably duplicate email)
//       this.props.updateMessage(err.message);
//     }
//   }
//
//   isFormInvalid() {
//     return !(this.state.username && this.state.firstname && this.state.lastname && this.state.email && this.state.password === this.state.passwordConf);
//   }
//
//   render() {
//     return (
//       <div>
//         <header className="header-footer">Sign Up</header>
//         <form className="form-horizontal" onSubmit={this.handleSubmit} >
//           <div className="form-group">
//             <div className="col-sm-12">
//               <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
//             </div>
//           </div>
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
//             <div className="col-sm-12">
//               <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
//             </div>
//           </div>
//           <div className="form-group">
//             <div className="col-sm-12 text-center">
//               <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
//               <Link to='/'>Cancel</Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
//
// export default CreateUser;


import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      firstname:'',
      lastname:'',
      email: '',
      password: '',
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    })
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    }
    console.log(newUser);

    axios.post('http://localhost:4000/users/add', newUser)
      .then(res => console.log(res.data));
    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Register New User</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>User Name: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
        </div>
        <div className="form-group">
          <label>First Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.firstname}
              onChange={this.onChangeFirstname}
              />
        </div>
        <div className="form-group">
          <label>Last Name: </label>
          <input
              type="text"
              className="form-control"
              value={this.state.lastname}
              onChange={this.onChangeLastname}
              />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
              type="text"
              className="form-control"
              selected={this.state.email}
              onChange={this.onChangeEmail}
            />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
              type="text"
              className="form-control"
              selected={this.state.password}
              onChange={this.onChangePassword}
            />
        </div>
        <div className="form-group">
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
