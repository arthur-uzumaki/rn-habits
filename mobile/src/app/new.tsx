import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, ScrollView, Text, TextInput, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Button } from '~/components/button'
import { Checkbox } from '~/components/checkbox'
import { api } from '~/lib/api'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export default function New() {
  const [weekDays, setWeekdays] = useState<number[]>([])
  const [title, setTitle] = useState('')

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekdays(prevState =>
        prevState.filter(weekDay => weekDay !== weekDayIndex)
      )
    } else {
      setWeekdays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert(
          'Novo hábito',
          'Informe o nome do hábito e escolhe a periodicidade.'
        )
      }

      await api.post('/habits', { title, weekDays })
      setTitle('')
      setWeekdays([])

      Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível criar o novo hábito. ')
    }
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

        <Text className="mt-6 font-extrabold text-3xl text-white">
          Criar hábito
        </Text>

        <Text className="mt-6 font-semibold text-base text-white">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="mt-3 h-12 rounded-lg border-2 border-l-zinc-800 bg-zinc-900 pl-4 text-white focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />
        <Text className="mt-4 mb-3 font-semibold text-base text-white">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <Button
          className="mt-6 items-center justify-center bg-green-600"
          onPress={handleCreateNewHabit}
        >
          <Button.Icon icon="check" />
          <Button.Title className="font-semibold text-base">
            Confirmar
          </Button.Title>
        </Button>
      </ScrollView>
    </View>
  )
}
