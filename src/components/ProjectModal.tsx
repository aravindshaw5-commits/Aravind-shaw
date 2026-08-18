import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, Tag, Sparkles, CheckCircle, Calendar, User, Wrench, BarChart3, Upload, Image as ImageIcon, Video, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Load saved uploaded images for this project from localStorage
      if (project.details?.gallerySlots) {
        const loaded: Record<string, string> = {};
        project.details.gallerySlots.forEach(slot => {
          try {
            const saved = localStorage.getItem(`uploaded_slot_${project.id}_${slot.slotNumber}`);
            if (saved) loaded[slot.slotNumber] = saved;
          } catch {
            // ignore
          }
        });
        setUploadedImages(loaded);
      }
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleFileUpload = (slotNumber: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !project) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setUploadedImages(prev => ({ ...prev, [slotNumber]: dataUrl }));
        try {
          localStorage.setItem(`uploaded_slot_${project.id}_${slotNumber}`, dataUrl);
        } catch (err) {
          console.warn('Storage quota exceeded or error', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (slotNumber: string) => {
    if (!project) return;
    setUploadedImages(prev => {
      const updated = { ...prev };
      delete updated[slotNumber];
      return updated;
    });
    try {
      localStorage.removeItem(`uploaded_slot_${project.id}_${slotNumber}`);
    } catch {
      // ignore
    }
  };

  if (!project) return null;

  const hasGallerySlots = Boolean(project.details?.gallerySlots && project.details.gallerySlots.length > 0);

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
          <div className="flex items-center gap-2.5">
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
          
          {/* Main Media Showcase (Rendered if not using custom branding gallery slots) */}
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

          {/* BRANDING PROJECT GALLERY (EXACT 5 SLOTS WITH EDITABLE UPLOAD PLACEHOLDERS) */}
          {hasGallerySlots && project.details?.gallerySlots && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  PROJECT GALLERY
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {project.details.gallerySlots.length} Curated Showcase Slots
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {project.details.gallerySlots.map((slot) => {
                  const uploadedMedia = uploadedImages[slot.slotNumber];
                  const currentImage = uploadedMedia || slot.image;
                  const isVideo = Boolean(slot.isVideo);

                  return (
                    <div
                      key={slot.slotNumber}
                      className={`relative rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs flex flex-col ${
                        isVideo ? 'sm:col-span-2' : ''
                      }`}
                    >
                      {/* Slot Header Banner */}
                      <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between text-xs">
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-mono text-emerald-800 font-semibold">
                            {slot.slotNumber}
                          </span>
                          <span>{slot.title}</span>
                        </div>

                        {currentImage && (
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[slot.slotNumber]?.click()}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Replace</span>
                          </button>
                        )}
                      </div>

                      {/* Slot Media or Upload Placeholder - 4:5 Portrait vs 16:9 Video */}
                      <div
                        className={`relative w-full bg-slate-950 flex items-center justify-center overflow-hidden ${
                          isVideo ? 'aspect-video' : 'aspect-[4/5]'
                        }`}
                        style={{ aspectRatio: isVideo ? '16 / 9' : '4 / 5' }}
                      >
                        {currentImage ? (
                          <div className="relative w-full h-full group flex items-center justify-center">
                            <img
                              src={currentImage}
                              alt={`${project.title} - ${slot.title}`}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                            {/* Hover overlay with remove button if uploaded */}
                            {uploadedMedia && (
                              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(slot.slotNumber)}
                                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Reset</span>
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Clean, Elegant, Professional UPLOAD PROJECT IMAGE Placeholder */
                          <div
                            onClick={() => fileInputRefs.current[slot.slotNumber]?.click()}
                            className="w-full h-full bg-slate-50 hover:bg-slate-100/80 transition-colors border-2 border-dashed border-slate-200 hover:border-emerald-400 flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-500 group-hover:text-emerald-600 group-hover:border-emerald-200 group-hover:scale-105 transition-all mb-3">
                              {isVideo ? <Video className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                            </div>

                            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                              {isVideo ? 'UPLOAD PROMOTIONAL VIDEO' : 'UPLOAD PROJECT IMAGE'}
                            </div>

                            <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                              {isVideo
                                ? '1920 × 1080 · 16:9 YouTube video format'
                                : '1080 × 1350 · 4:5 Instagram portrait format'}
                            </p>

                            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 group-hover:border-emerald-300 group-hover:text-emerald-700 transition-colors">
                              <Upload className="w-3 h-3 text-emerald-600" />
                              <span>Select Media</span>
                            </div>
                          </div>
                        )}

                        {/* Hidden File Input for uploading images */}
                        <input
                          ref={(el) => (fileInputRefs.current[slot.slotNumber] = el)}
                          type="file"
                          accept={isVideo ? 'video/*,image/*' : 'image/*,video/*'}
                          className="hidden"
                          onChange={(e) => handleFileUpload(slot.slotNumber, e)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Standard Project Details Grid for non-branding or extended info */}
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

              {/* Deliverables & Tools */}
              <div className="space-y-4 pt-2">
                {project.deliverables && project.deliverables.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                      Deliverables Produced
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools Used */}
                {project.tools && project.tools.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Tools & Software
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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

