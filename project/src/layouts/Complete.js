import React, { Component } from 'react'
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

export default class Complete extends Component {
    render() {
        return (
            <div className ='TextCenter finishPage'>
                <h1 className = 'primary'>Thank you for taking part in survey!</h1>
                <hr class="headerline"></hr>
                <h2>You can now close this window</h2>
            </div>
        )
    }
}