import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Showreel } from './components/Showreel';
import { Award } from './components/Award';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Tools } from './components/Tools';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { IntroTransition } from './components/IntroTransition';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 6-Second Intro Animation State (ONLY on initial page load / refresh)
  const [isIntroActive, setIsIntroActive] = useState<boolean>(true);

  // Handle Initial Landing on Website (Direct / Google / External Link)
  const handleIntroComplete = useCallback(() => {
    setIsIntroActive(false);

    // If visitor opened a direct hash link (e.g. website.com/#about), smoothly scroll there
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      const element = document.getElementById(initialHash);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, []);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* 6-SECOND INTRO ANIMATION (PLAYS ONLY ON INITIAL LOAD / REFRESH) */}
      <IntroTransition
        isActive={isIntroActive}
        onComplete={handleIntroComplete}
      />

      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="flex-1 space-y-24 sm:space-y-32">
        <Hero />

        {/* 01-07 — Portfolio Disciplines & Work */}
        <Work onSelectProject={handleSelectProject} />

        {/* 08 — SHOWREEL */}
        <Showreel />

        {/* 09 — USAIN BOLT CAMPAIGN & AWARD */}
        <Award />

        {/* 10 — EXPERIENCE */}
        <Experience />

        {/* 11 — EDUCATION */}
        <Education />

        {/* 12 — TOOLS & SOFTWARE */}
        <Tools />

        {/* 13 — ABOUT */}
        <About />

        {/* 14 — CONTACT */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </div>
  );
}
