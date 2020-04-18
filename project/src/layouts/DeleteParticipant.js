import React from "react";
import logo from './images/logo2.png';
import Tooltip from "react-simple-tooltip";
import { Link } from 'react-router-dom';



export default class CreateSurvey_1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      participantEmail: "",
      token: localStorage.getItem('TOKEN'),
    };

    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  delete(event) {

    event.preventDefault()
    var email = this.state.participantEmail;
    console.log(email);


    fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/deleteUser', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,

      })
      })
      .then((response) => {
        return response.json();
        //console.log(response);

      })
       .then((data) => {
        console.log(data.message);

        //  this.state.error = data.error;
        
        //  if (this.state.error == false) {
        //    this.setState({ Redirect: true });
        //  }
        //  else {
        //    alert("Upps...\nIt looks like this survey already exist!")
        //  }


       })
      .catch(function (error) {
        console.log(error);
      });


  }

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
            <h1 className = 'primary'>Manage Participants</h1>
            <div>
                <h2 className = 'primary'>Delete Participant</h2>
                <form>
                  <div>
                    <div className = 'column'>
                          
                          <input className = 'space textbox'
                          type="text"
                          name="participantEmail"
                          placeholder="Participant Email"
                          participantEmail={this.state.participantEmail}
                          onChange={this.handleChange}
                          />

                    </div>

                    <div>
                        <button 
                        onClick={this.delete}
                        className = 'space button button3'>
                            Delete
                        </button>            
                    </div>

                    <div>
                        <Link 
                            to={{
                                pathname: '/AdminPanel'
                            }}>
                            <button
                                className = 'space button button3'>
                                Go Back
                            </button>  
                        </Link>
                                 
                    </div>

                  </div>                   
             </form>
            </div>
          </div>
    );
  }
}