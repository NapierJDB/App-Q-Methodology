import React, { useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,} from 'react-router-dom';



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
        //C_user_token: this.props.location.B_user_token.toString()
        surveyData: '',
        //user_token: window.token_data.toString(),
       
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.sendResearchInfoToBackend = this.sendResearchInfoToBackend.bind(this);
    }

    handleChange = event =>  {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    sendResearchInfoToBackend(event) {
  
        event.preventDefault()
        this.setState({ Redirect: true });
        //console.log(window.token_data)
        /*
        Passing values to store in a database
        */

      fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addResearch',  {
        method: 'POST',
        headers: {
               'Authorization': window.token_data,
               'Content-Type': 'application/json'         
           },
            survey_name: this.state.survey_name,
            description: this.state.description,
            box1: this.state.box1,
            box2: this.state.box2,
            box3: this.state.box3,
                  
       })
       
       .then(function (response) {
         console.log(response);

         //this.state.surveyData = response.data;
         //console.log(this.state.surveyData);
         
       })
       .catch(function (error) {
         console.log(error);
       }); 
  
    }

    //twoFunctions(event) {
       // //this.setToken();
        //this.handleSubmit();
   // }

    render() {

        if (this.state.Redirect) {
            return (           
            <Redirect to={{
              pathname: '/NewAnchors',
              //D_user_token: this.state.C_user_token
            }}/>
            )
          }

        return (
          <div>
            <h1>Create new research</h1>
              <h2>{window.token_data}</h2>
            <div>
                <h2>Research information</h2>
                <form>
                    <div>
                        <input
                        type="text"
                        name="survey_name"
                        placeholder="Research name"
                        survey_name={this.state.survey_name}
                        onChange={this.handleChange}
                        required
                        />
                    </div>

                    <div>
                        <input
                        type="text"
                        name="description"
                        placeholder="Description..."
                        description={this.state.description}
                        onChange={this.handleChange}
                        required
                        />       
                    </div>

                    <div>
                        <input
                        type="text"
                        name="box1"
                        placeholder="Box 1"
                        box1={this.state.box1}
                        onChange={this.handleChange}
                        required
                        />                   
                    </div>

                    <div>
                        <input
                        type="text"
                        name="box2"
                        placeholder="Box 2"
                        box2={this.state.box2}
                        onChange={this.handleChange}
                        required
                        />                     
                    </div>

                    <div>
                        <input
                        type="text"
                        name="box3"
                        placeholder="Box 3"
                        box3={this.state.box3}
                        onChange={this.handleChange}
                        required
                        />                    
                    </div>

                    <div>
                        <input
                        type="text"
                        name="privacy"
                        placeholder="Privacy statement"
                        privacy={this.state.privacy}
                        onChange={this.handleChange}
                        required
                        />                    
                    </div>

                    <div>
                        <input
                        type="text"
                        name="debrief"
                        placeholder="Debrief"
                        debrief={this.state.debrief}
                        onChange={this.handleChange}
                        required
                        />                    
                    </div>

                    <div>
                        <button onClick={this.sendResearchInfoToBackend}>
                            Next
                        </button>            
                    </div>
             </form>
            </div>

           

          </div>
        );
    }
}


  