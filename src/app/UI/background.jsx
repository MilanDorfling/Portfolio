import { cn } from "@/lib/utils";
import React from "react";
 
export function DotBackgroundDemo() {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div className={cn("absolute inset-0", "bg-size-[20px_20px]", "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]", "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",)}/>
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  );
}

