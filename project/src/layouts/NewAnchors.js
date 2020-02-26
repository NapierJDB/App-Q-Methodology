import React, { Component } from 'react';
import Anchors from './anchorsComponents/Anchors';
import AddAnchor from './anchorsComponents/AddAnchor';
import { Redirect } from 'react-router-dom';

class NewAnchors extends Component {
    constructor(props) {
        super(props);
  
    this.state = {

        anchors: [],
        E_user_token: this.props.location.D_user_token.toString(),

    }

    this.sendAnchorsToBackend = this.sendAnchorsToBackend.bind(this);
}

    //(newAnchor) is received from AddAnchor.js
    addAnchor = (newAnchor) => {
        let anchors = [...this.state.anchors, newAnchor];
        this.setState({
            anchors
        });

        

        //this.state.total = this.state.total + 1;
    }

    // When press edit button 
    // (i) is received from Anchors.js
    editButton = (i) => {
        let anchors = this.state.anchors;
        anchors[i].isEditing = true;
        this.setState({
            anchors
        });
    }

    // (i, markerNumber, numberOfItems) is received from Anchors.js
    updateAnchor = (i, markerNumber, numberOfItems) => {
        let anchors = this.state.anchors;
        anchors[i].markerNumber = markerNumber;
        anchors[i].numberOfItems = numberOfItems;
        anchors[i].isEditing = false;

        this.setState({
            anchors
        });

      }

    // (i) is received from Anchors.js
    deleteAnchor = (i) => {
        let anchors = this.state.anchors.filter((u,index) =>{ 
            return index !== i;
        });
        this.setState({
            anchors
        });
    }

    sendAnchorsToBackend(event) {
  
        event.preventDefault()
        this.setState({ Redirect: true }); 
        /*
        Passing values to store in a database
        */    
        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addResearch',  {
        method: 'POST',
        headers: {
               'Authorization': this.state.E_user_token,
               'Content-Type': 'application/json'         
           },
            anchors: this.state.anchors
                  
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
              pathname: '/NewStatements',
              F_user_token: this.state.E_user_token
            }}/>
            )
          }
        return(
            <div>
                <div>
                    <h1>Rating scale</h1>
                </div>
                <div>
                    <Anchors 
                        allAnchors={this.state.anchors}
                        editButton={this.editButton}
                        updateAnchor={this.updateAnchor}
                        deleteAnchor={this.deleteAnchor}
                    />
                    <AddAnchor 
                        addAnchor={this.addAnchor}
                    />
                </div>
                <div>
                    <button
                    onClick={this.sendAnchorsToBackend}>
                        Next
                    </button>
                </div>
                
               
            </div>

        );
    }
}

export default NewAnchors;