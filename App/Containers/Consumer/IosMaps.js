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
      let { latitude, longitude } = this.props;
      this.state = {
        region: {
          latitude,
          longitude
        }
      }
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  _press(annotation){
    //this is where the truck info comes up at the bottom
    //pass a function in from the results page to display res info
    alert(annotation.title)
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
        // followUserLocation={true}
        region={this.state.region}
        maxDelta={0.2}
        minDelta={0.01}
        onAnnotationPress={this._press}
        // onRegionChange={this.onRegionChange}
        annotations={mrks}
        zoomEnabled={true}
        />
      </View>
    )
  }
}

// export default iosMaps;
