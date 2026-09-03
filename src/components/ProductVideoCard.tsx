import React, { useState, useRef } from 'react';
import { ArrowUpRight, Sparkles, X, AlertCircle, Play } from 'lucide-react';
import { Project } from '../types';

interface ProductVideoCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  productNumber?: string;
}

export const ProductVideoCard: React.FC<ProductVideoCardProps> = ({
  project,
  onSelect,
  productNumber
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const displayThumbnail = project.image || '/images/placeholder.svg';
  const videoSource = project.videoUrl;

  // Safe Click-To-Play Handler (Direct user gesture triggers HTML5 video play)
  const handleStartPlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!videoSource || typeof videoSource !== 'string' || videoSource.trim() === '') {
      setVideoError('Video unavailable. Please try again.');
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
            setVideoError('Video unavailable. Please try again.');
            setIsPlaying(false);
          });
      }
    }
  };

  // Stop playback and return to thumbnail state
  const handleStopPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch {
        // Ignore unseekable stream reset errors
      }
    }
    setIsPlaying(false);
  };

  // Error Handler
  const handleVideoError = () => {
    setVideoError('Video unavailable. Please try again.');
    setIsPlaying(false);
  };

  return (
    <div
      id={`product-card-${project.id}`}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* 16:9 Media Box */}
      <div className="relative w-full overflow-hidden bg-slate-950 aspect-video select-none">
        
        {/* Underlying HTML5 Video Player (Plays in-card with full native controls) */}
        <video
          ref={videoRef}
          src={videoSource || undefined}
          poster={displayThumbnail}
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

        {/* Back to Thumbnail button when video is playing */}
        {isPlaying && !videoError && (
          <button
            type="button"
            onClick={handleStopPlay}
            className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-xs text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-md cursor-pointer border border-white/20"
            title="Close Video (Back to Thumbnail)"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Thumbnail</span>
          </button>
        )}

        {/* ==================================================== */}
        {/* THUMBNAIL & YOUTUBE-STYLE PLAY BUTTON (Before Play) */}
        {/* ==================================================== */}
        {!isPlaying && (
          <div
            onClick={handleStartPlay}
            className="absolute inset-0 cursor-pointer group/thumb z-10 bg-slate-950"
            title="Click to play video"
          >
            {/* 16:9 Thumbnail Image */}
            <img
              src={displayThumbnail}
              alt={project.title}
              className="w-full h-full object-cover object-center group-hover/thumb:scale-[1.02] transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
              }}
            />

            {/* Subtle Cinematic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 group-hover/thumb:from-slate-950/50 transition-colors duration-300" />

            {/* Centered Play Button (Matching Section 02 Reel Style) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md group-hover/thumb:scale-125 transition-transform duration-300" />
                
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-xl group-hover/thumb:scale-110 group-hover/thumb:bg-white group-active/thumb:scale-95 transition-all duration-200 border border-white/60">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-900 text-slate-900 ml-1" />
                </div>
              </div>
            </div>

            {/* Top Left: Category Pill or Highlight Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none">
              {project.highlight ? (
                <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-bold shadow-xs border border-slate-200/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{project.highlight}</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-slate-700 text-[11px] font-semibold shadow-xs border border-slate-200/80">
                  {project.category}
                </span>
              )}
            </div>

            {/* Top Right: Year Badge */}
            {project.year && (
              <div className="absolute top-3.5 right-3.5 pointer-events-none">
                <span className="px-2 py-0.5 rounded-md bg-slate-900/75 backdrop-blur-xs text-white text-[11px] font-medium border border-white/10">
                  {project.year}
                </span>
              </div>
            )}

            {/* Bottom Right: 16:9 HD Tag */}
            <div className="absolute bottom-3 right-3 pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase border border-white/10">
                16:9 HD
              </span>
            </div>

            {/* Clean Error Message Overlay */}
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

      {/* Card Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Project Number / Subtitle Header */}
          <div className="mb-1.5 flex items-center justify-between">
            {productNumber && (
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                {productNumber}
              </span>
            )}
            {project.subtitle && (
              <span className="text-xs font-semibold text-emerald-800 tracking-tight uppercase">
                {project.subtitle}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(project)}
            className="text-base sm:text-lg font-bold text-slate-900 tracking-tight hover:text-emerald-700 transition-colors duration-200 line-clamp-1 cursor-pointer"
          >
            {project.title}
          </h3>

          {/* Category */}
          <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
            {project.category}
          </p>

          {/* Short Description */}
          <p className="text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags and CTA footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
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
              <span className="text-[11px] text-slate-600 px-1 py-0.5">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="shrink-0 text-xs font-semibold text-slate-700 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
