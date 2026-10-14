#!/bin/sh
set -e

# Terapkan skema ke database saat container start (idempotent).
# Jika DB belum siap, coba beberapa kali sebelum menyerah.
if [ -n "$DATABASE_URL" ]; then
  echo "[entrypoint] Menyinkronkan skema database (prisma db push)…"
  n=0
  until [ "$n" -ge 10 ]; do
    if node node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss; then
      echo "[entrypoint] Skema database siap."
      break
    fi
    n=$((n + 1))
    echo "[entrypoint] Database belum siap, mencoba lagi ($n/10)…"
    sleep 3
  done
  if [ "$n" -ge 10 ]; then
    echo "[entrypoint] PERINGATAN: gagal sinkron skema. Aplikasi tetap dijalankan."
  fi
else
  echo "[entrypoint] DATABASE_URL kosong — melewati sinkronisasi skema."
fi

exec "$@"
