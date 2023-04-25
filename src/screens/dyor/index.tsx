import React from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import {flashlight} from '../../constants/emojis'
import styles from './styles'
import Checkbox from '../../components/Checkbox'
import {TouchableOpacity} from 'react-native'

const Dyor = () => {
  const [checkedDyor, setCheckedDyor] = React.useState(false)

  const onCheck = (checked: boolean) => {
    setCheckedDyor(!checked)
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
          <Checkbox
            text="Confirm that you have read the above information and take note of it."
            onCheck={onCheck}
            checked={checkedDyor}
          />
          <TouchableOpacity
            onPress={() => ''}
            style={[
              styles.dyorFooterBtn,
              !checkedDyor && styles.dyorFooterBtnDisabled,
            ]}
            disabled={!checkedDyor ? true : false}>
            <Text style={styles.dyorFooterBtnTitle}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dyor
