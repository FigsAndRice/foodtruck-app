import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Text } from 'react-native';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import RoundedButton from '../Components/RoundedButton';

import styles from '../Styles/RootContainerStyle';


class Results extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'Results';

        this.state = {
          initialPosition: 'unknown',
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
        let { latitude, longitude } = position.coords;
        let latitudeDelta = 0.0922;
        let longitudeDelta = 0.0421;
        let region = { latitude, longitude, latitudeDelta, longitudeDelta }
        this.setState({ region });
      });
    }
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
    onRegionChange(region) {
      this.setState({ region });
    }
    render() {

      return (

        <MapView
            // style={{ height: 250, marginTop: 80, margin: 20 }}
            // showsUserLocation={true}
            // followUserLocation={true}
            region={this.state.region}
            // maxDelta={1}
            // minDelta={0.01}
            // initialRegion={this.state.region}
            // onRegionChange={this.onRegionChange}
          />

      )
    }
}

export default Results;
