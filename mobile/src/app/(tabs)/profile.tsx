import { MaterialIcons } from '@expo/vector-icons'

import { router } from 'expo-router'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { HabitEmpty } from '~/components/habit-empty'
import { useAuth } from '~/hooks/auth-hook'

export default function Profile() {
  const { user, logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()
      router.navigate('/signin')
    } catch (error) {
      Alert.alert('Error', 'Error ao sai da sua conta.')
    }
  }

  return (
    <View className="flex-1 bg-background">
      <View className="w-full flex-row justify-between bg-zinc-900 p-8 pt-16 ">
        <Image
          className="h-[54px] w-[54px] rounded-lg "
          source={{ uri: user.avatarUrl }}
        />

        <View className="ml-4 flex-1">
          <Text className="font-medium text-lg text-white">Olá</Text>
          <Text className="font-extrabold text-white text-xl">{user.name}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
          <MaterialIcons name="logout" size={34} color={'#7C7C8A'} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-8 pt-16">
        <HabitEmpty />
      </View>
    </View>
  )
}
