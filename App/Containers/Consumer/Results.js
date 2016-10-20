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
      let { dispatch } = this.props;
      let decodeTruck = decodeURIComponent(truck.id);
      let passTruck = this.props.trucks.filter(truck => truck._id.$oid === decodeTruck ? truck : null)
      console.log('passTruck[0].hours:', passTruck[0].hours)
      dispatch({type: 'SET_HOURS', payload: passTruck[0].hours })
      this.setState({ truck: passTruck[0] });
    }
    render() {
      let mapView;
      let truckView;
      let { lat, lng } = this.props.location;

      if(Platform.OS === 'ios'){
        mapView = <IosMaps onPress={this._onMarkerPress} latitude={lat} longitude={lng} />;
      } else {
        mapView = <View />;
      }
      if(!this.state.truck){
        truckView = <View />
      } else {
        truckView = <TruckInfo hours={this.state.hours} truck={this.state.truck}/>
      }
      return (
      	<View>
          {mapView}
          {truckView}
    		</View>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    trucks: state.trucks
  }
}

export default connect(mapStateToProps, null)(Results);
