import React from "react";
import Reject from './Reject'
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


export default class PrivacyScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            agreed: false
        }

        //this.enabled = this.enabled.bind(this)

    }

    handleCheckboxChange = (e) => {
        this.setState(previousState => { 
            return {agreed: !previousState.agreed}
            })
        }

    render() {

        let btn_style = this.state.agreed ? 'space button enabled' : 'space button disabled';

        return (
            <div className ='TextCenter'>
                <h1>Consent Form</h1>
                <p>Please read and accept the terms and conditions before continuing</p>
                <br></br>
                <p>This is where the terms will go</p>
                <p>-Term 1</p>
                <p>-Term 2</p>
                <p>-Term 3</p>
                <p>-Term 4</p>
                <br></br>
                <p>I accept the terms and conditions 
                    <input 
                    name ="agree"
                    type="Checkbox"
                    value={this.state.agreed}
                    onChange={this.handleCheckboxChange}
                    />
                </p>
                <Link to={'/End'}>
                    <button
                        className = 'space button button3'>Disagree
                    </button>
                </Link>
                
                <Link to={'/InfoParticipant'}>
                  <button 
                    name=""
                    type="submit" 
                    className = {btn_style}
                    disabled={!this.state.agreed}
                    >
                      Agree
                  </button>
                </Link>
            </div>
        )

    }

    
}