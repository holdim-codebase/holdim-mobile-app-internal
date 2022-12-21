import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {white} from '../../constants/css'

export const markDownStyles = StyleSheet.create({
  body: {
    color: '#D7D7D7',
    fontSize: normalize(16),
    fontWeight: '400',
    lineHeight: normalize(22),
    fontFamily: 'System',
  },
  text: {
    fontSize: normalize(16),
  },
  heading1: {
    color: white,
    fontWeight: '700',
  },
  heading2: {
    color: white,
    fontWeight: '700',
  },
  heading3: {
    color: white,
    fontWeight: '700',
  },
  bullet_list: {paddingBottom: normalize(16)},
})
