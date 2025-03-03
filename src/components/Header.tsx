"use client";  // ← 追加

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white">
      <div className="text-xl font-bold">
        <Link href="/">研Q</Link>
      </div>
      <nav className="flex space-x-4">
        <Link href="/mypage" className="flex items-center">
          📅 マイページ
        </Link>
        <Link 
          href="/register" 
          className={`flex items-center border-b-2 ${
            pathname.startsWith("/register") ? "border-black" : "border-transparent"
          }`}
        >
          ✏️ 新規登録
        </Link>
        <Link href="/messages" className="flex items-center">
          📧 メッセージ
        </Link>
      </nav>
      <div className="flex items-center space-x-2">
        <span>Junior Garcia</span>
        <img src="/profile.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" />
      </div>
    </header>
  );
};

export default Header;
