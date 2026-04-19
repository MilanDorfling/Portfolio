"use client";

import { FaHtml5, FaCss3, FaNodeJs, FaReact } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiPython } from "react-icons/si";

export const STACK_ICONS = [
  {
    icon: <FaHtml5 size={18} />,
    name: "HTML5",
    color: "#E44D26",
    proficiency: "Daily use",
    proficiencyLevel: "primary",
  },
  {
    icon: <FaCss3 size={18} />,
    name: "CSS3",
    color: "#1572B6",
    proficiency: "Daily use",
    proficiencyLevel: "primary",
  },
  {
    icon: <SiJavascript size={18} />,
    name: "JavaScript",
    color: "#F7DF1E",
    proficiency: "Primary stack",
    proficiencyLevel: "primary",
  },
  {
    icon: <FaReact size={18} />,
    name: "React",
    color: "#61DAFB",
    proficiency: "Primary stack",
    proficiencyLevel: "primary",
  },
  {
    icon: <SiNextdotjs size={18} />,
    name: "Next.js",
    color: "#ffffff",
    proficiency: "Primary stack",
    proficiencyLevel: "primary",
  },
  {
    icon: <SiTailwindcss size={18} />,
    name: "Tailwind CSS",
    color: "#38BDF8",
    proficiency: "Daily use",
    proficiencyLevel: "primary",
  },
  {
    icon: <FaNodeJs size={18} />,
    name: "Node.js",
    color: "#6CC248",
    proficiency: "Comfortable",
    proficiencyLevel: "comfortable",
  },
  {
    icon: <SiPython size={18} />,
    name: "Python",
    color: "#FFD43B",
    proficiency: "Comfortable",
    proficiencyLevel: "comfortable",
  },
];

const proficiencyDotColor = {
  primary: "bg-emerald-400",
  comfortable: "bg-yellow-400",
  learning: "bg-blue-400",
};

export default function StackGrid({ selectedSkill, onSelectSkill }) {
  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-[#020202] border-r border-white/8 flex flex-col pt-18 pb-8 shadow-xl z-30 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h2 className="text-[10px] font-semibold text-white/30 tracking-[0.22em] uppercase">
          Tech Stack
        </h2>
        {/* Proficiency legend */}
        <div className="mt-3 space-y-1.5">
          {[
            { dot: "bg-emerald-400", label: "Daily / Primary" },
            { dot: "bg-yellow-400", label: "Comfortable" },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${dot} opacity-70`} />
              <span className="text-[10px] text-white/25">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-white/6 mb-2" />

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 w-full px-2">
        {STACK_ICONS.map(({ icon, name, color, proficiency, proficiencyLevel }) => {
          const selected = selectedSkill === name;
          return (
            <button
              key={name}
              className={`flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-md transition-all duration-200 group relative overflow-hidden ${
                selected
                  ? "bg-white/8 text-white"
                  : "hover:bg-white/4 text-white/55 hover:text-white/90"
              }`}
              onClick={() => onSelectSkill(name)}
            >
              {/* Active indicator bar */}
              {selected && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}

              {/* Icon */}
              <span
                className="transition-colors duration-200 shrink-0"
                style={{ color: selected ? color : "inherit" }}
              >
                {icon}
              </span>

              {/* Label + proficiency */}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium tracking-wide block truncate">{name}</span>
                {selected && (
                  <span className="text-[10px] text-white/35 flex items-center gap-1 mt-0.5">
                    <span
                      className={`w-1 h-1 rounded-full ${proficiencyDotColor[proficiencyLevel]}`}
                    />
                    {proficiency}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}