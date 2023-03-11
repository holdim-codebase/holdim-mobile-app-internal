import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {OS_IOS, purple} from '../../constants/css'

const styles = StyleSheet.create({
  customModalWrapperIOS: {
    flex: 1,
  },
  customModalWrapper: {
    justifyContent: 'center',
    paddingHorizontal: OS_IOS ? normalize(16) : 0,
    marginHorizontal: OS_IOS ? 0 : normalize(16),
    marginTop: OS_IOS ? 0 : '35%',
    backgroundColor: 'rgba(44, 36, 67, 0.6)',
  },
  customModal: {
    opacity: 1,
    backgroundColor: '#3D335A',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(30),
    alignItems: 'center',
  },
  emoji: {
    fontSize: normalize(55),
    color: 'white',
  },
  customModalTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(18),
    lineHeight: normalize(20),
    textAlign: 'center',
    paddingTop: normalize(16),
  },
  customModalDescription: {
    color: 'white',
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(18),
    textAlign: 'center',
    paddingTop: normalize(16),
    paddingBottom: normalize(30),
  },
  customModalWalletAddressStyle: {
    fontWeight: '600',
  },
  customModalTwoButtonWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  customModalButtonOnly: {
    borderRadius: normalize(5),
    paddingVertical: normalize(10),
    width: '100%',
    backgroundColor: purple,
  },
  customModalButton: {
    borderRadius: normalize(5),
    paddingVertical: normalize(10),
    width: '48%',
  },
  customModalButtonCancel: {
    borderColor: purple,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  customModalButtonOk: {
    backgroundColor: purple,
  },
  customModalButtonDanger: {
    backgroundColor: '#F32C2C',
  },
  customModalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(20),
    textAlign: 'center',
  },
})

export default styles
