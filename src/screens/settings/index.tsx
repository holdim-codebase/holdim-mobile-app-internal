import * as React from 'react'
import * as Sentry from '@sentry/react-native'
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import ArrowBack from '../../assets/images/svg/ArrowBackV2.svg'
import Wallet from '../../assets/images/svg/Wallet.svg'
import File from '../../assets/images/svg/File.svg'

import styles from './styles'

const settings = [
  {
    title: 'Wallet management',
    icon: <Wallet />,
    screenName: 'WalletManagement',
  },
  {title: 'Privacy policy', icon: <File />, screenName: 'PrivacyPolicy'},
]

function SettingsScreen({navigation}: any) {
  return (
    <View style={styles.settingsWrapper}>
      <View style={styles.settingsStatusBar} />
      <View style={styles.settingsStatusBarWrapper}>
        <View>
          <TouchableOpacity
            style={styles.settingsStatusBarArrow}
            onPress={() => navigation.navigate('Profile', {refetch: true})}>
            <ArrowBack />
          </TouchableOpacity>
        </View>
        <Text style={styles.settingsStatusBarText}>Settings</Text>
      </View>
      <View>
        {settings.map((s, i: number) => (
          <TouchableOpacity
            key={i}
            style={styles.settingWrapper}
            onPress={() => {
              navigation.navigate(s.screenName)
            }}>
            <View style={styles.settingWrapper}>
              <View style={styles.settingIcon}>{s.icon}</View>
              <View style={styles.settingTextWrapper}>
                <Text style={styles.settingText}>{s.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default SettingsScreen
