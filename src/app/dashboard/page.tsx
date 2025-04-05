"use client";

import Editor from "@/components/editor/Editor";
import { SerializedEditorState } from "lexical";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [value, setValue] = useState<SerializedEditorState | undefined>();
  const [htmlValue, setHtmlValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const [debouncedText] = useDebounce(textValue, 5000);

  useEffect(() => {
    console.log("toast");
    toast.info("looks like you are ");
  }, [debouncedText]);

  return (
    <main className="w-full px-10 py-10 min-h-dvh">
      <Editor
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onHtmlChange={(newValue) => setHtmlValue(newValue)}
        onTextChange={(text) => {
          setTextValue(text);
        }}
      />
    </main>
  );
}
