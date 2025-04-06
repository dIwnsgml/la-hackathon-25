import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { FlipWords } from "../ui/flip-words";
import { randomIntInRange } from "@/utils/tools";

const quotes = [
  "Every day may not be good, but there is something good in every day. – Alice Morse Earle",
  "You are stronger than you think.",
  "The darkest hour has only sixty minutes. – Morris Mandel",
  "It's okay to feel down — healing is not linear.",
  "You don’t have to control your thoughts. You just have to stop letting them control you. – Dan Millman",
  "This too shall pass.",
  "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "Small steps every day lead to big changes over time.",
  "One day or day one. You decide.",
  "It’s not whether you get knocked down; it’s whether you get up. – Vince Lombardi",
  "You matter. Your story matters. Your voice matters.",
  "Progress, not perfection.",
  "Healing takes time, and that's okay.",
  "You are doing better than you think.",
  "Even the strongest feelings expire when ignored.",
  "You deserve to take up space.",
  "Peace begins with a deep breath.",
  "Feelings are just visitors. Let them come and go.",
  "Courage doesn’t always roar. Sometimes it’s the quiet voice saying, ‘I will try again tomorrow.’ – Mary Anne Radmacher",
  "You’ve survived 100% of your worst days so far.",
  "Your mind is a garden. Your thoughts are the seeds.",
  "Be gentle with yourself. You’re doing the best you can.",
  "Sometimes rest is the most productive thing you can do.",
  "You are not alone, even when it feels like it.",
  "Your worth is not defined by your productivity.",
  "You are not behind. You are exactly where you need to be.",
  "Trust the timing of your life.",
  "You are not a burden. You are a human being.",
  "Storms make trees take deeper roots. – Dolly Parton",
];

export function RandomQuotes() {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([
    "Every day may not be good, but there is something good in every day. – Alice Morse Earle",
    "You are stronger than you think.",
  ]);

  useEffect(() => {
    const selectedQuotes = [];
    const filteredQuotes = [...quotes];

    while (selectedQuotes.length < 25) {
      const index = randomIntInRange(0, filteredQuotes.length - 1);
      selectedQuotes.push(filteredQuotes[index]);
      filteredQuotes.splice(index, 1);
    }

    setSelectedQuotes(selectedQuotes);
  }, []);

  return (
    <Card className="w-[25rem] h-fit">
      <CardHeader>
        <CardTitle>Daily Dose of Positivity</CardTitle>
        <CardDescription>
          Lift your spirits with a fresh quote every time you visit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FlipWords words={selectedQuotes} />
      </CardContent>
    </Card>
  );
}
