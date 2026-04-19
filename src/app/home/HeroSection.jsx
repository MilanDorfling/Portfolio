"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { HeroSectionGrid, SectionBackground } from "@/app/components/svg";
import ProfileCard from "@/app/UI/ProfileCard";
import { STACK_ICONS } from "@/app/docs/components/stackGrid";

// ── Stack pill — isolated so hover state doesn't cause hydration issues ───
function StackPill({ icon, name, color, delay, ease }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease }}
      title={name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-default"
      style={{
        borderColor: hovered ? `${color}50` : "rgba(255,255,255,0.08)",
        backgroundColor: hovered ? `${color}18` : "rgba(255,255,255,0.03)",
      }}
    >
      {/* Icon */}
      <span
        className="shrink-0 transition-colors duration-200"
        style={{ color: hovered ? color : "rgba(255,255,255,0.35)" }}
      >
        {icon}
      </span>

      {/* Label — expands on hover */}
      <span
        className="text-[11px] font-medium overflow-hidden whitespace-nowrap transition-all duration-200 ease-out"
        style={{
          maxWidth: hovered ? "6rem" : 0,
          opacity: hovered ? 1 : 0,
          color: hovered ? color : "rgba(255,255,255,0.55)",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}


const EASE = [0.25, 0.1, 0.25, 1];

// Reusable fade-up config — spread directly onto <motion.X>
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: EASE },
});

export default function HeroSection({ id }) {
  return (
    <section
      id={id}
      className="relative w-full overflow-hidden rounded-4xl bg-black/40 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
    >
      <SectionBackground background={<HeroSectionGrid />} fallback={null}>
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center gap-8 lg:gap-12 px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16 xl:px-20 xl:py-20">

          {/* ── Left column ─────────────────────────────────────────── */}
          <div className="max-w-2xl">

            {/* Label — updated with location + availability */}
            <motion.p
              {...fadeUp(0.05)}
              className="text-sm font-medium uppercase tracking-[0.22em] text-white/50 sm:text-base"
            >
              Frontend Developer · Remote · South Africa
            </motion.p>

            {/* Headline — tightened */}
            <motion.h1
              {...fadeUp(0.15)}
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Building fast, clean web experiences with React.
            </motion.h1>

            {/* Sub-copy — updated tone */}
            <motion.p
              {...fadeUp(0.25)}
              className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base"
            >
              I specialise in component-driven frontends — from landing pages
              to full product UIs. I care about performance, readable code, and
              interfaces that feel considered.
            </motion.p>

            {/* ── Stack strip ───────────────────────────────────────── */}
            <motion.div {...fadeUp(0.35)} className="mt-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25 mb-3">
                Stack
              </p>

              <div className="flex flex-wrap gap-2">
                {STACK_ICONS.map(({ icon, name, color }, i) => (
                  <StackPill key={name} icon={icon} name={name} color={color} delay={0.42 + i * 0.05} ease={EASE} />
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Profile card ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="w-full flex justify-center lg:justify-end lg:shrink-0"
          >
            <div className="w-full max-w-68 sm:max-w-76 lg:max-w-84">
              <ProfileCard
                avatarUrl="/assets/pictures/portfolio2.jpg"
                miniAvatarUrl="/assets/pictures/portfolio2.jpg"
                iconUrl="/assets/pictures/codepattern.JPG"
                grainUrl="/assets/pictures/codepattern.JPG"
                name=""
                title=""
                handle="milandorfling"
                status="Open to work"
                contactText="Let us talk"
              />
            </div>
          </motion.div>

        </div>
      </SectionBackground>
    </section>
  );
}