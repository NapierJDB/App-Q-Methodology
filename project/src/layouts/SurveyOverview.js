import React from "react";
import axios from 'axios';
import logo from './images/logo2.png';
import Modal from 'react-modal';

//https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/createFile
//Musisz dodac researchID w body i ten pierwszy token w headers
//https://soc-web-liv-60.napier.ac.uk/API/public/download.php

export default class SurveyOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            research: '',
            id: '',
            sName: '',
            sDate: '',
            sCode: '',
            //surveyList: [ {sName: 'name', sDate: 'date', sCode: 'code'}],
            TOKEN: '',
            ID: '',
            names: [],
            dates: '',
            codes: '',
            list: [],
            researchArray: [],
            testList: [{name: "Anna", date: "24/11/1993", code: "12345"},
        {name: "Joel", date: "13/05/1992", code: "54321"}],
            researchPopup: false,
            selectedResearchIndex: 0,
            selectedResearch: [],
            researchID: '',
            idToExport: '',

    
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSelectedResearchIndex = this.getSelectedResearchIndex.bind(this);
        this.viewResearch = this.viewResearch.bind(this);
        this.exportResults = this.exportResults.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.download = this.download.bind(this);

      }

      componentDidMount(){
        this.handleSubmit();
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
              console.log(data);

              this.state.list = data;
              console.log(this.state.list)

              //---STORING THE NAMES---
              this.state.names = data.map(({ name }) => name)
              console.log(this.state.names);
              //this.state.sName = this.state.names;
              //console.log(this.state.sNames);

              //---STORING THE DATES---
              this.state.dates = data.map(({ created_date }) => created_date)
              console.log(this.state.dates);

              //---STORING THE CODES---
              this.state.codes = data.map(({ code }) => code)
              console.log(this.state.codes);

              //---STORING RESEARCH ID---
              this.state.researchID = data.map(({ id }) => id)
              console.log(this.state.researchID)

              this.state.researchArray = data.map(item => 
                item.name + " " + item.created_date + " " + item.code +  " " + item.id)

                console.log(this.state.researchArray);
      
            })
            .catch(function (error) {
              console.log(error);
            });
        
      }

    

    getSelectedResearchIndex(){
        this.state.selectedResearch = this.state.list[this.state.selectedResearchIndex];
        console.log(this.state.selectedResearch);
    }

    viewResearch(){
        this.setState({
            researchPopup: true
        })

        this.getSelectedResearchIndex();
        
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    exportResults(){

        //console.log(this.state.idToExport);
        // if(this.state.researchArray.indexOf(this.state.idToExport)){
        //    console.log("contains")
        //    //var index = this.state.researchArray.indexOf(this.state.idToExport)
        //    // console.log(index);

        // }

        if(this.state.researchArray.indexOf(this.state.idToExport)){

        
            fetch("https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/createFile",
                {
                    method: 'POST',
                    headers: {
                        'Authorization': this.state.TOKEN,
                        'Content-Type': 'application/json'         
                    },
                    body: JSON.stringify({
                        'researchID': this.state.idToExport,
                    })
                })
                .then((response) => {
                    //return response.json();
                    console.log(response);
                // console.log(this.state.researchID);
        
                })
                // .then((data) => {
                //   console.log(data);

        
                // })
                .catch(function (error) {
                console.log(error);
                });
        }
        else{
            alert("This id doesn't exist");
        }
    }

    download(){
        window.location.href = "https://soc-web-liv-60.napier.ac.uk/API/public/download.php";
    }


    render() {
        const mappedList = this.state.list.map((item, index) => {
            return(
    
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.created_date}</td>
                        <td>{item.code}</td>
                        <td>{item.id}</td>
                        {/* <td> */}
                            {/* <button
                                className='space button button3'
                                onClick={this.exportResults}>
                                Export results{item.id}
                            </button> */}
                            {/* <button                                
                                className = 'space tableButton tableButton3'
                                onClick={this.viewResearch}
                            >
                                <div onClick={e => e.stopPropagation()}>
                                    <Modal className="ModalResearchView" isOpen={this.state.researchPopup} >
                                        <div>
                                            <br></br>
                                            <h1>Research</h1>
                                            <h3>Id </h3>
                                                <p>{this.state.selectedResearch.id}</p>
                                            <h3>Name </h3> 
                                                <p>{this.state.selectedResearch.name}</p>
                                            <h3>Date </h3> 
                                                <p>{this.state.selectedResearch.created_date}</p>
                                            <h3>Code </h3> 
                                                <p>{this.state.selectedResearch.code}</p>
                                            <h3>Description </h3> 
                                                <p>{this.state.selectedResearch.description}</p>
                                            <h3>Box 1</h3> 
                                                <p>{this.state.selectedResearch.box1}</p>
                                            <h3>Box 2</h3> 
                                                <p>{this.state.selectedResearch.box2}</p>
                                            <h3>Box 3</h3> 
                                                <p>{this.state.selectedResearch.box3}</p>
                                            <h3>Privacy notice</h3> 
                                                <p>{this.state.selectedResearch.privacy_statement}</p>
                                            <h3>Debrief </h3> 
                                                <p>{this.state.selectedResearch.debrief}</p>
                                            
                                          </div>
                                            {/* {this.state.redArray.map(v => 
                                                <div>
                                                    <p>{v}</p> 
                                                    <button 
                                                        id={this.state.redArray.indexOf(v)} 
                                                        onClick={this.removeRedStatement}>
                                                            Edit
                                                    </button>
                                                </div>
                                            )} */}
                                            {/* <button onClick={this.closeRedModal}>Close</button> */}
                                    {/* </Modal>
                                </div>
                                View
                            </button> */} 
                        {/* </td>                             */}
                    </tr>
                 )
    
             });

        return (
            <div className ='TextCenter'>
                <img src={logo}/>
                <h1 className = 'primary'>Survey Overview</h1>
                <h2 className = 'primary'>
                    Review your research survey
                </h2>
                <button 
                    className='space button button3'
                    onClick={this.handleSubmit}>
                        Display
                </button>

                    <div className='center TextCenter'>
                        <table className="center">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Code</th>
                                <th>ID</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {mappedList}    
                            </tbody>        
                        </table>
                    </div>

                <div>
                    <input 
                        className='space textbox'
                        type="text"
                        name="idToExport"
                        placeholder="Research ID"
                        idToExport={this.state.idToExport}
                        //function call
                        onChange={this.handleChange}
                    />
                    <button
                        className='space button button3'
                        onClick={this.exportResults}>
                        Export results
                    </button>
                    <button
                        className='space button button3'
                        // href="https://soc-web-liv-60.napier.ac.uk/API/public/download.php"
                        onClick={this.download}>
                        Download results
                    </button>
                </div>
                <button className = 'space button button3'>
                    Admin panel
                </button>
            </div>
        )
            
        
    }
}
