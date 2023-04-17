import * as React from 'react'
import {StatusBar, TouchableOpacity} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ApolloProvider} from '@apollo/client'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import * as Sentry from '@sentry/react-native'

// screens
import ProposalScreen from './src/screens/proposal'
import FeedScreen from './src/screens/feed'
import SearchScreen from './src/screens/search'
import ProfileScreen from './src/screens/profile'
import DAOScreen from './src/screens/dao'
import FullProposalScreen from './src/screens/fullProposal'
import OnboardingScreen from './src/screens/onboarding'
import LoginScreen from './src/screens/login'
import WelcomeScreen from './src/screens/welcome'
import NotificationsManagementScreen from './src/screens/settings/screens/notificationsManagement'
import WalletManagementScreen from './src/screens/settings/screens/walletManagement'
import StateScreen from './src/screens/stateScreen'
import SettingsScreen from './src/screens/settings'
import PrivacyPolicyScreen from './src/screens/privacyPolicy'

import UserProvider, {UserContextProps} from './src/Provider/UserProvider'
import {client} from './src/services/api'

// icons svg
import FeedIcon from './src/assets/images/svg/Home.gray.svg'
import SearchIcon from './src/assets/images/svg/Search.gray.svg'
import ProfileIcon from './src/assets/images/svg/Profile.gray.svg'
import FeedIconFocused from './src/assets/images/svg/Home.purple.svg'
import SearchIconFocused from './src/assets/images/svg/Search.purple.svg'
import ProfileIconFocused from './src/assets/images/svg/Profile.purple.svg'
import SettingsIcon from './src/assets/images/svg/Settings.svg'

import {black} from './src/constants/css'

Sentry.init({
  dsn: 'https://e64a26481fc64b0b895da8a145307e31@o1405388.ingest.sentry.io/6739145',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  tracesSampleRate: 1.0,
  release: 'holdim@1.0.0',
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 10000,
})

const tabIconSizeMultiplier = 0.9

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: black,
  },
}

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

const headerOptions = {
  headerStyle: {
    backgroundColor: 'rgba(22, 22, 22, 1)',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerBackTitleVisible: false,
}

const HomeStack = createNativeStackNavigator()

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen name="Feed" component={FeedScreen} />
      <HomeStack.Screen
        name="Proposal"
        component={ProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
      <HomeStack.Screen
        name="FullProposal"
        component={FullProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
      <HomeStack.Screen name="DAO" component={DAOScreen} />
    </HomeStack.Navigator>
  )
}

const ProfileStack = createNativeStackNavigator()

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={headerOptions}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <SettingsIcon />
              </TouchableOpacity>
            )
          },
        })}
      />
      <ProfileStack.Screen name="DAO" component={DAOScreen} />
      <ProfileStack.Screen
        name="Proposal"
        component={ProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
      <ProfileStack.Screen
        name="FullProposal"
        component={FullProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
    </ProfileStack.Navigator>
  )
}

const SearchStack = createNativeStackNavigator()

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={headerOptions}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="DAO" component={DAOScreen} />
      <SearchStack.Screen
        name="Proposal"
        component={ProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
      <SearchStack.Screen
        name="FullProposal"
        component={FullProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
    </SearchStack.Navigator>
  )
}

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(22, 22, 22, 1)',
          borderTopColor: 'rgba(22, 22, 22, 1)',
        },
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused, color}) => {
            return focused ? (
              <FeedIconFocused
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            ) : (
              <FeedIcon
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused, color}) => {
            return focused ? (
              <SearchIconFocused
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            ) : (
              <SearchIcon
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused, color}) => {
            return focused ? (
              <ProfileIconFocused
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            ) : (
              <ProfileIcon
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps,
)

const RootStack = (RootStackProps: {isFirstLaunch: boolean}) => {
  const {walletId} = React.useContext(UserContext)

  return walletId && walletId !== '' ? (
    RootStackProps.isFirstLaunch ? (
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: 'Settings',
          }}
        />
        <Stack.Screen
          name="WalletManagement"
          component={WalletManagementScreen}
          options={{
            headerTitle: 'Wallet management',
          }}
        />
        <Stack.Screen
          name="NotificationsManagement"
          component={NotificationsManagementScreen}
          options={{
            headerTitle: 'Notifications',
          }}
        />
        <Stack.Screen
          name="Privacy policy"
          component={PrivacyPolicyScreen}
          options={{
            headerTitle: 'Privacy policy',
          }}
        />
        <Stack.Screen name="StateScreen" component={StateScreen} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: 'Settings',
          }}
        />
        <Stack.Screen
          name="WalletManagement"
          component={WalletManagementScreen}
          options={{
            headerTitle: 'Wallet management',
          }}
        />
        <Stack.Screen
          name="NotificationsManagement"
          component={NotificationsManagementScreen}
          options={{
            headerTitle: 'Notifications',
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{
            headerTitle: 'Privacy policy',
          }}
        />
        <Stack.Screen name="StateScreen" component={StateScreen} />
      </Stack.Navigator>
    )
  ) : RootStackProps.isFirstLaunch ? (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  )
}

function App() {
  // hide splash screen
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  // CLear data to test login
  // React.useEffect(() => {
  //   AsyncStorage.clear()
  //   auth().currentUser &&
  //     auth()
  //       .signOut()
  //       .then(() => console.log('User signed out!'))
  // }, [])
  const [isFirstLaunch, setIsFirstLaunch] = React.useState<boolean>(false)

  React.useEffect(() => {
    // check if the application has already been launched
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      console.log({value})
      if (value === null) {
        // check if user exists when app is not launched yet
        // sign out old user

        if (auth().currentUser) {
          auth().signOut()
        }
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <StatusBar
              barStyle="light-content"
              backgroundColor="rgba(22, 22, 22, 1)"
            />
            <NavigationContainer theme={navTheme}>
              <RootStack isFirstLaunch={isFirstLaunch} />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </UserProvider>
    </ApolloProvider>
  )
}

export default Sentry.wrap(App)
