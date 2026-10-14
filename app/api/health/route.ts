import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// GET /api/health — status aplikasi + konektivitas database.
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", database: "up" });
  } catch {
    return NextResponse.json(
      { status: "degraded", database: "down" },
      { status: 503 },
    );
  }
}
