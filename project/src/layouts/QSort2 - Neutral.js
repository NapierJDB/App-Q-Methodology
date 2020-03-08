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
           // whiteBoxArray: [],
           // greenBoxArray: [],
         //  markerNum: [-5,-4,-3,-2,-1],
         //  items: [],
           anchorsArray: [
               { markerNum: -5, items: 1, statements: []  },
               { markerNum: -4, items: 2, statements: []  },
               { markerNum: -3, items: 3, statements: []  },
               { markerNum: -2, items: 4, statements: []  },
               { markerNum: -1, items: 5, statements: []  },
           ],

           
        }

        this.getArrays = this.getArrays.bind(this);
        this.nextItem = this.nextItem.bind(this);
        this.prevItem = this.prevItem.bind(this);
        this.addToAnchor = this.addToAnchor.bind(this);
    }

    getArrays() {
        var asString = localStorage.getItem('RED_BOX');
        this.setState({
            redBoxArray: JSON.parse(asString)
        })
        console.log('RED: ' + this.state.redBoxArray)
       // this.state.redBoxArray = JSON.parse(asString)
      //  this.state.whiteBoxArray = localStorage.getItem('WHITE_BOX');
       // this.state.greenBoxArray = localStorage.getItem('GREEN_BOX');
    }

    componentDidMount(){
        this.getArrays();
        
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

        const anchorsList = this.state.anchorsArray.map((anchor, index) => {
            return (
                <tr key={index}>
                    <td>{anchor.markerNum}</td>
                    <td>{anchor.items}</td>
                    <td>
                    <button
                        className = 'space tableButton tableButton3'
                        onClick={this.addToAnchor}>
                        Add                           
                    </button>
                    <button
                        className = 'space tableButton tableButton3'>
                        Delete
                    </button>
                    </td>
                    <td>{anchor.statements}</td>
                </tr>
            )
        })

        return (
            <div className = 'TextCenter'>
                <h1>Q Sort Stage 2 - Neutral</h1>
                    <div>

                        <div>
                            <button onClick={this.nextItem}>
                                Next item
                            </button>
                            <h2>{redBoxArray[index]}</h2>
                            <button onClick={this.prevItem}>
                                Previous item
                            </button>
                        </div>
                    
                        <div>
                            <table className="center">
                                <thead>
                                    <tr>
                                    <th>Marker number</th>
                                    <th>Number of items</th>
                                    <th>Action</th>
                                    <th>Q-sort Cards</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {anchorsList}     
                                </tbody>         
                            </table>
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
