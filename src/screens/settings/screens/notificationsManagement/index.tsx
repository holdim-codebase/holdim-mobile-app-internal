import * as React from 'react'
import {Switch, Text, TouchableOpacity, View} from 'react-native'
import messaging from '@react-native-firebase/messaging'

import ArrowBack from '../../../../assets/images/svg/ArrowBackV2.svg'
// import Star from '../../../../assets/images/svg/Star.svg'
import Letter from '../../../../assets/images/svg/Letter.svg'
import House from '../../../../assets/images/svg/NewHouse.svg'
import {black, purple, purple3, white} from '../../../../constants/css'
import styles from './styles'
import { setAsyncStorage, getAsyncStorage, StorageKeys } from '../../../../services/asyncStorage'
import { NotificationTopic, setUserSubscribedToDaoNotification, setUserUnsubscribedFromDaoNotification } from '../../../../services/firebase'
import portfolioStore from '../../../../services/stores/portfolio.store'



function NotificationsManagementScreen({navigation}: any) {
  const [isFollowedDaoEnabled, setIsFollowedDaoEnabled] =
    React.useState(false)
  // const [isDailySummaryEnabled, setIsDailySummaryEnabled] =
  //   React.useState(false)
  const [isNewDaosEnabled, setIsNewDaosEnabled] = React.useState(false)


  React.useEffect(() => {
    getAsyncStorage(StorageKeys.NEW_DAOS_TOPIC).then((value) => {
      setIsNewDaosEnabled(value ? JSON.parse(value) : false)
    })
    getAsyncStorage(StorageKeys.FOLLOWED_SUMMARY_TOPIC).then((value) => {
      setIsFollowedDaoEnabled(value ? JSON.parse(value) : false)
    })
  }, [])


  const notificationSettings = [
    {
      mainTitle: 'New proposals',
      title: 'Only for followed DAOs',
      isEnabled: isFollowedDaoEnabled,
      toggleSwitch: () =>
        manageFollowedDaoSubscription(!isFollowedDaoEnabled),
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
      toggleSwitch: () => manageNewDaosSubscription(!isNewDaosEnabled),
      icon: <House />,
    },
  ]

  const manageNewDaosSubscription = (subscribe: boolean) => {
    if (subscribe) {
      messaging().subscribeToTopic(NotificationTopic.newDaos).then(() => {
        setAsyncStorage(StorageKeys.NEW_DAOS_TOPIC, 'true')
        setIsNewDaosEnabled(true)
      })
    } else {
      messaging().unsubscribeFromTopic(NotificationTopic.newDaos).then(() => {
        setAsyncStorage(StorageKeys.NEW_DAOS_TOPIC, 'false')
        setIsNewDaosEnabled(false)
      })
    }
  }
  const manageFollowedDaoSubscription = async (subscribe: boolean, remainingAttempts = 3) => {
    if (remainingAttempts <= 0) {
      console.error('Failed to manage followed DAO subscription after multiple attempts');
      return;
    }
  
    try {
      if (portfolioStore.portfolio && portfolioStore.portfolio.id) {
        const userId = portfolioStore.portfolio.id;
        if (subscribe) {
          await setUserSubscribedToDaoNotification(userId);
          await messaging().subscribeToTopic(NotificationTopic.followedSummary);
          await setAsyncStorage(StorageKeys.FOLLOWED_SUMMARY_TOPIC, 'true');
          setIsFollowedDaoEnabled(true);
        } else {
          await setUserUnsubscribedFromDaoNotification(userId);
          await messaging().unsubscribeFromTopic(NotificationTopic.followedSummary);
          await setAsyncStorage(StorageKeys.FOLLOWED_SUMMARY_TOPIC, 'false');
          setIsFollowedDaoEnabled(false);
        }
      }
    } catch (error) {
      console.error('Error while managing followed DAO subscription:', error);
      // Call the function again with one less remaining attempt
      await manageFollowedDaoSubscription(subscribe, remainingAttempts - 1);
    }
  };

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
          <View style={styles.rowsWrapper} key={setting.title}>
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
