import React, { Component } from 'react';
import Statements from './statementsComponents/Statements';
import AddStatement from './statementsComponents/AddStatement';
import { Redirect } from 'react-router-dom';

class NewStatements extends Component {
    constructor(props) {
        super(props);
  
    this.state = {

        statements: [],
        //G_user_token: this.props.location.F_user_token.toString()
        total: window.totalNumberOfItems
    }

    this.sendStatementsToBackend = this.sendStatementsToBackend.bind(this);
}

    //(newStatement) is received from AddStatement.js
    addStatement = (newStatement) => {
        let statements = [...this.state.statements, newStatement];
        this.setState({
            statements,
        });

        this.state.total = parseInt(this.state.total) - 1

    }

    // When press edit button 
    // (i) is received from Statements.js
    editButton = (i) => {
        let statements = this.state.statements;
        statements[i].isEditing = true;
        this.setState({
            statements
        });
    }

    // (i, statementNumber, statement) is received from Statements.js
    updateStatement = (i, statementNumber, statement) => {
        let statements = this.state.statements;
        statements[i].statementNumber = statementNumber;
        statements[i].statement = statement;
        statements[i].isEditing = false;

        this.setState({
            statements
        });

      }

    // (i) is received from Statements.js
    deleteStatement = (i) => {
        let statements = this.state.statements.filter((u,index) =>{ 
            return index !== i;
        });
        this.setState({
            statements
        });

        this.state.total = parseInt(this.state.total) + 1
    }

    sendStatementsToBackend(event) {
  
        event.preventDefault()
        this.setState({ Redirect: true }); 
        /*
        Passing values to store in a database
        */    
        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addResearch',  {
        method: 'POST',
        headers: {
               'Authorization': window.token_data,
               'Content-Type': 'application/json'         
           },
            statements: this.state.statements
                  
       })
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       }); 
  
    }

    render(){
        if (this.state.Redirect) {
            return (
            <Redirect to={{
              pathname: '/AdminPanel',
              //H_user_token: this.state.G_user_token
            }}/>
            )
          }
        return(
            <div>
                <div>
                    <h1>Q-sort cards</h1>
                    <h3>Available statements</h3>
                    <h2>{this.state.total}</h2>
                </div>
                <div>
                    <Statements 
                        allStatements={this.state.statements}
                        editButton={this.editButton}
                        updateStatement={this.updateStatement}
                        deleteStatement={this.deleteStatement}
                    />
                    <AddStatement 
                        addStatement={this.addStatement}
                    />
                </div>
                <div>
                    <button
                    onClick={this.sendStatementsToBackend}>
                        Complete
                    </button>
                </div>
                
               
            </div>

        );
    }
}

export default NewStatements;