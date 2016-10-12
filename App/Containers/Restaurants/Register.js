import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, StyleSheet, Picker, UIExplorerBlock, UIExplorerPage } from 'react-native';

// import styles from '../Styles/RegisterStyle';

class Register extends Component {
  constructor(){
    super();
    this.state={
      name: '',
      cuisine: 'select',
      username: '',
      password: '',
      password1: ''
    }
  }
  render(){
    return (
      <View style={style.container}>
        {/* <StatusBar barStyle='light-content' /> */}
        <Text>NAME</Text>
        <TextInput
          style={style.textBox}
        />
        <Text>CUISINE</Text>
        <Picker
          // style={style.picker}
          selectedValue={this.state.cuisine}
          onValueChange={(cuisine) => this.setState({ cuisine})}
          >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <Text>USERNAME</Text>
        <TextInput
          style={style.textBox}
        />
        <Text>PASSWORD</Text>
        <TextInput
          style={style.textBox}
        />
        <Text>RE-PASSWORD</Text>
        <TextInput
          style={style.textBox}
        />
      </View>
    )
  }
}

const style = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    height: 40,
    width: 250,
    alignSelf: 'center',
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    alignSelf: 'center',
    // textAlign: 'center',
  }
}

export default Register;
