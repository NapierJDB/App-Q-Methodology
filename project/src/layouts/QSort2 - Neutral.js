import React, { Component, useState} from 'react'
import { render } from 'react-dom';
import axios from 'axios';
import './App.css';
import redBox from './images/redbox.png'
import greenBox from './images/greenbox.png'
import whiteBox from './images/whitebox.png'
import leftArrow from './images/left.png'
import rightArrow from './images/right.png'

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
import './App.css';

export default class QSort2 extends Component {

    constructor (){
        super();
        
        this.state = {
        
        }
    }

    render() {
        return (
            <div className = 'TextCenter'>
                <h1>Q Sort Stage 2 - Neutral</h1>
                    <div>
                        <div>
                            <button className='space boxButton button3'>
                                <img className = "boxImg" src = {leftArrow}/>
                            </button>
                            <textarea>
                                hwerkwherkwenkwehr
                            </textarea>
                            <button className='space boxButton button3'>
                                <img className = "boxImg" src = {rightArrow}/>
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
                            <button className='space button button3'>
                                Edit Negative
                            </button>
                            <button className='space button button3'>
                                Edit Neutral
                            </button>
                            <button className='space button button3'>
                                Edit Positive
                            </button>
                        </div>
                    </div>

                    <Link to={'/QSort2Positive'}>
                        <button className='space button button3'>
                            Next
                        </button>
                    </Link>
            </div>
        )
    }
}
