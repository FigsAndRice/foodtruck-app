import React, { Component } from 'react';
import { View, Text, TextInput, Picker, AsyncStorage } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import YellowButton from '../Components/YellowButton';
import RedButton from '../Components/RedButton';
import GreenButton from '../Components/GreenButton';
import RoundedButton from '../Components/RoundedButton';
import Countdown from '../Components/Countdown';
import { editProfile, logout, updateOpen } from '../../Redux/Actions/UserActions';

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
      lastPosition: 'unknown'
    }

    this.pick = this.pick.bind(this);
    this.openTruck = this.openTruck.bind(this);
    this.logoutProfile = this.logoutProfile.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (err, result) => {
      let user = JSON.parse(result);
      this.setState({
        id: user._id.$oid,
        name: user.name,
        email: user.email,
        cuisine: user.cuisine,
        isOpen: user.isOpen,
        hours: user.hours,
        lat: user.lat,
        lng: user.lng,
        menu: user.menu
      });
      if (user.hours <= Date.now()) {
        this.setState({isOpen: false, hours: 0})
      }
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  pick(hours) {
    this.setState({hours: parseInt(hours)});
  }

  openTruck() {
    let { id, name, email, cuisine, isOpen, hours, lat, lng, menu } = this.state;
    let _id = { $oid: id };
    let putObj = { _id, name, email, cuisine, isOpen, hours, lat, lng, menu };
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
      this.setState({
        lastPosition,
        lat: latitude,
        lng: longitude
      });
      putObj.lat = latitude;
      putObj.lng = longitude;
    });
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
        hours: 0,
        lat: '',
        lng: ''
      });
      putObj.isOpen = false;
      putObj.hours = 0;
      this.props.dispatch({type: 'SET_HOURS', payload: 0});
    } else {
      // if (this.state.hours === 0) {
      //   alert('Please specify hours open.');
      //   return;
      // }
      putObj.isOpen = true;
      putObj.hours = Date.now() + this.state.hours*60*60*1000;
      this.setState({
        isOpen: true,
        hours: putObj.hours
      });
      this.props.dispatch({type: 'SET_HOURS', payload: Date.now() + this.state.hours*60*60*1000});
    }

    AsyncStorage.setItem('user', JSON.stringify(putObj), () => {
      AsyncStorage.mergeItem('user', JSON.stringify(putObj));
    });
    delete putObj._id;
    delete putObj.email;
    editProfile(this.state.id, putObj);
  }

  logoutProfile() {
    logout();
  }

  render() {
    let hours = [1,2,3,4,5,6,7,8,9,10,11,12];
    let hourItems = hours.map(hour => {
      return (
        <Picker.Item key={hour} label={hour.toString()} value={hour} />
      )
    })

    let openButton;
    if (this.props.hours*60*60*1000 > Date.now()) {
      openButton = (
        <View>
          <Countdown />
          <RedButton text="Close" onPress={this.openTruck} />
        </View>
      )
    } else {
      openButton = (
        <View>
          <Picker
            style= {style.picker}
            selectedValue= {this.state.hours}
            onValueChange= {this.pick}>
            <Picker.Item label="Hours" value={0} />
            {hourItems}
          </Picker>
          <View>
            <GreenButton text="Open" onPress={this.openTruck} />
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.inline}>
          <YellowButton text="Edit Info" onPress={NavigationActions.editProfile} />
          <RoundedButton text="Logout" onPress={this.logoutProfile} />
        </View>
        {openButton}
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    hours: state.hours
  }
}

mapDispatchToProps = (dispatch) => {
  return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
