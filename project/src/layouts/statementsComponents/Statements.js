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
                        <input className = 'spaceTextbox'
                            type="number"
                            ref={(val) => 
                            {this.statementNumber = val}}
                            required
                            defaultValue={statement.statementNumber}
                        />
                    </td>

                    <td>
                        <input className = 'spaceTextbox' 
                            type="text"
                            ref={(val) => 
                            {this.statement = val}}
                            required
                            defaultValue={statement.statement}
                        />
                    </td>

                    <td>
                        <input className = 'spaceTextbox'
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
                            onClick={() => editButton(index)}>
                            Edit                           
                        </button>
                        <button
                            onClick={() => deleteStatement(index)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        
        });
        
        return(
            <table>
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
        );
    }
}

export default Statements;