import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/server/db'

interface Data {
    access_token: string
    title: string
    description: string
    coverImage: string
}

export default async function upload(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, description, coverImage, access_token } = req.body as Data
    const account = await db.account.findFirst({
        where: {
            access_token
        }
    })
    if (!account) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const manga = await db.manga.create({
        data: {
            title,
            description,
            coverImage,
            authorId: account.id,
            releaseDate: new Date()
        }
    })

    return res.status(200).json({ message: 'success', manga })
}