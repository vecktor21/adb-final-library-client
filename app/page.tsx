"use client";

import { useQuery } from "@tanstack/react-query";
import fetchBooks from "@/src/services/fetchBooks";

export default function Home() {
  const results = useQuery(["books"], fetchBooks);

  if (results.isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>Loading</h1>
      </div>
    );
  }

  console.log(results.data);

  return (
    <main>
      <h1>nothing</h1>
    </main>
  );
}
