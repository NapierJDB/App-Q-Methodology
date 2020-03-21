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
            redBoxArray: [],
            index: 0,
            anchorsIndex: 0,
           // whiteBoxArray: [],
           // greenBoxArray: [],
         //  markerNum: [-5,-4,-3,-2,-1],
         //  items: [],
        //    anchorsArray: [
        //        { markerNum: -5, items: 1, statements: []  },
        //        { markerNum: -4, items: 2, statements: []  },
        //        { markerNum: -3, items: 3, statements: []  },
        //        { markerNum: -2, items: 4, statements: []  },
        //        { markerNum: -1, items: 5, statements: []  },
        //    ],

           negativeAnchors: '', //localStorage.getItem('RE_NEGATIVE_ANCHORS'),
           anchors: [],
           negativeQuantity: '',
           quantity: [], //localStorage.getItem('RE_NEGATIVE_QUANTITY'),

            anchorsArray: [
             { markerNum: [], items: '', statements: '' }],

             anchorsArray2: [
                { markerNum: '-1', items: '2', statements: '' },
                { markerNum: '-2', items: '2', statements: '' }],

           
        }

        this.getArrays = this.getArrays.bind(this);
        this.nextItem = this.nextItem.bind(this);
        this.prevItem = this.prevItem.bind(this);

        this.nextAnchor = this.nextAnchor.bind(this);
        this.prevAnchor = this.prevAnchor.bind(this);

        this.addToAnchor = this.addToAnchor.bind(this);

        this.setTable = this.setTable.bind(this);

        //      QJ5921
    }

    setTable() {

        this.state.negativeAnchors = localStorage.getItem('RE_NEGATIVE_ANCHORS');
        this.state.negativeQuantity = localStorage.getItem('RE_NEGATIVE_QUANTITY')

        this.setState({
             anchors: this.state.negativeAnchors.split(','),
             quantity: this.state.negativeQuantity.split(',')             
        })
         console.log(this.state.anchors)
         console.log(this.state.quantity)

        this.setState({
            anchorsArray: [{markerNum : [this.state.anchors], items : this.state.negativeQuantity}],
            //anchorsArray: [this.state.anchorsArray.items = this.state.quantity]    
        })
        console.log(this.state.anchorsArray)
        console.log(this.state.anchorsArray2)

    }

    getArrays() {
        //Get things from local storage
        var asString = localStorage.getItem('RED_BOX');
        this.state.negativeAnchors = localStorage.getItem('RE_NEGATIVE_ANCHORS');
        this.state.negativeQuantity = localStorage.getItem('RE_NEGATIVE_QUANTITY');

        //Assign them to arrays
        this.setState({
            redBoxArray: JSON.parse(asString),
            anchors: this.state.negativeAnchors.split(','),
            quantity: this.state.negativeQuantity.split(',')
        })
        //console.log('RED: ' + this.state.redBoxArray)
       // this.state.redBoxArray = JSON.parse(asString)
      //  this.state.whiteBoxArray = localStorage.getItem('WHITE_BOX');
       // this.state.greenBoxArray = localStorage.getItem('GREEN_BOX');
    }

    componentDidMount(){
        this.getArrays();
      //  this.setTable();
        
      //  console.log('WHITE: ' + this.state.whiteBoxArray)
      //  console.log('GREEN: ' + this.state.greenBoxArray)
    }

    nextItem() {
        if(this.state.index == this.state.redBoxArray.length - 1){
           
            this.setState({
                index: 0
            })
        }
        else{
           
            this.setState(prevState => ({
                index: prevState.index + 1
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

    addToAnchor() {
        // this.setState(prevState => ({
        //     anchorsArray: [...prevState.anchorsArray.statements, this.state.redBoxArray[this.state.index]]
        // }))

        // this.setState({
        //     anchorsArray: { statements: [this.state.redBoxArray[this.state.index]]}
        // })

        this.setState({
            anchorsArray: {...this.state.anchorsArray.statements = [this.state.redBoxArray[this.state.index]]}
        })
    }

    render() {
         let {index, redBoxArray} = this.state;
         let {anchorsIndex, anchors, quantity} = this.state;
        return (

            <div className = 'TextCenter'>
                <h1>Q Sort Stage 2 - Negative</h1>
                    <div>

                        <div>
                            <button onClick={this.nextItem}
                                    className='space button button3'>
                                Next item
                            </button>

                            <h2>{redBoxArray[index]}</h2>

                            <button onClick={this.prevItem}
                                    className='space button button3'>
                                Previous item
                            </button>

                            <div>
                                <h2>Marker number</h2>

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

                            <h2>Slots</h2>

                            <h2>{quantity[anchorsIndex]}</h2>

                            <button className='space button button3' 
                                    onClick={this.nextItem}>
                                Add statement
                            </button>

                        </div>

                    </div>

                    <Link to={'/Debrief'}>
                        <button className='space button button3'>
                            Next
                        </button>
                    </Link>
            </div>
        )
    }
}
