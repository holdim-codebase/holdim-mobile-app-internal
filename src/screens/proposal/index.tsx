import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import moment from 'moment'
import numeral from 'numeral'
import {useLazyQuery} from '@apollo/client'
import * as Sentry from '@sentry/react-native'

import {TPoll, TProposal} from '../../types'
import {GET_POLL, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'
import {openLinkInAppBrowser} from '../../components/MarkdownText'
import Link from '../../assets/images/svg/Link.svg'
import styles from './styles'
import {purple} from '../../constants/css'

import Snapshot from '../../assets/icons/snapshot.svg'
import Forum from '../../assets/icons/forum.svg'
import Play from '../../assets/icons/play.svg'
import Pause from '../../assets/icons/pause.svg'
import Person from '../../assets/icons/person.svg'
import GroupPerson from '../../assets/icons/groupperson.svg'

export const shortenAddress = (address: string) => {
  if (address.length <= 12) return address

  const start = address.slice(0, 6)
  const end = address.slice(address.length - 4, address.length)
  const result = start + '...' + end
  return result
}

function ProposalScreen({route, navigation}: any) {
  const [proposal] = React.useState<TProposal>(route.params.proposal)
  const [poll, setPoll] = React.useState<TPoll>(
    route.params.poll ? route.params.poll : null,
  )

  const [getPoll, {loading: loadingpoll}] = useLazyQuery(GET_POLL, {
    fetchPolicy: 'no-cache',
    onCompleted: res => {
      setPoll(res.proposalsV2.edges[0].node)
    },
    onError: error => {
      Sentry.captureException(error)
      handleHTTPError()
      console.error(error)
    },
  })

  const openFullProposal = (proposal: TProposal) => {
    navigation.navigate('FullProposal', {proposal})
  }

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  React.useEffect(() => {
    route.params.poll
      ? setPoll(route.params.poll)
      : getPoll({
          variables: {
            first: 1,
            after: '',
            onlyFollowedDaos: false,
            ids: [proposal.id],
          },
        })
  }, [proposal])

  return (
    <ScrollView style={styles.proposalWrapper}>
      {route.params.proposal ? (
        <View style={styles.proposalWrapper}>
          <TouchableOpacity onPress={() => openDAODescription(proposal.dao.id)}>
            <View style={styles.proposalTopSectionWrapper}>
              <Image
                style={styles.proposalIcon}
                source={{uri: convertURIForLogo(proposal.dao.logo)}}
              />
              <Text style={styles.proposalDaoTitle}>{proposal.dao.name}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.proposalTitle}>{proposal.title}</Text>
          <Text style={styles.proposalDescription}>TL:DR (AI translated)</Text>
          <Text style={styles.proposalDescription}>
            {proposal.middleDescription}
          </Text>
          <TouchableOpacity onPress={() => openFullProposal(proposal)}>
            <View style={styles.proposalButton}>
              <Text style={styles.proposalButtonText}>Read full version</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.proposalLinksButtonWrapper}>
            {proposal.snapshotLink ? (
              <TouchableWithoutFeedback
                onPress={() => openLinkInAppBrowser(proposal.snapshotLink)}>
                <View
                  style={
                    proposal.discussionLink
                      ? styles.proposalLinkButton
                      : styles.proposalLinkButtonAlone
                  }>
                  <View style={styles.proposalLinkSvg}>
                    <Snapshot />
                  </View>
                  <Text style={styles.proposalButtonLink}>
                    Vote on Snapshot
                  </Text>
                  
                </View>
              </TouchableWithoutFeedback>
            ) : null}
            {proposal.discussionLink ? (
              <TouchableWithoutFeedback
                onPress={() => openLinkInAppBrowser(proposal.discussionLink)}>
                <View
                  style={
                    proposal.snapshotLink
                      ? styles.proposalLinkButton
                      : styles.proposalLinkButtonAlone
                  }>
                  <View style={styles.proposalLinkSvg}>
                    <Forum />
                  </View>
                  <Text style={styles.proposalButtonLink}>Go to forum</Text>
                  
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
          <View style={styles.proposalMetaWrapper}>
            <View style={styles.proposalMeta}>
              <View style={styles.conentProposalMeta}>
                <View style={styles.proposalLinkSvg}>
                    <Play />
                </View>
                <Text style={styles.proposalMetaTitle}>Starts:</Text>
              </View>
              <Text style={styles.proposalMetaInfo}>
                {moment(new Date(proposal.startAt)).format(
                  'MMM DD, YYYY, HH:MM A',
                )}
              </Text>
            </View>
            <View style={styles.proposalMeta}>
              <View style={styles.conentProposalMeta}>
                <View style={styles.proposalLinkSvg}>
                    <Pause />
                </View>
                <Text style={styles.proposalMetaTitle}>Ends:</Text>
              </View>
              <Text style={styles.proposalMetaInfo}>
                {moment(new Date(proposal.endAt)).format(
                  'MMM DD, YYYY, HH:MM A',
                )}
              </Text>
            </View>
            <View style={styles.proposalMeta}>
              <View style={styles.conentProposalMeta}>
                <View style={styles.proposalLinkSvg}>
                    <Person />
                </View>
                <Text style={styles.proposalMetaTitle}>Author:</Text>
              </View>
              <Text style={styles.proposalMetaInfo}>
                {shortenAddress(proposal.author)}
              </Text>
            </View>
            <View style={styles.proposalMeta}>
              <View style={styles.conentProposalMeta}>
                <View style={styles.proposalLinkSvg}>
                    <GroupPerson />
                </View>
                <Text style={styles.proposalMetaTitle}>Total voters:</Text>
              </View>
              <Text style={styles.proposalMetaInfo}>
                {poll && poll.poll.votes}
              </Text>
            </View>
          </View>

          <View style={styles.proposalVotingWrapper}>
              {loadingpoll ? (
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

            {!loadingpoll && poll && poll.poll.quorum !== 0 && (
              <View style={styles.proposalVotingItemQuorum}>
                <Text style={styles.proposalVotingItemText}>Quorum</Text>
                <Text style={styles.proposalVotingItemText}>
                  {numeral(poll && poll.poll.scores_total).format('0[.]0a')} / {numeral(poll && poll.poll.quorum).format('0[.]0a')}
                </Text>
              </View>
            )}
        </View>
      ) : (
        <Text style={{color: 'white'}}>No</Text>
      )}
    </ScrollView>
  )
}

export default ProposalScreen
