"use client";

import { getChatJournal } from "@/apis/chatApi";
import Editor from "@/components/editor/Editor";
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
import { SerializedEditorState } from "lexical";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type PageProps = {
  params: Promise<{ journal_id: string }>;
};

export default function Home({ params }: PageProps) {
  const { journal_id } = use(params);
  const { accountData } = useAccount();

  const [value, setValue] = useState<SerializedEditorState | undefined>();
  const [htmlValue, setHtmlValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit");

  const { journalData } = useJournal(journal_id);

  const [debouncedText] = useDebounce(textValue, 10000);

  const [newJournal, setNewJournal] = useState({ title: "", contents: "" });

  useEffect(() => {
    if (!journalData) return;

    setNewJournal((prev) => ({ ...prev, ...journalData }));
  }, [journalData]);

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
    <main className="w-full px-10 py-10 min-h-dvh flex gap-10">
      <div className="flex flex-col gap-3 w-full">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={newJournal.title}
            onChange={(e) => {
              setNewJournal((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </div>
        {isEdit === "true" ? (
          <Editor
            value={value}
            onChange={(newValue) => setValue(newValue)}
            onHtmlChange={(newValue) => setHtmlValue(newValue)}
            onTextChange={(text) => {
              setTextValue(text);
            }}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-xl h-[90vh] bg-white">
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
