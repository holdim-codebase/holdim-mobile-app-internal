import * as React from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useLazyQuery, useQuery} from '@apollo/client'
import * as Sentry from '@sentry/react-native'

import {
  GET_DAO_LIST,
  GET_TOTAL_COUNT_OF_DAOS,
  handleHTTPError,
} from '../../services/api'
import {TDAO} from '../../types'
import {convertURIForLogo} from '../feed'

// components
import Follow from '../../components/Follow'
import LoadingSpinner from '../../components/LoadingSpinner'

// styles
import styles from './styles'
import {purple} from '../../constants/css'
import TextInfo from '../../components/TextInfo'

const WelcomeScreen = ({navigation}: any) => {
  const [followedDaoList, setFollowedDaoList] = React.useState<TDAO[]>([])
  const [notFollowedDaoList, setNotFollowedDaoList] = React.useState<TDAO[]>([])

  const [totalCountOfDaos, setTotalCountOfDaos] = React.useState<number>()
  const [firstLoading, setFirstLoading] = React.useState<boolean>(false)

  const filterAllDaos = (daos: TDAO[]) => {
    const followedDaos: TDAO[] = []
    const notFollowedDaos: TDAO[] = []

    daos.forEach(dao =>
      dao.personalizedData.followed
        ? followedDaos.push(dao)
        : notFollowedDaos.push(dao),
    )

    setFollowedDaoList(followedDaos)
    setNotFollowedDaoList(notFollowedDaos)
    setFirstLoading(false)
  }

  const [getDaoList, {loading: refetchLoading}] = useLazyQuery(GET_DAO_LIST, {
    fetchPolicy: 'network-only',
    onCompleted: res => {
      filterAllDaos(res.daosV2.edges.map((edge: {node: any}) => edge.node))
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  useQuery(GET_TOTAL_COUNT_OF_DAOS, {
    variables: {
      onlyFollowed: false,
    },
    onCompleted: res => {
      setFirstLoading(true)
      setTotalCountOfDaos(res.daosV2.totalCount)
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  React.useEffect(() => {
    totalCountOfDaos &&
      getDaoList({
        variables: {
          first: totalCountOfDaos,
          after: '',
          onlyFollowed: false,
        },
      })
  }, [totalCountOfDaos])

  return (
    <View style={styles.welcomeWrapper}>
      <View style={styles.welcomeStatusBar} />
      <View style={styles.welcomeFeedWrapper}>
        <Text style={styles.welcomeFeedText}>Feed</Text>
      </View>
      <ScrollView style={styles.welcomeContentWrapper}>
        <View style={styles.welcomeTextWrapper}>
          <Text style={styles.welcomeTitle}>Welcome to Holdim 🔮</Text>
          <Text style={styles.welcomeText}>
            We wanted to make it easy, so you automatically follow projects you
            have tokens in your wallet.{' '}
          </Text>
          <Text> </Text>
          <Text style={[styles.welcomeText, {fontStyle: 'italic'}]}>
            {'But if don’t want, you can always stop following them'}
          </Text>
        </View>
        {firstLoading ? (
          <LoadingSpinner
            style={styles.loadingWrapperFullScreen}
            size="large"
            color="rgba(132, 99, 223, 1)"
          />
        ) : (
          <View>
            <Text style={styles.welcomeProjectsListTitle}>
              Projects you are following
            </Text>
            <View style={styles.welcomeProjectsListWrapper}>
              {refetchLoading ? (
                <LoadingSpinner
                  style={styles.loadingWrapperFullScreen}
                  size="small"
                  color="rgba(132, 99, 223, 1)"
                />
              ) : followedDaoList.length !== 0 ? (
                followedDaoList.map((followedDao, index) => {
                  return (
                    <View key={index} style={styles.welcomeProjectWrapper}>
                      <View style={styles.welcomeDaoLogoTextWrapper}>
                        <Image
                          style={styles.welcomeDaoImage}
                          source={{uri: convertURIForLogo(followedDao.logo)}}
                        />
                        <View style={styles.welcomeDaoTextWrapper}>
                          <Text style={styles.welcomeDaoTitle}>
                            {followedDao.name}
                          </Text>
                          <Text style={styles.welcomeDaoShareText}>
                            <Text style={styles.welcomeDaoShareAmount}>
                              {(
                                (+followedDao.tokens[0].personalizedData
                                  .quantity /
                                  followedDao.tokens[0].totalSupply) *
                                100
                              ).toFixed(3)}
                              %
                            </Text>{' '}
                            shares
                          </Text>
                        </View>
                      </View>
                      <View style={styles.welcomeDaoFollowSvg}>
                        <Follow
                          welcomeScreen={true}
                          daoId={followedDao.id}
                          userFollowed={true}
                        />
                      </View>
                    </View>
                  )
                })
              ) : (
                <TextInfo text="Unfortunately, we did not find any projects in your wallet. Please select at least one project below to continue." />
              )}
            </View>
          </View>
        )}
        {notFollowedDaoList.length !== 0 ? (
          <View>
            <Text style={styles.welcomeProjectsListTitle}>
              Maybe interesting for you to follow
            </Text>
            <View style={styles.welcomeProjectsListWrapper}>
              {refetchLoading ? (
                <LoadingSpinner
                  style={styles.loadingWrapperFullScreen}
                  size="small"
                  color="rgba(132, 99, 223, 1)"
                />
              ) : (
                notFollowedDaoList.map((notFollowedDao, index) => {
                  return (
                    <View key={index} style={styles.welcomeProjectWrapper}>
                      <View style={styles.welcomeDaoLogoTextWrapper}>
                        <Image
                          style={styles.welcomeDaoImage}
                          source={{uri: convertURIForLogo(notFollowedDao.logo)}}
                        />
                        <View style={styles.welcomeDaoTextWrapper}>
                          <Text style={styles.welcomeDaoTitle}>
                            {notFollowedDao.name}
                          </Text>
                          {notFollowedDao.tokens &&
                          notFollowedDao.tokens.length ? (
                            <Text style={styles.welcomeDaoPrice}>
                              {notFollowedDao.tokens[0].symbol} |{' '}
                              {
                                +Number(notFollowedDao.tokens[0].price).toFixed(
                                  2,
                                )
                              }{' '}
                              USD
                            </Text>
                          ) : null}
                        </View>
                      </View>
                      <View style={styles.welcomeDaoFollowSvg}>
                        <Follow
                          welcomeScreen={true}
                          daoId={notFollowedDao.id}
                          userFollowed={false}
                        />
                      </View>
                    </View>
                  )
                })
              )}
            </View>
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.welcomeBtnContinueWrapper}>
        <TouchableOpacity
          style={[
            styles.welcomeBtnContinue,
            followedDaoList.length === 0
              ? styles.welcomeBtnContinueDisabled
              : null,
          ]}
          disabled={followedDaoList.length === 0 ? true : false}
          onPress={() => navigation.navigate('MainScreen')}>
          <Text style={styles.welcomeBtnContinueTitle}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WelcomeScreen
