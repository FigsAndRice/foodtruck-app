import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

import GreenButton from '../Components/GreenButton';
import YellowButton from '../Components/YellowButton';
import RedButton from '../Components/YellowButton';

import styles from '../Styles/RootContainerStyle';

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
    // need to change so make all fields required
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
          value={this.state.password1}
          onChangeText={(text) => this.setState({password1: text})}
          placeholder="PASSWORD"
        />
        <TextInput
          style={styles.textBox}
          value={this.state.password2}
          onChangeText={(text) => this.setState({password2: text})}
          placeholder="RE-PASSWORD"
        />
        <YellowButton text="Edit Menu" onPress={NavigationActions.menuEdit} />
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
        <View style={styles.inline}>
          <RedButton text="Cancel" onPress={this.cancel} />
          <GreenButton text="Save" onPress={this.save} />
        </View>
      </View>
    )
  }
}

export default EditProfile;
