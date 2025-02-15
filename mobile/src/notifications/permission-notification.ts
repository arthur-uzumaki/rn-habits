import * as Notifications from 'expo-notifications'

export async function permissionNotification() {
  const { status } = await Notifications.getPermissionsAsync()

  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync()
    return newStatus === 'granted'
  }

  return true
}
