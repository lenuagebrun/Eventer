import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component{
  render() {
    return(
      <nav className="App-header">
        <Link to="/" className="navbar-brand">E V E N T E R</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/create" className="nav-link">NEW EVENT</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">LOGIN</Link>
          </li>
          <li className="navbar-item">
          <Link to="/register" className="nav-link">REGISTER</Link>
          </li>
          <li className="navbar-item">
          <Link to="/events" className="nav-link">EVENTS</Link>
          </li>
        </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
