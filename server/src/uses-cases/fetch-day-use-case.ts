import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

interface FetchDayUseCaseRequest {
  date: Date
  userId: string
}

export class FetchDayUseCase {
  async execute({ date, userId }: FetchDayUseCaseRequest) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    })

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        userId: user.id,
        createdAt: {
          lte: date,
        },
        weekDays: {
          some: {
            weekDay,
          },
        },
      },
    })

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    })
    const completedHabits =
      day?.dayHabits
        .filter(dayHabit =>
          possibleHabits.some(habit => habit.id === dayHabit.habitId)
        )
        .map(dayHabit => dayHabit.habitId) ?? []

    return {
      possibleHabits,
      completedHabits,
    }
  }
}
