import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  NativeScrollEvent,
} from 'react-native'
import {useLazyQuery, useQuery} from '@apollo/client'
import moment from 'moment'
import * as Sentry from '@sentry/react-native'

import {TDAO, TPoll, TProposal} from '../../types'
import {
  GET_DAO_DETAIL,
  GET_POLL,
  GET_PROPOSALS,
  handleHTTPError,
} from '../../services/api'
import {convertURIForLogo} from '../feed'

//components
import MarkdownText from '../../components/MarkdownText'
import Follow from '../../components/Follow'
import LoadingSpinner from '../../components/LoadingSpinner'

//styles
import styles from './styles'
import {candle, hammerAndWrench, postalHorn} from '../../constants/emojis'
import Proposal from '../../components/Proposal'
import portfolioStore from '../../services/stores/portfolio.store'

const overviewTab = 'Overview'
const tokenTab = 'Token'
const proposalsTab = 'Proposals'

function DAOScreen({route, navigation}: any) {
  const [dao, setDao] = React.useState<TDAO>()
  const [proposals, setProposals] = React.useState<TProposal[]>([])
  const [activeTab, setActiveTab] = React.useState<string>(proposalsTab)
  const [polls, setPolls] = React.useState<TPoll[]>([])
  const {userHasFollowedDaos, setPortfolio} = portfolioStore

  // states for pagination
  const [endCursor, setEndCursor] = React.useState<string>('')
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false)
  const [fetchMoreLoading, setFetchMoreLoading] = React.useState<boolean>(false)

  // filter proposals to show active first
  const filterProposals = (allProposals: TProposal[]) => {
    const active: TProposal[] = []
    const passed: TProposal[] = []

    allProposals.forEach(p =>
      new Date(p.endAt) < new Date() ? passed.push(p) : active.push(p),
    )
    setProposals(active.concat(passed))
  }

  const {loading} = useQuery(GET_DAO_DETAIL, {
    variables: {
      ids: [route.params.daoId],
      onlyMain: true,
    },
    onCompleted: res => {
      setDao(res.daosV2.edges[0].node)
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  const [getDaoProposals, {loading: loadingProposals, fetchMore}] =
    useLazyQuery(GET_PROPOSALS, {
      fetchPolicy: 'cache-and-network',
      onCompleted: res => {
        filterProposals(
          res.proposalsV2.edges.map((edge: {node: any}) => edge.node),
        )
        setEndCursor(res.proposalsV2.pageInfo.endCursor)
        setHasNextPage(res.proposalsV2.pageInfo.hasNextPage)
        setFetchMoreLoading(false)
      },
      onError: error => {
        Sentry.captureException(error)
        console.error(error)
        handleHTTPError()
      },
    })

  const {loading: loadingPoll, fetchMore: fetchMorePoll} = useQuery(GET_POLL, {
    variables: {first: 8, after: '', onlyFollowedDaos: userHasFollowedDaos},
    onCompleted: res => {
      setPolls(res.proposalsV2.edges.map((edge: {node: any}) => edge.node))
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  const openProposal = (proposal: TProposal) => {
    navigation.navigate('Proposal', {proposal})
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

  // when dao is ready get dao proposals
  React.useEffect(() => {
    dao &&
      getDaoProposals({variables: {first: 10, after: '', daoIds: [dao.id]}})
  }, [dao])

  return loading ? (
    <LoadingSpinner
      style={styles.loadingWrapperFullScreen}
      size="large"
      color="rgba(132, 99, 223, 1)"
    />
  ) : dao ? (
    <View style={styles.daoWrapper}>
      <View style={styles.daoInfoWrapper}>
        <View>
          <Image
            style={styles.daoImage}
            source={{uri: convertURIForLogo(dao.logo)}}
          />
        </View>
        <View style={styles.daoInfoTextWrapper}>
          <View style={styles.daoNameFollowButtonWrapper}>
            <View>
              <Text style={styles.daoName}>{dao.name}</Text>
            </View>
            <View>
              <Follow
                daoId={dao.id}
                userFollowed={dao.personalizedData.followed}
              />
            </View>
          </View>

          <View style={styles.daoInfoTextWrapperDetatil}>
            <View style={styles.daoInfoTextWrapperDetatilChild}>
              <Text style={styles.daoUserDetailText}>Shares</Text>
              <Text style={styles.daoUserDetailAmount}>
                {
                  +(
                    (dao.tokens[0].personalizedData.quantity /
                      dao.tokens[0].totalSupply) *
                    100
                  ).toFixed(3)
                }
                %
              </Text>
            </View>

            <View style={styles.daoInfoTextWrapperDetatilChild}>
              <Text style={styles.daoUserDetailText}>In your wallet:</Text>
              <Text style={styles.daoUserDetailAmount}>
                {+Number(dao.tokens[0].personalizedData.quantity).toFixed(2)}{' '}
                {dao.tokens[0].symbol}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.daoTabsWrapper}>
        <TouchableWithoutFeedback onPress={() => setActiveTab(proposalsTab)}>
          <View
            style={[
              styles.daoTabButton,
              activeTab === proposalsTab && styles.daoTabButtonActive,
            ]}>
            <Text
              style={[
                styles.daoTabText,
                activeTab === proposalsTab && styles.daoTabTextActive,
              ]}>
              Proposals
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActiveTab(overviewTab)}>
          <View
            style={[
              styles.daoTabButton,
              activeTab === overviewTab && styles.daoTabButtonActive,
            ]}>
            <Text
              style={[
                styles.daoTabText,
                activeTab === overviewTab && styles.daoTabTextActive,
              ]}>
              Overview
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActiveTab(tokenTab)}>
          <View
            style={[
              styles.daoTabButton,
              activeTab === tokenTab && styles.daoTabButtonActive,
            ]}>
            <Text
              style={[
                styles.daoTabText,
                activeTab === tokenTab && styles.daoTabTextActive,
              ]}>
              Token
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {activeTab === overviewTab ? (
        dao.overview ? (
          <ScrollView>
            <MarkdownText text={dao.overview} />
          </ScrollView>
        ) : (
          <View style={styles.emptyScreenWrapper}>
            <Text style={styles.emptyScreenEmoji}>{hammerAndWrench}</Text>
            <Text style={styles.emptyScreenTitle}>Overview is in progress</Text>
            <Text style={styles.emptyScreenText}>
              We're sorry, but an overview of this DAO is in the works. It will
              be published as soon as possible.
            </Text>
          </View>
        )
      ) : null}
      {activeTab === tokenTab ? (
        dao.tokenOverview ? (
          <ScrollView>
            <MarkdownText text={dao.tokenOverview} />
          </ScrollView>
        ) : (
          <View style={styles.emptyScreenWrapper}>
            <Text style={styles.emptyScreenEmoji}>{postalHorn}</Text>
            <Text style={styles.emptyScreenTitle}>No token data</Text>
            <Text style={styles.emptyScreenText}>
              We're sorry, but information about the token of this DAO is in the
              works. It will be published as soon as possible.
            </Text>
          </View>
        )
      ) : null}
      {activeTab === proposalsTab ? (
        loadingProposals ? (
          <LoadingSpinner
            style={styles.loadingWrapperFullScreen}
            size="small"
            color="rgba(132, 99, 223, 1)"
          />
        ) : proposals.length !== 0 ? (
          <ScrollView
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                if (hasNextPage) {
                  setFetchMoreLoading(true)
                  fetchMore({
                    variables: {first: 10, after: endCursor, daoIds: [dao.id]},
                  })
                }
              }
            }}
            scrollEventThrottle={400}>
            <View style={styles.daoProposalsWrapper}>
              {proposals.map((proposal, i) => {
                const poll = polls[i]

                return (
                  <Proposal
                    poll={poll}
                    proposal={proposal}
                    convertURIForLogo={convertURIForLogo}
                    key={proposal.id}
                    openDAODescription={() => {}}
                    openProposal={openProposal}
                    loadingPoll={loadingPoll}
                    isNotFeed={activeTab === proposalsTab}
                  />
                )
              })}
            </View>
            {fetchMoreLoading && (
              <LoadingSpinner
                style={styles.loadingSpinner}
                size="small"
                color="rgba(132, 99, 223, 1)"
              />
            )}
          </ScrollView>
        ) : (
          <View style={styles.emptyScreenWrapper}>
            <Text style={styles.emptyScreenEmoji}>{candle}</Text>
            <Text style={styles.emptyScreenTitle}>No proposals</Text>
            <Text style={styles.emptyScreenText}>
              We're sorry, but since we added this DAO there were no new
              proposals. As soon as there will be a new voting, a tl;dr of the
              proposal will appear here.
            </Text>
          </View>
        )
      ) : null}
    </View>
  ) : null
}

export default DAOScreen
