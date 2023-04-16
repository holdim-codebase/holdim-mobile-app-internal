import * as React from 'react'
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Share,
} from 'react-native'
import * as Sentry from '@sentry/react-native'
import moment from 'moment'
import numeral from 'numeral'
import {useMutation} from '@apollo/client'
import {observer} from 'mobx-react'
import normalize from 'react-native-normalize'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import Exlam from '../../assets/icons/exclamatory.svg'

import EmojiReactionsStore from '../../services/stores/emojiReactions.store'
import {TPoll, TProposal} from '../../types'
import {CHANGE_PROPOSAL_EMOJI, handleHTTPError} from '../../services/api'

import ActionIcon from '../../components/ActionIcon'

import ShareIcon from '../../assets/icons/share.svg'
import SnapshotIcon from '../../assets/icons/snapshot.svg'
import {openLinkInAppBrowser} from '../../components/MarkdownText'

import styles from './styles'
import {purple} from '../../constants/css'
import {hapticOptions} from '../../constants/haptic'
import AiGeneratedText from '../../components/AIGenerated'
import CustomModal from '../../components/CustomModal'
import {flashlight} from '../../constants/emojis'

const emojiSize = normalize(20)

type TProps = {
  openProposal: Function
  proposal: TProposal
  poll: TPoll
  openDAODescription: Function
  convertURIForLogo: Function
  loadingPoll: boolean
}

