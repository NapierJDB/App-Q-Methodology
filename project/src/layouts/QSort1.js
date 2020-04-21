import React, { Component } from 'react'
import './App.css';
import redBox from './images/redbox.png'
import greenBox from './images/greenbox.png'
import whiteBox from './images/whitebox.png'
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

/**
 * Purpose: First stage of the sort
 * participant sorts the statements
 * to boxes 
 */

export default class QSort1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            researchToken: '',
            researchId: '',
            researchName: localStorage.getItem('RE_NAME'),
            researchDescription: localStorage.getItem('RE_DESCRIPTION'),
            box1: localStorage.getItem('RE_BOX1'),
            box2: localStorage.getItem('RE_BOX2'),
            box3: localStorage.getItem('RE_BOX3'),
            redQuantity: [],
            whiteQuantity: [],
            greenQuantity: [],
            redQuantityTotal: 0,
            whiteQuantityTotal: 0,
            greenQuantityTotal: 0,
            statements: [],
            formatedStatements: [],
            redArray: [],
            whiteArray: [],
            greenArray: [],
            index: 0,
            redVisible: false,
            whiteVisible: false,
            greenVisible: false,
            buttonID: undefined,
            available: false,
        }

        this.getStatements = this.getStatements.bind(this);
        this.nextItem = this.nextItem.bind(this);
        this.addtoRed = this.addtoRed.bind(this);
        this.addtoWhite = this.addtoWhite.bind(this);
        this.addtoGreen = this.addtoGreen.bind(this);
        //CODE FOR POP UP BOX BINDS
        this.openRedModal = this.openRedModal.bind(this);
        this.closeRedModal = this.closeRedModal.bind(this);
        this.openWhiteModal = this.openWhiteModal.bind(this);
        this.closeWhiteModal = this.closeWhiteModal.bind(this);
        this.openGreenModal = this.openGreenModal.bind(this);
        this.closeGreenModal = this.closeGreenModal.bind(this);

        this.checkStatus = this.checkStatus.bind(this);
        this.removeRedStatement = this.removeRedStatement.bind(this);
        this.removeWhiteStatement = this.removeWhiteStatement.bind(this);
        this.removeGreenStatement = this.removeGreenStatement.bind(this);
        this.getQuantity = this.getQuantity.bind(this);

        this.tip = this.tip.bind(this);

    }

    tip() {
        alert("Click on Get statements to get started.\n"+ 
        "Add statement by clicking on the button\n" + 
        "for example: Strongly disagree will add the statement\n" +
        "to the red box. By clicking on the box image you will be able\n" +
        "to see the statements that are already in this box")
    }

    getQuantity(){

        /**
         * This method gets the total of slots
         * available for each box, which is used to restric
         * the user from adding more or less statements
         * that is needed for each category
         * There must be accuracte amount of statements
         * in each box to fit in all anchors slots
         */

        //Get the total of slots available for RED box
        this.state.negativeQuantity = localStorage.getItem('RE_NEGATIVE_QUANTITY');
        //Format the array appropriately
        this.state.redQuantity = this.state.negativeQuantity.split(',');
        console.log(this.state.redQuantity);

        this.state.redQuantityTotal = this.state.redQuantity.reduce(
            (redQuantityTotal, redQuantityItem) => 
            redQuantityTotal + parseInt(redQuantityItem, 10), 0);
        console.log(this.state.redQuantityTotal);

        //Get the total of slots available fro WHITE box
        this.state.neutralQuantity = localStorage.getItem('RE_NEUTRAL_QUANTITY');
        //Format the array appropriately
        this.state.whiteQuantity = this.state.neutralQuantity.split(',');
        console.log(this.state.whiteQuantity);

        this.state.whiteQuantityTotal = this.state.whiteQuantity.reduce(
            (whiteQuantityTotal, whiteQuantityItem) => 
            whiteQuantityTotal + parseInt(whiteQuantityItem, 10), 0);
        console.log(this.state.whiteQuantityTotal);

        //Get the total of slots available fro GREEN box
        this.state.positiveQuantity = localStorage.getItem('RE_POSITIVE_QUANTITY');
        //Format the array appropriately
        this.state.greenQuantity = this.state.positiveQuantity.split(',');
        console.log(this.state.greenQuantity);

        this.state.greenQuantityTotal = this.state.greenQuantity.reduce(
            (greenQuantityTotal, greenQuantityItem) => 
            greenQuantityTotal + parseInt(greenQuantityItem, 10), 0);
        console.log(this.state.greenQuantityTotal);
    }

    getStatements() {

        /**
         * Get the statements from the database
         * by providing token and id form this particular research
         */

        this.state.researchToken = localStorage.getItem('RE_TOKEN');
        this.state.researchId = localStorage.getItem('RE_ID');

        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/getData', {
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

                //Store the statements in the arra
                this.state.statements = data.statements
                console.log(this.state.statements)

                /**
                 * Format the statements appropriately
                 * which means that the statements must have a numeber 
                 * and a statement coresponding with the number
                 */
                this.state.formatedStatements = this.state.statements.map(statement =>
                    statement.number + " " + statement.description)
                // set index to 0 so first item of formated array is displayed
                this.setState({
                    index: 0
                })

                if(this.state.formatedStatements.length > 0){
                    //Make the button disabled
                    this.setState(previousState => { 
                        return {available: !previousState.available}
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            });

            //Call the quantity method to set total of slots available for each box
            this.getQuantity();
    }

    nextItem() {

        if (this.state.index == this.state.formatedStatements.length - 1) {

            this.setState({
                index: 0
            })
        }
        else {

            this.setState(prevState => ({
                index: prevState.index + 1
            }))
        }

    }

    addtoRed(e) {

        //If there are slots available in red box...
        if(this.state.redQuantityTotal > 0){

            //Take away one slot
            this.state.redQuantityTotal = this.state.redQuantityTotal - 1;
            //add currently displayed statement ([this.state.index]) to the redArray
            this.setState(prevState => ({
                redArray: [...prevState.redArray, this.state.formatedStatements[this.state.index]]
            }))

            //This part takes care of removing added statement from the array that holds 
            //every item
            let remove = this.state.formatedStatements.indexOf(this.state.formatedStatements[this.state.index]);
            this.setState({
                formatedStatements: this.state.formatedStatements.filter((_, i) => i !== remove)
            },
                () => {
                    console.log('initial array: ' + this.state.formatedStatements)
                    console.log('RED box: ' + this.state.redArray)
                })
        }
        else{
            alert("Red box is full");
        }
    }

    addtoWhite(e) {

        if(this.state.whiteQuantityTotal > 0){

            this.state.whiteQuantityTotal = this.state.whiteQuantityTotal - 1;
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
        else{
            alert("White box is full");
        }
    }

    addtoGreen(e) {

        if(this.state.greenQuantityTotal > 0){

            this.state.greenQuantityTotal = this.state.greenQuantityTotal - 1;
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
        else{
            alert("Green box is full");
        }
    }

    checkStatus() {
        /**
         * If there are no more items in the array that holds all the statements
         * pass the arrays that holds sorted statements to local storage
         * and set the redirect to true so user can navigate to the next stage
         */
        if (this.state.formatedStatements.length == 0) {
            localStorage.setItem('RED_BOX', JSON.stringify(this.state.redArray));
            localStorage.setItem('WHITE_BOX', JSON.stringify(this.state.whiteArray));
            localStorage.setItem('GREEN_BOX', JSON.stringify(this.state.greenArray));
            this.setState({ Redirect: true });
        }
    }

    //Open pop up for red box
    openRedModal() {
        this.setState({
            redVisible: true
        });
    }

    //close pop up for red box
    closeRedModal() {
        this.setState({
            redVisible: false
        });
    }



    //open pop up for white box
    openWhiteModal() {
        this.setState({
            whiteVisible: true
        });

    }

    //close pop up for white box
    closeWhiteModal() {
        this.setState({
            whiteVisible: false
        });
    }



    //open pop up for green box
    openGreenModal() {
        this.setState({
            greenVisible: true
        });

    }

    //close pop up for white box
    closeGreenModal() {
        this.setState({
            greenVisible: false
        });
    }



    //Move item from Red array to starting array
    removeRedStatement(e) {

        this.state.buttonID = e.target.id

        //alert(buttonID)
        this.setState(prevState => ({
            formatedStatements: [...prevState.formatedStatements, this.state.redArray[this.state.buttonID]]
        }))

        let remove = this.state.redArray.indexOf(this.state.redArray[this.state.buttonID]);
        this.setState({
            redArray: this.state.redArray.filter((_, i) => i !== remove)
        },
            () => {
                console.log('initial array: ' + this.state.formatedStatements)
                console.log('RED box: ' + this.state.redArray)
            }
        )

        //Add 1 to the total of slots available
        this.state.redQuantityTotal = this.state.redQuantityTotal + 1;
    }

    //Move item from White array to starting array
    removeWhiteStatement(e) {

        this.state.buttonID = e.target.id

        this.setState(prevState => ({
            formatedStatements: [...prevState.formatedStatements, this.state.whiteArray[this.state.buttonID]]
        }))

        let remove = this.state.whiteArray.indexOf(this.state.whiteArray[this.state.buttonID]);
        this.setState({
            whiteArray: this.state.whiteArray.filter((_, i) => i !== remove)
        },
            () => {
                console.log('initial array: ' + this.state.formatedStatements)
                console.log('white box: ' + this.state.whiteArray)
            }
        )
         //Add 1 to the total of slots available
         this.state.whiteQuantityTotal = this.state.whiteQuantityTotal + 1;
    }

    //Move item from Green array to starting array
    removeGreenStatement(e) {

        this.state.buttonID = e.target.id

        this.setState(prevState => ({
            formatedStatements: [...prevState.formatedStatements, this.state.greenArray[this.state.buttonID]]
        }))

        let remove = this.state.greenArray.indexOf(this.state.greenArray[this.state.buttonID]);
        this.setState({
            greenArray: this.state.greenArray.filter((_, i) => i !== remove)
        },
            () => {
                console.log('initial array: ' + this.state.formatedStatements)
                console.log('green box: ' + this.state.greenArray)
            }
        )

         //Add 1 to the total of slots available
         this.state.greenQuantityTotal = this.state.greenQuantityTotal + 1;
    }




    render() {
        if (this.state.Redirect) {
            return (
                <Redirect to={{
                    pathname: '/QSort2Negative',
                }} />
            )
        }
        let { index, testArray, formatedStatements } = this.state;
        return (
            <div className='TextCenter'>
                <h1>Q Sort Stage 1</h1>
                <h2>{this.state.researchName}</h2>
                <h3>{this.state.researchDescription}</h3>
                <div>

                    <div>
                        <button className='space button button3'
                            onClick={this.getStatements}
                            disabled={this.state.available}>
                            Get statements
                            </button>
                        <h2>{formatedStatements[index]}</h2>

                        {/* <button className='space button button3'
                                    onClick={this.nextItem}>
                                Next item
                            </button> */}

                    </div>

                    {/* <div className='row'>
                    <h3>{this.state.redQuantityTotal}</h3>
                    <h3>{this.state.whiteQuantityTotal}</h3>
                    <h3>{this.state.greenQuantityTotal}</h3>
                    </div> */}

                    
                    <button className='space boxButton button3' onClick={this.openRedModal}>
                        <img className="boxImg" src={redBox} />
                        <div onClick={e => e.stopPropagation()}>
                            <Modal className="ModalRed" isOpen={this.state.redVisible} >
                                <div>
                                    <br></br>
                                    <img className="boxImgPopUp" src={redBox} />
                                    <h1> Statements</h1>
                                    {this.state.redArray.map(v => <div><p>{v}</p> <button id={this.state.redArray.indexOf(v)} onClick={this.removeRedStatement}>X</button></div>)}
                                    <button onClick={this.closeRedModal}>Close</button>
                                </div>
                            </Modal>
                        </div>
                    </button>

                    
                    <button className='space boxButton button3' onClick={this.openWhiteModal}>
                        <img className="boxImg" src={whiteBox} />
                        <div onClick={e => e.stopPropagation()}>
                            <Modal className="ModalWhite" isOpen={this.state.whiteVisible} >
                                <div>
                                    <br></br>
                                    <img className="boxImgPopUp" src={whiteBox} />
                                    <h1> Statements</h1>
                                    {this.state.whiteArray.map(w => <div><p>{w}</p> <button id={this.state.whiteArray.indexOf(w)} onClick={this.removeWhiteStatement}>X</button></div>)}
                                    <button onClick={this.closeWhiteModal}>Close</button>
                                </div>
                            </Modal>
                        </div>
                    </button>

                    
                    <button className='space boxButton button3' onClick={this.openGreenModal}>
                        <img className="boxImg" src={greenBox} />
                        <div onClick={e => e.stopPropagation()}>
                            <Modal className="ModalGreen" isOpen={this.state.greenVisible} >
                                <div>
                                    <br></br>
                                    <img className="boxImgPopUp" src={greenBox} />
                                    <h1> Statements</h1>
                                    {this.state.greenArray.map(x => <div><p>{x}</p> <button id={this.state.greenArray.indexOf(x)} onClick={this.removeGreenStatement}>X</button></div>)}
                                    <button onClick={this.closeGreenModal}>Close</button>
                                </div>
                            </Modal>
                        </div>
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

                </div>


                <button className='space button button3'
                    onClick={this.checkStatus}>
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
