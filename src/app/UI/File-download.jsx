"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { FiDownload } from "react-icons/fi";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  fileUrl = "/assets/cv/CV.pdf",
  fileName = "Milan-Dorfling-CV.pdf",
  onMouseEnter,
  onFocus,
}) => {
  const handleClick = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div
        className="group/file relative block w-full overflow-hidden rounded-lg p-10">
        <div className="flex flex-col items-center justify-center">
          <p
            className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
            Download my CV
          </p>
          <p
            className="relative z-20 mt-2 font-sans text-sm font-normal text-neutral-500 dark:text-neutral-400">
            Click to download instantly
          </p>
          <div className="relative mx-auto mt-5 w-full max-w-xl">
            <motion.div
              whileHover="animate"
              onMouseEnter={onMouseEnter}
              onFocus={onFocus}
              onClick={handleClick}
              className="relative mx-auto mt-4 h-32 w-full max-w-32 cursor-pointer">
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "absolute inset-0 z-40 flex items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}>
                <FiDownload className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              </motion.div>

              <motion.div
                variants={secondaryVariant}
                className="absolute inset-0 z-30 rounded-md border border-dashed border-sky-400 bg-transparent opacity-0" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};


