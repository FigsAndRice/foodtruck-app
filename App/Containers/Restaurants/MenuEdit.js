import React, { Component } from 'react';
import { Image, View, ListView, ScrollView, StatusBar, Text, TextInput, StyleSheet, Picker, TouchableHighlight } from 'react-native';

import styles from '../Styles/RootContainerStyle';

class MenuEdit extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Rice',price: '20.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Tikka',price: '10.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Masala',price: '9.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Pepper Chicken',price: '11.50' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken 65',price: '15.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Tandoori Chicken',price: '7.89' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Lolipop',price: '6.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Curry',price: '8.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Biriyani',price: '25.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Gravy',price: '20.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken Masala',price: '9.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Pepper Chicken',price: '11.50' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Chicken 65',price: '15.99' },
        {details: 'this is made abfaiub basidu bbfkoe', imgurl: 'https://facebook.github.io/react/img/logo_og.png', food : 'Tandoori Chicken',price: '7.89' }
      ])
    };
  }

  _onEditPressed(data){
    alert("clicked edit "+data.food);
  }

  _onDeletePressed(data){
    alert("clicked delete "+data.food);
  }

  _onAddPressed(){
    alert("Add New item");
  }

  render() {
    return (
      <View style= {styles.container}>
      <ListView
        style = {listStyle}
        dataSource = {this.state.dataSource}
        renderRow = {(rowData) => { return (
            <View style={itemStyle}>
              <Image
                style={{width: 90, height: 90}}
                source={{uri: rowData.imgurl}}
              />
              <View style={infoStyle}>
                <Text>{rowData.food}</Text>
                <Text>${rowData.price}</Text>
                <View style={{flexDirection:'row'}}>
                <TouchableHighlight
                  onPress={this._onEditPressed.bind(null,rowData)}
                  style={editbutton}
                >
                <Text style={{textAlign:'center'}}>Edit</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this._onDeletePressed.bind(null,rowData)}
                  style={deletebutton}
                >
                <Text style={{textAlign:'center',color:'white'}}>Delete</Text>
                </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        }
      />
      <View style={bottomBar}>
        <TouchableHighlight
          onPress={this._onAddPressed}
          style={Addbutton}
        >
        <Text style={{textAlign:'center',color: 'white'}}>Add Item</Text>
        </TouchableHighlight>
      </View>
      </View>
    )
  }
}

const bottomBar = {

}

const editbutton = {
  margin: 5,
  padding: 2,
  width: 50,
  backgroundColor: '#e7e7e7',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: 2,
  borderRadius: 5,
  elevation: 10,
}

const Addbutton = {
  margin: 15,
  padding: 2,
  width: 200,
  backgroundColor: '#13ce66',
  borderStyle: 'solid',
  borderColor: '#13ce66',
  borderWidth: 2,
  borderRadius: 5,
  elevation: 10,
}

const deletebutton = {
  margin: 5,
  padding: 2,
  width: 50,
  backgroundColor: '#ff5722',
  borderStyle: 'solid',
  borderColor: '#ff5722',
  borderWidth: 2,
  borderRadius: 5,
  elevation: 10,
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

export default MenuEdit;
