"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { Badge } from "@/components/ui/badge";

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
  const extension = languageMap[language] ? [languageMap[language]()] : [];

  return (
    <div className="flex flex-col w-full">
      <Badge className="bg-slate-100 border border-stone-300 shadow-xs text-black my-4 p-2 px-3">
        {language}
      </Badge>
      <div className="border rounded-md overflow-hidden w-full">
        {title && (
          <div className="flex items-center h-8 py-6 text-md font-semibold pl-9 placeholder:font-normal placeholder:text-stone-400  border-b ring-b-0 outline-b-0 rounded-b-none">
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
