import React from "react";
import axios from 'axios';
import logo from './images/logo2.png'

export default class SurveyOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            research: '',
            id: window.researcher_id,
    
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      handleSubmit(event) {
        event.preventDefault()
    
        
          fetch("https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/viewResearch ",
            {
                method: 'POST',
                headers: {
                    'Authorization': window.token_data,
                    'Content-Type': 'application/json'         
                },
                body: JSON.stringify({
                    'researcherID': 113 // this.state.id, nie dziala
                })
                 
    
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                alert(this.state.id)
            })
           //.then((response) => {
    
            //console.log(response);
    
            //this.state.research = response.data;
            //console.log(this.state.research);

          //}, 
          //error) => {
            //console.log(error);
          //})
          .catch(function (error) {
            console.log(error);
          })
        
      }

    //https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/viewResearch

    render() {
        return (
            <div className ='TextCenter'>
                <img src={logo}/>
                <h1>{window.researcher_id}</h1>
                <button className = 'space button button3' onClick={this.handleSubmit}>Display</button>
                <h1 className = 'primary'>Survey Overview</h1>
                <h2 className = 'primary'>
                    Review your research survey
                </h2>
                <div>
                    <label className = 'primary'>
                        Survey Name:
                    </label>
                </div>
                <div>
                    <label className = 'primary'>
                        Description:
                    </label>
                </div>
                <div>
                    <label className = 'primary'>
                        Box 1:
                    </label >
                </div>
                <div>
                    <label className = 'primary'>
                        Box 2:
                    </label>
                </div>
                <div>
                    <label className = 'primary'>
                        Box 3:
                    </label>
                </div>
                <div>
                    <label className = 'primary'>
                        Anchors quantity:
                    </label>
                </div>
                <div>
                    <label className = 'primary'>
                        Statements quantity:
                    </label>
                </div>
                <button className = 'space button button3'>
                    Create survey
                </button>
            </div>
        )
            
        
    }
}
