import React from 'react';
import { ArrowUp, Heart, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { setIsOwnerModalOpen, isAdmin } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Branding', href: '#branding' },
    { label: 'Reels', href: '#reels' },
    { label: 'Product Videos', href: '#products' },
    { label: '2D Animation', href: '#animation' },
    { label: '3D Design', href: '#threed' },
    { label: 'Showreel', href: '#showreel' },
    { label: 'Experience', href: '#experience' },
    { label: 'Award', href: '#award' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer id="main-footer" className="mt-32 border-t border-slate-200 bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                ARAVIND SHAW
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
              Motion Designer, Brand Identity Specialist & Visual Director. Crafting high-impact commercial narratives worldwide.
            </p>
          </div>

          {/* Back to Top */}
          <button
            id="footer-back-to-top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>

        {/* Links Navigation */}
        <div className="py-8 flex flex-wrap gap-x-6 gap-y-3">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs sm:text-sm text-slate-600 hover:text-emerald-700 font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Aravind Shaw. All rights reserved.</span>
            <button
              id="owner-portal-trigger"
              onClick={() => setIsOwnerModalOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
              title="Portfolio Owner Portal"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdmin ? 'Owner Mode (Active)' : 'Owner Portal'}</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Available for 2026/2027 Commissions</span>
            </span>
            <span>•</span>
            <span>Remote & Worldwide</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

