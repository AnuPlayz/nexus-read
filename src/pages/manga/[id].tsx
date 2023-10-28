'use client';
import { Manga, Chapter } from "@prisma/client";
import { useSession, signIn } from "next-auth/react"
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter()
    const [manga, setManga] = useState<Manga | null>(null)
    const [chapters, setChapters] = useState<Chapter[] | null>([])
    const { status } = useSession()

    useEffect(() => {
        fetch("/api/manga/" + router.query.id).then(x => x.json()).then(x => {
            setManga(x.manga)
            setChapters(x.chapters)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Nexus Read - Read Manga</title>
                <meta name="description" content="Read Manga Online" />
                <link rel="icon" href="/logo.png" />

            </Head>
            <main className="flex h-screen flex-col bg-gradient-to-br from-[#C7C7F1] to-orange-400 relative overflow-hidden">
                <div className="flex flex-row items-center justify-left m-10">
                    <div className="text-3xl text-black">Nexus Read</div>
                    <div className={status === "unauthenticated" ? "" : "hidden"}>
                        <div onClick={() => signIn()} className="ml-20 text-2xl text-gray-700 cursor-pointer hover:text-gray-900">Login</div>
                    </div>
                    <Link href="/manga">
                        <div className="ml-10 text-2xl text-gray-700 cursor-pointer hover:text-gray-900">Manga</div>
                    </Link>
                </div>

                {manga && (
                    <div className="flex flex-col justify-center items-center p-10">
                        <div className="flex flex-row justify-center items-center">
                            <img src={manga.coverImage} className="w-1/2" />
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <div className="text-3xl text-black">{manga.title}</div>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <div className="text-2xl text-black">{manga.description}</div>
                        </div>

                        {chapters && (
                            <div className="flex flex-col justify-center items-center mt-10">
                                <div className="text-2xl text-black">Chapters</div>
                                <div className="flex flex-row mt-5">
                                    {chapters.map(x => (
                                        <Link href={"/read/" + x.id} className="bg-orange-400 rounded-lg m-5 p-5">
                                            <div className="text-xl text-black cursor-pointer hover:text-gray-900">Chapter: {x.chapterNumber}</div>
                                            <div className="text-xl text-black cursor-pointer hover:text-gray-900">{x.title}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}