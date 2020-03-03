import React, { Component, useState} from 'react'
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import axios from 'axios';
import './App.css';
import logo from './images/logo2.png'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  withRouter,
  Redirect,
  MemoryRouter
} from 'react-router-dom';



export default class Debrief extends React.Component {


    constructor() {
        super();

        this.state = {
            agreed: false
        }
    }

    handleCheckboxChange = (e) => {
        this.setState(previousState => { 
            return {agreed: !previousState.agreed}
            })
        }
    
    render() {

        let btn_style = this.state.agreed ? 'space button enabled' : 'space button disabled';

        return (
            <div className ='TextCenter'>
                <h1>Debrief</h1>
                <hr className= "headerline" ></hr>
                <p class="bold">Thank you for taking part in survey!</p>
                <p>Please read and accept the terms and conditions before continuing</p>
                <textarea className='policyTextbox'>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aenean commodo ligula eget dolor. Aenean massa. 
                Cum sociis natoque penatibus et magnis dis parturient montes, 
                nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, 
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, 
                imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. 
                Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate 
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. 
                Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra 
                nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi 
                vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas 
                tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem 
                neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas 
                nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis 
                ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet 
                nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus 
                nunc, 
                </textarea>
                <br></br>
                <p>I accept the terms and conditions 
                    <input 
                    name ="agree"
                    type="Checkbox"
                    value={this.state.agreed}
                    onChange={this.handleCheckboxChange}
                    />
                </p>
                <Link to={'/Reject'}>
                    <button
                        className = 'space button button3'>Disagree
                    </button>
                </Link>
                
                <Link to={'/End'}>
                  <button 
                    name=""
                    type="submit" 
                    className = {btn_style}
                    disabled={!this.state.agreed}
                    >
                      Agree
                  </button>
                </Link>
            </div>
        )
    }
}

