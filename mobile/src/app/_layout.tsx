import '~/styles/global.css'
import '~/lib/dayjs'

import { useEffect } from 'react'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter'

import * as Notifications from 'expo-notifications'
import { schedulePushNotification } from '~/notifications/schedule-push-notification'
import { permissionNotification } from '~/notifications/permission-notification'

import { AuthContextProvider } from '~/contexts/auth-provider-context'

import { Loading } from '~/components/loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_800ExtraBold,
  })

  async function setupNotification() {
    const hasPermission = await permissionNotification()
    console.log('Permissão concedida:', hasPermission)

    if (!hasPermission) return

    const lastScheduled = await AsyncStorage.getItem('lastNotificationDate')
    const today = new Date().toDateString()

    console.log('Última notificação agendada:', lastScheduled)
    console.log('Data de hoje:', today)

    if (lastScheduled !== today) {
      console.log('Agendando nova notificação...')
      await schedulePushNotification()
      await AsyncStorage.setItem('lastNotificationDate', today)
      console.log('Notificação agendada com sucesso!')
    } else {
      console.log('Notificação já foi agendada hoje.')
    }
  }

  useEffect(() => {
    setupNotification()
  }, [])

  if (!fontsLoaded) {
    return (
      <>
        <Loading />
        <StatusBar style="light" backgroundColor="transparent" translucent />
      </>
    )
  }

  return (
    <>
      <AuthContextProvider>
        <Slot />
        <StatusBar style="light" backgroundColor="transparent" translucent />
      </AuthContextProvider>
    </>
  )
}
