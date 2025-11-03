import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; 
import { PasteResponse } from "../route";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string}> }
) {
  const { id } = await params;
  const paste = await prisma.paste.findUnique({
    where: { id: id },
  });
  if (!paste) return NextResponse.json({ error: "Not found" }, { status: 404 });

  console.log(paste);

  if(paste.password) return NextResponse.json({passwordRequired: true})

  if(paste.readOnce) {
    await prisma.paste.update({
    where: { id: id },
    data: {
      title: null,
      content: "(deleted)",
      readOnce: false,
      deactivated: true,
      deactivatedReason: "read-once"
  }})
  }
  return NextResponse.json<PasteResponse>({...paste, password: null, passwordRequired: false});
}


export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string}> }
) {
  const { id } = await params;
  const paste = await prisma.paste.findUnique({
    where: { id: id },
  });
  if (!paste) return NextResponse.json({ error: "Not found" }, { status: 404 });

  console.log(paste);
  const body = await request.json().catch(() => null);
  const password = body?.password;  

  if(paste.password && !password) return NextResponse.json({passwordRequired: true})
  if(paste.password && password) {
    console.log(paste.password, password)
    const isMatch = await bcrypt.compare(password, paste.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  }
  return NextResponse.json<PasteResponse>({...paste, password: null, passwordRequired: false});
}
