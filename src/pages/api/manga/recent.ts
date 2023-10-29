import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/server/db'

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await db.manga.findMany({
    take: 10,
    orderBy: {
        updatedAt: 'desc'
    },
  })

    res.status(200).json(data)
}