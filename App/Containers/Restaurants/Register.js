import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Text, TextInput, StyleSheet, Picker, TouchableHighlight } from 'react-native';

import styles from '../Styles/RootContainerStyle';

class Register extends Component {
  constructor(props){
    super(props);
    this.state= {
      name: '',
      cuisine: '',
      username: '',
      password: '',
      password2: ''
    }
    this.picking=this.picking.bind(this);
  }

  picking(cuisine){
    this.setState({cuisine});
  }

  _onPressButton(){
    alert("clicked");
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
          placeholder="USERNAME"
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
        />
        <TextInput
          style={styles.textBox}
          placeholder="PASSWORD"
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
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
