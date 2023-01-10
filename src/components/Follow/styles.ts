import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {purple, white} from '../../constants/css'

const styles = StyleSheet.create({
  followBackground: {
    backgroundColor: purple,
    borderRadius: normalize(5),
    flexDirection: 'row',
  },
  followedBackground: {
    backgroundColor: '#756799',
    borderRadius: normalize(5),
    flexDirection: 'row',
  },
  followText: {
    color: white,
    fontSize: normalize(12),
    fontWeight: '700',
    lineHeight: normalize(20),
    alignItems: 'center',
    paddingHorizontal: normalize(5),
    paddingVertical: normalize(4),
  },
  svg: {
    paddingLeft: normalize(7),
    paddingRight: normalize(2),
    paddingVertical: normalize(9),
  },
})

export default styles
