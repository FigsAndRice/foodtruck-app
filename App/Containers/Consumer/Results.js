import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, StyleSheet, MapView } from 'react-native';
import RoundedButton from '../Components/RoundedButton';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import styles from '../Styles/RootContainerStyle';


class Results extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'RootContainer';

        this.state = {
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
            style={{height: 250, marginTop: 80, margin: 20}}
            showsUserLocation={true}
            followUserLocation={true}
            // initialRegion={this.state.region}
            // onRegionChane={this.onRegionChange}
          />
          <RoundedButton onPress={NavigationActions.results}>Search</RoundedButton>
    		</View>
      )
    }
}

export default Results;
