"use client";

import { Button } from "@/components/ui/button";
import LiveCodeEditor from "./LiveCodeEditor";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExpiryDatePicker } from "./ExpiryDatePicker";
import { PasswordInput } from "./PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { CreatePasteRequest, PasteResponse } from "../api/paste/route";
import { Label } from "@/components/ui/label";
import { Paste } from "../generated/prisma/client";
import CodeViewer from "./CodeViewer";
import CopyLink from "./CopyLink";

export default function PasteEditor() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<string | null>("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [readOnce, setReadOnce] = useState<boolean>(false);
  const [createdPaste, setCreatedPaste] = useState<PasteResponse | null>(null)

  useEffect(() => {
    console.log(expiryDate)
    console.log(password)
    console.log(readOnce)
  }, [expiryDate, password, readOnce])

  async function handleSubmit() {
    const paste = await createPaste({
      title: "test title",
      content,
      expiresAt: expiryDate,
      readOnce,
      password,
      language
    })
    setCreatedPaste(paste)
    window.history.pushState(null, "", "/");
    window.history.replaceState(null, "", `/paste/${paste.id}`);
  }

  const createPaste = async (data: CreatePasteRequest): Promise<PasteResponse> => {
  const response = await fetch("/api/paste", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create paste");
  }

  return response.json();
}

  const handleEditorChange = ({
    code,
    language,
  }: {
    code: string;
    language: string;
  }) => {
    setContent(code);
    setLanguage(language);
  };

   return createdPaste?
    (<div className="flex flex-col gap-4 items-center">
      <CopyLink url={`${process.env.NEXT_PUBLIC_BASE_URL}/paste/${createdPaste.id}`}/>
     <CodeViewer text={createdPaste.content}/>
    </div>) 
    :
   (
    <div className="flex flex-col gap-2">
      <LiveCodeEditor onChange={handleEditorChange} />
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <ExpiryDatePicker onChange={setExpiryDate}/>
        <PasswordInput onChange={v=>setPassword(v)}/>
    <div
      onClick={() => setReadOnce(!readOnce)}
      className="flex items-center gap-2 cursor-pointer border rounded-md px-3 py-2 bg-white shadow-xs hover:bg-accent"
    >
      <div className="pointer-events-none flex gap-2">
    <Checkbox checked={readOnce} />
      <Label>One time read</Label>
      </div>
      
        </div>        
            <Button className="inline-block cursor-pointer" onClick={handleSubmit}>
              Save & Share
              <ArrowRight className="inline ml-2" />
            </Button>
          </div>
        </div>
  );
}
