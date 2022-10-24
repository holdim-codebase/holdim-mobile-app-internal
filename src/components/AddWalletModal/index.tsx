import React from 'react'
import * as Sentry from '@sentry/react-native'
import {BlurView} from '@react-native-community/blur'
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {useMutation} from '@apollo/client'
import {NavigationProp} from '@react-navigation/native'

import {ADD_WALLET, GET_USER_WALLETS, handleHTTPError} from '../../services/api'

// svg
import NewWalletSvg from '../../assets/images/svg/Key.svg'
import Close from '../../assets/images/svg/Close.svg'

// styles
import styles from './styles'

// to validate wallet address and ens address
import namehash from '@ensdomains/eth-ens-namehash'

type AddWalletModal = {
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  navigation: NavigationProp<any, any>
}

const AddWalletModal = ({
  navigation,
  modalVisible,
  setModalVisible,
}: AddWalletModal) => {
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
      setModalVisible(false)
      onChangeWalletAddressInput('')
    },
    onError: error => {
      Sentry.captureException(error)
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
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <BlurView style={styles.addWalletModalWrapper} overlayColor={'red'}>
          <View style={styles.addWalletModal}>
            <View style={styles.addWalletModalCentered}>
              <NewWalletSvg />
              <Text style={styles.addWalletModalTitle}>New wallet</Text>
              <Text style={styles.addWalletModalDescription}>
                Add new wallet in a couple of clicks.
              </Text>
            </View>
            <View>
              <Text style={styles.addWalletModalTextInputTitle}>
                WALLET ADDRESS OR ENS NAME
              </Text>
              <View
                style={[
                  styles.addWalletModalTextInputWrapper,
                  incorrectWalletAddress &&
                    styles.addWalletModalIncorrectWalletAddressInput,
                ]}>
                <TextInput
                  style={styles.addWalletModalTextInput}
                  multiline={true}
                  onChangeText={onChangeWalletAddressInput}
                  value={walletAddressInput}
                  placeholder={'Enter your wallet address or ENS'}
                  placeholderTextColor="#8B81A6"
                />
                {walletAddressInput ? (
                  <TouchableOpacity
                    style={styles.addWalletModalClearBtn}
                    onPress={() => onChangeWalletAddressInput('')}>
                    <Close />
                  </TouchableOpacity>
                ) : null}
              </View>
              {incorrectWalletAddress && (
                <Text
                  style={[
                    incorrectWalletAddress &&
                      styles.addWalletModalIncorrectWalletAddressText,
                  ]}>
                  Wallet address or ENS you entered is not correct
                </Text>
              )}
            </View>
            <View style={styles.addWalletModalButtonsWrapper}>
              <TouchableOpacity
                style={[
                  styles.addWalletModalButton,
                  styles.addWalletModalButtonCancel,
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  onChangeWalletAddressInput('')
                }}>
                <Text style={styles.addWalletModalButtonText}>Later</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addWalletModalButton,
                  styles.addWalletModalButtonOk,
                  incorrectWalletAddress || walletAddressInput === undefined
                    ? styles.addWalletModalButtonDisabled
                    : null,
                ]}
                onPress={() =>
                  addWallet({
                    variables: {
                      walletAddress:
                        walletAddressInput && walletAddressInput.toLowerCase(),
                    },
                  })
                }
                disabled={
                  incorrectWalletAddress || walletAddressInput === undefined
                    ? true
                    : false
                }>
                <Text
                  style={[
                    styles.addWalletModalButtonText,
                    incorrectWalletAddress || walletAddressInput === undefined
                      ? styles.addWalletModalButtonTitleDisabled
                      : null,
                  ]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  )
}

export default AddWalletModal
