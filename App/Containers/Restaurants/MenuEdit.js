import React, { Component } from 'react';
import { Actions as NavigationActions } from 'react-native-router-flux';

import {
  Alert,
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
  TouchableHighlight,
  Navigator
} from 'react-native';

import styles from '../Styles/RootContainerStyle';

class MenuEdit extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var foods = [];

    this.state = {
      addModalVisible: false,
      editModalVisible: false,
      editItem: '',
      editPrice: '',
      itemName: '',
      itemPrice: '',
      dataSource: ds.cloneWithRows(foods),
      db: foods,
      editf: ''
    };

    this._onAddPressed=this._onAddPressed.bind(this);
    this.addToMenu=this.addToMenu.bind(this);
    this._onDeletePressed=this._onDeletePressed.bind(this);
    this._onEditPressed=this._onEditPressed.bind(this);
    this.updateToMenu=this.updateToMenu.bind(this);
    this._onSavePressed=this._onSavePressed.bind(this);


  }

  _onSavePressed(){
    alert(`${JSON.stringify(this.state.db)}`)
  }

  _onEditPressed(data) {
    // window.prompt("clicked edit "+data.food);
    this.setState({
      editModalVisible: true,
      editItem: data.food,
      editPrice: data.price,
      editf: data.food
    });
  }

  _onDeletePressed(data) {
    let { db } = this.state;
    let foods = db.filter(item => item.food !== data.food);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({ dataSource: ds.cloneWithRows(foods), db: foods });
    // alert("clicked delete "+data.food);
  }

  updateToMenu(){
    let { db } = this.state;
    let item = { food: this.state.editItem, price: this.state.editPrice};
    if (item.food !== '' && item.price !== '') {
      let index = db.findIndex(x =>x.food === this.state.editf);
      console.log("index:",index);
      db[index] = item;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ dataSource: ds.cloneWithRows(db), db, editItem: "", editPrice: "" });
      this.editModalVisible(false);
    }
  }

  _onAddPressed() {
    // alert("Add New item");
    this.setModalVisible(true);
    // this.setState({modalVisible: visible});
  }

  setModalVisible(visible) {
    this.setState({addModalVisible: visible});
  }

  editModalVisible(visible) {
    this.setState({editModalVisible: visible});
  }

  addToMenu() {
    let { db } = this.state;
    let item = { food: this.state.itemName, price: this.state.itemPrice};
    if (item.food !== '' && item.price !== '') {
      let data = db.concat(item);
      // console.log(data);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ dataSource: ds.cloneWithRows(data), db: data, itemName: "", itemPrice: "" });
      this.setModalVisible(false);
    }
  }

  render() {
    return (
      <View style= {styles.container}>
      {/*  Edit menu Modal*/}
      <Modal
        animationType={"fade"}
        transparent={false}
        visible={this.state.editModalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <View style={{marginTop: 22, alignSelf: 'center'}}>
        <View style={{marginTop: 50}}>
          <Text style={{alignSelf:'center'}}>EDIT ITEM</Text>
          <TextInput
            onChangeText={(text) => this.setState({editItem: text})}
            style={textBox}
            placeholder="ITEM NAME"
            value={this.state.editItem} />
          <TextInput
            onChangeText={(text) => this.setState({editPrice: text})}
            style={textBox}
            keyboardType="numeric"
            placeholder="PRICE"
            value={this.state.editPrice} />
        </View>
          <View style={modalClose}>
            <TouchableHighlight
              onPress={this.updateToMenu}
              style={saveButton}
            >
              <Text style={{alignSelf: 'center',color:'white'}}>Update</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={closeButton}
              onPress={() => {
                this.editModalVisible(false)
              }}
            >
              <Text style={{alignSelf: 'center', color: 'white'}}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


      {/*  Add to Menu modal*/}
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
              placeholder="ITEM NAME"
              required />
            <TextInput
              onChangeText={(text) => this.setState({itemPrice: text})}
              style={textBox}
              keyboardType="numeric"
              placeholder="PRICE"
              required />
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
                <Text style={{alignSelf: 'center',color:'white'}}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={{paddingTop: 60}}>
          <TouchableHighlight
            onPress={this._onAddPressed}
            style={Addbutton}
          >
          <Text style={{textAlign:'center',color: 'white'}}>Add Item</Text>
          </TouchableHighlight>
        </View>
      <ListView
        enableEmptySections = {true}
        style = {listStyle}
        dataSource = {this.state.dataSource}
        renderRow = {(rowData) => { return (
            // <View style={itemStyle}>
              /* <Image
                style={{width: 90, height: 90}}
                source={{uri: rowData.imgurl}}
              /> */
              <View style={infoStyle}>
                <View style={{width: 210}}>
                  <Text style={{paddingLeft:5,color:'white', fontSize: 22}}>{rowData.food}</Text>
                  <Text style={priceStyle}>Price: ${rowData.price}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
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
            // </View>
          )}
        }
      />
      <View style={{flexDirection: "row"}}>
        <TouchableHighlight
          style={savebutton}
          onPress={this._onSavePressed}
        >
        <Text style={{textAlign:'center',color: 'white'}}>Save Edits</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={cancelbutton}
          onPress={() => {
            NavigationActions.pop(0);
          }}
        >
        <Text style={{textAlign:'center',color: 'white'}}>Discard</Text>
        </TouchableHighlight>
      </View>

      </View>
    )
  }
}

const priceStyle = {
  paddingLeft:5,
  color:'white',
  fontSize: 20,
  fontStyle: 'italic',
  fontWeight: 'bold'
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
  marginTop: 15,
  marginBottom: 15,
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

const savebutton = {
  margin: 15,
  padding: 5,
  width: 100,
  backgroundColor: '#13ce66',
  borderStyle: 'solid',
  borderColor: '#13ce66',
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

const cancelbutton = {
  margin: 15,
  padding: 5,
  width: 100,
  backgroundColor: '#b85942',
  borderStyle: 'solid',
  borderColor: '#b85942',
  borderWidth: 2,
  borderRadius: 5,
  elevation: 10,
}

const Addbutton = {
  margin: 15,
  padding: 2,
  width: 100,
  // backgroundColor: '#13ce66',
  borderStyle: 'solid',
  borderColor: '#e7e7e7',
  borderWidth: 2,
  borderRadius: 5,
  elevation: 10,
}

const deletebutton = {
  margin: 5,
  marginTop: 15,
  marginBottom: 15,
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
  paddingTop: 0,
  width: 340,
}

const itemStyle = {
  height: 100,
  padding: 5,
  flexDirection: 'row',
  // flexWrap: 'wrap',
}

const infoStyle = {
  margin: 5,
  flexDirection: 'row',
  borderColor: '#e7e7e7',
  borderStyle: 'solid',
  borderBottomWidth: 1,
  paddingBottom: 10,
}

export default MenuEdit;
