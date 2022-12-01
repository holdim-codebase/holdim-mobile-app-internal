import * as React from 'react'
import {ScrollView, RefreshControl, NativeScrollEvent} from 'react-native'
import {useQuery} from '@apollo/client'
import * as Sentry from '@sentry/react-native'
import messaging from '@react-native-firebase/messaging'
import {useScrollToTop} from '@react-navigation/native'

import {TProposal, TPoll} from '../../types'
import {
  GET_POLL,
  GET_PROPOSALS,
  handleHTTPError,
  GET_EMOJIS,
} from '../../services/api'
import {requestUserNotificationPermission} from '../../services/firebase'
import EmojiReactionsStore from '../../services/stores/emojiReactions.store'
import LoadingSpinner from '../../components/LoadingSpinner'
import Proposal from './feedProposal'
import styles from './styles'

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
  const [fetchMoreLoading, setFetchMoreLoading] = React.useState<boolean>(false)

  const scrollRef = React.useRef(null)

  const {loading: loadingProposals, fetchMore: fetchMoreProposals} = useQuery(
    GET_PROPOSALS,
    {
      variables: {first: 8, after: '', onlyFollowedDaos: true},
      onCompleted: res => {
        setProposals(
          res.proposalsV2.edges.map((edge: {node: any}) => edge.node),
        )
        setEndCursor(res.proposalsV2.pageInfo.endCursor)
        setHasNextPage(res.proposalsV2.pageInfo.hasNextPage)
        setRefreshing(false)
        setFetchMoreLoading(false)
      },
      onError: error => {
        Sentry.captureException(error)
        console.error(error)
        handleHTTPError()
      },
    },
  )

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
      setFetchMoreLoading(false)
      setRefreshing(false)
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
    setFetchMoreLoading(false)

    // TODO change to refetch, but there are
    // bug in apollo client library: refetch is not update cache,
    // and no data is returning
    // problem with fetch - returning data depends on endCursor
    fetchMoreProposals({
      variables: {first: 8, after: endCursor, onlyFollowedDaos: true},
    })
    fetchMorePoll({
      variables: {first: 8, after: endCursor, onlyFollowedDaos: true},
    })
  }

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    let paddingToBottom = 30
    paddingToBottom += layoutMeasurement.height

    return contentOffset.y >= contentSize.height - paddingToBottom
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
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'white'}
          titleColor={'#8463DF'}
          colors={['#8463DF']}
          progressBackgroundColor={'white'}
        />
      }
      ref={scrollRef}
      indicatorStyle="white"
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent) && !refreshing) {
          if (hasNextPage) {
            setFetchMoreLoading(true)
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
      {loadingProposals && !refreshing ? (
        <LoadingSpinner
          style={styles.loadingWrapperFullScreen}
          size="large"
          color="rgba(132, 99, 223, 1)"
        />
      ) : (
        proposals &&
        proposals.map((item: TProposal, i: number) => {
          const poll = polls[i]
          return (
            <Proposal
              poll={poll}
              proposal={item}
              loadingPoll={loadingPoll}
              openProposal={openProposal}
              openDAODescription={openDAODescription}
              convertURIForLogo={convertURIForLogo}
              key={item.id}
            />
          )
        })
      )}
      {fetchMoreLoading && (
        <LoadingSpinner
          style={styles.loadingSpinner}
          size="small"
          color="rgba(132, 99, 223, 1)"
        />
      )}
    </ScrollView>
  )
}

export default FeedScreen
