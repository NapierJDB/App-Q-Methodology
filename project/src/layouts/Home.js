import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

/*
    TO IMPLEMENT:
        navigation
        Admin panel page if log in successful
*/

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
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

        event.preventDefault();

        axios
          .post("https://www.one.barttest.me.uk/Project2/public/account/login",
          {
            email: this.state.email,
            password: this.state.password
            
          })
        .then((response) => {
            alert("Log in successful");
            console.log(response);
        }, (error) => {
          console.log("Login error ", error);
        });
      }

      btnRegister(event) {

        //Navigate to regForm page
          
      }

      render() {
        return (       
          <div>
              <form onSubmit={this.handleSubmit}>
                  <h1>Q-METHODOLOGY</h1>
                  
                  <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />

<input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
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