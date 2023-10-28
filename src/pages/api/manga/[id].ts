import { db } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function upload(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query as { id: string }

    const manga = await db.manga.findFirst({
        where: {
            id: id
        }
    })
    if (!manga) {
        return res.status(404).json({ message: 'Manga not found' })
    }

    const chapters = await db.chapter.findMany({
        where: {
            mangaId: id
        }
    })

    res.send({
        manga,
        chapters
    })
}