import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {purpleLight, OS_IOS, purpleDark, purple} from '../../constants/css'

const styles = StyleSheet.create({
  proposalWrapper: {
    paddingVertical: normalize(16),
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: 'rgba(193, 193, 193, 0.5)',
    borderBottomWidth: 0.5,
  },
  proposalWrapperFeed: {
    paddingHorizontal: normalize(16),
  },
  proposalWrapperNotFeed: {
    paddingHorizontal: normalize(0),
  },
  proposalWrapperTop: {
    width: '100%',
  },
  proposalContentWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  proposalTopPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  proposalImageWrapper: {
    flexDirection: 'row',
    marginBottom: normalize(10),
  },
  proposalImage: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(50),
    marginRight: normalize(10),
  },
  proposalTitle: {
    color: 'white',
    maxWidth: normalize(285),
    fontSize: normalize(17),
    fontWeight: '700',
    lineHeight: normalize(24),
    marginBottom: normalize(6),
    fontFamily: 'System',
    paddingTop: normalize(8),
  },
  proposalTitleTextColor: {
    color: '#BEAAF5',
    marginBottom: normalize(8),
  },
  proposalEndTime: {
    color: '#8463DF',
    fontSize: normalize(12),
    fontWeight: '300',
    lineHeight: normalize(14),
    marginBottom: normalize(12),
  },
  proposalFlag: {
    color: '#A8D102',
    maxHeight: normalize(30),
    fontSize: normalize(12),
    fontWeight: '700',
    lineHeight: normalize(20),
    marginBottom: normalize(35),
    paddingHorizontal: normalize(9),
    paddingVertical: normalize(5),
    fontFamily: 'System',
    borderRadius: 8,
    backgroundColor: 'rgba(168, 209, 2, 0.08)',
    overflow: 'hidden',
  },

  proposalActiveColor: {
    color: '#A8D102',
    backgroundColor: 'rgba(168, 209, 2, 0.08)',
  },

  proposalEndedColor: {
    color: purple,
    backgroundColor: 'rgba(132, 99, 223, 0.15)',
  },
  proposalDescription: {
    color: '#E2DFDF',
    fontSize: normalize(14),
    fontWeight: '400',
    lineHeight: normalize(18),
    marginBottom: normalize(12),
    fontFamily: 'System',
  },
  proposalVotingWrapper: {
    backgroundColor: purpleDark,
    width: '100%',
    padding: normalize(15),
    borderRadius: normalize(12),
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: normalize(0),
    marginBottom: normalize(10),
  },
  loadingWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: normalize(15),
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
  // proposalTitle: {
  //   width: '100%',
  //   fontWeight: '700',
  //   fontSize: normalize(17),
  //   lineHeight: normalize(20),
  //   color: purpleLight,
  //   marginBottom: normalize(18),
  //   fontFamily: 'System',
  // },
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
  proposalVotingItemQuorum: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(6),
    backgroundColor: purpleDark,
    border: '1px solid #3D2E67',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
  },
  proposalWrapperBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: normalize(16),
  },
  proposalActionsWrapper: {
    flexDirection: 'row',
  },
  emojiReactionsWrapper: {
    height: normalize(23),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pickedEmojiWrapperWidth: {
    width: normalize(52),
  },
  notPickedEmojiWrapperWidth: {
    width: normalize(36),
    paddingLeft: normalize(4),
  },
  emojiWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(32),
    borderRadius: normalize(50),
    marginRight: normalize(4),
    flexDirection: 'row',
  },
  pickedEmojiBackground: {
    backgroundColor: 'rgba(132, 99, 223, 0.7)',
  },
  notPickedEmojiBackground: {
    backgroundColor: 'rgba(44, 36, 67, 0.6)',
  },
  emojiCount: {
    color: 'white',
    fontSize: normalize(14),
    fontWeight: '300',
    lineHeight: normalize(20),
  },
})

export default styles
