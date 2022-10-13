import * as React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

import Fire from '../../assets/images/svg/Fire.svg'
import Done from '../../assets/images/svg/Done.svg'
import styles from './styles'

function StateScreen({navigation, route}: any) {
  return (
    <View style={styles.stateScreenWrapper}>
      <View style={styles.stateScreenContent}>
        {route.params.svg === 'fire' ? <Fire /> : null}
        {route.params.svg === 'done' ? <Done /> : null}
        <Text style={styles.stateScreenTitle}>{route.params.title}</Text>
        <Text style={styles.stateScreenDescription}>
          {route.params.description}
        </Text>
      </View>
      <View style={styles.stateScreenCloseBtnWrapper}>
        <TouchableOpacity
          style={styles.stateScreenCloseBtn}
          onPress={() =>
            navigation.navigate(route.params.navigateScreenAfterClose)
          }>
          <Text style={styles.stateScreenCloseTitle}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StateScreen
