import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {purpleDark, purpleLight} from '../../constants/css'

const styles = StyleSheet.create({
  loadingWrapperFullScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%',
    backgroundColor: 'black',
  },
  loadingSpinner: {
    paddingVertical: normalize(20),
  },
  searchWrapper: {
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
  },
  searchBar: {
    backgroundColor: '#2C2443',
    fontColor: 'white',
    width: '100%',
    borderRadius: normalize(30),
    paddingHorizontal: normalize(10),
  },
  searchBarText: {
    color: 'white',
    fontSize: normalize(14),
    lineHeight: normalize(18),
  },
  textInputStyle: {
    color: '#DDDDDD',
    fontSize: normalize(12),
  },
  searchListWrapper: {
    width: '100%',
    marginTop: normalize(16),
  },
  searchDaoWrapper: {
    paddingVertical: normalize(14),
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#3D2E67',
    borderBottomWidth: 1,
  },
  searchDaoLogoTextWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchDaoLogo: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(50),
  },
  searchDaoTextWrapper: {
    paddingLeft: normalize(10),
  },
  searchDaoName: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: '500',
  },
  searchDaoPrice: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '300',
  },
  searchDaoPriceClr: {
    color: '#8463DF',
  },
  searchDaoFollowSvg: {
    paddingTop: normalize(7),
  },
  searchEmptyWrapper: {
    paddingTop: normalize(64),
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchEmptyTitle: {
    paddingVertical: normalize(16),
    fontWeight: '700',
    fontSize: normalize(18),
    color: '#BEAAF5',
    textAlign: 'center',
  },
  searchEmptyText: {
    fontWeight: '400',
    fontSize: normalize(14),
    textAlign: 'center',
    color: 'white',
    lineHeight: normalize(18),
    width: '90%',
  },
})

export default styles
