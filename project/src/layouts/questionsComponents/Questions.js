import React, { Component } from 'react';

class Questions extends Component{

    // Call updateStatement (NewStatements.js)
    handleUpdate = () => {
        this.props.updateQuestion(
            this.indexNum,
            //this.statementNumber.value,
            this.question.value,
        
        )
    }

    // updateStatementNumber(event) {
    //     this.statementNumber.value = parseInt(this.statementNumber.value)-1;
    
    // }

    render(){

        const { allQuestions, editButton, deleteQuestion} = this.props;

        const questionsList = allQuestions.map((question, index) => {
            
            return question.isEditing === true ? (

                <tr key={index}>
                    
                    {/* <td>
                        <input className = 'space Textbox'
                            type="number"
                            ref={(val) => 
                            {this.statementNumber = val}}
                            required
                            defaultValue={statement.statementNumber}
                        />
                    </td> */}

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
                    {/* <td>{statement.statementNumber}</td> */}
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
                    {/* <th>Statement number</th> */}
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