import { createContext, useEffect, useState, type ReactNode } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { env } from '~/env/env'
import { api } from '~/lib/api'
import {
  getAccessToken,
  removerAccessToken,
  saveAccessToken,
} from '~/storage/access-token-storage'
import { router } from 'expo-router'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: env.EXPO_PUBLIC_IOS_CLIENT_ID,
})

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextProviderData {
  user: UserProps | null
  signin: () => Promise<void>
  logout: () => Promise<void>
  isUserLoading: boolean
}

interface AuthProvider {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProviderData)

export function AuthContextProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [isUserLoading, setIsUserLoading] = useState(false)

  async function signin() {
    try {
      setIsUserLoading(true)
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      await GoogleSignin.signIn()

      const { accessToken } = await GoogleSignin.getTokens()

      if (accessToken) {
        const { data } = await api.post('/sessions', {
          accessToken,
        })

        const token = data.token
        await saveAccessToken(token)
        loadStoredToken(token)
      }
    } catch (error) {
      // biome-ignore lint/complexity/noUselessCatch: <explanation>
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function logout() {
    try {
      await GoogleSignin.signOut()
      await removerAccessToken()
      setUser({} as UserProps)
    } catch (error) {
      // biome-ignore lint/complexity/noUselessCatch: <explanation>
      throw error
    }
  }

  async function loadStoredToken(accessToken: string) {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      const responseUserInfo = await api.get('/me')
      setUser(responseUserInfo.data.user)
    } catch (error) {
      console.log('Error ao buscar o usuário. ')
    }
  }

  useEffect(() => {
    async function loadToken() {
      const storageToken = await getAccessToken()

      if (storageToken) {
        await loadStoredToken(storageToken)
      }
    }

    loadToken()
  }, [])

  useEffect(() => {
    if (user?.name) {
      router.replace('/(tabs)')
    }
  }, [user?.name])

  return (
    <AuthContext.Provider value={{ isUserLoading, logout, signin, user }}>
      {children}
    </AuthContext.Provider>
  )
}
