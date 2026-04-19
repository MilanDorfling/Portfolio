import React from "react";

export default function OrbitPulse({ className = "" }) {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-label="Animated orbit pulse graphic"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="orbit-stroke" x1="40" y1="40" x2="280" y2="280">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#7dd3fc" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="160" r="112" stroke="url(#orbit-stroke)" strokeOpacity="0.25" />
      <circle cx="160" cy="160" r="82" stroke="url(#orbit-stroke)" strokeOpacity="0.18" />
      <circle cx="160" cy="160" r="48" fill="url(#orbit-core)">
        <animate attributeName="r" values="42;48;42" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="160" r="12" fill="#f8fafc" />

      <g>
        <circle cx="160" cy="48" r="6" fill="#7dd3fc">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 160 160"
            to="360 160 160"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="160" cy="242" r="5" fill="#c084fc">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 160 160"
            to="0 160 160"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      <circle cx="160" cy="160" r="122" stroke="#7dd3fc" strokeOpacity="0.22" strokeDasharray="6 12">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 160 160"
          to="360 160 160"
          dur="18s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}