import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface ProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  const sharedProgress = useSharedValue(progress)
  const styleAnimated = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress])

  return (
    <View className="mt-4 h-3 w-full rounded-xl bg-zinc-700 ">
      <Animated.View
        className={'h-3 rounded-xl bg-violet-600'}
        style={styleAnimated}
      />
    </View>
  )
}
