import React, { Component } from 'react';

class AddAnchor extends Component{

    state = {
        markerNumber:null,
        numberOfItems:null,
        isEditing:false,
        total: 0,
    }

    // call add anchor (NewAnchors.js)

    handleSubmit = (e) => {
        e.preventDefault();
        
        // Add the total number of items
        this.state.total = 
            parseInt(this.state.numberOfItems) + 
            parseInt(this.state.total);

        //console.log(this.state.total);

        this.props.addAnchor(this.state);
        
        e.target.reset();

        
    }

    //update state
    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
            total: this.state.total,
            
        });

    }


    render(){

        window.totalNumberOfItems = this.state.total
        return(
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <input className = 'space textbox'
                            name="markerNumber"
                            placeholder="Marker number"
                            required
                            type="number"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <input className = 'space textbox'
                            name="numberOfItems"
                            placeholder="Number of items"
                            required
                            type="number"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <button className = 'space button button3' 
                            type="submit" 
                        >
                            Add +
                        </button>
                    </div>
                  
                    <div>
                        <h3>{ this.state.total }</h3>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddAnchor;