import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { DAY_SIZE } from '~/components/habit-day'
import { Header } from '~/components/header'
import { Loading } from '~/components/loading'

import { Summary, type SummaryProps } from '~/components/summary'
import { api } from '~/lib/api'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export default function Home() {
  const [summary, setSummary] = useState<SummaryProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchSummaryData = useCallback(async () => {
    try {
      if (summary.length === 0) {
        setIsLoading(true)
      }

      const { data } = await api.get('/summary')

      setSummary(data)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  function handleNavigateHabit(date: string) {
    router.push({
      pathname: '/habit/[date]',
      params: {
        date,
      },
    })
  }

  useFocusEffect(
    useCallback(() => {
      fetchSummaryData()
    }, [fetchSummaryData])
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="mt-6 mb-2 flex-row">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className="mx-1 text-center font-bold text-xl text-zinc-400"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <Summary data={summary} onNavigate={handleNavigateHabit} />
    </View>
  )
}
