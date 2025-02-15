import { Redirect } from 'expo-router'
import { useEffect } from 'react'
import { permissionNotification } from '~/notifications/permission-notification'
import { schedulePushNotification } from '~/notifications/schedule-push-notification'

export default function Index() {
  return <Redirect href={'/signin'} />
}
