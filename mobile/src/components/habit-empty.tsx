import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export function HabitEmpty() {
  return (
    <Text className="text-base text-zinc-400">
      Você ainda não está monitorando nenhum hábito{' '}
      <Link
        href={'/new'}
        className="text-base text-violet-400 underline active:text-violet-500"
      >
        comece cadastrando um.
      </Link>
    </Text>
  )
}
