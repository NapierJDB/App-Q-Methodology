import React, { Component } from 'react'
import './App.css';
import logo from './images/logo2.png'

import { Link, Redirect } from 'react-router-dom';
import './App.css';

export default class Participant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            researchToken: '',
            researchId: '',

            researchInfo: [],
            anchors: [],
            statements: [],

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getResearchData = this.getResearchData.bind(this);
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    handleSubmit(event) {
        //event.preventDefault()
        //console.log(this.state.code)
        //this.setState({ Redirect: true });

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

                //console.log('TOKEN: ' + this.state.researchToken)
                //console.log('ID: ' + this.state.researchId)

                
        
                if (this.state.error == false) {

                    // ---PASS TO LOCAL STORAGE---
                    localStorage.setItem('RE_TOKEN', this.state.researchToken);
                    localStorage.setItem('RE_ID', this.state.researchId);

                    this.getResearchData();

                   // this.setState({ Redirect: true });
                    
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

                //this.state.error = data.error;

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

                this.setState({ Redirect: true });

    
              })
              .catch(function (error) {
                console.log(error);
              });
    }

// QP2051
  
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
            </div>
        )
    }
}
