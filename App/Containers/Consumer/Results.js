import React, { Component } from 'react';
import { Platform,  View, Text } from 'react-native';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import RoundedButton from '../Components/RoundedButton';
import IosMaps from './IosMaps';
import UserMenu from './UserMenu';

import styles from '../Styles/RootContainerStyle';

class Results extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'Results';
    }
    render() {
      let mapView;
      if(Platform.OS === 'ios'){
        mapView = <IosMaps />;
      } else {
        mapView = <View />;
      }
      return (
      	<View>
          {mapView}
          {/* <RoundedButton onPress={NavigationActions.results}>Search</RoundedButton> */}
          <UserMenu />
    		</View>
      )
    }
}

export default Results;
