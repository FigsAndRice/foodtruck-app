import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Text, TextInput, StyleSheet, Picker, TouchableHighlight } from 'react-native';

import styles from '../Styles/RootContainerStyle';
import { register } from '../../Redux/Actions/UserActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state= {
      name: '',
      cuisine: '',
      email: '',
      password1: '',
      password2: ''
    }
    this.picking=this.picking.bind(this);
    this._onPressButton = this._onPressButton.bind(this);
  }

  picking(cuisine) {
    this.setState({ cuisine });
  }

  _onPressButton() {
    if (this.state.name && this.state.cuisine && this.state.email && this.state.password1 && this.state.password1) {
      if (this.state.password1 !== this.state.password2) {
        alert("Please type matching passwords.");
        return;
      };
      let registerObj = {
        name: this.state.name,
        email: this.state.email,
        pwd: this.state.password1,
        cuisine: this.state.cuisine
      };
      register(registerObj);
    } else {
      alert("Please fill out all fields.");
    }
  }

  render(){
    return (
      // <ScrollView>
      <View style= {styles.container}>
        <TextInput
          style= {styles.textBox}
          placeholder="NAME"
          onChangeText={(text) => this.setState({name: text})}
          value={this.state.name}
        />
        <Picker
          style= {style.picker}
          selectedValue= {this.state.cuisine}
          onValueChange= {this.picking}>
          <Picker.Item label="Cuisine Type" value="none" />
          <Picker.Item label="African" value="african" />
          <Picker.Item label="American" value="american" />
          <Picker.Item label="Asian" value="asian" />
          <Picker.Item label="French" value="french" />
          <Picker.Item label="Italian" value="italian" />
          <Picker.Item label="Indian" value="indian" />
          <Picker.Item label="Mexican" value="mexican" />
          <Picker.Item label="Latin American" value="latin-american" />
          <Picker.Item label="Middle Eastern" value="middle-eastern" />
          <Picker.Item label="Fusion" value="fusion" />
        </Picker>
        <TextInput
          style={styles.textBox}
          placeholder="EMAIL"
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
        />
        <TextInput
          style={styles.textBox}
          placeholder="PASSWORD"
          onChangeText={(text) => this.setState({password1: text})}
          value={this.state.password1}
        />
        <TextInput
          style={styles.textBox}
          placeholder="RE-PASSWORD"
          onChangeText={(text) => this.setState({password2: text})}
          value={this.state.password2}
        />
        <TouchableHighlight style={style.button} onPress={this._onPressButton}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
      // </ScrollView>
    )
  }
}

const style = {
  picker: {
    width: 200,
  },
  button: {
    // width: 100,
    padding: 15,
    backgroundColor: '#e7e7e7',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    elevation: 10,
    // textAlign: 'center',
  }
}

export default Register;
