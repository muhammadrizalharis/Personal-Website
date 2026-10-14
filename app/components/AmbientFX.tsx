"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Efek latar ringan (hanya CSS transform/opacity, hemat GPU):
//  - Mode malam: langit berbintang + bulan bercahaya, kilat petir acak, hujan rintik.
//  - Mode siang: langit cerah lembut, matahari, awan melayang, partikel debu.
// Semua dimatikan bila pengguna memilih "reduce motion".
export default function AmbientFX() {
  const [isDark, setIsDark] = useState(true);
  const [flash, setFlash] = useState(0); // 0 none, 1 kiri, 2 kanan
  const timer = useRef<number | undefined>(undefined);

  const stars = useMemo(
    () =>
      Array.from({ length: 48 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 68,
        size: Math.random() * 1.8 + 1,
        delay: Math.random() * 4,
        dur: 2.6 + Math.random() * 3.4,
      })),
    [],
  );

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.getAttribute("data-theme") !== "light");
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDark || reduce) {
      if (timer.current) window.clearTimeout(timer.current);
      setFlash(0);
      return;
    }
    const strike = () => {
      setFlash(Math.random() > 0.5 ? 1 : 2);
      window.setTimeout(() => setFlash(0), 220 + Math.random() * 180);
      timer.current = window.setTimeout(strike, 3500 + Math.random() * 6000);
    };
    timer.current = window.setTimeout(strike, 1800 + Math.random() * 2500);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [isDark]);

  if (isDark) {
    return (
      <div className="ambient ambient--night" aria-hidden="true">
        <div className="ambient__stars">
          {stars.map((s, i) => (
            <span
              key={i}
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
              }}
            />
          ))}
        </div>
        <div className="ambient__shooting" />
        <div className="ambient__moon">
          <span className="ambient__moon-crater ambient__moon-crater--1" />
          <span className="ambient__moon-crater ambient__moon-crater--2" />
          <span className="ambient__moon-crater ambient__moon-crater--3" />
        </div>
        <div className={`ambient__flash${flash ? " is-on" : ""}`} />
        <svg
          className={`ambient__bolt ambient__bolt--${flash}${flash ? " is-on" : ""}`}
          viewBox="0 0 200 400"
          preserveAspectRatio="none"
        >
          <path
            d="M110 0 L70 150 L105 160 L55 400 L140 170 L100 160 L150 0 Z"
            fill="url(#boltGrad)"
          />
          <defs>
            <linearGradient id="boltGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="60%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="ambient__rain" />
      </div>
    );
  }

  return (
    <div className="ambient ambient--day" aria-hidden="true">
      <div className="ambient__sun" />
      <div className="ambient__rays" />
      <div className="ambient__cloud ambient__cloud--1" />
      <div className="ambient__cloud ambient__cloud--2" />
      <div className="ambient__cloud ambient__cloud--3" />
      <div className="ambient__dust" />
    </div>
  );
}
