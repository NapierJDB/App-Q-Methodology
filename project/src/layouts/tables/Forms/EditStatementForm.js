import React, { useState, useEffect } from 'react'

const EditStatementForm = props => {
    const [statement, setStatement] = useState(props.currentStatement)

    const handleInputChange = event => {
        const { name, value } = event.target

        setStatement({ ...statement, [name]: value })
    }

    useEffect(() => {
        setStatement(props.currentStatement)
    }, [props])


    return (
        <form
            onSubmit={event => {
                event.preventDefault()

                props.updateStatement(statement.id, statement)
            }}
        >
            <label>Statement</label>
            <input type="text" name="name" value={statement.name} onChange={handleInputChange} />
            <button>Update statement</button>
            <button onClick={() => props.setEditing(false)} className="button muted-button">
                Cancel
      </button>
        </form>
    )
}

export default EditStatementForm