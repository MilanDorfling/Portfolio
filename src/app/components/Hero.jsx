// src/app/components/Hero.jsx
"use client";
import React from 'react';
import ProfileCard from '../UI/ProfileCard';

export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row items-center justify-center min-h-screen text-foreground px-2"
    >
      {/* Left: Text */}
      <div className="flex-1 max-w-2xl text-center md:text-left space-y-14 md:space-y-16 pr-8">
        <h1 className="text-4xl md:text-6xl font-bold">
          Hi, I’m <span>
            Milan Dorfling
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-foreground">
          Self-taught and always curious, I thrive on learning new things fast. I’m passionate about building modern web experiences and love turning ideas into reality.
        </p>
        <a
          href="#projects"
          className="inline-block bg-accent text-accent px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-accent-dark transition-colors"
        >
          View My Work
        </a>
      </div>
      {/* Right: Profile Card */}
      <div className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0 md:ml-12">
        <ProfileCard
          name=""
          title="Junior Frontend Developer"
          profileUrl="https://www.linkedin.com/in/milan-dorfling-93a02a265/"
          handle="milandorfling"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/assets/pictures/portfolio2.jpg"
          showUserInfo
          enableTilt={true}
          enableMobileTilt
          onContactClick={() => console.log('Contact clicked')}
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          iconUrl="assets/pictures/codepattern.jpg"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />
      </div>
    </section>
  );
}