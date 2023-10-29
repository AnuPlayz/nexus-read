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

                <div className="flex flex-row rounded-lg p-10">
                    {mangas.map(manga => {
                        return (
                            <Link href={"/manga/" + manga.id}>

                                <div className="flex flex-col m-2 bg-gray-500 rounded-lg h-32">
                                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-purple-400 hover:border-purple-700">
                                        <img className="rounded-t-lg" src={manga.coverImage} />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{manga.title}</h5>
                                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700">
                                                Read more
                                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </main>
        </>
    );
}