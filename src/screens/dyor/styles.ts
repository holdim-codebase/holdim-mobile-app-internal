import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {purple} from '../../constants/css'

const styles = StyleSheet.create({
  dyorWrapper: {
    paddingHorizontal: normalize(16),
  },
  dyorDescriptionWrapper: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dyorDescriptionEmoji: {
    marginBottom: normalize(5),
    fontSize: normalize(60),
    color: 'white',
  },
  dyorDescriptionTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(18),
    lineHeight: normalize(20),
    textAlign: 'center',
    paddingTop: normalize(16),
    marginBottom: normalize(15),
  },
  dyorText: {
    maxWidth: normalize(300),
    color: '#C4C8C9',
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(18),
    textAlign: 'center',
  },
  dyorCheckedText: {
    textAlign: 'left',
  },
  dyorFooter: {
    width: '100%',
    height: '20%',
    justifyContent: 'flex-end',
    paddingBottom: normalize(40),
  },

  dyorFooterBtn: {
    height: normalize(52),
    borderRadius: 5,
    backgroundColor: purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dyorFooterBtnDisabled: {
    opacity: 0.5,
  },
  dyorFooterBtnTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: normalize(18),
    color: 'white',
  },
})

export default styles
