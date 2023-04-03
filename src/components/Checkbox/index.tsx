import React from 'react'
import {Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import styles from './styles'

type CheckboxProps = {
  text?: string
  checked: boolean
  onCheck: (checked: boolean) => void
}

const Checkbox = ({text, checked, onCheck}: CheckboxProps) => {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onCheck(checked)}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      {text && (
        <Text style={[styles.checkboxText, {textAlign: 'left'}]}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}

export default Checkbox
