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

    render() {

        return (
            <div>
                <Link to='/'>
                    <button>log out</button>
                </Link>

                <br></br>
                <h1>Active</h1>


                <Link to='/CreateSurvey'>
                    <button>
                        New Survey
                    </button>
                </Link>

                <br></br>
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
                <br></br>
            </div>
        )
    }
}