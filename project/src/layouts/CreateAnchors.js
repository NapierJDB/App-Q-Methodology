import React, { useState } from "react";
import AnchorsTable from './tables/AnchorsTable';
import AddAnchorsForm from './tables/Forms/AddAnchorsForm';

/**To implement:
 * Delition of anchors
 * Editing Anchors
 * Continue to work on navigation!!!!!
 * Pass data to back end
 */

const CreateAnchors = () => {
    const anchorsData = [
        {anchorNumber: -2, numberOfItems: 3},
        {anchorNumber: -1, numberOfItems: 5},
        {anchorNumber: 0, numberOfItems: 2},
        {anchorNumber: +1, numberOfItems: 6},
        {anchorNumber: +2, numberOfItems: 1},
    ]
    
    const [anchors, setAnchors] = useState(anchorsData)

    const addAnchor = anchor => {
        /**Id generator 
         * not sure if this is needed
         * because we are using an API
         * so i guess the id will be auto incrementing?
         */
        anchor.id = anchors.length + 1
        setAnchors([...anchors, anchor])
    }

    return (
        <div>
            <h1>Create anchors</h1>
            <div>
                <div>
                    <h2>Add anchor</h2>
                    <AddAnchorsForm addAnchor={addAnchor} />
                </div>
                <div>
                    <h2>View anchors</h2>
                    <AnchorsTable anchors={anchors} />
                </div>
            </div>
        </div>
    )
}

export default CreateAnchors