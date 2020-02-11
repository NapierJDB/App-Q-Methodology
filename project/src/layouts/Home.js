import React from 'react';
import { render } from 'react-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          formControls: {
            userName: {
              value: ''
            },
            password: {
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
        this.state.formControls.password.value
        );
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
           
            <label>
              Username:
              <input
                name="userName"
                value={this.state.formControls.userName.value}
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
    
            <input type="submit" value="Submit" />
          </form>
        );
      }
}