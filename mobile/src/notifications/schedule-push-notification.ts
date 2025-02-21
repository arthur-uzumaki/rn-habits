import dayjs from 'dayjs'
import * as Notifications from 'expo-notifications'

export async function schedulePushNotification() {
  const schedule = await Notifications.getAllScheduledNotificationsAsync()
  console.log('Agendadas', schedule)

  if (schedule.length > 0) {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  let triggerTime = dayjs().hour(11).minute(50).second(0)
  console.log(triggerTime)

  if (triggerTime.isBefore(dayjs())) {
    triggerTime = triggerTime.add(1, 'day')
  }

  const titles = [
    'Mantenha o ritmo! 💪',
    'Seu progresso importa! 🚀',
    'Hora de evoluir! 🔥',
    'Não pare agora! ⏳',
    'Você está no caminho certo! ✅',
    'Mais um dia de conquistas! 🏆',
    'Seus hábitos definem seu futuro! 🌟',
  ]

  const randomTile = titles[Math.floor(Math.random() * titles.length)]

  await Notifications.scheduleNotificationAsync({
    content: {
      title: randomTile,
      body: 'Você praticou seus hábitos hoje?',
      color: '#09090a',
    },
    trigger: {
      date: triggerTime.toDate(),
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      channelId: 'habits',
    },
  })
}
