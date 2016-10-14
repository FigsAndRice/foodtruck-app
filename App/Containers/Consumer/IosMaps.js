import React, { Component } from 'react';
import { View, MapView } from 'react-native';

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
  _press(annotation){
    alert(annotation.title)
  }
  render(){
    let mrks = markers.map(marker => {
      let { latitude, longitude, title } = marker;
      marker.onClick = this._press.bind(null, title);
      return marker
    })
    return(
      <View>
        <MapView
        style={{ height: 250, marginTop: 80, margin: 20 }}
        // showsUserLocation={true}
        // followUserLocation={true}
        region={this.state.region}
        maxDelta={0.1}
        minDelta={0.01}
        onAnnotationPress={this._press}
        // initialRegion={this.state.region}
        // onRegionChange={this.onRegionChange}
        annotations={mrks}
        zoomEnabled={true}
        />
      </View>
    )
  }
}

// export default iosMaps;
