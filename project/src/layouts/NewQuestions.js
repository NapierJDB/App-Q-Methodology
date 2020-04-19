import React, { Component } from 'react';
import Questions from './questionsComponents/Questions';
import AddQuestion from './questionsComponents/AddQuestion';
import logo from './images/logo2.png';
import {Link} from 'react-router-dom';

class NewQuestions extends Component {
    constructor(props) {
        super(props);
  
    this.state = {

        questions: [],
        total: 0,
        questionNumber: 0,
    }

}

    // componentDidMount(){
    //     const sTotal = localStorage.getItem('TOTAL');
    //     this.setState({ sTotal });
    //     this.state.total = sTotal;
    // }

    //(newStatement) is received from AddStatement.js
    addQuestion = (newQuestion) => {
        let questions = [...this.state.questions, newQuestion];
        this.setState({
            questions,
        });

        //this.state.total = parseInt(this.state.total) - 1
        this.state.statementNumber++;

    }

    // When press edit button 
    // (i) is received from Statements.js
    editButton = (i) => {
        let questions = this.state.questions;
        questions[i].isEditing = true;
        this.setState({
            questions
        });
    }

    // (i, statementNumber, statement) is received from Statements.js
    updateQuestion = (i, question) => {
        let questions = this.state.questions;
        //statements[i].statementNumber = statementNumber;
        questions[i].questions = question;
        questions[i].isEditing = false;

        this.setState({
            questions
        });

      }

    // (i) is received from Statements.js
    deleteQuestions = (i) => {
        let questions = this.state.questions.filter((u,index) =>{ 
            return index !== i;
        });
        this.setState({
            questions
        });

        //this.state.total = parseInt(this.state.total) + 1
        this.state.statementNumber--;
    }

    // clearLocalStorage() {
    //     localStorage.removeItem('TOTAL');
    // }

   

    render(){
        return(
            <div className='center TextCenter'>
                <img src={logo}/>
                
                <h1 className = 'primary' >Q-sort questions</h1>
                    {/* <h3>Available statements</h3> */}
                    {/* <h2>{this.state.total}</h2> */}
                
                <div className='center'>
                    <AddQuestion 
                        addQuestion={this.addQuestion}
                    />
                    <Questions 
                        allQuestions={this.state.questions}
                        editButton={this.editButton}
                        updateQuestion={this.updateQuestion}
                        deleteQuestion={this.deleteQuestion}
                    />               
                </div>

                <div>
                    <Link to={'/AdminPanel'}>
                    <button 
                        className = 'space button button3'
                        // onClick={this.clearLocalStorage}
                    >
                        Complete
                    </button>
                    </Link>
                </div>
                
               
            </div>

        );
    }
}

export default NewQuestions;