"use client";

import { getChatJournal } from "@/apis/chatApi";
import { deleteJournal, patchJournal } from "@/apis/journalApi";
import Editor from "@/components/editor/Editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Input } from "@/components/ui/input";
import { useAccount } from "@/hooks/accountHooks";
import useJournal from "@/hooks/journalsHooks";
import socket from "@/utils/sockets/socket";
import { Save, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
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
import parse from "html-react-parser";
import { DateTime } from "luxon";

type PageProps = {
  params: Promise<{ journal_id: string }>;
};

export default function Journal({ params }: PageProps) {
  const { journal_id } = use(params);

  const router = useRouter();

  const { accountData } = useAccount();

  const [htmlValue, setHtmlValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit");

  const { journalData, clearJournalData } = useJournal(journal_id);

  const [debouncedText] = useDebounce(textValue, 5000);

  const [messages, setMessages] = useState<any[]>([]);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!journal_id) return;

    (async () => {
      const response = await getChatJournal(journal_id);
      console.log("res", response);
      if (!response.success) return;
      setMessages(response.data.messages);
    })();

    const onMessage = (message: any) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("journal:chat", onMessage);

    return () => {
      socket.off("journal:chat", onMessage);
    };
  }, [journal_id]);

  useEffect(() => {
    if (!debouncedText) return;
    socket.emit("journal:comment", {
      journal_id,
      prevMsgs: messages,
      title: journalData.title,
      content: textValue,
    });
  }, [debouncedText]);

  return (
    <main className="w-full px-10 py-10 h-[100vh] flex gap-10">
      <Card className="flex flex-col gap-3 w-full">
        <CardHeader>
          <div className="mb-5">
            <JournalBreadCrumb title={journalData?.title} />
          </div>
          <CardTitle>{journalData?.title}</CardTitle>
          <CardDescription>
            {DateTime.fromSeconds(journalData?.created_at || 0).toLocaleString(
              DateTime.DATE_HUGE
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full mb-5">
          <div>
            {isEdit === "true" && journalData?.contents ? (
              <Editor
                value={journalData?.contents}
                onHtmlChange={(newValue) => setHtmlValue(newValue)}
                onTextChange={(text) => {
                  setTextValue(text);
                }}
              />
            ) : (
              <div className="overflow-auto h-[70vh]">
                {parse(journalData?.contents || "")}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const response = await deleteJournal(journal_id);
                    if (!response.success) return;

                    router.push("/dashboard/journals");
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {isEdit === "true" ? (
            <Button
              effect={"expandIcon"}
              icon={Save}
              iconPlacement="right"
              onClick={async () => {
                const response = await patchJournal({
                  journal_id,
                  title: journalData?.title,
                  contents: htmlValue,
                });

                if (!response) return;

                router.push("/dashboard/journals");
                clearJournalData();
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              effect={"expandIcon"}
              icon={Save}
              iconPlacement="right"
              onClick={async () => {
                const currentParams = new URLSearchParams(searchParams);
                currentParams.set("edit", "true");
                router.push(`?${currentParams.toString()}`);
              }}
            >
              Edit
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="w-2xl h-[90vh] bg-white">
        <ChatMessageList>
          {messages.map((message, i) => {
            const isMe = accountData?.user_id === message.user_id;
            return (
              <ChatBubble variant={isMe ? "sent" : "received"} key={i}>
                <ChatBubbleAvatar fallback={isMe ? "Me" : "AI"} />
                <ChatBubbleMessage variant={isMe ? "sent" : "received"}>
                  {message.message}
                </ChatBubbleMessage>
              </ChatBubble>
            );
          })}
        </ChatMessageList>
        <Input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setNewMessage("");
              socket.emit("journal:chat", {
                journal_id,
                message: newMessage,
                prevMsgs: messages,
                title: journalData.title,
                content: textValue,
              });
            }
          }}
        />
      </div>
    </main>
  );
}

type BreadCrumbProps = {
  title: string;
};

function JournalBreadCrumb({ title }: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/journals">Journals</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
