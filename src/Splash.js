import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Text,
    Image
} from "react-native";
import AppNavigator from "./AppNavigator";
import Home from "./Home";
import EdinburghNapierLogo from "./EdinburghNapierLogo.png"


export default class Splash extends React.Component {
    render() {
        return (

            <View style={styles.container} >
                <Text style={styles.title}>
                    Q-Methodology
                </Text>
                <Image source={EdinburghNapierLogo} style={styles.logo} />

                <Text style={styles.body}>
                    this is a test
                </Text>

                <View style={styles.button}>
                    <Button onPress={() => {
                        this.props.navigation.navigate("Home");
                    }}
                        title="Go"
                    />

                </View>


            </View >



        )

    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        paddingLeft: 90,
        paddingRight: 90

    },

    title: {
        fontSize: 50,
        textAlign: "center",
        paddingTop: 70
    },

    logo: {
        display: "flex",
        height: 119,
        width: 300,
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 80
    },

    body: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 180,


    },

    button: {
        backgroundColor: "#0595f2",
        width: 100,
        textAlign: "center",
        marginBottom: 15,
        justifyContent: "center"

    }
})

