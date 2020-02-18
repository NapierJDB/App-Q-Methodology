import React, { useState } from 'react'

const AddAnchorsForm = props => {

    const inistalFormState = { 
        id: null, 
        anchorNumber: '', 
        numberOfItems: ''}
    
    const [anchor, setAnchor] = useState(inistalFormState)

    const handleChange = event => {
        const { name, value } = event.target

        setAnchor({ ...anchor, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if(!anchor.anchorNumber ||
            !anchor.numberOfItems)
        return

        props.addAnchor(anchor)
        setAnchor(inistalFormState)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Anchor number</label>
            <input 
                type="number" 
                name="anchorNumber" 
                value={anchor.anchorNumber}
                onChange={handleChange} 
            />
            <label>Statements</label>
            <input 
                type="number" 
                name="numberOfItems" 
                value={anchor.numberOfItems}
                onChange={handleChange} 
            />
            <button>Add new anchor</button>
        </form>
    )
}

export default AddAnchorsForm