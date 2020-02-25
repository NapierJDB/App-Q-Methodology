import React, { useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
    Route,
    Link,
    Switch} from 'react-router-dom';
import CreateAnchors from './CreateAnchors';
import StatementCreator from './StatementCreator';


export default class CreateSurvey_1 extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        survey_name: "",
        description: "",
        box1: "",
        box2: "",
        box3: "",
       user_token: this.props.location.mtoken_data.toString()
       
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setToken = this.setToken.bind(this);
      //this.twoFunctions = this.twoFunctions.bind(this);
    }

    handleChange = event =>  {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    setToken(event) {

        alert(this.state.user_token)
    }

    handleSubmit(event) {
  
        event.preventDefault()
  
        /*
        Passing values to store in a database
        */

        
       alert(this.state.user_token)
      fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addResearch',  {
        method: 'POST',
           headers: {
               'Authorization': this.state.user_token,
               'Content-Type': 'application/json'         
           }
           
         
       })
       .then(function (response) {
         console.log(response);
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

       // const { token_data } = this.props.location

        return (
          <div>
            <h1>Create new research</h1>

            <div>
                <h2>Research information</h2>
                <form onSubmit={this.handleSubmit}>
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
             </form>
            </div>

            <div>
                <CreateAnchors />
            </div>

            <div>
                <StatementCreator />
            </div>

            <div>
                <Link to='/AdminPanel'>
                    <button onClick={this.handleSubmit}>
                        Create survey
                    </button>
                </Link>

                <button onClick={this.setToken}>
                        Token
                    </button>
            </div>


          </div>
        );
    }
}


  