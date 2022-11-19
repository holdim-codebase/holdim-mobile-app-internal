import React, { ReactElement } from 'react'
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native'


type IconProps = {
  icon: JSX.Element
  onPress: Function
  size: number
}

const ActionIcon = ({icon, onPress, size}: IconProps) => {

  const handlePress = (e) => {
    e.preventDefault()
    onPress()
  }
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ width: size + 3, height: size + 3, marginRight: 15}}>
        {icon}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ActionIcon