import React, { Component } from 'react';
import { Platform,  View, StatusBar, Text, TextInput, StyleSheet, MapView } from 'react-native';
import RoundedButton from '../Components/RoundedButton';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import styles from '../Styles/RootContainerStyle';

let markers = [
  {
    latitude: 39.299236,
    longitude: -76.609383,
    title: 'Center',
    subtitle: '1234 Foo Drive'
  },
  {
    latitude: 39.249236,
    longitude: -76.609383,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  },
  {
    latitude: 39.349236,
    longitude: -76.609383,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  },
  {
    latitude: 39.299236,
    longitude: -76.659383,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  },
  {
    latitude: 39.299236,
    longitude: -76.559383,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  },
  {
    latitude: 39.298336,
    longitude: -76.568383,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  }
]

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
      let Operation;
      if(Platform.OS === 'ios'){
        Operation = 'apple';
      } else {
        Operation = 'android';
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
            annotations={markers}
            zoomEnabled={true}
          />
          <Text>{Operation}</Text>
          <RoundedButton onPress={NavigationActions.results}>Search</RoundedButton>
    		</View>
      )
    }
}

export default Results;
