import React from 'react';

const AnchorsTable = props => (
    <table>
        <thead>
            <tr>
                <th>Anchor number</th>
                <th>Number of items</th>
            </tr>
        </thead>
        <tbody>
            {props.anchors.length > 0 ? (
                props.anchors.map(anchor => (
                    <tr key={anchor.id}>
                        <td>{anchor.anchorNumber}</td>
                        <td>{anchor.numberOfItems}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No anchors</td>
                </tr>
            )}
        </tbody>
    </table>
)

export default AnchorsTable;