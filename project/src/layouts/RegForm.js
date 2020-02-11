import React from 'react';
import './App.css';

export default class RegForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        userName: {
          value: ''
        },
        email: {
          value: ''
        },
        password: {
          value: ''
        },
        confirmPassword: {
          value: ''
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: {
          ...this.state.formControls[name],
          value
        }
      }
    });
  }

  handleSubmit(event) {
    alert(
    this.state.formControls.userName.value +
    '\n' +
    this.state.formControls.email.value +
    '\n' +
    this.state.formControls.password.value +
    '\n' +
    this.state.formControls.confirmPassword.value
    );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
       
        <label>
          Name:
          <input
            name="userName"
            value={this.state.formControls.userName.value}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Email address:
          <input
            name="email"
            value={this.state.formControls.email.value}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Password:
          <input
            name="password"
            value={this.state.formControls.password.value}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Confirm password:
          <input
            name="confirmPassword"
            value={this.state.formControls.confirmPassword.value}
            onChange={this.handleChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }

}