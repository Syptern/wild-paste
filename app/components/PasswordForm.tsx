"use client";

import { useState } from "react";
import CodeViewer from "./CodeViewer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasteInformation } from "./PasteInformation";
import { PasteResponse } from "../api/paste/route";

interface PasswordFormProps {
  pasteId: string;
}

export default function PasswordForm({ pasteId }: PasswordFormProps) {
  const [password, setPassword] = useState("");
  const [paste, setPaste] = useState<PasteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/paste/${pasteId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error("Incorrect password");
      const data = await res.json();
      setPaste(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (paste) {
    return (
      <>
        <CodeViewer
          title={paste.title}
          text={paste.content}
          language={paste.language || undefined}
          height="250px"
        />
        <PasteInformation paste={paste} />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
