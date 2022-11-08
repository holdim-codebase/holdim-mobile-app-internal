import React from 'react'
import {ActivityIndicator, View} from 'react-native'

type LoadingSpinnerProps = {
  style: Object
  size: number | 'small' | 'large' | undefined
  color: string
}

const LoadingSpinner = ({style, size, color}: LoadingSpinnerProps) => {
  return (
    <View style={style}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default LoadingSpinner
