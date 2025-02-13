import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

interface CreateHabitUseCaseRequest {
  userId: string
  title: string
  weekDays: number[]
}

interface CreateHabitUseCaseResponse {
  habit: {
    id: string
    title: string
    userId: string
    createdAt: Date
  }
}

export class CreateHabitUseCase {
  async execute({
    title,
    weekDays,
    userId,
  }: CreateHabitUseCaseRequest): Promise<CreateHabitUseCaseResponse> {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    })

    const today = dayjs().startOf('day').toDate()

    const habit = await prisma.habit.create({
      data: {
        userId: user.id,
        title,
        createdAt: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              weekDay,
            }
          }),
        },
      },
    })

    return { habit }
  }
}
