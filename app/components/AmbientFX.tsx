"use client";

import { useEffect, useRef, useState } from "react";

// Efek latar ringan (hanya CSS transform/opacity, hemat GPU):
//  - Mode malam: kilat petir acak + hujan rintik halus.
//  - Mode siang: sinar matahari lembut + partikel debu melayang.
// Semua dimatikan bila pengguna memilih "reduce motion".
export default function AmbientFX() {
  const [isDark, setIsDark] = useState(true);
  const [flash, setFlash] = useState(0); // 0 none, 1 kiri, 2 kanan
  const timer = useRef<number | undefined>(undefined);

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
      <div className="ambient__dust" />
    </div>
  );
}
