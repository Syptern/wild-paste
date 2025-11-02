"use client";

import { Button } from "@/components/ui/button";
import LiveCodeEditor from "./LiveCodeEditor";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasteEditor() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("");

  const router = useRouter();

  async function handleSubmit() {
    const res = await fetch("/api/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, language }),
    });
    const paste = await res.json();
    router.push(`/paste/${paste.id}`);
  }

  const handleEditorChange = ({
    code,
    language,
  }: {
    code: string;
    language: string;
  }) => {
    console.log("Code:", code);
    setContent(code);
    console.log("Language:", language);
    setLanguage(language);
  };

  return (
    <div className="flex flex-col gap-2">
      <LiveCodeEditor onChange={handleEditorChange} />
      <div className="flex justify-end">
        <Button className="inline-block cursor-pointer" onClick={handleSubmit}>
          Save & Share
          <ArrowRight className="inline ml-2" />
        </Button>
      </div>
    </div>
  );
}
