import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2, Film } from 'lucide-react';

export const Showreel: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const chapters = [
    { time: '0:00', title: 'Kinetic Opener & 3D Typography' },
    { time: '0:22', title: 'Brand Identity & Logomarks in Motion' },
    { time: '0:48', title: 'Commercial 3D Product Renders' },
    { time: '1:15', title: '2D Character Rigging & Vector Story' },
    { time: '1:45', title: 'Spatial UI & Generative AI Lab' },
  ];

  return (
    <section id="showreel" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">09</span>
            <span>Master Highlight Reel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            SHOWREEL
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
            A comprehensive compilation of selected motion direction, 2D/3D commercial animation, and brand identity projects.
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600 flex items-center gap-2">
          <Film className="w-4 h-4 text-emerald-600" />
          <span>Full HD • 60 FPS • Stereo Audio</span>
        </div>
      </div>

      {/* Main 16:9 Video Presentation Frame */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-200 shadow-xl overflow-hidden aspect-video group">
        
        {isPlaying ? (
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1&rel=0"
            title="Aravind Shaw Creative Motion Showreel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
            {/* Background Thumbnail Image */}
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80"
              alt="Aravind Shaw Showreel Cover"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Central Play Button */}
            <div className="relative z-10 flex flex-col items-center text-center p-6">
              <button
                id="showreel-play-main-btn"
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 cursor-pointer"
                aria-label="Play Showreel Video"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
              </button>

              <div className="mt-6 text-white">
                <span className="text-xs uppercase tracking-widest font-semibold text-emerald-400">
                  Motion & Brand Reel
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                  Watch Highlights (2:10)
                </h3>
              </div>
            </div>

            {/* Bottom Floating Info Badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/80 text-xs hidden sm:flex">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Direction • 2D/3D Animation • Sound Design • Typography</span>
              </div>
              <span className="font-mono">02:10 MIN</span>
            </div>
          </div>
        )}
      </div>

      {/* Chapters & Competencies Breakdown */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Reel Chapters */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Reel Breakdown & Milestones</span>
          </h4>
          <div className="space-y-3">
            {chapters.map((ch, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {ch.time}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-800">
                    {ch.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-600 font-medium">Chapter 0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Roles & Production Capabilities */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
            Production Roles in Reel
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Creative & Art Direction:</strong> Conceptualizing visual narrative</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>2D Character & Vector:</strong> Frame-by-frame & DUIK rigging</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>3D CGI & Lighting:</strong> Octane, Cinema 4D, & Blender</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Sound & Pacing:</strong> Kinetic audio design and sync</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};
