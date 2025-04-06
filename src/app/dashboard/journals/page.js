"use client";

import { deleteJournal, getJournals } from "@/apis/journalApi";
import RandomJournal from "@/components/journals/RandomJournal";
import MoodIcon from "@/components/others/MoodIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon, Trash2 } from "lucide-react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function Journals() {
  const router = useRouter();

  const [journals, setJournals] = useState([]);

  useEffect(() => {
    (async () => {
      const journals = await getJournals();
      if (!journals.success) return;
      setJournals(journals.data.journals);
    })();
  }, []);

  return (
    <main className="w-full px-10 py-10 min-h-dvh flex gap-10 h-fit flex-col">
      <RandomJournal />
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 w-full">
        {journals.map((journal, i) => {
          const dateDisp = DateTime.fromSeconds(
            journal.created_at
          ).toLocaleString(DateTime.DATE_HUGE);
          return (
            <Card
              className="flex flex-col justify-between h-100"
              key={i}
              onClick={() => {
                router.push(`/dashboard/journals/${journal.journal_id}`);
              }}
            >
              <CardHeader>
                <CardTitle>{journal.title}</CardTitle>
                <CardDescription className="flex items-center">
                  {dateDisp}
                  <MoodIcon moodScore={journal.mood_score} />
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[25rem] overflow-auto">
                {parse(journal.contents || "")}
              </CardContent>
              <CardFooter
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex justify-between"
              >
                <AlertDialog>
                  <AlertDialogTrigger
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    asChild
                  >
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async (e) => {
                          e.stopPropagation();

                          const response = await deleteJournal(
                            journal.journal_id
                          );
                          if (!response.success) return;

                          setJournals((prev) =>
                            [...prev].filter(
                              (j) => j.journal_id !== journal.journal_id
                            )
                          );
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  effect={"expandIcon"}
                  icon={ArrowRightIcon}
                  iconPlacement="right"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/dashboard/journals/${journal.journal_id}?edit=true`
                    );
                  }}
                >
                  Edit
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
