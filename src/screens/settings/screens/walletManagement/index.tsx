import * as React from 'react'
import * as Sentry from '@sentry/react-native'
import {useMutation, useQuery} from '@apollo/client/react/hooks'
import auth from '@react-native-firebase/auth'
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {ScrollView} from 'react-native-gesture-handler'

import {TWallet} from '../../../../types'
import {
  client,
  DELETE_WALLET,
  GET_USER_WALLETS,
  handleHTTPError,
} from '../../../../services/api'
import {shortenAddress} from '../../../proposal'
import {UserContext} from '../../../../../App'
import {done, wasteBasket} from '../../../../constants/emojis'

// components
import ArrowBack from '../../../../assets/images/svg/ArrowBackV2.svg'
import DeleteSvg from '../../../../assets/images/svg/Delete.svg'
import styles from './styles'
import {purple} from '../../../../constants/css'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import CustomModal from '../../../../components/CustomModal'
import AddWalletModal from '../../../../components/AddWalletModal'

// TODO move to store
function WalletManagementScreen({navigation}: any) {
  const [userWallets, setUserWallets] = React.useState<TWallet[]>([])
  const [userAvatar, setUserAvatar] = React.useState<string>()
  const [activeWalletId, setActiveWalletId] = React.useState<string | null>('')
  const [walletIdToDelete, setWalletIdToDelete] = React.useState<string>('')
  const [deletingActiveWallet, setDeletingActiveWallet] =
    React.useState<boolean>(false)
  const [modalVisible, setModalVisible] = React.useState<boolean>(false)
  const [lastWalletDeleteModalVisible, setLastWalletDeleteModalVisible] =
    React.useState<boolean>(false)
  const [addWalletModal, setAddWalletModal] = React.useState<boolean>(false)
  const [isLastWallet, setIsLastWallet] = React.useState<boolean>(false)

  const {setWalletId} = React.useContext(UserContext)

  let swipeableRefs: Array<any> = []
  let prevOpenedSwipeableRow: any
  let openedSwipeableRow: any

  const {loading: laodingWallets, refetch: refetchUserWallets} = useQuery(
    GET_USER_WALLETS,
    {
      onCompleted: res => {
        setUserWallets(res.me.wallets)
        setUserAvatar(res.me.avatarUrl)
      },
      onError: error => {
        Sentry.captureException(error)
        console.error(error)
        handleHTTPError()
      },
    },
  )

  const [deleteWallet] = useMutation(DELETE_WALLET, {
    onCompleted: data => {
      if (deletingActiveWallet) {
        const w = userWallets.find(w => w.id !== activeWalletId)
        if (w) {
          AsyncStorage.setItem('wallet-id', w.id)
          setActiveWalletId(w.id)
        }
      } else {
        activeWalletId && AsyncStorage.setItem('wallet-id', activeWalletId)
      }
      refetchUserWallets()
      navigation.navigate('StateScreen', {
        emoji: done,
        title: 'Wallet was deleted',
        description:
          'Wallet deletion was successful. However, you can always return it to the application by simply registering it as new.',
        navigateScreenAfterClose: 'WalletManagement',
      })
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
  })

  const startDeleteWallet = (walletId: string) => {
    if (userWallets.length !== 1) {
      walletId === activeWalletId
        ? setDeletingActiveWallet(true)
        : AsyncStorage.setItem('wallet-id', walletId)
      deleteWallet()
    }
  }

  const deleteLastWallet = () => {
    AsyncStorage.removeItem('wallet-id')
    AsyncStorage.removeItem('userLoggedIn')
    client.clearStore()
    console.log({currentUser: auth().currentUser})
    auth().currentUser &&
      auth()
        .signOut()
        .then(() => {
          console.log('User signed out!')
          setWalletId('')
        })
        .catch(e => console.log(e))
  }

  const getActiveWalletId = async () => {
    const walletId = await AsyncStorage.getItem('wallet-id')
    setActiveWalletId(walletId)
  }

  React.useEffect(() => {
    getActiveWalletId()
  }, [])

  React.useEffect(() => {
    userWallets.length === 1 ? setIsLastWallet(true) : setIsLastWallet(false)
  }, [userWallets])

  const closePrevOpenedSwipeable = () => {
    if (
      prevOpenedSwipeableRow &&
      prevOpenedSwipeableRow.current !== openedSwipeableRow
    ) {
      prevOpenedSwipeableRow.close()
    }
  }

  const RightSwipeActions = (walletId: string) => {
    return (
      <View style={styles.walletSwipeBlockWrapper}>
        {/* <TouchableOpacity
          onPress={onRenamePress}
          style={styles.walletSwipeBlock}>
          <RenameSvg />
          <Text style={styles.walletSwipeBlockText}>Rename</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            isLastWallet
              ? setLastWalletDeleteModalVisible(true)
              : setModalVisible(true)
            setWalletIdToDelete(walletId)
          }}
          style={styles.walletSwipeBlock}>
          <DeleteSvg />
          <Text style={styles.walletSwipeBlockText}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.walletManagementWrapper}>
      <View style={styles.walletManagementStatusBar} />
      <View style={styles.walletManagementStatusBarWrapper}>
        <View>
          <TouchableOpacity
            style={styles.walletManagementStatusBarArrow}
            onPress={() => navigation.navigate('Settings')}>
            <ArrowBack />
          </TouchableOpacity>
        </View>
        <Text style={styles.walletManagementStatusBarText}>
          Wallet management
        </Text>
      </View>
      <ScrollView
        style={styles.walletManagementContentWrapper}
        onTouchEnd={() => closePrevOpenedSwipeable()}>
        {laodingWallets ? (
          <LoadingSpinner
            style={styles.loadingWrapperFullScreen}
            size="large"
            color={purple}
          />
        ) : userWallets.length !== 0 ? (
          userWallets.map((wallet, i) => (
            <Swipeable
              renderRightActions={() => RightSwipeActions(wallet.id)}
              key={i}
              ref={ref => (swipeableRefs[i] = ref)}
              onSwipeableWillOpen={() => {
                openedSwipeableRow = swipeableRefs[i]
                closePrevOpenedSwipeable()
                prevOpenedSwipeableRow = swipeableRefs[i]
              }}
              onSwipeableClose={() => {
                if (
                  prevOpenedSwipeableRow &&
                  prevOpenedSwipeableRow === swipeableRefs[i]
                ) {
                  prevOpenedSwipeableRow = undefined
                }
              }}>
              <Pressable
                style={[
                  styles.walletWrapper,
                  activeWalletId === wallet.id
                    ? styles.activeWalletWrapper
                    : null,
                ]}
                onPress={() => {
                  setActiveWalletId(wallet.id)
                  AsyncStorage.setItem('wallet-id', wallet.id)
                }}>
                <View style={styles.walletTopSectionWrapper}>
                  <View style={styles.walletImageAddressSection}>
                    <Image
                      style={styles.walletImage}
                      source={{uri: userAvatar}}
                    />
                    <Text style={styles.walletAddressTitle}>
                      {wallet.ens
                        ? shortenAddress(wallet.ens).toLowerCase()
                        : shortenAddress(wallet.address)}
                    </Text>
                  </View>
                </View>
                <View style={styles.walletSection}>
                  <Text style={styles.walletPurpleText}>Wallet</Text>
                  <Text style={styles.walletWhiteSmallText}>
                    {shortenAddress(wallet.address)}
                  </Text>
                </View>
                {wallet.ens ? (
                  <View style={styles.walletSection}>
                    <Text style={styles.walletPurpleText}>ENS name</Text>
                    <Text style={styles.walletWhiteSmallText}>
                      {shortenAddress(wallet.ens)}
                    </Text>
                  </View>
                ) : null}
              </Pressable>
              {!isLastWallet ? (
                <CustomModal
                  title={'Wallet delete'}
                  description={`We noticed that you want to delete ${wallet.address} Wallet. All your followings will be deleted and you will need to follow them again.

        Would you like to continue?`}
                  btnCancelText={'Later'}
                  btnActionText={'Yes, continue'}
                  emoji={wasteBasket}
                  modalVisible={modalVisible}
                  setModalVisible={m => setModalVisible(m)}
                  doAction={() => {
                    startDeleteWallet(walletIdToDelete)
                  }}
                />
              ) : (
                <CustomModal
                  title={'Last wallet'}
                  description={`You are deleting your last wallet. If you delete it, you will need to register again. Personal settings will not be saved. Do you want to delete?`}
                  btnCancelText={'Later'}
                  btnActionText={'Yes, delete'}
                  emoji={wasteBasket}
                  modalVisible={lastWalletDeleteModalVisible}
                  setModalVisible={m => setLastWalletDeleteModalVisible(m)}
                  doAction={() => deleteLastWallet()}
                />
              )}
            </Swipeable>
          ))
        ) : null}
      </ScrollView>
      {laodingWallets ? null : (
        <View style={styles.addWalletBtnWrapper}>
          <TouchableOpacity
            style={styles.addWalletBtn}
            onPress={() => {
              setAddWalletModal(true)
              closePrevOpenedSwipeable()
            }}>
            <Text style={styles.addWalletBtnTitle}>Add new wallet</Text>
          </TouchableOpacity>
          <AddWalletModal
            modalVisible={addWalletModal}
            setModalVisible={m => setAddWalletModal(m)}
            navigation={navigation}
          />
        </View>
      )}
    </View>
  )
}

export default WalletManagementScreen
