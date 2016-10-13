import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, StyleSheet } from 'react-native';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import RoundedButton from './Components/RoundedButton';
import YellowButton from './Components/YellowButton';

import styles from './Styles/RootContainerStyle';

const buttonStyle = {
  backgroundColor: 'red',
  padding: 10
}

class RootContainer extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'RootContainer';

        this.state = {
          search: '',
          location: ''
        }
    }

    render() {
      return (
      	<View style={styles.container} className="container">
          <Text style={styles.text}>Fook</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={(text) => this.setState({search: text})}
            value={this.state.search}
            autoCorrect={false}
            placeholder="Search"
          />
          <TextInput
            style={styles.textBox}
            onChangeText={(text) => this.setState({location: text})}
            value={this.state.location}
            autoCorrect={false}
            placeholder="Location"
          />
          <RoundedButton onPress={NavigationActions.results}>Search</RoundedButton>
          <View style={styles.inline}>
            <YellowButton text="register" onPress={NavigationActions.register} />
            <YellowButton text="login" onPress={NavigationActions.login} />
          </View>
    		</View>
      )
    }
}

export default RootContainer;
