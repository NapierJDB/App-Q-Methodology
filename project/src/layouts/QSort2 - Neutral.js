import React, { Component, Fragment } from 'react'
import './App.css';
import redBox from './images/redbox.png'
import greenBox from './images/greenbox.png'
import whiteBox from './images/whitebox.png'
import leftArrow from './images/left.png'
import rightArrow from './images/right.png'

import { Link,Redirect } from 'react-router-dom';
import './App.css';

export default class QSort2 extends Component {

    constructor (props){
        super(props);
        
        this.state = {
            whiteBoxStatements: [],
            index: 0,
            anchorsIndex: 0,
            anchors: [],
            quantity: [],
            anchorsLength: 0,
            anchorsArray: [],
            list: [],
            marker: '',
            statement: '',
            mMarker: '',
            mStatement: '',
            mQuantity: 0,
            refresh: 0,
            results: [],
        }

        this.getArrays = this.getArrays.bind(this);
        this.nextItem = this.nextItem.bind(this);
        this.prevItem = this.prevItem.bind(this);

        this.nextAnchor = this.nextAnchor.bind(this);
        this.prevAnchor = this.prevAnchor.bind(this);
        this.addStatement = this.addStatement.bind(this);
        this.getNumberOfAnchors = this.getNumberOfAnchors.bind(this);

        this.getVariable = this.getVariable.bind(this);

        this.manageNavigation = this.manageNavigation.bind(this);
        this.sendResultsToLocalStorage = this.sendResultsToLocalStorage.bind(this);

        this.tip = this.tip.bind(this);

        //      QJ5921
    }
    // refresh(){
    //     this.setState({
    //         refresh: 1
    //     })
    // }

    tip() {
        alert("Use the arrow buttons to navigate through anchors.\n"+ 
        "Available slots tells you how many statements you can fit in this particular anchor\n" + 
        "Press Add statement button to add currently displayed statement\n" +
        "in to the anchor\n" +
        "Click Next to go to the next step")
    }

    getArrays() {
        //Get things from local storage
        var asString = localStorage.getItem('WHITE_BOX');
        this.state.neutralAnchors = localStorage.getItem('RE_NEUTRAL_ANCHORS');
        this.state.neutralQuantity = localStorage.getItem('RE_NEUTRAL_QUANTITY');

        //Assign them to arrays
        this.setState({
            whiteBoxStatements: JSON.parse(asString),
           // anchors: this.state.negativeAnchors.split(','),
           // quantity: this.state.negativeQuantity.split(',')
        })

        this.state.anchors = this.state.neutralAnchors.split(',');
        this.state.quantity = this.state.neutralQuantity.split(',');

        this.setState({
            anchorsArray: [{markerNum: this.state.neutralAnchors.split(','), items: this.state.neutralQuantity.split(',')}],
            
            
        })

    }

     getNumberOfAnchors() {
         this.state.anchorsLength = this.state.anchors.length;
         console.log(this.state.anchorsLength);
         console.log(this.state.anchors)        
         console.log(this.state.anchorsArray)
    }

    getVariable(){

        if(this.state.anchorsIndex == 0)
        {
            this.state.marker = this.state.anchors[this.state.anchorsIndex];
        }       
        else
        {
            this.state.marker = this.state.anchors[this.state.anchorsIndex];
        }
        
        if(this.state.index == 0){ 

            this.state.statement = this.state.whiteBoxStatements[this.state.index];
        }
        else
        {           
            this.state.statement = this.state.whiteBoxStatements[this.state.index];
        }

        this.state.mMarker = this.state.marker;
        this.state.mStatement = this.state.statement;
        
    }


    componentDidMount(){
        this.getArrays();
       
    }
   
    nextItem() {
        if(this.state.index == this.state.whiteBoxStatements.length){
           
            this.setState({
                index: 0
            })
        }
        else{
           
            this.setState(prevState => ({
                index: prevState.index
            }))
        }        
    }

    prevItem() {       
        if(this.state.index == 0)        
            return;
        this.setState(prevState => ({
            index: prevState.index - 1
        }))            
    }

    nextAnchor() {
        if(this.state.anchorsIndex == this.state.anchors.length - 1){
           
            this.setState({
                anchorsIndex: 0
            })
        }
        else{
           
            this.setState(prevState => ({
                anchorsIndex: prevState.anchorsIndex + 1
            }))
        }      
    }

