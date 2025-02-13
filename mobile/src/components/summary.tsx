import dayjs from 'dayjs'
import { ScrollView, View } from 'react-native'
import { generateRangeDatesFromYearStart } from '~/utils/generate-range-between-dates'
import { DAY_SIZE, HabitDay } from './habit-day'

export interface SummaryProps {
  id: string
  date: string
  amount: number
  completed: number
}

interface Props {
  data: SummaryProps[]
  onNavigate: (date: string) => void
}

const datesFromYearStart = generateRangeDatesFromYearStart()

const minimunSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimunSummaryDatesSizes - datesFromYearStart.length

const firstDayOfWeek = dayjs(datesFromYearStart[0]).day()

export function Summary({ data, onNavigate }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-[100px]"
    >
      {data && (
        <View className="flex-row flex-wrap">
          {Array.from({ length: firstDayOfWeek }).map((_, index) => (
            <View
              key={`empty-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              className="m-1 rounded-lg opacity-40"
              style={{ width: DAY_SIZE, height: DAY_SIZE }}
            />
          ))}

          {datesFromYearStart.map(date => {
            const dayWithHabits = data.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })
            return (
              <HabitDay
                key={date.toISOString()}
                date={date}
                amountCompleted={dayWithHabits?.completed}
                amountOfHabits={dayWithHabits?.amount}
                onPress={() => onNavigate(date.toISOString())}
              />
            )
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className=" m-1 rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40 "
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      )}
    </ScrollView>
  )
}
