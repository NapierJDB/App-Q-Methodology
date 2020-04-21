import React, { Component } from 'react'
import './App.css';
import { Redirect } from 'react-router-dom';

/**
 * Purpose: Allowing the user to answer the questions 
 * provided by the admin with the research
 */

export default class AnswerQuestions extends Component {
    constructor(props) {
        super(props);
        
        this.state = {          
            researchToken: '',
            researchId: '',
            researchName: localStorage.getItem('RE_NAME'),
            answer: '',
            qa: [],
            currentQuestion: '',
            question: '',
            questions: [],
            formatedQuestions: [],
            available: false,
            nextBtnAvailable: true,
        }        
        this.getQuestions = this.getQuestions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.formQA = this.formQA.bind(this);
        this.tip = this.tip.bind(this);
    }

    tip() {
        alert("Type in your answer in the answer text field and press 'Next Question' button.")
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
        
      }


    getQuestions() {

        this.state.researchToken = localStorage.getItem('RE_TOKEN');
        this.state.researchId = localStorage.getItem('RE_ID');

        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/viewQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.researchToken,
            },
            body: JSON.stringify({
                'researchID': this.state.researchId
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // Format the array appropriatelly
                this.state.formatedQuestions = data.map(q =>
                     q.number + " " + q.question)
              console.log(this.state.formatedQuestions)
                // set index to 0 so first item of formated array is displayed
                this.setState({
                     index: 0
                 })

                if(this.state.formatedQuestions.length > 0){
                    //Make the button disabled
                    this.setState(previousState => { 
                        return {available: !previousState.available}
                    })
                }

                
                if(this.state.formatedQuestions.length > 0){
                    //Make the button enabled
                    this.setState(previousState => { 
                        return {nextBtnAvailable: !previousState.nextBtnAvailable}
                    })
                }


            })
            .catch(function (error) {
                console.log(error);
            });
           
    }

    formQA() {
        this.state.currentQuestion = this.state.formatedQuestions[this.state.index];

        if(this.state.formatedQuestions.length > 0){

            const obj = {q_number: this.state.currentQuestion.substring(0,2),
                        answer: this.state.answer };
            
            console.log(obj);

            this.state.qa = [...this.state.qa, obj];

            this.nextQuestion();

            }

    }

    nextQuestion() {


        let remove = this.state.formatedQuestions.indexOf(this.state.formatedQuestions[this.state.index]);
            this.setState({
                formatedQuestions: this.state.formatedQuestions.filter((_, i) => i !== remove),

            });      
        
    }

    checkStatus() {

        if (this.state.formatedQuestions.length == 0) {
        //PASS THE ANSWERS TO LOCAL STORAGE
        localStorage.setItem('ANSWERS', JSON.stringify(this.state.qa));
            this.setState({ Redirect: true });
         }
       
    }

    render() {
        if (this.state.Redirect) {
            return (
                <Redirect to={{
                    pathname: '/QSort1',
                }} />
            )
        }
        let { index, testArray, formatedQuestions } = this.state;
        return (
            <div className='TextCenter'>
                <h1>Questions</h1>
                <h2>{this.state.researchName}</h2>
                <p>Click on the button bellow to start answering questions</p>
                <div>

                    <div>
                        <button 
                            className='space button button3'
                            onClick={this.getQuestions}
                            disabled={this.state.available}>
                            Get questions
                        </button>
                        <h2>{formatedQuestions[index]}</h2>


                                <input
                                className='space textbox'
                                type='text'
                                name='answer'
                                placeholder='Answer'
                                answer={this.state.answer}
                                onChange={this.handleChange}
                                required>
                                </input>

                                <button 
                                className='space button button3'
                                type="submit"
                                disabled={this.state.nextBtnAvailable}
                                onClick={this.formQA}
                                >
                                Next Question
                                </button>

                        

                       <button 
                            className='space button button3'
                            onClick={this.tip}
                            >
                            Help
                        </button>
                    </div>
                </div>

                <button className='space button button3'
                    onClick={this.checkStatus}>
                    Start Survey
                </button>
            </div>
        )
    }
}
