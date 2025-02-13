import { prisma } from '@/lib/prisma'

export class FetchSummaryUseCase {
  async execute(userId: string) {
    const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        CAST(COUNT(DH.id) AS float) AS completed,
        CAST(COUNT(HDW.id) AS float) AS amount
      FROM
        days D
      LEFT JOIN
        day_habits DH ON DH.day_id = D.id
      LEFT JOIN
        habit_week_days HDW ON EXTRACT(DOW FROM D.date) = HDW.week_day
      LEFT JOIN
        habits H ON H.id = HDW.habit_id
        AND H.created_at <= D.date
        AND H.user_id = ${userId} -- Filtrando apenas hábitos do usuário logado
      WHERE
        H.user_id = ${userId} -- Garantindo que o usuário logado veja apenas seus dados
      GROUP BY
        D.id, D.date
    `

    return summary
  }
}
