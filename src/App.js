import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
//React Router
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
//Pages
import Map from './components/Map/Map';
import SearchBar from './components/Searchbar/Searchbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import LoggedIn from './pages/LoggedIn/LoggedIn';
import CreateEvent from './pages/CreateEvent/CreateEvent';
//Utilities
import userService from './utils/userService';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.getIntitalState(),
    }


  }

  //Intializer

  getIntitalState = () => {
    return {
      userData: {},
      loggedIn: false
    }
  };

  //Search Bar Functionality

  onSearchSubmit(term) {
    console.log(term)
  };

  //User state definitions

  updateUser = (data) => {
    this.setState({ user: data })
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }








  render() {
    //<Login updateUser={this.updateUser}/>
    console.log(this.state)

    return (
      <Router>
       <div>
        <Header />
        <br />
        <Route path="/" exact component={Map} />
        <Route path="/create" component={CreateEvent} />
      </div>
    </Router>
    )
  }
}

export default App;
