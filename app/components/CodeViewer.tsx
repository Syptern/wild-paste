"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";

const languageMap: Record<string, any> = {
  "Plain Text": null,
  JavaScript: javascript,
  Python: python,
  HTML: html,
  JSON: json,
};

interface CodeViewerProps {
  text: string;
  language?: keyof typeof languageMap;
  height?: string;
}

export default function CodeViewer({
  text,
  language = "Plain Text",
}: CodeViewerProps) {
  const extension = languageMap[language] ? [languageMap[language]()] : [];

  return (
    <div className="border rounded-md overflow-hidden bg-slate-50 w-full">
      <div className="px-3 py-2 text-sm font-medium bg-slate-100 border-b text-slate-700">
        {language}
      </div>
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
  );
}
