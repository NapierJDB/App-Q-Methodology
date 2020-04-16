import React, { Component } from 'react';

class AddQuestion extends Component{

    state = {
        //statementNumber: 0,
        question:null,
        isEditing:false,

    }

    // call add statement (NewStatements.js)

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addQuestion(this.state);
        e.target.reset();
       // this.send();
    }

    //update state
    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    // updateStatementNumber(event) {

    //     this.state.statementNumber++;
    // }

    // getResearchID(event) {

    //     // ---GET ITEMS FROM LOCAL STORAGE---
    //     const researcherID = localStorage.getItem('ID');
    //     const token = localStorage.getItem('TOKEN');
    //     this.setState({ researcherID, token });
    //     this.state.TOKEN = token;
    //     this.state.ID = researcherID
           
    //       fetch("https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/viewResearch ",
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': this.state.TOKEN,
    //                 'Content-Type': 'application/json'         
    //             },
    //             body: JSON.stringify({
    //                 'researcherID': this.state.ID,
    //             })
    //         })
    //         .then((response) => {
    //           return response.json();
      
    //         })
    //         .then((data) => {
    //           console.log(data);

    //           //---STORING THE RESEARCH ID---
    //           this.state.researchID = data.map(({ id }) => id)
    //           console.log("List of research IDs: " + this.state.researchID);

    //           //---GET LAST ID---
    //           this.state.lastID = this.state.researchID.slice(-1)[0]
    //           console.log("Last ID: " + this.state.lastID)

      
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    // }

    // send(event) {

    //     // ---GET ITEMS FROM LOCAL STORAGE---
    //     const researcherID = localStorage.getItem('ID');
    //     const token = localStorage.getItem('TOKEN');
    //     this.setState({ researcherID, token });

    //     this.updateStatementNumber();

    //     fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addStatement',  {
    //     method: 'POST',
    //     headers: {
    //            'Authorization': token,
    //            'Content-Type': 'application/json'         
    //        },
    //     body: JSON.stringify({

    //        // 'number': this.state.statementNumber,
    //         'question': this.state.question,
    //         'researchID': this.state.lastID,
    //       })
    //       })
    //       .then((response) => {
    //         return response.json();
    
    //       })
    //       .then((data) => {
    //         console.log(data);
    
    //         this.state.error = data.error;
            
    //         if (this.state.error == true) {
    //             alert("This question already exist!") 
    //         }  
    
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    // }


    // componentDidMount(){
    //     this.getResearchID();
    // }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        {/* <input className = 'space textbox'
                            name="statementNumber"
                            placeholder="Statement number"
                            required
                            type="number"
                            onChange={this.updateState}
                        /> */}
                    </div>

                    <div>
                        <input className = 'space textbox'
                            name="question"
                            placeholder="Question"
                            required
                            type="text"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <button 
                            className = 'space button button3' 
                            // type="submit" 
                        >
                            Add +
                        </button>
                    </div>

                </form>
            </div>
        );
    }
}

export default AddQuestion;