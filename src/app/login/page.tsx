"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [companyUserName, setCompanyUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        company_user_name: companyUserName,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("ログインに失敗しました。ユーザー名とパスワードを確認してください。");
        console.error("Login failed:", result.error);
      } else {
        router.push("/mypage");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl text-gray-600 font-bold mb-2">研Q</h1>
          <h2 className="text-2xl text-gray-600 font-bold">研究者ログイン</h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="companyUserName"
              className="block text-sm font-medium text-gray-700"
            >
              ユーザー名
            </label>
            <input
              id="companyUserName"
              name="companyUserName"
              type="text"
              required
              value={companyUserName}
              onChange={(e) => setCompanyUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:ring focus:ring-indigo-300 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:ring focus:ring-indigo-300 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {isLoading ? "ログイン中..." : "ログイン"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
