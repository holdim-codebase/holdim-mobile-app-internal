import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import {useQuery} from '@apollo/client'
import * as Sentry from '@sentry/react-native'

import {TUser, TWallet} from '../../types'
import {GET_USER_INFO, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'
import styles from './styles'
import {shortenAddress} from '../proposal'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const validateUserTokens = (quantity: number) => {
  if (quantity >= 0.01 || quantity === 0) {
    return +Number(quantity).toFixed(2)
  }
  return '0'
}

function ProfileScreen({navigation, route}: any) {
  const [portfolio, setPortfolio] = React.useState<TUser>()
  const [activeWallet, setActiveWallet] = React.useState<TWallet>()
  const [activeWalletId, setActiveWalletId] = React.useState<string | null>('')
  const [refreshing, setRefreshing] = React.useState(false)

  const {refetch: refetchUserData} = useQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
    variables: {tokensOnlyMain2: true},
    onCompleted: res => {
      setPortfolio(res.me)
      setRefreshing(false)
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
    setRefreshing(true)
    refetchUserData({tokensOnlyMain2: true})
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
    if (portfolio) {
      const w = portfolio.wallets.find(w => w.id === activeWalletId)
      setActiveWallet(w)
    }
  }, [portfolio, activeWalletId])

  React.useEffect(() => {
    if (route.params && route.params.refetch === true) {
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {portfolio && (
        <View>
          <View style={styles.profileInfoWrapper}>
            <Image
              style={styles.profileImage}
              source={{uri: portfolio.avatarUrl}}
            />
            <View style={styles.profileInfoTextWrapper}>
              <Text style={styles.profileName}>
                {activeWallet && activeWallet.ens
                  ? shortenAddress(activeWallet.ens)
                  : activeWallet && activeWallet.address
                  ? shortenAddress(activeWallet.address)
                  : null}
              </Text>
              <Text style={styles.profilePortfolioAmount}>
                You govern: {portfolio.followedDaos.length} DAOs
              </Text>
            </View>
          </View>
          <ScrollView style={styles.portfolioWrapper}>
            <Text style={styles.portfolioTitle}>Followed</Text>
            <View style={styles.portfolioDaoListWrapper}>
              {portfolio.followedDaos.map(followedDao => (
                <TouchableOpacity
                  key={followedDao.id}
                  onPress={() => openDAODescription(followedDao.id)}>
                  <View style={styles.portfolioDaoWrapper}>
                    <View style={styles.assetLeft}>
                      <Image
                        style={styles.assetImage}
                        source={{uri: convertURIForLogo(followedDao.logo)}}
                      />
                      <View style={styles.assetTextWrapper}>
                        <Text style={styles.assetTitle}>
                          {followedDao.name}
                        </Text>
                        <Text style={styles.assetShareText}>
                          <Text style={styles.assetShareAmount}>
                            {followedDao
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
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </ScrollView>
  )
}

export default ProfileScreen
