import React, { Component } from 'react'
import './App.css';
import logo from './images/logo2.png'

import { Link,Redirect } from 'react-router-dom';
import './App.css';

export default class Participant extends Component {





// https://soc-web-liv-60.napier.ac.uk/API/public/api/user/checkCode

    
    render() {
        return (
            <div className='TextCenter'>
                <img src={logo}/>
                <h1>Welcome to Research Login</h1>
                <h2>Enter your code below</h2>
                <div className = 'column'>

                    <input className = 'space textbox'
                   /* type="email"
                    name="email"
                    placeholder="Email"
                    email={this.state.email}
                    onChange={this.handleChange}
                    required*/
                    
                />
                <div className = 'buttonContainer'>
                
                <Link to={'/PrivacyScreen'}>
                    <button 
                        type="submit" 
                        className = 'space button button3'>
                        Enter
                    </button>
                </Link>
                </div>
                </div>
            </div>
        )
    }
}
