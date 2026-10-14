import fs from "node:fs";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);
const PDF_EXT = ".pdf";

type Certificate = {
  title: string;
  href: string;
  kind: "image" | "pdf";
};

function toTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  const cleaned = base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

function readCertificates(): Certificate[] {
  const dir = path.join(process.cwd(), "public", "certificates");
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return entries
    .filter((name) => !name.startsWith("."))
    .map((name) => {
      const ext = path.extname(name).toLowerCase();
      const href = `/api/certificates/${encodeURIComponent(name)}`;
      if (ext === PDF_EXT) {
        return { title: toTitle(name), href, kind: "pdf" as const };
      }
      if (IMAGE_EXT.has(ext)) {
        return { title: toTitle(name), href, kind: "image" as const };
      }
      return null;
    })
    .filter((c): c is Certificate => c !== null)
    .sort((a, b) => a.title.localeCompare(b.title, "id"));
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

  return (
    <div className="certs">
      {certificates.map((cert) => (
        <a
          key={cert.href}
          className="cert reveal"
          href={cert.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Buka ${cert.title}`}
        >
          <div className="cert__media">
            {cert.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cert.href} alt={cert.title} loading="lazy" />
            ) : (
              <div className="cert__pdf" aria-hidden="true">
                <span className="cert__pdf-badge">PDF</span>
              </div>
            )}
          </div>
          <div className="cert__body">
            <h3 className="cert__title">{cert.title}</h3>
            <span className="cert__link">Lihat sertifikat →</span>
          </div>
        </a>
      ))}
    </div>
  );
}
