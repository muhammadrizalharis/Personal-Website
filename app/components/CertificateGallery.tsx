"use client";

import { useCallback, useEffect, useState } from "react";

export type Certificate = {
  title: string;
  issuer?: string;
  src: string;
  preview: string;
  kind: "image" | "pdf";
};

export default function CertificateGallery({ certificates }: { certificates: Certificate[] }) {
  const [active, setActive] = useState<Certificate | null>(null);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <>
      <p className="certs__count reveal">{certificates.length} sertifikat</p>
      <div className="certs">
        {certificates.map((cert) => (
          <button
            key={cert.src}
            type="button"
            className="cert reveal"
            onClick={() => setActive(cert)}
            title={`Perbesar: ${cert.title}`}
          >
            <div className="cert__media">
              {failed[cert.src] ? (
                <div className="cert__pdf" aria-hidden="true">
                  <span className="cert__pdf-badge">{cert.kind === "pdf" ? "PDF" : "FILE"}</span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cert.preview}
                  alt={cert.title}
                  loading="lazy"
                  onError={() => setFailed((f) => ({ ...f, [cert.src]: true }))}
                />
              )}
              <span className="cert__zoom" aria-hidden="true">⤢</span>
            </div>
            <div className="cert__body">
              <h3 className="cert__title">{cert.title}</h3>
              {cert.issuer ? <span className="cert__issuer">{cert.issuer}</span> : null}
              <span className="cert__link">Klik untuk memperbesar</span>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={close}>
          <div className="lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox__bar">
              <div className="lightbox__meta">
                <strong className="lightbox__title">{active.title}</strong>
                {active.issuer ? <span className="lightbox__issuer">{active.issuer}</span> : null}
              </div>
              <div className="lightbox__actions">
                <a className="lightbox__btn" href={active.src} target="_blank" rel="noopener noreferrer">
                  Buka di tab baru ↗
                </a>
                <button className="lightbox__btn lightbox__close" type="button" onClick={close} aria-label="Tutup">
                  ✕
                </button>
              </div>
            </div>
            <div className="lightbox__stage">
              {active.kind === "pdf" ? (
                <iframe className="lightbox__frame" src={active.src} title={active.title} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="lightbox__img" src={active.src} alt={active.title} />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
