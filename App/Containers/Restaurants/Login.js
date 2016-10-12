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
  }

  login(e) {
    e.preventDefault();
    window.alert('Rounded button pressed!');
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
        <RoundedButton onPress={this.login} text="Login" />
      </View>
    )
  }
}

export default Login;
