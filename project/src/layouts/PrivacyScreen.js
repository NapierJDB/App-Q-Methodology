import React from "react";


export default class PrivacyScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            agreed: ""
        }

    }

    handleDisagree() {
        this.setState({ agreed: false })
    }

    handleAgree() {
        this.setState({ agreed: true })
    }




    render() {

        if (this.state.agreed == false) {
            //alert("Sorry, you must agree to the above terms and conditions to continue")
        }
        else {
            alert("Terms agreed")
        }


        return (
            <div>
                <h1>Consent Form</h1>
                <p>Please read and accept the terms and conditions before continuing</p>
                <br></br>
                <p>This is where the terms will go</p>
                <p>-Term 1</p>
                <p>-Term 2</p>
                <p>-Term 3</p>
                <p>-Term 4</p>
                <br></br>
                <p>I accept the terms and conditions</p>


                <button onClick={this.handleDisagree.bind(this)}>Disagree</button>
                <button onClick={this.handleAgree.bind(this)}>Agree</button>

            </div>
        )
    }
}