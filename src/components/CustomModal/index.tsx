import React from 'react'
import {BlurView} from '@react-native-community/blur'
import {Modal, Text, TouchableOpacity, View} from 'react-native'

import DeleteEmojiSvg from '../../assets/images/svg/DeleteEmojiSvg.svg'
import LastWalletDeleteSvg from '../../assets/images/svg/Bubbles.svg'
import styles from './styles'

type CustomModalProps = {
  title: string
  description: string
  svg: string
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  btnCancelText?: string
  btnActionText?: string
  doAction: () => void
  btnOkText?: string
}

const CustomModal = ({
  title,
  description,
  svg,
  modalVisible,
  setModalVisible,
  btnCancelText,
  btnActionText,
  doAction,
  btnOkText,
}: CustomModalProps) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <BlurView
          style={styles.customModalWrapper}
          overlayColor={'rgba(44, 36, 67, 0.6'}>
          <View style={styles.customModal}>
            {svg === 'delete' ? <DeleteEmojiSvg /> : null}
            {svg === 'lastWalletDelete' ? <LastWalletDeleteSvg /> : null}
            <Text style={styles.customModalTitle}>{title}</Text>
            <Text style={styles.customModalDescription}>{description}</Text>
            {btnOkText ? (
              <TouchableOpacity
                style={[
                  styles.customModalButton,
                  styles.customModalButtonCancel,
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.customModalButtonText}>
                  {btnCancelText}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.customModalTwoButtonWrapper}>
                <TouchableOpacity
                  style={[
                    styles.customModalButton,
                    styles.customModalButtonCancel,
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.customModalButtonText}>
                    {btnCancelText}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.customModalButton,
                    styles.customModalButtonOk,
                    svg === 'lastWalletDelete' &&
                      styles.customModalButtonDanger,
                  ]}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    doAction()
                  }}>
                  <Text style={styles.customModalButtonText}>
                    {btnActionText}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </BlurView>
      </Modal>
    </View>
  )
}

export default CustomModal
