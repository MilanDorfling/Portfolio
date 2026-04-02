// src/app/components/About.jsx
import React from "react";

export default function About() {
  return (
    <section 
      id="about" 
      className="max-w-3xl mx-auto min-h-screen px-6 md:px-0 flex flex-col justify-center"
    >
      {/* Personal Info Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-accent">About Me</h2>
        <div className="flex flex-col items-end">
          <div className="text-3xl font-bold text-foreground">Milan Dorfling</div>
          <div className="text-accent font-semibold text-xl">Frontend Developer</div>
        </div>
      </div>

      {/* Short Intro */}
      <div className="mb-8 text-lg text-foreground/90 leading-relaxed">
        Based in South Africa. Self-taught in web development through hands-on projects and continuous learning.
      </div>

      {/* Learning & Skills Development */}
      <div className="mb-8 text-lg text-foreground/90 leading-relaxed">
        I completed all legacy <span className="hover:text-yellow-500 font-semibold"><a href='https://www.freecodecamp.org/ra1den343' target="_blank" rel="noopener noreferrer">freeCodeCamp</a></span> courses, covering HTML, CSS, JavaScript, responsive design, and full stack fundamentals. 
        <br />
        <br />
        I am currently taking <span className="hover:text-purple-500 font-semibold"><a href='https://www.joshwcomeau.com/' target="_blank" rel="noopener noreferrer">Joy of React</a></span> by Josh W. Comeau, which focuses on advanced React concepts and best practices. My learning is project-driven and I regularly apply new concepts to real work.
      </div>

      {/* Education */}
      <div className="mb-8 text-lg text-foreground/90 leading-relaxed">
        I completed my IGCSE at British International College, South Africa, with a focus on Mathematics, Physics, Chemistry, Computer Science, Business Studies, and English.
      </div>

      {/* Skills */}
      <div className="mb-8">
        <span className="font-semibold text-foreground">Skills:</span>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <span className="font-semibold text-red-400 px-2">HTML</span>,
            <span className="font-semibold text-blue-500 px-2">CSS</span>,
            <span className="font-semibold text-yellow-500 px-2">JavaScript</span>,
            <span className="font-semibold text-cyan-500 px-2">React</span>,
            <span className="font-semibold text-zinc-100 px-2">Next.js</span>,
            <span className="font-semibold text-green-500 px-2">Node.js</span>,
            <span className="font-semibold text-blue-300 px-2">Python</span>,
            <span className="font-semibold text-purple-500 px-2">C#</span>
          </li>
        </ul>
      </div>
      {/* Goals */}
      <div className="mb-8 text-lg text-foreground/90 leading-relaxed">
        My current goal is to gain experience in the tech industry as a frontend developer. I am open to work, eager to learn from experienced developers and mentors, and focused on expanding my skill set.
      </div>
    </section>
  );
}