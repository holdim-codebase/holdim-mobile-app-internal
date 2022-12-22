import * as React from 'react'
import * as Sentry from '@sentry/react-native'
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {openLinkInAppBrowser} from '../../components/MarkdownText'
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

  const settings = (navigation: any) => [
    {
      title: 'Wallet management',
      icon: <Wallet />,
      screenName: 'Wallet management',
      onPress: () => navigation.navigate('Wallet management')
    },
    {title: 'Privacy policy', icon: <File />, screenName: 'Privacy policy', onPress: () => openLinkInAppBrowser('https://holdim.to/privacy-policy')},
  ]

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
        {settings(navigation).map((s, i: number) => (
          <TouchableOpacity
            key={i}
            style={styles.settingWrapper}
            onPress={s.onPress}>
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
