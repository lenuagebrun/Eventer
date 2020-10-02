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
import AllEvents from './pages/AllEvents/AllEvents';
import LoggedIn from './pages/LoggedIn/LoggedIn';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import EditEvent from './pages/EditEvent/EditEvent';
import CreateUser from './pages/CreateUser/CreateUser';

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
      this.setState({ user: data, loggedIn: true })
    }
    handleLogout = () => {
      userService.logout();
      this.setState({ user: null, loggedIn: false });
    }

  render() {
    console.log(this.state)
    return (
      <Router>
       <div>
        <Header />
        <br />
        <Route path="/" component={Map} />
        <Route path="/register" component={CreateUser} />
        <Route
            path="/login"
            render={() => <Login updateUser={this.updateUser} />}
          />
        <Route path="/events" component={AllEvents} />
        <Route path="/edit/:id" component={EditEvent} />
        <Route path="/create" component={CreateEvent} />
      </div>
      </Router>
    )
  }
}

export default App;
