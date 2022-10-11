import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {black, purple, white} from '../../constants/css'

const styles = StyleSheet.create({
  loginContentWrapper: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loginWrapper: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: black,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(53),
    paddingBottom: normalize(123),
  },
  loginTitleWrapper: {
    marginBottom: '25%',
  },
  loginTitle: {
    color: purple,
    fontFamily: 'Ubuntu-Bold',
    fontSize: normalize(38),
    fontWeight: 'bold',
    maxWidth: 350,
    marginBottom: 10,
  },
  onboardingVerticalLine: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: normalize(35),
  },
  loginVerticalLine: {
    color: white,
    fontSize: normalize(64),
    fontWeight: 'bold',
  },
  loginTextInput: {
    fontFamily: 'NotoSans-Regular',
    backgroundColor: '#2C2443',
    borderRadius: 7,
    paddingHorizontal: normalize(16),
    height: normalize(64),
    marginVertical: normalize(10),
    marginBottom: normalize(5),
    color: white,
  },
  loginBtnGoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginBtnGo: {
    flex: 1,
    height: normalize(64),
    borderRadius: 5,
    backgroundColor: purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnGoDisabled: {
    flex: 1,
    height: normalize(64),
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
    fontSize: normalize(15),
    color: white,
    paddingTop: normalize(28),
    marginBottom: normalize(40),
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
    color: white,
    paddingLeft: normalize(8),
  },
  loginIncorrectWalletAddressText: {
    color: '#FF004D',
  },
  loginIncorrectWalletAddressInput: {
    borderColor: '#FF004D',
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
