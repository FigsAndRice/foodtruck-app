import React, { Component } from 'react';
import { Image, ScrollView, View, ListView, StatusBar, Text, TextInput, StyleSheet, Picker, TouchableHighlight } from 'react-native';

import styles from '../Styles/RootContainerStyle';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Rice',price: '20.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Tikka',price: '10.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Masala',price: '9.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Pepper Chicken',price: '11.50' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken 65',price: '15.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Tandoori Chicken',price: '7.89' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Lolipop',price: '6.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Curry',price: '8.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Biriyani',price: '25.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Gravy',price: '20.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Masala',price: '9.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Pepper Chicken',price: '11.50' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken 65',price: '15.99' },
        {details: 'this is made abfaiub basidu halalguys bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Tandoori Chicken',price: '7.89' }
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
                      style={{width: 70, height: 70}}
                      source={{uri: rowData.imgurl}}
                    />
                    <View style={infoStyle}>
                      <Text>{rowData.food}</Text>
                      <Text>${rowData.price}</Text>
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
  width: 350,
}

const itemStyle = {
  height: 80,
  padding: 5,
  flexDirection: 'row',
  flexWrap: 'wrap'
}

const infoStyle = {
  margin: 5,
  marginLeft: 60
}

export default UserMenu;
