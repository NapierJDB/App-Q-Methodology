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
            parseInt(this.state.total)
        console.log(this.state.total);
        this.props.addAnchor(this.state);
        
        e.target.reset();

        
    }

    //update state
    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });

    }


    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <input 
                            name="markerNumber"
                            placeholder="Marker number"
                            required
                            type="number"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <input 
                            name="numberOfItems"
                            placeholder="Number of items"
                            required
                            type="number"
                            onChange={this.updateState}
                        />
                    </div>

                    <div>
                        <input 
                            type="submit" 
                            value="Add +" 
                        />
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