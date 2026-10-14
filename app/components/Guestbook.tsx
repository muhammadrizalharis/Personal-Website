"use client";

import { useCallback, useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  body: string;
  createdAt: string;
};

const BODY_MAX = 500;
const NAME_MAX = 80;

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/messages", { cache: "no-store" });
      const data = await res.json();
      setMessages(Array.isArray(data.messages) ? data.messages : []);
      if (!res.ok && data.error) {
        setStatus({ type: "err", text: data.error });
      }
    } catch {
      setStatus({ type: "err", text: "Tidak bisa memuat pesan." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) {
      setStatus({ type: "err", text: "Nama dan pesan wajib diisi." });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), body: body.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.message) {
        setMessages((prev) => [data.message as Message, ...prev]);
        setName("");
        setBody("");
        setStatus({ type: "ok", text: "Terima kasih, pesanmu tersimpan! 🎉" });
      } else {
        setStatus({ type: "err", text: data.error || "Gagal mengirim pesan." });
      }
    } catch {
      setStatus({ type: "err", text: "Terjadi kesalahan jaringan." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="guestbook">
      <form className="guestbook__form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="gb-name">Nama</label>
          <input
            id="gb-name"
            type="text"
            value={name}
            maxLength={NAME_MAX}
            placeholder="Nama kamu"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="gb-body">Pesan ({body.length}/{BODY_MAX})</label>
          <textarea
            id="gb-body"
            rows={3}
            value={body}
            maxLength={BODY_MAX}
            placeholder="Tinggalkan pesan atau sapaan…"
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="guestbook__actions">
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? "Mengirim…" : "Kirim Pesan"}
          </button>
          {status && (
            <span
              className={
                "guestbook__status " +
                (status.type === "err"
                  ? "guestbook__status--err"
                  : "guestbook__status--ok")
              }
            >
              {status.text}
            </span>
          )}
        </div>
      </form>

      <div className="guestbook__list">
        {loading ? (
          <p className="guestbook__empty">Memuat pesan…</p>
        ) : messages.length === 0 ? (
          <p className="guestbook__empty">
            Belum ada pesan. Jadilah yang pertama menyapa! 👋
          </p>
        ) : (
          messages.map((m) => (
            <article className="msg" key={m.id}>
              <div className="msg__head">
                <span className="msg__name">{m.name}</span>
                <span className="msg__time">{formatTime(m.createdAt)}</span>
              </div>
              <p className="msg__body">{m.body}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
