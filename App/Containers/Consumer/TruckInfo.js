import React, { Component } from 'react';
import { Image, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { Actions as NavigationActions }  from 'react-native-router-flux';

import RoundedButton from '../Components/RoundedButton';
import styles from '../Styles/RootContainerStyle';

class TruckInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  _onMenuClicked(){

  }

  render() {
    return (
      <View>
        <View style={itemStyle}>
          <Image
          style={{width: 150, height: 150}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
            <View style={infoStyle}>
              <Text>Restaurant Name</Text>
              <Text>Restaurant Hours</Text>
              <RoundedButton onPress={NavigationActions.results}> M e n u </RoundedButton>
            </View>
        </View>
      </View>
    );
  }
}

const infoStyle = {
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
