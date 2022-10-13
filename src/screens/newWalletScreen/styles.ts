import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {STATUSBAR_HEIGHT} from '../walletManagement/styles'

const styles = StyleSheet.create({
  newWalletWrapper: {
    flex: 1,
    height: STATUSBAR_HEIGHT,
  },
  newWalletStatusBar: {
    height: STATUSBAR_HEIGHT,
  },
  newWalletStatusBarWrapper: {
    height: normalize(52),
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  newWalletStatusBarArrow: {
    paddingLeft: normalize(16),
    paddingRight: normalize(117.5),
  },
  newWalletStatusBarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(52),
  },
  newWalletContentWrapper: {
    paddingHorizontal: normalize(16.5),
    paddingTop: normalize(28),
    width: '100%',
    height: '71%',
  },
  newWalletTitle: {
    color: '#A195C2',
    lineHeight: normalize(20),
    fontSize: normalize(14),
    fontWeight: '700',
  },
  newWalletTextInputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#2C2443',
    borderRadius: 5,
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(16),
    paddingTop: normalize(12),
    marginVertical: normalize(5),
    justifyContent: 'space-between',
  },
  newWalletTextInput: {
    fontSize: normalize(14),
    lineHeight: normalize(18),
    fontWeight: '400',
    color: 'white',
    width: '90%',
  },
  newWalletIncorrectWalletAddressInput: {
    borderColor: '#F32C2C',
    borderWidth: 1,
  },
  newWalletIncorrectWalletAddressText: {
    color: '#F32C2C',
  },
  newWalletClearBtn: {
    paddingLeft: normalize(10),
    justifyContent: 'center',
    backgroundColor: '#2C2443',
  },
  continueBtnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(85),
    paddingTop: normalize(10),
  },
  continueBtn: {
    flex: 1,
    height: normalize(52),
    borderRadius: 5,
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtnDisabled: {
    flex: 1,
    height: normalize(52),
    borderRadius: 5,
    backgroundColor: '#423170',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtnTitle: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: 'white',
  },
  continueBtnTitleDisabled: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: '#808080',
  },
})

export default styles
