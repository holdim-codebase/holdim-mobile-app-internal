import React from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import {styles} from './styles'
import Exlam from '../../assets/icons/exclamatory.svg'

type AiGeneratedTextProps = {
  handleClick: () => void
}

const AiGeneratedText = ({handleClick}: AiGeneratedTextProps) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.aiExlam}>
        <Text style={styles.aiExlamText}>ai generated</Text>
        <Exlam />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AiGeneratedText
