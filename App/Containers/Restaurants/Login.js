import React, { Component } from 'react';
import { Text, TextInput, StatusBar, View } from 'react-native';
import RoundedButton from '../Components/RoundedButton';
import RedButton from '../Components/RedButton';
import YellowButton from '../Components/YellowButton';
import { Actions as NavigationActions } from 'react-native-router-flux';

import styles from '../Styles/RootContainerStyle';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
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
    window.alert('CANCELED');
    NavigationActions.register;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.textBox}
          placeholder='Username'
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
        />
        <TextInput
          style={styles.textBox}
          placeholder='Password'
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
        />
        <View style={styles.inline}>
          <RedButton onPress={this.cancel} text="Cancel" />
          <YellowButton onPress={this.login} text="Login" />
        </View>
      </View>
    )
  }
}

export default Login;
