"use client";
import React, { useEffect, useState } from "react";
import { DotBackgroundDemo } from "./UI/background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "contact"];

    const handleScroll = () => {
      // If at the very bottom, set last section active
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <DotBackgroundDemo className="-z-20" />
      {/* adding a mask so elements have a subtle fade as it scrolls in or out */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 to-transparent pointer-events-none z-10" />
      <Nav activeSection={activeSection} />
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black/10 sm:items-start z-20">
        <Hero id="home" />
        <About id="about" />
        <Projects id="projects" />
        <Contact id="contact" />
      </main>
    </div>
  );
}
