import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.CRON_SECRET;

  if (!expectedToken) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find all pastes that have expired but are not yet deactivated
    const expiredPastes = await prisma.paste.findMany({
      where: {
        expiresAt: { lt: new Date() },
        deactivated: false,
      },
    });

    if (expiredPastes.length === 0) {
      return NextResponse.json({ message: "No expired pastes found" });
    }

    // Update all expired pastes
    const updatedPastes = await Promise.all(
      expiredPastes.map(async (paste) => {
        return prisma.paste.update({
          where: { id: paste.id },
          data: {
            title: null,
            content: "(deleted)",
            readOnce: false,
            password: null,
            deactivated: true,
            deactivatedReason: "expired",
          },
        });
      })
    );

    return NextResponse.json({
      message: `${updatedPastes.length} expired pastes updated`,
      updatedPastes: updatedPastes.map((p) => ({
        id: p.id,
        deactivatedReason: p.deactivatedReason,
      })),
    });
  } catch (error) {
    console.error("Error updating expired pastes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
