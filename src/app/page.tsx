"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">8000の表示内容をもってきた: {message}</h1>
    </main>
  );
}
