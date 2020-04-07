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
            email: "",
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

        this.setState({
            results: [negative + neutral + positive]
        }, 
            () => {
                console.log(this.state.results)
            })

        const obj = {'email':this.state.email};
        this.state.results = [...this.state.results, obj]
        console.log(this.state.results)
        
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