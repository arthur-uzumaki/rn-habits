import type { FastifyTypedInstance } from '@/@types/types'
import { FetchDayUseCase } from '@/uses-cases/fetch-day-use-case'
import { authenticate } from '@/utils/authenticate'
import z from 'zod'

export function fetchDayRoute(app: FastifyTypedInstance) {
  app.get(
    '/day',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['Habit'],
        description: 'fetch day habit',
        querystring: z.object({
          date: z.coerce.date(),
        }),
        response: {
          200: z.object({
            possibleHabits: z
              .object({
                id: z.string(),
                userId: z.string(),
                title: z.string(),
                createdAt: z.date(),
              })
              .array(),
            completedHabits: z.string().array().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { date } = request.query
      const userId = request.user.sub

      const fetchDateUseCase = new FetchDayUseCase()

      const result = await fetchDateUseCase.execute({ date, userId })

      const { completedHabits, possibleHabits } = result

      return reply.status(200).send({ possibleHabits, completedHabits })
    }
  )
}
