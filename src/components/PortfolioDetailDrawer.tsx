import React, { useEffect, useState } from 'react';
import { X, ArrowLeft, Layers } from 'lucide-react';
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
  characterFrame1Projects,
  characterFrame2Projects,
  characterFrame3Projects,
  animationProjects,
  threeDProjects,
  socialReelProjects,
  productVideos,
  aiCreativeProjects
} from '../lib/data';

export type CategoryKey = '01' | '02' | '03' | '04' | '05' | '06';

interface PortfolioDetailDrawerProps {
  isOpen: boolean;
  categoryKey: CategoryKey | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const PortfolioDetailDrawer: React.FC<PortfolioDetailDrawerProps> = ({
  isOpen,
  categoryKey,
  onClose,
  onSelectProject
}) => {
  const [animSubFilter, setAnimSubFilter] = useState<'all' | '2d' | '3d'>('all');

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !categoryKey) return null;

  // Metadata for the 6 exact categories
  const categoryMeta: Record<CategoryKey, { number: string; title: string; subtitle: string; count: string }> = {
    '01': {
      number: '01',
      title: 'BRANDING & LOGO DESIGN',
      subtitle: 'Brand identity, logo systems, typography & guidelines.',
      count: '4 Featured Case Studies'
    },
    '02': {
      number: '02',
      title: 'CHARACTER DESIGN',
      subtitle: 'Character design concepts, personality & visual development.',
      count: '3 Frames · 12 Slides Total'
    },
    '03': {
      number: '03',
      title: '2D VECTOR & 3D DESIGN & ANIMATION',
      subtitle: '2D vector animation, 3D animation, motion graphics & visual storytelling.',
      count: '9 Featured Works (7 in 2D · 2 in 3D)'
    },
    '04': {
      number: '04',
      title: 'SOCIAL MEDIA REELS',
      subtitle: 'Short-form vertical content for brands, awareness & engagement.',
      count: '4 Vertical Cuts · 9:16 HD'
    },
    '05': {
      number: '05',
      title: 'PRODUCT VIDEOS',
      subtitle: 'Product showcases, explainers, launch films & commercial videos.',
      count: '4 Commercial Productions · 16:9 FHD'
    },
    '06': {
      number: '06',
      title: 'AI CREATIVE LAB',
      subtitle: 'AI-powered experiments, generative visuals, creative pipelines & innovation.',
      count: '2 Neural Experiments · 16:9 FHD'
    }
  };

  const current = categoryMeta[categoryKey];

  return (
    <div
      id="portfolio-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-white flex flex-col animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Full-Screen White Panel */}
      <div
        id="portfolio-slide-panel"
        className="w-full h-full bg-white flex flex-col overflow-hidden"
      >
        {/* STICKY TOP HEADER */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 sm:py-4 shrink-0 shadow-2xs">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            {/* Category Number & Title */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-mono font-extrabold border border-emerald-200">
                {current.number}
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                {current.title}
              </h2>
            </div>

            {/* Back & Close Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Back to Overview</span>
              </button>

              <button
                id="drawer-close-x-btn"
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* SCROLLABLE FULL-SCREEN BODY */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-5 sm:p-8 space-y-6 sm:space-y-8">
            {/* Category Title & Description Banner */}
            <div className="pb-6 border-b border-slate-200">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 font-mono">
                      {current.number}
                    </span>
                    <span>Complete Collection</span>
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

              {/* Sub-tabs for Category 03: 2D Vector & 3D Design & Animation */}
              {categoryKey === '03' && (
                <div className="flex items-center gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => setAnimSubFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      animSubFilter === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Works (9)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnimSubFilter('2d')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      animSubFilter === '2d'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    2D Vector Animation (7)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnimSubFilter('3d')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      animSubFilter === '3d'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    3D Design & CGI (2)
                  </button>
                </div>
              )}
            </div>

            {/* ================================================================= */}
            {/* 01 — BRANDING & LOGO DESIGN (EXISTING PROJECT CARDS)              */}
            {/* ================================================================= */}
            {categoryKey === '01' && (
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

            {/* ================================================================= */}
            {/* 02 — CHARACTER DESIGN (EXISTING CAROUSEL FRAMES)                 */}
            {/* ================================================================= */}
            {categoryKey === '02' && (
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

            {/* ================================================================= */}
            {/* 03 — 2D VECTOR & 3D DESIGN & ANIMATION (COMBINED EXISTING WORKS)  */}
            {/* ================================================================= */}
            {categoryKey === '03' && (
              <div className="space-y-10">
                {/* 2D Vector Animation Section */}
                {(animSubFilter === 'all' || animSubFilter === '2d') && (
                  <div className="space-y-6">
                    {/* 540+ Career Videos Highlight Block */}
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
                          Curated selection of <strong>7 featured 2D animation projects</strong> showcasing vector rigging, isometric systems, and narrative storytelling.
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

                {/* 3D Design & Animation Section */}
                {(animSubFilter === 'all' || animSubFilter === '3d') && (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div>
                      <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                        3D CGI & Motion Graphics
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        3D Design & CAD Visualizations
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">
                        Procedural modeling, product geometry simulations, and spatial CGI visuals.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-2">
                      {threeDProjects.slice(0, 2).map((project, idx) => (
                        <ThreeDVideoCard
                          key={project.id}
                          project={project}
                          indexNumber={`0${idx + 1}`}
                          onSelect={onSelectProject}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================================================================= */}
            {/* 04 — SOCIAL MEDIA REELS (ALL 4 9:16 VERTICAL REELS)               */}
            {/* ================================================================= */}
            {categoryKey === '04' && (
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

            {/* ================================================================= */}
            {/* 05 — PRODUCT VIDEOS (ALL 4 16:9 LANDSCAPE COMMERCIAL VIDEOS)      */}
            {/* ================================================================= */}
            {categoryKey === '05' && (
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

            {/* ================================================================= */}
            {/* 06 — AI CREATIVE LAB (ALL 2 16:9 NEURAL EXPERIMENTS)              */}
            {/* ================================================================= */}
            {categoryKey === '06' && (
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
          </div>
        </main>

        {/* STICKY FOOTER */}
        <footer className="border-t border-slate-200 bg-slate-50/95 backdrop-blur-xs px-4 sm:px-8 py-3.5 sm:py-4 shrink-0 shadow-2xs">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>← Back to Overview</span>
            </button>

            <span className="text-xs font-medium text-slate-500 hidden sm:inline">
              Showing complete collection for {current.title}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
