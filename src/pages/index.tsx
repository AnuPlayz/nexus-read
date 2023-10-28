import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nexus Read - Read Manga</title>
        <meta name="description" content="Read Manga Online" />
        <link rel="icon" href="/logo.png" />
        
      </Head>
      <main className="flex h-screen flex-col bg-gradient-to-br from-[#C7C7F1] to-orange-400 overflow-hidden">
        <div className="flex flex-row items-center justify-left m-10">
          <div className="text-3xl text-black">Nexus Read</div>
          <Link href="/api/auth">
            <div className="ml-20 text-2xl text-gray-700 cursor-pointer hover:text-gray-900">Login</div>
          </Link>
          <Link href="/manga">
            <div className="ml-10 text-2xl text-gray-700 cursor-pointer hover:text-gray-900">Manga</div>
          </Link>
        </div>
        <img src="/panels.jpg" className="absolute w-[50vw] rotate-45"/>
      </main>
    </>
  );
}
//gay reply
//stop gaying my code by doing undo shit