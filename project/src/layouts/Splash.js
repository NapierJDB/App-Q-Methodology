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

export default class Splash extends Component
{
    render() 
    {
        return (
            <div className ='TextCenter'>
                <img src={logo}/>
                <h1 className = 'primary'>Welcome to Q Research</h1>
                

                <div className = 'buttonContainer'>
                
                <Link to={'/Participant'}>
                    <button 
                        type="submit" 
                        className = 'space button button3'>
                        Participant
                    </button>
                </Link>

                <Link to={'/Home'}>
                  <button 
                    type="submit" 
                    className = 'space button button3'>
                      Admin
                  </button>
                </Link>
                </div>
            </div>
        )
    }
}
