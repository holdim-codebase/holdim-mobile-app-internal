import * as React from 'react'
import * as Sentry from '@sentry/react-native'
import {Linking, Text, TouchableOpacity, View} from 'react-native'

import {handleHTTPError} from '../../services/api'
import {openLinkInAppBrowser} from '../../components/MarkdownText'
import TextInfo from '../../components/TextInfo'
import ArrowBack from '../../assets/images/svg/ArrowBackV2.svg'
import Wallet from '../../assets/images/svg/Wallet.svg'
import File from '../../assets/images/svg/File.svg'
import Poap from '../../assets/images/svg/Poap.svg'

import styles from './styles'

function SettingsScreen({navigation}: any) {
  const settings = (navigation: any) => [
    {
      title: 'Wallet management',
      icon: <Wallet />,
      screenName: 'Wallet management',
      onPress: () => navigation.navigate('WalletManagement'),
    },
    {
      title: 'Privacy policy',
      icon: <File />,
      screenName: 'Privacy policy',
      onPress: () => openLinkInAppBrowser('https://holdim.to/privacy-policy'),
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
      <View style={{height: '60%', justifyContent: 'space-between'}}>
        <View style={styles.poapWrapper}>
          <TouchableOpacity
            style={styles.poapButton}
            onPress={() => {
              Linking.openURL(
                'https://kiosk.poap.xyz/#/event/SLNNKbl71INAWgtJh9nk',
              ).catch(error => {
                Sentry.captureException(error)
                console.error(error)
                handleHTTPError()
              })
            }}>
            <View style={styles.poapSvg}>
              <Poap />
            </View>
            <Text style={styles.poapText}>Get your trophy POAP!</Text>
          </TouchableOpacity>
        </View>
        <TextInfo
          wrapperStyle={styles.textInfoWrapper}
          text={'Beta version 1.0'}
        />
      </View>
    </View>
  )
}

export default SettingsScreen
