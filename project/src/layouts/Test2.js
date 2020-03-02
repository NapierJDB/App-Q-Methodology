import React from 'react';
import { MyConsumer } from '../Context';

export default class UserMessage extends React.Component {

    render() {
        return (
            <MyConsumer>
                {({ id }) => <h1>Welcome { id }</h1>}
            </MyConsumer>
        );
    }
    
}