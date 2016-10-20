import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, MapView, Text } from 'react-native';

import { getTrucks } from '../../Redux/Actions/LocationActions';

class IosMaps extends Component{
  constructor(props) {
      super(props);
      this.displayName = 'Maps';
      let { latitude, longitude } = this.props;

      this.state = {
        region: {
          latitude,
          longitude,
          trucks: []
        }
      }
      this._press = this._press.bind(this);
  }

  componentDidMount() {
    let { latitude, longitude } = this.props;
    let maxLatitude = latitude + .05;
    let minLatitude = latitude - .05;
    let maxLongitude = longitude + .05;
    let minLongitude = longitude - .05;
    let coordsObj = { maxLatitude, minLatitude, maxLongitude, minLongitude };
    // getTrucks(coordsObj);
    const { dispatch } = this.props;
    dispatch({type: 'GET_TRUCKS', payload: coordsObj })
  }

  _press(annotation){
    //this is where the truck info comes up at the bottom
    //pass a function in from the results page to display res info
    this.props.onPress(annotation);
  }
  render(){
    let mrks;

    if(!this.props.trucks){
      mrks = []
    } else {
      mrks = this.props.trucks.map(marker => {
        let { lat, lng, name, _id } = marker;
        let pin = {
          latitude: lat,
          longitude: lng,
          title: name,
          id: _id.$oid
        }
          return pin
      })
    }

    return(
      <View>
        <MapView
        style={{ height: 350, marginTop: 80, margin: 20 }}
        showsUserLocation={true}
        region={this.state.region}
        maxDelta={0.2}
        minDelta={0.01}
        onAnnotationPress={this._press}
        annotations={mrks}
        zoomEnabled={true}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trucks: state.trucks
  }
}

export default connect(mapStateToProps, null)(IosMaps);
