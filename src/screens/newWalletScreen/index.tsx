import * as React from 'react'
import * as Sentry from '@sentry/react-native'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import {useMutation} from '@apollo/client'

import {ADD_WALLET, GET_USER_WALLETS, handleHTTPError} from '../../services/api'

import styles from './styles'
import ArrowBack from '../../assets/images/svg/ArrowBackV2.svg'
import Close from '../../assets/images/svg/Close.svg'

// to validate wallet address and ens address
import namehash from '@ensdomains/eth-ens-namehash'

function NewWalletScreen({navigation}: any) {
  const [walletAddressInput, onChangeWalletAddressInput] =
    React.useState<string>()
  const [incorrectWalletAddress, setIncorrectWalletAddress] =
    React.useState<boolean>(false)

  const [addWallet] = useMutation(ADD_WALLET, {
    variables: {
      walletAddress: walletAddressInput,
    },
    onCompleted: data => {
      navigation.navigate('StateScreen', {
        svg: 'fire',
        title: 'Congrats!',
        description:
          'You have successfully added a new wallet! Now voting will be even easier!',
        navigateScreenAfterClose: 'WalletManagement',
      })
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
      onChangeWalletAddressInput('')
      console.error(error)
    },
    refetchQueries: [{query: GET_USER_WALLETS, variables: {onlyMain: true}}],
  })

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
      setIncorrectWalletAddress(true)
    }
  }, [walletAddressInput])

  return (
    <View style={styles.newWalletWrapper}>
      <View style={styles.newWalletStatusBar} />
      <View style={styles.newWalletStatusBarWrapper}>
        <TouchableOpacity
          style={styles.newWalletStatusBarArrow}
          onPress={() => navigation.navigate('WalletManagement')}>
          <ArrowBack />
        </TouchableOpacity>
        <Text style={styles.newWalletStatusBarText}>New wallet</Text>
      </View>
      <View style={styles.newWalletContentWrapper}>
        <View>
          <Text style={styles.newWalletTitle}>WALLET ADDRESS OR ENS NAME</Text>
          <View
            style={[
              styles.newWalletTextInputWrapper,
              incorrectWalletAddress &&
                styles.newWalletIncorrectWalletAddressInput,
            ]}>
            <TextInput
              style={styles.newWalletTextInput}
              multiline={true}
              onChangeText={onChangeWalletAddressInput}
              value={walletAddressInput}
              placeholder={'Enter your wallet address or ENS'}
              placeholderTextColor="#8B81A6"
            />
            {walletAddressInput ? (
              <TouchableOpacity
                style={styles.newWalletClearBtn}
                onPress={() => onChangeWalletAddressInput('')}>
                <Close />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text
            style={[
              incorrectWalletAddress &&
                styles.newWalletIncorrectWalletAddressText,
            ]}>
            {incorrectWalletAddress &&
              'Wallet address or ENS you entered is not correct'}
          </Text>
        </View>
      </View>
      <View style={styles.continueBtnWrapper}>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            incorrectWalletAddress || walletAddressInput === undefined
              ? styles.continueBtnDisabled
              : null,
          ]}
          onPress={() => addWallet()}
          disabled={
            incorrectWalletAddress || walletAddressInput === undefined
              ? true
              : false
          }>
          <Text
            style={[
              styles.continueBtnTitle,
              incorrectWalletAddress || walletAddressInput === undefined
                ? styles.continueBtnTitleDisabled
                : null,
            ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NewWalletScreen
