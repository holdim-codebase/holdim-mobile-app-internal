import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

import {purple, purpleLight, purpleDark} from '../../constants/css'

const styles = StyleSheet.create({
  proposalWrapper: {
    flex: 1,
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(15),
  },
  proposalTopSectionWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  loadingWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  proposalIcon: {
    width: normalize(54),
    height: normalize(54),
    borderRadius: normalize(50),
  },
  proposalDaoTitle: {
    fontWeight: '700',
    fontSize: normalize(20),
    lineHeight: normalize(24),
    color: 'white',
    marginLeft: normalize(8),
    fontFamily: 'System',
  },
  proposalTitle: {
    width: '100%',
    fontWeight: '700',
    fontSize: normalize(17),
    lineHeight: normalize(20),
    color: '#BEAAF5',
    marginBottom: normalize(18),
    fontFamily: 'System',
  },
  proposalDescription: {
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(18),
    color: '#E2E2E2',
    marginBottom: normalize(16),
    fontFamily: 'System',
  },
  proposalButton: {
    width: '100%',
    backgroundColor: purple,
    height: normalize(52),
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
  },
  proposalLinksButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proposalLinkButton: {
    width: '48%',
    backgroundColor: '#756799',
    flexDirection: 'row',
    height: normalize(44),
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
  },
  proposalLinkButtonAlone: {
    width: '100%',
    backgroundColor: '#756799',
    flexDirection: 'row',
    height: normalize(44),
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
  },
  proposalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(18),
    lineHeight: normalize(20),
    fontFamily: 'System',
  },
  proposalButtonLink: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(20),
    fontFamily: 'System',
  },
  proposalLinkSvg: {
    paddingRight: normalize(10),
  },
  proposalMetaWrapper: {
    flexDirection: 'column',
    marginBottom: normalize(10),
  },
  proposalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(8),
    paddingBottom: normalize(11),
    paddingHorizontal: normalize(5),
    borderBottomColor: '#3D2E67',
    borderBottomWidth: 1,
  },
  proposalMetaTitle: {
    fontWeight: '700',
    fontSize: normalize(14),
    lineHeight: normalize(20),
    color: '#A195C2',
    fontFamily: 'System',
  },
  conentProposalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proposalMetaInfo: {
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(16),
    color: 'white',
    marginLeft: normalize(4),
    fontFamily: 'System',
  },
  proposalVotingWrapper: {
    backgroundColor: '#2C2443',
    width: '100%',
    padding: normalize(15),
    borderRadius: normalize(12),
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: normalize(0),
    marginBottom: normalize(10),
  },
  proposalVotingItemWrapper: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: normalize(15),
  },
  proposalVotingItemTextWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(6),
  },
  proposalVotingItemText: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '400',
    lineHeight: normalize(14),
    marginBottom: normalize(5),
    fontFamily: 'System',
  },
  proposalVotingItemBackgroundLine: {
    width: '100%',
    height: normalize(7),
    backgroundColor: 'rgba(148, 119, 229, 0.42);',
    borderRadius: normalize(13),
    marginBottom: normalize(7),
    position: 'relative',
    zIndex: 1,
  },

  proposalVotingItemQuorum: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(15),
    backgroundColor: '#2C2443',
    border: '1px solid #3D2E67',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
  },
  proposalVotingItemInnerLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: normalize(7),
    borderRadius: normalize(13),
    marginBottom: normalize(7),
    zIndex: 2,
    backgroundColor: 'red',
  },
})

export default styles
