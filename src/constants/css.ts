import {Platform} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'

export const statusBarHeight = getStatusBarHeight(true)
export const OS_IOS = Platform.OS === 'ios'

// colors
export const white: string = '#FFFFFF'
export const black: string = '#000000'
export const purple: string = '#8463DF'
export const purpleLight: string = '#BEAAF5'
export const purpleDark: string = '#2C2443'
export const darkGrape: string = '#201739'
