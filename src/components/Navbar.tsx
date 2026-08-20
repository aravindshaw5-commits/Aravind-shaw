import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, CloudUpload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { isAdmin, setIsImageUploadModalOpen } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('branding');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current visible section
      const sections = [
        'branding', 'reels', 'products', 'animation', 'threed',
        'character', 'editorial', 'ailab', 'showreel', 'experience',
        'award', 'tools', 'about', 'contact'
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Branding', href: '#branding', id: 'branding' },
    { label: 'Reels', href: '#reels', id: 'reels' },
    { label: 'Products', href: '#products', id: 'products' },
    { label: '2D Animation', href: '#animation', id: 'animation' },
    { label: '3D Design', href: '#threed', id: 'threed' },
    { label: 'Showreel', href: '#showreel', id: 'showreel' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Award', href: '#award', id: 'award' },
    { label: 'About', href: '#about', id: 'about' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (onNavigate) onNavigate(id);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3.5'
          : 'bg-white/80 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          id="nav-brand-logo"
          href="#hero"
          onClick={(e) => handleLinkClick('hero', e)}
          className="group flex items-center gap-2.5 text-slate-900 font-bold text-lg sm:text-xl tracking-tight"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 group-hover:scale-125 transition-transform duration-200" />
          <span className="font-extrabold tracking-tight">ARAVIND SHAW</span>
          <span className="hidden sm:inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/80 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          {isAdmin && (
            <button
              id="nav-admin-upload-btn"
              onClick={() => setIsImageUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              title="Upload / Replace Portfolio Image (Firebase Storage)"
            >
              <CloudUpload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Upload Image</span>
            </button>
          )}

          <a
            id="nav-contact-cta"
            href="#contact"
            onClick={(e) => handleLinkClick('contact', e)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-150"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle-btn"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-slate-200 shadow-xl py-6 px-6 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold tracking-wider text-slate-600 uppercase px-3 mb-1">
              Portfolio Categories
            </p>
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`mobile-nav-${link.id}`}
                href={link.href}
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                )}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
              {isAdmin && (
                <button
                  type="button"
                  id="mobile-nav-admin-upload"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsImageUploadModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-center font-semibold text-xs shadow-xs flex items-center justify-center gap-2"
                >
                  <CloudUpload className="w-4 h-4 text-emerald-400" />
                  <span>Upload / Replace Image (Admin)</span>
                </button>
              )}

              <a
                id="mobile-nav-contact"
                href="#contact"
                onClick={(e) => handleLinkClick('contact', e)}
                className="w-full py-3 rounded-lg bg-emerald-600 text-white text-center font-semibold text-sm shadow-xs flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a Project / Hire Me</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
