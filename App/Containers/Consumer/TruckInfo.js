import React, { Component } from 'react';
import { Image, View, Text, TextInput, TouchableHighlight, Linking } from 'react-native';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import Countdown from '../Components/Countdown';
import YellowButton from '../Components/YellowButton';
import GreenButton from '../Components/GreenButton';
import styles from '../Styles/RootContainerStyle';

class TruckInfo extends Component {
  constructor(props) {
    super(props);

    this._onMenuClicked = this._onMenuClicked.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
  }

  _onMenuClicked(){
    alert('OPEN MENU');
  }

  navigateTo() {
    Linking.openURL(`https://maps.google.com/?q=${this.props.coords.lat},${this.props.coords.lng}`).catch(err => {
      console.error(err);
    })
  }

  render() {
   let { truck } = this.props;
    return (
      <View style={result}>
        <View style={itemStyle}>
          <Image
          style={{width: 125, height: 125}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
            <View style={infoStyle}>
              <Text style={truckName}>{truck.name.toUpperCase()}</Text>
              <Countdown />
              <YellowButton onPress={this._onMenuClicked}> M e n u </YellowButton>
              <GreenButton onPress={this.navigateTo}> N a v i g a t e </GreenButton>
            </View>
        </View>
      </View>
    );
  }
}

const result = {
  backgroundColor: '#BDBDBD'
}

const truckName = {
  fontSize: 20
}

const infoStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 5,
  marginLeft: 10
}
const itemStyle = {
  height: 100,
  margin: 10,
  padding: 10,
  flexDirection: 'row',
  flexWrap: 'wrap',
}

export default TruckInfo;
