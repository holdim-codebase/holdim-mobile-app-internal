import React, {FC} from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import {styles} from './styles'
import Exlam from '../../assets/icons/exclamatory.svg'

interface AiGeneratedTextProps {
  handleClick: () => void
}

const AiGeneratedText: FC<AiGeneratedTextProps> = ({handleClick}) => {
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
