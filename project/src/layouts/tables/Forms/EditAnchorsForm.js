import React, { useState, useEffect } from 'react';

const EditAnchorsForm = props => {
    const [ anchor, setAnchor ] = useState(props.currentAnchor)

    const handleChange = event => {
        const { name, value } = event.target

        setAnchor({ ...anchor, [name]: value })
        
    }

    useEffect(() => {
        setAnchor(props.currentAnchor)
    }, [props])

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                props.updateAnchor(anchor.id, anchor)
            }}>
            <label>Marker number</label>
            <input 
                type="number"
                name="anchorNumber"
                value={anchor.anchorNumber}
                onChange={handleChange}
            />
            <label>Number of statements</label>
            <input 
                type="number"
                name="numberOfItems"
                value={anchor.numberOfItems}
                onChange={handleChange}
            />
            <button>Update marker</button>
            <button
                onClick={() => props.setEditing(false)}>
                Cancel
            </button>
        </form>
    )
}

export default EditAnchorsForm