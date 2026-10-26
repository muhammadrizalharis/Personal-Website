import { NextRequest } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
};

const CERT_DIR = path.join(process.cwd(), "public", "certificates");

function isSafe(name: string): boolean {
  return !(name.includes("/") || name.includes("\\") || name.includes("..") || name.startsWith("."));
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const name = decodeURIComponent(file);
  if (!isSafe(name)) {
    return new Response("Not found", { status: 404 });
  }

  const wantThumb = req.nextUrl.searchParams.get("thumb") === "1";

  // Thumbnail: halaman pertama PDF yang sudah dirender ke PNG di .thumbs/.
  if (wantThumb) {
    const base = name.replace(/\.[^.]+$/, "");
    const thumbPath = path.join(CERT_DIR, ".thumbs", `${base}.png`);
    try {
      const data = await fs.readFile(thumbPath);
      return new Response(data as unknown as BodyInit, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=300",
        },
      });
    } catch {
      return new Response("Not found", { status: 404 });
    }
  }

  const ext = path.extname(name).toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(CERT_DIR, name);
  try {
    const data = await fs.readFile(filePath);
    return new Response(data as unknown as BodyInit, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${name}"`,
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
