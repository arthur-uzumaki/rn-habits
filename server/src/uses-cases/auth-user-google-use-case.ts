import type { FastifyTypedInstance } from '@/@types/types'
import { prisma } from '@/lib/prisma'
import z from 'zod'

interface AuthUserGoogleUseCaseRequest {
  accessToken: string
}

interface AuthUserGoogleUseCaseResponse {
  token: string
}

export class AuthUserGoogleUseCase {
  constructor(private readonly app: FastifyTypedInstance) {}

  async execute({
    accessToken,
  }: AuthUserGoogleUseCaseRequest): Promise<AuthUserGoogleUseCaseResponse> {
    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const userData = await userResponse.json()

    const userInfoSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      picture: z.string().url(),
    })

    const userInfo = userInfoSchema.parse(userData)

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      })
    }

    const token = this.app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      { sub: user.id, expiresIn: '7 days' }
    )
    return { token }
  }
}
