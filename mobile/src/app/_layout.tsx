import '~/styles/global.css'
import '~/lib/dayjs'
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

import { AuthContextProvider } from '~/contexts/auth-provider-context'

import { Loading } from '~/components/loading'
import { useAuth } from '~/hooks/auth-hook'

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

  const { user } = useAuth()

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
