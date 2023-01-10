import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {statusBarHeight} from '../../constants/css'

const styles = StyleSheet.create({
  loadingWrapperFullScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: '80%',
  },
  settingsWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  settingsStatusBar: {
    height: statusBarHeight,
  },
  settingsStatusBarWrapper: {
    height: normalize(52),
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  settingsStatusBarArrow: {
    paddingLeft: normalize(16),
    paddingRight: normalize(130.5),
  },
  settingsStatusBarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(52),
  },
  settingWrapper: {
    flexDirection: 'row',
  },
  settingTextWrapper: {
    borderBottomColor: 'rgba(61, 46, 103, 1)',
    borderBottomWidth: 1,
    height: normalize(70),
    textAlign: 'center',
    width: '100%',
  },
  settingText: {
    fontWeight: '500',
    paddingVertical: normalize(25),
    fontSize: normalize(16),
    lineHeight: normalize(20),
    color: 'white',
  },
  settingIcon: {
    paddingLeft: normalize(16),
    paddingRight: normalize(10),
    paddingBottom: normalize(21),
    paddingTop: normalize(25),
  },
  poapWrapper: {
    paddingTop: normalize(30),
    paddingHorizontal: normalize(16),
    alignItems: 'center',
  },
  poapTextImgWrapper: {
    paddingVertical: normalize(12.5),
    paddingHorizontal: normalize(40),
  },
  poapButton: {
    backgroundColor: 'rgba(190, 170, 245, 1)',
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: 'rgba(253, 234, 239, 1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  poapText: {
    fontSize: normalize(20),
    lineHeight: normalize(35),
    fontWeight: '500',
    color: '#47337D',
    paddingLeft: normalize(8),
    paddingVertical: normalize(12.5),
    paddingRight: normalize(40),
  },
  poapSvg: {
    paddingVertical: normalize(8),
    paddingLeft: normalize(40),
  },
  textInfoWrapper: {
    marginHorizontal: normalize(16.5),
  },
})

export default styles
