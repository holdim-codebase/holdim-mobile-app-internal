import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  customModalWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: normalize(16),
  },
  customModal: {
    opacity: 1,
    backgroundColor: '#3D335A',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(30),
    alignItems: 'center',
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
  customModalButton: {
    borderRadius: normalize(5),
    paddingVertical: normalize(10),
    width: '48%',
  },
  customModalButtonCancel: {
    backgroundColor: '#5B449A',
  },
  customModalButtonOk: {
    backgroundColor: '#8463DF',
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
