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


export default class Debrief extends React.Component {

    constructor() {
        super();

        this.state = {
            agreed: false,
            privacyStatement: localStorage.getItem('RE_PRIVACY'),
            results: [],
            researchID: localStorage.getItem('RE_ID'),
            email: "",
            negative: [],
            neutral: [],
            positive: [],
            statements: [],
            testArray: {

                researchID: 123, 
                statements:[

                    {markerNum:1, statement:1},
                    {markerNum:2, statement:2}
                ], 
                email:"test@email.com"
            },

            array: [],
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

        this.setState({
            results: [this.state.negative + this.state.neutral + this.state.positive]
        }, 
            () => {
                console.log(this.state.results)
            })

        console.log(this.state.negative);
        console.log(this.state.neutral);
        console.log(this.state.positive);

        //const statementObj2 = Object.assign(this.state.negative, this.state.neutral, this.state.positive);
        //console.log(statementObj2);

        //const statementObj = this.state.negative;
        
        this.state.statements = this.state.negative.concat(this.state.neutral, this.state.positive);
        console.log(this.state.statements);
        
        
        const obj = {researchID: this.state.researchID,
                     email:this.state.email,
                     statements: this.state.statements};

         this.state.array = [...this.state.array, obj]
         console.log(this.state.array)
        
    }

    //      QJ5921

    render() {

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
                
                {/* <Link to={'/Complete'}> */}
                  <button 
                    onClick={this.results}
                    name=""
                    type="submit" 
                    className = {btn_style}
                    disabled={!this.state.agreed}
                    >
                      Agree
                  </button>
                {/* </Link> */}
            </div>
        )

    }
   
}