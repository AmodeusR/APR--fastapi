"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const response = await fetch(`https://apr--fastapi.amodeusr.workers.dev/api/search?q=${input}`);
      const data = await response.json() as {results: string[], duration: number};
      
      setSearchResults(data);
    };

    fetchData();
  }, [input]);
  return (
    <main className="flex flex-col items-center h-screen grainy">
      <div className="flex flex-col items-center mt-48 gap-6 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5 container">
        <h1 className="font-bold text-5xl tracking-tight">SpeedSearch</h1>
        <span className="text-zinc-600 text-lg max-w-prose text-center">
          A high-performance API built with NextJS, Hono, Redis and Cloudfare.{" "}
          <br /> Type a query below and get your response in miliseconds.
        </span>

        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search countries..."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results found</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((result) => (
                    <CommandItem key={result} value={result} onSelect={setInput}>{result}</CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200"></div>
                  <span className="p-2 text-xs text-zinc-500">
                    Found {searchResults.results.length} in {searchResults.duration.toFixed(0)}ms
                  </span>
                </>
              ): null}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
