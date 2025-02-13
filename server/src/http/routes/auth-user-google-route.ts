import type { FastifyTypedInstance } from '@/@types/types'
import { AuthUserGoogleUseCase } from '@/uses-cases/auth-user-google-use-case'
import z from 'zod'

export function authUserGoogleRoute(app: FastifyTypedInstance) {
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['User'],
        description: 'authenticate user google',
        body: z.object({
          accessToken: z.string(),
        }),

        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { accessToken } = request.body

      const authUserGoogleUseCase = new AuthUserGoogleUseCase(app)

      const result = await authUserGoogleUseCase.execute({ accessToken })

      const { token } = result

      return reply.status(201).send({ token })
    }
  )
}
