import fs from "node:fs";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import CertificateGallery, { type Certificate } from "./CertificateGallery";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);
const PDF_EXT = ".pdf";
const CERT_DIR = path.join(process.cwd(), "public", "certificates");

type LabelEntry = { title?: string; issuer?: string };

function cleanTitle(filename: string): string {
  let base = filename.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
  base = base
    .split(/\s+/)
    .filter((tok) => {
      if (/^\d{5,}$/.test(tok)) return false;
      if (/^[0-9a-f]{6,}$/i.test(tok) && /\d/.test(tok)) return false;
      return true;
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (!base) base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/\b\w/g, (c) => c.toUpperCase());
}

function readLabels(): Record<string, LabelEntry> {
  try {
    const raw = fs.readFileSync(path.join(CERT_DIR, "labels.json"), "utf8");
    const parsed = JSON.parse(raw) as Record<string, string | LabelEntry>;
    const out: Record<string, LabelEntry> = {};
    for (const [key, val] of Object.entries(parsed)) {
      out[key] = typeof val === "string" ? { title: val } : val;
    }
    return out;
  } catch {
    return {};
  }
}

function readCertificates(): Certificate[] {
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(CERT_DIR);
  } catch {
    return [];
  }

  const labels = readLabels();
  const result: Certificate[] = [];

  for (const name of entries) {
    if (name.startsWith(".")) continue;
    const ext = path.extname(name).toLowerCase();
    const isPdf = ext === PDF_EXT;
    const isImage = IMAGE_EXT.has(ext);
    if (!isPdf && !isImage) continue;

    const label = labels[name] ?? {};
    const encoded = encodeURIComponent(name);
    result.push({
      title: label.title?.trim() || cleanTitle(name),
      issuer: label.issuer?.trim() || undefined,
      src: `/api/certificates/${encoded}`,
      preview: isPdf ? `/api/certificates/${encoded}?thumb=1` : `/api/certificates/${encoded}`,
      kind: isPdf ? "pdf" : "image",
    });
  }

  return result.sort((a, b) => a.title.localeCompare(b.title, "id"));
}

export default function Certificates() {
  noStore();
  const certificates = readCertificates();

  if (certificates.length === 0) {
    return (
      <div className="certs__empty reveal">
        <p>Belum ada sertifikat yang ditambahkan.</p>
        <p className="certs__hint">
          Taruh file (gambar atau PDF) di folder <code>public/certificates/</code>, lalu muat ulang halaman.
        </p>
      </div>
    );
  }

  return <CertificateGallery certificates={certificates} />;
}
