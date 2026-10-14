// =============================================================================
// Daftar proyek yang tampil di bagian "Proyek" halaman utama.
// Edit file ini untuk menambah / mengubah proyek — tidak perlu sentuh page.tsx.
//
// - title   : nama proyek yang tampil
// - icon    : emoji di pojok kartu
// - desc    : deskripsi singkat (1–2 kalimat)
// - tags    : teknologi / kata kunci (muncul sebagai label)
// - repo    : (opsional) link GitHub — jika diisi, ikon GitHub muncul
// - demo    : (opsional) link demo / situs langsung
// - draft   : (opsional) true = deskripsi masih sementara, silakan diperbarui
// =============================================================================

export type Project = {
  title: string;
  icon: string;
  desc: string;
  tags: string[];
  repo?: string;
  demo?: string;
  draft?: boolean;
};

export const projects: Project[] = [
  {
    title: "Askara Scientific Solutions",
    icon: "🧪",
    desc: "Platform konsultasi riset — dari ide hingga naskah siap proses. Wizard konsultasi, dashboard klien, dan panel admin.",
    tags: ["Next.js 16", "React 19", "Prisma", "Postgres"],
    repo: "https://github.com/muhammadrizalharis",
  },
  {
    title: "Calyzr.AI",
    icon: "🧠",
    desc: "Neural AI workspace — satu tempat untuk chat, menulis kode, membuat gambar, dan menjalankan agent, lewat gateway yang kompatibel OpenAI.",
    tags: ["Next.js", "LLM Gateway", "Agent", "Realtime"],
  },
  {
    title: "CodeUnical",
    icon: "🎓",
    desc: "Ekosistem platform untuk edukasi & proctoring: web app, API, dan modul AI proctor. Dibangun dengan arsitektur multi-service.",
    tags: ["Web", "API", "AI Proctor", "Docker"],
  },
  {
    title: "Personal Website",
    icon: "🌐",
    desc: "Situs pribadi ini — profil, perjalanan, sertifikat, dan buku tamu. Full-stack dan sepenuhnya ter-container dengan Docker.",
    tags: ["Next.js 14", "TypeScript", "Prisma", "Docker"],
    repo: "https://github.com/muhammadrizalharis/Personal-Website",
  },
  {
    title: "Axon",
    icon: "⚡",
    desc: "Proyek Axon — deskripsi singkat segera diperbarui.",
    tags: ["Segera diperbarui"],
    draft: true,
  },
  {
    title: "ComputeHub",
    icon: "🖥️",
    desc: "Proyek ComputeHub — deskripsi singkat segera diperbarui.",
    tags: ["Segera diperbarui"],
    draft: true,
  },
  {
    title: "PaskiTactical",
    icon: "🎖️",
    desc: "Proyek PaskiTactical — deskripsi singkat segera diperbarui.",
    tags: ["Segera diperbarui"],
    draft: true,
  },
  {
    title: "Server",
    icon: "🗄️",
    desc: "Proyek Server — konfigurasi & orkestrasi layanan self-hosted. Deskripsi lengkap segera diperbarui.",
    tags: ["Segera diperbarui"],
    draft: true,
  },
  {
    title: "Unical Assoc Repo",
    icon: "🧩",
    desc: "Repositori organisasi Unical — deskripsi singkat segera diperbarui.",
    tags: ["Segera diperbarui"],
    draft: true,
  },
];
