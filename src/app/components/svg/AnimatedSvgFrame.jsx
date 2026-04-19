import React from "react";

export default function AnimatedSvgFrame({
  title,
  eyebrow,
  children,
  className = "",
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[28px] border border-white/10",
        "bg-black/40 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_42%)]" />
      {(eyebrow || title) && (
        <div className="relative z-10 mb-4 flex items-center justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                {eyebrow}
              </p>
            )}
            {title && <h3 className="mt-1 text-sm font-medium text-white/90">{title}</h3>}
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.8)]" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}