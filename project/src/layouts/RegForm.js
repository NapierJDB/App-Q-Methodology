import React from "react";
import axios from "axios";
import logo from './images/logo2.png'
import { Link } from "rebass";
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
      passwordsCorrect: false
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

      alert("Success")
      axios
        .post("https://soc-web-liv-60.napier.ac.uk/API/public/account/register", {
          forename: this.state.forename,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
   /* else{
      alert("Account Already Exists")
    }*/
  }

  render() {

    let regNav = this.state.passwordsCorrect ? '/Home' : ''

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
            <Link to={regNav}>
              <button 
                type="submit" 
                className = 'space button button3'>
              Register
              </button>
            </Link>
          </div>
        
        </div>
        </form>
      </div>
    );
  }
}
