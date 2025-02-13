import { router } from 'expo-router'
import { Alert, View } from 'react-native'
import { Button } from '~/components/button'
import { useAuth } from '~/hooks/auth-hook'

export default function Signin() {
  const { signin, isUserLoading } = useAuth()

  async function handleSignin() {
    try {
      await signin()
      router.navigate('/(tabs)')
    } catch (error) {
      Alert.alert('Error', 'Não foi possível conecta-se com sua conta google. ')
      console.log(error)
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-zinc-950">
      <Button isLoading={isUserLoading} onPress={handleSignin}>
        <Button.Icon icon="google" />
        <Button.Title>Entrar com a conta google</Button.Title>
      </Button>
    </View>
  )
}
