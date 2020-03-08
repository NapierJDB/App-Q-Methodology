import React, { Component } from 'react'
import './App.css';
import redBox from './images/redbox.png'
import greenBox from './images/greenbox.png'
import whiteBox from './images/whitebox.png'
import {Link,Redirect} from 'react-router-dom';
import './App.css';

export default class QSort1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            testArray: ['Anna','Joel', 'Bartek', 'Milo', 'Stench'],
            redArray: [],
            whiteArray: [],
            greenArray: [],
            index: 0,
        }

        this.nextItem = this.nextItem.bind(this);
        this.prevItem = this.prevItem.bind(this);

        this.addtoRed = this.addtoRed.bind(this);
        this.addtoWhite = this.addtoWhite.bind(this);
        this.addtoGreen = this.addtoGreen.bind(this);

        this.checkStatus = this.checkStatus.bind(this);
    }

    nextItem() {
        if(this.state.index == this.state.testArray.length - 1){
           
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

    addtoRed(e) {

       this.setState(prevState => ({
           redArray: [...prevState.redArray, this.state.testArray[this.state.index]]
       }))

       let remove = this.state.testArray.indexOf(this.state.testArray[this.state.index]);
       this.setState({
           testArray: this.state.testArray.filter((_, i) => i !== remove)
       },
        () => {
            console.log('initial array: ' + this.state.testArray)
            console.log('RED box: ' + this.state.redArray)
        })      
    }

    addtoWhite(e) {

        this.setState(prevState => ({
            whiteArray: [...prevState.whiteArray, this.state.testArray[this.state.index]]
        }))
 
        let remove = this.state.testArray.indexOf(this.state.testArray[this.state.index]);
        this.setState({
            testArray: this.state.testArray.filter((_, i) => i !== remove)
        },
         () => {
             console.log('initial array: ' + this.state.testArray)
             console.log('WHITE box: ' + this.state.whiteArray)
         })      
    }

    addtoGreen(e) {

        this.setState(prevState => ({
            greenArray: [...prevState.greenArray, this.state.testArray[this.state.index]]
        }))
 
        let remove = this.state.testArray.indexOf(this.state.testArray[this.state.index]);
        this.setState({
            testArray: this.state.testArray.filter((_, i) => i !== remove)
        },
         () => {
             console.log('initial array: ' + this.state.testArray)
             console.log('GREEN box: ' + this.state.greenArray)
         })      
    }

    checkStatus() {
        if(this.state.testArray.length == 0)
        {
            localStorage.setItem('RED_BOX', JSON.stringify(this.state.redArray));
            localStorage.setItem('WHITE_BOX', JSON.stringify(this.state.whiteArray));
            localStorage.setItem('GREEN_BOX', JSON.stringify(this.state.greenArray));
            this.setState({ Redirect: true });
        }
    }

    render() {

        if (this.state.Redirect) {
            return (
              <Redirect to={{
                pathname: '/QSort2',
              }} />
            )
          }
        let {index, testArray} = this.state;
        return (
            <div className = 'TextCenter'>
                
                <h1>Q Sort Stage 1</h1>
                    <div>
                        <div>
                            <button onClick={this.nextItem}>
                                Next item
                            </button>
                            <h3>{testArray[index]}</h3>
                            <button onClick={this.prevItem}>
                                Previous item
                            </button>
                        </div>
                    
                        <button className='space boxButton button3'>
                            <img className = "boxImg" src = {redBox}/>
                        </button>
                        <button className='space boxButton button3'>
                            <img className = "boxImg" src = {whiteBox}/>
                        </button>
                        <button className='space boxButton button3'>
                            <img className = "boxImg" src = {greenBox}/>
                        </button>

                        <div>
                            <button className='space button button3'
                                    onClick={this.addtoRed}>
                                Edit Negative
                            </button>
                            <button className='space button button3'
                                    onClick={this.addtoWhite}>
                                Edit Neutral
                            </button>
                            <button className='space button button3'
                                    onClick={this.addtoGreen}>
                                Edit Positive
                            </button>
                        </div>

                        <div>
                            <h3>Red Box: {this.state.redArray} </h3>
                            <h3>White Box: {this.state.whiteArray} </h3>
                            <h3>Green Box: {this.state.greenArray} </h3>
                        </div>
                    </div>

<<<<<<< HEAD
                    <Link to={'/QSort2Negative'}>
                        <button className='space button button3'>
=======
                    
                        <button className='space button button3'
                            onClick={this.checkStatus}>
>>>>>>> b6021206056feed402a46bb4426a4a61515e77d3
                            Next
                        </button>
                    
            </div>
        )
    }
}
