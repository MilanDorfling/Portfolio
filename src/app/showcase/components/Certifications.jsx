"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

const certificates = [
  { name: "Responsive Web Design", issuer: "freeCodeCamp", image: "/assets/pictures/Responsive Web design.png", github: "https://www.freecodecamp.org/certification/ra1den343/responsive-web-design" },
  { name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", image: "/assets/pictures/JS & Algorithms.png", github: "https://www.freecodecamp.org/certification/ra1den343/javascript-algorithms-and-data-structures-v8" },
  { name: "Front End Development Libraries", issuer: "freeCodeCamp", image: "/assets/pictures/Front End Libraries.png", github: "https://www.freecodecamp.org/certification/ra1den343/front-end-development-libraries" },
  { name: "Data Visualization", issuer: "freeCodeCamp", image: "/assets/pictures/Data Visulisation.png", github: "https://www.freecodecamp.org/certification/ra1den343/data-visualization" },
  { name: "Data Analysis with Python", issuer: "freeCodeCamp", image: "/assets/pictures/Data analises.png", github: "https://www.freecodecamp.org/certification/ra1den343/data-analysis-with-python-v7" },
  { name: "Information Security", issuer: "freeCodeCamp", image: "/assets/pictures/Information Security.png", github: "https://www.freecodecamp.org/certification/ra1den343/information-security-v7" },
  { name: "Quality Assurance", issuer: "freeCodeCamp", image: "/assets/pictures/Quality Assurance.png", github: "https://www.freecodecamp.org/certification/ra1den343/quality-assurance-v7" },
  { name: "Information Security and Quality Assurance", issuer: "freeCodeCamp", image: "/assets/pictures/Information.png", github: "https://www.freecodecamp.org/certification/ra1den343/information-security-and-quality-assurance" },
  { name: "Back End Development and APIs", issuer: "freeCodeCamp", image: "/assets/pictures/Back End & API's.png", github: "https://www.freecodecamp.org/certification/ra1den343/back-end-development-and-apis" },
  { name: "Scientific Computing with Python", issuer: "freeCodeCamp", image: "/assets/pictures/Computing Python.png", github: "https://www.freecodecamp.org/certification/ra1den343/scientific-computing-with-python-v7" },
  { name: "College Algebra with Python", issuer: "freeCodeCamp", image: "/assets/pictures/Python Algebra.png", github: "https://www.freecodecamp.org/certification/ra1den343/college-algebra-with-python-v8" },
  { name: "Machine Learning with Python", issuer: "freeCodeCamp", image: "/assets/pictures/Machine learning.png", github: "https://www.freecodecamp.org/certification/ra1den343/machine-learning-with-python-v7" },
  // ── Fix 1: C#.png — the # character is a URL fragment delimiter and breaks
  // the browser's image request. Rename the file to "CSharp.png" on disk and
  // update the path here to match.
  { name: "Foundational C# with Microsoft", issuer: "freeCodeCamp", image: "/assets/pictures/CSharp.png", github: "https://www.freecodecamp.org/certification/ra1den343/foundational-c-sharp-with-microsoft" },
  { name: "Just JavaScript", issuer: "Just JavaScript", image: "/assets/pictures/Just JavaScript.png", github: "" },
];

// Cover the first two full rows (6 cards) so whichever one the browser
// picks as LCP is never lazy-loaded. On mobile that's 6 stacked cards;
// on desktop it's two rows of 3. Beyond that, lazy is correct.
const EAGER_COUNT = 6;

function CertCard({ cert, index }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="group relative rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden cursor-pointer"
    >
      {/* Certificate image */}
      <div className="relative w-full aspect-video overflow-hidden border-b border-white/6">
        <Image
          src={cert.image}
          alt={cert.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          // priority preloads the first card in <head> — strongest LCP signal.
          // eager on the next EAGER_COUNT cards prevents lazy-load racing.
          // Everything else stays lazy.
          {...(index === 0 ? { priority: true } : { loading: index < EAGER_COUNT ? "eager" : "lazy" })}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/25 mb-1">
          {cert.issuer}
        </p>
        <h3 className="text-sm font-medium text-white leading-snug mb-3">
          {cert.name}
        </h3>

        {cert.github && (
          <a
            href={cert.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors"
          >
            <FaGithub className="w-3 h-3" /> View project
          </a>
        )}
      </div>

      {/* Shine effect on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06), transparent 70%)",
        }}
      />
    </motion.div>
  );
}

export default function CertProjects() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55 mb-2">
          Certifications
        </p>
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Built while learning.
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          14 certifications across web development, data science, and computer science.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{ perspective: "1000px" }}
      >
        {certificates.map((cert, i) => (
          <CertCard key={cert.name} cert={cert} index={i} />
        ))}
      </div>
    </div>
  );
}