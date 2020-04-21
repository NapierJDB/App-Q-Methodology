import React, { Component } from 'react'
import './App.css';
import logo from './images/logo2.png'
import { Link } from 'react-router-dom';

/*
Purpose: Esentailly a home screen that naviagtes to either
Admin or Paricipant part of the application */

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
