import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#009688'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    margin: 10,
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  text: {
    color: 'white'
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#d4f8f5',
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20
  }
})
