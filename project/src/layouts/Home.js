import React from 'react';
import { render } from 'react-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: '',
          password: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
          this.setState({
              [event.target.name]: event.target.value
          });
      }
      
      handleSubmit(event) {
        alert(
        "Login button works"
        );
        event.preventDefault();
      }

      btnRegister(event) {
          
      }

      render() {
        return (       
          <div>
              <form onSubmit={this.handleSubmit}>
                  <h1>Q-METHODOLOGY</h1>
                  
                  <input 
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    required
                  />

                    <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />

                  <button type="submit">
                    Login
                  </button>
              </form>

                <button onSubmit={this.btnRegister} type="submit">
                    Register
                </button>
          </div>
        );
      }
}