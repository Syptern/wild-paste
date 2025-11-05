"use client";

import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const languageMap: Record<string, any> = {
  "Plain Text": null,
  JavaScript: javascript,
  Python: python,
  HTML: html,
  JSON: json,
};

interface LiveCodeEditorProps {
  onChange?: (value: {
    code: string;
    language: string;
    title: string | null;
  }) => void;
}

export default function LiveCodeEditor({ onChange }: LiveCodeEditorProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Plain Text");
  const [title, setTitle] = useState<string | null>(null);

  const extension = languageMap[language] ? [languageMap[language]()] : [];

  // Notify parent whenever code or language changes
  useEffect(() => {
    onChange?.({ code, language, title });
  }, [code, language, onChange, title]);

  return (
    <div className="space-y-2">
      <Select
        value={language}
        onValueChange={setLanguage}
        name="language-select"
      >
        <SelectTrigger className="w-40 bg-white">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(languageMap).map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* CodeMirror Editor */}
      <div className="border rounded-md overflow-hidden">
        <Input
          type="text"
          name="title"
          placeholder="Enter a title..."
          className="h-8 py-6  text-lg font-semibold pl-9 placeholder:font-normal placeholder:text-stone-400  border-l-0 border-t-0 border-r-0  ring-b-0 outline-b-0 rounded-b-none"
          onChange={(e) => setTitle(e.target.value || null)}
        />
        <CodeMirror
          placeholder="Start writing or pasting..."
          value={code}
          height="300px"
          extensions={extension}
          onChange={setCode}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            highlightActiveLineGutter: true,
          }}
        />
      </div>
    </div>
  );
}
