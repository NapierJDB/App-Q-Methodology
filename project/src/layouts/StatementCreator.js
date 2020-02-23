import React, { useState } from 'react'
import AdminTable from './tables/AdminTable'
import AddStatementForm from './tables/Forms/AddStatementForm'
import EditStatementForm from './tables/Forms/EditStatementForm'
import {BrowserRouter as Router,
    Route,
    Link,
    Switch} from 'react-router-dom';

const StatementCreator = () => {
    const statementData = [

    ]

    const [statements, setStatements] = useState(statementData)

    const deleteStatement = id => {
        setStatements(statements.filter(statement => statement.id !== id))
    }

    const [editing, setEditing] = useState(false)
    const initialFormState = { id: null, name: '' }
    const [currentStatement, setCurrentStatement] = useState(initialFormState)

    const editRow = statement => {
        setEditing(true)

        setCurrentStatement({ id: statement.id, name: statement.name })
    }

    const updateStatement = (id, updatedStatement) => {
        setEditing(false)

        setStatements(statements.map(statement => (statement.id === id ? updatedStatement : statement)))
    }

    //Add
    const addStatements = statement => {
        statement.id = statements.length + 1
        statement.statementNumber = statements.length + 1
        setStatements([...statements, statement])

    }

    return (
        <div className="container">
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <div>
                            <h2>Edit Statement</h2>
                            <EditStatementForm
                                editing={editing}
                                setEditing={setEditing}
                                currentStatement={currentStatement}
                                updateStatement={updateStatement}
                            />
                        </div>
                    ) : (
                            <div>
                                <h2>Add Statement</h2>
                                <AddStatementForm addStatements={addStatements} />
                            </div>
                        )}
                </div>
                <div className="flex-large">
                    <h2>View Statement</h2>
                    <AdminTable statements={statements} deleteStatement={deleteStatement} editRow={editRow} />
                </div>
            </div>
        </div>
    )
}

export default StatementCreator