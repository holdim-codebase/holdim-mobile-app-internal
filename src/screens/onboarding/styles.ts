import {Platform, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {black, purple, white} from '../../constants/css'

const styles = StyleSheet.create({
  onboardingWrapper: {
    flex: 1,
    backgroundColor: black,
    paddingHorizontal: normalize(17),
    paddingVertical: Platform.OS === 'ios' ? normalize(92) : normalize(66),
  },
  onboardingTitle: {
    color: white,
    fontSize: normalize(48),
    fontWeight: 'bold',
  },
  onboardingSubtitle: {
    color: purple,
    fontSize: normalize(48),
    fontWeight: 'bold',
  },
  onboardingVerticalLine: {
    color: white,
    fontSize: normalize(64),
    fontWeight: 'bold',
  },
  btnNextSkipWrapper: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  btnNext: {
    flex: 1,
    height: normalize(34),
    width: normalize(61),
    borderRadius: 5,
    backgroundColor: purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrevious: {
    flex: 1,
    height: normalize(34),
    width: normalize(34),
    marginRight: normalize(12),
    borderRadius: 5,
    backgroundColor: purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSkip: {
    flex: 1,
    height: normalize(34),
    width: normalize(61),
    borderRadius: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNextText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: 'white',
  },
})

export default styles
