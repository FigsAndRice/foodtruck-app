'use strict'

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../Themes/'

export default StyleSheet.create({
  redButton: {
    height: 45,
    borderRadius: 20,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    padding: 10,
    backgroundColor: '#ff5722',
    justifyContent: 'center'
  },
  yellowButton: {
    height: 45,
    borderRadius: 20,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    padding: 10,
    backgroundColor: '#ffeb3b',
    justifyContent: 'center'
  },
  greenButton: {
    height: 45,
    borderRadius: 20,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    padding: 10,
    backgroundColor: '#13ce66',
    justifyContent: 'center'
  },
  button: {
    height: 45,
    borderRadius: 20,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    padding: 10,
    backgroundColor: Colors.frost,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
