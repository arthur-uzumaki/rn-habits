import '~/styles/global.css'
import '~/lib/dayjs'
import '~/notifications/config-notification'

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

import { schedulePushNotification } from '~/notifications/schedule-push-notification'
import { permissionNotification } from '~/notifications/permission-notification'

import { AuthContextProvider } from '~/contexts/auth-provider-context'

import { Loading } from '~/components/loading'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_800ExtraBold,
  })

  useEffect(() => {
    permissionNotification()
  }, [])

  useEffect(() => {
    schedulePushNotification()
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
