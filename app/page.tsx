import { unstable_noStore as noStore } from "next/cache";
import AmbientFX from "./components/AmbientFX";
import Showcase from "./components/Showcase";
import Guestbook from "./components/Guestbook";
import SiteInteractions from "./components/SiteInteractions";
import { projects } from "./data/projects";
import { publications, orcidUrl } from "./data/publications";
import { getCertificates } from "./lib/certificates";

export default function Home() {
  noStore();
  const year = new Date().getFullYear();
  const certificates = getCertificates();

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />
      <AmbientFX />

      <header className="nav" id="nav">
        <div className="container nav__inner">
          <a href="#home" className="nav__brand" aria-label="Beranda">
            <span className="nav__logo">MR</span>
            <span className="nav__brand-text">Muhammad&nbsp;Rizal&nbsp;Haris</span>
          </a>

          <nav className="nav__links" id="navLinks" aria-label="Navigasi utama">
            <a href="#about" className="nav__link">Tentang</a>
            <a href="#skills" className="nav__link">Keahlian</a>
            <a href="#portfolio" className="nav__link">Portofolio</a>
            <a href="#journey" className="nav__link">Perjalanan</a>
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
            <div className="hero__content">
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
              <a href="#portfolio" className="btn btn--primary">Lihat Proyek</a>
              <a href="#contact" className="btn btn--ghost">Hubungi Saya</a>
            </div>
            <div className="hero__socials reveal" aria-label="Tautan sosial">
              <a href="https://github.com/muhammadrizalharis" className="social" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/muhammad-rizal-haris/" className="social" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" /></svg>
              </a>
              <a href="https://www.instagram.com/mhmmddrizal/" className="social" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://orcid.org/0009-0004-2748-8509" className="social" target="_blank" rel="noopener noreferrer" aria-label="ORCID">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 18.19H5.63V7.72h1.74v10.47zM6.5 6.56a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02zm11.69 11.63h-1.73v-5.11c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69v5.2H11.1V7.72h1.66v1.43h.02c.23-.44.8-1.32 2.22-1.32 2.37 0 2.81 1.25 2.81 3.44v6.92z" /></svg>
              </a>
              <a href="mailto:muhammadrizalharis03@gmail.com" className="social" aria-label="Email">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
              </a>
            </div>
            </div>
            <div className="hero__visual reveal" data-delay="150">
              <div className="portrait">
                <span className="portrait__ring portrait__ring--a" aria-hidden="true" />
                <span className="portrait__ring portrait__ring--b" aria-hidden="true" />
                <span className="portrait__glow" aria-hidden="true" />
                <img
                  src="/pictures/rizal-hero.png"
                  alt="Muhammad Rizal Haris"
                  className="portrait__img"
                  width={720}
                  height={1761}
                  loading="eager"
                />
                <img
                  src="/logo/logo.png"
                  alt="Logo Muhammad Rizal Haris"
                  className="portrait__logo"
                  width={640}
                  height={633}
                  loading="lazy"
                />
              </div>
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
              <h2 className="section__title">Perangkat &amp; <span className="gradient-text">teknologi</span></h2>
              <p className="section__lead">
                Alat yang saya gunakan sehari-hari untuk membangun produk, meneliti,
                dan mengirim gagasan menjadi sesuatu yang nyata.
              </p>
            </div>
            <div className="skills">
              <article className="skill-card reveal tilt" data-tilt>
                <div className="skill-card__sheen" aria-hidden="true" />
                <div className="skill-card__icon">⚛️</div>
                <h3 className="skill-card__title">Frontend</h3>
                <p className="skill-card__sub">Antarmuka cepat &amp; aksesibel</p>
                <ul className="chips">
                  <li className="chip">Next.js</li>
                  <li className="chip">React</li>
                  <li className="chip">TypeScript</li>
                  <li className="chip">Tailwind CSS</li>
                  <li className="chip">Framer Motion</li>
                </ul>
                <div className="skill-card__meter"><span style={{ ["--lvl" as string]: "92%" }} /></div>
              </article>
              <article className="skill-card reveal tilt" data-tilt>
                <div className="skill-card__sheen" aria-hidden="true" />
                <div className="skill-card__icon">🧩</div>
                <h3 className="skill-card__title">Backend</h3>
                <p className="skill-card__sub">API &amp; data yang kokoh</p>
                <ul className="chips">
                  <li className="chip">Node.js</li>
                  <li className="chip">Prisma</li>
                  <li className="chip">PostgreSQL</li>
                  <li className="chip">REST API</li>
                  <li className="chip">Auth &amp; RBAC</li>
                </ul>
                <div className="skill-card__meter"><span style={{ ["--lvl" as string]: "86%" }} /></div>
              </article>
              <article className="skill-card reveal tilt" data-tilt>
                <div className="skill-card__sheen" aria-hidden="true" />
                <div className="skill-card__icon">🧠</div>
                <h3 className="skill-card__title">ML &amp; Data</h3>
                <p className="skill-card__sub">Riset &amp; model prediktif</p>
                <ul className="chips">
                  <li className="chip">Python</li>
                  <li className="chip">scikit-learn</li>
                  <li className="chip">Random Forest</li>
                  <li className="chip">SVM</li>
                  <li className="chip">Jupyter</li>
                </ul>
                <div className="skill-card__meter"><span style={{ ["--lvl" as string]: "80%" }} /></div>
              </article>
              <article className="skill-card reveal tilt" data-tilt>
                <div className="skill-card__sheen" aria-hidden="true" />
                <div className="skill-card__icon">⚙️</div>
                <h3 className="skill-card__title">DevOps &amp; Infra</h3>
                <p className="skill-card__sub">Kontainer, server, otomasi</p>
                <ul className="chips">
                  <li className="chip">Docker</li>
                  <li className="chip">Linux</li>
                  <li className="chip">Nginx</li>
                  <li className="chip">Git &amp; CI</li>
                  <li className="chip">GPU Orkestrasi</li>
                </ul>
                <div className="skill-card__meter"><span style={{ ["--lvl" as string]: "84%" }} /></div>
              </article>
            </div>
          </div>
        </section>

        {/* Portfolio / Showcase */}
        <section className="section" id="portfolio">
          <div className="container">
            <div className="section__head reveal">
              <span className="section__tag">03 — Portofolio</span>
              <h2 className="section__title">Karya, riset &amp; sertifikat</h2>
              <p className="section__lead">
                Proyek yang saya bangun, publikasi ilmiah, dan sertifikat — semuanya
                dalam satu tempat. Pilih tab untuk menjelajah.
              </p>
            </div>
            <Showcase
              projects={projects}
              publications={publications}
              certificates={certificates}
              orcidUrl={orcidUrl}
            />
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
                  <h3 className="timeline__title">Askara Scientific Solutions</h3>
                  <p>Membangun platform pendampingan naskah ilmiah — jurnal nasional &amp; internasional, skripsi/tesis, hingga artikel prosiding, dalam satu alur yang rapi.</p>
                  <div className="timeline__tags"><span>SaaS</span><span>Next.js</span><span>Riset</span></div>
                </div>
              </li>
              <li className="timeline__item reveal">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__time">Sekarang</span>
                  <h3 className="timeline__title">CALYZR.AI — AI self-hosted</h3>
                  <p>Menyatukan model cloud &amp; lokal (Ollama), workflow generatif (ComfyUI), agent eksekusi kode di sandbox, dan gateway kompatibel OpenAI dalam satu antarmuka.</p>
                  <div className="timeline__tags"><span>LLM</span><span>RAG</span><span>Docker</span></div>
                </div>
              </li>
              <li className="timeline__item reveal">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__time">Baru-baru ini</span>
                  <h3 className="timeline__title">CodeUnical &amp; UNISMUH ComputeHub</h3>
                  <p>Platform ujian pemrograman dengan sandbox terisolasi &amp; penilaian otomatis, serta orkestrasi job GPU kampus senyaman Colab namun aman untuk banyak pengguna.</p>
                  <div className="timeline__tags"><span>Sandbox</span><span>GPU</span><span>Edu-tech</span></div>
                </div>
              </li>
              <li className="timeline__item reveal">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__time">Baru-baru ini</span>
                  <h3 className="timeline__title">AXON-RYZR — Generative AI on-premise</h3>
                  <p>Platform text-to-image &amp; text-to-video yang berjalan penuh di GPU node lokal (ComfyUI), terkontainerisasi, dengan isolasi per-user untuk 50–500 pengguna.</p>
                  <div className="timeline__tags"><span>Diffusion</span><span>On-premise</span><span>Queue</span></div>
                </div>
              </li>
              <li className="timeline__item reveal">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__time">Berkelanjutan</span>
                  <h3 className="timeline__title">Riset &amp; publikasi ilmiah</h3>
                  <p>Aktif di bidang riset jurnal — beberapa karya telah terbit dan terdaftar pada ORCID saya. Juga membangun UNICAL Associates Repo sebagai katalog publikasi kampus.</p>
                  <div className="timeline__tags"><span>Machine Learning</span><span>ORCID</span><span>Publikasi</span></div>
                </div>
              </li>
              <li className="timeline__item reveal">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__time">Selalu</span>
                  <h3 className="timeline__title">Belajar &amp; berbagi</h3>
                  <p>Terus mengasah fundamental engineering, arsitektur sistem, dan praktik rekayasa perangkat lunak yang baik — satu commit setiap hari.</p>
                  <div className="timeline__tags"><span>Arsitektur</span><span>Clean Code</span></div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Guestbook */}
        <section className="section" id="guestbook">
          <div className="container">
            <div className="section__head reveal">
              <span className="section__tag">05 — Buku Tamu</span>
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
              <div className="contact__glow" aria-hidden="true" />
              <span className="section__tag">06 — Kontak</span>
              <h2 className="contact__title">Mari <span className="gradient-text">berkolaborasi</span></h2>
              <p className="contact__desc">
                Punya ide proyek, kebutuhan riset, atau sekadar ingin menyapa?
                Pintu saya selalu terbuka untuk percakapan yang baik.
              </p>
              <a href="mailto:muhammadrizalharis03@gmail.com" className="btn btn--primary btn--lg contact__cta">
                <span>Kirim Email</span>
                <span aria-hidden="true">→</span>
              </a>
              <div className="contact__socials">
                <a href="https://github.com/muhammadrizalharis" target="_blank" rel="noopener noreferrer" className="contact__social">
                  <span className="contact__social-ic">⌘</span>
                  <span className="contact__social-tx"><strong>GitHub</strong><em>@muhammadrizalharis</em></span>
                </a>
                <a href="https://www.linkedin.com/in/muhammad-rizal-haris/" target="_blank" rel="noopener noreferrer" className="contact__social">
                  <span className="contact__social-ic">in</span>
                  <span className="contact__social-tx"><strong>LinkedIn</strong><em>Muhammad Rizal Haris</em></span>
                </a>
                <a href="https://www.instagram.com/mhmmddrizal/" target="_blank" rel="noopener noreferrer" className="contact__social">
                  <span className="contact__social-ic">◎</span>
                  <span className="contact__social-tx"><strong>Instagram</strong><em>@mhmmddrizal</em></span>
                </a>
                <a href="https://orcid.org/0009-0004-2748-8509" target="_blank" rel="noopener noreferrer" className="contact__social">
                  <span className="contact__social-ic">iD</span>
                  <span className="contact__social-tx"><strong>ORCID</strong><em>0009-0004-2748-8509</em></span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <span className="nav__logo">MR</span>
            <span>Muhammad Rizal Haris</span>
          </div>
          <p className="footer__poem">
            Di antara baris kode dan larik riset,<br />
            saya merangkai gagasan menjadi karya yang berarti.
          </p>
          <p className="footer__copy">© {year} — dirajut dengan ketekunan, bukan sekadar kode.</p>
          <a href="#home" className="footer__top" aria-label="Kembali ke atas">↑ Ke atas</a>
        </div>
      </footer>

      <SiteInteractions />
    </>
  );
}
