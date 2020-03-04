import React, { useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './App.css'; 
import logo from './images/logo2.png'

import { Link, Redirect } from 'react-router-dom';
import './App.css';

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


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /*
  handleSubmit method is used to pull user detail from back end
  it takes parameters email and password 
   */

  handleSubmit(event) {
    event.preventDefault()

    axios
      .post("https://soc-web-liv-60.napier.ac.uk/API/public/api/account/login",
        {
          email: this.state.email,
          password: this.state.password

        })
      .then((response) => {

        /*
        Save response from the backend to console
        You can view this in your browes by going into 
        inspect element -> console
        */
        console.log(response);

        // The respone is saved in the user state
        this.state.user = response.data;

        console.log(this.state.user);

        this.setState({
          userData: this.state.user
        });


        /* 
        This maps and stores indiviudual things needed in single valiables
         in this case we're storing id, error, and token
         we need to store error becuase it is used to validate 
         if the data is successfully retrieved from the back end 
        */

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


        // This if statement validate the response fromt he backend by checking the error status

        if (this.state.error == 'false') {
          this.setState({ Redirect: true });

          /* 
          We need to store those values
           and because due to factors like time, and our current skills
           we faild to implement secure data storage such as 'Context' or 'Redux' for our app
           therfore we decided to use local storage
           which we normally woulnd't use becuase that makes the application not secure
           You can access local storage by naviating in the 'inspect elemnt -> Storage -> Local storage
           different browser have different set up but it should be simillar
           now that the data is passed to local storage it should be displayed there
           and it can be access everywhere 
           (we need to implement functioannlity which will reset or clear the local storage
           when user clicks log out or closes the browser)
           You can use this page as reference to implement functionality for the Participant.js page so 
           it should take the surveycode as an input and then
           the response should be displayed in the console 
           and checked if its valid by validating the error message
           if valid it should return a bunch of things in the array
           which should then be split into seperate variables and each variable
           should be passed to be stored in the local storage
           so it can be accessed accress all pages.
           When the user is finished with the survey and it is completed the local storage should be cleared 

           Also there are two different methods to retrive response this is due to the fact that
           in the login screen we are using a library called axios and if you take a look at the
           createSurvey.js page you will see that it is set up slightly different
           and I believe that the way our end point (the big link) will work for the participant.js page will be set 
           up to work without axios library so it would be best to use CreateSurvey.js as reference
           to create the structure

          */

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



