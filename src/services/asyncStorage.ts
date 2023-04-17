import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKeys {
  NEW_DAOS_TOPIC = 'NEW_DAOS_TOPIC',
  FOLLOWED_SUMMARY_TOPIC = 'FOLLOWED_SUMMARY_TOPIC',
}

export const setAsyncStorage = async (key: StorageKeys, value: string) => {
  await AsyncStorage.setItem(key, value)
}

export const getAsyncStorage = async (key: StorageKeys) => {
  return await AsyncStorage.getItem(key)
}
