import React from "react";
import axios from "axios";

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
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange= event =>  {
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


  render() {
    return (
      <div>
        <h1>Create account</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="forename"
            placeholder="Forename"
            forename={this.state.forename}
            //function call
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="surname"
            placeholder="Surname"
            surname={this.state.surname}
            //function call
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            email={this.state.email}
            //function call
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            password={this.state.password}
            //function call
            onChange={this.handleChange}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>
      </div>
    );
  }
}
