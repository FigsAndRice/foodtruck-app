import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

import GreenButton from '../Components/GreenButton';
import YellowButton from '../Components/YellowButton';

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

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password1: '',
      password2: '',
      cuisine: ''
    }

    this.pick = this.pick.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
  }

  pick(cuisine) {
    this.setState({ cuisine });
  }

  cancel() {
    NavigationActions.profile();
  }

  save() {
    window.alert(this.state.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={style.text}>Edit Profile</Text>
        <View style={styles.inline}>
          <Text>Name: </Text>
          <TextInput
            style={styles.textBox}
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
            placeholder="Truck Name"
          />
        </View>
        <View style={styles.inline}>
          <Text>Password: </Text>
          <TextInput
            style={styles.textBox}
            value={this.state.password1}
            onChangeText={(text) => this.setState({password1: text})}
            placeholder="Password"
          />
        </View>
        <View style={styles.inline}>
          <Text>Repeat Password:</Text>
          <TextInput
            style={styles.textBox}
            value={this.state.password2}
            onChangeText={(text) => this.setState({password2: text})}
            placeholder="Password"
          />
        </View>
        <View style={styles.inline}>
          <Text>Cuisine:</Text>
          <Picker
            style= {style.picker}
            selectedValue= {this.state.cuisine}
            onValueChange= {this.pick}>
            <Picker.Item label="Cuisine Type" value="none" />
            <Picker.Item label="African" value="african" />
            <Picker.Item label="American" value="american" />
            <Picker.Item label="Asian" value="asian" />
            <Picker.Item label="French" value="french" />
            <Picker.Item label="Italian" value="italian" />
            <Picker.Item label="Indian" value="indian" />
            <Picker.Item label="Mexican" value="mexican" />
            <Picker.Item label="Latin American" value="latin-american" />
            <Picker.Item label="Middle Eastern" value="middle-eastern" />
            <Picker.Item label="Fusion" value="fusion" />
          </Picker>
        </View>
        <View style={styles.inline}>
          <YellowButton text="Cancel" onPress={this.cancel} />
          <GreenButton text="Save" onPress={this.save} />
        </View>
      </View>
    )
  }
}

export default EditProfile;
