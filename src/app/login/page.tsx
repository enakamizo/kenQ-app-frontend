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
        const res = await fetch(`/api/projects-list?company_user_id=${dummyUserId}`);
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
            <img src="/研Qロゴ.png" alt="研Q" className="w-124 h-24 mb-6" />
            <div className="flex flex-col gap-3 w-80">
                <input
                    type="email"
                    placeholder="Your email"
                    className="border border-gray-300 rounded px-4 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded px-4 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="bg-gray-700 text-white rounded py-2 font-semibold hover:bg-gray-800"
                >
                    Log In
                </button>
                <p className="text-center text-sm text-gray-500 mt-2">パスワードを忘れた方はこちら</p>
                <div className="flex items-center justify-center mt-4">
                    <hr className="w-1/4 border-gray-300" />
                    <span className="mx-2 text-gray-500 text-sm">or</span>
                    <hr className="w-1/4 border-gray-300" />
                </div>
                <div className="flex justify-center gap-6 mt-4">
                <img
                    src="/Google.png"
                    alt="Google login"
                    className="w-24 h-auto cursor-pointer" // 約64px
                    onClick={() => alert("Googleログイン未実装")}
                />
                <img
                    src="/Facebook.png"
                    alt="Facebook login"
                    className="w-24 h-auto cursor-pointer"
                    onClick={() => alert("Facebookログイン未実装")}
                />
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                    アカウントをお持ちでない方は{" "}
                    <a href="/register" className="text-blue-600 font-medium">新規登録</a>
                </p>
            </div>
        </div>
    );
}
