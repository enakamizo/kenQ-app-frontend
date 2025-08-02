// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
    const dummyUserId = 1;

    try {
        //const res = await fetch(`/api/projects-list?company_user_id=${dummyUserId}`); // ↓ 環境変数から絶対URLでアクセスに統一 ↓
        console.log('API URL:', process.env.NEXT_PUBLIC_AZURE_API_URL)
        const res = await fetch(`${process.env.NEXT_PUBLIC_AZURE_API_URL}/projects-list?company_user_id=${dummyUserId}`);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const projectList = await res.json();
        localStorage.setItem('projectList', JSON.stringify(projectList));
        router.push('/mypage');
    } catch (err) {
        console.error("❌ fetch失敗:", err);
        alert("ログイン中にエラーが発生しました。");
    }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <img src="/研Qロゴ.png" alt="研Q" className="w-[200px] h-24 mb-12" />
        <div className="flex flex-col gap-6 w-full max-w-md">
            <input
            type="email"
            placeholder="Your email"
            className="border border-gray-400 rounded-md px-6 py-4 text-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="password"
            placeholder="Password"
            className="border border-gray-400 rounded-md px-6 py-4 text-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
            onClick={handleLogin}
            className="bg-gray-700 text-white rounded py-4 text-xl font-semibold hover:bg-gray-800"
            >
            Log In
            </button>
                <p className="text-center text-base text-gray-500 mt-3">
                    パスワードを忘れた方は{" "}
                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-blue-600 font-medium cursor-default"
                    >
                    こちら
                </a>
                </p>
            <div className="flex items-center justify-center mt-3">
            <hr className="w-1/4 border-gray-300" />
            <span className="mx-3 text-gray-500 text-base">or</span>
            <hr className="w-1/4 border-gray-300" />
            </div>
            <div className="flex justify-center gap-8 mt-3">
            <img
                src="/Google.png"
                alt="Google login"
                className="w-28 h-auto cursor-pointer"
                onClick={() => alert("Googleログイン未実装")}
            />
            <img
                src="/Facebook.png"
                alt="Facebook login"
                className="w-28 h-auto cursor-pointer"
                onClick={() => alert("Facebookログイン未実装")}
            />
            </div>
                <p className="text-center text-base text-gray-500 mt-3">
                    アカウントをお持ちでない方は{" "}
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 font-medium">
                        新規登録
                    </a>
                </p>
            </div>
        </div>
    );
}
