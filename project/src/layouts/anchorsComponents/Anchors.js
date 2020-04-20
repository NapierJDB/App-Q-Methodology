import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Anchors extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.oldValue,
            researcherID: localStorage.getItem('ID'),
            token: localStorage.getItem('TOKEN'),
            lastID: '',
            markerList: [],
            numberOfItemsList: [],
            anchorsList: [],

            test: {
                researcherID: 123,
                anchors:[
                    {markerNum: 1, numberOfItems: 2},
                    {markerNum: 2, numberOfItems: 4}
                ]
            }
        }
        this.handleRegionClick = this.handleRegionClick.bind(this);

        this.sendToBackEnd = this.sendToBackEnd.bind(this);
        this.getResearchID = this.getResearchID.bind(this);
}

    // Call updateAnchor (NewAnchors.js)
    handleUpdate = () => {

        this.calculateTotal();
        this.props.updateAnchor(
            this.indexNum,
            this.markerNumber.value,
            this.numberOfItems.value,
        )
        //console.log(this.markerNumber.value)
       
    }

    handleRegionClick(btnDelete){
        //console.log("button pressed");
        //this.anchorRemoved();
        
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
              console.log("Last ID test: " + this.state.lastID)

      
            })
            .catch(function (error) {
              console.log(error);
            });

           // this.sendToBackEnd();
    }

    componentDidMount(){
        this.getResearchID();
    }

    sendToBackEnd(event){

        
        // ---GET ITEMS FROM LOCAL STORAGE---
        // const researcherID = localStorage.getItem('ID');
        // const token = localStorage.getItem('TOKEN');
        // this.setState({ researcherID, token });

        //Create object
       
        this.createObj();

        // fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addAllAnchors',  {
        // method: 'POST',
        // headers: {
        //        'Authorization': this.state.token,
        //        'Content-Type': 'application/json'         
        //    },
        // body: JSON.stringify({

        //     'array': this.state.markerNumber,
        //     'items': this.state.numberOfItems,
        //     'researchID': this.state.lastID,
        //   })
        //   })
        //   .then((response) => {
        //     return response.json();
    
        //   })
        //   .then((data) => {
        //     console.log(data);
    
        //     this.state.error = data.error;
            
        //     if (this.state.error == true) {
        //         alert("This marker already exist!") 
        //     }
    
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }

    render(){
        if (this.state.Redirect) {
            return (
              <Redirect to={{
                pathname: '/NewStatements',
              }} />
            )
          }
      
        const { allAnchors, editButton, deleteAnchor } = this.props;

        const anchorsList = allAnchors.map((anchor, index) => {

            //console.log(anchorsList)

            this.calculateTotal = () => {

                if(anchor.total > this.numberOfItems.value){
                    /*
                        Total is greater than number of items
                        then the difference must be taken away 
                        from the total
                     */
                    var a_difference = 
                        parseInt(this.props.oldValue) - 
                        parseInt(this.numberOfItems.value);
                    //alert("Difference: " + a_difference)
                    anchor.total = parseInt(anchor.total) - parseInt(a_difference)
                    console.log(anchor.total)
                }
                else if (anchor.total < this.numberOfItems.value){
                     /*
                        Total is less than number of items
                        then the difference must be added
                        to the total
                     */
                    var b_difference = 
                        parseInt(this.props.oldValue) - 
                        parseInt(this.numberOfItems.value);

                    anchor.total = parseInt(anchor.total) + parseInt(b_difference)
                }
                
                
                                     
            }

            this.createObj = () => {

                this.state.markerList = allAnchors.map(item => 
                    item.markerNumber)

                this.state.numberOfItemsList = allAnchors.map(item => 
                    item.numberOfItems)

                for(var i = 0; i < this.state.markerList.length; i++){
                    const anchorsObj = {markerNum: this.state.markerList[i], 
                                        numberOfItems: this.state.numberOfItemsList[i]}                    
                    this.state.anchorsList = [...this.state.anchorsList, anchorsObj]
                }

                

                //Create new list
            // const obj = {'markerNum':this.state.mMarker, 'statement':this.state.mStatement.substring(0,2)};
            // this.state.list = [...this.state.list, obj];
            // console.log(this.state.list);

//                const anchorsObj = {markerNum: this.state.markerList,
//                                    numberOfItems: this.state.numberOfItemsList};

//                this.state.anchorsList = [...this.state.anchorsList, anchorsObj];

              //  console.log(this.state.markerList)
                const obj = {researchID: this.state.lastID,
                                 anchors: this.state.anchorsList}

                //const obj = {anchors: this.state.anchorsList}
                console.log(this.state.token)
                console.log(this.state.lastID)
                
        
               // var markerNumber = allAnchors.markerNumber
                console.log(obj)

                fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addAllAnchors',  {
                method: 'POST',
                headers: {
                    'Authorization': this.state.token,
                    'Content-Type': 'application/json'         
                },
                body: JSON.stringify({
                    'researchID': this.state.lastID,
                    'anchors': this.state.anchorsList,
                })
                })
                .then((response) => {
                    return response.json();
            
                })
                .then((data) => {
                    console.log(data);
            
                    this.state.error = data.error;
                    
                    if (this.state.error == true) {
                         alert("Error") 
                     }
                     else{
                        this.setState({ Redirect: true });
                     }
            
                })
                .catch(function (error) {
                    console.log(error);
                });
                        //console.log(this.state.test)
                    // this.state.markerList = [...this.state.markerList, markerNumber];
                    // console.log(this.state.markerList)

                    //    const manchorsList = allAnchors.map((item, index) => {
                    //        this.state.markerNumber = item.markerNumber;
                    //        console.log(this.state.markerList)
                    //    })
            }
            
            return anchor.isEditing === true ? (

                <tr key={index}>
                    
                    <td>
                        <input 
                            type="number"
                            ref={(val) => 
                                {this.markerNumber = val}}
                            required
                            defaultValue={anchor.markerNumber}
                        />
                    </td>

                    <td>
                        <input 
                            type="number"
                            ref={(val) => 
                                {this.numberOfItems = val}}
                            required
                            defaultValue={anchor.numberOfItems}
                        />
                    </td>

                    <td>
                        <button 
                            onClick={this.handleUpdate}
                            className = 'space tableButton tableButton3'
                            ref={() =>
                                {this.indexNum = index}}
                        >
                            Update
                        </button>
                    </td>

                     

                </tr>   
            ) : (

                <tr key={index}>
                    <td>{anchor.markerNumber}</td>
                    <td>{anchor.numberOfItems}</td>
                    <td>
                        <button
                            onClick={() => editButton(index)}
                            className = 'space tableButton tableButton3'>
                            Edit                           
                        </button>
                        <button
                            onClick={() => deleteAnchor(index)}
                            className = 'space tableButton tableButton3'>
                            Delete
                        </button>
                    </td>
                    
                </tr>
                
            );
        
        });
        
        return(
            <div className='center TextCenter'>
                <table className="center">
                    <thead>
                        <tr>
                        <th>Anchor number</th>
                        <th>Number of items</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                <tbody>
                    {anchorsList}                
                </tbody>         
                </table>

                <div>
                        {/* <Link to={'/NewStatements'}> */}
                        <button 
                            className = 'space button button3'
                            onClick={this.sendToBackEnd}>
                            Next
                        </button>
                        {/* </Link> */}
                </div>
            </div>
            
        );
    }
}

export default Anchors;