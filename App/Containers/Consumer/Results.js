import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, StyleSheet, MapView } from 'react-native';
import RoundedButton from '../Components/RoundedButton';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import styles from '../Styles/RootContainerStyle';


class Results extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'Results';

        this.state = {
          initialPosition: 'unknown',
          lastPosition: 'unknown',
          region: {
            latitude: 39.299236,
            longitude: -76.609383
          }
        }
      this.onRegionChange = this.onRegionChange.bind(this);
    }
    componentDidMount() {
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
    onRegionChange(region) {
      this.setState({ region });
    }
    render() {
      let { coords } = this.state.lastPosition;
      let lat;
      let lng;

      if(!coords){
        lat = "";
        lng = "";
      } else {
        let { latitude, longitude } = coords;
        lat = latitude;
        lng = longitude;
      }
      return (
      	<View>
        <MapView
            style={{ height: 250, marginTop: 80, margin: 20 }}
            showsUserLocation={true}
            // followUserLocation={true}
            region={this.state.region}
            maxDelta={1}
            minDelta={0.01}
            // initialRegion={this.state.region}
            // onRegionChange={this.onRegionChange}
          />
          <Text>{lat}</Text>
          <Text>{lng}</Text>
          <RoundedButton onPress={NavigationActions.results}>Search</RoundedButton>
    		</View>
      )
    }
}

export default Results;
