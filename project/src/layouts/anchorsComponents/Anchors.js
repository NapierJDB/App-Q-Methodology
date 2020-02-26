import React, { Component } from 'react';

class Anchors extends Component{

    // Call updateAnchor (NewAnchors.js)
    handleUpdate = () => {
        this.props.updateAnchor(
            this.indexNum,
            this.markerNumber.value,
            this.numberOfItems.value,)
    }

    render(){

        const { allAnchors, editButton, deleteAnchor} = this.props;

        const anchorsList = allAnchors.map((anchor, index) => {
            
            return anchor.isEditing === true ? (

                <tr key={index}>
                    
                    <td>
                        <input 
                            type="number"
                            ref={(val) => 
                            {this.markerNumber = val}}
                            required
                            defaultValue={anchor.markerNumber}
                        />
                    </td>

                    <td>
                        <input 
                            type="number"
                            ref={(val) => 
                            {this.numberOfItems = val}}
                            required
                            defaultValue={anchor.numberOfItems}
                        />
                    </td>

                    <td>
                        <input 
                            type="button"
                            value="Update"
                            onClick={this.handleUpdate}
                            ref={() =>
                            {this.indexNum = index}}
                        />
                    </td>
                </tr>   
            ) : (

                <tr key={index}>
                    <td>{anchor.markerNumber}</td>
                    <td>{anchor.numberOfItems}</td>
                    <td>
                        <button
                            onClick={() => editButton(index)}>
                            Edit                           
                        </button>
                        <button
                            onClick={() => deleteAnchor(index)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        
        });
        
        return(
            <table>
            <thead>
                <tr>
                <th>Marker number</th>
                <th>Number of items</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {anchorsList}
            </tbody>
        </table>
        );
    }
}

export default Anchors;