import React, { Component } from 'react';

class AddAnchor extends Component{

    state = {
        markerNumber:null,
        numberOfItems:null,
        isEditing:false
    }

    // call add anchor (NewAnchors.js)

    handleSubmit = (e) => {
        e.preventDefault();
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
                </form>
            </div>
        );
    }
}

export default AddAnchor;