import {Platform, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const OS_IOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  addWalletModalWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: OS_IOS ? normalize(16) : 0,
    marginHorizontal: OS_IOS ? 0 : normalize(16),
    marginTop: OS_IOS ? 0 : '35%',
  },
  addWalletModalWrapperKeyboardVisible: {
    marginTop: OS_IOS ? 0 : '10%',
    justifyContent: OS_IOS ? 'flex-start' : 'center',
    paddingTop: OS_IOS ? '30%' : 0,
  },
  addWalletModal: {
    opacity: 1,
    backgroundColor: '#3D335A',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(30),
    paddingTop: normalize(20),
  },
  addWalletModalCentered: {
    alignItems: 'center',
  },
  keyEmoji: {
    fontSize: normalize(55),
    color: 'white',
  },
  addWalletModalTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(18),
    lineHeight: normalize(20),
    textAlign: 'center',
    paddingTop: normalize(16),
  },
  addWalletModalDescription: {
    color: 'white',
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(18),
    textAlign: 'center',
    paddingTop: normalize(16),
    paddingBottom: normalize(30),
  },
  addWalletModalTextInputTitle: {
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(20),
    color: '#A195C2',
    paddingBottom: normalize(5),
  },
  addWalletModalTextInputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#2C2443',
    borderRadius: 5,
    paddingHorizontal: normalize(16),
    paddingBottom: OS_IOS ? normalize(16) : 0,
    paddingTop: OS_IOS ? normalize(12) : 0,
    justifyContent: 'space-between',
    width: '100%',
  },
  addWalletModalIncorrectWalletAddressInput: {
    borderColor: '#F32C2C',
    borderWidth: 1,
  },
  addWalletModalTextInput: {
    fontSize: normalize(14),
    lineHeight: normalize(18),
    fontWeight: '400',
    color: 'white',
    width: '90%',
  },
  addWalletModalClearBtn: {
    paddingLeft: normalize(10),
    justifyContent: 'center',
    backgroundColor: '#2C2443',
  },
  addWalletModalIncorrectWalletAddressText: {
    color: '#F32C2C',
    paddingTop: normalize(5),
  },
  addWalletModalButtonsWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: normalize(30),
  },
  addWalletModalButton: {
    borderRadius: normalize(5),
    paddingVertical: normalize(10),
    width: '48%',
  },
  addWalletModalButtonCancel: {
    borderColor: '#8463DF',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  addWalletModalButtonOk: {
    backgroundColor: '#8463DF',
  },
  addWalletModalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(20),
    textAlign: 'center',
  },
  addWalletModalButtonDisabled: {
    backgroundColor: 'rgba(132, 99, 223, 0.5)',
  },
  addWalletModalButtonTitleDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
})

export default styles
