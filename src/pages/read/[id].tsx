'use client';
import { Manga, Chapter } from "@prisma/client";
import { useSession, signIn } from "next-auth/react"
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter()
    const [chapter, setChapter] = useState<Chapter | null>(null)
    const { status } = useSession()

    useEffect(() => {
        fetch("/api/chapter/" + router.query.id).then(x => x.json()).then(x => {
            setChapter(x)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Nexus Read - Read Manga</title>
                <meta name="description" content="Read Manga Online" />
                <link rel="icon" href="/logo.png" />

            </Head>
            <main className="flex h-screen flex-col bg-gradient-to-br from-[#C7C7F1] to-[#C7C7F1] relative overflow-hidden">
                <div className="flex flex-row items-center justify-left m-10">
                <Link href="/">        <div className="text-3xl text-black">Nexus Read</div></Link>
                    <div className={status === "unauthenticated" ? "" : "hidden"}>
                        <div onClick={() => signIn()} className="ml-20 text-2xl text-gray-700 cursor-pointer hover:text-gray-900">Login</div>
                    </div>
                    <Link href="/manga">
                        <div className="ml-10 text-2xl text-gray-700 cursor-pointer hover:text-gray-900">Manga Collection</div>
                    </Link>
                </div>
                {chapter && chapter.pages && (
                    <div className="flex flex-col items-center justify-center w-full h-auto overflow-y-scroll">
                        {chapter.pages.map((x, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-full h-auto">
                                <img src={x} className="w-[30%] h-auto" />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}