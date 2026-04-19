import React, { useRef, useState } from "react";
import { Circuit } from "@/app/components/svg";
import CircuitLinkSVG from "@/app/components/svg/circuitlinkSVG";

export default function AboutSection({ id }) {
  const containerRef = useRef(null);
  const buttonRef   = useRef(null);
  const circuitRef  = useRef(null);
  const [linkActive, setLinkActive] = useState(false);

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-4xl bg-black/30 shadow-[0_20px_70px_rgba(0,0,0,0.28)]"
    >
      {/* Animated circuit link */}
      <CircuitLinkSVG
        active={linkActive}
        buttonRef={buttonRef}
        circuitRef={circuitRef}
        containerRef={containerRef}
      />

      {/*
        On mobile/tablet:  single column, content stacks, circuit appears below.
        On lg+:            two-column grid — text left, circuit right.
        The circuit column is fixed-width so it never squeezes the text.
      */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center gap-0">

        {/* ── Content column ─────────────────────────────────────── */}
        <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16 xl:px-20 xl:py-20">

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
              About Me
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              I'm Milan, a frontend developer.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Based in South Africa and working remotely, I build interfaces that
              prioritize strong design, reusable components, and practical product quality.
            </p>
          </div>

          {/* Body copy */}
          <div className="max-w-2xl space-y-5">
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
              I started learning web development in 2024 and quickly moved from
              fundamentals into building real projects. I've worked through structured
              courses, mentorship, and hands-on development, including contributing to
              a live client site for VSL Manufacturing.
            </p>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
              I work mainly with JavaScript, React, and Next.js, and I focus on
              building clean, maintainable interfaces using reusable components.
            </p>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
              My approach is practical: write clear code, structure things properly,
              and build interfaces that are easy to work on and extend.
            </p>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
              I'm currently looking for a frontend role where I can contribute to a
              team, ship real features, and continue improving as a developer.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              ref={buttonRef}
              href="/showcase"
              className="inline-block rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800 hover:shadow-lg border border-transparent hover:border-cyan-400 sm:text-base"
              onMouseEnter={() => setLinkActive(true)}
              onMouseLeave={() => setLinkActive(false)}
            >
              View My Work
            </a>
          </div>
        </div>

        {/* ── Circuit column — hidden on mobile, right on lg+ ─────── */}
        <div
          ref={circuitRef}
          className="flex justify-center py-8 px-6 lg:items-center lg:justify-center lg:w-56 lg:py-16 lg:pr-10 xl:w-64 xl:pr-14"
        >
          <div className="w-36 sm:w-44 lg:w-full opacity-85">
            <Circuit />
          </div>
        </div>

      </div>
    </section>
  );
}