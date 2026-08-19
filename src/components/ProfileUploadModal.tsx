import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Camera,
  Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import aravindPortraitDefault from '../assets/images/aravind_hero_portrait_1787160460398.jpg';

interface ProfileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileUploadModal: React.FC<ProfileUploadModalProps> = ({ isOpen, onClose }) => {
  const {
    isAdmin,
    savedMedia,
    saveProjectMedia,
    removeProjectMedia,
    login,
    logout
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Inline login state
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Current active portrait
  const currentSavedPortrait = savedMedia['hero_portrait_main'] || savedMedia['hero_portrait'];
  const activeDisplayImage = previewUrl || currentSavedPortrait || aravindPortraitDefault;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatusMessage(null);
      setPreviewUrl(null);
      setImageUrlInput(currentSavedPortrait || '');
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, currentSavedPortrait]);

  if (!isOpen) return null;

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ text: 'Please select a valid image file (PNG, JPG, WEBP).', type: 'error' });
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setStatusMessage({ text: 'Image file too large. Please select an image under 25MB.', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewUrl(result);
        setStatusMessage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleApplyUrl = () => {
    if (!imageUrlInput.trim()) {
      setStatusMessage({ text: 'Please enter a valid image URL.', type: 'error' });
      return;
    }
    setPreviewUrl(imageUrlInput.trim());
    setStatusMessage(null);
  };

  const handleSaveProfileImage = async () => {
    const finalImage = previewUrl || (activeTab === 'url' ? imageUrlInput.trim() : null);
    if (!finalImage) {
      setStatusMessage({ text: 'Please select a file or provide an image URL first.', type: 'error' });
      return;
    }

    setIsProcessing(true);
    setStatusMessage(null);

    try {
      // Save for hero portrait
      const res = await saveProjectMedia('hero_portrait', 'main', finalImage, 'image', {
        title: 'Hero Profile Portrait',
        description: 'Personal profile image of Aravind Shaw'
      });

      if (res.success) {
        setStatusMessage({ text: 'Profile image updated successfully across the portfolio!', type: 'success' });
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setStatusMessage({ text: res.error || 'Failed to save image. Please verify you are logged in.', type: 'error' });
      }
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'An error occurred while saving.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm('Reset hero profile portrait to default artwork?')) return;
    setIsProcessing(true);
    try {
      await removeProjectMedia('hero_portrait', 'main');
      setPreviewUrl(null);
      setImageUrlInput('');
      setStatusMessage({ text: 'Reset to default portrait.', type: 'success' });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setStatusMessage({ text: 'Failed to reset portrait.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsLoggingIn(true);
    setLoginError(null);
    const res = await login(password);
    if (!res.success) {
      setLoginError(res.error || 'Invalid password');
    }
    setIsLoggingIn(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Upload & Replace Personal Profile Image
              </h3>
              <p className="text-xs text-slate-500">
                Replace your hero portrait anytime with instant portfolio updates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Owner Authentication Status Banner */}
          {!isAdmin ? (
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 space-y-3">
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Owner Verification Required
                  </div>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Please unlock owner controls with your password to upload or replace your profile picture.
                  </p>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
                <div className="relative flex-1">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Enter owner password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn || !password}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50 transition-colors"
                >
                  {isLoggingIn ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>Unlock</span>
                </button>
              </form>
              {loginError && (
                <div className="text-xs text-red-600 font-medium">{loginError}</div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 text-xs">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Owner mode active — You have full permission to replace profile media.</span>
              </div>
              <button
                onClick={logout}
                className="text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                Log Out
              </button>
            </div>
          )}

          {/* Grid Layout: Controls & Live 4:5 Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Controls: Upload Tabs */}
            <div className="md:col-span-7 space-y-4">
              {/* Tab Selector */}
              <div className="flex rounded-lg bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'upload'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Local File</span>
                </button>
                <button
                  onClick={() => setActiveTab('url')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'url'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Image Web Link</span>
                </button>
              </div>

              {/* Upload Drop Zone */}
              {activeTab === 'upload' ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                    className="hidden"
                  />
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                      isDragging
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50/50 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        Click to browse or drag & drop portrait
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        High-res PNG, JPG, or WEBP (Recommended: 4:5 vertical portrait, 1080 × 1350)
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors mt-1">
                      Select Photo File
                    </span>
                  </div>
                </div>
              ) : (
                /* URL Input */
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Direct Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/your-portrait.jpg"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-white"
                    />
                    <button
                      onClick={handleApplyUrl}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              )}

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}
            </div>

            {/* Right Preview Frame */}
            <div className="md:col-span-5 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Live Frame Preview (4:5 Ratio)
              </span>

              <div className="relative w-full max-w-[210px] rounded-2xl p-1.5 bg-white border border-slate-200 shadow-md">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-100">
                  <img
                    src={activeDisplayImage}
                    alt="Aravind Shaw Portrait Preview"
                    className="w-full h-full object-cover object-center"
                  />
                  {previewUrl && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                      New Selection
                    </div>
                  )}
                </div>
              </div>

              {currentSavedPortrait && (
                <button
                  onClick={handleResetToDefault}
                  disabled={!isAdmin || isProcessing}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 transition-colors disabled:opacity-40"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore Default Artwork</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveProfileImage}
              disabled={!isAdmin || isProcessing || (!previewUrl && activeTab === 'upload' && !imageUrlInput)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving to Portfolio...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply & Save Profile Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
