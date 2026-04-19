import React from "react";

/**
 * ShowcaseBackground
 *
 * A static, zero-JS dark texture background for the Showcase page.
 * Three layered effects:
 *  1. Film grain  — SVG feTurbulence noise, gives the page a tactile quality
 *  2. Crosshatch  — very faint diagonal line grid, adds depth without grid rigidity
 *  3. Vignette    — radial gradient darkening toward the edges, focuses attention inward
 *
 * Drop this as a fixed/absolute layer behind your Showcase page content.
 * No canvas, no rAF, no state — renders once and stays.
 */
export default function ShowcaseBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ── Layer 1: Base colour ───────────────────────────────────────────── */}
      {/*
        The page bg is already #020202 from globals.css — this layer is just
        insurance so the background is never transparent if the page bg changes.
      */}
      <div className="absolute inset-0 bg-[#020202]" />

      {/* ── Layer 2: Crosshatch ───────────────────────────────────────────── */}
      {/*
        Two sets of diagonal lines at ±45°, 28px apart, 2% opacity each.
        Done with SVG pattern embedded as a data URI so there's no extra fetch.
        The lines give the background a woven texture that reads as intentional
        craftsmanship at a glance without being legible at normal viewing distance.
      */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cpath d='M0 28 L28 0' stroke='rgba(255,255,255,0.018)' stroke-width='0.75'/%3E%3Cpath d='M-4 4 L4 -4' stroke='rgba(255,255,255,0.018)' stroke-width='0.75'/%3E%3Cpath d='M24 32 L32 24' stroke='rgba(255,255,255,0.018)' stroke-width='0.75'/%3E%3Cpath d='M0 0 L28 28' stroke='rgba(255,255,255,0.012)' stroke-width='0.75'/%3E%3Cpath d='M-4 24 L4 32' stroke='rgba(255,255,255,0.012)' stroke-width='0.75'/%3E%3Cpath d='M24 -4 L32 4' stroke='rgba(255,255,255,0.012)' stroke-width='0.75'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Layer 3: Film grain ───────────────────────────────────────────── */}
      {/*
        SVG feTurbulence generates monochromatic noise. The feColorMatrix step
        maps it to near-black with very low alpha so it reads as grain not noise.
        baseFrequency controls grain size — 0.65 is fine/cinematic.
        Rendered as a full-viewport SVG so it scales with the window.
      */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="sc-grain" x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grey"
          />
          <feBlend in="SourceGraphic" in2="grey" mode="overlay" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <rect
          width="100%"
          height="100%"
          fill="rgba(255,255,255,0.028)"
          filter="url(#sc-grain)"
        />
      </svg>

      {/* ── Layer 4: Vignette ─────────────────────────────────────────────── */}
      {/*
        Two-stop radial gradient: transparent centre → near-black edge.
        The 55% midpoint keeps the centre bright enough to not feel oppressive
        while the edges drop to ~80% black opacity, creating focus.
        A second tighter gradient adds a subtle top-edge darkening so the
        page doesn't feel like it's floating in space.
      */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 90% at 50% 40%,
              transparent 30%,
              rgba(0, 0, 0, 0.45) 70%,
              rgba(0, 0, 0, 0.82) 100%
            )
          `,
        }}
      />

      {/* ── Layer 5: Top edge fade ────────────────────────────────────────── */}
      {/*
        Thin gradient from the top so the page nav bleeds into the background
        rather than sitting on a hard edge.
      */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
        }}
      />

      {/* ── Layer 6: Subtle warm tint in the upper-centre ─────────────────── */}
      {/*
        A very faint amber/gold bloom at the top-centre — just enough warmth
        to stop the background from feeling cold/clinical against your dark UI.
        Single radial gradient, 4% opacity.
      */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(251,191,36,0.04), transparent)",
        }}
      />
    </div>
  );
}