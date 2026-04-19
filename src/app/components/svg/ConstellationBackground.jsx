"use client";
import { useEffect, useRef } from "react";

export default function ConstellationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    const DOTS = 60;         // ← number of dots
    const MAX_DIST = 180;    // ← max distance for lines to appear

    // ↓ CHANGE DOT COLORS HERE — add/remove colors from this array
    const COLORS = [
      "rgba(168,85,247,",   // purple
      "rgba(0,255,255,",    // cyan
      "rgba(255,255,255,",  // white
    ];

    const dots = Array.from({ length: DOTS }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,  // ← increase for faster movement
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,     // ← change for dot size range
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {                         // ← draw line if dots are close enough
            const alpha = (1 - dist / MAX_DIST) * 0.25;  // ← line opacity based on distance
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      dots.forEach((dot) => {
        dot.pulse += 0.02;
        const alpha = 0.5 + Math.sin(dot.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.color + alpha + ")";
        ctx.fill();

        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > W()) dot.vx *= -1;
        if (dot.y < 0 || dot.y > H()) dot.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}