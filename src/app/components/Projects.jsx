"use client";

import React from "react";
import dynamic from "next/dynamic";

const HeroParallax = dynamic(
  () => import("../UI/hero-parallax").then((mod) => mod.HeroParallax),
  { ssr: false }
);


const parallaxProducts = [
  {
    title: "Responsive Web design Certificate",
    description: "Responsive web design",
    thumbnail: "/assets/pictures/Responsive Web design.png",
  },
  {
    title: "JavaScript Algorithms and Data Structures Certificate",
    description: "JavaScript Algorithms and Data Structures",
    thumbnail: "/assets/pictures/JS & Algorithms.png",
  },
  {
    title: "VSL Manufacturing",
    link: "https://vslman.co.za/",
    target: "_blank",
    thumbnail: "/assets/pictures/VSL.png",
  },
  {
    title: "React Certificate",
    description: "React",
    thumbnail: "/assets/pictures/Front End Libraries.png",
  },
  {
    title: "Python Certificate",
    description: "Python",
    thumbnail: "/assets/pictures/Python Algebra.png",
  },
  {
    title: "Data Visualization Certificate",
    description: "Data Visualization",
    thumbnail: "/assets/pictures/Data Visulisation.png",
  },
  {
    title: "Backend Development Certificate",
    description: "Backend Development",
    thumbnail: "/assets/pictures/Back End & API's.png",
  },
  {
    title: "Prospera",
    link: "https://www.prospera.co.za/",
    target: "_blank",
    thumbnail: "/assets/pictures/Prospera2.jpg",
  },
  {
    title: "Data Analytics Certificate",
    description: "Data Analytics",
    thumbnail: "/assets/pictures/Data analises.png",
  },
  {
    title: "Information Security Certificate",
    description: "Information Security",
    thumbnail: "/assets/pictures/Information.png",
  },
  {
    title: "Foundational C# Certificate",
    description: "Foundational C#",
    thumbnail: "/assets/pictures/foundational C#.png",
  },
  {
    title: "Quality Assurance Certificate",
    description: "Quality Assurance",
    thumbnail: "/assets/pictures/Quality Assurance.png",
  },
  {
    title: "Scientific Computing Certificate",
    description: "Scientific Computing",
    thumbnail: "/assets/pictures/Computing Python.png",
  },
  {
    title: "Information Security Certificate",
    description: "Information Security",
    thumbnail: "/assets/pictures/Information.png",
  },
  {
    title: "Just JavaScript Certificate",
    description: "Just JavaScript",
    thumbnail: "/assets/pictures/Just JavaScript.png",
  }
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="max-w-3xl mx-auto min-h-screen px-6 md:px-0 flex flex-col justify-center"
    >
      <div className="max-w-7xl relative mx-auto py-20 md:py-20 px-4 w-full left-0 top-0">
        <h2 className="text-2xl md:text-7xl font-bold dark:text-white">
          My development projects <br />& certifications
        </h2>
        <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
          Here are some of the projects I&apos;ve worked on and certifications I&apos;ve earned. Each project reflects my passion for web development and my commitment to continuous learning.
        </p>
      </div>

      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <HeroParallax
          products={parallaxProducts}
          containerClassName="h-[200vh] pt-10"
          spacerClassName="h-0"
        />
      </div>
    </section>
  );
};

export default Projects;