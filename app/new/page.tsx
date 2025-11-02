"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPastePage() {
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const paste = await res.json();
    router.push(`/paste/${paste.id}`);
  }

  return (
    <>
      <h1>Header</h1>
      <form onSubmit={handleSubmit} className="p-6">
        <textarea
          className="w-full h-64 border rounded p-2"
          placeholder="Write your paste here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </form>
    </>
  );
}
