"use client";

import { useCallback, useRef } from "react";

export function useSound(src, options = {}) {
  const { volume = 0.35, playbackRate = 1, cooldownMs = 0 } = options;
  const lastPlayAtRef = useRef(0);

  const play = useCallback(() => {
    const now = Date.now();
    if (cooldownMs > 0 && now - lastPlayAtRef.current < cooldownMs) return;

    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = volume;
    audio.playbackRate = playbackRate;

    audio.play().catch(() => {
      console.warn("Sound blocked or failed to play:", src);
    });

    lastPlayAtRef.current = now;
  }, [cooldownMs, playbackRate, src, volume]);

  return play;
}
