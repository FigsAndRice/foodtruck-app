import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

import YellowButton from '../Components/YellowButton';
import RedButton from '../Components/RedButton';
import GreenButton from '../Components/GreenButton';

import styles from '../Styles/RootContainerStyle';

const style = {
  picker: {
    width: 200,
  },
  text: {
    fontSize: 50,
    color: '#d4f8f5'
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      hours: 0
    }

    this.edit = this.edit.bind(this);
    this.pick = this.pick.bind(this);
    this.open = this.open.bind(this);
  }

  edit() {
    NavigationActions.editProfile;
  }

  pick(hours) {
    this.setState({hours: parseInt(hours)});
  }

  open() {
    if (this.state.hours > 0) {
      if (this.state.open) {
        this.setState({open: false});
      } else {
        this.setState({open: true});
        window.alert(Date.now() + this.state.hours*60*60*1000);
      }
    }
  }

  render() {
    let openButton;
    if (this.state.open) {
      openButton = (
        <RedButton text="Close" onPress={this.open} />
      )
    } else {
      openButton = (
        <View>
          <Picker
            style= {style.picker}
            selectedValue= {this.state.hours.toString()}
            onValueChange= {this.pick}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
          </Picker>
          <GreenButton text="Open" onPress={this.open} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
        <YellowButton text="Edit Info" onPress={this.edit} />
        {openButton}
      </View>
    )
  }
}

export default Profile;
