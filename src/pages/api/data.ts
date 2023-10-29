import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    let data = await db.user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
            accounts: {
                select: {
                    access_token: true,
                }
            }
        }
    });

    res.status(200).json({ code: data?.accounts.map((account) => account.access_token)[0] });
}