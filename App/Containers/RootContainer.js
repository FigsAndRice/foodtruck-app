import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, StyleSheet } from 'react-native';

import NavigationRouter from '../Navigation/NavigationRouter'

import styles from './Styles/RootContainerStyle';

class RootContainer extends Component {

    render() {
      return (
        <View style={styles.applicationView}>
          <StatusBar barStyle='light-content' />
          <NavigationRouter />
        </View>
      )
    }
}

export default RootContainer;
