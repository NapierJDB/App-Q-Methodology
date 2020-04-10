import React, { Component } from 'react';
import Tooltip from "react-simple-tooltip";

class AddAnchor extends Component{

    state = {
        markerNumber:null,
        numberOfItems:null,
        isEditing:false,
        total: 0,
    }

    // call add anchor (NewAnchors.js)

    handleSubmit = (e) => {
        e.preventDefault();
        
        // Add the total number of items
        this.state.total = 
            parseInt(this.state.numberOfItems) + 
            parseInt(this.state.total);

        //console.log(this.state.total);

        this.props.addAnchor(this.state);
        
        e.target.reset();

        this.send();

        
    }

    //update state
    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
            total: this.state.total,
            
        });

    }

    getResearchID(event) {

        // ---GET ITEMS FROM LOCAL STORAGE---
        const researcherID = localStorage.getItem('ID');
        const token = localStorage.getItem('TOKEN');
        this.setState({ researcherID, token });
        this.state.TOKEN = token;
        this.state.ID = researcherID
           
          fetch("https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/viewResearch ",
            {
                method: 'POST',
                headers: {
                    'Authorization': this.state.TOKEN,
                    'Content-Type': 'application/json'         
                },
                body: JSON.stringify({
                    'researcherID': this.state.ID,
                })
            })
            .then((response) => {
              return response.json();
      
            })
            .then((data) => {
              console.log(data);

              //---STORING THE RESEARCH ID---
              this.state.researchID = data.map(({ id }) => id)
              console.log("List of research IDs: " + this.state.researchID);

              //---GET LAST ID---
              this.state.lastID = this.state.researchID.slice(-1)[0]
              console.log("Last ID: " + this.state.lastID)

      
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    send(event) {

        // ---GET ITEMS FROM LOCAL STORAGE---
        const researcherID = localStorage.getItem('ID');
        const token = localStorage.getItem('TOKEN');
        this.setState({ researcherID, token });

        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addAnchor',  {
        method: 'POST',
        headers: {
               'Authorization': token,
               'Content-Type': 'application/json'         
           },
        body: JSON.stringify({

            'markerNum': this.state.markerNumber,
            'items': this.state.numberOfItems,
            'researchID': this.state.lastID,
          })
          })
          .then((response) => {
            return response.json();
    
          })
          .then((data) => {
            console.log(data);
    
            this.state.error = data.error;
            
            if (this.state.error == true) {
                alert("This marker already exist!") 
            }
    
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    componentDidMount(){
        this.getResearchID();
    }


    render(){

        localStorage.setItem('TOTAL', this.state.total);

        window.totalNumberOfItems = this.state.total
        return(
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <input className = 'space textbox'
                            name="markerNumber"
                            placeholder="Anchor number"
                            required
                            type="number"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <Tooltip 
                            content="Enter the quantity of items to fit in this anchor">
                        <button 
                          disabled 
                          className = 'popupBtn'>
                          ?
                        </button>
                        </Tooltip>  
                        <input className = 'space textbox'
                            name="numberOfItems"
                            placeholder="Number of items"
                            required
                            type="number"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <button className = 'space button button3' 
                            type="submit" >
                            Add +
                        </button>
                    </div>
                  
                    <div>
                        <h2>Total number of items: { this.state.total }</h2>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddAnchor;