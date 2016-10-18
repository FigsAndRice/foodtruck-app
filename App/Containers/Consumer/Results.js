import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform,  View, Text } from 'react-native';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import RoundedButton from '../Components/RoundedButton';
import IosMaps from './IosMaps';
import TruckInfo from './TruckInfo';

import styles from '../Styles/RootContainerStyle';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
          truck: ''
        }
        this.displayName = 'Results';
      this._onMarkerPress = this._onMarkerPress.bind(this);
    }
    _onMarkerPress(truck){
      this.setState({truck})
    }
    render() {
      let mapView;
      let { lat, lng } = this.props.location;
      
      if(Platform.OS === 'ios'){
        mapView = <IosMaps onPress={this._onMarkerPress} latitude={lat} longitude={lng} />;
      } else {
        mapView = <View />;
      }
      return (
      	<View>
          {mapView}
          <TruckInfo truck={this.state.truck}/>
    		</View>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setLocation: (lat, lng) => { dispatch(setLocation(lat, lng)) }
  }
}

export default connect(mapStateToProps, null)(Results);
