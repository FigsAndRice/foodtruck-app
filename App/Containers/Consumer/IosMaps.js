import React, { Component } from 'react';
import { View, MapView } from 'react-native';

import { getTrucks } from '../../Redux/Actions/LocationActions';

let markers = [
  {
    latitude: 39.299236,
    longitude: -76.609383,
    title: 'Center',
    subtitle: '1234 Foo Drive',
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

export default class IosMaps extends Component{
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
    getTrucks(coordsObj);
  }

  _press(annotation){
    //this is where the truck info comes up at the bottom
    //pass a function in from the results page to display res info

    this.props.onPress(annotation);
  }
  render(){
    let mrks = markers.map(marker => {
      let { latitude, longitude, title } = marker;
      return marker
    })
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
