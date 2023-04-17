import * as React from 'react'
import {ScrollView, RefreshControl, NativeScrollEvent} from 'react-native'
import {useQuery} from '@apollo/client'
import * as Sentry from '@sentry/react-native'
import messaging from '@react-native-firebase/messaging'
import {useScrollToTop} from '@react-navigation/native'
import {observer} from 'mobx-react'
import normalize from 'react-native-normalize'

import {TProposal, TPoll} from '../../types'
import {
  GET_POLL,
  GET_PROPOSALS,
  handleHTTPError,
  GET_EMOJIS,
  GET_USER_INFO,
} from '../../services/api'
import {requestUserNotificationPermission, NotificationTopic} from '../../services/firebase'
import EmojiReactionsStore from '../../services/stores/emojiReactions.store'
import PortfolioStore from '../../services/stores/portfolio.store'
import LoadingSpinner from '../../components/LoadingSpinner'
import TextInfo from '../../components/TextInfo'
import Proposal from './feedProposal'

import styles from './styles'
import {purple} from '../../constants/css'
import {convertUriToLogo} from '../../utils/convertUriToLogo'
import NewDaoNotificationModal from '../notification/NewDaoNotification'

function FeedScreen({navigation, route}: any) {
  const [refreshing, setRefreshing] = React.useState(false)
  // TODO: add setShowNewDaoNotificationModal(true) to show modal
  const [showNewDaoNotificationModal, setShowNewDaoNotificationModal] =
    React.useState(false)
  const [newDaos, setNewDaos] = React.useState<string[]>([])
  const [proposals, setProposals] = React.useState<TProposal[]>([])
  const [polls, setPolls] = React.useState<TPoll[]>([])

  // states for pagination
  const [endCursor, setEndCursor] = React.useState<string>('')
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false)
  const [fetchMoreLoading, setFetchMoreLoading] = React.useState<boolean>(false)
  const {userHasFollowedDaos, setPortfolio} = PortfolioStore

  React.useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage.data && remoteMessage.data.topic === NotificationTopic.newDaos) {
        setNewDaos(remoteMessage.data.daos.split(','))
        setShowNewDaoNotificationModal(true)
    }
  })
  }, [])

  const scrollRef = React.useRef(null)

  const {loading: loadingUserInfo} = useQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
    variables: {tokensOnlyMain2: true},
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setPortfolio(res.me)
      messaging.AuthorizationStatus.NOT_DETERMINED === -1
        ? requestUserNotificationPermission(res.me.id)
        : null
    },
    onError: error => {
      Sentry.captureException(error)
      handleHTTPError()
      console.error(error)
    },
  })

  const {loading: loadingProposals, fetchMore: fetchMoreProposals} = useQuery(
    GET_PROPOSALS,
    {
      variables: {first: 8, after: '', onlyFollowedDaos: userHasFollowedDaos},
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
    variables: {first: 8, after: '', onlyFollowedDaos: userHasFollowedDaos},
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
      variables: {
        first: 8,
        after: endCursor,
        onlyFollowedDaos: userHasFollowedDaos,
      },
    })
    fetchMorePoll({
      variables: {
        first: 8,
        after: endCursor,
        onlyFollowedDaos: userHasFollowedDaos,
      },
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

  useScrollToTop(scrollRef)

  return (
    <ScrollView
      style={styles.feedWrapper}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'white'}
          titleColor={purple}
          colors={[purple]}
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
              variables: {
                first: 8,
                after: endCursor,
                onlyFollowedDaos: userHasFollowedDaos,
              },
            })
            fetchMorePoll({
              variables: {
                first: 8,
                after: endCursor,
                onlyFollowedDaos: userHasFollowedDaos,
              },
            })
          }
        }
      }}
      scrollEventThrottle={400}>
      {!userHasFollowedDaos && !loadingUserInfo && (
        <TextInfo
          text="Currently you are not following any DAO. Customise your feed by liking the projects you want to see in your feed."
          wrapperStyle={{
            marginHorizontal: normalize(17),
            marginTop: normalize(25),
          }}
        />
      )}
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
              convertURIToLogo={convertUriToLogo}
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
      {showNewDaoNotificationModal && (
        // TODO: send daoIds from notification
        <NewDaoNotificationModal
          isModalVisible={showNewDaoNotificationModal}
          setModalVisible={e => setShowNewDaoNotificationModal(false)}
          daoIds={newDaos}
        />
      )}
    </ScrollView>
  )
}

export default observer(FeedScreen)
