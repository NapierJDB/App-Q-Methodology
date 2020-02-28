import React, { Component } from 'react';

class Anchors extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.oldValue,
        }
        this.handleRegionClick = this.handleRegionClick.bind(this);
}

    // Call updateAnchor (NewAnchors.js)
    handleUpdate = () => {

        this.calculateTotal();
        this.props.updateAnchor(
            this.indexNum,
            this.markerNumber.value,
            this.numberOfItems.value
        )
       
    }

    handleRegionClick(btnDelete){
        //console.log("button pressed");
        //this.anchorRemoved();
        
    }

    render(){
      
        const { allAnchors, editButton, deleteAnchor } = this.props;

        const anchorsList = allAnchors.map((anchor, index) => {

            this.calculateTotal = () => {

                if(anchor.total > this.numberOfItems.value){
                    /*
                        Total is greater than number of items
                        then the difference must be taken away 
                        from the total
                     */
                    var a_difference = 
                        parseInt(this.props.oldValue) - 
                        parseInt(this.numberOfItems.value);
                    //alert("Difference: " + a_difference)
                    anchor.total = parseInt(anchor.total) - parseInt(a_difference)
                }
                else if (anchor.total < this.numberOfItems.value){
                     /*
                        Total is less than number of items
                        then the difference must be added
                        to the total
                     */
                    var b_difference = 
                        parseInt(this.props.oldValue) - 
                        parseInt(this.numberOfItems.value);

                    anchor.total = parseInt(anchor.total) + parseInt(b_difference)
                }
                
                
                                     
            }

            //this.anchorRemoved = () => {
              //  anchor.total = parseInt(anchor.total) - this.state.value
                //console.log(anchor.total)
            //}

            
            
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
                            onClick={() => deleteAnchor(index), this.handleRegionClick}
                            id="btnDelete">
                            Delete
                        </button>
                        <button
                            onClick={this.anchorRemoved}>
                            Remove
                        </button>
                    </td>
                    
                </tr>
                
            );
        
        });
        
        return(
            <div>
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
            </div>
            
        );
    }
}

export default Anchors;