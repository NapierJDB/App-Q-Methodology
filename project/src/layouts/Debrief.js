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

export default class Debrief extends React.Component {

    constructor() {
        super();

        this.state = {
            agreed: null
        }

    }

    handleDisagree() {
        this.setState({ agreed: false })
    }

    handleAgree() {
        this.setState({ agreed: true })
    }
    
    render() {
        if (this.state.agreed == false) {
            //alert("Sorry, you must agree to the above terms and conditions to continue")
            return (
                <Redirect to={{
                    pathname: '/Reject',

                }} />
            )
        }
/*
        if (this.state.agreed == true) {
            alert("Terms agreed")
        }
*/
        return (
            <div className ='TextCenter'>
                <h1>Debrief</h1>
                <hr></hr>
                <p>Thank you for taking part in survey </p>
                <p>Please read and accept the terms and conditions before continuing</p>
                <br></br>
                <p>This is where the terms will go</p>
                <p>-Term 1</p>
                <p>-Term 2</p>
                <p>-Term 3</p>
                <p>-Term 4</p>
                <br></br>
                <p>I accept the terms and conditions</p>


                <button onClick={this.handleDisagree.bind(this)}>Disagree</button>
                <Link to={'./End'}>
                  <button 
                    type="submit" 
                    className = 'space button button3'>
                      Agree
                  </button>
                </Link>
            </div>
        )
    }
}