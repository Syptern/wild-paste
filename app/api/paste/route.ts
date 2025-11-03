import { Paste, PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; 

const prisma = new PrismaClient();

export interface CreatePasteRequest {
  title: string;
  content: string;
  expiresAt: Date | null,
  readOnce: boolean,
  password: string | null,
  language: string | null,
}

export interface PasteResponse extends Paste {
  passwordRequired: boolean,
}


export async function POST(request: Request) {
  try {
    const body: CreatePasteRequest = await request.json();
    const { title, content, language, expiresAt, readOnce, password } = body;
    
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (title.length > 100) {
      return NextResponse.json(
        { error: "Title exceeds 100 characters" },
        { status: 400 }
      );
    }

    if (content.length > 50000) {
      return NextResponse.json(
        { error: "Content exceeds 50.000 characters" },
        { status: 400 }
      );
    }

    let hashedPassword: string | null = null;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const paste = await prisma.paste.create({
      data: { title, content, language, password: hashedPassword, readOnce, expiresAt},
    });
    console.log(paste)
    return NextResponse.json<PasteResponse>({...paste, passwordRequired: false, password:null});
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to create paste" },
      { status: 500 }
    );
  }
}