import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {statusBarHeight} from '../../../../constants/css'

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
  notificationsManagementWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  notificationsManagementStatusBar: {
    height: statusBarHeight,
  },
  notificationsManagementStatusBarWrapper: {
    height: normalize(56),
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  notificationsManagementStatusBarArrow: {
    paddingLeft: normalize(16),
    paddingRight: normalize(115),
  },
  notificationsManagementStatusBarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(52),
  },
  notificationsManagementContentWrapper: {
    paddingHorizontal: normalize(8),
    flexDirection: 'column',
  },
  rowsWrapper: {
    flexDirection: 'row',
  },
  rowWrapper: {
    borderBottomColor: 'rgba(61, 46, 103, 1)',
    borderBottomWidth: 1,
    height: normalize(59),
    textAlign: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTextAndIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowTextWrapper: {
    flexDirection: 'row',
  },
  rowMainTitle: {
    fontWeight: '500',
    paddingTop: normalize(10),
    paddingBottom: normalize(3),
    fontSize: normalize(16),
    lineHeight: normalize(20),
    color: 'white',
  },
  rowMainTitleOnly: {
    fontWeight: '500',
    paddingVertical: normalize(19.5),
    fontSize: normalize(16),
    lineHeight: normalize(20),
    color: 'white',
  },
  rowTitle: {
    fontWeight: '500',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    color: 'white',
  },
  rowIcon: {
    paddingLeft: normalize(16),
    paddingRight: normalize(14),
    paddingTop: normalize(19),
  },
  switchWrapper: {
    paddingVertical: normalize(13.5),
  },
})

export default styles
