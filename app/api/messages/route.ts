import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NAME_MAX = 80;
const BODY_MAX = 500;

// GET /api/messages — 20 pesan terbaru dari buku tamu.
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("GET /api/messages gagal:", err);
    return NextResponse.json(
      { error: "Database tidak tersedia.", messages: [] },
      { status: 503 },
    );
  }
}

// POST /api/messages — simpan pesan baru.
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid." }, { status: 400 });
  }

  const data = payload as { name?: unknown; body?: unknown };
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const body = typeof data.body === "string" ? data.body.trim() : "";

  if (!name || !body) {
    return NextResponse.json(
      { error: "Nama dan pesan wajib diisi." },
      { status: 400 },
    );
  }
  if (name.length > NAME_MAX || body.length > BODY_MAX) {
    return NextResponse.json(
      { error: `Nama maks ${NAME_MAX} dan pesan maks ${BODY_MAX} karakter.` },
      { status: 400 },
    );
  }

  try {
    const message = await prisma.message.create({ data: { name, body } });
    return NextResponse.json({ message }, { status: 201 });
  } catch (err) {
    console.error("POST /api/messages gagal:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan pesan." },
      { status: 503 },
    );
  }
}
