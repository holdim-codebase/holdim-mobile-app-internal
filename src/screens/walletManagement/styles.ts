import {Platform, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const OS_IOS = Platform.OS === 'ios'

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
  walletManagementWrapper: {
    flex: 1,
    height: OS_IOS ? normalize(44) : 0,
    flexDirection: 'column',
  },
  walletManagementStatusBar: {
    height: OS_IOS ? normalize(44) : 0,
  },
  walletManagementStatusBarWrapper: {
    height: normalize(52),
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  walletManagementStatusBarArrow: {
    paddingLeft: normalize(16),
    paddingRight: normalize(87.5),
  },
  walletManagementStatusBarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(52),
  },
  walletManagementContentWrapper: {
    paddingRight: normalize(16),
    flexDirection: 'column',
    height: '72%',
  },
  walletWrapper: {
    borderWidth: 1,
    borderRadius: normalize(10),
    borderColor: '#BEAAF5',
    padding: normalize(10),
    marginBottom: normalize(10),
    backgroundColor: 'black',
    marginLeft: normalize(16),
  },
  activeWalletWrapper: {
    borderWidth: 3,
    borderRadius: normalize(10),
    borderColor: '#8463DF',
    padding: normalize(10),
    marginBottom: normalize(10),
  },
  walletTopSectionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletImageAddressSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletImage: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: 20,
  },
  walletAddressTitle: {
    fontWeight: '500',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    color: 'white',
    paddingLeft: normalize(10),
  },
  walletAmount: {
    fontWeight: '500',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    color: '#8463DF',
  },
  walletSection: {
    paddingTop: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletPurpleText: {
    fontWeight: '500',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    color: '#A195C2',
  },
  walletWhiteSmallText: {
    fontWeight: '500',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    color: 'white',
  },
  walletSwipeBlockWrapper: {
    flexDirection: 'row',
    paddingLeft: normalize(5),
    marginBottom: normalize(10),
  },
  walletSwipeBlock: {
    backgroundColor: '#47337D',
    borderRadius: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: normalize(5),
    width: normalize(66),
  },
  walletSwipeBlockText: {
    fontWeight: '500',
    fontSize: normalize(12),
    lineHeight: normalize(20),
    color: 'white',
    paddingHorizontal: normalize(10),
    paddingTop: normalize(8),
  },
  addWalletBtnWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: OS_IOS ? normalize(85) : normalize(50),
    paddingTop: normalize(10),
    paddingHorizontal: normalize(16),
  },
  addWalletBtn: {
    flex: 1,
    height: normalize(52),
    borderRadius: 5,
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addWalletBtnTitle: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: 'white',
  },
})

export default styles
