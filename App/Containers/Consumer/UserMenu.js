import React, { Component } from 'react';
import { Image, ScrollView, View, ListView, StatusBar, Text, TextInput, StyleSheet, Picker, TouchableHighlight } from 'react-native';

import styles from '../Styles/RootContainerStyle';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // Hardcoded data
    this.state = {
      dataSource: ds.cloneWithRows([
        // Results Array
      ])
    };
  }

  _onMenuClicked(data){
    alert(data.food+" Details: "+data.details);
  }

  render() {
    return (
      <View style = {styles.container}>
          <ListView
            style = {listStyle}
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) => { return (
                <TouchableHighlight onPress={this._onMenuClicked.bind(null,rowData)}>
                  <View style={itemStyle}>
                    <Image
                      style={{width: 90, height: 90}}
                      source={{uri: rowData.imgurl}}
                    />
                    <View style={infoStyle}>
                      <Text style={{color:'white'}}>{rowData.food}</Text>
                      <Text style={{color:'white'}}>${rowData.price}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
            }
          />
    </View>
    );
  }
}

const listStyle = {
  paddingTop: 70,
  width: 340,
}

const itemStyle = {
  height: 100,
  padding: 5,
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const infoStyle = {
  margin: 5,
  marginLeft: 60
}

export default UserMenu;
