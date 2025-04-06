"use client";

import RandomJournal from "@/components/journals/RandomJournal";

export default function Home() {
  return (
    <main className="w-full px-10 py-10 min-h-dvh">
      <div>
        <RandomJournal />
      </div>
    </main>
  );
}
