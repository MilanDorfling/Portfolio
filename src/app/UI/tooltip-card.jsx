"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Tooltip({ content, children, containerClassName }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      const nextWidth = contentRef.current.scrollWidth;
      const nextHeight = contentRef.current.scrollHeight;
      setHeight(nextHeight);
      setTooltipSize({ width: nextWidth, height: nextHeight });
      setPosition(calculatePosition(mouse.x, mouse.y, nextWidth, nextHeight));
    }
  }, [content, isVisible, mouse.x, mouse.y]);

  const calculatePosition = (mouseX, mouseY, measuredWidth, measuredHeight) => {
    if (!contentRef.current || !containerRef.current) {
      return { x: mouseX + 12, y: mouseY + 12 };
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const tooltipWidth = measuredWidth || tooltipSize.width || contentRef.current.scrollWidth;
    const tooltipHeight = measuredHeight || tooltipSize.height || contentRef.current.scrollHeight;

    const absoluteX = containerRect.left + mouseX;
    const absoluteY = containerRect.top + mouseY;

    let finalX = mouseX + 12;
    let finalY = mouseY + 12;

    if (absoluteX + 12 + tooltipWidth > viewportWidth) {
      finalX = mouseX - tooltipWidth - 12;
    }

    if (absoluteX + finalX < 0) {
      finalX = -containerRect.left + 12;
    }

    if (absoluteY + 12 + tooltipHeight > viewportHeight) {
      finalY = mouseY - tooltipHeight - 12;
    }

    if (absoluteY + finalY < 0) {
      finalY = -containerRect.top + 12;
    }

    return { x: finalX, y: finalY };
  };

  const updateMousePosition = (mouseX, mouseY) => {
    setMouse({ x: mouseX, y: mouseY });
    setPosition(calculatePosition(mouseX, mouseY));
  };

  const handleMouseEnter = e => {
    setIsVisible(true);
    const rect = e.currentTarget.getBoundingClientRect();
    updateMousePosition(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setIsVisible(false);
  };

  const handleMouseMove = e => {
    if (!isVisible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateMousePosition(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchStart = e => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    updateMousePosition(touch.clientX - rect.left, touch.clientY - rect.top);
    setIsVisible(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsVisible(false);
      setMouse({ x: 0, y: 0 });
      setPosition({ x: 0, y: 0 });
    }, 2000);
  };

  const handleClick = e => {
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
        setMouse({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        updateMousePosition(e.clientX - rect.left, e.clientY - rect.top);
        setIsVisible(true);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="tooltip"
            initial={{ height: 0, opacity: 1 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="pointer-events-none absolute z-50 w-max max-w-xs overflow-hidden rounded-md border border-transparent bg-white shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-900 dark:shadow-white/10 dark:ring-white/5"
            style={{ top: position.y, left: position.x }}
          >
            <div ref={contentRef} className="p-1 text-sm text-neutral-600 md:p-2 dark:text-neutral-400">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
