import React, { Component } from 'react';
import { View, Text, TextInput, Picker, AsyncStorage } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

import GreenButton from '../Components/GreenButton';
import YellowButton from '../Components/YellowButton';
import RedButton from '../Components/YellowButton';

import styles from '../Styles/RootContainerStyle';
import { getProfile, editProfile, updatePassword } from '../../Redux/Actions/UserActions';

const style = {
  picker: {
    width: 200,
  },
  heading: {
    fontSize: 50,
    color: '#d4f8f5'
  },
  text: {
    fontSize: 15,
    color: '#d4f8f5'
  }
}

class EditProfile extends Component {
  constructor(props) {
    super(props);

    // need to change so get real info from backend
    this.state = {
      id: '',
      name: '',
      email: '',
      oldPassword: '',
      password1: '',
      password2: '',
      cuisine: '',
      isOpen: false,
      hours: 0,
      lat: '',
      lng: '',
      menu: []
    }

    this.pick = this.pick.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (err, result) => {
      let user = JSON.parse(result);
      let { _id, name, email, cuisine, isOpen, hours, lat, lng, menu } = user;
      this.setState({ id: _id.$oid, name, email, cuisine, isOpen, hours, lat, lng, menu });
    })
  }

  pick(cuisine) {
    this.setState({ cuisine });
  }

  cancel() {
    NavigationActions.profile();
  }

  save() {
    if (!this.state.oldPassword) {
      alert('Please input old password.');
      return;
    }
    if (this.state.password1 !== this.state.password2) {
      alert("Passwords do not match.");
      return;
    }
    if (this.state.name && this.state.oldPassword && this.state.password1 && this.state.password2 && this.state.cuisine) {
      let { oldPassword, password1, id, name, email, cuisine, isOpen, hours, lat, lng, menu } = this.state;
      let _id = {$oid: id};
      let updateObj = { _id, name, email, cuisine, isOpen, hours, lat, lng, menu };
      AsyncStorage.setItem('user', JSON.stringify(updateObj), () => {
        AsyncStorage.mergeItem('user', JSON.stringify(updateObj));
      });
      delete updateObj._id;
      delete updateObj.email;
      editProfile(id, updateObj);
      let passwordObj = { old_pwd: oldPassword, new_pwd: password1, email };
      updatePassword(passwordObj);
      NavigationActions.profile();
    } else {
      alert("Please fill out all fields.");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textBox}
          value={this.state.name}
          onChangeText={(text) => this.setState({name: text})}
          placeholder="TRUCK NAME"
        />
        <TextInput
          style={styles.textBox}
          value={this.state.oldPassword}
          onChangeText={(text) => this.setState({oldPassword: text})}
          placeholder="OLD PASSWORD"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textBox}
          value={this.state.password1}
          onChangeText={(text) => this.setState({password1: text})}
          placeholder="PASSWORD"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textBox}
          value={this.state.password2}
          onChangeText={(text) => this.setState({password2: text})}
          placeholder="RE-PASSWORD"
          secureTextEntry={true}
        />
        <YellowButton text="Edit Menu" onPress={NavigationActions.menuEdit} />
        <Picker
          style= {style.picker}
          selectedValue= {this.state.cuisine}
          onValueChange= {this.pick}>
          <Picker.Item label="Cuisine Type" value="none" />
          <Picker.Item label="African" value="African" />
          <Picker.Item label="American" value="American" />
          <Picker.Item label="Asian" value="Asian" />
          <Picker.Item label="French" value="French" />
          <Picker.Item label="Italian" value="Italian" />
          <Picker.Item label="Indian" value="Indian" />
          <Picker.Item label="Mexican" value="Mexican" />
          <Picker.Item label="Latin American" value="Latin-American" />
          <Picker.Item label="Middle Eastern" value="Middle-Eastern" />
          <Picker.Item label="Fusion" value="Fusion" />
        </Picker>
        <View style={styles.inline}>
          <RedButton text="Cancel" onPress={this.cancel} />
          <GreenButton text="Save" onPress={this.save} />
        </View>
      </View>
    )
  }
}

export default EditProfile;
