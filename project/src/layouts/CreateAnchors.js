import React, { useState } from "react";
import AnchorsTable from './tables/AnchorsTable';
import AddAnchorsForm from './tables/Forms/AddAnchorsForm';
import axios from "axios";
import EditAnchorsForm from './tables/Forms/EditAnchorsForm';
import {BrowserRouter as Router,
    Route,
    Link,
    Switch} from 'react-router-dom';


const CreateAnchors = () => {
    const anchorsData = [
    ]
    /*
        .......................
        |  ADDING NEW ANCHOR  |
        '''''''''''''''''''''''
    */    
    const [anchors, setAnchors] = useState(anchorsData)

    //Appends new anchor to an array
    const addAnchor = anchor => {
        /**Id generator 
         * not sure if this is needed
         * because we are using an API
         * so i guess the id will be auto incrementing?
         */
        anchor.id = anchors.length + 1
        setAnchors([...anchors, anchor])
    }

    /*
        .....................
        |  DELETING ANCHOR  |
        '''''''''''''''''''''
    */

    //This function is passed to AnchorsTable
    const deleteAnchor = id => {
        setAnchors(anchors.filter(anchor => anchor.id !== id))
    }

    /*
        ....................
        |  EDITING ANCHOR  |
        ''''''''''''''''''''
    */

    /*
        Initial empty space for the item being selected for editing
        When edit is selected on an anchor
        it should turn into edit mode
        and set the current user
    */

    const [editing, setEditing] = useState(false)

    
    const initialFormState = { 
        id: null, 
        anchorNumber: '', 
        numberOfItems: ''}

    const [currentAnchor, setCurrentAnchor] = useState(initialFormState)

    // This function is passed to AnchorsTable 
    const editRow = anchor => {
        setEditing(true)

        setCurrentAnchor({
            id: anchor.id,
            anchorNumber: anchor.anchorNumber,
            numberOfItems: anchor.numberOfItems
        })
    }

    const updateAnchor = (id, updateAnchor) => {
        setEditing(false)

        setAnchors(anchors.map(
            anchor => (
                anchor.id === id ? updateAnchor : anchor
            )
        ))
    }

    return (
        <div>
            <div>
                <div>
                    {editing ? (
                        <div>
                            <h2>Edit distribution marker</h2>
                            <EditAnchorsForm 
                                editing={editing}
                                setEditing={setEditing}
                                currentAnchor={currentAnchor}
                                updateAnchor={updateAnchor}
                            />
                        </div>
                    ) : (
                        <div>
                            <h2>Rating scale</h2>
                            <AddAnchorsForm 
                            addAnchor={addAnchor} 
                            />
                        </div>
                    )}
                    
                </div>
                <div>
                    <h2>View rating scale</h2>
                    <AnchorsTable 
                        anchors={anchors} 
                        deleteAnchor={deleteAnchor}
                        editRow={editRow}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateAnchors