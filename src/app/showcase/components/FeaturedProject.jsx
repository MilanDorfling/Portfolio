"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { TbExternalLink } from "react-icons/tb";

// Counts from 0 to `to` once the element enters the viewport
function CountUp({ to, delay = 0, duration = 1.2 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const delayMs = delay * 1000;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - delayMs;
      if (elapsed < 0) { requestAnimationFrame(step); return; }
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, delay, duration]);

  return <span ref={ref}>{display}</span>;
}

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 6, y: -6, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

// Language breakdown — must sum to 100%
const LANGUAGES = [
  { label: "React / JSX", pct: 68, color: "bg-cyan-400" },
  { label: "CSS / Tailwind", pct: 22, color: "bg-sky-500" },
  { label: "HTML", pct: 10, color: "bg-orange-400" },
];

const STATS = [
  {
    value: "1",
    sup: "st",
    label: "Paid client",
    sub: "Live since 2025",
    accent: true,       // visually highlighted
  },
  {
    value: "4",
    sup: "wks",
    label: "Build time",
    sub: "Solo developer",
    accent: true,
  },
  {
    value: "100",
    sup: "%",
    label: "Custom build",
    sub: "No templates or themes",
    accent: true,
  },
];

export default function FeaturedProject() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full"
    >
      {/* ── Label ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs uppercase tracking-[0.18em] text-white/25 font-mono">
          Featured project
        </span>
        <span className="flex-1 h-px bg-white/6" />
        <span className="text-[10px] uppercase tracking-[0.14em] text-emerald-400/60 font-mono">
          ● live
        </span>
      </div>

      {/* ── Main card ──────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden">

        {/* Browser chrome */}
        <div className="bg-[#111] border-b border-white/10 px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1.5 bg-white/5 rounded-md px-3 py-1 border border-white/8">
              {/* Lock icon inline */}
              <svg className="w-2.5 h-2.5 text-white/30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a3 3 0 0 0-3 3v1H3.5A1.5 1.5 0 0 0 2 6.5v7A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 5H11V4a3 3 0 0 0-3-3zm0 1a2 2 0 0 1 2 2v1H6V4a2 2 0 0 1 2-2z"/>
              </svg>
              <span className="text-[11px] text-white/30 font-mono tracking-wide">
                vslman.co.za
              </span>
            </div>
          </div>
          {/* Spacer to balance the traffic lights */}
          <div className="w-13" />
        </div>

        {/* Live iframe — eager because it's above the fold */}
        <div className="relative w-full overflow-hidden border-b border-white/6 h-[18rem] sm:h-[28rem] lg:h-[36rem]">
          <iframe
            src="https://vslman.co.za"
            className="w-full h-full border-0 pointer-events-none"
            title="VSL Manufacturing live preview"
            loading="eager"
          />
          {/* Subtle gradient fade at the bottom so the card body doesn't hard-cut */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-linear-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* Body */}
        <div className="px-6 py-6 sm:px-8 sm:py-7 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">

          {/* Left — description + language bar */}
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
              VSL Manufacturing
            </h3>

            <p className="text-sm text-white/45 leading-relaxed max-w-lg mb-4">
              VSL needed a full rebuild — their existing site was outdated and
              didn't reflect the quality of their engineering work. I redesigned
              and developed the entire site from scratch: new information
              architecture, responsive layout, and a clean visual identity that
              matches the precision of their products.
            </p>

            {/* Language pills — percentage is the visual anchor */}
            <div className="flex items-center gap-2 flex-wrap">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/3"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${lang.color}`} />
                  <span className="text-base font-semibold text-white/80 leading-none tabular-nums">
                    {lang.pct}%
                  </span>
                  <span className="text-[11px] text-white/30 leading-none">
                    {lang.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — action buttons */}
          <div className="flex flex-row md:flex-col gap-3 md:items-end pt-0 md:pt-1">

            <motion.a
              href="https://vslman.co.za"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="animate"
              initial="initial"
              className="relative"
            >
              <motion.span
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-40 flex items-center justify-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg bg-white text-black whitespace-nowrap"
              >
                <TbExternalLink className="w-3.5 h-3.5" />
                Visit site
              </motion.span>
              <motion.span
                variants={secondaryVariant}
                className="absolute inset-0 z-30 rounded-lg border border-dashed border-white/40 bg-transparent opacity-0"
              />
            </motion.a>

            <motion.a
              href="https://github.com/MilanDorfling/vsl-manufacturing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="animate"
              initial="initial"
              className="relative"
            >
              <motion.span
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-40 flex items-center justify-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border border-white/10 bg-white/4 text-white/50 whitespace-nowrap hover:text-white/70 transition-colors"
              >
                <FaGithub className="w-3.5 h-3.5" />
                GitHub
              </motion.span>
              <motion.span
                variants={secondaryVariant}
                className="absolute inset-0 z-30 rounded-lg border border-dashed border-white/20 bg-transparent opacity-0"
              />
            </motion.a>

          </div>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-3 rounded-2xl border border-white/8 bg-[#0a0a0a] grid grid-cols-3 overflow-hidden"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
            viewport={{ once: true }}
            className={`px-3 py-4 sm:px-6 sm:py-5 border-r border-white/6 last:border-r-0 relative overflow-hidden ${
              s.accent ? "bg-white/2" : ""
            }`}
          >

            {/* Shimmer sweep — fires once when the stat scrolls into view */}
            {s.accent && (
              <motion.span
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="absolute inset-y-0 w-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                }}
              />
            )}

            {/* Value — counts up from 0 when it enters the viewport */}
            <motion.div
              className="text-2xl font-semibold tracking-tight leading-none mb-1.5"
            >
              <motion.span
                className={s.accent ? "text-white" : "text-white/75"}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.12 }}
                viewport={{ once: true }}
              >
                <CountUp to={parseInt(s.value, 10)} delay={0.45 + i * 0.12} />
              </motion.span>
              <sup className="text-[12px] font-normal text-white/30 align-super ml-0.5">
                {s.sup}
              </sup>
            </motion.div>

            <div className={`text-xs font-medium mb-0.5 ${s.accent ? "text-white/60" : "text-white/40"}`}>
              {s.label}
            </div>
            <div className="text-[11px] text-white/20">{s.sub}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}