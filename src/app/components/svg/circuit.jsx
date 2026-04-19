"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const resistorXs = [38, 106, 174, 242, 310, 378];

const paths = [
  { id: "top-38",     d: "M 42 60 V -28 Q 42 -38 32 -38 H -90",                              color: "#f97316", delay: 0    },
  { id: "top-242",    d: "M 246 60 V -18",                                                    color: "#38bdf8", delay: 0.3  },
  { id: "top-378",    d: "M 383 60 V 20 Q 384 10 390 10 H 570",                              color: "#a78bfa", delay: 0.15 },
  { id: "bottom-38",  d: "M 42 194 V 272 Q 42 282 32 282 H -360 Q -370 282 -370 292 V 394", color: "#f97316", delay: 0.5  },
  { id: "bottom-106", d: "M 110 194 V 394",                                                  color: "#34d399", delay: 0.12  },
  { id: "bottom-174", d: "M 178 194 V 254",                                                  color: "#38bdf8", delay: 0.4  },
  { id: "bottom-242", d: "M 246 194 V 322",                                                  color: "#facc15", delay: 0.25 },
  { id: "bottom-310", d: "M 314 194 V 294 A 10 10 0 0 0 324 304 H 470",                     color: "#f472b6", delay: 0.6  },
  { id: "bottom-378", d: "M 383 194 V 235 Q 384 250 390 250 H 470",                         color: "#a78bfa", delay: 0.2  },
];

const endpointCircles = [
  { cx: -90,  cy: -38  },
  { cx: 246,  cy: -18  },
  { cx: 570,  cy: 10   },
  { cx: -370, cy: 394  },
  { cx: 110,  cy: 394  },
  { cx: 179,  cy: 250  },
  { cx: 247,  cy: 320  },
  { cx: 470,  cy: 250  },
  { cx: 470,  cy: 304  },
];

// ─── Timing ───────────────────────────────────────────────────────────────────
const DRAW_DURATION = 0.9;
const DRAW_BASE     = 0.25;
const DRAW_SPACING  = 0.12;

// Tracers start 3s after the component mounts
const TRACER_START  = 3;

// ─── Animation variants ───────────────────────────────────────────────────────
const resistorVariants = {
  hidden:  { opacity: 0, scaleY: 0 },
  visible: (delay) => ({
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.3, delay, ease: "backOut" },
  }),
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, delay, ease: "backOut" },
  }),
};

// ─── Resistor ─────────────────────────────────────────────────────────────────
function Resistor({ x, y, delay }) {
  return (
    <motion.g
      custom={delay}
      variants={resistorVariants}
      initial="hidden"
      animate="visible"
      style={{ transformOrigin: `${x + 5}px ${y + 7}px` }}
    >
      <rect x={x} y={y} width="10" height="14" rx="2"
        fill="rgba(64,64,64,0.95)" stroke="rgba(18,18,18,1)" strokeWidth="1" />
      <rect x={x + 1} y={y + 1} width="8" height="6" rx="1"
        fill="rgba(228,228,228,0.95)" />
      <rect x={x + 1} y={y + 7} width="8" height="6" rx="1"
        fill="rgba(86,86,86,0.95)" />
    </motion.g>
  );
}

// ─── Animated Dot ───────────────────────────────────────────────────────────
import { useMotionValue, useTransform, animate } from "framer-motion";

