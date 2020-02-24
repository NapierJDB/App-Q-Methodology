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
  Redirect,
  MemoryRouter
} from 'react-router-dom';

//import { push } from 'connected-react-router';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogedin: false,
      userData: [],

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault()

    axios
      .post("https://soc-web-liv-60.napier.ac.uk/API/public/account/login",
        {
          email: this.state.email,
          password: this.state.password

        })
      .then((response) => {

        console.log(response);
        var user = response.data;
        console.log(user);
        this.setState({
          userData: user
        });

        // ---STORING USER ID---
        //var id = this.state.userData.map(
          //mUserData => mUserData.id);
        
        // ---STORING USER ERROR---
        var mError = this.state.userData.map(
          mUserData => mUserData.error);
          
        // ---STORING USER TOKEN
        //var token = this.state.userData.map(
          //mUserData => mUserData.token);

        /*
        If the error is set to true then
        it means that the login failed
        and user won't be redirected
         */      
        if(mError == 'false'){
          this.setState({ Redirect: true });
        }
        else {
          alert("Invalid login details");
        }
      }, 
      (error) => {
        console.log("Login error ", error);
      })
      .catch(function (error) {
        console.log(error);
      })
    
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

          <Link to={'/RegForm'}>
            <button type="submit">
              Register
            </button>
          </Link>
        </form>
      </div>


    );
  }
}

/*      <div>
          <h3>{ this.state.userData.map(
         mUserData => <li>{mUserData.id}</li>) }</h3>
       </div>
*/



