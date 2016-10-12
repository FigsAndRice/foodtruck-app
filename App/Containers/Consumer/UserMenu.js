import React, { Component } from 'react';
import { ScrollView, View, ListView, StatusBar, Text, TextInput, StyleSheet, Picker } from 'react-native';

import styles from '../Styles/RootContainerStyle';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style = {styles.container}>
       {/* <View style={{paddingTop: 22}}> */}
       {/* <ScrollView style={{paddingTop: 70}}> */}
          <ListView
            style = {listStyle}
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) => <Text>{rowData}</Text>}
          />
      {/* </ScrollView> */}
     {/* </View> */}
    </View>
    );
  }
}

const listStyle = {
  paddingTop: 70,
  width: 350,
}

export default UserMenu;
