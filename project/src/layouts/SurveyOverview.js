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
            surveyList: [ {sName: 'name', sDate: 'date', sCode: 'code'}],
            TOKEN: '',
            ID: '',
            names: [],
            dates: [],
            codes: [],

    
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);

      }

     

      handleSubmit(event) {
       // event.preventDefault()

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
              console.log(data.names);

              //---STORING THE NAMES---
              this.state.names = data.map(({ name }) => name)
              console.log(this.state.names);

              //---STORING THE DATES---
              this.state.dates = data.map(({ created_date }) => created_date)
              console.log(this.state.names);

              //---STORING THE CODES---
              this.state.codes = data.map(({ code }) => code)
              console.log(this.state.codes);
      
            })
            .catch(function (error) {
              console.log(error);
            });
        
      }

    componentDidMount(){
        this.handleSubmit();
    }


    render() {

        // ---GET ITEMS FROM LOCAL STORAGE---
        //const researcherID = localStorage.getItem('ID');
        //const token = localStorage.getItem('TOKEN');
        //this.setState({ researcherID, token });
        //this.state.TOKEN = token;
        //this.state.ID = researcherID
        //this.handleSubmit();

        //https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/viewAnchor
        //https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/deleteAnchor
        //https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/editAnchor
        //Zeby usunac alebo zmienic anchor uzyj id ktore dostaniesz w view anchor

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
                                {
                                    this.state.names.map((numList, index) => (
                                        <tr key={index}>
                                            {
                                                numList.map((num,j)=>
                                                <td key={j}>{num}</td>)
                                            }
                                        </tr>
                                    ))
                                }    
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
