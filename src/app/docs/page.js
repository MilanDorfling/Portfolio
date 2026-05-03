"use client";

import { useRef, useState } from "react";
import StackGrid, { STACK_ICONS } from "./components/stackGrid";
import SkillDoc from "./components/skilldoc";
import ShowcaseBackground from "../components/svg/Showcasebackground";

export default function DocsPage() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const mainRef = useRef(null);

  const handleSelectSkill = (name) => {
    setSelectedSkill(name);
    // Scroll to top of content area when switching skills
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex">
      <ShowcaseBackground className="z-0" />

      {/* Desktop sidebar */}
      <StackGrid
        selectedSkill={selectedSkill}
        onSelectSkill={handleSelectSkill}
      />

      {/* Main content — offset by sidebar width on md+, scrolls independently */}
      <main
        ref={mainRef}
        className="flex-1 md:ml-56 min-h-screen overflow-y-auto z-10"
      >
        {/* Mobile skill picker — horizontal scrollable pill bar */}
        <div className="md:hidden sticky top-[4.5rem] z-20 bg-[#020202] border-b border-white/8 px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {STACK_ICONS.map(({ name, icon, color }) => {
              const active = selectedSkill === name;
              return (
                <button
                  key={name}
                  onClick={() => handleSelectSkill(name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                    active
                      ? "bg-white/8 border-white/15 text-white"
                      : "border-transparent text-white/45 hover:text-white/80 hover:bg-white/4"
                  }`}
                  style={active ? { color } : {}}
                >
                  <span style={active ? { color } : { color: "rgba(255,255,255,0.4)" }}>
                    {icon}
                  </span>
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <SkillDoc
            skill={selectedSkill}
            allSkills={STACK_ICONS}
            onSelectSkill={handleSelectSkill}
          />
        </div>
      </main>
    </div>
  );
}
