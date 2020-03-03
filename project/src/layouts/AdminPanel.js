import React, { Component } from 'react';
import axios from "axios"
import { Box } from 'rebass'
import logo from './images/logo2.png'
import logoSimple from './images/napier-simple-logo.png'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import { MyConsumer } from '../Context';
//rebass used to get boxes

export default class AdminPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleLogout = this.handleLogout.bind(this);
        
      }


    handleLogout = event => {
        // This method clears the token_data variable
        //window.token_data = null
    }
    

    render() {

        

        //console.log('TOKEN IN ADMIN PANEL: ' + this.state.id)

        return (
            
       
            <div>

                
                    <div class="TextCenter">
                         <Link to='/'>
                         <button className = 'space button button3 log-out' onClick={this.handleLogout}>log out</button>
                         </Link>
                   
                         <img className ='logoSimple' src={logoSimple}/>
                    </div>
               
                
                <div class="row justify-content-md-center">
                    <div class="TextCenter">
                        <h1>Admin Panel</h1>
                    </div>
                    <div class="TextCenter">
                            <Link 
                             to={{
                            pathname: '/CreateSurvey',
                            //B_user_token: this.state.A_user_token
                            }}>
                            <button className = 'space button button3'>
                                New Survey
                            </button>
                            </Link>

                            <Link 
                            to={{
                            pathname: '/SurveyOverview'
                            }}>
                            <button className = 'space button button3'>
                                View surveys
                            </button>
                            </Link>
                        </div>
                    </div>
                                
            </div>

        )
    }
}
