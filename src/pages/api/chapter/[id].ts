import { db } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function upload(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query as { id: string }

    const chapter = await db.chapter.findUnique({
        where: {
            id
        }
    })

    if (!chapter) {
        return res.status(404).json({
            message: "Chapter not found"
        })
    }

    res.send(chapter)
}