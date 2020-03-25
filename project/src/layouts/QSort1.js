import React, { Component } from 'react'
import './App.css';
import redBox from './images/redbox.png'
import greenBox from './images/greenbox.png'
import whiteBox from './images/whitebox.png'
import { Link, Redirect } from 'react-router-dom';
import './App.css';
import Modal from 'react-modal';
import { Button } from 'rebass';

//Modal.setAppElement('App.js')

export default class QSort1 extends Component {
    constructor(props) {
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


            testArray: ['Anna', 'Joel', 'Bartek', 'Milo', 'Stench'],
            redArray: [],
            whiteArray: [],
            greenArray: [],
            index: 0,
            redVisible: false,
            whiteVisible: false,
            greenVisible: false,
            buttonID: undefined
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

    }

    getStatements() {
        // var asString = localStorage.getItem('RE_STATEMENTS');
        // this.setState({
        //     statements: JSON.parse(asString)
        // })
        // console.log(this.state.statements)

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
                <div>

                    <div>
                        <button className='space button button3'
                            onClick={this.getStatements}>
                            Get statements
                            </button>
                        <h2>{formatedStatements[index]}</h2>

                        {/* <button className='space button button3'
                                    onClick={this.nextItem}>
                                Next item
                            </button> */}

                    </div>

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

            </div>
        )
    }
}
