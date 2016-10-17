import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, Text, TextInput, StyleSheet } from 'react-native';
import { Actions as NavigationActions }  from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import RoundedButton from './Components/RoundedButton';
import YellowButton from './Components/YellowButton';
import Example from './GoogleAutoComplete';
import { setLocation } from '../Redux/Actions/LocationActions'

import styles from './Styles/RootContainerStyle';

const buttonStyle = {
  backgroundColor: 'red',
  padding: 10
}
const inputStyle = {
  width: 250
}

class RootContainer extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'RootContainer';

        this.state = {
          search: '',
          location: ''
        }
    }
    render() {
      return (
      	<View style={styles.container} className="container">
          <Text style={styles.text}>Fook</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={(text) => this.setState({search: text})}
            value={this.state.search}
            autoCorrect={false}
            placeholder="Search"
          />
          <View style={inputStyle}>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            fetchDetails={true}
            query={{
              key: 'AIzaSyD82s2ReoEKzyJHzmrJPjf3ogPGgF5s1yE',
              language: 'en', // language of the results
              types: '(cities)', // default: 'geocode'
            }}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            this.setState({location: details.geometry.location})
            this.props.setLocation(details.geometry.location.lat, details.geometry.location.lng)
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
          <RoundedButton onPress={NavigationActions.results}>Search</RoundedButton>
          <View style={styles.inline}>
            <YellowButton text="register" onPress={NavigationActions.register} />
            <YellowButton text="login" onPress={NavigationActions.login} />
          </View>
    		</View>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (lat, lng) => { dispatch(setLocation(lat, lng)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
