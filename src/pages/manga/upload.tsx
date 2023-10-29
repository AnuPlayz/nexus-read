'use client';
import { Manga, Chapter } from "@prisma/client";
import { useSession, signIn } from "next-auth/react"
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface DataUpload {
    access_token?: string
    title?: string
    chapterNumber?: number
    pages?: string[]
    mangaId?: string
}

interface DataCreate {
    access_token?: string
    title?: string
    description?: string
    coverImage?: string
}

export default function Home() {
    const { status, data } = useSession()
    const [manga, setManga] = useState<DataCreate>({})
    const [chapters, setChapters] = useState<DataUpload>({})

    useEffect(() => {
        fetch("/api/data").then(res => res.json()).then(data => {
            setManga({
                ...manga,
                access_token: data.code
            })
            setChapters({
                ...chapters,
                access_token: data.code
            })
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

                <div className="text-3xl text-center">Create Manga | Upload a chapter to Manga</div>
                <div className="flex flex-row items-center justify-center grow text-white w-full">
                    <div className="m-5 p-5 flex flex-col items-center justify-center w-1/2 h-2/3 bg-gray-950 rounded-xl shadow-xl">
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div className="text-2xl">Manga Title</div>
                            <div className="grow"></div>
                            <input onChange={(e) => setManga({ ...manga, title: e.target.value })} className="ml-10 w-1/2 h-1/2 rounded-md border border-pink-500 bg-gray-700 text-gray-400 px-3 py-3" placeholder="Manga Title" />
                        </div>
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div className="text-2xl">Manga Description</div>
                            <div className="grow"></div>
                            <input onChange={(e) => setManga({ ...manga, description: e.target.value })} className="ml-10 w-1/2 h-1/2 rounded-md border border-pink-500 bg-gray-700 text-gray-400 px-3 py-3" placeholder="Manga Description" />
                        </div>
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div className="text-2xl">Manga Cover Image</div>
                            <div className="grow"></div>
                            <input onChange={(e) => setManga({ ...manga, coverImage: e.target.value })} className="ml-10 w-1/2 h-1/2 rounded-md border border-pink-500 bg-gray-700 text-gray-400 px-3 py-3" placeholder="Manga Cover Image" />
                        </div>
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div onClick={() => {
                                fetch("/api/manga/create", {
                                    method: "POST",
                                    body: JSON.stringify(manga),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then(res => res.json()).then(data => {
                                    console.log(data)
                                })
                            }} className="flex flex-row items-center justify-center w-1/2 h-1/2 bg-blue-500 rounded-xl shadow-xl cursor-pointer hover:bg-blue-600 py-3 px-2">
                                <div className="text-2xl text-white">Create Manga</div>
                            </div>
                        </div>
                    </div>

                    <div className="m-5 p-5 flex flex-col items-center justify-center w-1/2 h-2/3 bg-gray-950 rounded-xl shadow-xl">
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div className="text-2xl">Manga ID</div>
                            <div className="grow"></div>
                            <input onChange={(e) => setChapters({ ...chapters, mangaId: e.target.value })} className="ml-10 w-1/2 h-1/2 rounded-md border border-pink-500 bg-gray-700 text-gray-400 px-3 py-3" placeholder="Manga ID" />
                        </div>
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div className="text-2xl">Chapter Title</div>
                            <div className="grow"></div>
                            <input onChange={(e) => setChapters({ ...chapters, title: e.target.value })} className="ml-10 w-1/2 h-1/2 rounded-md border border-pink-500 bg-gray-700 text-gray-400 px-3 py-3" placeholder="Chapter Title" />
                        </div>
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div className="text-2xl">Chapter Number</div>
                            <div className="grow"></div>
                            <input onChange={(e) => setChapters({ ...chapters, chapterNumber: parseInt(e.target.value) })} className="ml-10 w-1/2 h-1/2 rounded-md border border-pink-500 bg-gray-700 text-gray-400 px-3 py-3" placeholder="Chapter Number" />
                        </div>
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div className="text-2xl">Chapter Pages</div>
                            <div className="grow"></div>
                            <input onChange={(e) => setChapters({ ...chapters, pages: e.target.value.split(",") })} className="ml-10 w-1/2 h-1/2 rounded-md border border-pink-500 bg-gray-700 text-gray-400 px-3 py-3" placeholder="Chapter Pages" />
                        </div>
                        <div className="flex flex-row w-full h-2/5 items-center justify-center">
                            <div onClick={() => {
                                fetch("/api/manga/upload", {
                                    method: "POST",
                                    body: JSON.stringify(chapters),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then(res => res.json()).then(data => {
                                    console.log(data)
                                })
                            }} className="flex flex-row items-center justify-center w-1/2 h-1/2 bg-blue-500 rounded-xl shadow-xl cursor-pointer hover:bg-blue-600 py-3 px-2">
                                <div className="text-2xl text-white">Upload Chapter</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}