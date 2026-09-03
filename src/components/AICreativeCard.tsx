import React, { useState, useRef } from 'react';
import {
  ArrowUpRight,
  Sparkles,
  X,
  AlertCircle,
  Calendar,
  Film,
  Play,
  Eye,
  Cpu,
  Layers,
  Sparkle
} from 'lucide-react';
import { Project } from '../types';

interface AICreativeCardProps {
  project: Project;
  itemNumber: string; // "01", "02", "03", "04"
  itemType: 'image' | 'video';
  onSelect: (project: Project) => void;
}

export const AICreativeCard: React.FC<AICreativeCardProps> = ({
  project,
  itemNumber,
  itemType,
  onSelect
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const displayImage = project.image || '/images/placeholder.svg';
  const videoSource = project.videoUrl;

  // Safe Click-To-Play Handler for Video Card (Uses direct HTML5 video element control)
  const handleStartPlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (itemType !== 'video') {
      onSelect(project);
      return;
    }

    if (!videoSource || typeof videoSource !== 'string' || videoSource.trim() === '') {
      setVideoError('Video preview unavailable.');
      return;
    }

    setVideoError(null);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setVideoError('Playback error. Please try again.');
            setIsPlaying(false);
          });
      }
    }
  };

  // Stop video and restore poster state
  const handleStopPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch {
        // Safe catch for stream reset
      }
    }
    setIsPlaying(false);
    setVideoError(null);
  };

  const handleVideoError = () => {
    setVideoError('Video unavailable. Please try again.');
    setIsPlaying(false);
  };

  return (
    <div
      id={`ai-card-${project.id}`}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* ========================================================================= */}
      {/* 1. MEDIA AREA (Respects Original Aspect Ratio Without Distortion) */}
      {/* ========================================================================= */}
      {itemType === 'image' ? (
        /* ----------------------------------------------------------------------- */
        /* VERTICAL PORTRAIT IMAGE (1080 × 1920 px — 9:16 Aspect Ratio)           */
        /* ----------------------------------------------------------------------- */
        <div className="relative w-full aspect-[9/16] bg-slate-950 overflow-hidden select-none">
          <div
            onClick={() => onSelect(project)}
            className="relative w-full h-full cursor-pointer group/thumb flex items-center justify-center"
            title="Click to view artwork details"
          >
            {/* Complete 9:16 artwork without cropping essential detail */}
            <img
              src={displayImage}
              alt={project.title}
              className="w-full h-full object-contain md:object-cover object-center group-hover/thumb:scale-[1.02] transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
              }}
            />

            {/* Subtle Vignette Overlay on Hover */}
            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="transform translate-y-2 group-hover/thumb:translate-y-0 transition-transform duration-300 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>View Full Artwork</span>
              </div>
            </div>

            {/* Top Left: Item Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-mono font-bold shadow-xs border border-slate-200/80 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-emerald-600" />
                <span>{itemNumber} • 9:16 PORTRAIT</span>
              </span>
            </div>

            {/* Top Right: Resolution Badge */}
            <div className="absolute top-3.5 right-3.5 pointer-events-none flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono font-medium border border-white/10 shadow-xs">
                1080 × 1920
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 backdrop-blur-xs text-slate-950 text-[10px] font-extrabold uppercase tracking-tight shadow-xs">
                9:16 IMAGE
              </span>
            </div>

            {/* Bottom Callout */}
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-white/90 text-[11px] font-medium border border-white/10 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Generative Portrait</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ----------------------------------------------------------------------- */
        /* LANDSCAPE VIDEO (1920 × 1080 px — 16:9 Aspect Ratio)                   */
        /* ----------------------------------------------------------------------- */
        <div className="relative w-full aspect-video bg-slate-950 overflow-hidden select-none">
          {/* Single Underlying HTML5 Video Player */}
          <video
            ref={videoRef}
            src={videoSource || undefined}
            poster={displayImage}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover bg-black"
            onPlay={() => {
              setIsPlaying(true);
              setVideoError(null);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={handleVideoError}
          />

          {/* Close Video / Return to Thumbnail Button (When Playing) */}
          {isPlaying && !videoError && (
            <button
              type="button"
              onClick={handleStopPlay}
              className="absolute top-3.5 right-3.5 z-30 px-2.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-xs text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-md cursor-pointer border border-white/20"
              title="Return to Cover Thumbnail"
            >
              <X className="w-3.5 h-3.5" />
              <span>Thumbnail</span>
            </button>
          )}

          {/* Thumbnail + REELS CUSTOM PLAY BUTTON (When Paused) */}
          {!isPlaying && (
            <div
              onClick={handleStartPlay}
              className="absolute inset-0 cursor-pointer group/thumb z-10 bg-slate-950"
              title="Click to play video"
            >
              {/* 16:9 Thumbnail Poster Image */}
              <img
                src={displayImage}
                alt={project.title}
                className="w-full h-full object-cover object-center group-hover/thumb:scale-[1.02] transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.svg';
                }}
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/30 group-hover/thumb:from-slate-950/55 transition-colors duration-300" />

              {/* EXACT REELS CUSTOM PLAY BUTTON */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  {/* Emerald Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md group-hover/thumb:scale-125 transition-transform duration-300" />

                  {/* Circular Glassmorphic Button from Reels */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-xl group-hover/thumb:scale-110 group-hover/thumb:bg-white group-active/thumb:scale-95 transition-all duration-200 border border-white/60">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-900 text-slate-900 ml-1" />
                  </div>
                </div>
              </div>

              {/* Top Left: Item Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-mono font-bold shadow-xs border border-slate-200/80 flex items-center gap-1">
                  <Film className="w-3 h-3 text-emerald-600" />
                  <span>{itemNumber} • 16:9 VIDEO</span>
                </span>
              </div>

              {/* Top Right: Resolution Badge */}
              <div className="absolute top-3.5 right-3.5 pointer-events-none flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono font-medium border border-white/10 shadow-xs">
                  1920 × 1080
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 backdrop-blur-xs text-slate-950 text-[10px] font-extrabold uppercase tracking-tight shadow-xs">
                  16:9 VIDEO
                </span>
              </div>

              {/* Bottom Left Callout */}
              <div className="absolute bottom-3 left-3 pointer-events-none">
                <span className="text-[11px] font-semibold text-white/90 drop-shadow-sm flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                  <Film className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tap to Play Video</span>
                </span>
              </div>

              {/* Bottom Right Callout */}
              <div className="absolute bottom-3 right-3 pointer-events-none">
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/10">
                  Generative Motion
                </span>
              </div>

              {/* Video Error Message Alert */}
              {videoError && (
                <div
                  className="absolute inset-3 my-auto h-fit bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-xl border border-slate-700 flex items-center justify-between shadow-xl z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-200">{videoError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVideoError(null)}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CARD CONTENT & METADATA                                                */}
      {/* ========================================================================= */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Subtitle & Client */}
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                {itemNumber}
              </span>
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase truncate max-w-[180px]">
                {project.subtitle || project.category}
              </span>
            </div>

            {project.client && (
              <span className="text-xs font-medium text-slate-500 truncate max-w-[150px]">
                {project.client}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(project)}
            className="text-base sm:text-lg font-bold text-slate-900 tracking-tight hover:text-emerald-700 transition-colors duration-200 line-clamp-2 cursor-pointer leading-snug"
            title={project.title}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {project.description}
          </p>

          {/* Metadata Row */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            {project.year && (
              <div className="flex items-center gap-1 font-medium text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{project.year}</span>
              </div>
            )}

            {project.role && (
              <div className="flex items-center gap-1 font-medium text-slate-600">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[180px]">{project.role}</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TAGS & VIEW PROJECT ACTION                                             */}
        {/* ========================================================================= */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Tag Chips */}
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] text-slate-400 px-1 py-0.5">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Details / View Project Button */}
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="shrink-0 text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer py-1.5 px-3 rounded-md hover:bg-slate-50 border border-slate-200/60 shadow-2xs"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
