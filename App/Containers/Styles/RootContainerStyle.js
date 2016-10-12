import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#009688'
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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
    color: '#d4f8f5',
    fontSize: 100
  },
  textBox: {
    height: 40,
    width: 250,
    alignSelf: 'center',
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
