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

            

            

            redQuantity: [],
            whiteQuantity: [],
            greenQuantity: [],
            redQuantityTotal: 0,
            whiteQuantityTotal: 0,
            greenQuantityTotal: 0,
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
            qa: '',
            currentQuestion: '',
            statement: '',
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
        
        this.getStatements = this.getStatements.bind(this);

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

    getStatements() {

        this.state.researchToken = localStorage.getItem('RE_TOKEN');
        this.state.researchId = localStorage.getItem('RE_ID');

        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/getData', {
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

                this.state.statements = data.statements
                console.log(this.state.statements)

                // Format the array appropriatelly
                this.state.formatedStatements = this.state.statements.map(statement =>
                    statement.number + " " + statement.description)
                
                this.state.statement = this.state.statements.map(statement =>
                    statement.description)
                // set index to 0 so first item of formated array is displayed
                this.setState({
                    index: 0
                })

            })
            .catch(function (error) {
                console.log(error);
            });

            //this.getQuantity();
           
    }

    formQA() {

       // console.log(this.state.index);

        this.state.currentQuestion = this.state.statement[this.state.index];

        const obj = {question: this.state.currentQuestion,
                    answer: this.state.answer };
        
        console.log(obj);

       this.nextQuestion();
    }

    nextQuestion() {

        if (this.state.index == this.state.formatedStatements.length - 1) {

            this.setState({
                index: 0
            })
        }
        else {

            this.setState(prevState => ({
                index: prevState.index + 1
            }))
        }

        

    }

    checkStatus() {
        if (this.state.formatedStatements.length != 0) {
        //     //PASS THE ANSWERS TO LOCAL STORAGE
        //     // localStorage.setItem('RED_BOX', JSON.stringify(this.state.redArray));
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
        let { index, testArray, formatedStatements } = this.state;
        return (
            <div className='TextCenter'>
                <h1>Questions</h1>
                <h2>{this.state.researchName}</h2>
                <p>Click on the button bellow to start answering questions</p>
                <div>

                    <div>
                        <button className='space button button3'
                            onClick={this.getStatements}>
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

                        <h2>{formatedStatements[index]}</h2>

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
