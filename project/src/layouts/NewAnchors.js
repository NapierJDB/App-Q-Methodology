import React, { Component } from 'react';
import Anchors from './anchorsComponents/Anchors';
import AddAnchor from './anchorsComponents/AddAnchor';
import logo from './images/logo2.png';
import {Link} from 'react-router-dom';


class NewAnchors extends Component {
    constructor(props) {
        super(props);
  
    this.state = {

        anchors: [],
        oldValue: '',
        surveyData: '',
        total: 0,
        
    }
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

    render(){
    
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
                        <Link to={'/NewStatements'}>
                        <button className = 'space button button3'>
                            Next
                        </button>
                        </Link>
                    </div>             
            </div>

        );
    }
}

export default NewAnchors;