import React, { Component } from 'react';
import Statements from './statementsComponents/Statements';
import AddStatement from './statementsComponents/AddStatement';
import logo from './images/logo2.png';
import {Link} from 'react-router-dom';

class NewStatements extends Component {
    constructor(props) {
        super(props);
  
    this.state = {

        statements: [],
        total: 0,
        statementNumber: 0,
    }

}

    componentDidMount(){
        const sTotal = localStorage.getItem('TOTAL');
        this.setState({ sTotal });
        this.state.total = sTotal;
    }

    //(newStatement) is received from AddStatement.js
    addStatement = (newStatement) => {
        let statements = [...this.state.statements, newStatement];
        this.setState({
            statements,
        });

        this.state.total = parseInt(this.state.total) - 1
       // this.state.statementNumber++;

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
       // this.state.statementNumber--;
    }

    clearLocalStorage() {
        localStorage.removeItem('TOTAL');
    }

   

    render(){
        return(
            <div className='center TextCenter'>
                <img src={logo}/>
                
                <h1 className = 'primary' >Q-sort cards</h1>
                    <h3>Available statements</h3>
                    <h2>{this.state.total}</h2>
                
                <div className='center'>
                    <AddStatement 
                        addStatement={this.addStatement}
                    />
                    <Statements 
                        allStatements={this.state.statements}
                        editButton={this.editButton}
                        updateStatement={this.updateStatement}
                        deleteStatement={this.deleteStatement}
                    />               
                </div>

                <div>
                    <Link to={'/NewQuestions'}>
                    <button className = 'space button button3'
                        onClick={this.clearLocalStorage}>
                        Next
                    </button>
                    </Link>
                </div>
                
               
            </div>

        );
    }
}

export default NewStatements;