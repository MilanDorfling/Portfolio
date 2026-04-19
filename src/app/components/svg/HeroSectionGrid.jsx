"use client";

import React from "react";
import { motion } from "framer-motion";

const SVG_WIDTH = 880;
const SVG_HEIGHT = 360;
const verticalLines = [64, 320, 576, 832];
const horizontalLines = [36, 132, 228, 324];
const gridColumns = { A: 64, B: 320, C: 576, D: 832 };
const gridRows = { 1: 36, 2: 132, 3: 228, 4: 324 };
const arcRadius = 24;
const arcDashPattern = "0 5";
const lineAnimDuration = 0.8;
const verticalStartDelay = 0.1;
const verticalStagger = 0.15;
const horizontalStartDelay = 0.7;
const horizontalStagger = 0.15;
const gridAnimationEnd =
  horizontalStartDelay +
  (horizontalLines.length - 1) * horizontalStagger +
  lineAnimDuration;
const arcStartDelay = gridAnimationEnd + 0.15;
const arcAnimDuration = 0.6;
const arcStagger = 0.15;
const edgeFadeMask = "radial-gradient(ellipse at center, black 58%, rgba(0, 0, 0, 0.92) 76%, transparent 100%)";

export default function HeroSectionGrid({ className = "" }) {
  return (
    <div
      className={[
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden",
        className,
      ].join(" ").trim()}
      style={{
        WebkitMaskImage: edgeFadeMask,
        maskImage: edgeFadeMask,
      }}
    >
      <motion.svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="block h-full w-full"
        shapeRendering="geometricPrecision"
        fill="none"
      >
        <motion.path
          d={`M ${gridColumns.A} ${gridRows[1] - arcRadius} A ${arcRadius} ${arcRadius} 0 1 0 ${gridColumns.A + arcRadius} ${gridRows[1]}`}
          transform={`rotate(90 ${gridColumns.A} ${gridRows[1]})`}
          stroke="#ffffff"
          strokeOpacity="0.4"
          strokeWidth="1"
          strokeDasharray={arcDashPattern}
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: arcAnimDuration,
            ease: "easeOut",
            delay: arcStartDelay,
          }}
          fill="none"
        />

        <motion.path
          d={`M ${gridColumns.C} ${gridRows[3] - arcRadius} A ${arcRadius} ${arcRadius} 0 1 0 ${gridColumns.C + arcRadius} ${gridRows[3]}`}
          transform={`rotate(270 ${gridColumns.C} ${gridRows[3]})`}
          stroke="#ffffff"
          strokeOpacity="0.4"
          strokeWidth="1"
          strokeDasharray={arcDashPattern}
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: arcAnimDuration,
            ease: "easeOut",
            delay: arcStartDelay + arcStagger,
          }}
          fill="none"
        />

        {verticalLines.map((x, idx) => (
            <motion.line
              key={`vertical-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2={SVG_HEIGHT}
              stroke="#ffffff"
              strokeOpacity="0.5"
              strokeWidth="1"
              strokeDasharray="0 6"
              strokeLinecap="square"
              vectorEffect="non-scaling-stroke"
              initial={{ y2: 0 }}
              animate={{ y2: SVG_HEIGHT }}
               transition={{ duration: lineAnimDuration, ease: "easeOut", delay: verticalStartDelay + idx * verticalStagger }}
            />
          ))}

          {horizontalLines.map((y, idx) => (
            <motion.line
              key={`horizontal-${y}`}
              x1="0"
              y1={y}
              x2={SVG_WIDTH}
              y2={y}
              stroke="#ffffff"
              strokeOpacity="0.5"
              strokeWidth="1"
              strokeDasharray="0 6"
              strokeLinecap="square"
              vectorEffect="non-scaling-stroke"
              initial={{ x2: 0 }}
              animate={{ x2: SVG_WIDTH }}
               transition={{ duration: lineAnimDuration, ease: "easeOut", delay: horizontalStartDelay + idx * horizontalStagger }}
            />
          ))}
      </motion.svg>
    </div>
  );
}