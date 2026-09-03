import React from 'react';
import { aboutData } from '../lib/data';
import { CheckCircle2, Compass, ArrowUpRight } from 'lucide-react';
import aravindPortraitDefault from '../assets/images/Aravind image.png';

export const About: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">13</span>
            <span>Animator & Designer Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            ABOUT ARAVIND SHAW
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
            2D Motion Graphic Designer & Animator specializing in educational content, social media videos, and vector motion.
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600">
          Motion Graphics & Animation
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* LEFT COLUMN: Narrative Bio & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-2xs space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <Compass className="w-3.5 h-3.5" />
                <span>Motion & Visual Craft</span>
              </div>

              {/* Profile Picture */}
              <div className="flex items-center gap-2.5">
                <div 
                  className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-200 shadow-2xs"
                >
                  <img
                    src={aravindPortraitDefault}
                    alt="Aravind Shaw"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/aravind-portrait.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {aboutData.headline}
            </h3>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {aboutData.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Core Disciplines Grid */}
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Core Design Disciplines
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {aboutData.disciplines.map((disc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{disc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Statistics & Key Pillars */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Key Statistics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {aboutData.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:border-emerald-200 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-1">
                  {stat.label}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Inquiry Card */}
          <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-6 sm:p-7">
            <h4 className="text-base font-bold text-slate-900 tracking-tight">
              Looking for a Creative Partner?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Whether you are launching a new brand identity, need a 3D product commercial, or require high-converting animation videos, I'm ready to collaborate.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
