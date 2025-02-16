import { prisma } from '@/lib/prisma'

interface FetchSummaryUseCaseRequest {
  userId: string
}

export class FetchSummaryUseCase {
  async execute({ userId }: FetchSummaryUseCaseRequest) {
    const summary = await prisma.$queryRaw /*sql*/`
    SELECT 
      D.id,
      D.date,
      CAST(COUNT(DISTINCT DH.id) AS float) AS completed,
      CAST(COUNT(DISTINCT H.id) AS float) AS amount
    FROM 
      days D
    LEFT JOIN 
      day_habits DH ON DH.day_id = D.id
    LEFT JOIN 
      habit_week_days HDW ON EXTRACT(DOW FROM D.date) = HDW.week_day
    LEFT JOIN 
      habits H ON H.id = HDW.habit_id AND H."userId" = ${userId}
    WHERE 
      H.id IS NOT NULL
    GROUP BY 
      D.id, D.date
  `

    return summary
  }
}
