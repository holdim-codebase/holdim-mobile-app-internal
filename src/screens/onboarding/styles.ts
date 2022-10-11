import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  onboardingWrapper: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: normalize(17),
    paddingVertical: normalize(92),
  },
  onboardingTitle: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: normalize(38),
  },
  onboardingSubtitle: {
    marginBottom: 10,
    color: '#8463DF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: normalize(38),
  },
  onboardingVerticalLine: {
    color: '#FFFFFF',
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
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrevious: {
    flex: 1,
    height: normalize(52),
    width: normalize(52),
    marginRight: normalize(12),
    borderRadius: 5,
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
