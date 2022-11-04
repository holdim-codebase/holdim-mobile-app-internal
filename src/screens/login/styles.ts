import {Platform, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const OS_IOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  loginContentWrapper: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loginWrapper: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: normalize(16),
    paddingTop: normalize(53),
    paddingBottom: OS_IOS ? normalize(123) : normalize(84),
  },
  loginTitle: {
    maxWidth: 350,
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
  loginVerticalLine: {
    color: '#FFFFFF',
    fontSize: normalize(64),
    fontWeight: 'bold',
  },
  inputTextAndButtonWrapperKeyboardVisible: {
    marginBottom: OS_IOS ? normalize(230) : 0,
  },
  loginTextInputWrapper: {
    flexDirection: 'row',
    fontFamily: 'NotoSans-Regular',
    backgroundColor: '#2C2443',
    borderRadius: 7,
    paddingHorizontal: OS_IOS ? normalize(16) : normalize(13),
    paddingBottom: OS_IOS ? normalize(16) : 0,
    paddingTop: OS_IOS ? normalize(10) : 0,
    marginTop: normalize(10),
    color: '#FFFFFF',
  },
  loginTextInput: {
    fontSize: normalize(14),
    lineHeight: normalize(18),
    fontFamily: 'NotoSans-Regular',
    fontWeight: '400',
    color: 'white',
    width: '90%',
  },
  loginTextInputFocused: {
    borderColor: '#8463DF',
    borderWidth: 1,
  },
  loginTextInputClearBtn: {
    paddingLeft: normalize(10),
    paddingTop: OS_IOS ? normalize(5) : normalize(14),
    backgroundColor: '#2C2443',
  },
  loginBtnGoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginBtnGo: {
    flex: 1,
    height: normalize(52),
    borderRadius: 5,
    backgroundColor: '#8463DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnGoDisabled: {
    flex: 1,
    height: normalize(52),
    borderRadius: 5,
    backgroundColor: '#423170',
    color: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnGoTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: normalize(18),
    color: 'white',
  },
  loginBtnGoTitleDisabled: {
    color: '#808080',
  },
  loginDescriptionTitle: {
    fontFamily: 'NotoSans-Regular',
    fontSize: normalize(14),
    color: '#F32C2C',
    marginBottom: normalize(30),
    marginTop: normalize(5),
  },
  walletTitile: {
    fontFamily: 'Ubuntu-Bold',
    fontStyle: 'normal',
    fontSize: normalize(14),
    lineHeight: normalize(20),
    color: '#A195C2',
  },
  loginDescription: {
    fontSize: normalize(16),
    color: '#FFFFFF',
    paddingLeft: normalize(8),
  },
  loginIncorrectWalletAddressText: {
    color: '#FF004D',
  },
  loginIncorrectWalletAddressInput: {
    borderColor: '#F32C2C',
    borderWidth: 1,
  },
  loadingWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
