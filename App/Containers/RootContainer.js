import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './Styles/RootContainerStyle';
class RootContainer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RootContainer';
    }
    render() {
        return 
        	<View style={styles.applicationView}>
		        <StatusBar barStyle='light-content' /> 
      		</View>
    }
}

export default RootContainer;
