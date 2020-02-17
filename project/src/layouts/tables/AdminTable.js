import React from 'react'

const AdminTable = props => (
    <table>
        <thead>
            <tr>
                <th>Statement</th>
            </tr>
        </thead>
        <tbody>
            {props.statements.length > 0 ? (
                props.statements.map(statement => (
                    <tr key={statement.id}>
                        <td>{statement.name}</td>
                        <td>
                            <button
                                onClick={() => {
                                    props.editRow(statement)
                                }}
                                className="button muted-button"
                            >
                                Edit
                            </button>

                            <button onClick={() => props.deleteStatement(statement.id)} className="button muted-button">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                    <tr>
                        <td colSpan={3}>No statements</td>
                    </tr>
                )}
        </tbody>
    </table>
)

export default AdminTable