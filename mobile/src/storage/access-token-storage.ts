import AsyncStorage from '@react-native-async-storage/async-storage'
import { env } from '~/env/env'

const ACCESS_TOKE_STORAGE = env.EXPO_PUBLIC_ACCESS_TOKEN

async function saveAccessToken(token: string) {
  try {
    await AsyncStorage.setItem(ACCESS_TOKE_STORAGE, token)
  } catch (error) {
    throw error
  }
}

async function getAccessToken() {
  try {
    return AsyncStorage.getItem(ACCESS_TOKE_STORAGE)
  } catch (error) {
    throw error
  }
}

async function removerAccessToken() {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKE_STORAGE)
  } catch (error) {
    throw error
  }
}

export { saveAccessToken, getAccessToken, removerAccessToken }
