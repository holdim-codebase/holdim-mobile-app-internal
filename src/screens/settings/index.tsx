import * as React from 'react'
import * as Sentry from '@sentry/react-native'
import {Linking, Text, TouchableOpacity, View} from 'react-native'

import {handleHTTPError} from '../../services/api'
import {openLinkInAppBrowser} from '../../components/MarkdownText'
import TextInfo from '../../components/TextInfo'

// svg
import ArrowBack from '../../assets/images/svg/ArrowBackV2.svg'
import Wallet from '../../assets/images/svg/Wallet.svg'
import File from '../../assets/images/svg/File.svg'
import Poap from '../../assets/images/svg/Poap.svg'
import QuickReply from '../../assets/images/svg/QuickReply.svg'
import ReportBug from '../../assets/images/svg/ReportBug.svg'

import styles from './styles'

function SettingsScreen({navigation}: any) {
  const settings = (navigation: any) => [
    {
      title: 'Wallet management',
      icon: <Wallet />,
      onPress: () => navigation.navigate('WalletManagement'),
    },
    {
      title: 'Privacy policy',
      icon: <File />,
      onPress: () => openLinkInAppBrowser('https://holdim.to/privacy-policy'),
    },
    {
      title: 'Report bug',
      icon: <ReportBug />,
      onPress: () =>
        openLinkInAppBrowser('https://holdim.canny.io/feature-request/create'),
    },
    {
      title: 'Request feature or share feedback',
      icon: <QuickReply />,
      onPress: () =>
        openLinkInAppBrowser('https://holdim.canny.io/holdim-feedback/create'),
    },
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
      <TextInfo
        wrapperStyle={styles.textInfoWrapper}
        text={'Beta version 1.0'}
      />
    </View>
  )
}

export default SettingsScreen
