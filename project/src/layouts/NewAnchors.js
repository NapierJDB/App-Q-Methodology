import React, { Component } from 'react';
import Anchors from './anchorsComponents/Anchors';
import AddAnchor from './anchorsComponents/AddAnchor';
import { Redirect } from 'react-router-dom';
import logo from './images/logo2.png';

class NewAnchors extends Component {
    constructor(props) {
        super(props);
  
    this.state = {

        anchors: [],
        oldValue: '',
        surveyData: '',
        total: 0,

    }

    this.send = this.send.bind(this);
    this.show = this.show.bind(this);
}

    //(newAnchor) is received from AddAnchor.js
    addAnchor = (newAnchor) => {
        let anchors = [...this.state.anchors, newAnchor];
        this.setState({
            anchors
        });
    }

    // When press edit button 
    // (i) is received from Anchors.js
    editButton = (i) => {
        let anchors = this.state.anchors;
        anchors[i].isEditing = true;
        this.setState({
            anchors,
            oldValue: anchors[i].numberOfItems
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

    send(event) {
  
        event.preventDefault()

        // ---GET ITEMS FROM LOCAL STORAGE---
        const researcherID = localStorage.getItem('ID');
        const token = localStorage.getItem('TOKEN');
        this.setState({ researcherID, token });

        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addResearch',  {
        method: 'POST',
        headers: {
               'Authorization': token,
               'Content-Type': 'application/json'         
           },
        body: JSON.stringify({

            'researcherID': researcherID,
            anchors: this.state.anchors
          })
          })
          .then((response) => {
            return response.json();
    
          })
          .then((data) => {
            console.log(data);
    
            this.state.error = data.error;
            
            if (this.state.error == false) {
              this.setState({ Redirect: true });
            }
            else {
              alert("Upps...\nSomething went wrong!") 
              this.setState({ Redirect: true });
            }
    
    
          })
          .catch(function (error) {
            console.log(error);
          });
    

       
  
    }

    show(event) {
        //This method is used to show values of the anchors array
        console.log(this.state.anchors);
    }


    render(){
    
        if (this.state.Redirect) {
            return (
            <Redirect to={{
              pathname: '/NewStatements',
            }}/>
            )
          }
        return(
            <div className='center TextCenter'>
                <img src={logo}/>
                    <h1 className = 'primary' >Rating scale</h1>
                    
                    <div className='center'>
                        <div>
                            <AddAnchor 
                            addAnchor={this.addAnchor}
                            />
                        </div>
                        <div>
                            <Anchors 
                            allAnchors={this.state.anchors}
                            editButton={this.editButton}
                            updateAnchor={this.updateAnchor}
                            deleteAnchor={this.deleteAnchor}
                            oldValue={this.state.oldValue}
                        />
                         </div>
                    </div>                       
                <div>
                    <button onClick={this.send}
                    className = 'space button button3'>
                        Next
                    </button>
                </div>
                
               
            </div>

        );
    }
}

export default NewAnchors;