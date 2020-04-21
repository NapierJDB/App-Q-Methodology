import React from "react";
import { Link } from 'react-router-dom';

/**
 * Purpose: This page allows participnat to agree to the privacy statement 
 * and also request deletion of their data 
 */

export default class PrivacyScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            agreed: false,
            privacyStatement: localStorage.getItem('RE_PRIVACY'),
        }
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
                <textarea className='policyTextbox'
                readOnly>
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

            
                <div className='TextCenter'>
                    <br></br>
                <p>
                    Edinburgh Napier University Data Protection Statement 
                </p>
                <p>
                    https://staff.napier.ac.uk/services/governance-compliance/governance/DataProtection/Pages/default.aspx
                </p>
                <p>
                    Edinburgh Napier University Data Processing for research guide
                </p>
                <p>
                    https://staff.napier.ac.uk/services/governance-compliance/governance/DataProtection/Pages/ProcessingDataforResearch.aspx
                </p>
                </div>
            </div>
        )

    }

    
}