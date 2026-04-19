// CircuitLinkSVG.jsx — clean final version
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESISTOR_SVG_X = 111; // center of 2nd resistor (x=106 + w/2=5)
const RESISTOR_SVG_Y = 60;  // top pin of top resistor row
const R = 10;               // bend corner radius

function getSvgScale(circuitEl) {
  const svgEl = circuitEl.querySelector("svg");
  if (!svgEl) return null;
  const rect = svgEl.getBoundingClientRect();
  return { scaleX: rect.width / 400, scaleY: rect.height / 260, rect };
}

function buildPath(b, r) {
  const isRight = r.x > b.x + 60;

  if (isRight) {
    const midX = b.x + (r.x - b.x) * 0.55;
    const midY = r.y - 88;

    // If the resistor is above the button (desktop), the path needs to
    // curve upward out of the button before travelling across.
    // If it's below (mobile landscape etc.), it curves downward instead.
    const goingUp = r.y < b.y;

    return [
      `M ${b.x} ${b.y}`,
      `H ${midX - R}`,
      `Q ${midX} ${b.y} ${midX} ${b.y + (goingUp ? -R : R)}`,
      `V ${midY + (goingUp ? R : -R)}`,
      `Q ${midX} ${midY} ${midX + R} ${midY}`,
      `H ${r.x - R}`,
      `Q ${r.x} ${midY} ${r.x} ${midY + R}`,
      `V ${r.y}`,
    ].join(" ");
  } else {
    // Stacked: button is above, circuit is below
    const midY = b.y + (r.y - b.y) * 0.5;
    return [
      `M ${b.x} ${b.y}`,
      `V ${midY - R}`,
      `Q ${b.x} ${midY} ${b.x + R} ${midY}`,
      `H ${r.x - R}`,
      `Q ${r.x} ${midY} ${r.x} ${midY + R}`,
      `V ${r.y}`,
    ].join(" ");
  }
}

export default function CircuitLinkSVG({ active, buttonRef, circuitRef, containerRef }) {
  const [state, setState] = useState(null); // { path, bAnchor, rAnchor, w, h }
  const rafRef = useRef(null);

  const measure = useCallback(() => {
    if (!buttonRef?.current || !circuitRef?.current || !containerRef?.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = buttonRef.current.getBoundingClientRect();
    const svgInfo = getSvgScale(circuitRef.current);
    if (!svgInfo) return;

    const { scaleX, scaleY, rect: svgRect } = svgInfo;

    // Resistor anchor (container-relative)
    const rAnchor = {
      x: svgRect.left + RESISTOR_SVG_X * scaleX - containerRect.left,
      y: svgRect.top  + RESISTOR_SVG_Y * scaleY - containerRect.top,
    };

    const isRight = rAnchor.x > btnRect.right - containerRect.left + 60;

    // Button anchor
    const bAnchor = isRight
      ? { x: btnRect.right  - containerRect.left, y: btnRect.top + btnRect.height / 2 - containerRect.top }
      : { x: btnRect.left   + btnRect.width / 2 - containerRect.left, y: btnRect.bottom - containerRect.top };

    setState({
      path: buildPath(bAnchor, rAnchor),
      bAnchor,
      rAnchor,
      w: containerRect.width,
      h: containerRect.height,
    });
  }, [buttonRef, circuitRef, containerRef]);

  useEffect(() => {
    if (!active) { setState(null); return; }

    measure();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    });
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", measure);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, measure]);

  return (
    <AnimatePresence>
      {active && state && (
        <svg
          key="cls"
          style={{
            position: "absolute",
            inset: 0,
            width: state.w,
            height: state.h,
            pointerEvents: "none",
            zIndex: 30,
            overflow: "visible",
          }}
        >
          <defs>
            <linearGradient id="clsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#06b6d4" />
              <stop offset="45%"  stopColor="#0e7490" />
              <stop offset="72%"  stopColor="#facc15" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>

          {/* Subtle base trace */}
          <motion.path
            d={state.path}
            stroke="rgba(148,163,184,0.12)"
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Glowing gradient trace */}
          <motion.path
            d={state.path}
            stroke="url(#clsGrad)"
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
            style={{ filter: "drop-shadow(0 0 5px #a78bfa88)" }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut", delay: 0.06 }}
          />

          {/* Button anchor dot */}
          <motion.circle
            cx={state.bAnchor.x} cy={state.bAnchor.y} r={3}
            fill="#06b6d4"
            style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Resistor anchor dot */}
          <motion.circle
            cx={state.rAnchor.x} cy={state.rAnchor.y} r={3}
            fill="#a78bfa"
            style={{ filter: "drop-shadow(0 0 4px #a78bfa)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.75 }}
          />
        </svg>
      )}
    </AnimatePresence>
  );
}