import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Film
} from 'lucide-react';
import { Project } from '../types';
import {
  brandingProjects,
  animationProjects,
  threeDProjects,
  socialReelProjects,
  productVideos,
  aiCreativeProjects
} from '../lib/data';
import { PortfolioDetailDrawer, CategoryKey } from './PortfolioDetailDrawer';

interface WorkProps {
  onSelectProject?: (project: Project) => void;
}

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  // Drawer state: which category is currently open
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryKey | null>(null);

  // Active indices for interactive previews on cards
  const [activeProductIndex] = useState<number>(0);
  const [activeAiIndex] = useState<number>(0);

  // Video playback tracking for cards
  const [playingCardVideoId, setPlayingCardVideoId] = useState<string | null>(null);

  // Open drawer for a given category
  const handleOpenCategory = (key: CategoryKey) => {
    setActiveCategoryKey(key);
    setDrawerOpen(true);
  };

  // Close drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Featured reel for Card 04 (Reel 01 — First reel shown on front overview card)
  const currentReel = socialReelProjects[0];
  const currentProduct = productVideos[activeProductIndex] || productVideos[0];
  const currentAi = aiCreativeProjects[activeAiIndex] || aiCreativeProjects[0];

  // Combined 2D and 3D preview list for Card 03 (4 featured items)
  const combinedAnimPreviews: Project[] = [
    animationProjects[0], // Fintech 2D
    animationProjects[1], // HealthTech 2D
    threeDProjects[0],    // Chrono Timepiece 3D
    threeDProjects[1]     // Neural City 3D
  ];

  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Portfolio Section Header */}
      <div className="mb-10 sm:mb-12 pb-5 border-b border-slate-200/90">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 font-mono">
            PORTFOLIO
          </span>
          <span>Selected Disciplines & Archive</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              SELECTED DISCIPLINES
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              An editorial showcase across brand design, character systems, 2D vector & 3D animation, social media reels, commercial product films, and generative AI workflows.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-600 shrink-0">
            6 Specialized Disciplines · 30+ Works
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN EDITORIAL CATEGORY GRID                                              */}
      {/* ========================================================================= */}
      <div className="space-y-6 sm:space-y-8">
        
        {/* ROW 1: 01 BRANDING & LOGO DESIGN + 02 CHARACTER DESIGN (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* --------------------------------------------------------------------- */}
          {/* CATEGORY 01 — BRANDING & LOGO DESIGN                                  */}
          {/* --------------------------------------------------------------------- */}
          <article
            id="card-category-01"
            className="group/card bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              {/* Category Number & Title */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-extrabold text-emerald-800 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                  01
                </span>
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  4 Case Studies
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover/card:text-emerald-950 transition-colors">
                BRANDING & LOGO DESIGN
              </h3>
              
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Brand identity, logo systems, typography & guidelines.
              </p>

              {/* Curated 2-Project Preview for Category 01 (Balanced Sizing & Spacing) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {brandingProjects.slice(0, 2).map((brand, idx) => (
                  <div
                    key={brand.id}
                    onClick={() => handleOpenCategory('01')}
                    className="group/item flex flex-col bg-slate-50 hover:bg-emerald-50/50 rounded-2xl border border-slate-200/80 hover:border-emerald-300 p-3.5 transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <div className="w-full aspect-[4/3] rounded-xl bg-white overflow-hidden flex items-center justify-center p-3 border border-slate-100 mb-3 shadow-2xs">
                      <img
                        src={brand.image}
                        alt={brand.title}
                        className="w-full h-full object-contain group-hover/item:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                        Case 0{idx + 1}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium truncate">
                        {brand.tags?.[0] || 'Brand Identity'}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 truncate">
                      {brand.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                      {brand.subtitle || brand.description}
                    </p>
                  </div>
                ))}
              </div>
              {/* Informative Brand Identity Overview (Fills empty vertical space) */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Complete Visual Identity & Brand Architecture
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/60 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                    Featured Systems
                  </span>
                </div>
                
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Crafting purposeful brand identities, custom logo marks, typography systems, and comprehensive style guides. From leading academic labs like <strong className="text-slate-800 font-semibold">IIT Madras (Language & Cognition Lab)</strong> and AI-driven platforms like <strong className="text-slate-800 font-semibold">SAMAM.ai</strong> to lifestyle brands and creative ventures, I design cohesive visual identities built for impact.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Logo Architecture', 'Design Systems', 'Typography Guidelines', 'Brand Collaterals', 'Visual Identity'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-slate-600 bg-white border border-slate-200/70 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom-Right "More →" Action */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                Explore all 4 branding case studies
              </span>
              <button
                type="button"
                onClick={() => handleOpenCategory('01')}
                className="group/btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-emerald-50"
              >
                <span>More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>

          {/* --------------------------------------------------------------------- */}
          {/* CATEGORY 02 — CHARACTER DESIGN                                        */}
          {/* --------------------------------------------------------------------- */}
          <article
            id="card-category-02"
            className="group/card bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              {/* Category Number & Title */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-extrabold text-emerald-800 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                  02
                </span>
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  3 Frames · 12 Concepts
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover/card:text-emerald-950 transition-colors">
                CHARACTER DESIGN
              </h3>
              
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Character design concepts, personality & visual development.
              </p>

              {/* ONE STATIC THUMBNAIL (No carousel, no arrows, no slide counter, aspect ratio preserved) */}
              <div
                onClick={() => handleOpenCategory('02')}
                className="mt-6 relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 aspect-[4/3] flex items-center justify-center group/char cursor-pointer shadow-2xs"
              >
                <img
                  src="/images/character/char-nova.jpg"
                  alt="Character Design Showcase"
                  className="w-full h-full object-contain object-center group-hover/char:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

                {/* Character Title Overlay */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                      Visual Development & Concept Art
                    </span>
                    <p className="text-sm font-extrabold text-white truncate drop-shadow-sm">
                      Original Character Concept
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/90 text-slate-950 shadow-xs">
                    Featured
                  </span>
                </div>
              </div>

              {/* Character Design Overview Note (2 lines filling vertical space) */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    34+ Original Characters Developed
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/60 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                    Concepts & Rigs
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  I have designed and visual-developed 34+ original characters across animation, digital storytelling, and brand mascots. Featured here is a curated selection showcasing distinct silhouette, style, and expressive personality.
                </p>
              </div>
            </div>

            {/* Bottom "More →" Action */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                Explore all 12 character concept frames
              </span>
              <button
                type="button"
                onClick={() => handleOpenCategory('02')}
                className="group/btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-emerald-50"
              >
                <span>More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>

        </div>

        {/* ========================================================================= */}
        {/* ROW 2: 03 2D VECTOR & 3D DESIGN & ANIMATION (Full-Width Card)             */}
        {/* ========================================================================= */}
        <article
          id="card-category-03"
          className="group/card bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 sm:p-8"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-extrabold text-emerald-800 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                03
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover/card:text-emerald-950 transition-colors">
                2D VECTOR & 3D DESIGN & ANIMATION
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
              9 Combined Works (7 in 2D · 2 in 3D)
            </span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            2D vector animation, 3D animation, motion graphics & visual storytelling.
          </p>

          {/* Horizontal Row of Selected Project Previews (4 Items across 2D & 3D) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6">
            {combinedAnimPreviews.map((project, idx) => {
              const is3D = project.id.startsWith('3d-');
              return (
                <div
                  key={project.id}
                  onClick={() => handleOpenCategory('03')}
                  className="group/anim flex flex-col bg-slate-50 hover:bg-emerald-50/40 rounded-2xl border border-slate-200/80 hover:border-emerald-300 overflow-hidden transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <div className="relative w-full aspect-video bg-slate-950 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover/anim:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/25 group-hover/anim:bg-slate-950/10 transition-colors" />

                    {/* Custom Mini Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/95 text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-md group-hover/anim:scale-110 transition-all border border-white/60">
                        <Play className="w-4 h-4 fill-slate-900 text-slate-900 ml-0.5" />
                      </div>
                    </div>

                    {/* Discipline Badge (2D Vector vs 3D CGI) */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${
                        is3D ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {is3D ? '3D CGI' : '2D Vector'}
                      </span>
                    </div>

                    {project.duration && (
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono">
                        {project.duration}
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                        {is3D ? '3D Sequence 0' + (idx - 1) : '2D Explainer 0' + (idx + 1)}
                      </p>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover/anim:text-emerald-950 truncate mt-0.5">
                        {project.title}
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-600 line-clamp-1 mt-1 font-medium">
                      {project.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom-Right "More →" Action */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              onClick={() => handleOpenCategory('03')}
              className="group/btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-emerald-50"
            >
              <span>More</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </article>

        {/* ========================================================================= */}
        {/* ROW 3: 04 SOCIAL MEDIA REELS (Left) + 05 & 06 STACKED (Right)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          {/* --------------------------------------------------------------------- */}
          {/* CATEGORY 04 — SOCIAL MEDIA REELS (Vertical 9:16 Format)               */}
          {/* --------------------------------------------------------------------- */}
          <article
            id="card-category-04"
            className="group/card bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between h-full"
          >
            <div>
              {/* Category Number & Title */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-extrabold text-emerald-800 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                  04
                </span>
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  9:16 HD Vertical Reel
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover/card:text-emerald-950 transition-colors">
                SOCIAL MEDIA REELS
              </h3>
              
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Short-form vertical content for brands, awareness & engagement.
              </p>

              {/* 9:16 Vertical Reel Media Box (Preserving strict 9:16 ratio - larger display) */}
              <div className="relative w-full max-w-[380px] sm:max-w-[400px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md mt-5">
                {playingCardVideoId === currentReel.id ? (
                  <video
                    src={currentReel.videoUrl}
                    poster={currentReel.image}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover bg-black"
                  />
                ) : (
                  <div
                    onClick={() => setPlayingCardVideoId(currentReel.id)}
                    className="relative w-full h-full cursor-pointer group/thumb overflow-hidden"
                  >
                    <img
                      src={currentReel.image}
                      alt={currentReel.title}
                      className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Instagram Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono font-bold tracking-wider border border-white/10 shadow-xs">
                        REEL 01
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 backdrop-blur-xs text-slate-950 text-[10px] font-extrabold uppercase tracking-tight shadow-xs">
                        9:16 HD
                      </span>
                    </div>

                    {/* CENTRED PLAY BUTTON OVERLAY */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md group-hover/thumb:scale-125 transition-transform duration-300" />
                        <div className="relative w-16 h-16 rounded-full bg-white/95 text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-xl group-hover/thumb:scale-110 group-hover/thumb:bg-white group-active/thumb:scale-95 transition-all duration-200 border border-white/60">
                          <Play className="w-7 h-7 fill-slate-900 text-slate-900 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Watch Callout */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="text-[11px] font-semibold text-white/90 drop-shadow-sm flex items-center gap-1">
                        <Film className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tap to Play</span>
                      </span>
                      {currentReel.highlight && (
                        <span className="text-[10px] font-bold text-emerald-300 drop-shadow-sm">
                          {currentReel.highlight}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Reel Details & Default Descriptive Text (Fills bottom spacing) */}
              <div className="mt-5 px-1 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {currentReel.title}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                    High Retention Hook
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentReel.description || 'Fast-paced kinetic motion design and synchronized audio pacing engineered specifically for Instagram Reels, TikTok, and YouTube Shorts to maximize viewer retention within the first 3 seconds.'}
                </p>
              </div>
            </div>

            {/* Bottom "More →" Action */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                Explore all vertical reel case studies
              </span>
              <button
                type="button"
                onClick={() => handleOpenCategory('04')}
                className="group/btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-emerald-50"
              >
                <span>More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: 05 PRODUCT VIDEOS + 06 AI CREATIVE LAB (Stacked)        */}
          {/* --------------------------------------------------------------------- */}
          <div className="flex flex-col gap-6 sm:gap-8">
            
            {/* ------------------------------------------------------------------- */}
            {/* CATEGORY 05 — PRODUCT VIDEOS (16:9 Landscape Video)                 */}
            {/* ------------------------------------------------------------------- */}
            <article
              id="card-category-05"
              className="group/card bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Category Number & Title */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-extrabold text-emerald-800 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                    05
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    4 Productions · 16:9 1080p
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover/card:text-emerald-950 transition-colors">
                  PRODUCT VIDEOS
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Product showcases, explainers, launch films & commercial videos.
                </p>

                {/* 16:9 Landscape Video Showcase (Preserving Exact 16:9 Ratio) */}
                <div className="mt-5 relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-2xs">
                  {playingCardVideoId === currentProduct.id ? (
                    <video
                      src={currentProduct.videoUrl}
                      poster={currentProduct.image}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover bg-black"
                    />
                  ) : (
                    <div
                      onClick={() => setPlayingCardVideoId(currentProduct.id)}
                      className="relative w-full h-full cursor-pointer group/vid overflow-hidden"
                    >
                      <img
                        src={currentProduct.image}
                        alt={currentProduct.title}
                        className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 group-hover/vid:bg-slate-950/20 transition-colors" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                        <span className="px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold">
                          {currentProduct.title}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/90 backdrop-blur-xs text-slate-950 text-[10px] font-extrabold">
                          16:9 FHD
                        </span>
                      </div>

                      {/* CENTRED PLAY BUTTON OVERLAY */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md group-hover/vid:scale-125 transition-transform duration-300" />
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-xl group-hover/vid:scale-110 group-hover/vid:bg-white group-active/vid:scale-95 transition-all duration-200 border border-white/60">
                            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-900 text-slate-900 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom-Right "More →" Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleOpenCategory('05')}
                  className="group/btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-emerald-50"
                >
                  <span>More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>

            {/* ------------------------------------------------------------------- */}
            {/* CATEGORY 06 — AI CREATIVE LAB (16:9 Landscape Video)                */}
            {/* ------------------------------------------------------------------- */}
            <article
              id="card-category-06"
              className="group/card bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Category Number & Title */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-extrabold text-emerald-800 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                    06
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    2 Neural Experiments
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover/card:text-emerald-950 transition-colors">
                  AI CREATIVE LAB
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  AI-powered experiments, generative visuals, creative pipelines & innovation.
                </p>

                {/* 16:9 Landscape Video Showcase (Preserving Exact 16:9 Ratio) */}
                <div className="mt-5 relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-2xs">
                  {playingCardVideoId === currentAi.id ? (
                    <video
                      src={currentAi.videoUrl}
                      poster={currentAi.image}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover bg-black"
                    />
                  ) : (
                    <div
                      onClick={() => setPlayingCardVideoId(currentAi.id)}
                      className="relative w-full h-full cursor-pointer group/ai overflow-hidden"
                    >
                      <img
                        src={currentAi.image}
                        alt={currentAi.title}
                        className="w-full h-full object-cover group-hover/ai:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 group-hover/ai:bg-slate-950/20 transition-colors" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                        <span className="px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold">
                          {currentAi.title}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/90 backdrop-blur-xs text-slate-950 text-[10px] font-extrabold">
                          16:9 FHD
                        </span>
                      </div>

                      {/* CENTRED PLAY BUTTON OVERLAY */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md group-hover/ai:scale-125 transition-transform duration-300" />
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-xl group-hover/ai:scale-110 group-hover/ai:bg-white group-active/ai:scale-95 transition-all duration-200 border border-white/60">
                            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-900 text-slate-900 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom-Right "More →" Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleOpenCategory('06')}
                  className="group/btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-emerald-50"
                >
                  <span>More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT-SIDE SLIDE-IN CATEGORY DETAIL DRAWER                                */}
      {/* ========================================================================= */}
      <PortfolioDetailDrawer
        isOpen={drawerOpen}
        categoryKey={activeCategoryKey}
        onClose={handleCloseDrawer}
        onSelectProject={(project) => {
          if (onSelectProject) {
            onSelectProject(project);
          }
        }}
      />
    </section>
  );
};
