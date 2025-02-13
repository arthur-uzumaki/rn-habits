import type { FastifyTypedInstance } from '@/@types/types'
import { PatchHabitToggleUseCase } from '@/uses-cases/patch-habit-toggle-use-case'
import { authenticate } from '@/utils/authenticate'
import z from 'zod'

export function patchHabitToggleRoute(app: FastifyTypedInstance) {
  app.patch(
    '/habits/:habitId/toggle',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['Habit'],
        description: 'patch habits toggle',
        params: z.object({
          habitId: z.string().cuid(),
        }),
      },
    },
    async (request, reply) => {
      const { habitId } = request.params

      const patchHabitToggle = new PatchHabitToggleUseCase()

      const result = await patchHabitToggle.execute({ habitId })

      return reply.status(200).send(result)
    }
  )
}
