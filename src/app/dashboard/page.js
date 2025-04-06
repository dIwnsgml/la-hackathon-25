"use client";

import { getJournals } from "@/apis/journalApi";
import MoodTrendChart from "@/components/journals/MoodTrendChart";
import RandomJournal from "@/components/journals/RandomJournal";
import RecentJournal from "@/components/journals/RecentJournal";
import { RandomQuotes } from "@/components/others/RandomQuotes";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function Home() {
  const [moodScores, setMoodScore] = useState([]);

  useEffect(() => {
    (async () => {
      const moodMap = [];
      const journals = await getJournals();
      if (!journals.success) return;

      for (const journal of journals.data.journals) {
        const date = DateTime.fromSeconds(journal.created_at).toFormat(
          "yyyy-MM-dd"
        );
        if (!moodMap[date]) moodMap[date] = [];
        moodMap[date].push(journal.mood_score);
      }

      const averaged = Object.entries(moodMap).map(([date, moods]) => {
        const avg = moods.reduce((a, b) => a + b, 0) / moods.length;
        return { date, mood: Math.round(avg) };
      });
      setMoodScore(averaged);
    })();
  }, []);

  return (
    <main className="w-full px-10 py-10 h-[50vh]">
      <div className="flex gap-10">
        <RandomJournal />
        <div className="flex flex-col gap-10 w-min max-w-2xl">
          <RecentJournal />
          <RandomQuotes />
        </div>
        <MoodTrendChart moodScores={moodScores} />
      </div>
    </main>
  );
}
