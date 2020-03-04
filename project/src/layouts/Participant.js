import React, { Component, useState} from 'react'
import { render } from 'react-dom';
import axios from 'axios';
import './App.css';
import logo from './images/logo2.png'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  withRouter,
  Redirect,
  MemoryRouter
} from 'react-router-dom';
import './App.css';

export default class Participant extends Component {







    
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
