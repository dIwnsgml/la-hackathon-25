import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getJournals } from "@/apis/journalApi";
import MoodIcon from "../others/MoodIcon";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";
import parse from "html-react-parser";

export default function RecentJournal() {
  const router = useRouter();

  const [journal, setJournal] = useState({});

  useEffect(() => {
    (async () => {
      const journals = await getJournals();
      if (!journals.success || !journals.data.journals.length) return;
      const journal = journals.data.journals[0];
      setJournal(journal);
    })();
  }, []);

  if (!journal?.journal_id) return null;

  const dateDisp = DateTime.fromSeconds(journal.created_at).toLocaleString(
    DateTime.DATE_HUGE
  );

  return (
    <Card
      onClick={() => {
        router.push(`/dashboard/journals/${journal.journal_id}`);
      }}
    >
      <CardHeader>
        <CardTitle>Latest Journal - {journal.title}</CardTitle>
        <CardDescription className="flex items-center">
          {dateDisp}
          <MoodIcon moodScore={journal.mood_score} />
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[20rem] overflow-auto">
        {parse(journal.contents || "")}
      </CardContent>
      <CardFooter>
        <Button
          effect={"expandIcon"}
          icon={ArrowRightIcon}
          iconPlacement="right"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/dashboard/journals/${journal.journal_id}?edit=true`);
          }}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
