import React from "react";
import { Redirect, Link } from 'react-router-dom';

/**
 * Purpose: Third stage of the sort
 * getting the user to provide their email address
 * and agree to the debrief terms that was created
 * by the admin during the survey creation stage
 * The results of the research are passed to the back end
 * on this page
 */


export default class Debrief extends React.Component {

    constructor() {
        super();

        this.state = {
            agreed: false,
            researchToken: localStorage.getItem('RE_TOKEN'),
            privacyStatement: localStorage.getItem('RE_DEBRIEF'),
            results: [],
            researchID: localStorage.getItem('RE_ID'),
            email: "",
            negative: [],
            neutral: [],
            positive: [],
            statements: [],
            answers: [],
            array: [],
            array2: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.results = this.results.bind(this);

    }

    handleCheckboxChange = (e) => {
        this.setState(previousState => { 
            return {agreed: !previousState.agreed}
            })
            
        localStorage.setItem('PARTICIPANT_EMAIL', this.state.email);
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    results(){
        let negative = localStorage.getItem('NEGATIVE_RESULTS');
        let neutral = localStorage.getItem('NEUTRAL_RESULTS');
        let positive = localStorage.getItem('POSITIVE_RESULTS');
        this.state.negative = JSON.parse(negative);
        this.state.neutral = JSON.parse(neutral);
        this.state.positive = JSON.parse(positive);
        //console.log(this.state.negative);
        let answersString = localStorage.getItem('ANSWERS');
        this.state.answers = JSON.parse(answersString);
        console.log(this.state.answers)

        this.setState({
            results: [this.state.negative + this.state.neutral + this.state.positive]
        }, 
            () => {
                //console.log(this.state.results)
            })

        console.log(this.state.negative);
        console.log(this.state.neutral);
        console.log(this.state.positive);
        
        this.state.statements = this.state.negative.concat(this.state.neutral, this.state.positive);
        
        console.log(this.state.statements);      

        //Creating the object to be passed to back end 
        //which contain the answers, results, email and research ID
        const obj = {researchID: this.state.researchID,                   
                     statements: this.state.statements,
                     answers: this.state.answers,
                     email:this.state.email};

        console.log(obj);
    
      // ---SEND RESULTS TO BACK END---

      fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/sendResults', {

      method: 'POST',
      headers: {
        'Authorization': this.state.researchToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'researchID': this.state.researchID,
        'array': obj
      })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          console.log(data.message);
          console.log(data.error);
          if(!data.error){
            this.setState({ Redirect: true });
          }
          else
          {
            alert(data.message);
          }
      })

  }

    render() {

      if (this.state.Redirect) {
        return (
          <Redirect to={{
            pathname: '/Complete',
          }} />
        )
      }

        let btn_style = this.state.agreed ? 'space button enabled' : 'space button disabled';

        return (
            <div className ='TextCenter'>
                <h1>Consent Form</h1>
                <p>Please provide email address</p>
                <form>
                    <div>
                        <input className="space textbox"
                            type="email"
                            name="email"
                            placeholder="Email address"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                </form>
                <p>Please read and accept the terms and conditions</p>
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

                  <button 
                    onClick={this.results}
                    name=""
                    type="submit" 
                    className = {btn_style}
                    disabled={!this.state.agreed}
                    >
                      Agree
                  </button>
            </div>
        )

    }
   
}