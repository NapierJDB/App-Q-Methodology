import React, { Component } from 'react';
import axios from "axios"
import {
    Box,
} from 'rebass'
//rebass used to get boxes

export default class AdminPanel extends React.Component {
    render() {
        return (
            <div>
                <button>log out</button>
                <br></br>
                <h1>Active</h1>
                <br></br>
                <br></br>
                <button>New Survey</button>
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
                    <button>Delete</button>
                </Box>
            </div>
        )
    }
}