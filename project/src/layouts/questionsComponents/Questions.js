import React, { Component } from 'react';

class Questions extends Component{

    // Call updateStatement (NewStatements.js)
    handleUpdate = () => {
        this.props.updateQuestion(
            this.indexNum,
            this.questionNumber.value,
            this.question.value,
        
        )
    }

     updateQuestionNumber(event) {
         this.questionNumber.value = parseInt(this.questionNumber.value)-1;
    
    }

    render(){

        const { allQuestions, editButton, deleteQuestion} = this.props;

        const questionsList = allQuestions.map((question, index) => {
            
            return question.isEditing === true ? (

                <tr key={index}>
                    
                    <td>
                        <input className = 'space Textbox'
                            type="number"
                            ref={(val) => 
                            {this.questionNumber = val}}
                            required
                            defaultValue={question.questionNumber}
                        />
                    </td>

                    <td>
                        <input className = 'space Textbox' 
                            type="text"
                            ref={(val) => 
                            {this.question = val}}
                            required
                            defaultValue={question.question}
                        />
                    </td>

                    <td>
                        <input className = 'space tableButton tableButton3'
                            type="button"
                            value="Update"
                            onClick={this.handleUpdate}
                            ref={() =>
                            {this.indexNum = index}}
                        />
                    </td>
                </tr>   
            ) : (

                <tr key={index}>
                    <td>{question.questionNumber}</td>
                    <td>{question.question}</td>
                    <td>
                        <button
                            onClick={() => editButton(index)}
                            className = 'space tableButton tableButton3'>
                            Edit                           
                        </button>
                        <button
                            onClick={() => deleteQuestion(index)}
                            className = 'space tableButton tableButton3'>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        
        });
        
        return(
            <div className='center TextCenter'>
                <table className="center">
                <thead>
                    <tr>
                    <th>Question number</th>
                    <th>Question</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questionsList}
                </tbody>
                </table>
        </div>
        );
    }
}

export default Questions;