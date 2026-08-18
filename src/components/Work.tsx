import React from 'react';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';
import {
  brandingProjects,
  socialReelProjects,
  productVideos,
  animationProjects,
  threeDProjects,
  characterProjects,
  graphicEditorialProjects,
  aiCreativeProjects
} from '../lib/data';
import { Sparkles, Layers, Film, Box, PenTool, BookOpen, Cpu, Video, CheckCircle2, ArrowRight } from 'lucide-react';

interface WorkProps {
  onSelectProject: (project: Project) => void;
}

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  return (
    <div id="portfolio-work-root" className="space-y-24 sm:space-y-32">
      
      {/* ========================================================================= */}
      {/* 01 — BRANDING & LOGO DESIGN (MUST BE FIRST CATEGORY AFTER HERO) */}
      {/* ========================================================================= */}
      <section id="branding" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">01</span>
              <span>Visual Identity & Logos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              BRANDING & LOGO DESIGN
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Distilling organizational essence into timeless marks, typography systems, and comprehensive brand guideline architectures.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600">
            4 Featured Case Studies
          </div>
        </div>

        {/* 4 Required Branding Projects in precise order:
            1. SAMAM.ai
            2. IIT MADRAS — LC LAB
            3. BEYOND THE SPELLING MISTAKE
            4. FEMILUX
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {brandingProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              aspect="portrait"
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — SOCIAL MEDIA REELS (Short-form 9:16 vertical video grid - 8 items) */}
      {/* ========================================================================= */}
      <section id="reels" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">02</span>
              <span>Vertical 9:16 Video Content</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              SOCIAL MEDIA REELS
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              High-impact, short-form vertical videos engineered for rapid engagement, viral hooks, and high-retention social media distribution.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>8 Selected Viral Cuts</span>
          </div>
        </div>

        {/* 8 Short-form Reels in 9:16 vertical grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {socialReelProjects.map((reel) => (
            <ProjectCard
              key={reel.id}
              project={reel}
              onSelect={onSelectProject}
              aspect="vertical"
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — PRODUCT VIDEOS (16:9 High-End Commercials) */}
      {/* ========================================================================= */}
      <section id="products" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">03</span>
              <span>16:9 Commercial Showcases</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              PRODUCT VIDEOS
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Photorealistic hardware showcases, dynamic feature walk-throughs, and cinematic commercial launch films.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600">
            4 Commercial Productions
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {productVideos.map((prod) => (
            <ProjectCard
              key={prod.id}
              project={prod}
              onSelect={onSelectProject}
              aspect="video"
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — 2D ANIMATION (EXACTLY 7 PROJECTS — NO 8TH PLACEHOLDER) */}
      {/* ========================================================================= */}
      <section id="animation" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with 540+ Headline */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">04</span>
                <span>2D Vector & Character Animation</span>
              </div>
              
              {/* Highlighted 540+ Statistic Headline */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  540+
                </span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-800 tracking-tight">
                  Animation Videos Created
                </span>
              </div>

              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                The 540+ statistic represents my overall commercial and creative animation production career. Below is a curated selection of <strong>7 featured animation projects</strong> showcasing vector rigging, isometric systems, and narrative storytelling.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl font-bold text-slate-900">7</div>
                <div className="text-[11px] text-slate-500 font-semibold uppercase">Selected Works</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl font-bold text-emerald-600">100%</div>
                <div className="text-[11px] text-slate-500 font-semibold uppercase">Custom Rigs</div>
              </div>
            </div>
          </div>
        </div>

        {/* EXACTLY 7 Projects Layout:
            1 Featured Wide Project + 6 Projects in a 3-column Grid
            Total: exactly 7 projects (Animation 01 to Animation 07). NO 8th project.
        */}
        <div className="space-y-6 sm:space-y-8">
          {/* Featured Animation 01 */}
          <div>
            <ProjectCard
              project={animationProjects[0]}
              onSelect={onSelectProject}
              aspect="wide"
            />
          </div>

          {/* Animations 02 through 07 (6 items in balanced 3-column grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {animationProjects.slice(1, 7).map((anim) => (
              <ProjectCard
                key={anim.id}
                project={anim}
                onSelect={onSelectProject}
                aspect="video"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — 3D DESIGN & ANIMATION */}
      {/* ========================================================================= */}
      <section id="threed" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">05</span>
              <span>Octane • Blender • Cinema 4D</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              3D DESIGN & ANIMATION
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Procedural modeling, architectural geometry node simulations, industrial design CAD visuals, and spatial computing UI concepts.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600">
            4 CGI Case Studies
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {threeDProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              aspect={idx % 2 === 0 ? 'square' : 'wide'}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — CHARACTER DESIGN */}
      {/* ========================================================================= */}
      <section id="character" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">06</span>
              <span>Turnarounds & Mascot Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              CHARACTER DESIGN
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Memorable character personalities, model turnaround sheets, facial expression matrices, and rigging-ready vector illustrations.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600">
            3 Mascot Systems
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {characterProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              aspect="square"
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — GRAPHIC & EDITORIAL DESIGN */}
      {/* ========================================================================= */}
      <section id="editorial" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">07</span>
              <span>Editorial & Print Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              GRAPHIC & EDITORIAL DESIGN
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Swiss-grid editorial architecture, 240-page research publications, limited edition monographs, and sustainable packaging dielines.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600">
            Featuring MSDS Publication
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Main MSDS Feature */}
          <div className="md:col-span-7">
            <ProjectCard
              project={graphicEditorialProjects[0]}
              onSelect={onSelectProject}
              aspect="wide"
            />
          </div>
          {/* Other 2 projects */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            {graphicEditorialProjects.slice(1).map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onSelect={onSelectProject}
                aspect="wide"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 — AI CREATIVE LAB */}
      {/* ========================================================================= */}
      <section id="ailab" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">08</span>
              <span>Generative Workflows</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              AI CREATIVE LAB
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Professional, AI-assisted creative engineering: audio-reactive neural shaders, haute-couture generative lookbooks, and rapid pre-visualization pipelines.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Light • Professional • AI-Assisted
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {aiCreativeProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              aspect="square"
            />
          ))}
        </div>
      </section>

    </div>
  );
};
