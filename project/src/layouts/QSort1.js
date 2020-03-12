import React, { Component } from 'react'
import './App.css';
import redBox from './images/redbox.png'
import greenBox from './images/greenbox.png'
import whiteBox from './images/whitebox.png'
import {Link,Redirect} from 'react-router-dom';
import './App.css';
import Modal from 'react-modal';

//Modal.setAppElement('App.js')

export default class QSort1 extends Component {
    constructor(props){
        super(props);
        this.state = {

            researchToken: '',
            researchId: '',

            researchName: localStorage.getItem('RE_NAME'),
            box1: localStorage.getItem('RE_BOX1'),
            box2: localStorage.getItem('RE_BOX2'),
            box3: localStorage.getItem('RE_BOX3'),
            statements: [],
            formatedStatements: [],


            testArray: ['Anna','Joel', 'Bartek', 'Milo', 'Stench'],
            redArray: [],
            whiteArray: [],
            greenArray: [],
            index: 0,
            visible: false
        }

        this.getStatements = this.getStatements.bind(this);

        this.nextItem = this.nextItem.bind(this);

        this.addtoRed = this.addtoRed.bind(this);
        this.addtoWhite = this.addtoWhite.bind(this);
        this.addtoGreen = this.addtoGreen.bind(this);
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.checkStatus = this.checkStatus.bind(this);
    }

    getStatements() {
        // var asString = localStorage.getItem('RE_STATEMENTS');
        // this.setState({
        //     statements: JSON.parse(asString)
        // })
        // console.log(this.state.statements)

        this.state.researchToken = localStorage.getItem('RE_TOKEN');
        this.state.researchId = localStorage.getItem('RE_ID');

        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/getData',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.researchToken,
            },
            body: JSON.stringify({
                'id': this.state.researchId
            })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                //this.state.error = data.error;

                this.state.statements = data.statements
                console.log(this.state.statements)

                // Format the array appropriatelly
                this.state.formatedStatements = this.state.statements.map(statement => 
                    statement.number + " " + statement.description)
                // set index to 0 so first item of formated array is displayed
                this.setState({
                    index: 0
                })
   
              })
              .catch(function (error) {
                console.log(error);
              });
    }



    nextItem() {

        if(this.state.index == this.state.formatedStatements.length - 1){
           
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


    addtoRed(e) {

       this.setState(prevState => ({
           redArray: [...prevState.redArray, this.state.formatedStatements[this.state.index]]
       }))

       let remove = this.state.formatedStatements.indexOf(this.state.formatedStatements[this.state.index]);
       this.setState({
        formatedStatements: this.state.formatedStatements.filter((_, i) => i !== remove)
       },
        () => {
            console.log('initial array: ' + this.state.formatedStatements)
            console.log('RED box: ' + this.state.redArray)
        })      
    }

    addtoWhite(e) {

        this.setState(prevState => ({
            whiteArray: [...prevState.whiteArray, this.state.formatedStatements[this.state.index]]
        }))
 
        let remove = this.state.formatedStatements.indexOf(this.state.formatedStatements[this.state.index]);
        this.setState({
            formatedStatements: this.state.formatedStatements.filter((_, i) => i !== remove)
        },
         () => {
             console.log('initial array: ' + this.state.formatedStatements)
             console.log('WHITE box: ' + this.state.whiteArray)
         })      
    }

    addtoGreen(e) {

        this.setState(prevState => ({
            greenArray: [...prevState.greenArray, this.state.formatedStatements[this.state.index]]
        }))
 
        let remove = this.state.formatedStatements.indexOf(this.state.formatedStatements[this.state.index]);
        this.setState({
            formatedStatements: this.state.formatedStatements.filter((_, i) => i !== remove)
        },
         () => {
             console.log('initial array: ' + this.state.formatedStatements)
             console.log('GREEN box: ' + this.state.greenArray)
         })      
    }

    checkStatus() {
        if(this.state.formatedStatements.length == 0)
        {
            localStorage.setItem('RED_BOX', JSON.stringify(this.state.redArray));
            localStorage.setItem('WHITE_BOX', JSON.stringify(this.state.whiteArray));
            localStorage.setItem('GREEN_BOX', JSON.stringify(this.state.greenArray));
            this.setState({ Redirect: true });
        }
    }


    openModal(){
        this.setState({
            visible: true
        });

    }

    closeModal(){
        this.setState({
            visible: false
        });
    }


    render() {
        if (this.state.Redirect) {
            return (
              <Redirect to={{
                pathname: '/QSort2Negative',
              }} />
            )
          }
        let {index, testArray, formatedStatements} = this.state;
        return (
            <div className = 'TextCenter'>
                <h1>Q Sort Stage 1</h1>
                <h2>{this.state.researchName}</h2>
                    <div>
                        <div>
                            <button className='space button button3'
                                    onClick={this.getStatements}>
                                Get statements
                            </button>                          
                            <h2>{formatedStatements[index]}</h2>
                            <button className='space button button3'
                                    onClick={this.nextItem}>
                                Next item
                            </button>
                        </div>

                        
                    
                        <button className='space boxButton button3' onClick={this.openModal}>
                            <img className = "boxImg" src = {redBox}/>
                            <div onClick={e => e.stopPropagation()}>
                                <Modal isOpen={this.state.visible} >
                                    <div>
                                        <h1> testing</h1>
                                    
                                        <button onClick={this.closeModal}>Close</button>
                                    </div>
                                </Modal>
                            </div>
                         
            
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
                                {this.state.box1}
                            </button>
                            <button className='space button button3'
                                    onClick={this.addtoWhite}>
                                {this.state.box2}
                            </button>
                            <button className='space button button3'
                                    onClick={this.addtoGreen}>
                                {this.state.box3}
                            </button>
                        </div>

                        <div>
                            <h3>Red Box: {this.state.redArray} </h3>
                            <h3>White Box: {this.state.whiteArray} </h3>
                            <h3>Green Box: {this.state.greenArray} </h3>
                        </div>
                    </div>

                    
                        <button className='space button button3'
                            onClick={this.checkStatus}>
                            Next
                        </button>
                    
            </div>
        )
    }
}
