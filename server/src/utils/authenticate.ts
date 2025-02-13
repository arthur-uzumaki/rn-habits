import { FastifyInstance, type FastifyRequest } from 'fastify'

export async function authenticate(request: FastifyRequest) {
  await request.jwtVerify()
}
