import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  Sparkles,
  Video,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Upload,
  Check,
  Image as ImageIcon,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Loader2,
  RotateCcw,
  Shield
} from 'lucide-react';
import { Project } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const {
    isAdmin,
    savedMedia,
    uploadImageFile,
    saveProjectMedia,
    removeProjectMedia,
    setIsOwnerModalOpen,
    login,
    logout
  } = useAuth();

  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ slot: string; message: string; type: 'success' | 'error' } | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  const [showInlineLogin, setShowInlineLogin] = useState<boolean>(false);
  const [inlinePassword, setInlinePassword] = useState<string>('');
  const [inlineLoginError, setInlineLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isResettingAll, setIsResettingAll] = useState<boolean>(false);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  // Reset local state when project changes
  useEffect(() => {
    setFeedback(null);
    setShowInlineLogin(false);
    setInlinePassword('');
    setInlineLoginError(null);
    setDragOverSlot(null);
  }, [project?.id]);

  const processFile = async (file: File, slotNumber: string, isVideo: boolean) => {
    if (!project || !isAdmin) return;

    if (file.size > 45 * 1024 * 1024) {
      setFeedback({
        slot: slotNumber,
        message: 'File too large. Please select a file under 45MB.',
        type: 'error'
      });
      return;
    }

    setUploadingSlot(slotNumber);
    setFeedback(null);

    try {
      const key = `${project.id}_${slotNumber}`;
      const res = await uploadImageFile(file, key, {
        title: `${project.title} — Slot ${slotNumber}`,
        projectId: project.id,
        slotNumber,
        mediaType: isVideo ? 'video' : 'image'
      });

      setUploadingSlot(null);

      if (res.success) {
        setFeedback({
          slot: slotNumber,
          message: `✓ Slot ${slotNumber} updated successfully.`,
          type: 'success'
        });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({
          slot: slotNumber,
          message: res.error || 'Failed to upload media',
          type: 'error'
        });
      }
    } catch (err: any) {
      setUploadingSlot(null);
      setFeedback({
        slot: slotNumber,
        message: err.message || 'Error uploading file.',
        type: 'error'
      });
    }
  };

  const handleFileUpload = async (slotNumber: string, isVideo: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file, slotNumber, isVideo);
    // Reset file input value so selecting the same file again triggers change event
    if (fileInputRefs.current[slotNumber]) {
      fileInputRefs.current[slotNumber]!.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent, slotNumber: string) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.stopPropagation();
    if (dragOverSlot !== slotNumber) {
      setDragOverSlot(slotNumber);
    }
  };

  const handleDragLeave = (e: React.DragEvent, slotNumber: string) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.stopPropagation();
    if (dragOverSlot === slotNumber) {
      setDragOverSlot(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, slotNumber: string, isVideo: boolean) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlot(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFile(files[0], slotNumber, isVideo);
    }
  };

  const handleRemoveImage = async (slotNumber: string) => {
    if (!project || !isAdmin) return;
    setUploadingSlot(slotNumber);
    const res = await removeProjectMedia(project.id, slotNumber);
    setUploadingSlot(null);
    if (res.success) {
      setFeedback({
        slot: slotNumber,
        message: `Slot ${slotNumber} reset to default artwork.`,
        type: 'success'
      });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleResetAllSlots = async () => {
    if (!project || !isAdmin) return;
    if (!window.confirm(`Are you sure you want to reset all custom images for ${project.title} to default artwork?`)) {
      return;
    }

    setIsResettingAll(true);
    const slots = project.details?.gallerySlots || [];
    for (const slot of slots) {
      if (savedMedia[`${project.id}_${slot.slotNumber}`]) {
        await removeProjectMedia(project.id, slot.slotNumber);
      }
    }
    setIsResettingAll(false);
    setFeedback({
      slot: 'all',
      message: `All custom media for ${project.title} reset to default assets.`,
      type: 'success'
    });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleInlineLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlinePassword.trim()) return;

    setIsLoggingIn(true);
    setInlineLoginError(null);

    const res = await login(inlinePassword);
    setIsLoggingIn(false);

    if (res.success) {
      setShowInlineLogin(false);
      setInlinePassword('');
    } else {
      setInlineLoginError(res.error || 'Incorrect owner password.');
    }
  };

  if (!project) return null;

  const hasGallerySlots = Boolean(project.details?.gallerySlots && project.details.gallerySlots.length > 0);
  const gallerySlots = project.details?.gallerySlots || [];

  // Count how many custom uploaded assets exist for this project
  const customSlotsCount = gallerySlots.filter(
    (slot) => Boolean(savedMedia[`${project.id}_${slot.slotNumber}`])
  ).length;

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
            
            {/* Admin Badge vs Owner Login Trigger */}
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 text-xs font-bold border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Owner Mode (Edit Active)</span>
                </span>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="text-[11px] text-slate-500 hover:text-red-600 transition-colors font-medium cursor-pointer"
                  title="Sign out of owner mode"
                >
                  (Sign Out)
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowInlineLogin((prev) => !prev)}
                className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-semibold border border-slate-200/80 transition-colors flex items-center gap-1 cursor-pointer"
                title="Owner login to upload/edit media"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Owner Login</span>
              </button>
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

        {/* Inline Quick Owner Login Bar if triggered */}
        {showInlineLogin && !isAdmin && (
          <div className="px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800 animate-fadeIn">
            <form onSubmit={handleInlineLoginSubmit} className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  Authenticate as Portfolio Owner to upload & replace media:
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="password"
                  value={inlinePassword}
                  onChange={(e) => setInlinePassword(e.target.value)}
                  placeholder="Enter owner password..."
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 flex-1 sm:w-56"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1"
                >
                  {isLoggingIn ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
                  <span>Unlock</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowInlineLogin(false)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </form>
            {inlineLoginError && (
              <p className="text-[11px] text-red-400 mt-2 font-medium">
                {inlineLoginError}
              </p>
            )}
          </div>
        )}

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
              
              {/* Gallery Section Header & Admin Stats */}
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

                {/* Admin Management Status Bar */}
                {isAdmin && (
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-medium text-slate-600">
                      {customSlotsCount > 0 ? (
                        <span className="text-emerald-700 font-semibold">
                          {customSlotsCount} of 5 slots customized
                        </span>
                      ) : (
                        <span>Showing default slide deck</span>
                      )}
                    </span>
                    {customSlotsCount > 0 && (
                      <button
                        type="button"
                        onClick={handleResetAllSlots}
                        disabled={isResettingAll}
                        className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50"
                        title="Reset all custom images for this project"
                      >
                        <RotateCcw className={`w-3 h-3 ${isResettingAll ? 'animate-spin' : ''}`} />
                        <span>Reset All</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Admin Mode Instructions Banner */}
              {isAdmin && (
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-950">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-emerald-900">
                      Admin Media Manager Active for {project.title}
                    </div>
                    <p className="text-emerald-800 text-[11px] leading-relaxed">
                      You can replace any of the 5 showcase slots below with high-resolution images or videos. 
                      Click <strong className="font-semibold">"Upload Image"</strong> or simply <strong className="font-semibold">drag and drop files</strong> directly onto any slot card. Changes are saved instantly to the portfolio database and will be visible to all visitors.
                    </p>
                  </div>
                </div>
              )}

              {/* Status Feedback Toast */}
              {feedback && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
                    feedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* 5 Showcase Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gallerySlots.map((slot) => {
                  const serverMedia = savedMedia[`${project.id}_${slot.slotNumber}`];
                  const currentImage = serverMedia || slot.image;
                  const isVideo = Boolean(slot.isVideo);
                  const isSlotBusy = uploadingSlot === slot.slotNumber;
                  const isSlotCustom = Boolean(serverMedia);
                  const isDraggingOverThis = dragOverSlot === slot.slotNumber;

                  return (
                    <div
                      key={slot.slotNumber}
                      onDragOver={(e) => handleDragOver(e, slot.slotNumber)}
                      onDragLeave={(e) => handleDragLeave(e, slot.slotNumber)}
                      onDrop={(e) => handleDrop(e, slot.slotNumber, isVideo)}
                      className={`relative rounded-2xl border transition-all overflow-hidden bg-white shadow-2xs flex flex-col ${
                        isVideo ? 'sm:col-span-2' : ''
                      } ${
                        isDraggingOverThis
                          ? 'ring-3 ring-emerald-500 border-emerald-500 shadow-lg scale-[1.01]'
                          : 'border-slate-200/90 hover:border-slate-300'
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

                        {/* Status Chip & Admin Action Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isAdmin && (
                            <>
                              {isSlotCustom ? (
                                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5" />
                                  <span>Custom Asset</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-medium border border-slate-300">
                                  Default Slide
                                </span>
                              )}

                              {/* Upload/Replace Button */}
                              <button
                                type="button"
                                onClick={() => fileInputRefs.current[slot.slotNumber]?.click()}
                                disabled={isSlotBusy}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50 shadow-2xs"
                                title={`Upload or replace image for Slot ${slot.slotNumber}`}
                              >
                                <Upload className={`w-3 h-3 ${isSlotBusy ? 'animate-spin' : ''}`} />
                                <span>{isSlotCustom ? 'Replace' : 'Upload'}</span>
                              </button>

                              {/* Reset Button (only if custom uploaded) */}
                              {isSlotCustom && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(slot.slotNumber)}
                                  disabled={isSlotBusy}
                                  className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                                  title={`Reset Slot ${slot.slotNumber} to default artwork`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </>
                          )}
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

                            {/* Drag-over indicator overlay */}
                            {isAdmin && isDraggingOverThis && (
                              <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white z-10">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mb-3 animate-bounce shadow-lg">
                                  <Upload className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-sm font-bold">
                                  Drop image here to replace Slot {slot.slotNumber}
                                </div>
                                <div className="text-xs text-emerald-200 mt-1">
                                  Will save instantly to portfolio database
                                </div>
                              </div>
                            )}

                            {/* Loading state during save */}
                            {isSlotBusy && (
                              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white z-10">
                                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                                <div className="text-xs font-bold text-slate-100">
                                  Saving to Portfolio Database...
                                </div>
                              </div>
                            )}
                            
                            {/* Owner-Only Hover Actions Overlay */}
                            {isAdmin && !isDraggingOverThis && !isSlotBusy && (
                              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                                <span className="text-xs font-semibold text-slate-200 mb-1">
                                  Slot {slot.slotNumber}: {slot.title}
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => fileInputRefs.current[slot.slotNumber]?.click()}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                                  >
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Replace Image</span>
                                  </button>
                                  {isSlotCustom && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveImage(slot.slotNumber)}
                                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Reset</span>
                                    </button>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-300 mt-1">
                                  (or drag and drop file here)
                                </span>
                              </div>
                            )}
                          </div>
                        ) : isAdmin ? (
                          /* OWNER MODE: Interactive Upload Box */
                          <div
                            onClick={() => fileInputRefs.current[slot.slotNumber]?.click()}
                            className="w-full h-full bg-slate-50 hover:bg-slate-100/80 transition-colors border-2 border-dashed border-slate-200 hover:border-emerald-400 flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-500 group-hover:text-emerald-600 group-hover:border-emerald-200 group-hover:scale-105 transition-all mb-3">
                              {isVideo ? <Video className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                            </div>

                            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                              {isVideo ? 'UPLOAD PROMOTIONAL VIDEO (16:9)' : `UPLOAD IMAGE FOR SLOT ${slot.slotNumber}`}
                            </div>

                            <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                              {isVideo
                                ? '1920 × 1080 · 16:9 video format'
                                : '1080 × 1350 · 4:5 portrait format'}
                            </p>

                            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 group-hover:border-emerald-300 group-hover:text-emerald-700 transition-colors">
                              <Upload className="w-3 h-3 text-emerald-600" />
                              <span>Select File</span>
                            </div>
                          </div>
                        ) : (
                          /* PUBLIC VISITOR VIEW: Clean Read-Only Case Study Showcase */
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

                        {/* Hidden File Input — Rendered ONLY when Owner is logged in */}
                        {isAdmin && (
                          <input
                            ref={(el) => (fileInputRefs.current[slot.slotNumber] = el)}
                            type="file"
                            accept={isVideo ? 'video/mp4,video/webm,image/*' : 'image/jpeg,image/png,image/webp,image/svg+xml,image/gif'}
                            className="hidden"
                            onChange={(e) => handleFileUpload(slot.slotNumber, isVideo, e)}
                          />
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

