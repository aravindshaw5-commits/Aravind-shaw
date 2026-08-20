import React from 'react';
import { ShieldCheck, LogOut, UploadCloud, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminBar: React.FC = () => {
  const { isAdmin, logout, setIsImageUploadModalOpen } = useAuth();

  if (!isAdmin) return null;

  return (
    <aside
      aria-label="Owner Administration Mode"
      className="fixed bottom-4 right-4 z-40 bg-slate-900/95 backdrop-blur-md text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2.5 sm:gap-3.5 text-xs animate-slideUp"
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden xs:inline">Owner Mode</span>
        </div>
      </div>

      <div className="h-4 w-px bg-slate-700" />

      {/* Upload Image Button (Admin Only) */}
      <button
        id="admin-bar-upload-image-btn"
        onClick={() => setIsImageUploadModalOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer hover:scale-105"
        title="Upload or replace portfolio images"
      >
        <UploadCloud className="w-3.5 h-3.5" />
        <span>Upload Image</span>
      </button>

      <div className="h-4 w-px bg-slate-700 hidden sm:block" />

      <button
        onClick={logout}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
        title="Sign out of Owner Mode"
      >
        <LogOut className="w-3 h-3" />
        <span>Logout</span>
      </button>
    </aside>
  );
};
