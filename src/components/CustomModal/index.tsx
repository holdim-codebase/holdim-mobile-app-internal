import React from 'react'
import {BlurView} from '@react-native-community/blur'
import {Modal, Platform, Text, TouchableOpacity, View} from 'react-native'

import styles from './styles'

type CustomModalProps = {
  title: string
  description: string
  emoji: string
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
  emoji,
  modalVisible,
  setModalVisible,
  btnCancelText,
  btnActionText,
  doAction,
  btnOkText,
}: CustomModalProps) => {
  return (
    <View style={{backgroundColor: 'rgba(44, 36, 67, 0.6)'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <BlurView
          style={[
            styles.customModalWrapper,
            Platform.OS === 'ios' && styles.customModalWrapperIOS,
          ]}
          overlayColor={'rgba(44, 36, 67, 0.6)'}>
          <View style={styles.customModal}>
            <Text style={styles.emoji}>{emoji}</Text>
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
                    title === 'Last wallet' && styles.customModalButtonDanger,
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
