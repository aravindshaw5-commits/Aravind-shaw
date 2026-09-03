import React, { useEffect } from 'react';
import { ArrowLeft, X, Sparkles, Film, Palette, Users, Box, Video, Bot, Layers } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ReelCard } from './ReelCard';
import { ProductVideoCard } from './ProductVideoCard';
import { AnimationVideoCard } from './AnimationVideoCard';
import { ThreeDVideoCard } from './ThreeDVideoCard';
import { CharacterCarouselCard } from './CharacterCarouselCard';
import { AICreativeCard } from './AICreativeCard';
import { Project } from '../types';
import {
  brandingProjects,
  socialReelProjects,
  productVideos,
  animationProjects,
  threeDProjects,
  characterFrame1Projects,
  characterFrame2Projects,
  characterFrame3Projects,
  aiCreativeProjects
} from '../lib/data';

export type PortfolioSectionId =
  | 'branding'
  | 'character'
  | 'animation'
  | 'threed'
  | 'reels'
  | 'products'
  | 'ailab';

interface SectionDetailViewProps {
  sectionId: PortfolioSectionId;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

export const SectionDetailView: React.FC<SectionDetailViewProps> = ({
  sectionId,
  onBack,
  onSelectProject
}) => {
  // Lock body scroll and attach ESC key listener when modal overlay is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBack]);

  // Section titles and metadata helper
  const sectionMeta: Record<PortfolioSectionId, { number: string; title: string; subtitle: string; count: string }> = {
    branding: {
      number: '01',
      title: 'BRANDING & LOGO DESIGN',
      subtitle: 'Distilling organizational essence into timeless marks, typography systems, and comprehensive brand guideline architectures.',
      count: 'All 4 Featured Case Studies'
    },
    character: {
      number: '02',
      title: 'CHARACTER DESIGN & ANIMATION',
      subtitle: 'Memorable character personalities, model turnaround sheets, facial expression matrices, and rigging-ready vector illustrations.',
      count: 'All 3 Frames · 12 Slides Total'
    },
    animation: {
      number: '03',
      title: '2D VECTOR & CHARACTER ANIMATION',
      subtitle: 'Curated animation projects showcasing vector animation, character design, rigging, and narrative storytelling.',
      count: 'All 7 Featured Works (540+ Career Videos)'
    },
    threed: {
      number: '04',
      title: '3D DESIGN & ANIMATION',
      subtitle: 'Procedural modeling, architectural geometry node simulations, industrial design CAD visuals, and spatial computing UI concepts.',
      count: 'All 3D Video Case Studies'
    },
    reels: {
      number: '05',
      title: 'SOCIAL MEDIA REELS',
      subtitle: 'High-impact, short-form vertical videos engineered for rapid engagement, viral hooks, and high-retention social media distribution.',
      count: 'All 4 Selected Viral Cuts'
    },
    products: {
      number: '06',
      title: 'PRODUCT VIDEOS',
      subtitle: 'Photorealistic hardware showcases, dynamic feature walk-throughs, and cinematic commercial launch films.',
      count: 'All 4 Commercial Productions'
    },
    ailab: {
      number: '06',
      title: 'AI VIDEO EDITING',
      subtitle: 'AI-assisted creative motion sequences: audio-reactive neural soundscapes, fluid dynamics, and generative video workflows.',
      count: 'Both 2 AI Edited Videos'
    }
  };

  const current = sectionMeta[sectionId];

  return (
    <div
      id="category-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto animate-fadeIn"
      onClick={onBack}
    >
      {/* MODAL DIALOG CONTAINER (Click propagation stopped so clicking modal doesn't close) */}
      <div
        className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* STICKY TOP HEADER */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-5 sm:px-8 py-4 shadow-2xs flex items-center justify-between gap-4">
          
          {/* Back Button */}
          <button
            id="overlay-back-btn"
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700 group-hover:-translate-x-0.5 transition-transform" />
            <span>← Back to Portfolio</span>
          </button>

          {/* Current Category Badge */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
              {current.number}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight hidden md:inline-block">
              {current.title}
            </span>
          </div>

          {/* Close ✕ Button */}
          <button
            id="overlay-close-btn"
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Category Archive"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* MODAL SCROLLABLE BODY */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Category Header */}
          <div className="pb-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">{current.number}</span>
                  <span>Complete Category Collection</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {current.title}
                </h1>
                <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                  {current.subtitle}
                </p>
              </div>
              <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 shrink-0 self-start md:self-auto">
                {current.count}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 01 — BRANDING & LOGO DESIGN (ALL 4 PROJECTS) */}
          {/* ========================================================================= */}
          {sectionId === 'branding' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {brandingProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  projectNumber={`0${index + 1}`}
                  onSelect={onSelectProject}
                  aspect="portrait"
                />
              ))}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 02 — CHARACTER DESIGN & ANIMATION (ALL 3 FRAMES · 12 SLIDES) */}
          {/* ========================================================================= */}
          {sectionId === 'character' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <CharacterCarouselCard
                frameNumber="FRAME 01"
                frameTitle="Mascot Systems & Turnaround Rigs"
                frameSubtitle="Orthographic turnarounds, robotic companions & expression matrices"
                slides={characterFrame1Projects}
                onSelectProject={onSelectProject}
              />

              <CharacterCarouselCard
                frameNumber="FRAME 02"
                frameTitle="Action Heroes & Sci-Fi Silhouettes"
                frameSubtitle="Episodic protagonists, cybernetic armor concepts & vector puppets"
                slides={characterFrame2Projects}
                onSelectProject={onSelectProject}
              />

              <CharacterCarouselCard
                frameNumber="FRAME 03"
                frameTitle="KidLit Characters & Game Sprites"
                frameSubtitle="Children’s book casts, 2D Spine rigs & organic forest sprites"
                slides={characterFrame3Projects}
                onSelectProject={onSelectProject}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* 03 — 2D VECTOR & CHARACTER ANIMATION (ALL 7 PROJECTS) */}
          {/* ========================================================================= */}
          {sectionId === 'animation' && (
            <div className="space-y-8">
              {/* 540+ Achievement Highlight Block */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <div className="shrink-0 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      540+
                    </span>
                    <span className="text-sm font-bold text-emerald-800 tracking-tight">
                      Animation Videos Created
                    </span>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-slate-200" />
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                    Curated selection of <strong>7 featured animation projects</strong> showcasing vector rigging, isometric systems, and narrative storytelling.
                  </p>
                </div>
              </div>

              {/* 7 Projects: 1 Featured Wide + 6 Grid Items */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <AnimationVideoCard
                    project={animationProjects[0]}
                    animNumber="01"
                    onSelect={onSelectProject}
                    featured={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {animationProjects.slice(1, 7).map((anim, index) => (
                    <AnimationVideoCard
                      key={anim.id}
                      project={anim}
                      animNumber={`0${index + 2}`}
                      onSelect={onSelectProject}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 04 — 3D DESIGN & ANIMATION (ALL 3D PROJECTS) */}
          {/* ========================================================================= */}
          {sectionId === 'threed' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {threeDProjects.slice(0, 2).map((project, idx) => (
                <ThreeDVideoCard
                  key={project.id}
                  project={project}
                  indexNumber={`0${idx + 1}`}
                  onSelect={onSelectProject}
                />
              ))}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 05 — SOCIAL MEDIA REELS (ALL 4 REELS) */}
          {/* ========================================================================= */}
          {sectionId === 'reels' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {socialReelProjects.slice(0, 4).map((reel, index) => (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  reelNumber={`0${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 06 — PRODUCT VIDEOS (ALL 4 VIDEOS) */}
          {/* ========================================================================= */}
          {sectionId === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {productVideos.map((prod, index) => (
                <ProductVideoCard
                  key={prod.id}
                  project={prod}
                  productNumber={`0${index + 1}`}
                  onSelect={onSelectProject}
                />
              ))}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 07 — AI-GENERATED VIDEOS (EXACTLY 2 VIDEOS) */}
          {/* ========================================================================= */}
          {sectionId === 'ailab' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
              <AICreativeCard
                project={aiCreativeProjects[0]}
                itemNumber="01"
                itemType="video"
                onSelect={onSelectProject}
              />

              <AICreativeCard
                project={aiCreativeProjects[1]}
                itemNumber="02"
                itemType="video"
                onSelect={onSelectProject}
              />
            </div>
          )}
        </main>

        {/* MODAL FOOTER */}
        <footer className="border-t border-slate-200 bg-slate-50/90 px-5 sm:px-8 py-4 flex items-center justify-between">
          <button
            id="overlay-back-bottom-btn"
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>← Back to Portfolio</span>
          </button>

          <span className="text-xs font-medium text-slate-500">
            Showing complete collection for {current.title}
          </span>
        </footer>
      </div>
    </div>
  );
};
