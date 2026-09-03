import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Film,
  Calendar,
  Clock,
  Play,
  X,
  AlertCircle
} from 'lucide-react';
import { Project } from '../types';

interface CharacterCarouselCardProps {
  frameNumber: string;
  frameTitle: string;
  frameSubtitle?: string;
  slides: Project[];
  onSelectProject: (project: Project) => void;
}

export const CharacterCarouselCard: React.FC<CharacterCarouselCardProps> = ({
  frameNumber,
  frameTitle,
  frameSubtitle,
  slides,
  onSelectProject,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Touch swipe handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const totalSlides = Math.min(slides.length, 4);
  const currentProject = slides[currentSlideIndex] || slides[0];

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleStopVideo();
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleStopVideo();
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    handleStopVideo();
    setCurrentSlideIndex(index);
  };

  // Touch gesture swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      // Swiped left -> next slide
      handleStopVideo();
      setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    } else if (distance < -45) {
      // Swiped right -> prev slide
      handleStopVideo();
      setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Video Play / Pause Handling for video slides (using exact Reels custom play button)
  const handlePlayVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentProject.videoUrl) {
      onSelectProject(currentProject);
      return;
    }

    setVideoError(null);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlayingVideo(true);
          })
          .catch(() => {
            setVideoError('Video preview unavailable.');
            setIsPlayingVideo(false);
          });
      }
    }
  };

  const handleStopVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch {
        // Safe reset
      }
    }
    setIsPlayingVideo(false);
    setVideoError(null);
  };

  return (
    <div
      id={`character-frame-${frameNumber.toLowerCase().replace(/\s+/g, '-')}`}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* ========================================================================= */}
      {/* 1. MEDIA CAROUSEL (Instagram Portrait 4:5 Aspect Ratio — 1080 x 1350 px) */}
      {/* ========================================================================= */}
      <div
        className="relative w-full aspect-[4/5] bg-slate-950 overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Video Player if playing */}
        {currentProject.videoUrl && (
          <video
            ref={videoRef}
            src={currentProject.videoUrl}
            poster={currentProject.image}
            controls
            playsInline
            className={`w-full h-full object-cover bg-black ${isPlayingVideo ? 'block' : 'hidden'}`}
            onPlay={() => setIsPlayingVideo(true)}
            onPause={() => setIsPlayingVideo(false)}
            onEnded={() => setIsPlayingVideo(false)}
            onError={() => {
              setVideoError('Video unavailable');
              setIsPlayingVideo(false);
            }}
          />
        )}

        {/* Close/Reset Video Button */}
        {isPlayingVideo && (
          <button
            type="button"
            onClick={handleStopVideo}
            className="absolute top-3.5 right-3.5 z-30 px-2.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-xs text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-md cursor-pointer border border-white/20"
            title="Return to image"
          >
            <X className="w-3.5 h-3.5" />
            <span>Image</span>
          </button>
        )}

        {/* Active Slide Image */}
        {!isPlayingVideo && (
          <div
            onClick={() => onSelectProject(currentProject)}
            className="relative w-full h-full cursor-pointer group/thumb"
          >
            <img
              src={currentProject.image || '/images/placeholder.svg'}
              alt={currentProject.title}
              className="w-full h-full object-cover object-center group-hover/thumb:scale-[1.02] transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
              }}
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 group-hover/thumb:from-slate-950/50 transition-colors duration-300" />

            {/* If video slide and not playing: Custom Play Button (Exact Reels Design) */}
            {currentProject.videoUrl && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-auto"
                onClick={handlePlayVideo}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md group-hover/thumb:scale-125 transition-transform duration-300" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-xl group-hover/thumb:scale-110 group-hover/thumb:bg-white group-active/thumb:scale-95 transition-all duration-200 border border-white/60">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-900 text-slate-900 ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Top Left: Frame Number Badge */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-bold shadow-xs border border-slate-200/80">
            {frameNumber}
          </span>
          {currentProject.highlight && (
            <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur-xs text-slate-700 text-[10px] font-semibold shadow-xs border border-slate-200/60 hidden sm:flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{currentProject.highlight}</span>
            </span>
          )}
        </div>

        {/* Top Right: Instagram-Style "1/4" Multi-Item Slide Badge */}
        <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none flex items-center gap-1 bg-black/65 backdrop-blur-xs text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/15 shadow-sm">
          <Layers className="w-3 h-3 text-emerald-400" />
          <span>
            {currentSlideIndex + 1}/{totalSlides}
          </span>
        </div>

        {/* Instagram-Style Navigation Arrows (Left / Right) */}
        {!isPlayingVideo && (
          <>
            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="Previous character slide"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-md opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/70"
            >
              <ChevronLeft className="w-4 h-4 text-slate-900 -translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="Next character slide"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-md opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/70"
            >
              <ChevronRight className="w-4 h-4 text-slate-900 translate-x-0.5" />
            </button>
          </>
        )}

        {/* Bottom Center: Instagram-Style Pagination Dots (● ○ ○ ○) */}
        <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto">
          {slides.slice(0, 4).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => handleDotClick(idx, e)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 cursor-pointer rounded-full ${
                idx === currentSlideIndex
                  ? 'w-5 h-1.5 bg-white shadow-xs'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Video Error Message */}
        {videoError && (
          <div
            className="absolute inset-3 my-auto h-fit bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-xl border border-slate-700 flex items-center justify-between shadow-xl z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-xs font-medium text-slate-200">{videoError}</span>
            </div>
            <button
              type="button"
              onClick={() => setVideoError(null)}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. CARD CONTENT & METADATA (Updates dynamically per active slide) */}
      {/* ========================================================================= */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Line: Active Slide Title & Client */}
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                SLIDE 0{currentSlideIndex + 1}
              </span>
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase truncate max-w-[140px]">
                {frameTitle}
              </span>
            </div>

            {currentProject.client && (
              <span className="text-xs font-medium text-slate-500 truncate max-w-[130px]">
                {currentProject.client}
              </span>
            )}
          </div>

          {/* Active Project Title */}
          <h3
            onClick={() => onSelectProject(currentProject)}
            className="text-base sm:text-lg font-bold text-slate-900 tracking-tight hover:text-emerald-700 transition-colors duration-200 line-clamp-2 cursor-pointer leading-snug"
            title={currentProject.title}
          >
            {currentProject.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {currentProject.description}
          </p>

          {/* Metadata Row */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            {currentProject.year && (
              <div className="flex items-center gap-1 font-medium text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentProject.year}</span>
              </div>
            )}

            {currentProject.role && (
              <div className="flex items-center gap-1 font-medium text-slate-600">
                <Film className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[160px]">{currentProject.role}</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. ACTIONS & TAGS */}
        {/* ========================================================================= */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Tag Chips */}
          <div className="flex flex-wrap gap-1 overflow-hidden max-h-6">
            {currentProject.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100"
              >
                {tag}
              </span>
            ))}
            {currentProject.tags.length > 2 && (
              <span className="text-[10px] text-slate-400 px-1 py-0.5">
                +{currentProject.tags.length - 2}
              </span>
            )}
          </div>

          {/* View Project Button */}
          <button
            type="button"
            onClick={() => onSelectProject(currentProject)}
            className="shrink-0 text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer py-1.5 px-3 rounded-md hover:bg-slate-50 border border-slate-200/60 shadow-2xs"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
