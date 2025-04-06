import { randomIntInRange } from "@/utils/tools";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRightIcon } from "lucide-react";
import { putJournal } from "@/apis/journalApi";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

const allPrompts = [
  "Three things that happened today",
  "One thing I’m grateful for right now",
  "What made me smile this week?",
  "What’s been weighing on my mind lately?",
  "A moment I felt proud of myself",
  "How would I describe my day in one word?",
  "What am I avoiding right now, and why?",
  "What do I need more of in my life?",
  "What’s one habit I want to build?",
  "Where do I see myself in 10 years?",
  "What’s one fear I want to overcome?",
  "What advice would I give my past self?",
  "What does happiness mean to me?",
  "A song or quote that resonates with me and why",
  "What makes me feel safe?",
  "How do I react when I’m stressed?",
  "Who in my life supports me the most?",
  "How do I define success?",
  "What would I do if I wasn’t afraid?",
  "What’s one thing I need to forgive myself for?",
  "Describe a peaceful moment I’ve experienced",
  "What would my ideal day look like?",
  "What do I love most about myself?",
  "What emotions am I feeling right now?",
  "What am I curious about lately?",
  "What’s something I wish more people knew about me?",
  "How can I be kinder to myself?",
  "Describe someone who inspires me",
  "What do I want to let go of?",
  "What’s something I’ve accomplished recently?",
];

export default function RandomJournal() {
  const [prompts, setPrompts] = useState<string[]>([]);

  const router = useRouter();

  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const newPrompts = [];
    const filteredPrompts = [...allPrompts];

    while (newPrompts.length < 5) {
      const index = randomIntInRange(0, filteredPrompts.length - 1);
      newPrompts.push(filteredPrompts[index]);
      filteredPrompts.splice(index, 1);
    }

    setPrompts(newPrompts);
  }, []);

  return (
    <Card className="w-fit h-fit">
      <CardHeader>
        <CardTitle>Choose prompt to start with!</CardTitle>
        <CardDescription>Writing will make you feel better.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {prompts.map((prompt, i) => {
            return (
              <div key={i}>
                <Button
                  type="submit"
                  effect={"expandIcon"}
                  icon={ArrowRightIcon}
                  iconPlacement="right"
                  onClick={async () => {
                    const response = await putJournal({ title: prompt });
                    if (!response.success) return;

                    router.push(
                      `/dashboard/journals/${response.data.journal.journal_id}?edit=true`
                    );
                  }}
                >
                  {prompt}
                </Button>
              </div>
            );
          })}
        </div>
        <Input
          className="mt-4"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          placeholder="Or start with your own prompt!"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              const response = await putJournal({ title: prompt });
              if (!response.success) return;

              router.push(
                `/dashboard/journals/${response.data.journal.journal_id}?edit=true`
              );
            }
          }}
        />
      </CardContent>
    </Card>
  );
}
