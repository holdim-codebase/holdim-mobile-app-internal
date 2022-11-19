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

import EmojiReactionsStore from '../../services/stores/emojiReactions.store'
import {TPoll, TProposal} from '../../types'
import {CHANGE_PROPOSAL_EMOJI, handleHTTPError} from '../../services/api'

import ActionIcon from '../../components/ActionIcon'
import EmojiTooltip from '../../components/EmojiTooltip'

import ShareIcon from '../../assets/icons/share.svg'
import SnapshotIcon from '../../assets/icons/snapshot.svg'
import FavoriteIcon from '../../assets/icons/favorite_border.svg'
import {openLinkInAppBrowser} from '../../components/MarkdownText'

import styles from './styles'

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
  const [tooltipIsOpen, setTooltipIsOpen] = React.useState<boolean>(false)

  const handleEmojiClick = (emojiId: string) => {
    changeProposalEmoji({
      variables: {
        proposalId: proposal.id,
        emojiId: emojiId,
      },
    })
    setPickedEmojiId(pickedEmojiId === emojiId ? null : emojiId)
    setTooltipIsOpen(false)
  }

  const handleShare = () => {
    Share.share({
      message: `${proposal.title}\n\n${proposal.juniorDescription}\n\nTL;DR made by Holdim AI\n${proposal.snapshotLink}`,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => openProposal(proposal, poll)}>
      <View style={styles.proposalWrapper}>
        <View style={styles.proposalWrapperTop}>
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
          </View>
          <View style={styles.proposalContentWrapper}>
            <View style={styles.proposalTopPart}>
              <TouchableWithoutFeedback
                onPress={() => openDAODescription(proposal.dao.id)}>
                <Text style={styles.proposalTitle}>{proposal.dao.name}</Text>
              </TouchableWithoutFeedback>
              {dateNow < new Date(proposal.endAt) && (
                <Text style={styles.proposalActiveTitle}>ACTIVE</Text>
              )}
            </View>
            <Text style={styles.proposalDescription}>
              {proposal.juniorDescription}
            </Text>
            <Text style={styles.proposalEndTime}>
              {dateNow < new Date(proposal.endAt) ? 'Ends:' : 'Voting ended on'}{' '}
              {moment(new Date(proposal.endAt)).format('MMM DD, YYYY, HH:MM A')}
            </Text>
            <View style={styles.proposalVotingWrapper}>
              {loadingPoll ? (
                <View style={styles.loadingWrapper}>
                  <ActivityIndicator size="large" color="#8463DF" />
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
                          {
                            +(
                              (poll.poll.scores[i] * 100) /
                              poll.poll.scores_total
                            ).toFixed()
                          }
                          %
                        </Text>
                      </View>
                      <View style={styles.proposalVotingItemBackgroundLine}>
                        <View
                          style={{
                            ...styles.proposalVotingItemInnerLine,
                            backgroundColor: '#8463DF',
                            width: `${
                              (poll.poll.scores[i] * 100) /
                              poll.poll.scores_total
                            }%`,
                          }}
                        />
                      </View>
                    </View>
                  )
                })
              ) : null}
              {!loadingPoll && poll && poll.poll.quorum !== 0 && (
                <View style={styles.proposalVotingItemTextWrapper}>
                  <Text style={styles.proposalVotingItemText}>Quorum</Text>
                  <Text style={styles.proposalVotingItemText}>
                    {numeral(poll && poll.poll.scores_total).format('0[.]0a')}/
                    {numeral(poll && poll.poll.quorum).format('0[.]0a')}
                  </Text>
                </View>
              )}
            </View>
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
          <View>
            <EmojiTooltip
              setTooltipIsOpen={setTooltipIsOpen}
              tooltipIsOpen={tooltipIsOpen}
              content={
                <View style={styles.emojiReactionContentWrapper}>
                  {EmojiReactionsStore.emojis.map(emoji => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => handleEmojiClick(emoji.id)}
                        key={emoji.id}>
                        <Text style={styles.emojiReactionItem}>
                          {emoji.unicode}
                        </Text>
                      </TouchableWithoutFeedback>
                    )
                  })}
                </View>
              }>
              <View style={styles.chosenEmojiReaction}>
                {pickedEmojiId ? (
                  <Text style={{fontSize: normalize(20)}}>
                    {EmojiReactionsStore.getEmojiById(pickedEmojiId)
                      ?.unicode || <FavoriteIcon width={normalize(20)} />}
                  </Text>
                ) : (
                  <FavoriteIcon width={normalize(20)} />
                )}
              </View>
            </EmojiTooltip>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default observer(Proposal)
