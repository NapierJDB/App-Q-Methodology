import React, { useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom'


export default class CreateSurvey_1 extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        surveyName: "",
        description: "",
        box1: "",
        box2: "",
        box3: "",
        numberOfStatements: "",
        anchor: "",
        itemsPerAnchor: "",
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange= event =>  {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        /*
        Check if values are stored 
        by displaying an alert message
        */
  
        alert(
            this.state.surveyName + 
            '\n' + 
            this.state.description +
            '\n' +
            this.state.box1 + 
            '\n' +
            this.state.box2 + 
            '\n' +
            this.state.box3 + 
            '\n' +
            this.state.numberOfStatements
            )
  
        event.preventDefault()
  
        /*
        Passing values to store in a database
        */
  
    }

    render() {
        return (
          <div>
            <h1>Create new survey</h1>

            <div>
                <form onSubmit={this.handleSubmit}>

                    <input
                    type="text"
                    name="surveyName"
                    placeholder="Survey Name"
                    surveyName={this.state.surveyName}
                    onChange={this.handleChange}
                    required
                    />

                    <input
                    type="text"
                    name="description"
                    placeholder="Description..."
                    description={this.state.description}
                    onChange={this.handleChange}
                    required
                    />

                    <input
                    type="text"
                    name="box1"
                    placeholder="Box1"
                    box1={this.state.box1}
                    onChange={this.handleChange}
                    required
                    />
                    <input
                    type="text"
                    name="box2"
                    placeholder="Box2"
                    box2={this.state.box2}
                    onChange={this.handleChange}
                    required
                    />
                    <input
                    type="text"
                    name="box3"
                    placeholder="Box3"
                    box3={this.state.box3}
                    onChange={this.handleChange}
                    required
                    />

                    <input
                    type="number"
                    name="numberOfStatements"
                    placeholder="Number of statements"
                    numberOfStatements={this.state.numberOfStatements}
                    onChange={this.handleChange}
                    required
                    />
                </form>
            </div>

            <div>
                <button type="submit">
                Next
                </button>
            </div>

          </div>
        );
    }
}


  