import React, { Component } from 'react'
import './App.css';
import logo from './images/logo2.png'

import { Link, Redirect } from 'react-router-dom';
import './App.css';

export default class Participant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
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
        //event.preventDefault()
        console.log(this.state.code)

        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/checkCode',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'code': this.state.code
            })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                this.state.error = data.error;
        
                if (this.state.error == false) {
                    this.setState({ Redirect: true });
                }
                else {
                     alert("Opps...\nWrong code!")
                }
    
              })
              .catch(function (error) {
                console.log(error);
              });
        
    }





// QX5238

    
    render() {

        if (this.state.Redirect) {
            return (
              <Redirect to={{
                pathname: '/PrivacyScreen',
              }} />
            )
          }
        return (
            <div className='TextCenter'>
                <img src={logo}/>
                <h1>Welcome to Research Login</h1>
                <h2>Enter your code below</h2>
                <div className = 'column'>

                    <input className = 'space textbox'
                        type='text'
                        name='code'
                        placeholder='Code'
                        code={this.state.code}
                        onChange={this.handleChange}
                        required                   
                />
                <div className = 'buttonContainer'>
                
                
                    <button 
                        type="submit" 
                        className = 'space button button3'
                        onClick={this.handleSubmit}>
                        Enter
                    </button>
               
                </div>
                </div>
            </div>
        )
    }
}
