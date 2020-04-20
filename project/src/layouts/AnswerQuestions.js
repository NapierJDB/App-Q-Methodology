import React, { Component } from 'react'
import './App.css';
import redBox from './images/redbox.png'
import greenBox from './images/greenbox.png'
import whiteBox from './images/whitebox.png'
import { Redirect } from 'react-router-dom';
import './App.css';
import Modal from 'react-modal';
import Tooltip from "react-simple-tooltip";

//Modal.setAppElement('App.js')

export default class AnswerQuestions extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
           
            statements: [],
            formatedStatements: [],
            redArray: [],
            whiteArray: [],
            greenArray: [],
            index: 0,
            redVisible: false,
            whiteVisible: false,
            greenVisible: false,
            buttonID: undefined,

            //---QUESTIONS COMPONENTS
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
        }

        // this.getStatements = this.getStatements.bind(this);

        // this.nextItem = this.nextItem.bind(this);

        // this.addtoRed = this.addtoRed.bind(this);
        // this.addtoWhite = this.addtoWhite.bind(this);
        // this.addtoGreen = this.addtoGreen.bind(this);


        //CODE FOR POP UP BOX BINDS
        // this.openRedModal = this.openRedModal.bind(this);
        // this.closeRedModal = this.closeRedModal.bind(this);

        // this.openWhiteModal = this.openWhiteModal.bind(this);
        // this.closeWhiteModal = this.closeWhiteModal.bind(this);

        // this.openGreenModal = this.openGreenModal.bind(this);
        // this.closeGreenModal = this.closeGreenModal.bind(this);

        // this.checkStatus = this.checkStatus.bind(this);

        // this.removeRedStatement = this.removeRedStatement.bind(this);
        // this.removeWhiteStatement = this.removeWhiteStatement.bind(this);
        // this.removeGreenStatement = this.removeGreenStatement.bind(this);
        // this.getQuantity = this.getQuantity.bind(this);

        //---QUESTION COMPOPNENTS
        
        this.getQuestions = this.getQuestions.bind(this);

        this.handleChange = this.handleChange.bind(this);
       // this.handleSubmit = this.handleSubmit.bind(this);

        this.nextQuestion = this.nextQuestion.bind(this);
        this.checkStatus = this.checkStatus.bind(this);

        this.formQA = this.formQA.bind(this);

        this.tip = this.tip.bind(this);

    }

    tip() {
        alert("Type in your answer in the answer text field and press 'Next Question' button.")
    }

    //---QUESTION COMPONETNS
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
        
      }

    //      QF2007

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

               // this.state.error = data.error;
               // console.log(this.state.error);

            //    this.state.questions = data.question
            //    console.log(this.state.questions)

                // Format the array appropriatelly
                this.state.formatedQuestions = data.map(q =>
                     q.number + " " + q.question)
              console.log(this.state.formatedQuestions)
                
                // this.state.statement = this.state.statements.map(statement =>
                //     statement.description)
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

            })
            .catch(function (error) {
                console.log(error);
            });

            //this.getQuantity();
           
    }

    formQA() {

       // console.log(this.state.index);

        this.state.currentQuestion = this.state.formatedQuestions[this.state.index];

        const obj = {q_number: this.state.currentQuestion.substring(0,2),
                    answer: this.state.answer };
        
        console.log(obj);

        this.state.qa = [...this.state.qa, obj];

       this.nextQuestion();
    }

    nextQuestion() {

        let remove = this.state.formatedQuestions.indexOf(this.state.formatedQuestions[this.state.index]);
            this.setState({
                formatedQuestions: this.state.formatedQuestions.filter((_, i) => i !== remove)
            });
        
        
        
    }

    checkStatus() {
        if (this.state.formatedQuestions.length == 0) {
        //PASS THE ANSWERS TO LOCAL STORAGE
        localStorage.setItem('ANSWERS', JSON.stringify(this.state.qa));
        //     // localStorage.setItem('WHITE_BOX', JSON.stringify(this.state.whiteArray));
        //     // localStorage.setItem('GREEN_BOX', JSON.stringify(this.state.greenArray));
            this.setState({ Redirect: true });
         }
       
    }

    //         QJ5921


    render() {
        if (this.state.Redirect) {
            return (
                <Redirect to={{
                    pathname: '/QSort1',
                }} />
            )
        }
        // const mappedList = this.state.statements.map((item, index) => {
        //     return(
    
        //             <tr key={index}>
        //                 <td>{item.description}</td>
        //                 <td>
        //                     <input
        //                         className='space textbox'
        //                         type='text'
        //                         name='answer'
        //                         placeholder='Answer'
        //                         answer={this.state.answer}
        //                         onChange={this.handleChange}
        //                         required>
        //                     </input>
        //                 </td>
        //                 <td>
        //                     <button
        //                         className='space button button3'
        //                         onClick={this.save}>
        //                         Save answer
        //                     </button>
        //                 </td>
        //             </tr>
        //          )
    
        //      });

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

                        {/* <div className='center TextCenter'>
                        <table className="center">
                            <thead>
                                <tr>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Save</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {mappedList}    
                            </tbody>        
                        </table>
                    </div> */}

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
                            onClick={this.formQA}>
                            Next Question
                        </button>

                        

                        <button 
                            className='space button button3'
                            onClick={this.tip}>
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
