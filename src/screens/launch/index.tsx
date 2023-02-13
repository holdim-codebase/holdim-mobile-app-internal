import * as React from 'react'
import {Text, View} from 'react-native'

import styles from './styles'
import HoldimLogo from '../../assets/images/svg/HoldimLogo.svg'

function LaunchScreen({navigation, route}: any) {
  return (
    <View style={styles.splashWrapper}>
      <HoldimLogo />
      <View style={styles.splashTextWrapper}>
        <Text style={styles.splashText}>BETA VERSION</Text>
      </View>
    </View>
  )
}

export default LaunchScreen
