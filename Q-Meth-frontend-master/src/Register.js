import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Button} from 'react-native';

export default class Register extends Component {
  constructor() {
    super()
    this.state = {
      firstName: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: ""  
    }

    this.handleChangeFirstName=this.handleChangeFirstName.bind(this);
    this.handleChangeSurname=this.handleChangeSurname.bind(this);
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm=this.handleChangePasswordConfirm.bind(this);
  }

  handleChangeFirstName = (textValue)=>{
    this.setState({firstName : textValue})
  }

  handleChangeSurname = (textValue)=>{
    this.setState({surname : textValue})
  }

  handleChangeEmail = (textValue)=>{
    this.setState({email : textValue})
  }

  handleChangePassword = (textValue)=>{
    this.setState({password : textValue})
  }

  handleChangePasswordConfirm= (textValue)=>{
    this.setState({confirmPassword : textValue})
  }

  render(){
    return (
      <View style={styles.container}>
        <TextInput
        name="firstName"
        placeholder="Name"
        firstName={this.state.firstName} 
        onChangeText={this.handleChangeFirstName}
        style={styles.textBox}
        />
        <TextInput
        name="surname"
        placeholder="Surname"
        surname={this.state.surname} 
        onChangeText={this.handleChangeSurname}
        style={styles.textBox}
        />
        <TextInput
        name="email"
        placeholder="Email"
        email={this.state.email} 
        onChangeText={this.handleChangeEmail}
        style={styles.textBox}
        />
        <TextInput
        name="password"
        placeholder="Password"
        password={this.state.password} 
        onChangeText={this.handleChangePassword}
        style={styles.textBox}
        secureTextEntry
        />
        <TextInput
        name="confirmPassword"
        placeholder="Confirm password"
        confirmPassword={this.state.confirmPassword} 
        onChangeText={this.handleChangePasswordConfirm}
        style={styles.textBox}
        secureTextEntry
        />

        <View >
          <Button 
          onPress={() => {
            alert(
              'Your details are: \n' +
              this.state.firstName + '\n' +  
              this.state.surname + '\n' +
              this.state.email + '\n' 
              );
          }}
          title="Register"
          color='#ff3333'
          width='50'
          borderRadius='6'
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center'
    
  },

  textBox: {
    height: 50,
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 15,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ff3333',
    width: 250
},

  button: {
    height: 50,
    backgroundColor: '#ff3333',
    width: 100,
    borderRadius: 6
  }
});

