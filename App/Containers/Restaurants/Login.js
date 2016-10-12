import React, { Component } from 'react';
import { Text, TextInput, StatusBar, View } from 'react-native';
import RoundedButton from '../Components/RoundedButton';

import styles from '../Styles/RootContainerStyle';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Username',
      password: 'Password'
    }

    this.login = this.login.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  login() {
    // SEND USERNAME AND PW TO BACKEND
    window.alert(this.state.username, this.state.password);
  }

  cancel() {
    // SEND BACK TO SPLASH SCREEN

  }

  render() {
    return (
      <View style={styles.container} className="container">
        <StatusBar barStyle='light-content' />
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
        />
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
        />
        <RoundedButton onPress={this.cancel} text="Cancel" />
        <RoundedButton onPress={this.login} text="Login" />
      </View>
    )
  }
}

export default Login;
