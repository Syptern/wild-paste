"use client";

import { Button } from "@/components/ui/button";
import LiveCodeEditor from "./LiveCodeEditor";
import { ArrowRight, LoaderCircle } from "lucide-react";
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
import { PasteInformation } from "./PasteInformation";
import { Input } from "@/components/ui/input";

export default function PasteEditor() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<string | null>("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [readOnce, setReadOnce] = useState<boolean>(false);
  const [createdPaste, setCreatedPaste] = useState<PasteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    const paste = await createPaste({
      title,
      content,
      expiresAt: expiryDate,
      readOnce,
      password,
      language,
    });
    setLoading(false);
    setCreatedPaste(paste);
    window.history.pushState(null, "", "/");
    window.history.pushState(null, "", `/paste/${paste.id}`);
  }

  const createPaste = async (
    data: CreatePasteRequest
  ): Promise<PasteResponse> => {
    const response = await fetch("/api/paste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    let json: any;
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { error: text };
    }

    if (!response.ok) {
      // the backend sends { error: "..." }
      setError(json.error || "Unknown error occurred");
      setLoading(false);
      throw new Error(json.error || "Unknown error occurred");
    }

    return json as PasteResponse;
  };

  useEffect(() => {
    const onPopState = () => {
      // If URL is /, reset the createdPaste state
      if (window.location.pathname === "/") {
        setCreatedPaste(null);
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const handleEditorChange = ({
    code,
    language,
    title,
  }: {
    code: string;
    language: string;
    title: string | null;
  }) => {
    setContent(code);
    setLanguage(language);
    setTitle(title);
  };

  return createdPaste ? (
    <div className="flex flex-col gap-4 items-center">
      <CopyLink
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/paste/${createdPaste.id}`}
      />
      <CodeViewer
        title={createdPaste.title}
        language={createdPaste.language || undefined}
        text={createdPaste.content}
      />
      <PasteInformation paste={createdPaste} />
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <LiveCodeEditor onChange={handleEditorChange} />
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <ExpiryDatePicker onChange={setExpiryDate} />
        <PasswordInput onChange={(v) => setPassword(v)} />
        <div
          onClick={() => setReadOnce(!readOnce)}
          className="flex items-center gap-2 cursor-pointer border rounded-md px-3 py-2 bg-white shadow-xs hover:bg-accent"
        >
          <div className="pointer-events-none flex gap-2">
            <Checkbox name="read-once" id="read-once" checked={readOnce} />
            <Label htmlFor="read-once">One time read</Label>
          </div>
        </div>
        <Button
          name="submit"
          className="flex cursor-pointer min-w-40 justify-center"
          onClick={handleSubmit}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Save & share"}
          <ArrowRight className="inline ml-2" />
        </Button>
      </div>
      <div className="flex justify-end">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    </div>
  );
}
