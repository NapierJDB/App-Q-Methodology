import React from 'react'

const AdminTable = props => (
    <table>
        <thead>
            <tr>
                <th>Statement number</th>
                <th>Statement</th>
            </tr>
        </thead>
        <tbody>
            {props.statements.length > 0 ? (
                props.statements.map(statement => (
                    <tr key={statement.id}>
                        <td>{statement.statementNumber}</td>
                        <td>{statement.name}</td>
                        <td>
                            <button
                                onClick={() => {
                                    props.editRow(statement)
                                }}
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