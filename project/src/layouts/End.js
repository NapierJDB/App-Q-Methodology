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

export default class End extends Component {
    render() {
        return (
            <div className ='TextCenter finishPage'>
                <h1 className = 'primary'>Thank you for taking part in survey!</h1>
                <hr class="headerline"></hr>

                <Link to = {'/Participant'}>
                    <button className ='space button button3'>
                        Finish
                    </button>
                </Link>
            </div>
        )
    }
}
