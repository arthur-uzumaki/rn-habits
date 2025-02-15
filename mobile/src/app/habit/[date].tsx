import clsx from 'clsx'
import dayjs from 'dayjs'
import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Button } from '~/components/button'
import { Checkbox } from '~/components/checkbox'
import { HabitEmpty } from '~/components/habit-empty'
import { Loading } from '~/components/loading'
import { ProgressBar } from '~/components/progress-bar'
import { api } from '~/lib/api'
import { generateProgressPercentage } from '~/utils/generate-progress-percentage'

interface DayInfoProps {
  completedHabits: string[]
  possibleHabits: {
    id: string
    title: string
  }[]
}

export default function Habit() {
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const params = useLocalSearchParams<{ date: string }>()

  const { date } = params

  const parsedDate = dayjs(date)
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/day', {
        params: { date },
      })

      setDayInfo(data)
      setCompletedHabits(data.completedHabits ?? [])
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível carregar as informação dos hábitos.')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleToggleHabits = useCallback(
    async (habitId: string) => {
      try {
        await api.patch(`/habits/${habitId}/toggle`)

        if (completedHabits?.includes(habitId)) {
          setCompletedHabits(prevState =>
            prevState.filter(habit => habit !== habitId)
          )
        } else setCompletedHabits(prevState => [...prevState, habitId])
      } catch (error) {
        console.log(error)
        Alert.alert('Ops', 'Não foi possível atualizar o status do hábitos.')
      }
    },
    [completedHabits]
  )

  useEffect(() => {
    fetchHabits()
  }, [fetchHabits])

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100px]"
      >
        <Button className="bg-transparent" onPress={() => router.back()}>
          <Button.Icon icon="arrow-left" color={colors.zinc[400]} />
        </Button>

        <Text className="mt-6 font-semibold text-base text-zinc-400 lowercase">
          {dayOfWeek}
        </Text>

        <Text className="font-extrabold text-3xl text-white">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx('mt-6', {
            'opacity-50': isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits?.map(habit => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabits(habit.id)}
                disabled={isDateInPast}
              />
            ))
          ) : (
            <HabitEmpty />
          )}
        </View>
        {isDateInPast && (
          <Text className="mt-10 text-center text-white">
            Você não pode editar hábitos de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  )
}
