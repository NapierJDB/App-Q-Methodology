import React, { Component } from 'react';
import axios from "axios"
import { Box } from 'rebass'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
//rebass used to get boxes

export default class AdminPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //A_user_token: this.props.location.token_data

        };

        this.handleLogout = this.handleLogout.bind(this);
        this.getData = this.getData.bind(this);
        
      }


    handleLogout = event => {
        // This method clears the token_data variable
        window.token_data = null
    }

    getData(event) {
  

    }
    

    render() {

        return (
            <div>
                <Link to='/'>
                    <button onClick={this.handleLogout}>log out</button>
                </Link>
                <div>
                <h1>Admin Panel</h1>

                    <Link 
                        to={{
                            pathname: '/CreateSurvey',
                            //B_user_token: this.state.A_user_token
                            }}>
                        <button>
                            New Survey
                        </button>
                    </Link>

                    <Link 
                        to={{
                            pathname: '/SurveyOverview'
                            }}>
                        <button>
                            View surveys
                        </button>
                    </Link>
                </div>                
            </div>
        )
    }
}
