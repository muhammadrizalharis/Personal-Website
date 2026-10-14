"use client";

import { useEffect } from "react";

const PHRASES = [
  "Full-Stack Developer",
  "Machine Learning Engineer",
  "Research Engineer",
  "Problem Solver",
];

// Semua interaksi UI non-React (scroll spy, theme toggle, reveal, typewriter,
// count-up) dijalankan di sisi klien setelah markup ter-render.
export default function SiteInteractions() {
  useEffect(() => {
    const root = document.documentElement;
    const cleanups: Array<() => void> = [];

    // Theme
    try {
      const stored = localStorage.getItem("theme");
      if (stored) root.setAttribute("data-theme", stored);
      else if (window.matchMedia("(prefers-color-scheme: light)").matches)
        root.setAttribute("data-theme", "light");
    } catch {
      /* ignore */
    }
    const themeToggle = document.getElementById("themeToggle");
    const onTheme = () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* ignore */
      }
    };
    themeToggle?.addEventListener("click", onTheme);
    cleanups.push(() => themeToggle?.removeEventListener("click", onTheme));

    // Navbar + progress
    const nav = document.getElementById("nav");
    const progress = document.getElementById("scrollProgress");
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      nav?.classList.toggle("scrolled", y > 20);
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));
    onScroll();

    // Mobile menu
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    const closeMenu = () => {
      navLinks?.classList.remove("open");
      navToggle?.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    };
    const onToggle = () => {
      const open = navLinks?.classList.toggle("open") ?? false;
      navToggle?.classList.toggle("open", open);
      navToggle?.setAttribute("aria-expanded", String(open));
    };
    navToggle?.addEventListener("click", onToggle);
    cleanups.push(() => navToggle?.removeEventListener("click", onToggle));
    const linkEls = navLinks ? Array.from(navLinks.querySelectorAll("a")) : [];
    linkEls.forEach((a) => a.addEventListener("click", closeMenu));
    cleanups.push(() =>
      linkEls.forEach((a) => a.removeEventListener("click", closeMenu)),
    );

    // Scroll spy
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const linkMap: Record<string, Element> = {};
    document.querySelectorAll(".nav__link").forEach((l) => {
      const id = (l.getAttribute("href") || "").replace("#", "");
      if (id) linkMap[id] = l;
    });
    let spy: IntersectionObserver | undefined;
    if (sections.length) {
      spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              Object.values(linkMap).forEach((l) => l.classList.remove("active"));
              linkMap[en.target.id]?.classList.add("active");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      sections.forEach((s) => spy!.observe(s));
      cleanups.push(() => spy?.disconnect());
    }

    // Reveal
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en, i) => {
          if (en.isIntersecting) {
            const el = en.target as HTMLElement;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : (i % 4) * 80;
            window.setTimeout(() => el.classList.add("visible"), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Count up
    const facts = Array.from(document.querySelectorAll<HTMLElement>(".fact__num"));
    const countObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          const target = parseInt(el.dataset.count || "0", 10) || 0;
          const dur = 1200;
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.unobserve(el);
        });
      },
      { threshold: 0.6 },
    );
    facts.forEach((f) => countObs.observe(f));
    cleanups.push(() => countObs.disconnect());

    // Typewriter
    const typed = document.getElementById("typed");
    let typingTimer: number | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typed && !reduce) {
      let pi = 0,
        ci = 0,
        deleting = false;
      const tick = () => {
        const word = PHRASES[pi];
        ci += deleting ? -1 : 1;
        typed.textContent = word.slice(0, ci);
        let wait = deleting ? 45 : 90;
        if (!deleting && ci === word.length) {
          wait = 1600;
          deleting = true;
        } else if (deleting && ci === 0) {
          deleting = false;
          pi = (pi + 1) % PHRASES.length;
          wait = 400;
        }
        typingTimer = window.setTimeout(tick, wait);
      };
      tick();
      cleanups.push(() => {
        if (typingTimer) window.clearTimeout(typingTimer);
      });
    } else if (typed) {
      typed.textContent = PHRASES[0];
    }

    // 3D tilt (skill cards & any [data-tilt])
    const tiltEls = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    if (!reduce) {
      tiltEls.forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const rx = (0.5 - py) * 10;
          const ry = (px - 0.5) * 12;
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
          el.style.setProperty("--mx", px * 100 + "%");
          el.style.setProperty("--my", py * 100 + "%");
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
