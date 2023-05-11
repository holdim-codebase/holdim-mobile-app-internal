import {notifyListeners} from 'mobx/dist/internal'
import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {black, darkGrape, OS_IOS, purple, white} from '../../../constants/css'

const styles = StyleSheet.create({
  loadingWrapperFullScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: purple,
    paddingTop: normalize(100),
    paddingHorizontal: normalize(16),
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  mainTitle: {
    fontWeight: '700',
    fontSize: normalize(38),
    lineHeight: normalize(45),
    color: white,
  },
  title: {
    fontWeight: '700',
    fontSize: normalize(38),
    lineHeight: normalize(45),
    color: darkGrape,
    paddingBottom: normalize(14),
  },
  text: {
    fontWeight: '300',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    color: white,
  },
  scrollViewWrapper: {
    maxHeight: '53%',
    marginHorizontal: normalize(14),
  },
  listWrapper: {
    backgroundColor: black,
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
  },
  buttonWrapper: {
    paddingBottom: OS_IOS ? normalize(84) : normalize(50),
  },
  button: {
    backgroundColor: darkGrape,
    width: '100%',
    borderRadius: normalize(5),
    alignItems: 'center',
    height: normalize(52),
    justifyContent: 'center',
  },
  buttonText: {
    color: white,
    fontSize: normalize(18),
    lineHeight: normalize(20),
    fontWeight: '700',
    paddingVertical: normalize(16),
  },
  daoWrapper: {
    paddingVertical: normalize(10),
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dividingLine: {
    borderBottomColor: '#3D2E67',
    borderBottomWidth: 1,
  },
  daoLogoTextWrapper: {
    alignContent: 'center',
    flexDirection: 'row',
  },
  daoLogo: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(50),
  },
  daoTextWrapper: {
    paddingLeft: normalize(10),
  },
  daoName: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: '400',
  },
  daoPrice: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '300',
  },
})

export default styles
