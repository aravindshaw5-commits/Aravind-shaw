import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  Video,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasGallerySlots = Boolean(project.details?.gallerySlots && project.details.gallerySlots.length > 0);
  const gallerySlots = project.details?.gallerySlots || [];

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="project-modal-container"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider border border-emerald-100">
              {project.category}
            </span>
            {project.year && (
              <span className="text-xs font-medium text-slate-500">
                {project.year}
              </span>
            )}
          </div>

          <button
            id="project-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Media Showcase for standard projects */}
          {!hasGallerySlots && (
            <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 aspect-video max-h-[460px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {project.highlight && (
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{project.highlight}</span>
                </div>
              )}
            </div>
          )}

          {/* Title & Category Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-semibold text-emerald-800 mt-1">
              {project.category}
            </p>
          </div>

          {/* PROJECT OVERVIEW SECTION */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              PROJECT OVERVIEW
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {project.details?.overview || project.description}
            </p>
          </div>

          {/* MY ROLE SECTION */}
          {(project.roles || project.role) && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                MY ROLE
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.roles ? (
                  project.roles.map((r, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))
                ) : (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{project.role}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BRANDING PROJECT GALLERY (5 SLOTS) */}
          {hasGallerySlots && gallerySlots.length > 0 && (
            <div className="space-y-5 pt-2 border-t border-slate-100">
              
              {/* Gallery Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      PROJECT GALLERY
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                      5 Showcase Slides
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Curated brand identity showcase &amp; visual system presentation
                  </p>
                </div>
              </div>

              {/* 5 Showcase Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gallerySlots.map((slot) => {
                  const currentImage = slot.image;
                  const isVideo = Boolean(slot.isVideo);

                  return (
                    <div
                      key={slot.slotNumber}
                      className={`relative rounded-2xl border border-slate-200/90 hover:border-slate-300 transition-all overflow-hidden bg-white shadow-2xs flex flex-col ${
                        isVideo ? 'sm:col-span-2' : ''
                      }`}
                    >
                      {/* Slot Header Banner */}
                      <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between gap-2 text-xs">
                        <div className="font-bold text-slate-800 flex items-center gap-2 min-w-0">
                          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-mono text-emerald-800 font-bold shrink-0">
                            {slot.slotNumber}
                          </span>
                          <span className="truncate font-semibold text-slate-900">{slot.title}</span>
                        </div>
                      </div>

                      {/* Slot Media Container: 4:5 Portrait vs 16:9 Video */}
                      <div
                        className={`relative w-full bg-slate-950 flex items-center justify-center overflow-hidden group ${
                          isVideo ? 'aspect-video' : 'aspect-[4/5]'
                        }`}
                        style={{ aspectRatio: isVideo ? '16 / 9' : '4 / 5' }}
                      >
                        {currentImage ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img
                              src={currentImage}
                              alt={`${project.title} - ${slot.title}`}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = '/images/placeholder.svg';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center select-none">
                            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                              {isVideo ? <Video className="w-5 h-5 text-emerald-400" /> : <ImageIcon className="w-5 h-5 text-emerald-400" />}
                            </div>

                            <div className="text-xs font-bold text-slate-200 tracking-wide uppercase">
                              {slot.title}
                            </div>

                            <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                              {project.title} · Case Study Showcase Asset
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Standard Project Details Grid for non-branding */}
          {!hasGallerySlots && (
            <>
              {/* Key Metrics / Highlights if available */}
              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  {project.stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {project.details?.challenge && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">The Challenge</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.details.challenge}
                    </p>
                  </div>
                )}

                {project.details?.solution && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">The Creative Solution</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.details.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Metadata Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/60 border border-slate-100 text-xs">
                {project.client && (
                  <div>
                    <span className="text-slate-600 block font-semibold mb-0.5">Client</span>
                    <span className="font-semibold text-slate-900">{project.client}</span>
                  </div>
                )}
                {project.role && (
                  <div>
                    <span className="text-slate-600 block font-semibold mb-0.5">Role</span>
                    <span className="font-semibold text-slate-900">{project.role}</span>
                  </div>
                )}
                {project.year && (
                  <div>
                    <span className="text-slate-600 block font-semibold mb-0.5">Year</span>
                    <span className="font-semibold text-slate-900">{project.year}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-600 block font-semibold mb-0.5">Category</span>
                  <span className="font-semibold text-slate-900">{project.category}</span>
                </div>
              </div>
            </>
          )}

          {/* Modal Footer CTA */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Back to Portfolio
            </button>
            <a
              href="#contact"
              onClick={() => {
                onClose();
                const el = document.getElementById('contact');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Discuss Similar Project</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

