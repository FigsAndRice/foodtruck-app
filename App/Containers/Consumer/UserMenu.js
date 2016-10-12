import React, { Component } from 'react';
import { ScrollView, View, ListView, StatusBar, Text, TextInput, StyleSheet, Picker } from 'react-native';

import styles from '../Styles/RootContainerStyle';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {imgurl: '',food : 'Chicken Rice',price: '20.99' },
        {imgurl: '',food : 'Chicken Tikka',price: '10.99' },
        {imgurl: '',food : 'Chicken Masala',price: '9.99' },
        {imgurl: '',food : 'Pepper Chicken',price: '11.50' },
        {imgurl: '',food : 'Chicken 65',price: '15.99' },
        {imgurl: '',food : 'Tandoori Chicken',price: '7.89' },
        {imgurl: '',food : 'Chicken Lolipop',price: '6.99' },
        {imgurl: '',food : 'Chicken Curry',price: '8.99' },
        {imgurl: '',food : 'Chicken Biriyani',price: '25.99' },
        {imgurl: '',food : 'Chicken Gravy',price: '20.99' }
      ])
    };
  }
  render() {
    return (
      <View style = {styles.container}>
          <ListView
            style = {listStyle}
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) => { return (
                <View>
                  <Text>{rowData.food} : ${rowData.price}</Text>
                </View>
              )}
            }
          />
    </View>
    );
  }
}

const listStyle = {
  paddingTop: 70,
  width: 350,
}

export default UserMenu;
