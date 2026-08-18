import React, { useState } from 'react';
import { Trophy, Play, Sparkles, CheckCircle2, Medal, Star, ExternalLink } from 'lucide-react';
import { awardDetails } from '../lib/data';

export const Award: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section id="award" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">12</span>
            <span>Honors & Global Recognition</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            USAIN BOLT CAMPAIGN & AWARD
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
            Gold trophy recipient for creative animation excellence and high-impact kinetic storytelling.
          </p>
        </div>
        <div className="mt-4 md:mt-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>International Gold Winner</span>
        </div>
      </div>

      {/* Main Award Showcase Box */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: 1080p Video Showcase Area */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-slate-900 border border-slate-200 overflow-hidden aspect-video shadow-md group">
              {isVideoPlaying ? (
                <iframe
                  className="w-full h-full object-cover"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1"
                  title="Usain Bolt Campaign Animation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80"
                    alt="Usain Bolt Motion Campaign Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                    <button
                      id="award-video-play-btn"
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                      aria-label="Play Usain Bolt Award Video"
                    >
                      <Play className="w-7 h-7 fill-slate-900 ml-1 text-slate-900" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs bg-slate-900/80 backdrop-blur-xs px-3 py-2 rounded-lg">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>1080p 60FPS Campaign Presentation</span>
                    </span>
                    <span className="font-mono">01:45</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: 520x520 Media Presentation Card & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/80 mb-3">
                <Medal className="w-3.5 h-3.5 text-amber-600" />
                <span>{awardDetails.badge}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {awardDetails.title}
              </h3>

              <div className="text-sm font-semibold text-emerald-800 mt-1">
                {awardDetails.organization} • {awardDetails.year}
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                {awardDetails.description}
              </p>
            </div>

            {/* Stats */}
            {awardDetails.stats && (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                {awardDetails.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Campaign Deliverables Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direction of 120s master animated tribute film</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>International motion graphics & frame-by-frame pacing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Recognized by international design jury panel</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