    prevAnchor() {       
        if(this.state.anchorsIndex == 0)        
            return;
        this.setState(prevState => ({
            anchorsIndex: prevState.anchorsIndex - 1
        }))            
    }

    addStatement() {

        //      QJ5921
        this.getVariable();
        let {anchorsIndex, quantity} = this.state;

        if(this.state.quantity[anchorsIndex] > 0){
            
            const obj = {'markerNum':this.state.mMarker, 'statement':this.state.mStatement.substring(0,2)};
            this.state.list = [...this.state.list, obj];
            console.log(this.state.list);

            //Calculate new quantity of available slots
            this.state.quantity[anchorsIndex] = parseInt(quantity[anchorsIndex]) - 1;
            console.log(this.state.quantity[anchorsIndex]);
            this.nextItem();

            //remove statement if it's been added
            let remove = this.state.whiteBoxStatements.indexOf(this.state.whiteBoxStatements[this.state.index]);
            this.setState({
                whiteBoxStatements: this.state.whiteBoxStatements.filter((_, i) => i !== remove)
            })
        }
        else{
            alert("There are no more slots available for this marker");
        }

    }

    manageNavigation(){

        if(this.state.whiteBoxStatements.length == 0){
            this.setState({ Redirect: true });
            this.sendResultsToLocalStorage();
        }
        else{
            this.setState({ Redirect: false });
            alert("Please distribute all statements")
        }

    }

    sendResultsToLocalStorage(){
        localStorage.setItem('NEUTRAL_RESULTS', JSON.stringify(this.state.list));
        // let results = localStorage.getItem('RESULTS');
        // this.state.results = JSON.parse(results);
        // this.state.list = [...this.state.list, this.state.results];
        // console.log(this.state.list);
    }
   

    render() {
        if (this.state.Redirect) {
            return (
                <Redirect to={{
                    pathname: '/QSort2Positive',
                }} />
            )
        }
        const mappedList = this.state.list.map((item, index) => {
            return(
    
                    <tr key={index}>
                        <td>{item.markerNum}</td>
                        <td>{item.statement}</td>                              
                    </tr>
                 )
    
             });

         let {index, whiteBoxStatements} = this.state;
         let {anchorsIndex, anchors, quantity, mQuantity} = this.state;
     
         return (

            <div className = 'TextCenter'>
                <h1>Q Sort Stage 2 - Neutral</h1>
                    <div>

                        <div>
                            <button onClick={this.nextItem}
                                    className='space button button3'>
                                Next item
                            </button>

                            <h2>{whiteBoxStatements[index]}</h2>

                            <button onClick={this.prevItem}
                                    className='space button button3'>
                                Previous item
                            </button>

                            <div>
                                <h2>Marker number</h2>

                                <div className='row'>

                                <button className='space boxButton button3'
                                    onClick={this.prevAnchor}>
                                    <img className = "boxImg" src = {leftArrow}/>
                                </button>

                                    <h2>{anchors[anchorsIndex]}</h2>
                                
                                <button className='space boxButton button3'
                                    onClick={this.nextAnchor}>
                                    <img className = "boxImg" src = {rightArrow}/>
                                </button>

                                </div>
                            </div>
                            <div>
                            <h2>Available slots</h2>

                            <h2>{quantity[anchorsIndex]}</h2>

                            <button className='space button button3' 
                                    onClick={this.addStatement}>
                                Add statement
                            </button>

                            <table className="center">
                                    <thead>
                                        <tr>
                                        <th>Marker number</th>
                                        <th>Statements</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {mappedList}
                                </tbody>         
                            </table>
                            </div>
                            {/* <div className='center TextCenter'>
                                <table className="center">
                                    <thead>
                                        <tr>
                                        <th>Marker number</th>
                                        <th>Statements</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {mappedList}
                                </tbody>         
                                </table>
                            </div> */}

                        </div>

                    </div>

                    <button 
                        className='space button button3'
                        onClick={this.manageNavigation}>
                        Next
                    </button>

                    <button 
                        className='space button button3'
                        onClick={this.tip}>
                        Help
                    </button>
                    
            </div>
        )
                
    }
}
