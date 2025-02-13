import * as Notifications from 'expo-notifications'

export async function schedulePushNotification(userName: string) {
  const schedule = await Notifications.getAllScheduledNotificationsAsync()
  console.log('Agendadas', schedule)

  if (schedule.length > 0) {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  const triggerTime = new Date(Date.now())
  triggerTime.setHours(triggerTime.getHours() + 5)
  triggerTime.setSeconds(0)

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Olá, ${userName} 😁`,
      body: 'Você praticou seus hábitos hoje?',
      color: '#09090a',
    },
    trigger: {
      date: triggerTime,
      type: Notifications.SchedulableTriggerInputTypes.DATE,
    },
  })
}
