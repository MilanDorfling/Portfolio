"use client";

import React from "react";

export default function SectionNav({ sections, activeSection }) {
  if (!sections?.length) return null;

  return (
    <aside className="sticky top-1/2 z-30 hidden -translate-y-1/2 self-start lg:block">
      <nav
        aria-label="Section navigation"
        className="inline-block rounded-2xl border border-black/10 bg-white/80 p-2 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/60"
      >
        <ul className="space-y-2">
          {sections.map((section) => {
            const active = activeSection === section.id;
            return (
              <li key={section.id}>
                <a
                  href="#"
                  className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                    active ? "text-foreground" : "text-foreground/50 hover:text-foreground"
                  }`}
                  aria-current={active ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(section.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                      if (window.location.hash) {
                        history.replaceState(null, "", window.location.pathname + window.location.search);
                      }
                    }
                  }}
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                    {active && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
                    )}
                    <span
                      className={`relative inline-flex h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        active ? "bg-white" : "border border-current opacity-50"
                      }`}
                    />
                  </span>

                  <span className="text-sm font-medium">{section.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}