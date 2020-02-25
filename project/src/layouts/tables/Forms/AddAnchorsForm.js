import React, { useState } from 'react'

const AddAnchorsForm = props => { 

    const initialFormState = { 
        id: null, 
        anchorNumber: 0, 
        numberOfItems: 0,
        total: 0,
    }
    
    const [anchor, setAnchor] = useState(initialFormState)

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
        setAnchor(initialFormState)
        addAction();
    }

    const addAction = event => {
        anchor.total = anchor.total + anchor.numberOfItems

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Marker number</label>
                <input 
                    type="number" 
                    name="anchorNumber" 
                    value={anchor.anchorNumber}
                    onChange={handleChange} 
                />
                <label>Number of Items</label>
                <input 
                    type="number" 
                    name="numberOfItems" 
                    value={anchor.numberOfItems}
                    onChange={handleChange} 
                />
                <button onClick={addAction}>                 
                    Add new marker
                </button>
            </form>
            <div>
                <h3>Total items</h3>
                <input 
                    type = 'text'
                    value={initialFormState.total}
                    readOnly
                />
            </div>
        </div>       
        
        
    )
}

export default AddAnchorsForm