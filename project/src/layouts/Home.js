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
import { MyConsumer, MyProvider } from '../Context';
import Test from './Test';
import Test2 from './Test2';

//import { push } from 'connected-react-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',

      user: '',
      userData: '',
      token: '',
      id: '',
      error: '',

    };

    



    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //componentDidMount(){
    //this.fetchData();
 // }

  //fetchData(){
    
  //}

  //componentWillUpdate(nextProps, nextState) {
    //localStorage.setItem('item', 'SOMETHING');
  //}

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }



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
        this.state.id = this.state.userData.map(
          mUserData => mUserData.id);

        console.log('ID: ' + this.state.id);


        // ---STORING USER ERROR---
        this.state.error = this.state.userData.map(
          mUserData => mUserData.error);

        console.log('ERROR: ' + this.state.error);

        // ---STORING USER TOKEN
        this.state.token = this.state.userData.map(
          mUserData => mUserData.token);

        console.log('TOKEN: ' + this.state.token);


        if (this.state.error == 'false') {
          this.setState({ Redirect: true });

          // ---PASS TO LOCAL STORAGE---
          localStorage.setItem('ID', this.state.id);
          localStorage.setItem('TOKEN', this.state.token);

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

    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/AdminPanel',
        }} />)
    }
    return (
      <div>
          

        <div className='TextCenter'>
            <img src={logo} />

            <form onSubmit={this.handleSubmit}>

              <h1 className='primary'>Q-METHODOLOGY</h1>

              <div>

                <div className='column'>

                  <input className='space textbox'
                    type="email"
                    name="email"
                    placeholder="Email"
                    email={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div>

                  <input className='space textbox'
                    type="password"
                    name="password"
                    placeholder="Password"
                    password={this.state.password}
                    onChange={this.handleChange}
                    required
                  />

                </div>

                <div className='buttonContainer'>

                  <button
                    type="submit"
                    className='space button button3'>
                    Login
                </button>

                  <Link to={'/RegForm'}>
                    <button
                      type="submit"
                      className='space button button3'>
                      Register
                  </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
    )
  }
}



