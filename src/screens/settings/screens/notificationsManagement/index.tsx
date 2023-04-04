import * as React from 'react'
import {Switch, Text, TouchableOpacity, View} from 'react-native'

import ArrowBack from '../../../../assets/images/svg/ArrowBackV2.svg'
// import Star from '../../../../assets/images/svg/Star.svg'
import Letter from '../../../../assets/images/svg/Letter.svg'
import House from '../../../../assets/images/svg/NewHouse.svg'
import {black, purple, purple3, white} from '../../../../constants/css'
import styles from './styles'

function NotificationsManagementScreen({navigation}: any) {
  const [isNewProposalsEnabled, setIsNewProposalsEnabled] =
    React.useState(false)
  // const [isDailySummaryEnabled, setIsDailySummaryEnabled] =
  //   React.useState(false)
  const [isNewDaosEnabled, setIsNewDaosEnabled] = React.useState(false)

  const notificationSettings = [
    {
      mainTitle: 'New proposals',
      title: 'Only for followed DAOs',
      isEnabled: isNewProposalsEnabled,
      toggleSwitch: () =>
        setIsNewProposalsEnabled(previousState => !previousState),
      icon: <Letter />,
    },
    // {
    //   mainTitle: 'Daily summary',
    //   title: 'Only for following DAOs',
    //   isEnabled: isDailySummaryEnabled,
    //   toggleSwitch: () =>
    //     setIsDailySummaryEnabled(previousState => !previousState),
    //   icon: <Star />,
    // },
    {
      mainTitle: 'New added DAOs',
      isEnabled: isNewDaosEnabled,
      toggleSwitch: () => setIsNewDaosEnabled(previousState => !previousState),
      icon: <House />,
    },
  ]

  return (
    <View style={styles.notificationsManagementWrapper}>
      <View style={styles.notificationsManagementStatusBar} />
      <View style={styles.notificationsManagementStatusBarWrapper}>
        <View>
          <TouchableOpacity
            style={styles.notificationsManagementStatusBarArrow}
            onPress={() => navigation.navigate('Settings')}>
            <ArrowBack />
          </TouchableOpacity>
        </View>
        <Text style={styles.notificationsManagementStatusBarText}>
          Notifications
        </Text>
      </View>
      <View style={styles.notificationsManagementContentWrapper}>
        {notificationSettings.map(setting => (
          <View style={styles.rowsWrapper}>
            <View style={styles.rowWrapper}>
              <View style={styles.rowTextAndIconWrapper}>
                <View style={styles.rowIcon}>{setting.icon}</View>
                <View>
                  <Text
                    style={[
                      setting.title
                        ? styles.rowMainTitle
                        : styles.rowMainTitleOnly,
                    ]}>
                    {setting.mainTitle}
                  </Text>
                  {setting.title && (
                    <Text style={styles.rowTitle}>{setting.title}</Text>
                  )}
                </View>
              </View>
              <View style={styles.switchWrapper}>
                <Switch
                  trackColor={{false: purple3, true: purple}}
                  thumbColor={setting.isEnabled ? white : black}
                  ios_backgroundColor={purple3}
                  onValueChange={setting.toggleSwitch}
                  value={setting.isEnabled}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default NotificationsManagementScreen
