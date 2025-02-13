import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

interface PatchHabitToggleUseCaseRequest {
  habitId: string
}

export class PatchHabitToggleUseCase {
  async execute({ habitId }: PatchHabitToggleUseCaseRequest) {
    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      })
    }
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day.id,
          habitId,
        },
      },
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          dayId: day.id,
          habitId,
        },
      })
    }
  }
}
