import {
  ActivityIndicator,
  Text,
  type TextProps,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

function Button({ children, isLoading, className, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        'flex-row items-center gap-3 rounded-lg bg-red-600 px-4 py-3',
        className
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <ActivityIndicator className="text-white " /> : children}
    </TouchableOpacity>
  )
}

function Title({ children, className }: TextProps) {
  return (
    <Text className={twMerge('font-bold text-lg text-white', className)}>
      {children}
    </Text>
  )
}

interface IconProps {
  icon: keyof typeof FontAwesome.glyphMap
  color?: string
}

function Icon({ icon, color = colors.white }: IconProps) {
  return <FontAwesome name={icon} color={color} size={24} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }
