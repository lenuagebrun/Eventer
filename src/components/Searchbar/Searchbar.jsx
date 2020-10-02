import React from 'react';
import Login from '../../pages/Login/Login';
// import About from '../../pages/About/About';

class SearchBar extends React.Component {
  state = {
    term: ''
  }
  onFormSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.term);
  }
  // Currently the class names are tied to CDN styling from Semantic UI. If you don't want it remove the class name properties.
  render() {
    return (
      <div id='search-bar'>
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <input
            placeholder='Enter address here...'
            type="text"
            value={this.state.term}
            onChange={(e) => this.setState({term: e.target.value })} />
          </div>
        </form>
      </div>
    )
  };
}
export default SearchBar
