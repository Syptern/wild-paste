import CodeViewer from "@/app/components/CodeViewer";
import { notFound } from "next/navigation";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/paste/${id}`
  );
  if (!res.ok) return notFound();
  const paste = await res.json();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex flex-col min-h-screen max-w-4xl w-full my-20">
        <CodeViewer text={paste.content} language="Python" height="250px" />{" "}
      </main>
    </div>
  );
}
