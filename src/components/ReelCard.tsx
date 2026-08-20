import React, { useState, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Shield,
  UploadCloud,
  Edit3,
  Check,
  X,
  Film,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  AlertCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { Project } from '../types';
import { useAuth } from '../context/AuthContext';

interface ReelCardProps {
  reel: Project;
  reelNumber: string; // e.g. "01", "02", "03", "04"
  onOpenManager?: (reelId: string) => void;
}

type VideoErrorType = 'no_video' | 'format_error' | 'load_error' | null;

export const ReelCard: React.FC<ReelCardProps> = ({ reel, reelNumber, onOpenManager }) => {
  const { isAdmin, savedMedia, savedMetadata, uploadImageFile, saveReelData, removeProjectMedia } = useAuth();

  // Active playback & error states (strictly no autoplay)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<VideoErrorType>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Admin edit states
  const [isEditingInfo, setIsEditingInfo] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);

  // Inputs for direct replacement
  const thumbInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  // Resolved dynamic values: Check custom saved data first, fallback to static defaults
  const savedThumb = savedMedia[`${reel.id}_thumb`] || savedMedia[`${reel.id}_01`];
  const savedVideo = savedMedia[`${reel.id}_video`] || savedMedia[`${reel.id}_02`];
  const meta = savedMetadata[`${reel.id}_meta`];

  // Thumbnail (image asset only)
  const currentThumbnail = savedThumb || reel.image;
  // Video URL (video asset only)
  const currentVideo = savedVideo || reel.videoUrl || '';
  const currentTitle = meta?.title !== undefined ? meta.title : reel.title;
  const currentDescription = meta?.description !== undefined ? meta.description : reel.description;

  // Form state for editing info
  const [tempTitle, setTempTitle] = useState(currentTitle);
  const [tempDescription, setTempDescription] = useState(currentDescription);

  const isCustomAsset = Boolean(savedThumb || savedVideo || meta?.title || meta?.description);

  // Safe Click-To-Play Handler (NO AUTOPLAY)
  const handleStartPlay = () => {
    // 1. Verify video source exists and is non-empty before initiating playback
    if (!currentVideo || typeof currentVideo !== 'string' || currentVideo.trim() === '') {
      setVideoError('no_video');
      return;
    }

    setVideoError(null);
    setIsBuffering(true);
    setIsPlaying(true);
  };

  // Stop playback and return to thumbnail state
  const handleStopPlay = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setIsBuffering(false);
    setVideoError(null);
  };

  // Safe Video Error Handler
  const handleVideoError = () => {
    setIsBuffering(false);
    if (videoRef.current && videoRef.current.error) {
      const code = videoRef.current.error.code;
      // MEDIA_ERR_SRC_NOT_SUPPORTED = 4, MEDIA_ERR_DECODE = 3
      if (code === 4 || code === 3) {
        setVideoError('format_error');
      } else {
        setVideoError('load_error');
      }
    } else {
      setVideoError('load_error');
    }
  };

  // Helper for file processing (max 45MB)
  const processFile = async (file: File, type: 'thumb' | 'video') => {
    if (!isAdmin) return;

    // Type validation
    if (type === 'video' && !file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|mov|m4v)$/i)) {
      setUploadStatus({
        type: 'error',
        message: 'Please select a valid video file (.mp4, .webm, .mov) for Reel video.'
      });
      setTimeout(() => setUploadStatus(null), 5000);
      return;
    }

    if (type === 'thumb' && !file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      setUploadStatus({
        type: 'error',
        message: 'Please select a valid image file (.jpg, .png, .webp) for Reel thumbnail.'
      });
      setTimeout(() => setUploadStatus(null), 5000);
      return;
    }

    if (file.size > 45 * 1024 * 1024) {
      setUploadStatus({
        type: 'error',
        message: 'File exceeds 45MB maximum size limit. Please compress the file.'
      });
      setTimeout(() => setUploadStatus(null), 5000);
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    if (type === 'thumb') {
      try {
        const key = `${reel.id}_thumb`;
        const res = await uploadImageFile(file, key, {
          title: `${reel.title} Thumbnail`,
          projectId: reel.id,
          slotNumber: 'thumb',
          mediaType: 'image'
        });

        setIsUploading(false);

        if (res.success) {
          setVideoError(null);
          setUploadStatus({
            type: 'success',
            message: '✓ 9:16 Thumbnail uploaded to Firebase Storage!'
          });
          setTimeout(() => setUploadStatus(null), 3500);
        } else {
          setUploadStatus({
            type: 'error',
            message: res.error || 'Upload to Firebase failed'
          });
          setTimeout(() => setUploadStatus(null), 4500);
        }
      } catch (err: any) {
        setIsUploading(false);
        setUploadStatus({
          type: 'error',
          message: err.message || 'Upload error'
        });
        setTimeout(() => setUploadStatus(null), 4500);
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const res = await saveReelData(reel.id, {
        videoUrl: dataUrl
      });
      setIsUploading(false);

      if (res.success) {
        setVideoError(null);
        setUploadStatus({
          type: 'success',
          message: 'Reel Video uploaded & saved successfully!'
        });
        setTimeout(() => setUploadStatus(null), 3500);
      } else {
        setUploadStatus({
          type: 'error',
          message: res.error || 'Upload failed'
        });
        setTimeout(() => setUploadStatus(null), 4500);
      }
    };

    reader.onerror = () => {
      setIsUploading(false);
      setUploadStatus({
        type: 'error',
        message: 'Failed to read file from disk.'
      });
      setTimeout(() => setUploadStatus(null), 4000);
    };

    reader.readAsDataURL(file);
  };

  // Drag & drop handlers for owner
  const handleDragOver = (e: React.DragEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov)$/i)) {
        processFile(file, 'video');
      } else if (file.type.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
        processFile(file, 'thumb');
      }
    }
  };

  // Save Text Info
  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setIsUploading(true);
    const res = await saveReelData(reel.id, {
      title: tempTitle,
      description: tempDescription
    });
    setIsUploading(false);

    if (res.success) {
      setIsEditingInfo(false);
      setUploadStatus({
        type: 'success',
        message: 'Title and description saved!'
      });
      setTimeout(() => setUploadStatus(null), 3000);
    } else {
      setUploadStatus({
        type: 'error',
        message: res.error || 'Failed to update reel text'
      });
      setTimeout(() => setUploadStatus(null), 4000);
    }
  };

  // Reset to defaults
  const handleReset = async () => {
    if (!isAdmin) return;
    if (!window.confirm(`Reset Reel ${reelNumber} to original template thumbnail and video?`)) return;

    setIsUploading(true);
    await removeProjectMedia(reel.id, 'thumb');
    await removeProjectMedia(reel.id, 'video');
    await removeProjectMedia(reel.id, 'meta');
    await removeProjectMedia(reel.id, '01');
    await removeProjectMedia(reel.id, '02');
    setIsUploading(false);
    setTempTitle(reel.title);
    setTempDescription(reel.description);
    setIsPlaying(false);
    setVideoError(null);
    setUploadStatus({
      type: 'success',
      message: `Reel ${reelNumber} reset to default.`
    });
    setTimeout(() => setUploadStatus(null), 3000);
  };

  return (
    <div
      id={`reel-card-${reel.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden"
    >
      {/* Hidden file inputs for admin */}
      {isAdmin && (
        <>
          <input
            type="file"
            ref={thumbInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) processFile(e.target.files[0], 'thumb');
              e.target.value = '';
            }}
          />
          <input
            type="file"
            ref={videoInputRef}
            className="hidden"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            onChange={(e) => {
              if (e.target.files?.[0]) processFile(e.target.files[0], 'video');
              e.target.value = '';
            }}
          />
        </>
      )}

      {/* Admin Quick Action Toolbar (ONLY for authenticated owner) */}
      {isAdmin && (
        <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-mono">REEL {reelNumber}</span>
          </div>

          <div className="flex items-center gap-1">
            {onOpenManager && (
              <button
                onClick={() => onOpenManager(reel.id)}
                title="Open Full Reels Manager Studio"
                className="p-1 px-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer mr-0.5 shadow-2xs"
              >
                <Sparkles className="w-3 h-3 text-emerald-200" />
                <span>Studio</span>
              </button>
            )}

            <button
              onClick={() => thumbInputRef.current?.click()}
              title="Replace Thumbnail Image (9:16)"
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-3 h-3 text-emerald-400" />
              <span>Thumb</span>
            </button>

            <button
              onClick={() => videoInputRef.current?.click()}
              title="Replace Reel Video (9:16 MP4)"
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Film className="w-3 h-3 text-emerald-400" />
              <span>Video</span>
            </button>

            <button
              onClick={() => {
                setTempTitle(currentTitle);
                setTempDescription(currentDescription);
                setIsEditingInfo(!isEditingInfo);
              }}
              title="Edit Title & Description"
              className={`p-1 rounded ${isEditingInfo ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'} text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Text</span>
            </button>

            {isCustomAsset && (
              <button
                onClick={handleReset}
                title="Reset to default"
                className="p-1 rounded bg-red-900/60 hover:bg-red-800 text-red-200 text-[10px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Admin Status Toast Feedback */}
      {uploadStatus && (
        <div
          className={`px-3 py-1.5 text-xs font-semibold text-center ${
            uploadStatus.type === 'success'
              ? 'bg-emerald-100 text-emerald-900 border-b border-emerald-200'
              : 'bg-red-100 text-red-900 border-b border-red-200'
          }`}
        >
          {uploadStatus.message}
        </div>
      )}

      {/* 9:16 Instagram Reel Media Box (1080 × 1920 aspect ratio) */}
      <div
        className="relative w-full aspect-[9/16] bg-slate-950 overflow-hidden select-none"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag Overlay for Owner */}
        {dragOver && (
          <div className="absolute inset-0 z-30 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center border-2 border-dashed border-emerald-400 animate-fadeIn">
            <UploadCloud className="w-10 h-10 text-emerald-300 animate-bounce mb-2" />
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">Drop to Replace Reel Media</p>
            <p className="text-[11px] text-slate-300 mt-1">Accepts 9:16 Video or Thumbnail Image</p>
          </div>
        )}

        {/* Loading Spinner during upload */}
        {isUploading && (
          <div className="absolute inset-0 z-30 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center text-white">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
            <span className="text-xs font-semibold">Saving Reel Asset...</span>
          </div>
        )}

        {/* ==================================================== */}
        {/* STATE 1: ACTIVE VIDEO PLAYER (When visitor clicked Play) */}
        {/* ==================================================== */}
        {isPlaying && !videoError ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            {/* Standard HTML5 Video Player with controls, playsInline, preload metadata, NO autoPlay */}
            <video
              ref={videoRef}
              src={currentVideo}
              poster={currentThumbnail}
              controls
              preload="metadata"
              playsInline
              className="w-full h-full object-cover"
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              onEnded={() => setIsPlaying(false)}
              onError={handleVideoError}
            />

            {/* Buffering Indicator */}
            {isBuffering && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/30">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
            )}

            {/* Back to Thumbnail Close Button */}
            <button
              onClick={handleStopPlay}
              className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-xs text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-md cursor-pointer border border-white/20"
              title="Close Video (Back to Thumbnail)"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Thumbnail</span>
            </button>
          </div>
        ) : (
          /* ==================================================== */
          /* STATE 2: DEFAULT THUMBNAIL (Show before play / fallback) */
          /* ==================================================== */
          <div
            onClick={handleStartPlay}
            className="relative w-full h-full cursor-pointer group/thumb"
          >
            {/* 9:16 Thumbnail Image strictly used as image */}
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

            {/* Error Message Overlays (Friendly, no raw errors) */}
            {videoError ? (
              <div
                className="absolute inset-3 my-auto h-fit bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-xl border border-slate-700/80 flex flex-col items-center text-center shadow-xl animate-fadeIn z-10"
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
                      This video format isn&apos;t supported. Please upload an MP4 (H.264) video.
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
              /* Centered Instagram Play Button (▶) */
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Subtle pulsing background glow on hover */}
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

      {/* ==================================================== */}
      {/* REEL CONTENT (Title + Description)                   */}
      {/* ==================================================== */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        {isEditingInfo && isAdmin ? (
          /* Inline Admin Editor for Title & Description */
          <form onSubmit={handleSaveInfo} className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <span className="text-xs font-bold text-slate-900">Edit Reel {reelNumber} Info</span>
              <button
                type="button"
                onClick={() => setIsEditingInfo(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Reel Title</label>
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Short Description</label>
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                placeholder="Enter short description"
                rows={3}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditingInfo(false)}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </form>
        ) : (
          /* Normal Display of Reel Content */
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
        )}

        {/* Card Footer tags */}
        {!isEditingInfo && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-medium text-slate-600">Instagram Reel</span>
            <button
              type="button"
              onClick={isPlaying ? handleStopPlay : handleStartPlay}
              className="font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{isPlaying ? 'PAUSE' : 'PLAY REEL'}</span>
              <Play className="w-3 h-3 fill-emerald-800 text-emerald-800" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
