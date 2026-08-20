import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  ArrowRight,
  Database,
  ExternalLink,
  Film
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  brandingProjects,
  socialReelProjects,
  productVideos,
  animationProjects,
  threeDProjects,
  characterProjects,
  graphicEditorialProjects,
  aiCreativeProjects
} from '../lib/data';
import aravindPortraitDefault from '../assets/images/Aravind image.png';

const allPortfolioProjects = [
  ...brandingProjects,
  ...productVideos,
  ...animationProjects,
  ...threeDProjects,
  ...characterProjects,
  ...graphicEditorialProjects,
  ...aiCreativeProjects
];

interface SlotOption {
  key: string;
  category: string;
  label: string;
  defaultImage: string;
  description: string;
}

export const AdminImageUploadModal: React.FC = () => {
  const {
    isAdmin,
    isImageUploadModalOpen,
    setIsImageUploadModalOpen,
    selectedUploadSlotKey,
    savedMedia,
    savedMetadata,
    uploadImageFile,
    removeProjectMedia
  } = useAuth();

  // Generate complete list of selectable portfolio image targets
  const slotOptions: SlotOption[] = [
    {
      key: 'hero_portrait_main',
      category: 'Profile',
      label: 'Main Profile Photo (Hero & About)',
      defaultImage: aravindPortraitDefault,
      description: 'Primary portrait photo displayed in the Hero and About sections.'
    },
    // Project Slots
    ...allPortfolioProjects.flatMap((project) => {
      const slots = project.details?.gallerySlots || [
        { slotNumber: '01', title: 'Main Cover' }
      ];
      return slots.map((slot) => ({
        key: `${project.id}_${slot.slotNumber}`,
        category: `Project: ${project.title}`,
        label: `${project.title} — Slot ${slot.slotNumber} (${slot.title || 'Image'})`,
        defaultImage: slot.image || project.image,
        description: `Gallery artwork for ${project.title}.`
      }));
    }),
    // Reel Covers
    ...socialReelProjects.map((reel, idx) => ({
      key: `${reel.id}_thumb`,
      category: 'Social Reels',
      label: `Reel #${String(idx + 1).padStart(2, '0')} — ${reel.title}`,
      defaultImage: reel.image,
      description: `Cover thumbnail for 9:16 vertical social reel.`
    })),
    // Award
    {
      key: 'award_campaign_thumb',
      category: 'Award',
      label: 'Award Campaign Cover — Usain Bolt Digicel',
      defaultImage: '/images/award-bolt.jpg',
      description: 'Cover thumbnail for Usain Bolt campaign video showcase.'
    },
    // Showreel
    {
      key: 'showreel_main_thumb',
      category: 'Showreel',
      label: 'Main Showreel Video Cover',
      defaultImage: '/images/showreel-cover.jpg',
      description: 'Thumbnail for the full 2025-2026 Master Motion Showreel.'
    }
  ];

  const [selectedKey, setSelectedKey] = useState<string>('hero_portrait_main');
  const [customKeyInput, setCustomKeyInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync initial slot selection when opened
  useEffect(() => {
    if (isImageUploadModalOpen) {
      if (selectedUploadSlotKey) {
        setSelectedKey(selectedUploadSlotKey);
      }
      setSelectedFile(null);
      setPreviewUrl(null);
      setStatusMessage(null);
      setUploadProgress(0);
    }
  }, [isImageUploadModalOpen, selectedUploadSlotKey]);

  if (!isAdmin || !isImageUploadModalOpen) return null;

  const currentOption = slotOptions.find((opt) => opt.key === selectedKey);
  const effectiveKey = selectedKey === 'custom' ? customKeyInput.trim() : selectedKey;
  const currentLiveUrl = savedMedia[effectiveKey] || currentOption?.defaultImage || '';
  const isCustomUploaded = Boolean(savedMedia[effectiveKey]);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ text: 'Please select a valid image file (JPG, PNG, WEBP, GIF, SVG).', type: 'error' });
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setStatusMessage({ text: 'Image exceeds 30MB limit. Please choose a compressed image.', type: 'error' });
      return;
    }

    setSelectedFile(file);
    setStatusMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      setStatusMessage({ text: 'Please select an image file to upload.', type: 'error' });
      return;
    }

    if (!effectiveKey) {
      setStatusMessage({ text: 'Please select or enter a valid image slot key.', type: 'error' });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setStatusMessage(null);

    try {
      const res = await uploadImageFile(selectedFile, effectiveKey, {
        title: currentOption?.label || effectiveKey,
        description: currentOption?.description,
        onProgress: (percent) => {
          setUploadProgress(percent);
        }
      });

      if (res.success && res.url) {
        setStatusMessage({
          text: '✓ Image uploaded and applied to portfolio! Old image was replaced.',
          type: 'success'
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        setStatusMessage({
          text: res.error || 'Failed to upload image.',
          type: 'error'
        });
      }
    } catch (err: any) {
      setStatusMessage({
        text: err.message || 'An unexpected error occurred during upload.',
        type: 'error'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleResetSlot = async () => {
    if (!effectiveKey) return;
    if (!window.confirm('Reset this slot to its default artwork and remove custom file?')) {
      return;
    }

    setIsUploading(true);
    try {
      const parts = effectiveKey.split('_');
      const projectId = parts.length > 1 ? parts.slice(0, -1).join('_') : effectiveKey;
      const slotNum = parts.length > 1 ? parts[parts.length - 1] : 'main';

      await removeProjectMedia(projectId, slotNum);
      setStatusMessage({
        text: 'Image reset to default asset and custom file removed.',
        type: 'success'
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to reset image.', type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      id="admin-image-upload-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={() => setIsImageUploadModalOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CloudUpload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight flex items-center gap-2">
                <span>Upload & Replace Portfolio Image</span>
              </h2>
              <p className="text-xs text-slate-400">
                Admin only. Select an image file to update any project, portrait, or banner slot.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsImageUploadModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Target Slot Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Select Target Image Slot to Replace:
            </label>
            <select
              value={selectedKey}
              onChange={(e) => {
                setSelectedKey(e.target.value);
                setSelectedFile(null);
                setPreviewUrl(null);
                setStatusMessage(null);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            >
              <optgroup label="Primary Portfolio Assets">
                <option value="hero_portrait_main">📸 Main Profile Photo (Hero & About)</option>
                <option value="showreel_main_thumb">🎥 Main Showreel Video Cover</option>
                <option value="award_campaign_thumb">🏆 Usain Bolt Award & Campaign Banner</option>
              </optgroup>

              <optgroup label="Project Gallery Images">
                {allPortfolioProjects.flatMap((project) =>
                  (project.details?.gallerySlots || [{ slotNumber: '01', title: 'Main Cover' }]).map((slot) => (
                    <option key={`${project.id}_${slot.slotNumber}`} value={`${project.id}_${slot.slotNumber}`}>
                      🎨 {project.title} — Slot {slot.slotNumber} ({slot.title || 'Image'})
                    </option>
                  ))
                )}
              </optgroup>

              <optgroup label="Social Media Reels Thumbnails">
                {socialReelProjects.map((reel, idx) => (
                  <option key={`${reel.id}_thumb`} value={`${reel.id}_thumb`}>
                    🎬 Reel #{String(idx + 1).padStart(2, '0')} — {reel.title}
                  </option>
                ))}
              </optgroup>

              <optgroup label="Advanced">
                <option value="custom">⚙️ Custom Slot Key...</option>
              </optgroup>
            </select>

            {selectedKey === 'custom' && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter custom slot key (e.g., custom_banner_01)"
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
            )}
          </div>

          {/* Current Live Image vs New Upload Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current Active Image */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Currently Live
                  </span>
                  {isCustomUploaded ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Database className="w-3 h-3" />
                      <span>Custom Asset</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                      Default Static Asset
                    </span>
                  )}
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-200/80 mb-2">
                  {currentLiveUrl ? (
                    <img
                      src={currentLiveUrl}
                      alt="Currently live asset"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.svg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      No current image
                    </div>
                  )}
                </div>
              </div>

              {isCustomUploaded && (
                <button
                  type="button"
                  onClick={handleResetSlot}
                  disabled={isUploading}
                  className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset to Default Asset</span>
                </button>
              )}
            </div>

            {/* New Image To Upload */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    New Image Preview
                  </span>
                  {selectedFile && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  )}
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-200/80 flex items-center justify-center mb-2">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 text-slate-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1.5 text-slate-300" />
                      <p className="text-xs">No new file selected yet</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedFile && (
                <div className="text-xs text-slate-600 truncate font-medium">
                  File: <span className="font-semibold text-slate-900">{selectedFile.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Drag and drop upload zone */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />

            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/20'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Click to browse or drag and drop image here
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Supports PNG, JPG, WEBP, GIF, SVG up to 30MB.
              </p>
            </div>
          </div>

          {/* Upload progress indicator */}
          {isUploading && (
            <div className="space-y-1.5 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>Processing and saving image...</span>
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Feedback status message */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="flex-1 leading-relaxed">{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Changes reflect instantly across the portfolio</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsImageUploadModalOpen(false)}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleUploadImage}
              disabled={!selectedFile || isUploading}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-all"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading ({uploadProgress}%)...</span>
                </>
              ) : (
                <>
                  <CloudUpload className="w-4 h-4" />
                  <span>Upload & Replace</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
