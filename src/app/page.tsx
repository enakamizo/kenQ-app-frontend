"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      {/* ロゴ */}
      <div className="mb-6">
        <Image src="/研Qロゴ.png" alt="研Qロゴ" width={100} height={100} />
      </div>

      {/* ユーザー情報 */}
      <div className="flex flex-col items-center space-y-5">
        <Link href="/mypage">
          <button className="w-80 bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition">
            マイページ
          </button>
        </Link>
        <Link href="/register">
          <button className="w-80 bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition">
            新規登録
          </button>
        </Link>

        <Link href="/researcher">
          <button className="w-80 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition">
            研究者検索
          </button>
        </Link>
      </div>

     {/* ログアウト */}
      <div className="mt-8">
        <Link href="/logout">
          <span className="text-sm text-gray-500 hover:underline">ログアウト</span>
        </Link>
      </div>

      {/* 取得したメッセージ（デバッグ用） */}
      {message && (
        <div className="mt-4 text-xs text-gray-400">8000の表示内容をもってきた: {message}</div>
      )}
    </main>
  );
}
