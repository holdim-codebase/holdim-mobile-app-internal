import {Platform, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {black, purple, white} from '../../constants/css'

const styles = StyleSheet.create({
  dyorWrapper: {
    paddingHorizontal: normalize(16),
  },
  dyorDescriptionWrapper: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dyorDescriptionEmoji: {
    fontSize: normalize(80),
    color: 'white',
  },
  dyorDescriptionTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(18),
    lineHeight: normalize(20),
    textAlign: 'center',
    paddingTop: normalize(16),
  },
  dyorText: {
    maxWidth: normalize(300),
    color: '#C4C8C9',
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(18),
    textAlign: 'center',
    paddingTop: normalize(16),
    paddingBottom: normalize(30),
  },
  dyorFooter: {
    width: '100%',
    height: '20%',
  },

  dyorCheckedWrapper: {
    flexDirection: 'row',
  },
})

export default styles
