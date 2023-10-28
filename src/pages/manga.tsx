'use client';
import { Manga } from "@prisma/client";
import { useSession, signIn } from "next-auth/react"
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [mangas, setMangas] = useState<Manga[]>([])
    const { status } = useSession()

    useEffect(() => {
        fetch("/api/manga/recent").then(x => x.json()).then(x => {
            setMangas(x)
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

                <div className="flex flex-row p-10">
                    {mangas.map(manga => {
                        return (
                            <Link href={"/manga/" + manga.id}>
                                <div className="flex flex-col m-2 bg-gray-500 rounded-lg h-32">
                                    <img className="rounded-md" src={manga.coverImage} />
                                    <div className="text-sm text-gray-700">{manga.title}</div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </main>
        </>
    );
}