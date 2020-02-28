import React, { useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './App.css';
import logo from './images/logo2.png'

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
import './App.css';

//import { push } from 'connected-react-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogedin: false,
      user: '',
      userData: '',
      user_token: '',
      token: '',

    };

    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.getGlobal = this.getGlobal.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  

  //getGlobal = event => {
    //var Global = require('react-global');

    //<Global values={{
     // globalToken: this.props.user_token,
    //}} />
 // }
  


  handleSubmit(event) {
    event.preventDefault()

    axios
      .post("https://soc-web-liv-60.napier.ac.uk/API/public/api/account/login",
        {
          email: this.state.email,
          password: this.state.password

        })
      .then((response) => {

        console.log(response);

        this.state.user = response.data;
        console.log(this.state.user);
        this.setState({
          userData: this.state.user
        });

        // ---STORING USER ID---
        //var id = this.state.userData.map(
          //mUserData => mUserData.id);
        
        // ---STORING USER ERROR---
        var mError = this.state.userData.map(
          mUserData => mUserData.error);
          
        // ---STORING USER TOKEN
        this.state.token = this.state.userData.map(
          mUserData => mUserData.token);

        this.setState({
          user_token: this.state.token
        })
                
        if(mError == 'false'){
          this.setState({ Redirect: true });
          //alert(this.state.userToken);
        }
        else {
          alert("Wrong login details")
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

    //const global_token_data = window.global_token_data;
    window.token_data = this.state.user_token;
    if (this.state.Redirect) {
      return (
      <Redirect to={{
        pathname: '/AdminPanel',
        //token_data = this.state.user_token
        //token_data: global_token_data
      }}
      />)
    }


    return (
      
        <div className = 'TextCenter'>
          <img src={logo}/>
          
          <form onSubmit={this.handleSubmit} 
            mUserToken={this.state.user_token}>
          
            <h1 className = 'primary'>Q-METHODOLOGY</h1>

            <input className = 'space textbox'
              type="email"
              name="email"
              placeholder="Email"
              email={this.state.email}
              onChange={this.handleChange}
              required
            />

            <input className = 'space textbox'
              type="password"
              name="password"
              placeholder="Password"
              password={this.state.password}
              onChange={this.handleChange}
              required
            />

            <button 
              type="submit" 
              className = 'space button button3'>
                Login
            </button>

          <Link to={'/RegForm'}>
            <button 
              type="submit" 
              className = 'space button button3'>
                Register
            </button>
          </Link>
        </form>
      </div>
    );
  }
}



