import React, { Component } from 'react';

class AddStatement extends Component{

    state = {
        statementNumber:null,
        statement:null,
        isEditing:false
    }

    // call add statement (NewStatements.js)

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addStatement(this.state);
        e.target.reset();
    }

    //update state
    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <input 
                            name="statementNumber"
                            placeholder="Statement number"
                            required
                            type="number"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <input 
                            name="statement"
                            placeholder="Statement"
                            required
                            type="text"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <input 
                            type="submit" 
                            value="Add +" 
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddStatement;