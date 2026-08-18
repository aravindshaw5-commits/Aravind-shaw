import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Showreel } from './components/Showreel';
import { Experience } from './components/Experience';
import { Award } from './components/Award';
import { Tools } from './components/Tools';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 space-y-24 sm:space-y-32">
        <Hero />

        {/* 01 to 08 Portfolio Categories in Exact Order:
            01 — BRANDING & LOGO DESIGN (Summer, IIT Madras LC Lab, BTSM, Femilux)
            02 — SOCIAL MEDIA REELS (8 vertical 9:16 short-form videos)
            03 — PRODUCT VIDEOS (16:9 commercial showcases)
            04 — 2D ANIMATION (540+ headline, exactly 7 projects)
            05 — 3D DESIGN & ANIMATION
            06 — CHARACTER DESIGN
            07 — GRAPHIC & EDITORIAL DESIGN (MSDS publication)
            08 — AI CREATIVE LAB
        */}
        <Work onSelectProject={handleSelectProject} />

        {/* 09 — SHOWREEL */}
        <Showreel />

        {/* 10 — EXPERIENCE & 11 — EDUCATION */}
        <Experience />

        {/* 12 — AWARD (Usain Bolt Award & Campaign) */}
        <Award />

        {/* 13 — TOOLS & SOFTWARE */}
        <Tools />

        {/* 14 — ABOUT */}
        <About />

        {/* 15 — CONTACT */}
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
