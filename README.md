# Personal Website — Muhammad Rizal Haris

Website pribadi full‑stack: **frontend + backend + database**, seluruhnya berjalan di
dalam **Docker**. Dibangun dengan **Next.js 14 (App Router) · TypeScript · Prisma ·
PostgreSQL**.

Fitur:

- Halaman profil modern (hero, tentang, keahlian, proyek, perjalanan, kontak) —
  responsif, dark/light mode, animasi reveal, efek ketik.
- **Buku Tamu (Guestbook)** — pengunjung mengirim pesan yang disimpan ke PostgreSQL
  lewat REST API. Inilah yang memakai *backend* + *database*.
- **Sertifikat** — tampilkan sertifikat/penghargaan hanya dengan menaruh file (gambar
  atau PDF) di folder `public/certificates/`. Lihat [bagian Sertifikat](#-sertifikat).
- API: `GET/POST /api/messages`, `GET /api/health`, `GET /api/certificates/<file>`.

---

## 🧱 Arsitektur

```
Browser ──▶ web (Next.js, port 3000) ──▶ db (PostgreSQL 16)
            ├─ Frontend (React, SSR)
            ├─ Backend  (API routes /api/*)
            └─ Prisma Client ──────────────┘
```

Semua dikemas sebagai 2 container via `docker-compose.yml`:

| Service | Image              | Fungsi                         | Port host            |
| ------- | ------------------ | ------------------------------ | -------------------- |
| `web`   | build dari Dockerfile | Next.js (frontend + backend) | `3000` (konfigurabel) |
| `db`    | `postgres:16-alpine`  | Database                     | acak/opsional        |

> Database tidak diekspos ke host secara default (diakses internal lewat host `db`).

---

## 🚀 Menjalankan dengan Docker (disarankan)

```bash
# 1. siapkan environment
cp .env.example .env     # boleh dibiarkan default untuk lokal

# 2. build + jalankan semua (web + database)
docker compose up --build -d

# 3. buka
#    http://localhost:3000
```

Skema database otomatis disinkronkan saat container `web` start (`prisma db push`).

Perintah lain:

```bash
docker compose logs -f web      # lihat log
docker compose ps               # status container
docker compose down             # hentikan (data DB tetap tersimpan)
docker compose down -v          # hentikan + hapus data DB
```

Mengubah port web (jika 3000 dipakai):

```bash
WEB_PORT=8080 docker compose up -d
```

Mengakses database dari host (mis. Prisma Studio):

```bash
DB_PORT=55433 docker compose up -d
# lalu DATABASE_URL=postgresql://postgres:postgres@localhost:55433/webpribadi npx prisma studio
```

---

## 💻 Menjalankan tanpa Docker (dev)

Butuh Node ≥ 20 dan sebuah PostgreSQL.

```bash
npm install
cp .env.example .env          # sesuaikan DATABASE_URL
npm run db:push               # buat tabel
npm run dev                   # http://localhost:3000
```

---

## 📜 Sertifikat

Menambah sertifikat **tanpa menyentuh kode** — cukup taruh file di satu folder:

```
public/certificates/
```

- Format didukung: `.jpg .jpeg .png .webp .gif .svg .avif` dan `.pdf`.
- **Judul otomatis** diambil dari nama file. Untuk judul yang rapi sesuai nama
  sertifikat asli, isi `public/certificates/labels.json`:

  ```json
  {
    "nama-file.pdf": { "title": "Judul Sertifikat", "issuer": "Penerbit" }
  }
  ```
- **Preview PDF:** thumbnail halaman pertama dibuat dengan skrip. Setelah menaruh
  PDF baru, jalankan:

  ```bash
  ./scripts/gen-cert-thumbs.sh      # butuh poppler-utils (pdftoppm)
  ```

  File gambar (`.png/.jpg/...`) tidak perlu thumbnail — langsung dipakai.
- Di web, bagian **Sertifikat** menampilkan semua file sebagai kartu dengan preview.
  **Klik kartu** untuk memperbesar (PDF tampil di viewer yang bisa di-zoom).

**Saat memakai Docker:** folder `public/certificates/` di-*mount* sebagai volume ke
container, jadi begitu Anda menaruh file, cukup **refresh halaman** — tidak perlu
rebuild maupun restart. File disajikan lewat route `GET /api/certificates/<file>`
(membaca disk saat request).

**Saat deploy ke Vercel:** Vercel tidak punya volume, jadi **commit** file sertifikat
ke repo agar ikut ter-deploy:

```bash
git add public/certificates
git commit -m "docs: tambah sertifikat"
```

> Catatan privasi: file di `public/certificates/` bersifat publik (bisa diakses
> siapa pun yang punya URL-nya). Jangan taruh dokumen sensitif di sini.

---

## 🔑 Environment variables

| Variabel            | Deskripsi                                   |
| ------------------- | ------------------------------------------- |
| `DATABASE_URL`      | Connection string PostgreSQL (wajib).       |
| `POSTGRES_USER`     | User container Postgres (compose).          |
| `POSTGRES_PASSWORD` | Password container Postgres (compose).      |
| `POSTGRES_DB`       | Nama database (compose).                    |
| `WEB_PORT`          | Port host untuk web (default `3000`).       |
| `DB_PORT`           | Port host untuk DB (opsional).              |

Lihat [`.env.example`](./.env.example). **Jangan commit `.env` berisi kredensial asli.**

---

## 🌐 Hosting sementara dengan ngrok

Selama belum punya domain, ekspos stack Docker lokal ke internet via ngrok:

```bash
docker compose up -d                 # pastikan web jalan di :3000
ngrok http 3000                      # dapatkan URL publik https://xxxx.ngrok-free.app
```

Bagikan URL ngrok tersebut. Hentikan dengan menutup proses ngrok.

---

## ▲ Deploy ke Vercel (opsional)

Repo ini siap‑Vercel (`vercel.json`, `output: "standalone"` diabaikan Vercel).

1. Siapkan database PostgreSQL terkelola (Neon / Supabase / Vercel Postgres) atau
   tunnel ke Postgres Anda sendiri.
2. Di dashboard Vercel → **Add New Project** → import repo GitHub ini.
3. Set environment variable **`DATABASE_URL`** pada project Vercel.
4. Setelah deploy pertama, jalankan `npx prisma db push` sekali terhadap DB produksi
   (atau pakai migrasi) untuk membuat tabel.

> Catatan: Vercel bersifat serverless dan tidak menjalankan `docker-compose`. Container
> Docker di repo ini untuk pengembangan/self‑hosting; Vercel memakai build Next.js‑nya
> sendiri.

---

## ☁️ Cloudflare (saat sudah punya domain)

- **DNS/CDN:** arahkan domain Anda ke Vercel (CNAME) atau ke server self‑host, lalu
  aktifkan proxy Cloudflare (oranye) untuk CDN + SSL.
- **Self‑host tanpa buka port:** gunakan **Cloudflare Tunnel** untuk mengekspos
  container `web` (`localhost:3000`) ke domain Anda:

  ```bash
  cloudflared tunnel --url http://localhost:3000
  ```

---

## ⚡ Mode dev hot-reload di Docker (perubahan langsung muncul)

Agar setiap perubahan kode **langsung tampil** di web tanpa `--build` manual,
jalankan stack dalam mode pengembangan (Fast Refresh):

```bash
npm run docker:dev            # = docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

- Web tetap di `http://localhost:3000` (dan lewat ngrok seperti biasa).
- Edit file apa pun di `app/`, `lib/`, dll → halaman otomatis ter-reload.
- File-watching memakai **polling** (`WATCHPACK_POLLING`) agar andal di dalam
  container. Hentikan dengan `Ctrl+C` atau `npm run docker:dev:down`.

Untuk kembali ke mode **produksi** (image standalone, lebih ringan/cepat):

```bash
npm run docker:dev:down
npm run docker:up
```

---

## 🔄 Auto-push ke GitHub (commit & push otomatis saat ada perubahan)

`npm run sync` memantau perubahan file, lalu **commit + push otomatis** ke
`origin/main`.

**Satu kali saja — simpan kredensial** agar push jalan tanpa diminta password.
Jalankan di terminal Anda sendiri (token tetap di tangan Anda, tidak masuk repo):

```bash
git config credential.helper store    # sudah diset di repo ini
GIT_TERMINAL_PROMPT=1 GIT_ASKPASS= \
  git -c credential.interactive=always push origin main
# Username: muhammadrizalharis
# Password: <Personal Access Token GitHub Anda>
```

Setelah token tersimpan (di `~/.git-credentials`), nyalakan watcher:

```bash
npm run sync                  # pantau & auto-commit + auto-push
# atau atur interval / cabang:
INTERVAL=5 BRANCH=main npm run sync
```

> Watcher menghormati `.gitignore`, jadi file rahasia (mis. `ngrok.yml`) tidak
> ikut ter-commit. Tekan `Ctrl+C` untuk berhenti.

---

## 📦 Git & push ke GitHub (manual)

Repo remote: `https://github.com/muhammadrizalharis/Personal-Website`

```bash
git add -A
git commit -m "feat: ..."

# Tempelkan token Anda sendiri saat diminta (JANGAN simpan di file):
git push -u origin main
```

Saat `git push`, isi **Username** dengan `muhammadrizalharis` dan **Password** dengan
*Personal Access Token* GitHub Anda. Token tidak disimpan di repo.

---

## 🗂️ Struktur proyek

```
web-pribadi/
├─ app/
│  ├─ api/
│  │  ├─ certificates/[file]/route.ts # sajikan file sertifikat dari disk
│  │  ├─ health/route.ts      # health check + status DB
│  │  └─ messages/route.ts    # GET/POST guestbook (backend)
│  ├─ components/
│  │  ├─ Certificates.tsx     # baca folder public/certificates (server)
│  │  ├─ Guestbook.tsx        # form + daftar pesan (client)
│  │  └─ SiteInteractions.tsx # tema, scroll spy, animasi
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx                # halaman utama
├─ lib/prisma.ts              # singleton Prisma Client
├─ prisma/schema.prisma       # model Message (database)
├─ public/certificates/       # taruh file sertifikat di sini
├─ Dockerfile                 # build Next.js standalone (produksi)
├─ Dockerfile.dev             # image mode dev (hot-reload)
├─ docker-compose.yml         # web + db (produksi)
├─ docker-compose.dev.yml     # override hot-reload (Fast Refresh)
├─ docker-entrypoint.sh       # sinkron skema saat start
├─ scripts/
│  ├─ auto-sync.sh            # auto commit + push saat ada perubahan
│  └─ gen-cert-thumbs.sh      # buat thumbnail sertifikat
├─ vercel.json
└─ .env.example
```

---

## 🛠️ Skrip npm

| Skrip              | Aksi                                  |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Mode pengembangan                     |
| `npm run build`    | `prisma generate` + build produksi    |
| `npm run start`    | Jalankan hasil build                  |
| `npm run db:push`  | Sinkronkan skema ke database          |
| `npm run db:studio`| Buka Prisma Studio                    |
| `npm run docker:up`| `docker compose up --build -d`        |
| `npm run docker:down`| `docker compose down`               |
| `npm run docker:dev`| Mode hot-reload di Docker (Fast Refresh) |
| `npm run docker:dev:down`| Hentikan mode hot-reload         |
| `npm run sync`     | Auto commit + push ke GitHub saat ada perubahan |
| `npm run push`     | `git push origin main`                |

---

© Muhammad Rizal Haris. Dibuat dengan ❤️ & sedikit kode.
