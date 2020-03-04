import React from "react";
import logo from './images/logo2.png'
import { Link, Redirect } from 'react-router-dom';
/*
    TO IMPLEMENT:
        password confirmation
*/

export default class RegForm extends React.Component {
  constructor(props) {
    super(props);
    /*
     Values to take from the user 
    */
    this.state = {
      forename: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      passwordsCorrect: false,
      Merror: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  passwordCheck() {
    if (this.state.password != this.state.passwordConfirm || this.state.password.length < 8) {
      alert("Please ensure passwords match and are over 8 characters")
      throw "Please ensure passwords match and are over 8 characters"
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })


  }

  handleSubmit(event) {
    /*
    Check if values are stored 
    by displaying an alert message
    */

    //alert(
    //this.state.forename + 
    //'\n' + 
    //this.state.surname +
    //'\n' +
    //this.state.email + 
    //'\n' +
    //this.state.password
    //)

    event.preventDefault()

    /*
    Passing values to store in a database
    */

    this.passwordCheck();

    if (this.state.passwordsCorrect = true) {

      
        fetch("https://soc-web-liv-60.napier.ac.uk/API/public/api/account/register", {
          method: 'POST',
            /* headers: {
              'Content-Type': 'application/json'
            }, */
            body: JSON.stringify({
              forename: this.state.forename,
              surname: this.state.surname,
              email: this.state.email,
              password: this.state.password,
            })
            })
          /*  .then((response) => {
              return response.json();
      
            })  */
            .then((data) => {
              console.log(data.error);
              
              /* this.state.Merror = data.error;
              
              if (this.state.Merror == false) {
                this.setState({ Redirect: true });
              }
              else {
                alert("Upps...\nIt looks like this emial address\nis already taken!")
              } */

            })
            .catch(function (error) {
              console.log(error);
            });
      }
}

  render() {

    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/Home',
        }} />
      )
    }

    return (

      <div className = 'TextCenter'>
        <img src={logo}/>
        <h1 className = 'primary'>CREATE ACCOUNT</h1>
        <form onSubmit={this.handleSubmit}>
          
          <div>
            <div className = 'column'>
            <input className = 'space textbox'
              type="text"
              name="forename"
              placeholder="Forename"
              forename={this.state.forename}
              //function call
              onChange={this.handleChange}
              required
            />
            </div>
          
          <div>
          <input className = 'space textbox'
            type="text"
            name="surname"
            placeholder="Surname"
            surname={this.state.surname}
            //function call
            onChange={this.handleChange}
            required
          />
          </div>
          
          <div>
          <input className = 'space textbox'
            type="email"
            name="email"
            placeholder="Email"
            email={this.state.email}
            //function call
            onChange={this.handleChange}
            required
          />
          </div>
          
          <div>
          <input className = 'space textbox'
            type="password"
            name="password"
            placeholder="Password"
            password={this.state.password}
            //function call
            onChange={this.handleChange}
            required
          />
          </div>
          
          <div>
          <input className = 'space textbox'
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            password={this.state.passwordConfirm}
            //function call
            onChange={this.handleChange}
            required
          />
          </div>
          
          <div className = 'buttonContainer'>
              <button 
                type="submit" 
                className = 'space button button3'>
              Register
              </button>
          </div>
        
        </div>
        </form>
      </div>
    );
  }
}
