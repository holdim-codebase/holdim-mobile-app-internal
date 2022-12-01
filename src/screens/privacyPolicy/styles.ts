import {Platform, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const OS_IOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  loadingWrapperFullScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: '80%',
  },
  privacyPolicyWrapper: {
    flex: 1,
    height: OS_IOS ? normalize(44) : 0,
    flexDirection: 'column',
  },
  privacyPolicyStatusBar: {
    height: OS_IOS ? normalize(44) : 0,
  },
  privacyPolicyStatusBarWrapper: {
    height: normalize(52),
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  privacyPolicyStatusBarArrow: {
    paddingLeft: normalize(16),
    paddingRight: normalize(87.5),
  },
  privacyPolicyStatusBarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(52),
  },
  privacyPolicyContentWrapper: {
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(50),
  },
  privacyPolicyDateWrapper: {
    paddingVertical: normalize(16),
  },
  privacyPolicyDateText: {
    color: '#BEAAF5',
    fontSize: normalize(12),
    lineHeight: normalize(20),
    backgroundColor: '#47337D',
    paddingHorizontal: normalize(9),
    paddingVertical: normalize(5),
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  privacyPolicyTitle: {
    color: 'rgba(190, 170, 245, 1)',
    fontSize: normalize(18),
    lineHeight: normalize(20),
    fontWeight: '700',
    paddingVertical: normalize(16),
  },
  privacyPolicyText: {
    fontSize: normalize(14),
    fontWeight: '400',
    lineHeight: normalize(18),
    color: 'rgba(196, 200, 201, 1)',
  },
  privacyPolicyHighlightedText: {
    fontSize: normalize(14),
    fontWeight: '400',
    lineHeight: normalize(18),
    color: 'rgba(132, 99, 223, 1)',
  },
  privacyPolicyBulletList: {
    paddingLeft: normalize(10),
    paddingRight: normalize(5),
    fontWeight: '700',
    color: 'rgba(196, 200, 201, 1)',
  },
  bottomPart: {
    height: OS_IOS ? normalize(44) : 0,
  },
})

export default styles
