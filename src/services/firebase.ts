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
    }
    console.log('Authorization status:', authStatus)
  }
}

export const setUserSubscribedToDaoNotification = async (userId: string) => {
  try {
    const deviceToken = await messaging().getToken()
    
    // save device token to Firestore, associating it with the user id
    await firestore()
      .collection('followedDaoTopicDevices')
      .doc(userId)
      .set({
        deviceToken,
      });
    
  } catch (error) {
    console.error('Error saving device token with user ID:', error);
  }
};

export const setUserUnsubscribedFromDaoNotification = async (userId: string) => {
  try {

    // delete device token from Firestore, associating it with the user id
    await firestore()
      .collection('followedDaoTopicDevices')
      .doc(userId)
      .delete();
    
  } catch (error) {
    console.error('Error saving device token with user ID:', error);
  }
}

