import type { FastifyTypedInstance } from '@/@types/types'
import { CreateHabitUseCase } from '@/uses-cases/create-habit-use-case'
import { authenticate } from '@/utils/authenticate'
import z from 'zod'

export function createHabitRoute(app: FastifyTypedInstance) {
  app.post(
    '/habits',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['Habit'],
        description: 'Create habit',
        body: z.object({
          title: z.string(),
          weekDays: z.array(z.number().min(0).max(6)),
        }),
        response: {
          201: z.object({
            habit: z.object({
              id: z.string(),
              title: z.string(),
              userId: z.string(),
              createdAt: z.date(),
            }),
          }),
        },
      },
    },

    async (request, reply) => {
      const { title, weekDays } = request.body

      const createHabitUseCase = new CreateHabitUseCase()

      const result = await createHabitUseCase.execute({
        userId: request.user.sub,
        title,
        weekDays,
      })

      const { habit } = result

      return reply.status(201).send({ habit })
    }
  )
}
