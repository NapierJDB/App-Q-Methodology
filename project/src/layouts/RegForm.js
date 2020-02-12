import React from 'react';
import axios from 'axios';

export default class RegForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            registrationErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { userName, email, password, confirmPassword } = this.state;

        axios.post('https://www.one.barttest.me.uk/Project2/public/account/register',
         {
             forename: 'Anna',
             surname: 'Banana',
             email: 'email@op.pl',
             password: 'banana password'
         })
         .then(function (resonse) {
             console.log(resonse);
         })
         .catch(function (error) {
             console.log(error);
         });
        //axios.post('/user', {
            //userName: userName,
            //email: email,
            //password: password,
            //confirmPassword: confirmPassword
        //})
        //.then(function (response) {
            //console.log(response);
          //})
          //.catch(function (error) {
            //console.log(error);
          //});
        //{ withCredentials: true }
        //.then(response => {
            //console.log(response);
            //console.log(response.data);
        //})
        //.catch(error => {
            //console.log('registration error', error);
        //});
        //event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="userName"
                    placeholder="User name"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Password confirmation"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    required
                />

                <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}