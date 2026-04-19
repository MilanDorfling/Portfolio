"use client";
import React from "react";
import FeaturedProject from "./components/FeaturedProject";
import SectionDivider from "./components/SectionDivider";
import CertProjects from "./components/Certifications";
import ConstellationBackground from "../components/svg/ConstellationBackground";

export default function ShowcasePage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-500 px-[clamp(1rem,3.2vw,2.75rem)] pb-24 pt-32 sm:px-[clamp(1.25rem,3.6vw,3rem)] lg:pt-36">
      <ConstellationBackground className="z-0" />
      {/* Page header */}
      <div className="mb-16 z-20">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55 mb-4">
          Showcase
        </p>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl max-w-xl">
          Projects I&apos;ve built and shipped.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
          A mix of real client work and projects built while learning. Every
          project here was built by me, from scratch.
        </p>
      </div>

      {/* Featured project */}
      <div className="mb-24 z-20">
        <FeaturedProject />
      </div>

      {/* Section divider */}
      <div className="mb-16 z-20">
        <SectionDivider label="View my Certifications" />
        <CertProjects />
      </div>
    </main>
  );
}
