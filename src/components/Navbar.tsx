import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Play } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (sectionId: string, label?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Guarantee seamless video autoplay & loop
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback: retry on first interaction
          const handleFirstTouch = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', handleFirstTouch);
            window.removeEventListener('touchstart', handleFirstTouch);
          };
          window.addEventListener('click', handleFirstTouch, { once: true });
          window.addEventListener('touchstart', handleFirstTouch, { once: true });
        });
      }
    }
  }, []);

  const navLinks = [
    { label: 'Work', href: '#portfolio' },
    { label: 'Showreel', href: '#showreel' },
    { label: 'Awards', href: '#award' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Tools', href: '#tools' },
    { label: 'About', href: '#about' },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-2.5'
          : 'bg-white/95 backdrop-blur-sm border-b border-slate-200/70 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo & Text Animation Video */}
        <a
          id="nav-brand-logo"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 sm:gap-2.5 text-slate-900 font-bold text-base sm:text-lg tracking-tight cursor-pointer shrink-0"
        >
          {/* Active status pulsing green dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
          </span>
          
          {/* Custom Looping Text-Animation Video (Aravind Shaw Animated Logo) */}
          <div className="relative flex items-center h-8 sm:h-9 md:h-9.5 aspect-[1920/500] overflow-hidden mix-blend-multiply hover:opacity-90 transition-opacity">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain pointer-events-none select-none"
              aria-label="Aravind Shaw 2D Motion Graphic Designer Animated Logo"
            >
              <source src="/Into%20Video%20Text%20Animation%2003.mp4" type="video/mp4" />
              <source src="/aravind-logo-loop.mp4" type="video/mp4" />
              <source src="/Into%20Video%20Text%20Animation.mp4" type="video/mp4" />
            </video>
          </div>

          <span className="hidden lg:inline-block text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/80 shrink-0">
            Portfolio
          </span>
        </a>

        {/* Right-Aligned Navigation & Quick Meet CTA */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-auto">
          <nav
            id="desktop-navigation"
            className="flex items-center gap-4 lg:gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className="text-xs lg:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA button: Quick Meet (Green Play Button Style) */}
          <a
            id="nav-contact-cta"
            href="#contact"
            onClick={(e) => handleLinkClick('#contact', e)}
            className="inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap group"
          >
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
            </div>
            <span>Quick Meet</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle-btn"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden fixed inset-x-0 top-[56px] bg-white border-b border-slate-200 shadow-xl py-6 px-6 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold tracking-wider text-slate-600 uppercase px-3 mb-1">
              Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-100">
              <a
                id="mobile-nav-contact"
                href="#contact"
                onClick={(e) => handleLinkClick('#contact', e)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                </div>
                <span>Quick Meet</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
