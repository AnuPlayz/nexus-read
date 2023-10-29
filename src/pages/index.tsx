'use client';
import { useSession, signIn } from "next-auth/react"
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession()

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
        <img src="/collage.png" className="absolute ml-[650px] w-[50vw]" style={{
          transform: "rotate(0deg)"
        }} />

        <div className='flex flex-col w-[40vw] p-10 mt-10'>
          <div className="text-4xl text-black font-bold">Read Manga Online</div>
          <div className="mt-3 text-2xl text-black">Read your favorite manga scans and scanlations online at Nexus Read. Read Manga Online, Absolutely Free and Updated Daily</div>
            <div className="flex flex-row space-x-10">
            <Link href="/manga">
            <div className="mt-10 text-2xl text-black cursor-pointer bg-[#FFB9C6] hover:bg-[#fca5b5] rounded-md py-2 px-3 w-[fit-content] border-2 border-black">Browse Manga</div>
            </Link> 
          <div onClick={() => signIn()} className="mt-10 text-2xl text-black cursor-pointer bg-[#FFB9C6] hover:bg-[#fca5b5] rounded-md py-2 px-3 w-[fit-content] border-2 border-black">Upload Manga</div>
            </div>
            
        </div>
      </main>
    </>
  );
}