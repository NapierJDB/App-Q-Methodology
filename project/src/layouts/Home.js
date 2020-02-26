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
      user: '',
      userData: '',
      user_token: '',
      token: '',

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

    if (this.state.Redirect) {
      return (
      <Redirect to={{
        pathname: '/AdminPanel',
        token_data: this.state.user_token
      }}
      />)
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} 
          mUserToken={this.state.user_token}>
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



