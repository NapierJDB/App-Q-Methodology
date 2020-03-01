import React from "react";
import axios from 'axios';
import logo from './images/logo2.png'

export default class SurveyOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            research: '',
            id: '',
            sName: '',
            sDate: '',
            sCode: '',
            //surveyList: [],
            surveyList: [ {sName: 'name', sDate: 'date', sCode: 'code'}]
    
        };

        //this.setState({
          //  surveyList = [ {sName: 'name', sDate: 'date', sCode: 'code'}]
        //})
    
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleId = this.handleId.bind(this);

      }

      //handleId(event) {
        //this.setState({
          //  id: window.researcher_id.toString()
        //})
     // }

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
                    'researcherID': 111
                })
                 
    
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                //alert(this.state.id)
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
       //this.handleId()
       // window.researcher_id
        return (
            <div className ='TextCenter'>
                <img src={logo}/>
                <button onClick={this.handleSubmit}>Display</button>
                <h1 className = 'primary'>Survey Overview</h1>
                <h2 className = 'primary'>
                    Review your research survey
                </h2>

                    <div className='center TextCenter'>
                        <table className="center">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Code</th>
                                <th>Action</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {this.state.surveyList}                
                            </tbody>        
                        </table>
                    </div>

                <button className = 'space button button3'>
                    Admin panel
                </button>
            </div>
        )
            
        
    }
}
