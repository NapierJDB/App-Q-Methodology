import React, { useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  withRouter,
  Redirect
} from 'react-router-dom';

import { push } from 'connected-react-router';


/*
    TO IMPLEMENT:
        navigation
        Admin panel page if log in successful
*/

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogedin: false,


    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /*   handleLogin(event) {
      this.setState({ Redirect: true })
      return (<Redirect to='/AdminPanel' />)
    } */


  handleSubmit(event) {
    event.preventDefault()

    axios
      .post("https://www.one.barttest.me.uk/Project2/public/account/login",
        {
          email: this.state.email,
          password: this.state.password


        })
      .then((response) => {
        alert("Log in successful");
        //Set boolean expression to true
        this.state.isLogedin(true);
        //this.handleLogin(true);
        //this.state.isLogedin: true;
        console.log(response);
      }, (error) => {
        console.log("Login error ", error);
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ Redirect: true })
      ;
  }

  render() {
    if (this.state.Redirect) {
      return (<Redirect to='/AdminPanel' />)
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Q-METHODOLOGY</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            email={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            password={this.state.password}
            onChange={this.handleChange}
            required
          />


          <button type="submit">
            Login
          </button>


        </form>
      </div>


    );
  }
}



