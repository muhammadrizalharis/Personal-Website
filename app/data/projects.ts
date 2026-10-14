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
    desc: "Platform pendampingan penyusunan naskah ilmiah — jurnal nasional & internasional, skripsi/tesis pendukung, hingga artikel prosiding. Dari ide hingga naskah siap diproses, dikelola terarah dan transparan.",
    tags: ["Next.js", "React", "Prisma", "Postgres"],
    demo: "https://askara-scientific-solutions.vercel.app",
  },
  {
    title: "CALYZR.AI",
    icon: "🧠",
    desc: "Web app self-hosted yang menyatukan model cloud (GitHub Copilot Enterprise), model lokal (Ollama), dan workflow generatif (ComfyUI) dalam satu antarmuka chat. Dilengkapi agent yang menjalankan kode nyata di sandbox, basis pengetahuan (RAG), dan gateway kompatibel OpenAI untuk dipakai langsung dari editor.",
    tags: ["Self-hosted", "Ollama", "ComfyUI", "RAG", "OpenAI API"],
    demo: "https://calyzr-ai.my.id",
  },
  {
    title: "CodeUnical",
    icon: "🎓",
    desc: "Platform ujian & praktikum pemrograman berbasis web untuk kampus (Code + Uni + ICAL). Mahasiswa wajib mengetik kode manual (tanpa copy-paste), kode dijalankan langsung di sandbox terisolasi, dinilai otomatis lewat test case, dan sesi diawasi berlapis.",
    tags: ["Next.js", "Sandbox", "Auto-grading", "Proctoring"],
  },
  {
    title: "Personal Website",
    icon: "🌐",
    desc: "Situs pribadi ini — profil, perjalanan, sertifikat, dan buku tamu. Full-stack dan sepenuhnya ter-container dengan Docker.",
    tags: ["Next.js 14", "TypeScript", "Prisma", "Docker"],
    repo: "https://github.com/muhammadrizalharis/Personal-Website",
  },
  {
    title: "AXON-RYZR",
    icon: "⚡",
    desc: "Platform generative AI untuk text-to-image & text-to-video yang berjalan sepenuhnya on-premise, tanpa layanan cloud berbayar. Inferensi pada GPU lokal via ComfyUI; stack ter-containerize dengan isolasi per-user (kuota, penyimpanan, riwayat) untuk 50–500 pengguna.",
    tags: ["ComfyUI", "GPU", "Text-to-Video", "Docker", "On-premise"],
  },
  {
    title: "UNISMUH ComputeHub",
    icon: "🖥️",
    desc: "Platform orkestrasi job GPU untuk server kampus bersama — senyaman Google Colab, namun aman untuk banyak pengguna. Jalankan kode & latih model tanpa akses admin, lengkap dengan pemantauan real-time, kuota per pengguna, dan isolasi penuh berbasis kontainer.",
    tags: ["HPC", "GPU", "Jupyter", "Kuota", "SSO"],
  },
  {
    title: "Paskitactical",
    icon: "🎖️",
    desc: "Sistem penilaian & rekap lomba — dari input juri per butir hingga penentuan Juara Umum secara otomatis. Rubrik 100% dapat diatur lewat aplikasi (tanpa koding), cocok untuk lomba baris-berbaris, tari, cerdas cermat, robotik, dan lainnya. Live score diperbarui hampir seketika.",
    tags: ["Realtime", "Scoring", "Rubrik Dinamis", "Live Score"],
  },
  {
    title: "UNICAL Associates Repo",
    icon: "📚",
    desc: "Platform repositori publikasi ilmiah Universitas Muhammadiyah Makassar, terinspirasi ScienceDirect & ResearchGate. Menghimpun jurnal & artikel yang sudah terbit dalam satu katalog yang mudah dicari, dengan identitas peneliti permanen dan metrik riset otomatis — menyimpan metadata & tautan DOI resmi (tidak menerbitkan).",
    tags: ["Katalog Ilmiah", "DOI", "Metadata", "Metrik Riset"],
  },
];
