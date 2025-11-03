import { PasteResponse } from "@/app/api/paste/route";
import CodeViewer from "@/app/components/CodeViewer";
import { DeactivatedText } from "@/app/components/DeactivatedText";
import PasswordForm from "@/app/components/PasswordForm";

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
  const paste: PasteResponse = await res.json();
  console.log(paste)

  let content;
  if (paste.passwordRequired) {
    content = <PasswordForm pasteId={id} />;
  } else if (paste.deactivated) {
    content = <DeactivatedText reason={paste.deactivatedReason} />;
  } else {
    content = <CodeViewer text={paste.content} language={paste.language || undefined} />;
  }

  return (
    <div className="flex items-center justify-center font-sans">
      <main className="flex flex-col  max-w-4xl w-full">
        {content}
      </main>
    </div>
  );
}
