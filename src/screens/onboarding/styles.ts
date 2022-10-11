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
    fontSize: normalize(38),
    fontFamily: 'Ubuntu-Bold',
    fontWeight: 'bold',
  },
  onboardingSubtitle: {
    color: purple,
    fontSize: normalize(38),
    fontFamily: 'Ubuntu-Bold',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  onboardingVerticalLine: {
    color: white,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu-Bold',
    fontSize: normalize(35),
  },
  btnNextSkipWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  btnNext: {
    flex: 1,
    height: normalize(52),
    width: normalize(81),
    borderRadius: 5,
    backgroundColor: purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrevious: {
    flex: 1,
    height: normalize(52),
    width: normalize(52),
    marginRight: normalize(12),
    borderRadius: 5,
    backgroundColor: purple,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#8463DF',
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
    fontFamily: 'Ubuntu-Bold',
    fontSize: normalize(14),
    color: 'white',
  },
})

export default styles
