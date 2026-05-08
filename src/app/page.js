"use client";

import React, { useEffect, useMemo, useState } from "react";
import SectionNav from "./components/SectionNav";
import { DotBackground, SectionBackground } from "./components/svg";
import { homeSections, homeSectionNavItems } from "./home";

export default function Home() {
  const [activeSection, setActiveSection] = useState(homeSectionNavItems[0].id);

  const sectionIds = useMemo(
    () => homeSectionNavItems.map((section) => section.id),
    [],
  );

  useEffect(() => {
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sectionElements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [sectionIds]);

  return (
    <SectionBackground fallback={<DotBackground />}>
      <div className="relative isolate min-h-screen w-full bg-zinc-50 text-foreground dark:bg-black">
        <main className="relative z-20 mx-auto w-full max-w-500 px-[clamp(1rem,3.2vw,2.75rem)] pb-24 pt-24 sm:px-[clamp(1.25rem,3.6vw,3rem)] lg:pt-28">

          {/* Sticky mobile section nav — outside the grid so sticky works correctly */}
          <div className="lg:hidden sticky top-[4.5rem] z-30 -mx-[clamp(1rem,3.2vw,2.75rem)] sm:-mx-[clamp(1.25rem,3.6vw,3rem)] px-[clamp(1rem,3.2vw,2.75rem)] sm:px-[clamp(1.25rem,3.6vw,3rem)] bg-zinc-950/90 backdrop-blur-md border-b border-white/5 py-1.5 mb-4">
            <SectionNav
              sections={homeSectionNavItems}
              activeSection={activeSection}
              mobileOnly
            />
          </div>

          <div className="grid items-start gap-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10">
            <SectionNav
              sections={homeSectionNavItems}
              activeSection={activeSection}
              desktopOnly
            />

            <div className="min-w-0 space-y-10 lg:space-y-44 lg:mt-10">
              {homeSections.map(({ id, Component }) => (
                <Component key={id} id={id} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SectionBackground>
  );
}
