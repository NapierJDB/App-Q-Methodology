import React from "react";
import axios from "axios";

export default class RegForm extends React.Component {
  constructor(props) {
    super(props);
    /* To register a user we are storing:
           forename
           surname
           email
           password */
    this.state = {
      forename: "",
      surname: "",
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeForename = this.handleChangeForename.bind(this);
    this.handleChangeSurname = this.handleChangeSurname.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  //functions for handling changes in variable values
  handleChangeForename = event => {
    this.setState({ forename: event.target.value });
  };

  handleChangeSurname = event => {
    this.setState({ surname: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { forename, surname, email, password } = this.state;

    /*This is the JSON part
        so the forname...etc must correspond to
        user input 
        atm they are hardcoded */
    axios
      .post("https://www.one.barttest.me.uk/Project2/public/account/register", {
        forename: this.state.forename,
        surname: this.state.surname,
        email: this.state.email,
        password: this.state.password
      })
      .then(function (resonse) {
        console.log(resonse);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="forename"
            placeholder="Forename"
            forename={this.state.forename}
            //function call
            onChange={this.handleChangeForename}
            required
          />

          <input
            type="text"
            name="Surname"
            placeholder="Surname"
            surname={this.state.surname}
            //function call
            onChange={this.handleChangeSurname}
            required
          />

          <input
            type="email"
            name="Email"
            placeholder="Email"
            email={this.state.email}
            //function call
            onChange={this.handleChangeEmail}
            required
          />

          <input
            type="password"
            name="Passwrod"
            placeholder="Password "
            confirmpassword={this.state.password}
            //function call
            onChange={this.handleChangePassword}
            required
          />

          <button
            type="submit"
            onClick={() => {
              alert(
                this.state.forename +
                "\n" +
                this.state.surname +
                "\n" +
                this.state.email +
                "\n" +
                this.state.password
              );
              this.handleSubmit();
            }}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}
