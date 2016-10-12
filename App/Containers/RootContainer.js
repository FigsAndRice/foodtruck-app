import React from 'react';
import { View, StatusBar, Text, TextInput, StyleSheet } from 'react-native';
import styles from './Styles/RootContainerStyle';

class RootContainer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RootContainer';

        this.state = {
          search: 'Search',
          location: 'Location'
        }
    }

    render() {
      return (
      	<View style={styles.container} className="container">
	        <StatusBar barStyle='light-content' />
          <Text style={styles.text}>Fook</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={(text) => this.setState({search})}
            value={this.state.search}
          />
          <TextInput
            style={styles.textBox}
            onChangeText={(text) => this.setState({location})}
            value={this.state.location}
          />
    		</View>
      )
    }
}

export default RootContainer;
