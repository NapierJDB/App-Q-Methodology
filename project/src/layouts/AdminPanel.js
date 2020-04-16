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
        localStorage.removeItem('ID');
        localStorage.removeItem('TOKEN');
    }
    

    render() {

        

        //console.log('TOKEN IN ADMIN PANEL: ' + this.state.id)

        return (
            
       
            <div>

                
                    <div className='TextCenter'>
                         <Link to='/'>
                         <button className = 'space button button3 log-out' onClick={this.handleLogout}>log out</button>
                         </Link>
                   
                         <img className='logo' src={logo} />
                    </div>
               
                
                <div className="justify-content-md-center">
                    <div className='TextCenter'>
                        <h1>Admin Panel</h1>
                    </div>
                    <div className='TextCenter'>
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

                            <Link 
                            to={{
                            pathname: '/DeleteParticipant'
                            }}>
                            <button className = 'space button button3'>
                                Manage participants
                            </button>
                            </Link>
                        </div>
                    </div>
                                
            </div>

        )
    }
}
