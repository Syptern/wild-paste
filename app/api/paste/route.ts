import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const paste = await prisma.paste.create({
    data: { title, content },
  });
  return NextResponse.json(paste);
}
