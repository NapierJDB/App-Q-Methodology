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
            A_user_token: this.props.location.token_data
        };

        //this.setUserToken = this.setUserToken.bind(this);

        //const { data } = this.props.location

      }

    //setUserToken = event =>  {
      //  this.setState({
        //    user_token : data
        //})
    //}

    render() {

        //const { token_data } = this.props.location

        return (
            <div>
                <Link to='/'>
                    <button>log out</button>
                </Link>

                <br></br>
                <h1>Active</h1>


                <Link 
                    to={{
                        pathname: '/CreateSurvey',
                        B_user_token: this.state.A_user_token
                        }}>
                    <button>
                        New Survey
                    </button>
                </Link>

                
            </div>
        )
    }
}


/*<br></br>
                <br></br>
                <Box width={256} sx={{
                    borderRadius: 2,
                    boxShadow: '0 0 16px rgba(0, 0, 0, .25)'
                }}>
                    <text>Name of survey</text>
                    <br></br>
                    <text>872312</text>
                    <br></br>
                    <text>Survey description...</text>
                </Box>

                <br></br>
                <Box width={256} sx={{
                    borderRadius: 2,
                    boxShadow: '0 0 16px rgba(0, 0, 0, .25)'
                }}>
                    <text>Name of survey</text>
                    <br></br>
                    <text>872312</text>
                    <br></br>
                    <text>Survey description...</text>
                    <br></br>
                    <text>12/30 completed</text>
                    <br></br>
                    <button>Edit</button>
                    <button>Archive</button>
                </Box>

                <hr></hr>
                <br></br>
                <h1>Archived</h1>
                <Box width={256} sx={{
                    borderRadius: 2,
                    boxShadow: '0 0 16px rgba(0, 0, 0, .25)'
                }}>
                    <text>Name of survey</text>
                    <br></br>
                    <text>872312</text>
                    <br></br>
                    <text>Survey description...</text>
                </Box>

                <br></br>
                <Box width={256} sx={{
                    borderRadius: 2,
                    boxShadow: '0 0 16px rgba(0, 0, 0, .25)'
                }}>
                    <text>Name of survey</text>
                    <br></br>
                    <text>872312</text>
                    <br></br>
                    <text>Survey description...</text>
                    <br></br>
                    <text>12/30 completed</text>
                    <br></br>
                    <button>Edit</button>
                    <button>Delete</button>
                </Box>
                <br></br>*/