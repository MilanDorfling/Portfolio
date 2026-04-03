// Navigation component of the website
"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSound } from "../../lib/useSound";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ activeSection }) {
  const playNavScroll = useSound("/sounds/scroll.mp3", { volume: 0.2, cooldownMs: 120 });
  const playHoverGlow = useSound("/sounds/hover.mp3", { volume: 0, cooldownMs: 120 });
  const previousSectionRef = useRef("");
  const skipNextEffectSoundRef = useRef(false);

  useEffect(() => {
    if (!activeSection) return;

    const previous = previousSectionRef.current;
    if (previous && previous !== activeSection) {
      if (skipNextEffectSoundRef.current) {
        skipNextEffectSoundRef.current = false;
      } else {
        playNavScroll();
      }
    }

    previousSectionRef.current = activeSection;
  }, [activeSection, playNavScroll]);

  return (
    <nav className="fixed top-0 left-0 h-full w-24 flex flex-col items-center justify-center z-50">
      {/* Track */}
      <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-gray-700/30 rounded-full -translate-x-1/2" />
      {/* Nav Items */}
      <ul className="relative z-10 flex flex-col gap-8">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <motion.li
              key={section.id}
              initial={false}
              animate={{
                x: isActive ? 24 : 0, // Slide right if active
                scale: isActive ? 1.15 : 1, // Grow if active
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative"
            >
              <a
                href={`#${section.id}`}
                className={`block px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-[#a143ff]"
                    : "text-gray-300"
                }`}
                style={{
                  fontWeight: isActive ? 700 : 500,
                  fontSize: isActive ? "1.15rem" : "1rem",
                }}
                onMouseEnter={playHoverGlow}
                onClick={e => {
                  e.preventDefault();
                  skipNextEffectSoundRef.current = true;
                  playNavScroll();
                  const el = document.getElementById(section.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {section.label}
              </a>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}