function AnimatedDot({ path, inView, visible }) {
  const pathRef = useRef(null);
  const [len, setLen] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    if (len) {
      let start = null;
      const duration = 1.6 * 1000;
      const delay = (TRACER_START + path.delay) * 1000;
      const repeatDelay = (2.0 + path.delay) * 1000;
      let running = true;
      function loop(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        if (elapsed < delay) {
          setProgress(0);
        } else {
          const t = ((elapsed - delay) % (duration + repeatDelay));
          if (t < duration) {
            setProgress(t / duration);
          } else {
            setProgress(0);
          }
        }
        if (running) raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
      return () => { running = false; cancelAnimationFrame(raf); };
    }
  }, [inView, len, path.delay]);

  // Visibility is now controlled by parent
  useEffect(() => {
    if (pathRef.current) {
      const l = pathRef.current.getTotalLength();
      if (l > 0) setLen(l);
    }
  }, []);

  if (!len) {
    return <path ref={pathRef} d={path.d} stroke="none" fill="none" />;
  }

  // Animate from end (endpoint circle) to start (resistor)
  const pos = pathRef.current ? pathRef.current.getPointAtLength((1 - progress) * len) : { x: 0, y: 0 };
  // Tail: a segment along the path, not a straight line
  const tailLength = 40;
  const tailStart = (1 - progress) * len;
  const tailEnd = Math.min(tailStart + tailLength, len);
  // Unique gradient id per path
  const gradId = `dot-tail-gradient-${path.id}`;

  // Build the tail path segment (from tailStart to tailEnd)
  let tailD = "";
  if (pathRef.current && tailEnd > tailStart) {
    const steps = 12;
    let pts = [];
    for (let i = 0; i <= steps; i++) {
      const l = tailStart + ((tailEnd - tailStart) * i) / steps;
      pts.push(pathRef.current.getPointAtLength(l));
    }
    tailD = pts.length
      ? `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
      : "";
  }

  return (
    <g>
      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={path.color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={path.color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path ref={pathRef} d={path.d} stroke="none" fill="none" />
      {/* Tail path (follows curve) */}
      {tailD && (
        <path
          d={tailD}
          stroke={`url(#${gradId})`}
          strokeWidth={2}
          fill="none"
          opacity={visible && inView ? 1 : 0}
          style={{
            pointerEvents: "none",
            filter: `drop-shadow(0 0 6px ${path.color}) drop-shadow(0 0 10px ${path.color}80)`
          }}
        />
      )}
      {/* Dot */}
      <motion.circle
        cx={pos.x}
        cy={pos.y}
        r={5}
        fill={path.color}
        style={{ filter: `drop-shadow(0 0 6px ${path.color})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible && inView ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </g>
  );
}

// ─── Circuit ──────────────────────────────────────────────────────────────────
export default function Circuit() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const resistorDelay = 0.1;
  const dotBaseDelay  = DRAW_BASE + paths.length * DRAW_SPACING + 0.1;

  // Track which paths are drawn
  const [drawnPaths, setDrawnPaths] = useState(() => Array(paths.length).fill(false));

  useEffect(() => {
    if (!inView) return;
    // Schedule each path's drawn state
    paths.forEach((p, i) => {
      const delay = (DRAW_BASE + i * DRAW_SPACING + DRAW_DURATION) * 1500;
      setTimeout(() => {
        setDrawnPaths(prev => {
          if (prev[i]) return prev;
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay);
    });
  }, [inView]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 260"
      className="block h-auto w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="circuit-border-gradient" x1="210" y1="78" x2="210" y2="182" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgba(229,229,229,0.9)" />
          <stop offset="100%" stopColor="rgba(20,20,20,1)" />
        </linearGradient>
        <linearGradient id="beam-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f97316" stopOpacity="0" />
          <stop offset="50%"  stopColor="#fb923c" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0" />
          <stop offset="50%"  stopColor="#a78bfa" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
        <filter id="dot-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Board */}
      <motion.rect
        x="2" y="78" width="396" height="114" rx="12"
        fill="rgba(38,38,38,0.92)"
        stroke="url(#circuit-border-gradient)"
        strokeWidth="2.8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      />

      {/* Glow beams */}
      <motion.rect
        x="-200" y="128" width="340" height="2" rx="1"
        fill="url(#beam-left)"
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
      />
      <motion.rect
        x="290" y="128" width="340" height="2" rx="1"
        fill="url(#beam-right)"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
      />

      {/* text */}
      <motion.text
        x="205" y="145"
        textAnchor="middle"
        fontSize="42"
        fontWeight="600"
        fill="rgba(255,255,255,0.9)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Create Anything
      </motion.text>

      {/* Top resistors */}
      {resistorXs.map((x, i) => (
        <Resistor key={`top-${x}`} x={x} y={60} delay={resistorDelay + i * 0.06} />
      ))}

      {/* Base traces — draw on at full opacity, then dim before tracers start */}
      {paths.map((path, i) => (
        <motion.path
          key={path.id}
          d={path.d}
          strokeLinecap="round"
          strokeWidth="1.5"
          stroke="rgba(226,232,240,1)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            inView
              ? {
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.7, 0.15],
                }
              : {}
          }
          transition={{
            pathLength: {
              duration: DRAW_DURATION,
              delay: DRAW_BASE + i * DRAW_SPACING,
              ease: "easeInOut",
              times: [0, 1, 1],
            },
            opacity: {
              duration: TRACER_START - (DRAW_BASE + i * DRAW_SPACING),
              delay: DRAW_BASE + i * DRAW_SPACING,
              ease: "easeInOut",
              times: [0, 0.3, 1],
            },
          }}
        />
      ))}

      {/* Animated dots — travel from resistor to endpoint */}
      {paths.map((path, i) => (
        <AnimatedDot key={`dot-${path.id}`} path={path} inView={inView} visible={drawnPaths[i]} />
      ))}

      {/* Endpoint circles */}
      {endpointCircles.map(({ cx, cy }, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={cx} cy={cy} r="10"
          fill="black"
          stroke="rgba(64,64,64,1)"
          strokeWidth="1"
          filter="url(#dot-glow)"
          custom={dotBaseDelay + i * 0.06}
          variants={dotVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* Endpoint ripple rings */}
      {endpointCircles.map(({ cx, cy }, i) => (
        <motion.circle
          key={`ring-${i}`}
          cx={cx} cy={cy} r="10"
          fill="none"
          stroke="rgba(148,163,184,0.25)"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0 }}
          animate={inView ? { scale: [1, 1.9, 1], opacity: [0, 0.5, 0] } : {}}
          transition={{
            duration: 2.8,
            delay: dotBaseDelay + i * 0.06 + 0.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* Bottom resistors */}
      {resistorXs.map((x, i) => (
        <Resistor key={`bottom-${x}`} x={x} y={194} delay={resistorDelay + i * 0.06 + 0.1} />
      ))}
    </svg>
  );
}