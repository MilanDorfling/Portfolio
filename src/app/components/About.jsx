// src/app/components/About.jsx
"use client";

import React, { useRef, useState } from "react";
import { Tooltip } from "../UI/tooltip-card";
import { useSound } from "../../lib/useSound";
import WorldMap from "../UI/world-map";
import { DiCss3, DiHtml5, DiJavascript, DiReact,  } from "react-icons/di";
import { SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPython,  } from "react-icons/si";

const SKILLS = [
  { icon: DiHtml5,       label: "HTML",       className: "text-red-400" },
  { icon: DiCss3,        label: "CSS",        className: "text-blue-500" },
  { icon: DiJavascript,  label: "JavaScript", className: "text-yellow-500" },
  { icon: DiReact,       label: "React",      className: "text-cyan-500" },
  { icon: SiNextdotjs,   label: "Next.js",    className: "text-zinc-100" },
  { icon: SiNodedotjs,   label: "Node.js",    className: "text-green-500" },
  { icon: SiTailwindcss, label: "Tailwind",   className: "text-sky-400" },
  { icon: SiPython,      label: "Python",     className: "text-yellow-300" },
];

function SkillCard({ icon: Icon, label, className, onMouseEnter }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setStyle({
      transform: `perspective(100px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg) translate(${dx * 4}px, ${dy * 4}px)`,
      transition: "transform 60ms linear",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(100px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)",
      transition: "transform 350ms ease-out",
    });
  };

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-foreground/10 cursor-pointer"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <Icon className={`text-3xl ${className}`} />
      <span className="text-xs text-foreground/70">{label}</span>
    </div>
  );
}

export default function About() {
  const playPopSound = useSound("/sounds/pop.mp3", { volume: 0.5, cooldownMs: 120 });
  const playHoverSound = useSound("/sounds/hover.mp3", { volume: 0.1, cooldownMs: 120 });

  return (
    <section 
      id="about" 
      className="max-w-3xl mx-auto min-h-screen px-6 md:px-0 flex flex-col justify-center"
    >
      {/* Personal Info Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-accent">About Me</h2>
        <div className="flex flex-col items-end">
          <div className="text-3xl font-bold text-foreground">Milan Dorfling</div>
          <div className="text-accent font-semibold text-xl">Frontend Developer</div>
        </div>
      </div>

      {/* Short Intro */}
      <div className="mb-8 text-lg text-foreground/90 leading-relaxed">
        Based in South Africa. Self-taught in web development through hands-on projects and continuous learning.
      </div>

      {/* Learning & Skills Development */}
      <div className="mb-8 text-lg text-foreground/90 leading-relaxed">
        I completed all legacy{" "}
          <Tooltip
            containerClassName="hover:text-yellow-500 font-semibold"
            content="View my FreeCodeCamp profile and certifications, including legacy curriculum achievements and project work."
          >
            <a href="https://www.freecodecamp.org/ra1den343" 
               target="_blank" 
               rel="noopener noreferrer"
               onMouseEnter={playPopSound}
               onFocus={playPopSound}>
              freeCodeCamp
            </a>
          </Tooltip>{" "}
        courses, covering HTML, CSS, JavaScript, responsive design, and full stack fundamentals.
        <br />
        <br />
        I am currently taking{" "}
        <Tooltip
          containerClassName="hover:text-purple-500 font-semibold"
          content="Josh W. Comeau's Joy of React course focused on modern React patterns, deep fundamentals, and best practices."
        >
          <a href="https://www.joshwcomeau.com/" 
             target="_blank" 
             rel="noopener noreferrer"
             onMouseEnter={playPopSound}
             onFocus={playPopSound}>
            Joy of React
          </a>
        </Tooltip>{" "}
        by Josh W. Comeau, which focuses on advanced React concepts and best practices. My learning is project-driven and I regularly apply new concepts to real work.
      </div>

      {/* Education */}
      <div className="mb-8 text-lg text-foreground/90 leading-relaxed">
        I completed my IGCSE at British International College, South Africa, with a focus on Mathematics, Physics, Chemistry, Computer Science, Business Studies, and English.
      </div>

      {/* Skills */}
      <div className="mb-8">
        <span className="font-semibold text-foreground">Skills:</span>
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 mt-4">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.label} {...skill} onMouseEnter={playHoverSound} />
          ))}
        </div>
      </div>
      {/* Goals */}
      <div className="mb-8 text-lg text-foreground/90 leading-relaxed">
        My current goal is to gain experience in the tech industry as a frontend developer. I am open to work, eager to learn from experienced developers and mentors, and focused on expanding my skill set.
      </div>

      {/* Location Map */}
      <div className="mt-16 pt-8 border-t border-foreground/20">
        <div
          style={{
            transform: "perspective(700px) rotateX(55deg)",
            transformOrigin: "center top",
          }}
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          <WorldMap
            dots={[
              {
                start: { lat: -46.9, lng: 28.0, label: "Pretoria" },
                end: { lat: -52.9, lng: 30.0, label: "Port Elizabeth" },
              },
              {
                start: { lat: -46.9, lng: 28.0, label: "Pretoria" },
                end: { lat: -56.0, lng: 21.0, label: "Cape Town" },
              },
              {
                start: { lat: -46.9, lng: 28.0, label: "Pretoria" },
                end: { lat: 51.5, lng: -0.1, label: "London" },
              },
              {
                start: { lat: -46.9, lng: 28.0, label: "Pretoria" },
                end: { lat: 40.7, lng: -74.0, label: "New York" },
              },
              {
                start: { lat: -46.9, lng: 28.0, label: "Pretoria" },
                end: { lat: 37.7, lng: -122.4, label: "San Francisco" },
              },
              {
                start: { lat: -46.9, lng: 28.0, label: "Pretoria" },
                end: { lat: 42.4, lng: 10.4, label: "Berlin" },
              },
            ]}
            lineColor="#818cf8"
          />
        </div>
      </div>
    </section>
  );
}