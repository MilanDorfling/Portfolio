import React from "react";

const Projects = () => (
  <section id="projects" className="relative z-20 w-full min-h-screen px-6 md:px-0 flex flex-col justify-center">
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-accent mb-3">Featured Projects</h2>
      <p className="max-w-2xl text-zinc-200/90">
        This parallax gallery stays in a tilted background state until you reach this section, then it transitions to the full active animation.
      </p>
    </div>
    <div className="mt-8 text-center md:text-left">
      View more of my certification projects from FreeCodeCamp here:{" "}
      <a
        href="https://www.freecodecamp.org/ra1den343"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-300 hover:underline hover:text-purple-400 transition-colors"
      >
        https://www.freecodecamp.org/ra1den343
      </a>
    </div>
  </section>
);

export default Projects;