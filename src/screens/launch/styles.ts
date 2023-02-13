import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {purple} from '../../constants/css'

const styles = StyleSheet.create({
  splashWrapper: {
    backgroundColor: purple,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashTextWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(8),
  },
  splashText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(12),
    lineHeight: normalize(20),
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(9),
  },
})

export default styles
