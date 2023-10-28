import { loadTags } from '@/server/ai'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function upload(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const tags = await loadTags(req.body)
}