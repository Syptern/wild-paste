import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="p-4 w-full">
      <div className="flex gap-4 items-center">
        <h2 className="text-xl font-semibold text-slate-800">Share Link</h2>
        <Input value={url} readOnly className="flex-1 font-mono text-sm" />
        <Button
          onClick={handleCopy}
          variant={copied ? "default" : "outline"}
          size="icon"
          className="cursor-pointer"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}
