import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/server/db'
import { isNFSWPages } from '@/server/ai'

interface Data {
  access_token: string
  title: string
  chapterNumber: number
  pages: string[]
  mangaId: string
}

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access_token, title, chapterNumber, pages, mangaId } = req.body as Data

  const account = await db.account.findFirst({
    where: {
      access_token
    }
  })
  if (!account) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const manga = await db.manga.findFirst({
    where: {
      id: mangaId
    }
  })
  if (!manga) {
    return res.status(404).json({ message: 'Manga not found' })
  }

  const isNFSWChapter = await isNFSWPages(pages)

  if (isNFSWChapter && !manga.isNSFW) {
    await db.manga.update({
      where: {
        id: mangaId
      },
      data: {
        isNSFW: true
      }
    })
  }

  const chapter = await db.chapter.create({
    data: {
      title,
      chapterNumber,
      mangaId,
      pages,
    }
  })

  res.status(200).json({ message: 'Chapter uploaded', chapter })
}