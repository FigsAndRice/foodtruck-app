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
          region: {
            latitude: 39.299236,
            longitude: -76.609383
          }
        }
      this.onRegionChange = this.onRegionChange.bind(this);
    }
    onRegionChange(region) {
      this.setState({ region });
    }
    render() {
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
          <RoundedButton onPress={NavigationActions.results}>Search</RoundedButton>
    		</View>
      )
    }
}

export default Results;
