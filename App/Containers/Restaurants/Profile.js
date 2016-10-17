import React, { Component } from 'react';
import { View, Text, TextInput, Picker, AsyncStorage } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

import YellowButton from '../Components/YellowButton';
import RedButton from '../Components/RedButton';
import GreenButton from '../Components/GreenButton';
import RoundedButton from '../Components/RoundedButton';
import { editProfile, logout } from '../../Redux/Actions/UserActions';

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
  },
  timer: {
    fontSize: 20,
    color: '#d4f8f5',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);

    // GET TRUE STATE OF OPEN / HOURS FROM BACKEND
    this.state = {
      id: '',
      name: '',
      email: '',
      cuisine: '',
      isOpen: false,
      hours: 0,
      lat: '',
      lng: '',
      menu: [],
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      region: {
        latitude: 39.299236,
        longitude: -76.609383
      },
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0
    }

    this.pick = this.pick.bind(this);
    this.openTruck = this.openTruck.bind(this);
    this.logoutProfile = this.logoutProfile.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (err, result) => {
      let user = JSON.parse(result);
      this.setState({
        id: user.id,
        name: user.name,
        email: user.email,
        cuisine: user.cuisine,
        isOpen: user.isOpen,
        hours: user.hours,
        lat: user.lat,
        lng: user.lng,
        menu: user.menu
      });
      if (user.isOpen) {
        this.setState({
          hoursLeft: Math.floor(((user.hours - Date.now()) / 1000 / 60 / 60) % 60),
          minutesLeft: Math.floor(((user.hours - Date.now()) / 1000 / 60) % 60),
          secondsLeft: Math.floor(((user.hours - Date.now()) / 1000) % 60)
        });
        this.timer = window.setInterval(this.tick, 1000);
      }
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
    window.clearInterval(this.timer);
  }

  pick(hours) {
    this.setState({hours: parseInt(hours)});
  }

  openTruck() {
    let { id, name, email, cuisine, isOpen, hours, lat, lng, menu } = this.state;
    let putObj = { id, name, email, cuisine, isOpen, hours, lat, lng, menu };
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
        hours: 0
      });
      putObj.isOpen = false;
      putObj.hours = 0;
      window.clearInterval(this.timer);
    } else {
      if (this.state.hours <= 0) {
        alert('Please specify hours open.');
        return;
      }
      putObj.isOpen = true;
      putObj.hours = Date.now() + this.state.hours*60*60*1000;
      this.setState({
        isOpen: true,
        hoursLeft: Math.floor(((putObj.hours - Date.now()) / 1000 / 60 / 60) % 60),
        minutesLeft: Math.floor(((putObj.hours - Date.now()) / 1000 / 60) % 60),
        secondsLeft: Math.floor(((putObj.hours - Date.now()) / 1000) % 60)
      });
      this.timer = window.setInterval(this.tick, 1000);
    }
    editProfile(this.state.id, putObj);
    AsyncStorage.setItem('user', JSON.stringify(putObj), () => {
      AsyncStorage.mergeItem('user', JSON.stringify(putObj));
    });
  }

  logoutProfile() {
    logout();
  }

  tick() {
    if (this.state.isOpen) {
      if (this.state.minutesLeft === 0) {
        this.setState({
          minutesLeft: 60,
          hoursLeft: this.state.hoursLeft - 1
        });
      }
      if (this.state.secondsLeft === 0) {
        this.setState({
          secondsLeft: 60,
          minutesLeft: this.state.minutesLeft - 1
        });
      }
      this.setState({
        secondsLeft: this.state.secondsLeft - 1
      });
    } else {
      this.setState({
        hoursLeft: this.state.hoursLeft,
        minutesLeft: this.state.minutesLeft,
        secondsLeft: this.state.secondsLeft
      });
    }
  }

  render() {
    let hours = [1,2,3,4,5,6,7,8,9,10,11,12];
    let hourItems = hours.map(hour => {
      return (
        <Picker.Item key={hour} label={hour.toString()} value={hour.toString()} />
      )
    })

    //<Text style={style.timer}>{Math.floor((timeLeft / 1000 / 60 / 60) % 60) + ':' + Math.floor((timeLeft / 1000 / 60) % 60) + ' until closing'}</Text>
    let openButton;
    if (this.state.isOpen === true) {
      let { timeLeft } = this.state;
      openButton = (
        <View>
          <Text style={style.timer}>{`${String('0' + this.state.hoursLeft).slice(-2)}:${String('0' + this.state.minutesLeft).slice(-2)}:${String('0' + this.state.secondsLeft).slice(-2)} until closing.`}</Text>
          <RedButton text="Close" onPress={this.openTruck} />
        </View>
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
          <GreenButton text="Open" onPress={this.openTruck} />
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
