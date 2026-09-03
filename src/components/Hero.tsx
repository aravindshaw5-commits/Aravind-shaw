import React from 'react';
import { ArrowDown, Play, Mail, Sparkles, Film } from 'lucide-react';
import aravindPortrait from '../assets/images/Aravind image.png';

interface HeroProps {
  onNavigate?: (sectionId: string, label?: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 bg-[#fafbfc] overflow-hidden"
    >
      {/* Subtle Background Geometric Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-24 w-80 h-80 bg-slate-100/80 rounded-full blur-2xl pointer-events-none" />
      
      {/* Subtle Grid Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Name, Headline, Narrative, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Pill */}
            <div
              id="hero-availability-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-slate-700 text-xs font-medium mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <span>Available for Creative Projects & Direction</span>
            </div>

            {/* Main Name & Title */}
            <h1
              id="hero-main-name"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4"
            >
              ARAVIND SHAW
            </h1>

            <p
              id="hero-subtitle"
              className="text-lg sm:text-xl md:text-2xl font-semibold text-emerald-800 tracking-tight mb-5"
            >
              2D Motion Graphic Designer
            </p>

            {/* Narrative Description */}
            <p
              id="hero-tagline"
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8"
            >
              Creating engaging 2D motion graphics, visual identities, and animated brand stories that turn ideas into memorable visual experiences.
            </p>

            {/* Action Buttons */}
            <div id="hero-cta-buttons" className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                id="hero-explore-work-btn"
                onClick={() => scrollToSection('branding')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer"
              >
                <span>Explore Portfolio</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-showreel-btn"
                onClick={() => scrollToSection('showreel')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold shadow-2xs transition-all duration-150 cursor-pointer"
              >
                <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Watch Showreel</span>
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-all duration-150 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div
              id="hero-trust-indicators"
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 w-full max-w-xl"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">540+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Videos Created</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">4+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">12+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Brands Worked With</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Framed Portrait / Creative Artwork with Floating Stat Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Outer Decorative Border Frame */}
              <div className="relative rounded-2xl p-2 bg-white border border-slate-200/90 shadow-lg group/portrait">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-100">
                  <img
                    id="hero-portrait-image"
                    src={aravindPortrait}
                    alt="Aravind Shaw — Motion Designer & Creative Director"
                    className="w-full h-full object-cover object-center transform group-hover/portrait:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/images/aravind-portrait.jpg';
                    }}
                  />
                </div>
              </div>

              {/* Floating Stat Card: 540+ Animation Videos Created */}
              <div
                id="hero-floating-stat-card"
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xl max-w-xs transition-transform hover:-translate-y-1 duration-200"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 leading-tight">
                      540+
                    </div>
                    <div className="text-xs font-semibold text-slate-800">
                      Animation Videos Created
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      High-retention commercial & social content delivered worldwide.
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div
                id="hero-top-badge"
                className="hidden sm:flex absolute -top-4 -right-4 bg-white border border-slate-200/90 rounded-lg py-2 px-3 shadow-md items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-slate-800">Award-Winning Motion</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
