import {Platform, StatusBar, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const OS_IOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  stateScreenWrapper: {
    flex: 1,
    height: OS_IOS ? normalize(44) : StatusBar.currentHeight,
    paddingTop: normalize(194),
    paddingHorizontal: normalize(16.5),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stateScreenContent: {alignItems: 'center'},
  emoji: {
    fontSize: normalize(55),
    color: 'white',
  },
  stateScreenTitle: {
    color: '#BEAAF5',
    lineHeight: normalize(20),
    fontWeight: '700',
    fontSize: normalize(18),
    justifyContent: 'center',
    paddingTop: normalize(16),
  },
  stateScreenDescription: {
    color: '#C4C8C9',
    lineHeight: normalize(18),
    fontWeight: '400',
    fontSize: normalize(14),
    textAlign: 'center',
    paddingTop: normalize(10),
  },
  stateScreenCloseBtnWrapper: {
    flexDirection: 'row',
    paddingBottom: OS_IOS ? normalize(84) : normalize(50),
  },
  stateScreenCloseBtn: {
    flex: 1,
    height: normalize(52),
    borderRadius: 5,
    backgroundColor: '#3D2E67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateScreenCloseTitle: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: 'white',
  },
})

export default styles
