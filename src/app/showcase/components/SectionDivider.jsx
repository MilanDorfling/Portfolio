"use client";
import { motion } from "motion/react";

export default function SectionDivider({ label }) {
  return (
    <div className="relative my-62 flex items-center gap-4">

      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "right" }}
        className="h-px flex-1 bg-white/8"
      />

      {/* Label */}
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.22em] text-white/25 shrink-0"
        >
          {label}
        </motion.span>
      )}

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "left" }}
        className="h-px flex-1 bg-white/8"
      />

      {/* Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent blur-sm"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
      />

      {/* Center bloom */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 w-40 h-4 blur-lg rounded-full bg-white/10"
      />
    </div>
  );
}