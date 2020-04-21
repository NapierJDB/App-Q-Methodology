import React, { Component } from 'react'
import './App.css';
import logo from './images/logo2.png'
import { Redirect } from 'react-router-dom';
import { __RouterContext } from 'react-router';

/**
 * Purpose: This page allows participant to enter the code of the survey
 */

export default class Participant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            researchToken: '',
            researchId: '',
            researcherEmail: '',
            researchInfo: [],
            anchors: [],
            statements: [],
            negativeAnchors: [],
            neutralAnchors: [],
            positiveAnchors: [],

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getResearchData = this.getResearchData.bind(this);
        this.clearLocalStorage = this.clearLocalStorage.bind(this);
    }

    componentDidMount(){
        // When the component mount clear local storage
        this.clearLocalStorage();
    }

    clearLocalStorage() {
        localStorage.clear();       
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    handleSubmit(event) {

        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/checkCode',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'code': this.state.code
            })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                // Getting data from backend

                this.state.error = data.error;
                this.state.researchToken = data.token;
                this.state.researchId = data.id;
                this.state.researcherEmai = data.researcherEmail;
                console.log(data.researcherEmail)

                //If the error from back end if false then pass things
                //to local storage
                if (this.state.error == false) {

                    // ---PASS TO LOCAL STORAGE---
                    localStorage.setItem('RE_TOKEN', this.state.researchToken);
                    localStorage.setItem('RE_ID', this.state.researchId);
                    localStorage.setItem('RE_EMAIL', data.researcherEmail);

                    this.getResearchData();
                    
                }
                else {
                     alert("Opps...\nWrong code!")
                }
    
              })
              .catch(function (error) {
                console.log(error);
              });
        
    }

    getResearchData(){
        /**
         * This method is used to get all the research information
         * which are needed to be displayed
         * in order to fill out the research survey
         */
        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/getData',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.researchToken,
            },
            body: JSON.stringify({
                'id': this.state.researchId
            })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                this.state.researchInfo = data.research
                this.state.anchors = data.anchors
                this.state.statements = data.statements
                console.log(this.state.researchInfo)
                console.log(this.state.anchors)
                console.log(this.state.statements)

                var reName = this.state.researchInfo.name;
                var reDescription = this.state.researchInfo.description;
                var reBox1 = this.state.researchInfo.box1;
                var reBox2 = this.state.researchInfo.box2;
                var reBox3 = this.state.researchInfo.box3;
                var rePrivacy = this.state.researchInfo.privacy_statement;
                var reDebrief = this.state.researchInfo.debrief;

                // ---PASS TO LOCAL STORAGE---
                localStorage.setItem('RE_NAME', reName);
                localStorage.setItem('RE_DESCRIPTION', reDescription);
                localStorage.setItem('RE_BOX1', reBox1);
                localStorage.setItem('RE_BOX2', reBox2);
                localStorage.setItem('RE_BOX3', reBox3);
                localStorage.setItem('RE_PRIVACY', rePrivacy);
                localStorage.setItem('RE_DEBRIEF', reDebrief);
                localStorage.setItem('RE_STATEMENTS', JSON.stringify(this.state.statements));

                var anchors = this.state.anchors;

                // ANCHORS

                var markerNum = this.state.anchors.map((item) =>
                     item.markerNum)
                 markerNum = markerNum.map(Number);
                 console.log(markerNum)               

                // Find the index of 0
                var indexOf0 = markerNum.indexOf(0)
                console.log(indexOf0)

                // Store negative values
                var negativeAnchors = markerNum.slice(0, indexOf0)
                console.log(negativeAnchors)

                // Store neutral values
                var neutralAnchors = markerNum[indexOf0]
                console.log(neutralAnchors)

                // Store positive values
                var positiveAnchors = markerNum.slice(indexOf0 + 1)
                console.log(positiveAnchors)

                // QUANTITY
                var itemQuantity = this.state.anchors.map((item) =>
                     item.items)
                 itemQuantity = itemQuantity.map(Number);
                 console.log(itemQuantity)

                // Store quantity for negative anchors
                var negativeQuantity = itemQuantity.slice(0, indexOf0)
                console.log(negativeQuantity)
                
                // Store quantity for neutral anchors
                var neutralQuantity = itemQuantity[indexOf0]
                console.log(neutralQuantity)

                // Store quantity for negative anchors
                var positiveQuantity = itemQuantity.slice(indexOf0 + 1)
                console.log(positiveQuantity)

                // PASS ANCHORS ARRAYS TO LOCAL STORAGE
                localStorage.setItem('RE_NEGATIVE_ANCHORS', negativeAnchors);
                localStorage.setItem('RE_NEUTRAL_ANCHORS', neutralAnchors);
                localStorage.setItem('RE_POSITIVE_ANCHORS', positiveAnchors);
                localStorage.setItem('RE_NEGATIVE_QUANTITY', negativeQuantity);
                localStorage.setItem('RE_NEUTRAL_QUANTITY', neutralQuantity);
                localStorage.setItem('RE_POSITIVE_QUANTITY', positiveQuantity);

                //Navigate to next oage
                this.setState({ Redirect: true });
                   
              })
              .catch(function (error) {
                console.log(error);
              });
    }
  
    render() {

        if (this.state.Redirect) {
            return (
              <Redirect to={{
                pathname: '/PrivacyScreen',
              }} />
            )
          }
        return (
            <div className='TextCenter'>
                <img src={logo}/>
                <h1>Welcome to Research Login</h1>
                <h2>Enter your code below</h2>
                <div className = 'column'>

                    <input className = 'space textbox'
                        type='text'
                        name='code'
                        placeholder='Code'
                        code={this.state.code}
                        onChange={this.handleChange}
                        required                   
                    />
                    <div className = 'buttonContainer'>               
                        <button 
                            type="submit" 
                            className = 'space button button3'
                            onClick={this.handleSubmit}>
                            Enter
                        </button>             
                    </div>             
                </div>

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
