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

const languageMap: Record<string, any> = {
  "Plain Text": null,
  JavaScript: javascript,
  Python: python,
  HTML: html,
  JSON: json,
};

interface LiveCodeEditorProps {
  onChange?: (value: { code: string; language: string }) => void;
}

export default function LiveCodeEditor({ onChange }: LiveCodeEditorProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Plain Text");

  const extension = languageMap[language] ? [languageMap[language]()] : [];

  // Notify parent whenever code or language changes
  useEffect(() => {
    onChange?.({ code, language });
  }, [code, language, onChange]);

  return (
    <div className="space-y-2">
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-40 bg-slate-50">
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
        <CodeMirror
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
