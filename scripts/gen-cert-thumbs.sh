#!/usr/bin/env bash
# Render halaman pertama tiap PDF sertifikat menjadi thumbnail PNG.
# Jalankan setiap kali menambah/mengubah PDF di public/certificates/.
# Butuh poppler-utils (pdftoppm). Install: sudo apt-get install poppler-utils
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)/public/certificates"
THUMBS="$DIR/.thumbs"
mkdir -p "$THUMBS"

shopt -s nullglob
count=0
for f in "$DIR"/*.pdf; do
  base="$(basename "$f" .pdf)"
  pdftoppm -png -f 1 -l 1 -scale-to-x 900 -scale-to-y -1 "$f" "$THUMBS/$base" >/dev/null 2>&1 || continue
  # pdftoppm menambahkan sufiks halaman (-1 / -01); rapikan menjadi <base>.png
  if [ ! -f "$THUMBS/$base.png" ]; then
    mv "$THUMBS/$base"-*.png "$THUMBS/$base.png" 2>/dev/null || true
  fi
  count=$((count + 1))
done

echo "Thumbnail selesai: $count PDF -> $THUMBS"
