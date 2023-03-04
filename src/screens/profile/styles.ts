import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {purpleLight, purple} from '../../constants/css'

const styles = StyleSheet.create({
  loadingWrapper: {
    width: '100%',
    height: '100%',
    paddingTop: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  profileWrapper: {
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(24),
    width: '100%',
  },
  profileInfoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: 80,
  },
  profileInfoTextWrapper: {
    flexDirection: 'column',
    marginLeft: normalize(24),
    width: normalize(210),
  },
  profileName: {
    fontSize: normalize(25),
    fontWeight: '700',
    fontFamily: 'System',
    color: 'white',
  },
  profilePortfolioAmount: {
    fontSize: normalize(14),
    lineHeight: normalize(18),
    fontWeight: '400',
    fontFamily: 'System',
    color: 'white',
  },
  numberOfDaoText: {
    color: '#8463DF',
  },
  portfolioWrapper: {
    width: '100%',
    flexDirection: 'column',
    marginTop: normalize(29),
    marginBottom: normalize(40),
  },
  portfolioTitle: {
    fontSize: normalize(18),
    fontWeight: '700',
    lineHeight: normalize(20),
    color: purpleLight,
    marginBottom: normalize(10),
    fontFamily: 'System',
  },
  portfolioDaoListWrapper: {},
  portfolioDaoWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#3D2E67',
    borderBottomWidth: 0.5,
    paddingVertical: normalize(14),
  },
  assetLeft: {
    flexDirection: 'row',
  },
  assetImage: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(50),
  },
  assetTextWrapper: {
    height: '100%',
    flexDirection: 'column',
    paddingLeft: normalize(9),
  },
  assetTitle: {
    color: 'white',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    fontWeight: '500',
    fontFamily: 'System',
    marginBottom: normalize(4),
  },
  assetShareAmount: {
    color: purple,
    fontSize: normalize(12),
    lineHeight: normalize(16),
    fontWeight: '500',
    fontFamily: 'System',
  },
  assetShareText: {
    color: 'white',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    fontWeight: '500',
    fontFamily: 'System',
  },
  assetRight: {
    flexDirection: 'column',
  },
  assetAmountNumber: {
    color: 'white',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    fontWeight: '700',
    fontFamily: 'System',
    textAlign: 'right',
  },
  assetAmountText: {
    color: 'white',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    fontWeight: '300',
    fontFamily: 'System',
    textAlign: 'right',
    marginBottom: normalize(4),
  },
  assetDaoPrice: {
    color: purple,
    fontSize: normalize(12),
    lineHeight: normalize(16),
    fontWeight: '300',
    fontFamily: 'System',
    textAlign: 'right',
  },
})

export default styles
