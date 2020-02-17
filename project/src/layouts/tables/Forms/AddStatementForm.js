import React, { useState } from 'react'

const AddStatementForm = props => {
    const initialFormState = { id: null, name: '' }
    const [statement, setStatements] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target

        setStatements({ ...statement, [name]: value })
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                if (!statement.name) return

                props.addStatements(statement)
                setStatements(initialFormState)
            }}
        >
            <label>Statement</label>
            <input type="text" name="name" value={statement.name} onChange={handleInputChange} />
            <button>Add new statement</button>
        </form>
    )
}

export default AddStatementForm