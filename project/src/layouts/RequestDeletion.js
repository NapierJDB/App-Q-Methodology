import React from "react";
import logo from './images/logo2.png';
import Tooltip from "react-simple-tooltip";
import { Link } from 'react-router-dom';



export default class CreateSurvey_1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      researcherEmail: localStorage.getItem('RE_EMAIL'),
    };

  //  this.handleChange = this.handleChange.bind(this);
    //this.request = this.send.bind(this);
  }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }


  render() {

    // if (this.state.Redirect) {
    //   return (
    //     <Redirect to={{
    //       pathname: '/NewAnchors',
    //     }} />
    //   )
    // }

    return (
      <div className = 'TextCenter'>
            <img src={logo}/>
            <h1 className = 'primary'>Request Delition</h1>
            <div>
                <h2 className = 'primary'>Delete my results</h2>
                <p>To request deletion of your data please contact the researcher via Email</p>
                <h3>{this.state.researcherEmail}</h3>

                    <div>
                        <Link 
                            to={{
                                pathname: '/Participant'
                            }}>
                            <button
                                className = 'space button button3'>
                                Go Back
                            </button>  
                        </Link>
                                 
                    </div>
            </div>
          </div>
    );
  }
}