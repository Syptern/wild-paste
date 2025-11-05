import { PasteResponse } from "@/app/api/paste/route";
import CodeViewer from "@/app/components/CodeViewer";
import { DeactivatedText } from "@/app/components/DeactivatedText";
import { Header } from "@/app/components/Header";
import PasswordForm from "@/app/components/PasswordForm";
import { PasteInformation } from "@/app/components/PasteInformation";
import { Metadata } from "next";

import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/paste/${id}`
  );

  if (!res.ok) {
    return {
      title: "Paste Not Found",
    };
  }

  const paste: PasteResponse = await res.json();

  return {
    title: paste.passwordRequired
      ? "Paste is password protected"
      : paste.title || `Paste`,
    description: paste.passwordRequired
      ? "This paste is password protected"
      : paste.deactivated
      ? "This paste has been deactivated"
      : paste.content.slice(0, 50),
  };
}

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

  let content;
  if (paste.passwordRequired) {
    content = <PasswordForm pasteId={id} />;
  } else if (paste.deactivated) {
    content = <DeactivatedText reason={paste.deactivatedReason} />;
  } else {
    content = (
      <>
        <CodeViewer
          title={paste.title}
          text={paste.content}
          language={paste.language || undefined}
        />
        <PasteInformation paste={paste} />
      </>
    );
  }

  return (
    <>
      <Header></Header>

      <div className="flex items-center justify-center font-sans">
        <main className="flex flex-col  max-w-4xl w-full">{content}</main>
      </div>
    </>
  );
}
