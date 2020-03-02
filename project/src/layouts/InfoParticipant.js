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

export default class InfoParticipant extends Component {
    render() {
        return (
            <div className = 'TextCenter'>
                <h1>Participant Information</h1>
                <form>
                  <div>
                    <div className = 'column'>
                          <input className = 'space textbox'
 
                          />
                      </div>

                      <div>
                          <input className = 'space textbox'
                          
                          />                   
                      </div>

                      <div>
                          <input className = 'space textbox'
                          
                          />                     
                      </div>

                      <div>
                          <input className = 'space textbox'
                          
                          />                    
                      </div>

                      <div>
                          <textarea className = 'space textbox'
                          
                          />                    
                      </div>

                      <div>
                          <textarea className = 'space textbox'
                          
                          />                    
                      </div>

                  </div>                   
             </form>

                <Link to = {'/QSort1'}>
                    <button className ='space button button3'>
                        Next
                    </button>
                </Link>

            </div>
        )
    }
}
