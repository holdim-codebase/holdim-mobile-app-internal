import React from 'react'
import {ViewStyle, Text, View} from 'react-native'

import {styles} from './styles'

import InfoIcon from '../../assets/icons/info.svg'

type TextInfoProps = {
  text: string
  wrapperStyle?: ViewStyle
}

const Follow = ({wrapperStyle, text}: TextInfoProps) => {
  return (
    <View style={[wrapperStyle, styles.body]}>
      <InfoIcon />
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

export default Follow
