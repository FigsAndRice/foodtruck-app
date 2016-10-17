import React, { Component } from 'react';
import { View, Text, TextInput, Picker, AsyncStorage } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

import YellowButton from '../Components/YellowButton';
import RedButton from '../Components/RedButton';
import GreenButton from '../Components/GreenButton';
import RoundedButton from '../Components/RoundedButton';
import { logout } from '../../Redux/Actions/UserActions';

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
    fontSize: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);

    // GET TRUE STATE OF OPEN / HOURS FROM BACKEND
    this.state = {
      open: false,
      hours: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      region: {
        latitude: 39.299236,
        longitude: -76.609383
      }
    }

    this.pick = this.pick.bind(this);
    this.open = this.open.bind(this);
    this.logoutProfile = this.logoutProfile.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (err, result) => {
      let user = JSON.parse(result);
      if (user.hours) {
        this.setState({hours: user.hours});
      }
      this.setState({open: user.isOpen});
    })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lastPosition = position;
      let { latitude, longitude } = position.coords;
      let region = { latitude, longitude }
      this.setState({lastPosition, region});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  pick(hours) {
    this.setState({hours: parseInt(hours)});
  }

  open() {
    if (parseInt(this.state.hours) > 0) {
      if (this.state.open) {
        this.setState({open: false});
      } else {
        this.setState({open: true});
        window.alert(Date.now() + this.state.hours*60*60*1000);
        // ADD LOGIC TO PUSH TO BACKEND HOURS STATE
      }
    }
  }

  logoutProfile() {
    logout();
  }

  // ON RENDER, GET RESTAURANT NAME AND WRITE: "WELCOME, NAME"
  render() {
    let hours = [1,2,3,4,5,6,7,8,9,10,11,12];
    let hourItems = hours.map(hour => {
      return (
        <Picker.Item key={hour} label={hour.toString()} value={hour.toString()} />
      )
    })

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
            <Picker.Item label="Hours" value="0" />
            {hourItems}
          </Picker>
          <GreenButton text="Open" onPress={this.open} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <YellowButton text="Edit Info" onPress={NavigationActions.editProfile} />
        <RoundedButton text="Logout" onPress={this.logoutProfile} />
        {openButton}
      </View>
    )
  }
}

export default Profile;
