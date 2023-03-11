import * as React from 'react'
import * as Sentry from '@sentry/react-native'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native'
import {NetworkStatus, useQuery} from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {observer} from 'mobx-react'
import normalize from 'react-native-normalize'

import PortfolioStore from '../../services/stores/portfolio.store'
import {TUser, TWallet} from '../../types'
import {
  client,
  GET_POLL,
  GET_PROPOSALS,
  GET_USER_INFO,
  handleHTTPError,
} from '../../services/api'
import {shortenAddress} from '../proposal'
import LoadingSpinner from '../../components/LoadingSpinner'
import styles from './styles'
import {purple} from '../../constants/css'
import {convertUriToLogo} from '../../utils/convertUriToLogo'

export const validateUserTokens = (quantity: number) => {
  if (quantity >= 0.01 || quantity === 0) {
    return +Number(quantity).toFixed(2)
  }
  return '0'
}

function ProfileScreen({navigation, route}: any) {
  const [activeWallet, setActiveWallet] = React.useState<TWallet>()
  const [activeWalletId, setActiveWalletId] = React.useState<string | null>('')
  const {portfolio, setPortfolio} = PortfolioStore

  const {
    refetch: refetchUserData,
    loading,
    networkStatus,
  } = useQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
    variables: {tokensOnlyMain2: true},
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setPortfolio(res.me)
    },
    onError: error => {
      Sentry.captureException(error)
      handleHTTPError()
      console.error(error)
    },
  })

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  const onRefresh = () => {
    refetchUserData()
  }

  const validateUserTokens = (quantity: number) => {
    if (quantity >= 0.01 || quantity === 0) {
      return +Number(quantity).toFixed(2)
    }
    return '0'
  }

  const validateUserUSD = (price: number, quantity: number) => {
    if (price * quantity >= 0.01) {
      return +Number(price * quantity).toFixed(2)
    } else if (price * quantity === 0) {
      return '0'
    }
    return '< 0.01'
  }

  React.useEffect(() => {
    if (portfolio && portfolio.wallets.length !== 0) {
      const w = portfolio.wallets.find(w => w.id === activeWalletId)
      setActiveWallet(w)
    }
  }, [portfolio, activeWalletId])

  React.useEffect(() => {
    if (route.params && route.params.refetch === true) {
      client.refetchQueries({include: [GET_PROPOSALS, GET_POLL]})
      refetchUserData()
      getActiveWalletId()
    }
  }, [route.params])

  const getActiveWalletId = async () => {
    const walletId = await AsyncStorage.getItem('wallet-id')
    setActiveWalletId(walletId)
  }

  React.useEffect(() => {
    getActiveWalletId()
  }, [])

  return (
    <ScrollView
      style={styles.profileWrapper}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }>
      {loading || networkStatus === NetworkStatus.refetch ? (
        <LoadingSpinner
          style={styles.loadingWrapper}
          size="large"
          color={purple}
        />
      ) : (
        portfolio && (
          <View>
            <View style={styles.profileInfoWrapper}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: activeWallet
                    ? `https://cdn.stamp.fyi/avatar/${
                        activeWallet.address
                      }?s=${normalize(80)}`
                    : portfolio.avatarUrl,
                }}
              />
              <View style={styles.profileInfoTextWrapper}>
                <Text style={styles.profileName}>
                  {activeWallet && activeWallet.ens
                    ? shortenAddress(activeWallet.ens).toLowerCase()
                    : activeWallet && activeWallet.address
                    ? shortenAddress(activeWallet.address)
                    : null}
                </Text>
                <Text style={styles.profilePortfolioAmount}>
                  You follow: {portfolio.followedDaos.length} DAOs
                </Text>
              </View>
            </View>
            <ScrollView style={styles.portfolioWrapper}>
              <Text style={styles.portfolioTitle}>Following</Text>
              <View style={styles.portfolioDaoListWrapper}>
                {portfolio.followedDaos.map(followedDao => (
                  <TouchableWithoutFeedback
                    key={followedDao.id}
                    onPress={() => openDAODescription(followedDao.id)}>
                    <View style={styles.portfolioDaoWrapper}>
                      <View style={styles.assetLeft}>
                        <Image
                          style={styles.assetImage}
                          source={{uri: convertUriToLogo(followedDao.logo)}}
                        />
                        <View style={styles.assetTextWrapper}>
                          <Text style={styles.assetTitle}>
                            {followedDao.name}
                          </Text>
                          <Text style={styles.assetShareText}>
                            <Text style={styles.assetShareAmount}>
                              {followedDao && followedDao.tokens.length !== 0
                                ? (
                                    (+followedDao.tokens[0].personalizedData
                                      .quantity /
                                      followedDao.tokens[0].totalSupply) *
                                    100
                                  ).toFixed(3)
                                : null}
                              %
                            </Text>{' '}
                            shares
                          </Text>
                        </View>
                      </View>
                      <View style={styles.assetRight}>
                        <Text style={styles.assetAmountText}>
                          <Text style={styles.assetAmountNumber}>
                            {validateUserTokens(
                              Number(
                                followedDao.tokens[0].personalizedData.quantity,
                              ),
                            )}
                          </Text>{' '}
                          {followedDao.tokens[0].symbol}
                        </Text>
                        <Text style={styles.assetDaoPrice}>
                          {validateUserUSD(
                            Number(followedDao.tokens[0].price),
                            Number(
                              followedDao.tokens[0].personalizedData.quantity,
                            ),
                          )}{' '}
                          USD
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </ScrollView>
          </View>
        )
      )}
    </ScrollView>
  )
}

export default observer(ProfileScreen)
