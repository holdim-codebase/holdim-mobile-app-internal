import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {UserContext} from '../../App'

export type UserContextProps = {
  walletId: string
  setWalletId: React.Dispatch<React.SetStateAction<string>>
}

type UserContextProviderProps = {
  children: React.ReactNode
}

const UserProvider = ({children}: UserContextProviderProps) => {
  const [walletId, setWalletId] = React.useState<string>('')

  React.useEffect(() => {
    AsyncStorage.getItem('wallet-id').then(v => {
      if (v !== null) {
        setWalletId(v)
      }
    })
  }, [])
  return (
    <UserContext.Provider value={{walletId, setWalletId}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
