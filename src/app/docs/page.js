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
      {/* Sidebar */}
      <StackGrid
        selectedSkill={selectedSkill}
        onSelectSkill={handleSelectSkill}
        className="hidden md:block w-56 fixed left-0 top-0 h-full z-10"
      />

      {/* Main content — offset by sidebar width, scrolls independently */}
      <main
        ref={mainRef}
        className="flex-1 ml-56 min-h-screen overflow-y-auto z-10"
      >
        <div className="max-w-3xl mx-auto px-8 py-16 lg:py-20">
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
