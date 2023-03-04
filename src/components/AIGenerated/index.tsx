import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'
import Exlam from '../../assets/icons/exclamatory.svg'

const AiGeneratedText = () => {
  return (
    <View style={styles.aiExlam}>
      <Text style={styles.aiExlamText}>ai generated</Text>
      <Exlam />
    </View>
  )
}

export default AiGeneratedText
