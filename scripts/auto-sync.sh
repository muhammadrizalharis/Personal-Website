#!/usr/bin/env bash
# =============================================================================
# auto-sync.sh — Pantau perubahan file, lalu commit & push OTOMATIS ke GitHub.
#
# Pakai:
#   npm run sync                 # pakai default (cabang main, interval 5 detik)
#   BRANCH=main INTERVAL=5 npm run sync
#
# Cara kerja: setiap INTERVAL detik, cek `git status`. Bila ada perubahan,
# tunggu sampai file "tenang" (tidak berubah) lalu `git add -A`, commit dengan
# pesan berisi timestamp + daftar file, dan push ke origin.
#
# PRASYARAT (sekali saja): kredensial GitHub harus tersimpan supaya push jalan
# tanpa diminta password. Lihat README bagian "Auto-push".
# =============================================================================
set -u

cd "$(dirname "$0")/.." || exit 1

BRANCH="${BRANCH:-main}"
INTERVAL="${INTERVAL:-5}"
REMOTE="${REMOTE:-origin}"

echo "🔄 auto-sync aktif — memantau perubahan di cabang '$BRANCH' (cek tiap ${INTERVAL}s)."
echo "   Tekan Ctrl+C untuk berhenti."

commit_and_push() {
  # Tunggu file "tenang": status tidak berubah selama 1 siklus.
  local prev=""
  while true; do
    local cur
    cur="$(git status --porcelain)"
    [ "$cur" = "$prev" ] && break
    prev="$cur"
    sleep 2
  done

  git add -A

  # Tidak ada yang di-stage (mis. semua terabaikan .gitignore) → lewati.
  if git diff --cached --quiet; then
    return
  fi

  local files count msg
  count="$(git diff --cached --name-only | wc -l | tr -d ' ')"
  files="$(git diff --cached --name-only | head -5 | sed 's#^#   - #')"
  msg="chore: auto-sync $(date '+%Y-%m-%d %H:%M:%S') (${count} file)"

  echo "📝 $msg"
  echo "$files"

  git -c user.name="muhammadrizalharis" \
      -c user.email="muhammadrizalharis@users.noreply.github.com" \
      commit -q -m "$msg" \
      -m "Perubahan otomatis oleh auto-sync." \
      -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

  if git push -q "$REMOTE" "$BRANCH"; then
    echo "✅ Ter-push ke $REMOTE/$BRANCH."
  else
    echo "❌ Push GAGAL. Pastikan kredensial GitHub tersimpan (lihat README: Auto-push)."
  fi
}

# Push dulu commit yang mungkin belum ter-push saat start.
if [ -n "$(git log "$REMOTE/$BRANCH..$BRANCH" --oneline 2>/dev/null)" ]; then
  echo "⬆️  Ada commit lokal yang belum ter-push, mencoba push…"
  git push -q "$REMOTE" "$BRANCH" && echo "✅ Commit tertunda ter-push." || echo "❌ Push awal gagal (cek kredensial)."
fi

while true; do
  if [ -n "$(git status --porcelain)" ]; then
    commit_and_push
  fi
  sleep "$INTERVAL"
done
