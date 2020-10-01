import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      description: '',
      location: '',
      date: new Date(),
    }
  }
  // componentDidMount() {
  //   axios.get('http://localhost:5000/users/')
  //     .then(response => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           users: response.data.map(user => user.username),
  //           username: response.data[0].username
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //
  // }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const newEvent = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      date: this.state.date
    }
    console.log(newEvent);
    axios.post('http://localhost:4000/users/create/:id', newEvent)
      .then(res => console.log(res.data));
    window.location = '/';
  }
  render() {
    return (
    <div>
      <h3>Create New Event</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Location: </label>
          <input
              type="text"
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Event" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}