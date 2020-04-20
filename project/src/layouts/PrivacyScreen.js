import React from "react";
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
            agreed: false,
            privacyStatement: localStorage.getItem('RE_PRIVACY'),
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
                <textarea className='policyTextbox'>
                    {this.state.privacyStatement}
                </textarea>
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
                
                <Link to={'/AnswerQuestions'}>
                  <button 
                    name=""
                    type="submit" 
                    className = {btn_style}
                    disabled={!this.state.agreed}
                    >
                      Agree
                  </button>
                </Link>

                <Link
                    to={{
                        pathname: '/RequestDeletion'
                    }}>
                    <button  
                        className = 'space button button3'>
                        Request Deletion
                    </button>
                    </Link>
            </div>
        )

    }

    
}