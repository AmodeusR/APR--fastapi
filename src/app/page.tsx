"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{ results: string[], duration: number }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setResults(undefined);

      await fetch(`/api/search?q=${input}`);
    }

    fetchData();  
  });
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1>Speedsearch</h1>
      <span>A high-performance API built with Hono, Next and Redis. Type a query below and get your response in miliseconds.</span>
      <input className="bg-red-600" type="text" value={input} onChange={(e) => (setInput(e.target.value))} />
    </main>
  );
}
