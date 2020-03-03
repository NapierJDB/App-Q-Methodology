import React, { Component, useState} from 'react'
import PropTypes from 'prop-types';
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



export default class Debrief extends React.Component {


    constructor() {
        super();

        this.state = {
            agreed: false
        }
    }

    handleCheckboxChange = (e) => {
        this.setState(previousState => { 
            return {agreed: !previousState.agreed}
            })
        }
    
    render() {

        let btn_style = this.state.agreed ? 'space button enabled' : 'space button disabled';

        return (
            <div className ='TextCenter'>
                <h1>Debrief</h1>
                <hr className= "headerline" ></hr>
                <p class="bold">Thank you for taking part in survey!</p>
                <p>Please read and accept the terms and conditions before continuing</p>
                
                <p>This is where the terms will go</p>
                <p>-Term 1</p>
                <p>-Term 2</p>
                <p>-Term 3</p>
                <p>-Term 4</p>
                <br></br>
                <p>I accept the terms and conditions  
                <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
      </p>
               <br></br>
                <Link to={'/Reject'}>
                    <button
                        className = 'space button button3'>Disagree
                    </button>
                </Link>
                <Link to={'/End'}>
                  <button 
                    name=""
                    type="submit" 
                    className = {btn_style}
                    disabled={!this.state.agreed}
                    >
                      Agree
                  </button>
                </Link>
            </div>
        )
    }
}

