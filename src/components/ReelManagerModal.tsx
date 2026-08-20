import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Film,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Shield,
  Sparkles,
  Link,
  Play,
  Pause,
  AlertCircle,
  Loader2,
  CheckCircle2,
  FolderUp
} from 'lucide-react';
import { Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { socialReelProjects } from '../lib/data';

interface ReelManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReelId?: string;
}

export const ReelManagerModal: React.FC<ReelManagerModalProps> = ({
  isOpen,
  onClose,
  initialReelId = 'reel-01'
}) => {
  const { isAdmin, savedMedia, savedMetadata, saveReelData, removeProjectMedia } = useAuth();
  const [activeReelId, setActiveReelId] = useState<string>(initialReelId);

  // Active reel object
  const activeReelIndex = socialReelProjects.findIndex(r => r.id === activeReelId);
  const activeReel = socialReelProjects[activeReelIndex] || socialReelProjects[0];
  const reelNumber = `0${(activeReelIndex >= 0 ? activeReelIndex : 0) + 1}`;

  // Current values
  const savedThumb = savedMedia[`${activeReel.id}_thumb`] || savedMedia[`${activeReel.id}_01`];
  const savedVid = savedMedia[`${activeReel.id}_video`] || savedMedia[`${activeReel.id}_02`];
  const meta = savedMetadata[`${activeReel.id}_meta`];

  const currentThumbnail = savedThumb || activeReel.image;
  const currentVideo = savedVid || activeReel.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  const currentTitle = meta?.title !== undefined ? meta.title : activeReel.title;
  const currentDescription = meta?.description !== undefined ? meta.description : activeReel.description;
  const currentHighlight = meta?.extra?.highlight || activeReel.highlight || '';

  // Form states
  const [formTitle, setFormTitle] = useState<string>(currentTitle);
  const [formDescription, setFormDescription] = useState<string>(currentDescription);
  const [formHighlight, setFormHighlight] = useState<string>(currentHighlight);
  const [videoUrlInput, setVideoUrlInput] = useState<string>('');
  const [thumbUrlInput, setThumbUrlInput] = useState<string>('');

  // UI status
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [dragOverThumb, setDragOverThumb] = useState<boolean>(false);
  const [dragOverVideo, setDragOverVideo] = useState<boolean>(false);
  const [previewVideoPlaying, setPreviewVideoPlaying] = useState<boolean>(false);

  // File input refs
  const thumbFileInputRef = useRef<HTMLInputElement | null>(null);
  const videoFileInputRef = useRef<HTMLInputElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);

  // Keep form in sync when switching tabs
  React.useEffect(() => {
    const sThumb = savedMedia[`${activeReel.id}_thumb`] || savedMedia[`${activeReel.id}_01`];
    const sVid = savedMedia[`${activeReel.id}_video`] || savedMedia[`${activeReel.id}_02`];
    const m = savedMetadata[`${activeReel.id}_meta`];

    setFormTitle(m?.title !== undefined ? m.title : activeReel.title);
    setFormDescription(m?.description !== undefined ? m.description : activeReel.description);
    setFormHighlight(m?.extra?.highlight || activeReel.highlight || '');
    setVideoUrlInput('');
    setThumbUrlInput('');
    setStatusMessage(null);
    setPreviewVideoPlaying(false);
  }, [activeReelId, savedMedia, savedMetadata, activeReel]);

  if (!isOpen) return null;

  // Process File Upload
  const handleFileUpload = (file: File, type: 'thumb' | 'video') => {
    if (!isAdmin) return;

    // Type validation
    if (type === 'video' && !file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|mov|m4v)$/i)) {
      setStatusMessage({
        type: 'error',
        text: 'Please select a valid video file (.mp4, .webm, .mov) for Reel video.'
      });
      return;
    }

    if (type === 'thumb' && !file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      setStatusMessage({
        type: 'error',
        text: 'Please select a valid image file (.jpg, .png, .webp) for Reel thumbnail.'
      });
      return;
    }

    if (file.size > 45 * 1024 * 1024) {
      setStatusMessage({
        type: 'error',
        text: 'File exceeds the 45MB server limit. Please optimize or compress the video.'
      });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const res = await saveReelData(activeReel.id, {
        [type === 'thumb' ? 'thumbnailUrl' : 'videoUrl']: dataUrl
      });
      setIsSaving(false);

      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: `New ${type === 'thumb' ? '9:16 Thumbnail' : 'Reel Video'} uploaded & saved successfully!`
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'Failed to upload file'
        });
      }
    };

    reader.onerror = () => {
      setIsSaving(false);
      setStatusMessage({
        type: 'error',
        text: 'Failed to read file from disk.'
      });
    };

    reader.readAsDataURL(file);
  };

  // Save Text Metadata
  const handleSaveTextData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setIsSaving(true);
    setStatusMessage(null);

    const updates: {
      title?: string;
      description?: string;
      thumbnailUrl?: string;
      videoUrl?: string;
      extra?: Record<string, any>;
    } = {
      title: formTitle,
      description: formDescription,
      extra: { highlight: formHighlight }
    };

    if (thumbUrlInput.trim()) {
      updates.thumbnailUrl = thumbUrlInput.trim();
    }
    if (videoUrlInput.trim()) {
      updates.videoUrl = videoUrlInput.trim();
    }

    const res = await saveReelData(activeReel.id, updates);
    setIsSaving(false);

    if (res.success) {
      setThumbUrlInput('');
      setVideoUrlInput('');
      setStatusMessage({
        type: 'success',
        text: `Reel ${reelNumber} details saved permanently!`
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: res.error || 'Failed to update reel text'
      });
    }
  };

  // Reset to default
  const handleResetReel = async () => {
    if (!window.confirm(`Reset Reel ${reelNumber} to original template media and text?`)) return;

    setIsSaving(true);
    await removeProjectMedia(activeReel.id, 'thumb');
    await removeProjectMedia(activeReel.id, 'video');
    await removeProjectMedia(activeReel.id, 'meta');
    await removeProjectMedia(activeReel.id, '01');
    await removeProjectMedia(activeReel.id, '02');
    setIsSaving(false);

    setFormTitle(activeReel.title);
    setFormDescription(activeReel.description);
    setFormHighlight(activeReel.highlight || '');
    setVideoUrlInput('');
    setThumbUrlInput('');
    setStatusMessage({
      type: 'success',
      text: `Reel ${reelNumber} reset to default template state.`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={thumbFileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'thumb');
          e.target.value = '';
        }}
      />
      <input
        type="file"
        ref={videoFileInputRef}
        className="hidden"
        accept="video/mp4,video/webm,video/quicktime,video/*"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'video');
          e.target.value = '';
        }}
      />

      <div
        id="reel-manager-modal"
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Owner Reels Manager</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950 uppercase tracking-wider">
                  Owner Authenticated
                </span>
              </div>
              <p className="text-xs text-slate-400">Upload & replace 9:16 vertical videos, poster thumbnails, and copy for the 4 Reels</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Reel Tabs */}
        <div className="bg-slate-100 px-6 pt-3 flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
          {socialReelProjects.slice(0, 4).map((r, idx) => {
            const num = `0${idx + 1}`;
            const isActive = r.id === activeReelId;
            const hasCustom = Boolean(
              savedMedia[`${r.id}_thumb`] ||
              savedMedia[`${r.id}_video`] ||
              savedMetadata[`${r.id}_meta`]
            );

            return (
              <button
                key={r.id}
                onClick={() => setActiveReelId(r.id)}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-t border-x cursor-pointer ${
                  isActive
                    ? 'bg-white text-emerald-950 border-slate-200 shadow-xs'
                    : 'bg-slate-200/70 hover:bg-slate-200 text-slate-600 border-transparent'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
                  {idx + 1}
                </span>
                <span>REEL {num}</span>
                {hasCustom && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Custom media uploaded" />
                )}
              </button>
            );
          })}
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`px-6 py-2.5 text-xs font-semibold flex items-center justify-between ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-b border-emerald-200'
                : 'bg-red-50 text-red-900 border-b border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Live 9:16 Preview Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live 9:16 Preview (Reel {reelNumber})
              </span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                1080 × 1920 HD
              </span>
            </div>

            <div className="relative w-[220px] sm:w-[240px] aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-300">
              {previewVideoPlaying && currentVideo ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    ref={previewVideoRef}
                    src={currentVideo}
                    poster={currentThumbnail}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    onEnded={() => setPreviewVideoPlaying(false)}
                    onError={() => {
                      setStatusMessage({
                        type: 'error',
                        text: "This video format isn't supported. Please upload an MP4 (H.264) video."
                      });
                      setPreviewVideoPlaying(false);
                    }}
                  />
                  <button
                    onClick={() => {
                      if (previewVideoRef.current) previewVideoRef.current.pause();
                      setPreviewVideoPlaying(false);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 z-10"
                    title="Return to thumbnail preview"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (!currentVideo || currentVideo.trim() === '') {
                      setStatusMessage({
                        type: 'error',
                        text: 'No video uploaded yet. Please upload a 9:16 MP4 video first.'
                      });
                      return;
                    }
                    setPreviewVideoPlaying(true);
                  }}
                  className="relative w-full h-full cursor-pointer group"
                >
                  <img
                    src={currentThumbnail}
                    alt={formTitle}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-mono font-bold">
                    REEL {reelNumber}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-slate-900 text-slate-900 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-white/90 font-semibold drop-shadow-sm">
                    {currentVideo ? 'Click to test video player' : 'Upload video to enable player'}
                  </div>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 mt-2 text-center">
              Aspect Ratio: 9/16 Vertical • Fully responsive on all devices
            </p>
          </div>

          {/* Right Column: Upload & Edit Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Media Replacement Controls */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FolderUp className="w-4 h-4 text-emerald-600" />
                <span>1. Media Upload & Replacement</span>
              </h4>

              {/* Upload Dropzones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Thumbnail Dropzone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOverThumb(true); }}
                  onDragLeave={() => setDragOverThumb(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverThumb(false);
                    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0], 'thumb');
                  }}
                  onClick={() => thumbFileInputRef.current?.click()}
                  className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    dragOverThumb
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
                  }`}
                >
                  <ImageIcon className="w-6 h-6 text-emerald-600 mb-1.5" />
                  <span className="text-xs font-bold text-slate-900">Replace 9:16 Thumbnail</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Click or drag image file here</span>
                  <span className="mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-semibold">
                    JPG / PNG / WEBP
                  </span>
                </div>

                {/* Video Dropzone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOverVideo(true); }}
                  onDragLeave={() => setDragOverVideo(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverVideo(false);
                    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0], 'video');
                  }}
                  onClick={() => videoFileInputRef.current?.click()}
                  className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    dragOverVideo
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
                  }`}
                >
                  <Film className="w-6 h-6 text-emerald-600 mb-1.5" />
                  <span className="text-xs font-bold text-slate-900">Replace 9:16 Video</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Click or drag video file here</span>
                  <span className="mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-semibold">
                    MP4 / WebM (Max 45MB)
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Content & URL Form */}
            <form onSubmit={handleSaveTextData} className="space-y-4 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>2. Reel Details & Direct URLs</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Reel Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Kinetic Hook & Typography Breakdown"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Views / Highlight Badge</label>
                  <input
                    type="text"
                    value={formHighlight}
                    onChange={(e) => setFormHighlight(e.target.value)}
                    placeholder="e.g. 3.4M Views • 140K Shares"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Short Description</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the animation, hooks, and client story..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Direct URLs (Optional alternative to uploading file) */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <Link className="w-3.5 h-3.5 text-slate-500" />
                  <span>Or Provide Direct Media Web URLs (Optional)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="url"
                    value={thumbUrlInput}
                    onChange={(e) => setThumbUrlInput(e.target.value)}
                    placeholder="Direct Image URL (https://...)"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-md border border-slate-300 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="url"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder="Direct MP4 Video URL (https://...)"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-md border border-slate-300 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Footer action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetReel}
                  disabled={isSaving}
                  className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Reel {reelNumber}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Reel Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};
