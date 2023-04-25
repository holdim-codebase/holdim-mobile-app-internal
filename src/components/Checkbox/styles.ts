import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {purpleLight} from '../../constants/css'

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  checkboxText: {
    maxWidth: normalize(250),
    color: '#C4C8C9',
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(18),
  },
  checkbox: {
    width: normalize(18),
    height: normalize(18),
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    borderColor: purpleLight,
  },
  checkmark: {
    width: 6,
    height: 9,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: purpleLight,
    transform: [{rotate: '45deg'}],
    marginBottom: normalize(2),
  },
})

export default styles