const Proposal = (props: TProps) => {
  const [changeProposalEmoji] = useMutation(CHANGE_PROPOSAL_EMOJI, {
    onError: error => {
      setPickedEmojiId(null)
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  const {
    openProposal,
    proposal,
    poll,
    openDAODescription,
    convertURIForLogo,
    loadingPoll,
  } = props
  const dateNow = new Date()
  const [pickedEmojiId, setPickedEmojiId] = React.useState<string | null>(
    proposal.personalizedData.pickedEmojiId,
  )
  const [isMoadlAi, setIsMoadlAi] = React.useState<boolean>(false)

  const {getEmojiById, getReactionCountByProposal} = EmojiReactionsStore

  const handleEmojiClick = (emojiId: string) => {
    changeProposalEmoji({
      variables: {
        proposalId: proposal.id,
        emojiId: emojiId,
      },
    })
    setPickedEmojiId(pickedEmojiId === emojiId ? null : emojiId)
    ReactNativeHapticFeedback.trigger('rigid', hapticOptions)
  }

  const handleShare = () => {
    Share.share({
      message: `${proposal.title}\n\n${proposal.juniorDescription}\n\nTL;DR made by Holdim AI\n${proposal.snapshotLink}`,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => openProposal(proposal, poll)}>
      <View style={styles.proposalWrapper}>
        {isMoadlAi && (
          <CustomModal
            title={'DYOR'}
            description={`Do your own research. The AI generated texts do not mean a financial or other advice. The text simplified by AI can have inaccuracies. Always read the full proposal before voting on the subject.`}
            btnOkText={'Got it'}
            btnCancelText={'Got it'}
            emoji={flashlight}
            modalVisible={isMoadlAi}
            setModalVisible={m => setIsMoadlAi(m)}
            doAction={() => {
              setIsMoadlAi(false)
            }}
          />
        )}
        <View style={styles.proposalWrapperTop}>
          <View style={styles.proposalContentWrapper}>
            <View style={styles.proposalTopPart}>
              <View style={styles.proposalImageWrapper}>
                <TouchableWithoutFeedback
                  onPress={() => openDAODescription(proposal.dao.id)}>
                  <Image
                    source={{
                      uri: convertURIForLogo(proposal.dao.logo),
                    }}
                    style={styles.proposalImage}
                  />
                </TouchableWithoutFeedback>

                <View>
                  <TouchableWithoutFeedback
                    onPress={() => openDAODescription(proposal.dao.id)}>
                    <Text style={styles.proposalTitle}>
                      {proposal.dao.name}
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text style={styles.proposalEndTime}>
                    {dateNow < new Date(proposal.endAt)
                      ? 'Ends:'
                      : 'Voting ended on'}{' '}
                    {moment(new Date(proposal.endAt)).format(
                      'MMM DD, YYYY, HH:MM A',
                    )}
                  </Text>
                </View>
              </View>

              {dateNow < new Date(proposal.endAt) && (
                <Text style={styles.proposalActiveTitle}>ACTIVE</Text>
              )}
            </View>
            <Text style={styles.proposalDescription}>
              {proposal.juniorDescription}
            </Text>

            <AiGeneratedText handleClick={() => setIsMoadlAi(true)} />

            <View style={styles.proposalVotingWrapper}>
              {loadingPoll ? (
                <View style={styles.loadingWrapper}>
                  <ActivityIndicator size="large" color={purple} />
                </View>
              ) : poll &&
                poll.poll.choices &&
                poll.poll.choices.length !== 0 ? (
                poll.poll.choices.map((choiceTitle: string, i: number) => {
                  return (
                    <View key={i} style={styles.proposalVotingItemWrapper}>
                      <View style={styles.proposalVotingItemTextWrapper}>
                        <Text style={styles.proposalVotingItemText}>
                          {choiceTitle}
                        </Text>
                        <Text style={styles.proposalVotingItemText}>
                          {numeral(poll.poll.scores[i]).format('0[.]0a')}{' '}
                          {poll.poll.symbol}
                          {'  '}
                          {poll.poll.scores_total &&
                            +(
                              (poll.poll.scores[i] * 100) /
                              poll.poll.scores_total
                            ).toFixed()}
                          %
                        </Text>
                      </View>
                      <View style={styles.proposalVotingItemBackgroundLine}>
                        <View
                          style={{
                            ...styles.proposalVotingItemInnerLine,
                            backgroundColor: purple,
                            width: `${
                              (poll.poll.scores_total &&
                                poll.poll.scores[i] * 100) /
                              poll.poll.scores_total
                            }%`,
                          }}
                        />
                      </View>
                    </View>
                  )
                })
              ) : null}
            </View>

            {!loadingPoll && poll && poll.poll.quorum !== 0 && (
              <View style={styles.proposalVotingItemQuorum}>
                <Text style={styles.proposalVotingItemText}>Quorum</Text>
                <Text style={styles.proposalVotingItemText}>
                  {numeral(poll && poll.poll.scores_total).format('0[.]0a')} /{' '}
                  {numeral(poll && poll.poll.quorum).format('0[.]0a')}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.proposalWrapperBottom}>
          <View style={styles.proposalActionsWrapper}>
            <ActionIcon
              icon={<ShareIcon width={normalize(20)} />}
              onPress={handleShare}
              size={normalize(20)}
            />
            {proposal.snapshotLink && (
              <ActionIcon
                icon={<SnapshotIcon width={normalize(20)} />}
                onPress={() => openLinkInAppBrowser(proposal.snapshotLink)}
                size={normalize(20)}
              />
            )}
          </View>
          <View style={styles.emojiReactionsWrapper}>
            {proposal.statisticData.emojiCount.map(reaction => {
              const emojiCount = getReactionCountByProposal(
                reaction,
                pickedEmojiId,
                proposal.personalizedData.pickedEmojiId,
              )
              return (
                <TouchableWithoutFeedback
                  onPress={() => handleEmojiClick(reaction.emojiId)}
                  key={reaction.emojiId}>
                  <View
                    style={[
                      styles.emojiWrapper,
                      emojiCount !== 0
                        ? styles.pickedEmojiWrapperWidth
                        : styles.notPickedEmojiWrapperWidth,
                      pickedEmojiId === reaction.emojiId
                        ? styles.pickedEmojiBackground
                        : styles.notPickedEmojiBackground,
                    ]}
                    key={reaction.emojiId}>
                    <Text>{getEmojiById(reaction.emojiId)?.unicode} </Text>
                    {emojiCount !== 0 ? (
                      <Text style={styles.emojiCount}>
                        {numeral(emojiCount).format('0[.]0a')}
                      </Text>
                    ) : null}
                  </View>
                </TouchableWithoutFeedback>
              )
            })}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default observer(Proposal)
