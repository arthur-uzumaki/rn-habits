import { Feather } from '@expo/vector-icons'
import {
  Text,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from 'react-native'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

interface CheckboxProps extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export function Checkbox({ title, checked, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-2 flex-row items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="size-8 items-center justify-center rounded-lg bg-green-500"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" color={colors.white} size={20} />
        </Animated.View>
      ) : (
        <View className="size-8 rounded-lg bg-zinc-900" />
      )}

      <Text className="ml-3 font-semibold text-base text-white">{title}</Text>
    </TouchableOpacity>
  )
}
