import * as React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

import styles from './styles'

function StateScreen({navigation, route}: any) {
  return (
    <View style={styles.stateScreenWrapper}>
      <View style={styles.stateScreenContent}>
        {route.params.svg === 'fire' ? (
          <Text style={styles.emoji}>&#128293;</Text>
        ) : null}
        {route.params.svg === 'done' ? (
          <Text style={styles.emoji}>&#9989;</Text>
        ) : null}
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
