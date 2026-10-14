"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";
import type { Publication } from "../data/publications";
import type { Certificate } from "../lib/certificates";

type Tab = "proyek" | "publikasi" | "sertifikat";

const githubIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" /></svg>
);

const demoIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M9 7h8v8" /></svg>
);

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * 12}deg`);
    el.style.setProperty("--rx", `${-py * 12}deg`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };
  return (
    <div ref={ref} className="tilt" onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </div>
  );
}

function ProjectsPanel({ projects }: { projects: Project[] }) {
  return (
    <div className="showcase__grid">
      {projects.map((p) => (
        <TiltCard key={p.title}>
          <article className="pcard">
            <div className="pcard__shine" aria-hidden="true" />
            <div className="pcard__top">
              <div className="pcard__icon">{p.icon}</div>
              {(p.repo || p.demo) && (
                <div className="pcard__links">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label="Kode" className="iconlink">
                      {githubIcon}
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label="Demo" className="iconlink">
                      {demoIcon}
                    </a>
                  )}
                </div>
              )}
            </div>
            <h3 className="pcard__title">{p.title}</h3>
            <p className="pcard__desc">{p.desc}</p>
            <ul className="pcard__tags">
              {p.tags.slice(0, 4).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        </TiltCard>
      ))}
    </div>
  );
}

function PublicationsPanel({ publications, orcidUrl }: { publications: Publication[]; orcidUrl: string }) {
  return (
    <div className="showcase__pubs">
      <ol className="pubs">
        {publications.map((p) => (
          <li className="pub" key={p.doi ?? p.url}>
            <div className="pub__top">
              <span className="pub__type">{p.type}</span>
              <span className="pub__year">{p.year}</span>
            </div>
            <h3 className="pub__title">
              <a href={p.url} target="_blank" rel="noopener noreferrer">{p.title}</a>
            </h3>
            <p className="pub__venue">{p.venue}</p>
            <div className="pub__meta">
              {p.role && <span className="pub__role">{p.role}</span>}
              {p.doi && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="pub__doi">DOI: {p.doi}</a>
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className="showcase__more">
        Daftar lengkap di{" "}
        <a href={orcidUrl} target="_blank" rel="noopener noreferrer" className="link">ORCID saya ↗</a>
      </p>
    </div>
  );
}

function Coverflow({
  certificates,
  onOpen,
}: {
  certificates: Certificate[];
  onOpen: (c: Certificate) => void;
}) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const n = certificates.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + n) % n),
    [n],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // swipe
  const startX = useRef<number | null>(null);
  const onDown = (x: number) => (startX.current = x);
  const onUp = (x: number) => {
    if (startX.current === null) return;
    const dx = x - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  const active = certificates[index];

  return (
    <div className="cf">
      <div
        className="cf__stage"
        onMouseDown={(e) => onDown(e.clientX)}
        onMouseUp={(e) => onUp(e.clientX)}
        onTouchStart={(e) => onDown(e.touches[0].clientX)}
        onTouchEnd={(e) => onUp(e.changedTouches[0].clientX)}
      >
        {certificates.map((cert, i) => {
          let offset = i - index;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const abs = Math.abs(offset);
          const visible = abs <= 3;
          const style: React.CSSProperties = {
            transform: `translateX(${offset * 36}%) translateZ(${-abs * 140}px) rotateY(${offset * -30}deg) scale(${offset === 0 ? 1 : 0.82})`,
            opacity: visible ? 1 : 0,
            zIndex: 100 - abs,
            pointerEvents: visible ? "auto" : "none",
          };
          return (
            <div
              key={cert.src}
              className={`cf__item${offset === 0 ? " is-active" : ""}`}
              style={style}
              onClick={() => (offset === 0 ? onOpen(cert) : setIndex(i))}
              role="button"
              title={offset === 0 ? `Perbesar: ${cert.title}` : cert.title}
            >
              <div className="cf__card">
                {failed[cert.src] ? (
                  <div className="cf__fallback"><span>{cert.kind === "pdf" ? "PDF" : "FILE"}</span></div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cert.preview}
                    alt={cert.title}
                    loading="lazy"
                    draggable={false}
                    onError={() => setFailed((f) => ({ ...f, [cert.src]: true }))}
                  />
                )}
                {offset === 0 && <span className="cf__zoom" aria-hidden="true">⤢</span>}
              </div>
            </div>
          );
        })}
      </div>

      <button className="cf__nav cf__nav--prev" onClick={() => go(-1)} aria-label="Sebelumnya" type="button">‹</button>
      <button className="cf__nav cf__nav--next" onClick={() => go(1)} aria-label="Berikutnya" type="button">›</button>

      <div className="cf__caption">
        <strong>{active.title}</strong>
        {active.issuer && <span>{active.issuer}</span>}
      </div>

      <div className="cf__dots">
        {certificates.map((c, i) => (
          <button
            key={c.src}
            className={`cf__dot${i === index ? " is-on" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Ke sertifikat ${i + 1}`}
            type="button"
          />
        ))}
      </div>
      <p className="cf__count">{index + 1} / {n} sertifikat · klik yang tengah untuk memperbesar</p>
    </div>
  );
}

export default function Showcase({
  projects,
  publications,
  certificates,
  orcidUrl,
}: {
  projects: Project[];
  publications: Publication[];
  certificates: Certificate[];
  orcidUrl: string;
}) {
  const [tab, setTab] = useState<Tab>("proyek");
  const [active, setActive] = useState<Certificate | null>(null);

  const close = useCallback(() => setActive(null), []);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "proyek", label: "Proyek", count: projects.length },
    { id: "publikasi", label: "Publikasi", count: publications.length },
    { id: "sertifikat", label: "Sertifikat", count: certificates.length },
  ];

  return (
    <div className="showcase">
      <div className="showcase__tabs" role="tablist">
        <span className="showcase__pill" data-tab={tab} aria-hidden="true" />
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`showcase__tab${tab === t.id ? " is-active" : ""}`}
            onClick={() => setTab(t.id)}
            type="button"
          >
            {t.label}
            <span className="showcase__badge">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="showcase__panel" key={tab}>
        {tab === "proyek" && <ProjectsPanel projects={projects} />}
        {tab === "publikasi" && <PublicationsPanel publications={publications} orcidUrl={orcidUrl} />}
        {tab === "sertifikat" &&
          (certificates.length ? (
            <Coverflow certificates={certificates} onOpen={setActive} />
          ) : (
            <p className="showcase__empty">Belum ada sertifikat.</p>
          ))}
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={close}>
          <div className="lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox__bar">
              <div className="lightbox__meta">
                <strong className="lightbox__title">{active.title}</strong>
                {active.issuer && <span className="lightbox__issuer">{active.issuer}</span>}
              </div>
              <div className="lightbox__actions">
                <a className="lightbox__btn" href={active.src} target="_blank" rel="noopener noreferrer">Buka di tab baru ↗</a>
                <button className="lightbox__btn lightbox__close" type="button" onClick={close} aria-label="Tutup">✕</button>
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
      )}
    </div>
  );
}
