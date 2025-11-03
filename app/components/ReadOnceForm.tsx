"use client";

import { useState } from "react";
import CodeViewer from "./CodeViewer";
import { Button } from "@/components/ui/button";

interface ReacOnceFormProps {
  pasteId: string;
}

export default function ReacOnceForm({ pasteId }: ReacOnceFormProps) {
  const [paste, setPaste] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/paste/${pasteId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readOnce: true }),
      });

      if (!res.ok) throw new Error("Error opening paste");
      const data = await res.json();
      setPaste(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (paste) {
    return <CodeViewer text={paste.content} language={paste.language || undefined} height="250px" />;
  }

  return (
   
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
      
  );
}
