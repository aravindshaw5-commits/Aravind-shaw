import React, { useState, useRef } from 'react';
import {
  Play,
  Film,
  Loader2,
  AlertCircle,
  Clock,
  RefreshCw,
  X
} from 'lucide-react';
import { Project } from '../types';

interface ReelCardProps {
  reel: Project;
  reelNumber: string; // e.g. "01", "02", "03", "04"
  onOpenManager?: (reelId: string) => void;
}

type VideoErrorType = 'no_video' | 'format_error' | 'load_error' | null;

export const ReelCard: React.FC<ReelCardProps> = ({ reel, reelNumber }) => {
  // Active playback & error states (strictly no autoplay)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<VideoErrorType>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Thumbnail (image asset only)
  const currentThumbnail = reel.image;
  // Video URL (video asset only)
  const currentVideo = reel.videoUrl || '';
  const currentTitle = reel.title;
  const currentDescription = reel.description;

  // Safe Click-To-Play Handler (Directly plays the video element)
  const handleStartPlay = () => {
    if (!currentVideo || typeof currentVideo !== 'string' || currentVideo.trim() === '') {
      setVideoError('no_video');
      return;
    }

    setVideoError(null);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
          })
          .catch((err) => {
            console.warn('Playback error:', err);
            setIsBuffering(false);
          });
      }
    }
  };

  // Stop playback and return to thumbnail state
  const handleStopPlay = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch {
        // Ignore currentTime reset errors on unseekable streams
      }
    }
    setIsPlaying(false);
    setIsBuffering(false);
    setVideoError(null);
  };

  // Toggle play/pause from footer button
  const handleTogglePlay = () => {
    if (isPlaying) {
      handleStopPlay();
    } else {
      handleStartPlay();
    }
  };

  // Safe Video Error Handler
  const handleVideoError = () => {
    setIsBuffering(false);
    if (videoRef.current && videoRef.current.error) {
      const code = videoRef.current.error.code;
      if (code === 4 || code === 3) {
        setVideoError('format_error');
      } else {
        setVideoError('load_error');
      }
    } else {
      setVideoError('load_error');
    }
  };

  return (
    <div
      id={`reel-card-${reel.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden"
    >
      {/* 9:16 Instagram Reel Media Box (1080 × 1920 aspect ratio) */}
      <div
        className="relative w-full aspect-[9/16] bg-slate-950 overflow-hidden select-none"
      >
        {/* Single Underlying HTML5 Video Player (Controlled by both center & native buttons) */}
        <video
          ref={videoRef}
          src={currentVideo || undefined}
          poster={currentThumbnail}
          controls
          preload="metadata"
          playsInline
          className="w-full h-full object-cover"
          onPlay={() => {
            setIsPlaying(true);
            setVideoError(null);
          }}
          onPlaying={() => {
            setIsPlaying(true);
            setIsBuffering(false);
          }}
          onPause={() => {
            setIsPlaying(false);
            setIsBuffering(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setIsBuffering(false);
          }}
          onWaiting={() => {
            if (isPlaying) {
              setIsBuffering(true);
            }
          }}
          onError={handleVideoError}
        />

        {/* Buffering Indicator (Only shown when genuinely buffering during playback) */}
        {isBuffering && isPlaying && !videoError && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/30 z-20">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        )}

        {/* Back to Thumbnail Close Button (When actively playing) */}
        {isPlaying && !videoError && (
          <button
            onClick={handleStopPlay}
            className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-xs text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-md cursor-pointer border border-white/20"
            title="Close Video (Back to Thumbnail)"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Thumbnail</span>
          </button>
        )}

        {/* ==================================================== */}
        {/* THUMBNAIL & CENTER PLAY OVERLAY (When paused / stopped) */}
        {/* ==================================================== */}
        {!isPlaying && (
          <div
            onClick={handleStartPlay}
            className="absolute inset-0 cursor-pointer group/thumb z-10"
          >
            {/* 9:16 Thumbnail Image */}
            <img
              src={currentThumbnail}
              alt={currentTitle}
              className="w-full h-full object-cover object-center group-hover/thumb:scale-[1.03] transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
              }}
            />

            {/* Instagram Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40 pointer-events-none" />

            {/* Top Reel Number & Format Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono font-bold tracking-wider border border-white/10 shadow-xs">
                REEL {reelNumber}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 backdrop-blur-xs text-slate-950 text-[10px] font-extrabold uppercase tracking-tight shadow-xs">
                9:16 HD
              </span>
            </div>

            {/* Error Message Overlays */}
            {videoError ? (
              <div
                className="absolute inset-3 my-auto h-fit bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-xl border border-slate-700/80 flex flex-col items-center text-center shadow-xl animate-fadeIn z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {videoError === 'no_video' ? (
                  <>
                    <Clock className="w-7 h-7 text-emerald-400 mb-2" />
                    <p className="text-xs font-bold text-white">Video coming soon.</p>
                    <p className="text-[11px] text-slate-400 mt-1">This reel video will be available shortly.</p>
                  </>
                ) : videoError === 'format_error' ? (
                  <>
                    <Film className="w-7 h-7 text-amber-400 mb-2" />
                    <p className="text-xs font-bold text-amber-200">Format Notice</p>
                    <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                      This video format isn&apos;t supported.
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-7 h-7 text-emerald-400 mb-2" />
                    <p className="text-xs font-bold text-white">Video unavailable.</p>
                    <p className="text-[11px] text-slate-300 mt-1">Please try again.</p>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setVideoError(null)}
                  className="mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Return to Thumbnail</span>
                </button>
              </div>
            ) : (
              /* Centered Instagram Play Button */
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md group-hover/thumb:scale-125 transition-transform duration-300" />
                  
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-slate-900 backdrop-blur-xs flex items-center justify-center shadow-xl group-hover/thumb:scale-110 group-hover/thumb:bg-white group-active/thumb:scale-95 transition-all duration-200 border border-white/60">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-900 text-slate-900 ml-1" />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Floating Watch Callout */}
            {!videoError && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="text-[11px] font-semibold text-white/90 drop-shadow-sm flex items-center gap-1">
                  <Film className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tap to Play</span>
                </span>
                {reel.highlight && (
                  <span className="text-[10px] font-bold text-emerald-300 drop-shadow-sm">
                    {reel.highlight}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* REEL CONTENT (Title + Description) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Reel Category & Number Header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
              0{reelNumber.replace(/^0+/, '') || reelNumber} — REEL {reelNumber}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              1080 × 1920
            </span>
          </div>

          {/* Reel Title */}
          <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors duration-200">
            {currentTitle}
          </h3>

          {/* Reel Short Description */}
          <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
            {currentDescription}
          </p>
        </div>

        {/* Card Footer tags */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-medium text-slate-600">Instagram Reel</span>
          <button
            type="button"
            onClick={handleTogglePlay}
            className="font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{isPlaying ? 'PAUSE' : 'PLAY REEL'}</span>
            <Play className="w-3 h-3 fill-emerald-800 text-emerald-800" />
          </button>
        </div>
      </div>
    </div>
  );
};
