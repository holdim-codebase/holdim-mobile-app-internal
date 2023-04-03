import React from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import {CheckBox} from 'react-native-elements'
import {flashlight} from '../../constants/emojis'
import styles from './styles'

const Dyor = () => {
  const [checkedDyor, setCheckedDyor] = React.useState(false)

  const onCheck = () => {
    setCheckedDyor(!checkedDyor)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.dyorWrapper}>
        <View style={styles.dyorDescriptionWrapper}>
          <Text style={styles.dyorDescriptionEmoji}>{flashlight}</Text>
          <Text style={styles.dyorDescriptionTitle}>DYOR</Text>
          <Text style={styles.dyorText}>
            Do your own research. The AI generated texts do not mean a financial
            or other advice. The text simplified by AI can have inaccuracies.
            Always read the full proposal before voting on the subject.
          </Text>
        </View>
        <View style={styles.dyorFooter}>
          <View style={styles.dyorCheckedWrapper}>
            <CheckBox checked={checkedDyor} onPress={onCheck} />
            <Text style={styles.dyorText}>
              Confirm that you have read the above information and take note of
              it.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dyor
