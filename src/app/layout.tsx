// src/app/layout.tsx
"use client";

import "./globals.css";
import { FormProvider } from "@/context/FormContext";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showHeader = !pathname.startsWith("/login");

  return (
    <html lang="ja">
      <body className="antialiased">
        <FormProvider>
          {showHeader && <Header />}
          <main className="p-4">{children}</main>
        </FormProvider>
      </body>
    </html>
  );
}

