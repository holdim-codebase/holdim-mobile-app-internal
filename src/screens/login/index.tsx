import * as React from 'react'
import * as Sentry from '@sentry/react-native'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {SafeAreaView} from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth'
import {useMutation} from '@apollo/client'

import {UserContext} from '../../../App'
import {client, handleHTTPError, REGISTER_USER} from '../../services/api'
import Close from '../../assets/images/svg/Close.svg'
import styles from './styles'
import {purple, white} from '../../constants/css'

// to validate wallet address and ens address
import namehash from '@ensdomains/eth-ens-namehash'

const LoginScreen = ({navigation}: any) => {
  const [walletAddressInput, onChangeWalletAddressInput] =
    React.useState<string>()
  const [incorrectWalletAddress, setIncorrectWalletAddress] =
    React.useState<boolean>(false)
  const [loadingScreen, setLoadingScreen] = React.useState<boolean>(false)
  const [isTextInputFocused, setIsTextInputFocused] =
    React.useState<boolean>(false)

  const {setWalletId} = React.useContext(UserContext)

  const [register] = useMutation(REGISTER_USER, {
    variables: {
      walletAddress: walletAddressInput,
    },
    onCompleted: data => {
      data.registerUser.wallets.length !== 0 &&
        AsyncStorage.setItem('wallet-id', data.registerUser.wallets[0].id).then(
          r => setWalletId(data.registerUser.wallets[0].id),
        )
      AsyncStorage.getItem('alreadyLaunched').then(launched => {
        if (launched === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true')
        }
      })
      setLoadingScreen(false)
      onChangeWalletAddressInput('')
    },
    onError: error => {
      Sentry.captureException(error)
      setLoadingScreen(false)
      handleHTTPError()
      onChangeWalletAddressInput('')
      console.error(error)
    },
  })

  const anonymousSignIn = async () => {
    if (!walletAddressInput) {
      setIncorrectWalletAddress(true)
      return
    }
    setLoadingScreen(true)
    try {
      await auth()
        .signInAnonymously()
        .then(r => {
          client.clearStore()
          register({
            variables: {walletAddress: walletAddressInput.toLowerCase()},
          })
        })
    } catch (error: any) {
      Sentry.captureException(error)
      setLoadingScreen(false)
      console.error(error)
    }
  }

  // validate wallet address when user write it
  React.useEffect(() => {
    if (!walletAddressInput) return
    const correctWalletAddress =
      walletAddressInput.length < 255 &&
      walletAddressInput.startsWith('0x') &&
      !walletAddressInput.includes('.')
    const correctENS = walletAddressInput.endsWith('.eth')
    setIncorrectWalletAddress(!(correctWalletAddress || correctENS))

    // if input contains unsupported char -> return error and set incorrect wallet
    try {
      namehash.normalize(walletAddressInput)
    } catch (e) {
      console.error(e)
      setIncorrectWalletAddress(true)
    }
  }, [walletAddressInput])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.loginWrapper}>
        {loadingScreen ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color={purple} />
          </View>
        ) : (
          <View style={styles.loginContentWrapper}>
            <View>
              <Text style={styles.loginTitle}>
                Start your friendly DAO journey
              </Text>
            </View>
            <View>
              <Text style={styles.walletTitile}>
                WALLET ADDRESS OR ENS NAME
              </Text>
              <View
                style={[
                  styles.loginTextInputWrapper,
                  isTextInputFocused && styles.loginTextInputFocused,
                  incorrectWalletAddress &&
                    styles.loginIncorrectWalletAddressInput,
                ]}>
                <TextInput
                  style={styles.loginTextInput}
                  onBlur={() => setIsTextInputFocused(false)}
                  onFocus={() => setIsTextInputFocused(true)}
                  multiline={true}
                  onChangeText={onChangeWalletAddressInput}
                  value={walletAddressInput}
                  placeholder={'Enter your wallet address'}
                  placeholderTextColor="#8B81A6"
                />
                {walletAddressInput ? (
                  <TouchableOpacity
                    style={styles.loginTextInputClearBtn}
                    onPress={() => onChangeWalletAddressInput('')}>
                    <Close />
                  </TouchableOpacity>
                ) : null}
              </View>
              <Text
                style={[
                  styles.loginDescriptionTitle,
                  incorrectWalletAddress &&
                    styles.loginIncorrectWalletAddressText,
                ]}>
                {incorrectWalletAddress &&
                  'Wallet address or ENS you entered is not correct'}
              </Text>

              <View style={styles.loginBtnGoWrapper}>
                <TouchableOpacity
                  style={[
                    styles.loginBtnGo,
                    incorrectWalletAddress || walletAddressInput === undefined
                      ? styles.loginBtnGoDisabled
                      : null,
                  ]}
                  disabled={
                    incorrectWalletAddress || walletAddressInput === undefined
                      ? true
                      : false
                  }
                  onPress={anonymousSignIn}>
                  <Text
                    style={[
                      styles.loginBtnGoTitle,
                      incorrectWalletAddress || walletAddressInput === undefined
                        ? styles.loginBtnGoTitleDisabled
                        : null,
                    ]}>
                    Start
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
