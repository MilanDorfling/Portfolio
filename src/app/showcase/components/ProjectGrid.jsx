"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { TbExternalLink } from "react-icons/tb";

// ─── Project data ────────────────────────────────────────────────────────────
// Add personal and side projects here. Each entry renders as a card in the
// responsive grid below the featured projects.
//
// Shape:
//   name        – project title
//   description – one or two sentences describing the project
//   tags        – array of strings for the tech-stack pills
//   liveUrl     – href for the live-site button (omit or set "" to hide)
//   githubUrl   – href for the GitHub button   (omit or set "" to hide)
export const PROJECTS = [
  // ── Add your projects below ───────────────────────────────────────────────
  // {
  //   name: "My Side Project",
  //   description: "A short description of what it does and why you built it.",
  //   tags: ["React", "Node.js", "Tailwind"],
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com/MilanDorfling/my-side-project",
  // },
];

// ─── Single project card ──────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { name, description, tags = [], liveUrl, githubUrl } = project;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="group relative flex flex-col rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden cursor-default"
    >
      {/* Card body */}
      <div className="flex-1 p-5">
        <h3 className="text-sm font-semibold text-white leading-snug mb-2">
          {name}
        </h3>

        <p className="text-xs text-white/40 leading-relaxed mb-4">
          {description}
        </p>

        {/* Tech-stack pills */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-white/8 bg-white/3 text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer — links */}
      {(liveUrl || githubUrl) && (
        <div className="px-5 pb-4 pt-0 flex items-center gap-3 border-t border-white/6 mt-0">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              <TbExternalLink className="w-3 h-3" />
              Visit site
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              <FaGithub className="w-3 h-3" />
              GitHub
            </a>
          )}
        </div>
      )}

      {/* Shine effect on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06), transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export default function ProjectGrid() {
  if (PROJECTS.length === 0) return null;

  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55 mb-2">
          Projects
        </p>
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Personal &amp; side projects.
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Smaller builds, experiments, and tools built for fun or to scratch an itch.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{ perspective: "1000px" }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
