import React, { useState } from 'react';

const EditAnchorsForm = props => {
    const [ anchor, setAnchor ] = useState(props.currentAnchor)

    const handleChange = event => {
        const { name, value } = event.target

        setAnchor({ ...anchor, [name]: value })
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                props.updateAnchor(anchor.id, anchor)
            }}>
            <label>Anchor number</label>
            <input 
                type="number"
                name="anchorNumber"
                value={anchor.anchorNumber}
                onChange={handleChange}
            />
            <label>Number of statements</label>
            <input 
                type="number"
                name="numberOfstatements"
                value={anchor.numberOfStatements}
                onChange={handleChange}
            />
            <button>Update anchor</button>
            <button
                onClick={() => props.setEditing(false)}>
                Cancel
            </button>
        </form>
    )
}

export default EditAnchorsForm