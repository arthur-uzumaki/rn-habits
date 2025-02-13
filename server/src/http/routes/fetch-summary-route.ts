import type { FastifyTypedInstance } from '@/@types/types'
import { FetchSummaryUseCase } from '@/uses-cases/fetch-summary-use-case'
import { authenticate } from '@/utils/authenticate'

export function fetchSummaryRoute(app: FastifyTypedInstance) {
  app.get(
    '/summary',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['Habit'],
        description: 'fetch habit summary',
      },
    },
    async (request, reply) => {
      const userId = request.user.sub
      const fetchSummaryUseCase = new FetchSummaryUseCase()

      const result = await fetchSummaryUseCase.execute(userId)

      return reply.status(200).send(result)
    }
  )
}
