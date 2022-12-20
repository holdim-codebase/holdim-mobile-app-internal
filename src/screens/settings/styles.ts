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
})

export default styles
