import React, { Component } from 'react';
import {
  Modal,
  Image,
  View,
  ListView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  Picker,
  TouchableHighlight
} from 'react-native';

import styles from '../Styles/RootContainerStyle';

class MenuEdit extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // Hardcoded data
    this.state = {
      addModalVisible: false,
      itemName: '',
      itemPrice: '',
      dataSource: ds.cloneWithRows([
        // Menu Array
      ])
    };
    this._onAddPressed=this._onAddPressed.bind(this);
    this.addToMenu=this.addToMenu.bind(this);
  }

  _onEditPressed(data) {
    alert("clicked edit "+data.food);
  }

  _onDeletePressed(data) {
    alert("clicked delete "+data.food);
  }

  _onAddPressed() {
    // alert("Add New item");
    this.setModalVisible(true);
    // this.setState({modalVisible: visible});
  }

  setModalVisible(visible) {
    this.setState({addModalVisible: visible});
  }

  addToMenu() {
    alert("Adding to menu "+this.state.itemName+" priced $"+this.state.itemPrice);
  }

  render() {
    return (
      <View style= {styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.addModalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={{marginTop: 22, alignSelf: 'center'}}>
          <View style={{marginTop: 50}}>
            <Text style={{alignSelf:'center'}}>ADD NEW ITEM</Text>
            <TextInput
              onChangeText={(text) => this.setState({itemName: text})}
              style={textBox}
              placeholder="ITEM NAME"/>
            <TextInput
              onChangeText={(text) => this.setState({itemPrice: text})}
              style={textBox}
              keyboardType="numeric"
              placeholder="PRICE"/>
          </View>
            <View style={modalClose}>
              <TouchableHighlight
                onPress={this.addToMenu}
                style={saveButton}
              >
                <Text style={{alignSelf: 'center',color:'white'}}>Add To Menu</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={closeButton}
                onPress={() => {
                  this.setModalVisible(false)
                }}
              >
                <Text style={{alignSelf: 'center',color:'white'}}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
                <Text style={{paddingLeft:5,color:'white'}}>{rowData.food}</Text>
                <Text style={{paddingLeft:5,color:'white'}}>${rowData.price}</Text>
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
      <View>
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

const textBox = {
  height: 40,
  width: 250,
  alignSelf: 'center',
  borderColor: 'white',
  backgroundColor: '#e7e7e7',
  borderWidth: 2,
  color: 'black',
  textAlign: 'center',
  margin: 5,
  borderRadius: 5
}

const modalClose = {
  // position: 'absolute',
  alignSelf : 'center',
  flexDirection: 'row',
  // top: 50,
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

const closeButton = {
  margin: 15,
  padding: 5,
  width: 100,
  height: 35,
  backgroundColor: '#ff5722',
  borderStyle: 'solid',
  borderColor: '#ff5722',
  borderWidth: 2,
  borderRadius: 5,
  elevation: 10,
}

const saveButton = {
  margin: 15,
  padding: 5,
  width: 100,
  height: 35,
  backgroundColor: '#13ce66',
  borderStyle: 'solid',
  borderColor: '#13ce66',
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
