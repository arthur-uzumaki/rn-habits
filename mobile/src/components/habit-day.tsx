import clsx from 'clsx'
import dayjs from 'dayjs'
import {
  Dimensions,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import { generateProgressPercentage } from '~/utils/generate-progress-percentage'
const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5)
interface HabitDayProps extends TouchableOpacityProps {
  amountOfHabits?: number
  amountCompleted?: number
  date: Date
}

export function HabitDay({
  amountCompleted = 0,
  amountOfHabits = 0,
  date,
  ...rest
}: HabitDayProps) {
  const amountAccomplishedPercentage =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, amountCompleted)
      : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)
  return (
    <TouchableOpacity
      className={clsx('m-1 rounded-lg border-2', {
        'border-zinc-800 bg-zinc-900': amountAccomplishedPercentage === 0,
        'border-violet-900 bg-violet-900':
          amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
        'border-violet-600 bg-violet-800':
          amountAccomplishedPercentage >= 20 &&
          amountAccomplishedPercentage < 40,
        'border-violet-500 bg-violet-700':
          amountAccomplishedPercentage >= 40 &&
          amountAccomplishedPercentage < 60,
        'border-violet-500 bg-violet-600':
          amountAccomplishedPercentage >= 60 &&
          amountAccomplishedPercentage < 80,
        'border-violet-400 bg-violet-500': amountAccomplishedPercentage >= 80,
        'border-4 border-white': isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}
