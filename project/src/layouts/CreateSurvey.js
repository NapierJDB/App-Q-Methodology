import React, { useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import logo from './images/logo2.png'



export default class CreateSurvey_1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      survey_name: "",
      description: "",
      box1: "",
      box2: "",
      box3: "",
      privacy: '',
      debrief: '',
      error: '',

    };

    this.handleChange = this.handleChange.bind(this);
    this.send = this.send.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  send(event) {

    event.preventDefault()

    // ---GET ITEMS FROM LOCAL STORAGE---
    const researcherID = localStorage.getItem('ID');
    const token = localStorage.getItem('TOKEN');
    this.setState({ researcherID, token });


    fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addResearch ', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'researcherID': researcherID,
        'name': this.state.survey_name,
        'description': this.state.description,
        'box1': this.state.box1,
        'box2': this.state.box2,
        'box3': this.state.box3,
        'privacy_statement': this.state.privacy,
        'debrief': this.state.debrief
      })
      })
      .then((response) => {
        return response.json();

      })
      .then((data) => {
        console.log(data);

        this.state.error = data.error;
        
        if (this.state.error == false) {
          this.setState({ Redirect: true });
        }
        else {
          alert("Upps...\nIt looks like this survey already exist!")
        }


      })
      .catch(function (error) {
        console.log(error);
      });


  }

  render() {

    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/NewAnchors',
        }} />
      )
    }

    return (
      <div className = 'TextCenter'>
            <img src={logo}/>
            <h1 className = 'primary'>Create new research</h1>

            <div>

                <h2 className = 'primary'>Research information</h2>
                <form>
                  <div>
                    <div className = 'column'>
                          <input className = 'space textbox'
                          type="text"
                          name="survey_name"
                          placeholder="Research name"
                          survey_name={this.state.survey_name}
                          onChange={this.handleChange}
                          required
                          />
                      </div>

                      <div>
                          <textarea className = 'space descriptionTextbox'
                          type="text"
                          name="description"
                          placeholder="Description..."
                          description={this.state.description}
                          onChange={this.handleChange}
                          required
                          />       
                      </div>

                      <div>
                          <input className = 'space textbox'
                          type="text"
                          name="box1"
                          placeholder="Box 1"
                          box1={this.state.box1}
                          onChange={this.handleChange}
                          required
                          />                   
                      </div>

                      <div>
                          <input className = 'space textbox'
                          type="text"
                          name="box2"
                          placeholder="Box 2"
                          box2={this.state.box2}
                          onChange={this.handleChange}
                          required
                          />                     
                      </div>

                      <div>
                          <input className = 'space textbox'
                          type="text"
                          name="box3"
                          placeholder="Box 3"
                          box3={this.state.box3}
                          onChange={this.handleChange}
                          required
                          />                    
                      </div>

                      <div>
                          <textarea className = 'space descriptionTextbox'
                          type="text"
                          name="privacy"
                          placeholder="Privacy statement"
                          privacy={this.state.privacy}
                          onChange={this.handleChange}
                          required
                          />                    
                      </div>

                      <div>
                          <textarea className = 'space descriptionTextbox'
                          type="text"
                          name="debrief"
                          placeholder="Debrief"
                          debrief={this.state.debrief}
                          onChange={this.handleChange}
                          required
                          />                    
                      </div>

                      <div>
                          <button onClick={this.send}
                          className = 'space button button3'>
                              Next
                          </button>            
                      </div>
                  </div>                   
             </form>
            </div>

           

          </div>
    );
  }
}


