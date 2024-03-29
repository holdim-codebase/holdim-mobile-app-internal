import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'
import {purpleLight, OS_IOS} from '../../constants/css'

const styles = StyleSheet.create({
  loadingWrapperFullScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '80%',
    backgroundColor: 'black',
  },
  loadingWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingSpinner: {
    paddingVertical: normalize(20),
  },
  feedWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  proposalWrapper: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(24),
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: 'rgba(193, 193, 193, 0.5)',
    borderBottomWidth: 0.5,
  },
  proposalWrapperTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proposalWrapperBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: normalize(16),
  },
  proposalActionsWrapper: {
    flexDirection: 'row',
  },
  proposalImageWrapper: {
    marginRight: normalize(8),
    width: '15%',
  },
  proposalImage: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(50),
  },
  proposalContentWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '83%',
  },
  proposalTopPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  proposalTitle: {
    color: 'white',
    fontSize: normalize(20),
    fontWeight: '700',
    lineHeight: normalize(24),
    marginBottom: normalize(12),
    fontFamily: 'System',
    paddingTop: normalize(8),
  },
  proposalActiveTitle: {
    color: '#A8D102',
    fontSize: normalize(12),
    fontWeight: '700',
    lineHeight: normalize(20),
    marginBottom: normalize(12),
    paddingHorizontal: normalize(9),
    paddingVertical: normalize(5),
    fontFamily: 'System',
    borderRadius: 8,
    backgroundColor: 'rgba(168, 209, 2, 0.08)',
    overflow: 'hidden',
  },
  proposalDescription: {
    color: '#E2DFDF',
    fontSize: normalize(16),
    fontWeight: '400',
    lineHeight: normalize(19),
    marginBottom: normalize(12),
    fontFamily: 'System',
  },
  proposalEndTime: {
    color: '#E2DFDF',
    fontSize: normalize(12),
    fontWeight: '300',
    lineHeight: normalize(14),
    marginBottom: normalize(12),
  },
  proposalVotingWrapper: {
    borderColor: '#2F2F2F',
    width: '100%',
    padding: normalize(15),
    borderRadius: normalize(12),
    borderWidth: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  proposalVotingItemWrapper: {
    width: '100%',
    flexDirection: 'column',
  },
  proposalVotingItemTextWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: 'rgba(196, 196, 196, 0.5)',
    borderRadius: normalize(13),
    marginBottom: normalize(7),
    position: 'relative',
    zIndex: 1,
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
  emojiReactionContentWrapper: {
    flexDirection: 'row',
  },
  emojiReactionItem: {
    marginHorizontal: normalize(4),
    fontSize: normalize(24),
    color: 'black'
  },
  chosenEmojiReaction: {
    height: normalize(23),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pickedEmojiWrapper: {
    borderRadius: normalize(20), 
    marginHorizontal: normalize(2),
  },
  pickedEmojiBackground: {
    position: 'absolute', 
    backgroundColor: purpleLight,
    left: normalize(OS_IOS ? 2 : 2.5),
    top: normalize(OS_IOS ? 3 : 5),
    width: normalize(20), 
    height: normalize(20),
    borderRadius: normalize(15)
  },
  pickedEmoji: {
    fontSize: normalize(20),
    color: 'black'
  },
  famousEmojis: {
    fontSize: normalize(20), 
    marginLeft: normalize(2),
    color: 'black'
  },
  famousEmojisCount: {
    color: 'white', 
    marginLeft: normalize(8)
  },
})

export default styles
