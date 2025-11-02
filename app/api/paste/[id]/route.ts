import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const paste = await prisma.paste.findUnique({
    where: { id: id },
  });
  if (!paste) return NextResponse.json({ error: "Not found" }, { status: 404 });
  console.log(paste);
  return NextResponse.json(paste);
}
