import React, { Component } from 'react';

class Statements extends Component{

    // Call updateStatement (NewStatements.js)
    handleUpdate = () => {
        this.props.updateStatement(
            this.indexNum,
            this.statementNumber.value,
            this.statement.value,)
    }

    render(){

        const { allStatements, editButton, deleteStatement} = this.props;

        const statementsList = allStatements.map((statement, index) => {
            
            return statement.isEditing === true ? (

                <tr key={index}>
                    
                    <td>
                        <input className = 'space Textbox'
                            type="number"
                            ref={(val) => 
                            {this.statementNumber = val}}
                            required
                            defaultValue={statement.statementNumber}
                        />
                    </td>

                    <td>
                        <input className = 'space Textbox' 
                            type="text"
                            ref={(val) => 
                            {this.statement = val}}
                            required
                            defaultValue={statement.statement}
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
                    <td>{statement.statementNumber}</td>
                    <td>{statement.statement}</td>
                    <td>
                        <button
                            onClick={() => editButton(index)}
                            className = 'space tableButton tableButton3'>
                            Edit                           
                        </button>
                        <button
                            onClick={() => deleteStatement(index)}
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
                    <th>Statement number</th>
                    <th>Statement</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {statementsList}
                </tbody>
                </table>
        </div>
        );
    }
}

export default Statements;