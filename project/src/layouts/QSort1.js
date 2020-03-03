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

export default class QSort1 extends Component {
    render() {
        return (
            <div className = 'TextCenter'>
                <h1>Q Sort Stage 1</h1>

                    <Link to={'/QSort2'}>
                        <button className='space button button3'>
                            Next
                        </button>
                    </Link>
            </div>
        )
    }
}
