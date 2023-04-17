import messaging from '@react-native-firebase/messaging'
import firestore from '@react-native-firebase/firestore';


export enum NotificationTopic {
  newDaos = 'new-daos',
  followedSummary = 'followed-summary',
}

// Notifications
export const requestUserNotificationPermission = async (userId?: string) => {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  if (enabled) {
    await messaging().registerDeviceForRemoteMessages()
    if (userId) {
      const deviceToken = await messaging().getToken()
      console.log('device token:', deviceToken)
      await setUserSubscribedToDaoNotification(userId, deviceToken)
    }
    console.log('Authorization status:', authStatus)
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage.data)
    })
    messaging().onMessage(async remoteMessage => {
      console.log('on message!', remoteMessage)
    })

  }
}

const setUserSubscribedToDaoNotification = async (userId: string, deviceToken: string) => {
  try {
    // Save device token to Firestore, associating it with the user ID
    console.log({userId}, {deviceToken})
    await firestore()
      .collection('notificationDaoFollowed')
      .doc(userId)
      .set({
        deviceToken,
      });
    
  } catch (error) {
    console.error('Error saving device token with user ID:', error);
  }
};

