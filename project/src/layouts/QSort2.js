import React, { Component } from 'react'
import './App.css';
import redBox from './images/redbox.png'
import greenBox from './images/greenbox.png'
import whiteBox from './images/whitebox.png'

import { Link,Redirect } from 'react-router-dom';
import './App.css';

export default class QSort2 extends Component {

    constructor (props){
        super(props);
        
        this.state = {
            redBoxArray: [],
            index: 0,
           // whiteBoxArray: [],
           // greenBoxArray: [],
        }

        this.getArrays = this.getArrays.bind(this);

        this.nextItem = this.nextItem.bind(this);
        this.prevItem = this.prevItem.bind(this);
    }

    getArrays() {
        this.state.redBoxArray = localStorage.getItem('RED_BOX');
      //  this.state.whiteBoxArray = localStorage.getItem('WHITE_BOX');
       // this.state.greenBoxArray = localStorage.getItem('GREEN_BOX');
    }

    componentDidMount(){
        this.getArrays();
        console.log('RED: ' + this.state.redBoxArray)
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

    render() {
        let {index, redBoxArray} = this.state;
        return (
            <div className = 'TextCenter'>
                <h1>Q Sort Stage 2</h1>
                    <div>
                        <div>
                            <button onClick={this.nextItem}>
                                Next item
                            </button>
                            <h3>{this.state.redBoxArray[1]}</h3>
                            <button onClick={this.prevItem}>
                                Previous item
                            </button>
                        </div>
                    
                        <button className='space boxButton button3'>
                            <img className = "boxImg" src = {redBox}/>
                        </button>
                        
                        <div>

                            <button className='space button button3'>
                                Edit Negative
                            </button>
                           
                        </div>
                    </div>

                    <Link to={'/Debrief'}>
                        <button className='space button button3'>
                            Done
                        </button>
                    </Link>
            </div>
        )
    }
}
