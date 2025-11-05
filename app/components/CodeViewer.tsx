"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const languageMap: Record<string, any> = {
  "Plain Text": null,
  JavaScript: javascript,
  Python: python,
  HTML: html,
  JSON: json,
};

interface CodeViewerProps {
  text: string;
  title: string | null;
  language?: keyof typeof languageMap;
  height?: string;
}

export default function CodeViewer({
  text,
  title,
  language = "Plain Text",
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const extension = languageMap[language] ? [languageMap[language]()] : [];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between my-4">
        <Badge className="bg-slate-100 border border-stone-300 shadow-xs text-black p-2 px-3">
          {language}
        </Badge>
        <Button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer transition-all"
          variant={copied ? "outline" : "default"}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="border rounded-md overflow-hidden w-full">
        {title && (
          <div className="flex items-center h-8 py-6 text-md font-semibold pl-9 placeholder:font-normal placeholder:text-stone-400 border-b ring-b-0 outline-b-0 rounded-b-none">
            {title}
          </div>
        )}
        <CodeMirror
          value={text}
          extensions={extension}
          editable={false}
          readOnly={true}
          height="250px"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
          }}
        />
      </div>
    </div>
  );
}
