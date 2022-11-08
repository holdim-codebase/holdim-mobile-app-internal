import * as React from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
  NativeScrollEvent,
  Alert
} from 'react-native'
import numeral from 'numeral'
import moment from 'moment'
import {useQuery} from '@apollo/client'
import * as Sentry from '@sentry/react-native'
import messaging from '@react-native-firebase/messaging'
import {useScrollToTop} from '@react-navigation/native'

import {TProposal, TPoll} from '../../types'
import {GET_POLL, GET_PROPOSALS, handleHTTPError, GET_EMOJIS} from '../../services/api'
import {requestUserNotificationPermission} from '../../services/firebase'
import EmojiReactionsStore from '../../services/stores/emojiReactions.store'
import styles from './styles'

import ActionIcon from '../../components/ActionIcon'
import EmojiTooltip from '../../components/EmojiTooltip'

import Share from '../../assets/icons/share.svg'
import Snapshot from '../../assets/icons/snapshot.svg'
import Favorite from '../../assets/icons/favorite_border.svg'
import {thumbsDown, thumbsUp, shit, partyPopper} from '../../constants/emojis'

export const convertURIForLogo = (logoURI: string) => {
  return logoURI.startsWith('ipfs://')
    ? logoURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
    : logoURI
}

function FeedScreen({navigation, route}: any) {
  const [refreshing, setRefreshing] = React.useState(false)
  const [proposals, setProposals] = React.useState<TProposal[]>([])
  const [polls, setPolls] = React.useState<TPoll[]>([])

  // states for pagination
  const [endCursor, setEndCursor] = React.useState<string>('')
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false)

  const scrollRef = React.useRef(null)

  const dateNow = new Date()

  const {
    loading: loadingProposals,
    fetchMore: fetchMoreProposals,
    refetch: refetchGetProposals,
  } = useQuery(GET_PROPOSALS, {
    // fetchPolicy: 'network-only',
    variables: {first: 8, after: '', onlyFollowedDaos: true},
    onCompleted: res => {
      setProposals(res.proposalsV2.edges.map((edge: {node: any}) => edge.node))
      setEndCursor(res.proposalsV2.pageInfo.endCursor)
      setHasNextPage(res.proposalsV2.pageInfo.hasNextPage)
      setRefreshing(false)
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  const {
    loading: loadingEmojis,
    fetchMore: fetchMoreEmojis,
    refetch: refetchGetEmojis,
  } = useQuery(GET_EMOJIS, {
    // fetchPolicy: 'network-only',
    // variables: {first: 2, after: ''},
    onCompleted: res => {
      EmojiReactionsStore.setEmojis(res.emojis)
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  // fetch poll separately from proposals
  // because can get more time due to getting data from another server
  const {loading: loadingPoll, fetchMore: fetchMorePoll} = useQuery(GET_POLL, {
    variables: {first: 8, after: '', onlyFollowedDaos: true},
    onCompleted: res => {
      setPolls(res.proposalsV2.edges.map((edge: {node: any}) => edge.node))
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  const openProposal = (proposal: TProposal, poll?: TPoll) => {
    navigation.navigate('Proposal', {proposal, poll})
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetchGetProposals({first: 8, after: '', onlyFollowedDaos: true})
  }

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 900
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  // IOS
  // Request user permission for notification
  React.useEffect(() => {
    messaging.AuthorizationStatus.NOT_DETERMINED === -1
      ? requestUserNotificationPermission()
      : null
  }, [])

  useScrollToTop(scrollRef)

  return (
    <ScrollView
      style={styles.feedWrapper}
      refreshControl={
        <RefreshControl
          refreshing={refreshing || loadingProposals}
          onRefresh={onRefresh}
          tintColor={'white'}
          titleColor={'#8463DF'}
          colors={['#8463DF']}
          progressBackgroundColor={'white'}
        />
      }
      ref={scrollRef}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          if (hasNextPage) {
            fetchMoreProposals({
              variables: {first: 8, after: endCursor, onlyFollowedDaos: true},
            })
            fetchMorePoll({
              variables: {first: 8, after: endCursor, onlyFollowedDaos: true},
            })
          }
        }
      }}
      scrollEventThrottle={400}>
      {loadingProposals || refreshing
        ? null
        : proposals &&
          proposals.map((item: TProposal, i: number) => {
            const poll = polls[i]
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => openProposal(item, poll)}>
                <View style={styles.proposalWrapper}>
                <View style={styles.proposalWrapperTop}>
                  <View style={styles.proposalImageWrapper}>
                    <TouchableWithoutFeedback
                      onPress={() => openDAODescription(item.dao.id)}>
                      <Image
                        source={{
                          uri: convertURIForLogo(item.dao.logo),
                        }}
                        style={styles.proposalImage}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.proposalContentWrapper}>
                    <TouchableWithoutFeedback
                      onPress={() => openDAODescription(item.dao.id)}>
                      <Text style={styles.proposalTitle}>{item.dao.name}</Text>
                    </TouchableWithoutFeedback>
                    <Text style={styles.proposalDescription}>
                      {item.juniorDescription}
                    </Text>
                    <Text style={styles.proposalEndTime}>
                      {dateNow > new Date(item.endAt)
                        ? 'Ends:'
                        : 'Voting ended on'}{' '}
                      {moment(new Date(item.endAt)).format(
                        'MMM DD, YYYY, HH:MM A',
                      )}
                    </Text>
                    <View style={styles.proposalVotingWrapper}>
                      {loadingPoll ? (
                        <View style={styles.loadingWrapper}>
                          <ActivityIndicator size="large" color="#8463DF" />
                        </View>
                      ) : poll &&
                        poll.poll.choices &&
                        poll.poll.choices.length !== 0 ? (
                        poll.poll.choices.map(
                          (choiceTitle: string, i: number) => {
                            return (
                              <View
                                key={i}
                                style={styles.proposalVotingItemWrapper}>
                                <View
                                  style={styles.proposalVotingItemTextWrapper}>
                                  <Text style={styles.proposalVotingItemText}>
                                    {choiceTitle}
                                  </Text>
                                  <Text style={styles.proposalVotingItemText}>
                                    {numeral(poll.poll.scores[i]).format(
                                      '0[.]0a',
                                    )}{' '}
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
                                <View
                                  style={
                                    styles.proposalVotingItemBackgroundLine
                                  }>
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
                          },
                        )
                      ) : null}
                      {!loadingPoll && poll && poll.poll.quorum !== 0 && (
                        <View style={styles.proposalVotingItemTextWrapper}>
                          <Text style={styles.proposalVotingItemText}>
                            Quorum
                          </Text>
                          <Text style={styles.proposalVotingItemText}>
                            {numeral(poll && poll.poll.scores_total).format(
                              '0[.]0a',
                            )}
                            /
                            {numeral(poll && poll.poll.quorum).format('0[.]0a')}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                  <View style={styles.proposalWrapperBottom}>
                    <View style={styles.proposalActionsWrapper}>
                      <ActionIcon icon={<Share width={20}/>} onPress={() => Alert.alert('pizda')} size={20}/>
                      <ActionIcon icon={<Snapshot width={20}/>} onPress={() => Alert.alert('pizda')} size={20}/>
                    </View>
                    <View>
                      <EmojiTooltip content={
                        <View style={styles.emojiReactionContentWrapper}>
                          {EmojiReactionsStore.mappedEmojis.map(emoji => {
                            return (
                              <TouchableWithoutFeedback onPress={() => EmojiReactionsStore.pickEmoji(emoji.id)}>
                                <Text style={styles.emojiReactionItem}>{emoji.unicode}</Text>
                              </TouchableWithoutFeedback>
                            )
                          })}
                        </View>
                      }>
                        <View style={styles.chosenEmojiReaction}>
                          <Favorite width={20} />
                        </View>
                      </EmojiTooltip>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
    </ScrollView>
  )
}

export default FeedScreen
