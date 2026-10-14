# Personal Website — Muhammad Rizal Haris

Website pribadi full‑stack: **frontend + backend + database**, seluruhnya berjalan di
dalam **Docker**. Dibangun dengan **Next.js 14 (App Router) · TypeScript · Prisma ·
PostgreSQL**.

Fitur:

- Halaman profil modern (hero, tentang, keahlian, proyek, perjalanan, kontak) —
  responsif, dark/light mode, animasi reveal, efek ketik.
- **Buku Tamu (Guestbook)** — pengunjung mengirim pesan yang disimpan ke PostgreSQL
  lewat REST API. Inilah yang memakai *backend* + *database*.
- API: `GET/POST /api/messages`, `GET /api/health`.

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

## 📦 Git & push ke GitHub

Repo remote: `https://github.com/muhammadrizalharis/Personal-Website`

```bash
git add -A
git commit -m "feat: website pribadi full-stack (Next.js + Prisma + Postgres, Docker)"

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
│  │  ├─ health/route.ts      # health check + status DB
│  │  └─ messages/route.ts    # GET/POST guestbook (backend)
│  ├─ components/
│  │  ├─ Guestbook.tsx        # form + daftar pesan (client)
│  │  └─ SiteInteractions.tsx # tema, scroll spy, animasi
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx                # halaman utama
├─ lib/prisma.ts              # singleton Prisma Client
├─ prisma/schema.prisma       # model Message (database)
├─ Dockerfile                 # build Next.js standalone
├─ docker-compose.yml         # web + db
├─ docker-entrypoint.sh       # sinkron skema saat start
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

---

© Muhammad Rizal Haris. Dibuat dengan ❤️ & sedikit kode.
