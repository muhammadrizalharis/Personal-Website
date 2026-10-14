import Certificates from "./components/Certificates";
import Guestbook from "./components/Guestbook";
import SiteInteractions from "./components/SiteInteractions";
import { projects } from "./data/projects";

const githubIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" /></svg>
);

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />

      <header className="nav" id="nav">
        <div className="container nav__inner">
          <a href="#home" className="nav__brand" aria-label="Beranda">
            <span className="nav__logo">MR</span>
            <span className="nav__brand-text">Rizal&nbsp;Haris</span>
          </a>

          <nav className="nav__links" id="navLinks" aria-label="Navigasi utama">
            <a href="#about" className="nav__link">Tentang</a>
            <a href="#skills" className="nav__link">Keahlian</a>
            <a href="#projects" className="nav__link">Proyek</a>
            <a href="#journey" className="nav__link">Perjalanan</a>
            <a href="#certificates" className="nav__link">Sertifikat</a>
            <a href="#guestbook" className="nav__link">Buku Tamu</a>
            <a href="#contact" className="nav__link">Kontak</a>
          </nav>

          <div className="nav__actions">
            <button
              className="theme-toggle"
              id="themeToggle"
              aria-label="Ganti tema"
              title="Ganti tema"
              type="button"
            >
              <svg className="icon icon--sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              <svg className="icon icon--moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
            </button>
            <button
              className="nav__toggle"
              id="navToggle"
              aria-label="Buka menu"
              aria-expanded="false"
              type="button"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" id="home">
          <div className="hero__bg" aria-hidden="true">
            <div className="blob blob--1" />
            <div className="blob blob--2" />
            <div className="grid-overlay" />
          </div>
          <div className="container hero__inner">
            <p className="hero__eyebrow reveal">👋 Halo, saya</p>
            <h1 className="hero__title reveal">
              Muhammad <span className="gradient-text">Rizal&nbsp;Haris</span>
            </h1>
            <p className="hero__role reveal">
              <span className="typed" id="typed" />
              <span className="caret">&nbsp;</span>
            </p>
            <p className="hero__desc reveal">
              Saya membangun produk digital end-to-end dan solusi berbasis riset —
              mulai dari aplikasi web modern hingga model machine learning. Fokus
              pada kode yang bersih, pengalaman pengguna yang baik, dan dampak nyata.
            </p>
            <div className="hero__cta reveal">
              <a href="#projects" className="btn btn--primary">Lihat Proyek</a>
              <a href="#contact" className="btn btn--ghost">Hubungi Saya</a>
            </div>
            <div className="hero__socials reveal" aria-label="Tautan sosial">
              <a href="https://github.com/muhammadrizalharis" className="social" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" /></svg>
              </a>
              <a href="https://www.linkedin.com/" className="social" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" /></svg>
              </a>
              <a href="mailto:muhammadrizalharis@users.noreply.github.com" className="social" aria-label="Email">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
              </a>
            </div>
          </div>
          <a href="#about" className="hero__scroll" aria-label="Gulir ke bawah">
            <span className="mouse"><span className="wheel" /></span>
          </a>
        </section>

        {/* About */}
        <section className="section" id="about">
          <div className="container">
            <div className="section__head reveal">
              <span className="section__tag">01 — Tentang</span>
              <h2 className="section__title">Sedikit tentang saya</h2>
            </div>
            <div className="about">
              <div className="about__text reveal">
                <p>
                  Saya seorang <strong>Full-Stack Developer</strong> sekaligus{" "}
                  <strong>Machine Learning / Research Engineer</strong> yang senang
                  menerjemahkan masalah nyata menjadi solusi perangkat lunak yang
                  rapi dan terukur.
                </p>
                <p>
                  Keseharian saya berkutat di antara dua dunia: membangun aplikasi
                  web modern dengan ekosistem <em>Next.js, React, dan TypeScript</em>,
                  serta mengembangkan model <em>machine learning</em> dan pipeline
                  data untuk kebutuhan riset. Saya juga aktif membantu penyusunan
                  solusi ilmiah lewat <em>Askara Scientific Solutions</em>.
                </p>
                <p>
                  Saya percaya produk yang baik lahir dari detail — arsitektur yang
                  sehat, antarmuka yang intuitif, dan proses yang bisa diandalkan.
                </p>
                <div className="about__facts">
                  <div className="fact">
                    <span>
                      <span className="fact__num" data-count="5">0</span>
                      <span className="fact__plus">+</span>
                    </span>
                    <span className="fact__label">Tahun ngoprek</span>
                  </div>
                  <div className="fact">
                    <span>
                      <span className="fact__num" data-count="20">0</span>
                      <span className="fact__plus">+</span>
                    </span>
                    <span className="fact__label">Proyek dikerjakan</span>
                  </div>
                  <div className="fact">
                    <span className="fact__num" data-count="2">0</span>
                    <span className="fact__label">Bidang: Web &amp; ML</span>
                  </div>
                </div>
              </div>
              <aside className="about__card reveal">
                <div className="code-card">
                  <div className="code-card__bar">
                    <span /><span /><span />
                    <em>rizal.ts</em>
                  </div>
                  <pre className="code-card__body"><code><span className="c-key">const</span> <span className="c-var">rizal</span> = {"{"}
{"\n  "}<span className="c-prop">peran</span>: [<span className="c-str">&quot;Full-Stack Dev&quot;</span>, <span className="c-str">&quot;ML Engineer&quot;</span>],
{"\n  "}<span className="c-prop">stack</span>: [<span className="c-str">&quot;Next.js&quot;</span>, <span className="c-str">&quot;React&quot;</span>, <span className="c-str">&quot;Python&quot;</span>],
{"\n  "}<span className="c-prop">fokus</span>: <span className="c-str">&quot;produk &amp; riset&quot;</span>,
{"\n  "}<span className="c-prop">kopi</span>: <span className="c-key">true</span>,
{"\n  "}<span className="c-prop">belajar</span>: () =&gt; <span className="c-str">&quot;setiap hari&quot;</span>,
{"\n"}{"}"};</code></pre>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="section section--alt" id="skills">
          <div className="container">
            <div className="section__head reveal">
              <span className="section__tag">02 — Keahlian</span>
              <h2 className="section__title">Tools &amp; teknologi</h2>
            </div>
            <div className="skills">
              <article className="skill-group reveal">
                <h3 className="skill-group__title">Frontend</h3>
                <ul className="chips">
                  <li className="chip">Next.js</li>
                  <li className="chip">React</li>
                  <li className="chip">TypeScript</li>
                  <li className="chip">Tailwind CSS</li>
                  <li className="chip">HTML &amp; CSS</li>
                </ul>
              </article>
              <article className="skill-group reveal">
                <h3 className="skill-group__title">Backend</h3>
                <ul className="chips">
                  <li className="chip">Node.js</li>
                  <li className="chip">Prisma</li>
                  <li className="chip">PostgreSQL</li>
                  <li className="chip">REST API</li>
                  <li className="chip">Auth</li>
                </ul>
              </article>
              <article className="skill-group reveal">
                <h3 className="skill-group__title">ML &amp; Data</h3>
                <ul className="chips">
                  <li className="chip">Python</li>
                  <li className="chip">scikit-learn</li>
                  <li className="chip">Random Forest</li>
                  <li className="chip">SVM</li>
                  <li className="chip">Jupyter</li>
                </ul>
              </article>
              <article className="skill-group reveal">
                <h3 className="skill-group__title">Tools</h3>
                <ul className="chips">
                  <li className="chip">Git</li>
                  <li className="chip">Docker</li>
                  <li className="chip">Linux</li>
                  <li className="chip">Vercel</li>
                  <li className="chip">VS Code</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="section" id="projects">
          <div className="container">
            <div className="section__head reveal">
              <span className="section__tag">03 — Proyek</span>
              <h2 className="section__title">Beberapa yang saya bangun</h2>
            </div>
            <div className="projects">
              {projects.map((p) => (
                <article className="project reveal" key={p.title}>
                  <div className="project__top">
                    <div className="project__icon">{p.icon}</div>
                    {(p.repo || p.demo) && (
                      <div className="project__links">
                        {p.repo && (
                          <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label="Kode" className="iconlink">
                            {githubIcon}
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label="Demo" className="iconlink">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M9 7h8v8" /></svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <h3 className="project__title">
                    {p.title}
                    {p.draft && <span className="project__draft">draft</span>}
                  </h3>
                  <p className="project__desc">{p.desc}</p>
                  <ul className="project__tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="section section--alt" id="journey">
          <div className="container">
            <div className="section__head reveal">
              <span className="section__tag">04 — Perjalanan</span>
              <h2 className="section__title">Apa yang sedang saya kerjakan</h2>
            </div>
            <ol className="timeline">
              <li className="timeline__item reveal">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__time">Sekarang</span>
                  <h3 className="timeline__title">Membangun produk SaaS riset</h3>
                  <p>Mengembangkan Askara Scientific Solutions — menyatukan alur konsultasi, klien, dan admin dalam satu platform.</p>
                </div>
              </li>
              <li className="timeline__item reveal">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__time">Baru-baru ini</span>
                  <h3 className="timeline__title">Riset Machine Learning</h3>
                  <p>Eksperimen klasifikasi dan evaluasi model (Random Forest, SVM) untuk kasus keamanan jaringan.</p>
                </div>
              </li>
              <li className="timeline__item reveal">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__time">Berkelanjutan</span>
                  <h3 className="timeline__title">Belajar &amp; berbagi</h3>
                  <p>Terus mengasah fundamental engineering, arsitektur sistem, dan praktik rekayasa perangkat lunak yang baik.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Certificates */}
        <section className="section" id="certificates">
          <div className="container">
            <div className="section__head reveal">
              <span className="section__tag">05 — Sertifikat</span>
              <h2 className="section__title">Sertifikat &amp; penghargaan</h2>
              <p className="section__lead">Kumpulan sertifikasi dan pencapaian yang pernah saya raih.</p>
            </div>
            <Certificates />
          </div>
        </section>

        {/* Guestbook */}
        <section className="section" id="guestbook">
          <div className="container">
            <div className="section__head reveal">
              <span className="section__tag">06 — Buku Tamu</span>
              <h2 className="section__title">Tinggalkan jejak 📝</h2>
            </div>
            <div className="reveal">
              <Guestbook />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section section--alt" id="contact">
          <div className="container">
            <div className="contact reveal">
              <span className="section__tag">07 — Kontak</span>
              <h2 className="contact__title">Mari berkolaborasi 🚀</h2>
              <p className="contact__desc">
                Punya ide proyek, kebutuhan riset, atau sekadar ingin menyapa? Saya
                terbuka untuk ngobrol.
              </p>
              <a href="mailto:muhammadrizalharis@users.noreply.github.com" className="btn btn--primary btn--lg">
                Kirim Email
              </a>
              <div className="contact__socials">
                <a href="https://github.com/muhammadrizalharis" target="_blank" rel="noopener noreferrer" className="contact__social">GitHub ↗</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="contact__social">LinkedIn ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>© {year} Muhammad Rizal Haris. Dibuat dengan ❤️ &amp; sedikit kode.</p>
          <a href="#home" className="footer__top" aria-label="Kembali ke atas">↑ Ke atas</a>
        </div>
      </footer>

      <SiteInteractions />
    </>
  );
}
