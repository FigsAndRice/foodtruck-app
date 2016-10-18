import React, { Component } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class Example extends Component{
  render() {
    return (
      <View style={styleTop}>
      <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          fetchDetails={true}
          query={{
            key: '',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log('details:', details.geometry.location)
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth:0
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          currentLocation={true}
        />
      </View>
    )
  }
};

const styleTop = {
  marginTop: 100
}
