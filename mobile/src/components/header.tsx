import { Image, View } from 'react-native'
import { Button } from './button'
import colors from 'tailwindcss/colors'
import { router } from 'expo-router'

export function Header() {
  return (
    <View className="w-full flex-row items-center justify-between ">
      <Image
        source={require('~/assets/logo.png')}
        alt="logo"
        className="h-16 w-[123px] pt-8"
      />
      <Button
        onPress={() => router.navigate('/new')}
        className=" items-center rounded-lg border border-violet-500 bg-background "
      >
        <Button.Icon icon="plus" color={colors.violet[500]} />
        <Button.Title className="ml-3 font-semibold text-base text-white">
          Novo
        </Button.Title>
      </Button>
    </View>
  )
}
