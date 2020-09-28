import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import SearchBar from './components/Searchbar/Searchbar';

class App extends React.Component {

  onSearchSubmit(term) {
    console.log(term)
  }
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar onSubmit={this.onSearchSubmit} />
        <Map />
      </div>
    );
  }
}

export default App;
