import React, { createContext } from 'react';

//CONTEXT
//The values here will be overwritten with by the UserProvider
const MyContext = createContext({
    id: '',
    updateID: () => {},
    
})

//PROVIDER
//Parent component that will manage the sharted state
class MyProvider extends React.Component {
    updateID = newID => {
        this.setState({ id: newID });
    };

    state = {
        id: '',
        updateID: this.updateID,
    };

    

    render() {
        console.log("WHAT ARE YOU? " + this.state.id)
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
                
            </MyContext.Provider>
        )
    }
}

//CONSUMER 
//All component to access the shared state
const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer }