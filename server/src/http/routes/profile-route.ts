import type { FastifyTypedInstance } from '@/@types/types'
import { authenticate } from '@/utils/authenticate'
import z from 'zod'

export function profileRoute(app: FastifyTypedInstance) {
  app.get(
    '/me',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['User'],
        description: 'profile user',

        response: {
          200: z.object({
            user: z.object({
              sub: z.string(),
              name: z.string(),
              avatarUrl: z.string().optional(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send({ user: request.user })
    }
  )
}
